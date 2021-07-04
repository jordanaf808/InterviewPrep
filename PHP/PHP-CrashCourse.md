<br>

---

# PHP For Absolute Beginners | 6.5hr course | _[The Codeholic](https://youtu.be/2eebptXfEvw)_

---

<br>

## Templating OR "Include" files

```
<?php include "partials/header.php"; ?>
```

1. Include - If file missing it will print an error AND execute the rest of the code.
2. Require - If file missing it will ONLY print an error
3. Include/Require_once - no matter how many times you accidentally 'include' the file, it will only import it once.

---

<br>

## Magic Constants

- Change their value based on the execution context
- e.g. `__DIR__` - prints current directory, `__FILE__` - prints current file.

---

<br>

## File System

_Get all PHP file system commands [HERE](https://www.php.net/manual/en/book.filesystem.php)_

<br>

- Make directory: `mkdir('original name');`
- Rename directory: `rename('original name', 'new name');`
- Remove directory: `rmdir('new name');`
- Read files and folders in directory: `echo file_get_contents('lorem.txt')`
- read files and folders in directory: `scandir('./directory')`

  - e.g.
    ```php
    $files = scandir('./directory');
    echo '<pre>';
    var_dump($files);
    echo '<pre>';
    ```
  - returns:
    ```
      array(4) {
        [0]=>
        string(1) "."
        [1]=>
        string(2) ".."
        [2]=>
        string(9) "index.php"
        [3]=>
        string(9) "lorem.txt""
      }
    ```

- Create and/or Write content to file:

  ```php
  echo file_put_contents('newContent.txt','write new content to file');
  ```

- Also can get content from a URL:

  ```php
  $jsonData = file_get_contents('https://jsonplaceholder.typicode.com/users');
  echo $jsonData;
  ```

- Convert JSON data into an Array:

  ```php
  $decodeJsonData = json_decode($jsonData);

    echo '<pre>';
    var_dump($decodeJsonData);
    echo '<pre>';
  ```

---

<br>

## OOP

---

- `Class` - a blueprint that defines properties or functions or instances/variables.

- `Private` -

- `Public` -

- `Static` properties and methods of a class/constructor don't belong to the newly created instance of that class, instead they stay with the constructor. to use:

```php
class Person {
  public $name;
  public $surname;
  private $age;
  public static $counter = 0;

  public function __contruct($name, $surname)
  {
      $this->name = $name;
      $this->surname = $surname;
  }
}
self::$counter++;
```

creates new person

```php
$p = newPerson(); // instance
    echo '<pre>';
    var_dump($p);
    echo '<pre>';
```
