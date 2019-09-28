import {
  SET_CURRENT_CHATROOM,
  SET_LOADING_CURRENT_CHATROOM,
  UNSET_CURRENT_CHATROOM,
  CHECK_FOR_CURRENT_CHATROOM,
  SET_LOADING_ADD_MESSAGE,
  ADD_NEW_MESSAGE,
  UNSET_LOADING_ADD_MESSAGE
} from "./types";

export const currentInitState = {
  currentChatRoom: null,
  loading_current_chatroom: false,
  loading_message: false
};

export const currentReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_CHATROOM:
      return {
        ...state,
        loading_current_chatroom: false,
        currentChatRoom: action.payload
      };
    case SET_LOADING_CURRENT_CHATROOM:
      return {
        ...state,
        loading_current_chatroom: true
      };

    case UNSET_CURRENT_CHATROOM:
      return currentInitState;
    case CHECK_FOR_CURRENT_CHATROOM: {
      if (
        state.currentChatRoom &&
        state.currentChatRoom.chatRoomName === action.payload
      ) {
        return currentInitState;
      } else {
        return state;
      }
    }
    case SET_LOADING_ADD_MESSAGE:
      return {
        ...state,
        laoding_message: true
      };
    case UNSET_LOADING_ADD_MESSAGE:
      return {
        ...state,
        laoding_message: false
      };
    case ADD_NEW_MESSAGE: {
      if (
        state.currentChatRoom &&
        action.payload.chatRoomName === state.currentChatRoom.chatRoomName
      )
        return {
          ...state,
          currentChatRoom: {
            ...state.currentChatRoom,
            messages: [...state.currentChatRoom.messages, action.payload]
          }
        };
      else {
        return state;
      }
    }

    default:
      return state;
  }
};
