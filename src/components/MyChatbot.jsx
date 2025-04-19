import { useState } from "react";

import Chatbot from "react-chatbot-kit";
import config from "../../bot/config.js";
import MessageParser from "../../bot/MessageParser.jsx";
import ActionProvider from "../../bot/ActionProvider.jsx";
import "react-chatbot-kit/build/main.css";
import "../styles/MyChatbot.css";

const MyChatbot = () => {
  const imgPathBubble = "/images/bubble.svg";

  const [showBot, setShowBot] = useState(false);

  const toggleBot = () => {
    setShowBot(!showBot);
  };

  return (
    <div>
      <button className="chatbot-button" onClick={toggleBot}>
        <img src={imgPathBubble} alt="챗봇" />
      </button>

      {showBot && (
        <div className="chatbot-wrapper">
          <button className="chatbot-minimize-button" onClick={toggleBot}>
            ✕
          </button>
          <Chatbot
            className="chatbot-container"
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
};

export default MyChatbot;
