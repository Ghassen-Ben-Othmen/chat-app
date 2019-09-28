import React from "react";

import Wallpaper from "../../images/wallpaper.png";

import ChatRoomtitle from "./ChatRoomTitle";
import Messages from "./Messages";
import SendMessageInput from "./SendMessageInput";
import SkeletonSend from "./skeleton/SkeletonSend";
import SkeletonMessages from "./skeleton/SkeletonMessages";
import SkeletonTitle from "./skeleton/SkeletonTitle";

const ChatRoom = ({ chatRoomState }) => {
  const { loading_current_chatroom, currentChatRoom } = chatRoomState;

  return (
    <div>
      {!currentChatRoom && !loading_current_chatroom ? (
        <img
          style={{
            height: "40vh",
            width: "100%",
            paddingTop: "20%"
          }}
          src={Wallpaper}
        />
      ) : loading_current_chatroom ? (
        <React.Fragment>
          <SkeletonTitle />
          <SkeletonMessages />
          <SkeletonSend />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ChatRoomtitle currentChatRoom={currentChatRoom} />
          <Messages messages={currentChatRoom.messages} />
          <SendMessageInput />
        </React.Fragment>
      )}
    </div>
  );
};

export default ChatRoom;
