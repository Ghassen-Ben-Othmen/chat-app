import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  SET_UI_LOADING,
  UNSET_UI_LOADING,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  SET_LOADING_DATA,
  SET_AVAILABLE_CHATROOMS,
  SET_LOADING_CURRENT_CHATROOM,
  SET_CURRENT_CHATROOM,
  UNSET_AVAILABLE_CHATROOMS,
  UNSET_CURRENT_CHATROOM,
  ADD_NEW_CHATROOM,
  REMOVE_AVAILABLE_CHATROOM,
  REMOVE_JOINED_CHATROOM,
  ADD_AVAILABLE_CHATROOM,
  CHECK_FOR_CURRENT_CHATROOM,
  ADD_NEW_MESSAGE,
  SET_LOADING_ADD_MESSAGE,
  UNSET_LOADING_ADD_MESSAGE
} from "../data/types";

const base = "http://localhost:5000";

export const signupUser = async (newUser, dispatch, history) => {
  const url = `${base}/signup`;

  dispatch({ type: SET_UI_LOADING });
  dispatch({ type: CLEAR_ERRORS });

  try {
    const res = await axios.post(url, newUser);
    const data = res.data;
    if (data.success) {
      dispatch({ type: UNSET_UI_LOADING });
      history.push("/signin");
    }
  } catch (err) {
    dispatch({ type: UNSET_UI_LOADING });
    dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
  }
};

export const signinUser = async (
  user,
  dispatch,
  userDispatch,
  currentChatRoomDispatch,
  dataDispatch,
  history
) => {
  const url = `${base}/signin`;
  dispatch({ type: SET_UI_LOADING });
  dispatch({ type: CLEAR_ERRORS });

  try {
    const res = await axios.post(url, user);
    const data = res.data;
    // set token to localstorage
    setAuthorizationHeader(data.token);
    await getUserData(userDispatch, currentChatRoomDispatch);
    await getData(dataDispatch);
    dispatch({ type: UNSET_UI_LOADING });
    history.push("/");
  } catch (err) {
    console.log(err.response.data);
    dispatch({ type: UNSET_UI_LOADING });
    dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
  }
};

export const getUserData = async (dispatch, currentChatRoomDispatch) => {
  const url = `${base}/user`;

  try {
    const res = await axios.get(url);
    const payload = res.data;

    dispatch({ type: SET_USER, payload });
    if (payload.userJoinedChatRooms.length !== 0)
      getChatroom(
        payload.userJoinedChatRooms[0].chatRoomName,
        currentChatRoomDispatch
      );
  } catch (err) {
    console.log(err);
  }
};

export const checkForAuthentication = async (
  authenticated,
  dispatch,
  currentChatRoomDispatch,
  dataDispatch
) => {
  if (!authenticated) {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        // logout
        signout(dispatch, dataDispatch, currentChatRoomDispatch);
      } else {
        dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        getUserData(dispatch, currentChatRoomDispatch);
        getData(dataDispatch);
      }
    }
  }
};

export const signout = (dispatch, dataDispatch, currentChatRoomDispatch) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  dataDispatch({ type: UNSET_AVAILABLE_CHATROOMS });
  currentChatRoomDispatch({ type: UNSET_CURRENT_CHATROOM });
};

const setAuthorizationHeader = token => {
  const tokenToStore = `Bearer ${token}`;
  localStorage.setItem("token", tokenToStore);
  axios.defaults.headers.common["Authorization"] = tokenToStore;
};

// data actions
export const getData = async dispatch => {
  const url = `${base}/other-chatrooms`;
  dispatch({ type: SET_LOADING_DATA });
  try {
    const res = await axios.get(url);
    const data = res.data;
    dispatch({
      type: SET_AVAILABLE_CHATROOMS,
      payload: data.availableChatRooms
    });
  } catch (err) {
    console.log(err);
  }
};

export const getChatroom = async (chatroom, dispatch) => {
  const url = `${base}/chatroom/${chatroom}`;
  dispatch({ type: SET_LOADING_CURRENT_CHATROOM });
  try {
    const res = await axios.get(url);
    const data = res.data;
    dispatch({ type: SET_CURRENT_CHATROOM, payload: data.currentChatRoom });
  } catch (err) {
    console.log(err);
  }
};

export const addChatroom = async (
  chatroom,
  userDispatch,
  uiDispatch,
  handleClose,
  socket
) => {
  const url = `${base}/add-chatroom`;
  uiDispatch({ type: CLEAR_ERRORS });
  uiDispatch({ type: SET_UI_LOADING });
  try {
    const res = await axios.post(url, chatroom);
    const data = await res.data;
    socket.emit("addChatRoom", data);
    uiDispatch({ type: UNSET_UI_LOADING });
    userDispatch({ type: ADD_NEW_CHATROOM, payload: data.userJoinedChatRoom });
    handleClose();
  } catch (err) {
    uiDispatch({ type: UNSET_UI_LOADING });
    uiDispatch({ type: SET_ERRORS, payload: err.response.data.errors });
    console.log(err.response.data);
  }
};

