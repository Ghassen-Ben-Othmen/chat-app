import {
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  SET_USER,
  ADD_NEW_CHATROOM,
  REMOVE_JOINED_CHATROOM,
  SET_USER_JOINED_CHATROOMS
} from "./types";

export const userInitState = {
  authenticated: false,
  credentials: {},
  userJoinedChatRooms: []
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...userInitState
      };
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload
      };
    case ADD_NEW_CHATROOM:
      return {
        ...state,
        userJoinedChatRooms: [action.payload, ...state.userJoinedChatRooms]
      };
    case REMOVE_JOINED_CHATROOM:
      return {
        ...state,
        userJoinedChatRooms: [
          ...state.userJoinedChatRooms.filter(
            chatRoom => chatRoom.chatRoomName !== action.payload
          )
        ]
      };
    case SET_USER_JOINED_CHATROOMS:
      return {
        ...state,
        userJoinedChatRooms: action.payload
      };
    default:
      return state;
  }
};
