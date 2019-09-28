import React from "react";

import DeleteChatRoom from "./DeleteChatRoom";
// action
import { leaveChatRoom } from "../../data/actions";
// MUI staff
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
// MUI icons staff
import CancelIcon from "@material-ui/icons/Cancel";
// context
import { Context } from "../../data/AppContext";

const ChatRoomTitle = ({ currentChatRoom }) => {
  // context
  const {
    userState,
    userDispatch,
    uiDispatch,
    dataDispatch,
    currentChatRoomDispatch,
    socket
  } = React.useContext(Context);
  const { credentials } = userState;

  // class Name
  const classes = useStyles();

  const handleLeaveClick = () => {
    leaveChatRoom(
      currentChatRoom.chatRoomName,
      uiDispatch,
      userDispatch,
      dataDispatch,
      currentChatRoomDispatch,
      socket
    );
  };
  return (
    <Box boxShadow={1} className={classes.wrapper}>
      <Typography className={classes.title} variant="caption">
        {currentChatRoom.chatRoomName}
      </Typography>
      {currentChatRoom.userHandle === credentials.handle ? (
        <DeleteChatRoom classes={classes} />
      ) : (
        <Tooltip title={"Leave"}>
          <IconButton
            onClick={handleLeaveClick}
            size={"small"}
            className={classes.close}
          >
            <CancelIcon className={classes.closeColor} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700
  },
  wrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: "8vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  close: {
    position: "absolute",
    right: 5,
    top: 10
  },
  closeColor: {
    color: "red"
  }
}));

export default ChatRoomTitle;
