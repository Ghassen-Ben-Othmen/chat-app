import React from "react";
// action
import { deleteChatRoom } from "../../data/actions";
// context
import { Context } from "../../data/AppContext";
// MUI Staff
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
// MUI icons staff
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteChatRoom = ({ classes }) => {
  // react context
  const {
    uiDispatch,
    currentChatRoomDispatch,
    userDispatch,
    uiState,
    socket,
    currentChatRoomState
  } = React.useContext(Context);
  const { loading } = uiState;
  // open dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const chatRoom = currentChatRoomState.currentChatRoom.chatRoomName;
    deleteChatRoom(
      chatRoom,
      uiDispatch,
      userDispatch,
      currentChatRoomDispatch,
      socket,
      handleClose
    );
  };

  return (
    <React.Fragment>
      <Tooltip title={"Delete"}>
        <IconButton
          onClick={handleClickOpen}
          size={"small"}
          className={classes.close}
        >
          <DeleteForeverIcon className={classes.closeColor} />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="delete"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="delete">{"Delete ChatRoom!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Would you really want to delete this ChatRoom?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose} color="primary">
            No
          </Button>
          <Button disabled={loading} onClick={handleDelete} color="primary">
            {loading ? <CircularProgress sier={25} /> : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteChatRoom;
