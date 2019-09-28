import React from "react";
// actions
import { addMessagToChatRoom } from "../../data/actions";
// context
import { Context } from "../../data/AppContext";
// MUI Staff
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
// MUI Icons
import SendIcon from "@material-ui/icons/Send";

const SendMessageInput = () => {
  const {
    currentChatRoomState,
    currentChatRoomDispatch,
    socket
  } = React.useContext(Context);
  // className
  const classes = useStyles();
  // state
  const [message, setMessage] = React.useState("");

  const sendMessage = () => {
    if (message !== "") {
      let chatRoom = currentChatRoomState.currentChatRoom.chatRoomName;

      let request = {
        content: message,
        type: "message"
      };
      addMessagToChatRoom(
        chatRoom,
        request,
        currentChatRoomDispatch,
        setMessage,
        socket
      );
    }
  };

  const handleSend = () => {
    sendMessage();
  };

  const hadnleKeyEnter = e => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Type a message"
        onChange={e => {
          setMessage(e.target.value);
        }}
        value={message}
        onKeyPress={hadnleKeyEnter}
      />

      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={handleSend}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    height: "10vh",
    bottom: 0,
    right: 0,
    left: 0
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default SendMessageInput;
