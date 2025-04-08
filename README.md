
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



## 🛠️ Run Locally

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/karanShaw000/syntax-stories.git
```

---

### 2. Setup the Backend

```bash
cd syntax-stories/server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file from the sample:

```bash
cp .env.sample .env
```

Edit `.env.local` and provide the following values:

- `MONGODB_URL` – Your MongoDB connection string
- `JWT_SECRET` – A secret key for JWT
- `COOKIE_SECRET` – A secret key for cookies
- `PORT` – (Optional) Default is `5000`

> ⚠️ If you change the backend port from `5000`, make sure to update the port in `client/src/libs/network.ts` for development.

Start the backend server:

```bash
npm run dev
```

---

### 3. Setup the Frontend

```bash
cd ../client
```

Install dependencies:

```bash
npm install
```

Start the React app (usually runs on `http://localhost:5173`):

```bash
npm run dev
```

---

You're now all set to use **Syntax-Stories** locally!
