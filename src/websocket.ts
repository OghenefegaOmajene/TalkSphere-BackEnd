// import { WebSocketServer } from "ws";

// export function setupWebSocket(server) {
//   const wss = new WebSocketServer({ server });
//   const clients = new Set();

//   wss.on("connection", (ws) => {
//     console.log("New WebSocket connection");
//     clients.add(ws);

//     ws.on("message", (message) => {
//       const receivedMessage = JSON.parse(message.toString());
//       console.log("Received:", receivedMessage);

//       clients.forEach((client) => {
//         if (client !== ws && client.readyState === ws.OPEN) {
//           client.send(JSON.stringify(receivedMessage));
//         }
//       });
//     });

//     ws.on("close", () => {
//       console.log("Client disconnected");
//       clients.delete(ws);
//     });
//   });

//   return wss;
// }



// import { WebSocketServer, WebSocket } from "ws";

// export function setupWebSocket(server) {
//   const wss = new WebSocketServer({ server });
//   const clients = new Set();

//   wss.on("connection", (ws) => {
//     console.log("New WebSocket connection");
//     clients.add(ws);

//     ws.on("message", (message) => {
//       const receivedMessage = JSON.parse(message.toString());
//       console.log("Received:", receivedMessage);

//       clients.forEach((client) => {
//         if (client !== ws && client.readyState === WebSocket.OPEN) { // ✅ Fix here
//           client.send(JSON.stringify(receivedMessage));
//         }
//       });
//     });

//     ws.on("close", () => {
//       console.log("Client disconnected");
//       clients.delete(ws);
//     });

//     ws.on("error", (error) => {
//       console.error("WebSocket error:", error);
//     });
//   });

//   return wss;
// }


import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http"; // ✅ Ensure HTTP server type is imported

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server });
  const clients = new Set<WebSocket>();

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");
    clients.add(ws);

    ws.on("message", (message) => {
      try {
        const receivedMessage = JSON.parse(message.toString());
        console.log("Received:", receivedMessage);

        clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) { 
            client.send(JSON.stringify(receivedMessage));
          }
        });
      } catch (error) {
        console.error("Invalid JSON message received:", error);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      clients.delete(ws);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  return wss;
}
