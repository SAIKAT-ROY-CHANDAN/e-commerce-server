# E-commerce Backend Server

## Overview

This project is a Node.js application that uses Express for the server framework, Mongoose for MongoDB interactions, and Zod for schema validation. The environment variables are managed using `dotenv`, and TypeScript is used for type checking and development convenience.

## Prerequisites

Before running this project locally, ensure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (local instance or access to a remote instance)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/assignment-2.git
cd assignment-2
```

### 2. Install Dependencies

``` 
npm install 
```

### 3. Configure Environment Variables

Create a .env file in the root of the project and add your MongoDB URI and other environment variables as required. Here is an example of what the .env file might look like:

```
MONGODB_URI=mongodb://localhost:27017/your-database-name
PORT=3000
```

### 4. Running the Application

***Using TypeScript Compiler (tsc)***

First, build the project using the TypeScript compiler:

``` 
npm run build
```
Then, start the server:
Using ts-node-dev (for Development)
For a better development experience with automatic restarts on file changes, use `ts-node-dev`:

``` 
tsnd --respawn ./src/server.ts
```

### 5. Linting the Code
To check for linting errors and code style issues, run:

``` 
npm run lint
```

# Author
``` 
Saikat Roy Chandan
saikotroydev@gmail.com
```

