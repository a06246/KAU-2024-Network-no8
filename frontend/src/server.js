import { io } from "socket.io-client";
const socket = io("ws://58.228.213.70:5001");
export default socket;