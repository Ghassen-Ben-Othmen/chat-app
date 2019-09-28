import React from "react";
// actions
import { joinChatRoom } from "../data/actions";
// context
import { Context } from "../data/AppContext";
// MUI Staff
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
// MUI icons staff
import LockIcon from "@material-ui/icons/Lock";
import { CLEAR_ERRORS } from "../data/types";

// transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AvailableChatRoomsList = ({ chatRooms }) => {
  // className
  const classes = useStyles();
  // context
  const {
    uiDispatch,
    uiState,
    userDispatch,
    dataDispatch,
    currentChatRoomDispatch,
    socket
  } = React.useContext(Context);
  const { errors, loading } = uiState;
  // state
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(-1);
  const [password, setPassword] = React.useState("");
  const [chatRoomToJoin, setChatRoomToJoin] = React.useState("");

  const handleClick = () => {
    handleClickOpen();
  };

  const handleClickOpen = () => {
    uiDispatch({ type: CLEAR_ERRORS });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword("");
    setValue(-1);
  };

  const handleJoinClick = () => {
    let request = {
      chatRoom: chatRoomToJoin,
      password
    };
    joinChatRoom(
      request,
      uiDispatch,
      userDispatch,
      dataDispatch,
      currentChatRoomDispatch,
      handleClose,
      socket
    );
  };

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabs}
        orientation="vertical"
        variant="scrollable"
        value={value}
      >
        {chatRooms &&
          chatRooms.map((chatRoom, i) => (
            <Tab
              classes={{
                wrapper: classes.wrapper,
                labelIcon: classes.lableIcon
              }}
              key={i}
              label={chatRoom.chatRoomName}
              onClick={() => {
                setValue(i);
                setChatRoomToJoin(chatRoom.chatRoomName);
                handleClick();
              }}
            />
          ))}
      </Tabs>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        className={classes.center}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Join"}</DialogTitle>
        <DialogContent>
          <form>
            <div className={classes.textField}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={1}>
                  <LockIcon />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="joinchatroompassword"
                    name="password"
                    type="password"
                    label="Password"
                    margin="dense"
                    value={password}
                    helperText={errors && errors.password}
                    error={errors && errors.password ? true : false}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleJoinClick}
              disabled={loading}
            >
              {loading ? <CircularProgress size={25} /> : "Join"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    position: "absolute",
    top: 20,
    right: 0,
    left: 0,
    bottom: 0
  },
  tabs: {
    width: "100%"
  },
  wrapper: {
    flexDirection: "row"
  },
  icon: {
    margin: "0px 10px 0px 0px"
  },
  lableIcon: {
    minHeight: 0
  },
  center: {
    textAlign: "center"
  },
  textField: {
    textAlign: "center",
    margin: "10px 20px"
  }
}));

export default React.memo(AvailableChatRoomsList);
