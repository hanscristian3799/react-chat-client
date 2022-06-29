import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [isChatShown, setIsChatShown] = useState(false);

  const joinRoom = () => {
    if (name !== "" || room !== "") {
      socket.emit("join_room", { room });
      setIsChatShown(true);
    }
  };

  return (
    <div className="App">
      {isChatShown ? (
        <Chat socket={socket} username={name} room={room} />
      ) : (
        <div className="join-container">
          <h1>Join Chat</h1>
          <input
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="room number"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Connect</button>
        </div>
      )}
    </div>
  );
}

export default App;
