import {
  SET_AVAILABLE_CHATROOMS,
  SET_LOADING_DATA,
  UNSET_AVAILABLE_CHATROOMS,
  ADD_AVAILABLE_CHATROOM,
  REMOVE_AVAILABLE_CHATROOM
} from "./types";

export const dataInitState = {
  availableChatRooms: [],
  loading: false
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_AVAILABLE_CHATROOMS:
      return {
        ...state,
        loading: false,
        availableChatRooms: action.payload
      };
    case SET_LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case UNSET_AVAILABLE_CHATROOMS:
      return {
        dataInitState
      };
    case ADD_AVAILABLE_CHATROOM:
      return {
        ...state,
        availableChatRooms: [action.payload, ...state.availableChatRooms]
      };
    case REMOVE_AVAILABLE_CHATROOM:
      return {
        ...state,
        availableChatRooms: [
          ...state.availableChatRooms.filter(
            chatRoom => chatRoom.chatRoomName !== action.payload
          )
        ]
      };
    default:
      return state;
  }
};
