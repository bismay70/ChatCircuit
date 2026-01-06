import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import {Server} from "socket.io";

const app = express();
const server = http.createServer(app)
//http kyki socktio suprt this

//initialize socket.io
export const io = new Server(server,{
  cors:{origin:"*"}
})

//store online users
export const userSocketMap = {}; //{userId:socketId}

//socket io connection handler
io.on("connection",(socket)=>{

    const userId = socket.handshake.query.userId;
    console.log("user connected",userId);
  if(userId){
    userSocketMap[userId] = socket.id;
  }
//emit online sers to all connetced clients
  io.emit("getOnlineUsers",Object.keys(userSocketMap));

  socket.on("disconnect",()=>{
    console.log("Disconnected",socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  })
})



//middlewares 
app.use(express.json({limit:"4mb"}))
app.use(cors({
  origin: "https://chat-circuit-emez5qgte-bismay70s-projects.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

//allow all url to conect with bcknd

//routes setup
app.use("/api/status",(req,res)=>res.send("Server live"))
app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter);



//connet to mongodb
await connectDB()

if(process.env.NODE_ENV !== "production"){
const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>console.log('Server on port: ' + PORT))
}

export default server