# Installation instructions
Tredu Älyroskis project 2025

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) (for database and backend services)

## Database setup
```bash
cd database
npm install
npx knex init
```

## Configure environment variables
Copy and rename `backend/env-blueprint` to `backend/.env`  
Edit `backend/.env` and fill in the database credentials  
For local Docker setup, you can use:
```
DB_HOST=db
DB_USER=root
DB_PASS=mypass123
DB_DATABASE=alyroskis_db
DB_TYPE=mysql2
DB_PORT=3306
PORT=3001
SECRET=tosisalainensalasanainen
```

## Backend and phpMyAdmin setup
Start Docker Desktop application  
*(open new terminal)*  
```bash
docker-compose up -d
```
Check running container in Docker Desktop  

## Simulate sending MQTT messages to API
- Open new terminal 1
```bash
cd backend
node mqtt/mock_broker.js
```

- Open new terminal 2
```bash
cd backend
node mqtt/mqtt_publisher.js
```

## Database migration sqlite -> mysql 
*Else see Usage with sqlite*  
Replace client with MySQL in database/knexfile.js
```
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'mypass123',
      database: 'alyroskis_db',
      port: 3306
    }
  },
```
*(open new terminal)*
Copy tables and data from sqlite to mysql:
```bash
cd database
npx knex migrate:latest
npx knex seed:run
```
Visit [localhost:8081](http://localhost:8081/) to see migrated tables and data via phpMyAdmin 

*(open new terminal)*
```bash
cd backend
npm install
npm start
```
Visit [localhost:3001](http://localhost:3001/) to see backend

*(optional) send login request with REST Client [VS Code plugin]*  
backend/tests/get_buildings.http

## Frontend setup
*(open new terminal)*
```bash
cd frontend
npm install
npm run dev
```
Visit [localhost:5173](http://localhost:5173/) to see web app

## Mobile frontend setup
Make .env file in mobilefrontend/ and set  
API_BASE=http://localhost:3001  
Replace localhost with your IPv4-Adress *when* using external device for testing.  
Replace localhost with host.docker.internal to connect backend running in container.  

*(open new terminal)*
```bash
cd mobilefrontend
npm install
npm start
```
*or to refresh bundler caches etc.*  
```bash
npx expo start --port 8082 --clear
```

- Open Android Studio and create any empty project to see Device Manager
- Start virtual Android Device
- Press 'a' in terminal to open app in emulator
- Choose 'Proceed anonymously'

## Usage with sqlite
Edit database/knexfile.js
```
  development: {
    client: 'sqlite3',
    connection: {
      filename: '../database/dev.sqlite3'
    },
    useNullAsDefault: true
  },
```