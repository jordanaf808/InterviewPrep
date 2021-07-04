# How To Recover Dropped MySQL Table

[YouTube Link](https://youtu.be/vyUzlDANbRA)

> "If you dropped a MySQL(InnoDB) database and do not have a backup copy - this video is for you.
> When MySQL drop a table it removes its .frm and .ibd files. It doesn't however physically destroy the data. While the files are deleted it might be possible to salvage user data from the free space in the filesystem.
> In this video I drop a Wordpress database and use Undrop for [InnoDB toolkit](https://github.com/twindb/undrop-for-innodb) to parse a disk partition and extract user records from InnoDB pages."

<br>

- MySQL runs on an un-encrypted and un-compressed file system. It works on `EXT4 XFS` and even `NTFS` filesystems, but not `ZFS` or apple's `APFS`.

- Example using wordpress database, sql runs on root partition, wouldn't recommend this but it's a common setup.

- testing using copy of twinDB site
- `mySQL 5.7` on Ubuntu

```sql
use twindb
-- ... database changed
show tables;
-- ... lots of tables
```

On the filesystem the database is kept in

```
root@db: /var/lib/mysql ll
```

`ll` - shows file structure, permissions, and other info of current directory.

show disk partitions info

```
df -h /var/lib/mysql
```

Now drop the database.

```sql
drop database twindb
```

## 🤯 🤯 🤯

Internally mysql drops each individual table, then it removes the directory. Starts with .frm and .ibd for each table, ends with the directory.

Neither mySQL nor the OS destroys the data when the database has been dropped. It still exists, but is now classified as `Free Space`.

---

## Step #1

- preserve original state of Database Instance right after drop happens.

- **Kill MySQL D** - It may be doing background write activity, i.e. reorganizing db.

- You can't stop OS. If DB was on dedicated partition, you could unmount it and remount it read-only. but it's not.

- kill some processes if you suspect they are performing db writes.

- Make a **Disk Image** of the root partition and save it on another server.

```
dd if=/dev/nvm
  of=/dev/stdout
  | nc recovery-server
```

> - **`DD`** - Unix Disc Copy Utility - reads input file and writes to output file.
> - `if` = input file
> - `of` = output file.
> - `| nc recovery` - "pipe to netcat, over the network to a recovery server."
> - `nc` - "reads and writes data across network connections, using the TCP or UDP protocols" [Netcat Examples](https://linuxize.com/post/netcat-nc-command-with-examples/)

The recovery server is a seperate linux box which will accept the disk image and parse it with `Stream Parser` from `innoDB Toolkit`. It will parse the data into innoDB pages by index id.
Then use `c_parser` tool that reads innoDB page and extracts records from it. It stores it as type separated values in dumps. Use `LOAD DATA IN FILE` SQL command to import the recovered records.

```sql
LOAD DATA IN FILE
```

---

### Kill `mysqld`

Show all mysqld processes

```unix
root@db /var/lib/mysql ps ax | grep mysqld
```

> - [Linux ps command – 20 Real Life Examples](https://www.journaldev.com/24613/linux-ps-command#:~:text=The%20ps%20command%2C%20short%20for,concurrently%20without%20affecting%20each%20other.)
> - `ps` - "lists the running processes in the current shell"
> - `ps -ax` - "Show all current running processes"
> - `grep` - Global Regular Expression Print - tool used to search for a string of characters in a specified file.

used to use safeguard process, now it uses `systemd`. If you kill it with `-9` it will just restart it, which is not what we want to do. instead use `kill` with the corresponding pid or "SIGTERM signal"?
mysqld ends gracefully when we use kill

```
kill 4161
```

find which partition a particular directory is on with:

```
root@db /var/lib/mysql df -h /var/lib/mysql
// dev/nvme0n1p1 7.6G
```

copy partition, set bs (block-size), pipe it to the recovery server. find ip address `ip addr`.
on original partition:

```
dd if=/dev/nvme0n1p1 of=/dev/stdout bs=16k | nc 99.99.99.99 9999
```

You must start `netcat` on the recovery partition as well and set the listening port. pipe it to `pv` to show progress and store it in disk.img :

```
 nc -l 9999 | pv > disk.img
```

netcat doesn't end by itself so kill it after completion.

- find disk image `ll`

- stream parser finds innodb pages and sorts them.

```
./streamparser -f disk.img
```

outputs to `pages-disk.img` with lots of pages

show size of files in directory Disk Usage `du -sh *`

parse pages with `c_parser` and "specify the file name with the indexes. [BUT] we have a lot of them so we got to figure out which one is ours."
_don't execute this_

```
./c_parser -6f pages-disk.img/FIL_PAGE_INDEX
./c_parser -6f pages-disk.img/FIL_PAGE_TYPE_BLOB
```

We need to recover the `innoDB dictionary` to get the list of tables we need to recover as well as the index IDs. There is a `recover_dictionary.sh` script, but it expects a directory with innoDB pages in a `pages-ibdata1` file. _see video at [14:00 min.](https://youtu.be/vyUzlDANbRA)_
We create a _soft-link_ to our `pages-disk.img` and name it `pages-ibdata1`, then pass that into the `recover_dictionary.sh`.

```
ln -s pages-disk.img pages-ibdata1
./recover_dictionary.sh
```

It generated dictionary table dumps and created a test database but couldn't find mySQL app, so we install it.

```
apt-get -y install mysql-server mysql-client
```

Start `mysql` and `show databases` look for database test that the recovery script made... couldn't find it so he added this to the bottom of **`mysqld.cnf`**

```
local-infile=1
// the restart
systemctl restart mysql
bash -x ./recover_dictionary.sh // uses bash to execute
```

outputs a database called test

```
mysql test
show tables;
// SYS_COLUMNS
// SYS_FIELDS
// SYS_INDEXES
// SYS_TABLES
select * from SYS_TABLES
......
```

we need to find index id

```
pager less -S
select * from SYS_TABLES
```

wpposts has id: 45

if you `select * from SYS_INDEXES WHERE TABLE_ID = 45` You will see index id's for the wpposts table, there is a primary and a few secondary indexes.
make a query

```sql
select * from SYS_TABLES JOIN SYS_INDEXES ON SYS_INDEXES.TABLE_ID =  SYS_TABLE_ID WHERE SYS_TABLES.NAME = 'twindb/wp_posts';
```

the primary table is usually the lowest id#.
output only sys_indexes id, sorted by id, limited to 1

```sql
select * from SYS_TABLES JOIN SYS_INDEXES ON SYS_INDEXES.TABLE_ID = SYS_TABLE_ID WHERE SYS_TABLES.NAME = 'twindb/wp_posts' ORDER BY 1 LIMIT 1;

```

"write recovery script" he uses `vim recover.sh`

```c#
for tbl in $(cat tables)
do
        index_id=$(mysql -NBe "select * from SYS_TABLES JOIN SYS_INDEXES ON SYS_INDEXES.TABLE_ID = SYS_TABLE_ID WHERE SYS_TABLES.NAME = 'twindb/$tbl' ORDER BY 1 LIMIT 1;")
        echo $tbl $index_id
done
```

"we need tables"

```
mysql test -e "SELECT NAME FROM SYS_TABLES"
...

mysql test -e "SELECT NAME FROM SYS_TABLES" -NB > tables
...

vim tables //  delete all non-wp_... tables
chmod +x recover.sh // "make sure all index id's can be found."
./recover.sh // run script
... // ERRORS
```

edit recovery script

```c#
......
        $tbl' ORDER BY 1 LIMIT 1;" test)
        echo $tbl $index_id
done
```

run recover.sh again

```
./recover.sh
... // outputs wp tables with id's
```

> "Now we need Table structure, in this case we get it from wordpress installation scripts, "most reliable, accurate table structure" _see video at ~ [20:00 min.](https://youtu.be/vyUzlDANbRA)_

write a script to prepare table structure. need each table in a separate file.
`get_schema.sh`

```c#
for tbl in $(cat tables)
do
        echo $tbl
done
```

```
chmod +x get_schema.sh
./get_schema.sh // doesn't work?
```

edit script `get_schema.sh`

```c#
for tbl in $(cat tables)
do
        echo $tbl
        mysqldump -d --skip-lock-tables test $tbl > schema/$tbl.sql
done
```

run `get_schema.sh`
...

```
vim schema/wp_posts.sql
```

stuff about recovered tables, and sql queries

edit script `get_schema.sh`

```c#
for tbl in $(cat tables)
do
        echo $tbl
        mysqldump -d --skip-add-drop-table --skip-lock-tables test $tbl > schema/$tbl.sql
done
```

run `get_schema.sh`
...

```
vim schema/wp_posts.sql
```

"now it looks good lets see if we can use that. our posts index table was 58 so let try to recover"

- `-6` - "-5, -6, -4 option specifies records for map of this innoDB page. -6 because it's compact, both 5 and 6 are compact version, but -5 means versions before 5/6. -6 means versions 5/6 and up"

```
./c_parser -6 -f pages.-disk.img/FIL_PAGE_INDEX/0000000000000058.page -t schema/wp_posts.sql | less
```

specify table structure: `-t schema/wp_posts.sql`

~23:39 "it looks like it recovers a record correctly, date/time fields are valid... some autofills are valid... so far so good...

```
####CannotOpen_./0000000000000021.page;
```

`c_parser` tried to open external page and it couldn't because it was looking in current directory,but it was stored in `pages-disk.img/FIL_PAGE_TYPE_BLOB` so lets try this command.

```
./c_parser -6 -f pages.-disk.img/FIL_PAGE_INDEX/0000000000000058.page -t schema/wp_posts.sql -b pages-disk.img/FIL_PAGE_TYPE_BLOB | less
```

"now there are no errors, almost ready. We need to save table dump in a file"
we put them in a file with same name and standard error output and store in a separate .sql file:

```
mkdir -p dumps/twindb
// edit command
./c_parser -6 -f pages-disk.img/FIL_PAGE_INDEX/0000000000000058.page -t schema/wp_posts.sql -b pages-disk.img/FIL_PAGE_TYPE_BLOB > dumps/twindb/wp_posts 2> dumps/twindb/wp_posts.sql
```

now we have table separated values dump. we need to load data in file sql command and that command is stored in this file:

```
dumps/twindb/wp_posts.sql
```

> "`c_parser` produces the valid load data in file command into standard error output. It lists correct field names, if some fields need decoding, it generates correct sql statement. it tries to guess filename with dump, but if you look closely it's not this file..."

```
LOAD DATA LOCAL INFILE '/root/undrop-for-innodb/dumps/default/wp_posts'
```

it is actually...

```
/root/dumps/undrop-for-innodb/dumps/twindb/wp_posts
```

then we can fix this command if we add the option `-p twindb`...

```
./c_parser -6 -f pages-disk.img/FIL_PAGE_INDEX/0000000000000058.page -t schema/wp_posts.sql -b  pages-disk.img/FIL_PAGE_TYPE_BLOB -p twindb > dumps/twindb/wp_posts 2> dumps/twindb/wp_posts.sql
```

"now if we look at the sql file. we will see the file name exists. It is convenient to keep table dumps in separate directories. that is why -p is good because you can specify what file."

```
./c_parser -6 -f pages-disk.img/FIL_PAGE_INDEX/0000000000000058.page -t schema/wp_posts.sql -b  pages-disk.img/FIL_PAGE_TYPE_BLOB -p twindb > dumps/twindb/wp_posts 2> dumps/twindb/wp_posts.sql
```

"this looks like our final command, lets put it in our recover script"

```c#
for tbl in $(cat tables)
do
        index_id=$(mysql -NBe "select * from SYS_TABLES JOIN SYS_INDEXES ON SYS_INDEXES.TABLE_ID = SYS_TABLE_ID WHERE SYS_TABLES.NAME = 'twindb/$tbl' ORDER BY 1 LIMIT 1;")
        echo $tbl $index_id
        ./c_parser \
                -6 \
                -f pages-disk.img/FIL_PAGE_INDEX/00000000000000$index_id.page \
                -t schema/$tbl.sql \
                -b pages-disk.img/FIL_PAGE_TYPE_BLOB \
                -p twindb \
                 > dumps/twindb/$tbl 2> dumps/twindb/$tbl.sql
done
```
