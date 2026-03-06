import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

//initialize socket.io
export const io = new Server(server, {
  cors: { origin: "*" },
});

//store online users
export const userSocketMap = {}; //{userId:socketId}

//socket io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("user connected", userId);
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  //emit online sers to all connetced clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("Disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

//middlewares
app.use(express.json({ limit: "4mb" }));
const allowedOrigins = [
  "https://chat-circuit-client-git-main-bismay70s-projects.vercel.app",
  "https://chat-circuit-client.vercel.app", // Add production URL if known
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin matches any allowed origin or is a subset (like a vercel preview deployment)
      // For simplicity, we'll allow all vercel.app subdomains for this user's project to avoid future errors with new deployments
      if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith("-bismay70s-projects.vercel.app")) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

//routes setup
app.get("/", (req, res) => res.send("Server is running")); // Root route
app.use("/api/status", (req, res) => res.send("Server live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Database connection for Vercel (serverless)
// In local development, we want to connect immediately.
// In serverless, we might want to connect inside the handler, but top-level await is supported in Node 14+ and Vercel.
// We'll wrap it in a function to be safe and call it.
connectDB().catch(console.error);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server on port: " + PORT));
}

// Export "app" for Vercel, not "server"
export default app;