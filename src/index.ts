import express from "express";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/userRoute";
import dotenv from "dotenv"
import cors from "cors"
import { WebSocketServer } from "ws";
// import { setupWebSocket } from "./websocket";
import { createServer } from "http";
// import server from "http";

dotenv.config();

const portEnv = process.env.PORT;
if(!portEnv){
   console.error("Error: PORT is not defined in .env file");
   process.exit(1);
}

const PORT:number = parseInt(portEnv, 10);
if(isNaN(PORT)){
   console.error("Error: PORT is not a number in .env file");
   process.exit(1);
}

const app = express();
const server = createServer(app);
const corsOptions = {
    origin:
    "*",
    Credentials: true,
    allowedHeaders: "*",
    methods:"GET, HEAD, PUT, PATCH, POST, DELETE"
};

app.use(cors(corsOptions));

app.use(express.json());

const wss = new WebSocketServer({ server });
// const onlineUsers = new Set<string>();

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  ws.on("message", (message) => {
   // try {
   //    const data = JSON.parse(message.toString());

   //    if (data.type === "join") {
   //      onlineUsers.add(data.user);
   //      broadcastOnlineUsers();
   //    } else if (data.type === "leave") {
   //      onlineUsers.delete(data.user);
   //      broadcastOnlineUsers();
   //    }
   //  } catch (error) {
   //    console.error("Error processing message:", error);
   //  }
    console.log("Received:", message.toString());
    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });

//       ws.on("message", (message) => {
//     const data = JSON.parse(message.toString());

//     if (data.type === "message") {
//       console.log("Received Message:", data);

//       // Broadcast message to all clients
//       wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(JSON.stringify(data));
//         }
//       });
//     }

//     if (data.type === "typing") {
//       console.log(`${data.user} is typing...`);
      
//       // Broadcast typing status to all clients except sender
//       wss.clients.forEach((client) => {
//         if (client !== ws && client.readyState === WebSocket.OPEN) {
//           client.send(JSON.stringify({ type: "typing", user: data.user }));
//         }
//       });
//     }

//     if (data.type === "stopTyping") {
//       console.log(`${data.user} stopped typing`);

//       // Broadcast stopTyping event to all clients except sender
//       wss.clients.forEach((client) => {
//         if (client !== ws && client.readyState === WebSocket.OPEN) {
//           client.send(JSON.stringify({ type: "stopTyping", user: data.user }));
//         }
//       });
//     }
//   });


  ws.on("close", () => {
   // onlineUsers.delete(ws.id);
   //  broadcastOnlineUsers();
    console.log("WebSocket client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

//   function broadcastOnlineUsers() {
//    const usersArray = Array.from(onlineUsers);
//    wss.clients.forEach((client) => {
//      if (client.readyState === ws.OPEN) {
//        client.send(JSON.stringify({ type: "onlineUsers", users: usersArray }));
//      }
//    });
//  }
});


app.use("/api/v1/users", userRouter)


server.listen(4000, () => console.log("Server running on port 4000"));


