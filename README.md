# HumanChain AI Safety

A robust Express + TypeScript + PostgreSQL API for managing AI safety incident reports with high-performance database access.

## 📚 Table of Contents
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Setup Instructions](#-setup-instructions)
- [API Reference](#-api-reference)
- [Example Usage](#-example-usage)

## 🛠 Tech Stack

- **Language:** TypeScript
- **Framework:** Node.js with Express
- **Database:** PostgreSQL (via Neon.tech)
- **ORM:** Prisma with Accelerate connection pooling
- **Deployment:** Cloudflare Workers (via Wrangler)

## 🏗 Architecture

HumanChain AI Safety uses a modern, scalable architecture:

- **PostgreSQL Database** hosted on [Neon.tech](https://neon.tech/) for serverless, auto-scaling Postgres
- **Prisma Accelerate** for intelligent connection pooling and edge-optimized database access
- **Express** for robust API routing and middleware support
- **TypeScript** for type safety and improved developer experience

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/yourusername/humanchain-ai-safety.git
cd humanchain-ai-safety
npm install
```

2. Install Prisma and initialize:
```bash
npm i prisma
npx prisma init
```

3. Configure environment variables in `.env`:
```
DATABASE_URL="put_your_postgres_sql_database_url"
PORT=6000
NODE_ENV=development
```

4. Create and configure your `wrangler.toml`:
```toml
name = "HumanChain AI Safety"
main = "src/index.ts"
compatibility_date = "2025-01-20"
[vars]
DATABASE_URL="put_your_prisma_accelerate_url"
```

5. Run database migrations:
```bash
npx prisma migrate dev --name init_schema
```

6. Generate Prisma client:
```bash
npx prisma generate --no-engine
```

### Dependencies

#### Production Dependencies
```json
{
  "@prisma/client": "^6.7.0",
  "@prisma/extension-accelerate": "^1.3.0",
  "cors": "^2.8.5",
  "dotenv": "^16.5.0",
  "express": "^5.1.0",
  "prisma": "^6.7.0",
  "typescript": "^5.8.3",
  "wrangler": "latest"
}
```

#### Development Dependencies
```json
{
  "@types/cors": "^2.8.17",
  "@types/express": "^5.0.1"
}
```

## 📡 API Reference

| Endpoint | Method | Description | Status Codes |
|----------|--------|-------------|-------------|
| `/api/v1/humanchain/incidents` | POST | Create a new incident | 201 Created, 400 Bad Request |
| `/api/v1/humanchain/incidents` | GET | Get all incidents | 200 OK |
| `/api/v1/humanchain/incidents/:id` | GET | Get incident by ID | 200 OK, 404 Not Found |
| `/api/v1/humanchain/incidents/:id` | DELETE | Delete incident by ID | 200 OK, 404 Not Found |

## 📝 Example Usage

### Create an Incident

**Request:**
```http
POST http://localhost:6000/api/v1/humanchain/incidents

{
  "title": "Database Server Crash",
  "description": "Database server went down, affecting all services.",
  "severity": "Low"
}
```

**Response:** (201 Created)
```json
{
  "id": 1,
  "title": "Database Server Crash",
  "description": "Database server went down, affecting all services.",
  "severity": "Low",
  "reported_at": "2025-05-03T19:58:33.439Z"
}
```
![Create Incident via Postman](/createIncident.png)

### Get All Incidents

**Request:**
```http
GET http://localhost:6000/api/v1/humanchain/incidents
```

**Response:** (200 OK)
```json
[
  {
    "id": 1,
    "title": "Database Server Crash",
    "description": "Database server went down, affecting all services.",
    "severity": "Low",
    "reported_at": "2025-05-03T19:58:33.439Z"
  },
  {
    "id": 2,
    "title": "Database Server Crash",
    "description": "Database server went down, affecting all services.",
    "severity": "Low",
    "reported_at": "2025-05-03T19:59:50.582Z"
  },
  {
    "id": 3,
    "title": "Power Failure in Data Center",
    "description": "Power outage caused by a failed UPS system.",
    "severity": "High",
    "reported_at": "2025-05-03T20:00:02.128Z"
  },
  {
    "id": 4,
    "title": "Power Failure in Data Center",
    "description": "Power outage caused by a failed UPS system.",
    "severity": "High",
    "reported_at": "2025-05-03T20:00:14.335Z"
  }
]
```
![Retrieve Incident via Postman](/getAllIncidents.png)

### Get Incident by ID

**Request:**
```http
GET http://localhost:6000/api/v1/humanchain/incidents/2
```

**Response:** (200 OK)
```json
{
  "id": 2,
  "title": "Database Server Crash",
  "description": "Database server went down, affecting all services.",
  "severity": "Low",
  "reported_at": "2025-05-03T19:59:50.582Z"
}
```
![Get Incident by Id via Postman](/getIncidentById.png)

### Delete Incident

**Request:**
```http
DELETE http://localhost:6000/api/v1/humanchain/incidents/4
```

**Response:** (200 OK)
```json
{
  "message": "Incident with ID 4 deleted successfully"
}
```
![Delete Incident by Id via Postman](/deleteIncidentById.png)

## 📊 Database Schema

The system uses a simple but extensible schema for incident reporting:

```prisma
model Incident {
  id           Int      @id @default(autoincrement())
  title        String
  description  String
  severity     String
  reported_at  DateTime @default(now())
}
```

Compile TypeScript code and start:
```bash
tsc -b
```

Start the server:
```bash
node dist/index.js
```

## 🔒 Security Notes

- Sensitive database credentials are stored in environment variables
- Proper input validation prevents SQL injection attacks
- API endpoints use appropriate HTTP status codes for comprehensive error handling

## 🚧 Future Enhancements

- Authentication and authorization
- Incident categorization and tagging
- Metrics and reporting dashboard
- Notification system for critical incidents