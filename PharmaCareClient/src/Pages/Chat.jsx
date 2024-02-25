import React, { useState } from 'react';
import ChatForm from '../Helper/ChatForm';
import '../Chat.css';

export const Chat = (props) => {
    let [showChat, setShowChat] = useState(false);

    const startChat = () => { setShowChat(true); }
    const hideChat = () => { setShowChat(false); }

    return (
        <>
            <div className="chat-bot">
                <div style={{ display: showChat ? "" : "none", textAlign: 'left', marginTop: 20 }}>
                    <ChatForm></ChatForm>
                </div>
                <div>
                    {!showChat
                        ? <button className="chat-btn" onClick={() => startChat()}>click to chat... </button>
                        : <button className="chat-btn" onClick={() => hideChat()}>click to hide... </button>}
                </div>
            </div>
        </>
    )
}