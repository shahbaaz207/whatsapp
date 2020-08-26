import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useStateValue } from "./StateProvider";

import {
  SearchOutlined,
  AttachFile,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from 'firebase'

const Chat = () => {

  const [{user},dispatch]=useStateValue()
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    setSeed(Math.random() * 5000);
  }, []);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snap) => setRoomName(snap.data().name));
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy('timestamp','asc')
        .onSnapshot((snap) => setMessage(snap.docs.map((doc) => doc.data())));
    }
  }, [roomId]);

  const sendMessages = (e)=>{
      e.preventDefault()
      db.collection('rooms').doc(roomId).collection('messages').add({
        message:input,
        name:user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>last seen {""}
          {new Date(
            message[message.length-1]?.timestamp?.toDate()).toUTCString()
           }
          </p>
        </div>
        <div className="chat_headerRight">
          <SearchOutlined />
          <AttachFile />
          <MoreVertIcon />
        </div>
      </div>
      <hr />
      <div className="chat_body">
        {message.map((message) => (
          <p className={`chat_message ${message.name===user.displayName && "chat_recevier"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessages}>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