export const joinChatRoom = async (
  request,
  uiDispatch,
  userDispatch,
  dataDispatch,
  currentChatRoomDispatch,
  handleClose,
  socket
) => {
  let url = `${base}/join-chatroom`;

  uiDispatch({ type: CLEAR_ERRORS });
  uiDispatch({ type: SET_UI_LOADING });
  try {
    let res = await axios.post(url, request);
    let data = await res.data;
    socket.emit("joinChatRoom", data.message);
    dataDispatch({
      type: REMOVE_AVAILABLE_CHATROOM,
      payload: data.userJoinedChatRoom.chatRoomName
    });
    userDispatch({ type: ADD_NEW_CHATROOM, payload: data.userJoinedChatRoom });
    uiDispatch({ type: UNSET_UI_LOADING });
    getChatroom(data.userJoinedChatRoom.chatRoomName, currentChatRoomDispatch);
    handleClose();
  } catch (err) {
    console.log(err.response.data);
    uiDispatch({ type: UNSET_UI_LOADING });
    uiDispatch({ type: SET_ERRORS, payload: err.response.data.errors });
  }
};

export const leaveChatRoom = async (
  chatRoom,
  uiDispatch,
  userDispatch,
  dataDispatch,
  currentChatRoomDispatch,
  socket
) => {
  let url = `${base}/leave-chatroom`;
  uiDispatch({ type: SET_UI_LOADING });

  try {
    let res = await axios.delete(url, {
      data: {
        chatRoom
      }
    });
    let data = await res.data;

    socket.emit("leaveChatRoom", data.message);

    userDispatch({
      type: REMOVE_JOINED_CHATROOM,
      payload: data.availableChatRoom.chatRoomName
    });
    dataDispatch({
      type: ADD_AVAILABLE_CHATROOM,
      payload: data.availableChatRoom
    });
    uiDispatch({ type: UNSET_UI_LOADING });
    currentChatRoomDispatch({ type: UNSET_CURRENT_CHATROOM });
  } catch (err) {
    console.log(err);
    uiDispatch({ type: UNSET_UI_LOADING });
  }
};

export const deleteChatRoom = async (
  chatRoom,
  uiDispatch,
  userDispatch,
  currentChatRoomDispatch,
  socket,
  handleClose
) => {
  let url = `${base}/delete-chatroom/${chatRoom}`;

  uiDispatch({ type: SET_UI_LOADING });
  try {
    let res = await axios.delete(url);
    let data = await res.data;
    if (data.success) {
      userDispatch({ type: REMOVE_JOINED_CHATROOM, payload: chatRoom });
      currentChatRoomDispatch({ type: UNSET_CURRENT_CHATROOM });
      uiDispatch({ type: UNSET_UI_LOADING });
      socket.emit("deleteChatRoom", chatRoom);
      handleClose();
    }
  } catch (err) {
    console.log(err);
    uiDispatch({ type: UNSET_UI_LOADING });
  }
};

export const addMessagToChatRoom = async (
  chatRoom,
  message,
  currentChatRoomDispatch,
  setMessage,
  socket
) => {
  let url = `${base}/add-message-to-chatroom/${chatRoom}`;
  currentChatRoomDispatch({ type: SET_LOADING_ADD_MESSAGE });
  try {
    let res = await axios.post(url, message);
    let data = await res.data;
    socket.emit("addMessage", data);
    setMessage("");
    currentChatRoomDispatch({ type: UNSET_LOADING_ADD_MESSAGE });
    currentChatRoomDispatch({ type: ADD_NEW_MESSAGE, payload: data.message });
  } catch (err) {
    console.log(err);
    currentChatRoomDispatch({ type: UNSET_LOADING_ADD_MESSAGE });
  }
};

// socket io
export const deleteChatRoomTriggerEvent = (
  chatRoom,
  currentChatRoomState,
  dataDispatch,
  userDispatch,
  currentChatRoomDispatch
) => {
  dataDispatch({
    type: REMOVE_AVAILABLE_CHATROOM,
    payload: chatRoom
  });

  userDispatch({
    type: REMOVE_JOINED_CHATROOM,
    payload: chatRoom
  });
  currentChatRoomDispatch({
    type: CHECK_FOR_CURRENT_CHATROOM,
    payload: chatRoom
  });
};
