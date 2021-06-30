# AWS

---

## Intro To Cloud Computing

---

<br>

| Benefits                | Cloud Computing Models                 |
| ----------------------- | -------------------------------------- |
| - Decentralized         | **SaaS** - Software as a Service       |
| - Distributed Load      | **PaaS** - Platform as a Service       |
| - No physical servers   | **IaaS** - Infrastructure as a Service |
| - Pay only what you use |                                        |
| - Scale easily          |                                        |
| - Speed and Agility     |                                        |

<br>

### Features

---

| IaaS                                   | SaaS                                               | Paas                                                          |
| -------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------- |
| - control over every part of the cloud | Full feature UI without handling backend processes | Deploy and Manage without worrying about hardware             |
| - most flexibility and control         | Easy to use with minimal technical training        | e.g. Web Servers, Databases, Programming/Hosting Environments |
| - closest to the real thing            | Least flexible in terms of infrastructure.         | e.g. Azure, Google App Engine, Heroku                         |
| - Expert skill level                   |                                                    | Less flexibility in infrastructure                            |

<br>

### Deployments

---

| Cloud Deployment                      | On-Premises/Private Cloud                                    | Hybrid deploy.                                  |
| ------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| 100% in Cloud                         | Use virtualization in own data centers, no benefits of cloud | Combines On-Premises and Cloud Deployment       |
| e.g. Office365, MicrosoftTeams, Azure | Accessed by (quicker) local network, dedicated resources.    | e.g. for existing data centers, backup/disaster |
| flexible, affordable                  | secure, high-speed, virtualization                           | migration can take time, so this helps          |

<br>

### Design Principals

---

| Avoid Unnecessary Costs              | Reliability                | Security                 | Operational Excellence |
| ------------------------------------ | -------------------------- | ------------------------ | ---------------------- |
| Use only what you need               | Testing                    | Automated Best Practices | Document Everything    |
| reserve resources in advance of need | Redundancy                 | Data Always Protected    | Refine Efficiency      |
| continual optimization               | Disaster Recover Protocols | Traceability/Logs        | Updates                |

<br>

> TIP - Save Money by **Reserving** AWS resources.

<br>

## AWS Services

---

|                            |                       |
| -------------------------- | --------------------- |
| Lambda                     | serverless functions  |
| Elastic Compute (EC2)      | Virtual Machine       |
| LightSail                  | small websites        |
| Elastic Container Services | Web Apps              |
| RDS                        | SQL                   |
| DynamoDB                   | NoSQL                 |
| ElastiCache                | Caching               |
| Route53                    | Domain Name Registrar |

<br>

### Use Case - WordPress AMI on EC2

---

- Elastic Compute Cloud (EC2) - Virtual Server on AWS
- quickly setup a server preloaded with WordPress
- AMI Amazon Machine Images - preconfigured servers on AWS MarketPlace

<br>

### IAM - Identity Access Management

---

- many pre-made policies and roles available to attach to user or groups of users
- Roles - pre-configured sets of policies attached to a type of user.

<br>

### Cognito

---

- User Pools - sign-up/sign-in options
- Identity Pools - allow access to AWS services through 3rd party
