import React from "react";
import io from "socket.io-client";

import { uiInitState, uiReducer } from "./uiData";
import { userInitState, userReducer } from "./userData";
import { dataInitState, dataReducer } from "./data";
import { currentInitState, currentReducer } from "./currentChatRoomData";
import { ADD_AVAILABLE_CHATROOM, ADD_NEW_MESSAGE } from "./types";

import { deleteChatRoomTriggerEvent } from "./actions";

export const Context = React.createContext();

let socket;

const AppContext = props => {
  const [uiState, uiDispatch] = React.useReducer(uiReducer, uiInitState);
  const [userState, userDispatch] = React.useReducer(
    userReducer,
    userInitState
  );
  const [dataState, dataDispatch] = React.useReducer(
    dataReducer,
    dataInitState
  );
  const [currentChatRoomState, currentChatRoomDispatch] = React.useReducer(
    currentReducer,
    currentInitState
  );

  if (!socket) {
    socket = io(":5000");
    socket.on("addChatRoom", chatRoom => {
      let parsedChatRoom = JSON.parse(chatRoom);
      let { chatRoomName, userHandle } = parsedChatRoom.userJoinedChatRoom;
      let availableChatRoom = {
        chatRoomName,
        userHandle
      };
      if (window.location.pathname === "/")
        dataDispatch({
          type: ADD_AVAILABLE_CHATROOM,
          payload: availableChatRoom
        });
    });

    socket.on("deleteChatRoom", chatRoom => {
      if (window.location.pathname === "/")
        deleteChatRoomTriggerEvent(
          JSON.parse(chatRoom),
          currentChatRoomState,
          dataDispatch,
          userDispatch,
          currentChatRoomDispatch
        );
    });

    socket.on("addMessage", data => {
      if (window.location.pathname === "/") {
        let res = JSON.parse(data);
        let message = res.message;

        currentChatRoomDispatch({ type: ADD_NEW_MESSAGE, payload: message });
      }
    });

    socket.on("leaveChatRoom", data => {
      if (window.location.pathname === "/") {
        let message = JSON.parse(data);
        currentChatRoomDispatch({ type: ADD_NEW_MESSAGE, payload: message });
      }
    });

    socket.on("joinChatRoom", data => {
      if (window.location.pathname === "/") {
        let message = JSON.parse(data);
        currentChatRoomDispatch({ type: ADD_NEW_MESSAGE, payload: message });
      }
    });
  }

  const store = {
    uiState,
    uiDispatch,
    userState,
    userDispatch,
    dataState,
    dataDispatch,
    currentChatRoomState,
    currentChatRoomDispatch,
    socket
  };

  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

export default AppContext;
