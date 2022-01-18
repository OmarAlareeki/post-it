import React, { useState, useEffect } from "react";
import { auth, db } from "../config/fire-config";
import {
  query,
  onSnapshot,
  orderBy,
  limit,
  collection
} from "firebase/firestore";
import Moment from "moment";

function Message() {
  const [ messages, setMessages ] = useState([]);
  const [ messagetoSend, setMessagetoSend ] = useState('')
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(
      collection(db, "messages", "message", "ChatMessages"),
      orderBy("createdAt"),
      limit(50)
    );
    onSnapshot(q, snapshot => {
      const msgs = [];
      snapshot.forEach(doc => msgs.push(doc.data()));
      setMessages(msgs);
      user && console.log(user.uid)
    });
  }, []);

  const sendMessage= () =>{
    {
    }
  }

  return (
    <div className="chatBox">
      <div className="chatMessage">
        {messages.map(msg => {
          return (
            <div key={msg.id}>
              <p>
                {Moment(msg.createdAt.seconds).format("MM/DD/YYYY")}
              </p>
              {/* <img src={photoURL} alt="" /> */}
              <p>
                {msg.text}
              </p>
            </div>
          );
        })}
      </div>
      <div className="sendMessage">
        <input onChange={(e)=>{setMessagetoSend(e.target.value)}}/>
        <button>send</button>
      </div>
    </div>
  );
}

export default Message;
