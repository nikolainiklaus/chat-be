import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import { newConnectionHandler } from "./socket/index.js";

const expressServer = express();
const port = process.env.PORT || 3001;

// **************************** SOCKET.IO **************************
const httpServer = createServer(expressServer);
const socketioServer = new Server(httpServer);

socketioServer.on("connection", newConnectionHandler);

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  httpServer.listen(port, () => {
    console.table(listEndpoints(expressServer));
    console.log(`Server listening on port ${port}`);
  });
});
