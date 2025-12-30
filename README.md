# ChatApp = ChatCircuit💬

A full-stack real-time chat application built with React (Vite) on the frontend and Express + MongoDB + Socket.io on the backend. It supports authentication (signup/login), real-time messaging (text and images), profile updates, online presence indicators, and an intuitive sidebar + message pane layout.

---
<p align="center">
  <img src="" alt="Project screenshot" width="800" style="max-width:100%;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.15)" />
</p>

---

## 🚀 Quick Overview

**ChatAPP** is a lightweight, developer-friendly chat demo that demonstrates common chat app patterns: JWT-based authentication, REST APIs for user and message operations, file/image upload via Cloudinary, and realtime message delivery using Socket.io.

## ✅ Features

- User authentication: signup, login, JWT-protected routes
- Profile management (update name, bio, profile picture)
- Realtime chat using Socket.io (online presence + real-time messages)
- Text and image messages (images are uploaded to Cloudinary)
- Unseen message counts and message marking
- Responsive UI with a sidebar (users), chat area, and right-side profile & media panel
- Uses `react-pdf` (if present) for PDF/resume support in client
- Minimal global state using contexts (AuthContext & ChatContext)

## 🖼 Screenshots (placeholders)

Place your project screenshots in `./client/public/screenshots/` (create the folder if it doesn't exist) and replace the placeholders below.

![App - Main view](./client/public/screenshots/01-main.png)
*Main layout: sidebar, chat pane, and right profile panel*

![App - Chat view](./client/public/screenshots/02-chat.png)
*Messaging view with images and text*

![App - Mobile / Responsive](./client/public/screenshots/03-mobile.png)
*Responsive/mobile layout*

> Tip: Use PNG or JPG files named like `01-main.png`, `02-chat.png`, etc. For documentation you can capture 1200×700px images for good clarity.

## 🔧 Tech Stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (MONGODB_URI)
- Realtime: Socket.io
- Auth: JSON Web Tokens (JWT)
- File storage: Cloudinary
- Utilities: bcryptjs, dotenv, cors

## 📁 Project Structure (high-level)

- `/client` — React frontend (Vite)
  - `src/components` — UI components (Sidebar, ChatContainer, RightSidebar)
  - `src/context` — `AuthContext`, `ChatContext`
  - `public/screenshots` — put your screenshots here
- `/server` — Express backend
  - `controllers/` — `userController`, `messageController`
  - `routes/` — user & message routes
  - `lib/` — `db.js`, `cloudinary.js`, utilities
  - `middleware/` — `auth.js`

## ⚙️ Environment & Setup

Create `.env` files in the `server` directory with the following variables:

```
PORT=5000
MONGODB_URI=<your-mongodb-connection-string-without-db>
JWT_SECRET=<a-strong-secret>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

If you run the client separately (recommended during development), add the backend URL to the client environment (root of `client`):

```
VITE_BACKENDUrl=http://localhost:5000
```

## 🧭 Run Locally

1. Install backend dependencies and start the server

```bash
cd server
npm install
npm run start  # or `npm run dev` if you add nodemon script
```

2. Install frontend dependencies and start the client

```bash
cd ../client
npm install
npm run dev
```

Open your browser at the URL printed by Vite (typically http://localhost:5173) and ensure your backend is running (http://localhost:5000).

## 🔗 API Endpoints (summary)

- POST `/api/auth/signup` — create user
- POST `/api/auth/login` — login (returns token)
- GET `/api/auth/check-auth` — validate token (protected)
- PUT `/api/auth/update-profile` — update profile (protected)
- GET `/api/messages/users` — get users for sidebar (protected)
- GET `/api/messages/:id` — get conversation messages with a user (protected)
- POST `/api/messages/:id` — send a message to a user (protected)

> All protected routes expect the JWT token in the `token` header (e.g., `token: <jwt>`).

## 🔌 Socket.io

- The client uses Socket.io to connect and send/receive real-time events (online user list updates, incoming messages). Ensure the client `VITE_BACKENDUrl` points to the running server and that Socket.io is enabled on the backend.

## ✅ Notes & Tips

- Images are uploaded to Cloudinary from the server using the `cloudinary` SDK — confirm your Cloudinary env vars are set.
- MongoDB connection string should include the host and credentials; the app appends `/chat-circuit` to the `MONGODB_URI`.
- If using Postman or similar, set `token` header before calling protected routes.

## 🤝 Contributing

Contributions are welcome — open an issue or submit a pull request. Suggested flow:

1. Fork → feature branch
2. Implement & test changes
3. Run `npm run lint` in `client` and ensure server builds cleanly
4. Submit PR with a clear description

## 📜 License

Add a LICENSE file (MIT is a common choice) if you plan to publish this repository.

---

If you want, I can:

- Add example screenshot files to `client/public/screenshots` and a small `.gitkeep` placeholder
- Inject a small `README` snapshot into the `client` README linking back to this root README

Tell me which you'd prefer and I'll implement it. ✨
