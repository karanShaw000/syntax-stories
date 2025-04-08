
## 📖 Syntax-Stories (Blog Application)

**Syntax-Stories** is a Full Stack Blog Application built using the **MERN Stack** (MongoDB, Express, React, Node.js). It supports full **CRUD operations** for blog posts.

[Application Link](https://black-field-05a981b00.6.azurestaticapps.net/)

### 🔧 Frontend

- Built with **React**.
- **React Router** is used for client-side routing.
- **TanStack Query** handles data fetching and mutations efficiently.

### 🔙 Backend

- Built with **Express.js**.
- Implemented **JWT-based authentication**:
  - Tokens are stored in **cookies**.
  - An `authMiddleware` extracts the cookie and verifies the JWT to protect routes.
- Added **rate limiting** to auth routes using `express-rate-limit` to prevent abuse.

### 🗄️ Database

- Used **MongoDB** as the database.
- Integrated **Mongoose** as the ODM to model and interact with the data.

### 🚀 Deployment

- Deployed using **Microsoft Azure**:
  - The **Express backend** is hosted on **Azure App Service**.
  - The **React frontend** is deployed via **Azure Static Web Apps**.



## Run Locally

Clone the project

```bash
  git clone https://github.com/karanShaw000/syntax-stories.git
```

Go to the server directory

```bash
  cd syntax-stories/server
```

Install dependencies

```bash
  npm install
```

Make a .env file and paste the content of .env.sample to .env

```bash
  touch .env && cp .env.sample .env
```

Give a mongodb url, jwt_secret, cookie_secret and port. I used port 5000. I you change 5000 to some other port then you have to change the port in client/src/libs/network.ts for development.

Start the backend server in port 5000(if not changed)

```bash
  npm run dev
```

Go to the client directory

```bash
  cd syntax-stories/client
```

Install dependencies

```bash
  npm install
```

Start the client usually in port 5173

```bash
  npm run dev
```
