import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import db from "../firebase";
import { useStateValue } from "./StateProvider";

export const Sidebar = () => {
  const [room, setRoom] = useState([]);
  const [{user},dispatch]=useStateValue()

  useEffect(() => {
    const unSubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRoom(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <p>{user?.displayName}</p>
        <div className="sidebar_headerRight">
          <DonutLargeIcon className="icon" />
          <ChatIcon className="icon" />
          <MoreVertIcon className="icon" />
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or Start new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {room.map((item) => (
          <SidebarChat name={item.data.name} key={item.id} id={item.id} />
        ))}
      </div>
    </div>
  );
};
