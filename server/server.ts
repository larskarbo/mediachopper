require("dotenv").config();
import http from "http";
import { isDev } from "./envUtils";
import app from "./serverRoutes";


const server = http.createServer(app);
const PORT = process.env.PORT || 3200;

server.listen(PORT, () => {
  console.log(`${isDev ? "[DEVELOPMENT]" : ""} Listening to port ${PORT}`);
});
