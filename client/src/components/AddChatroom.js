import React from "react";
// context
import { Context } from "../data/AppContext";
// actions
import { addChatroom } from "../data/actions";
// MUI Staff
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

//MUI Icon staff
import AddIcon from "@material-ui/icons/Add";
import LockIcon from "@material-ui/icons/Lock";
import ChatIcon from "@material-ui/icons/Chat";
import { CLEAR_ERRORS } from "../data/types";

// transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddChatroom = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  // classes
  const classes = useStyles();
  // use context
  const { userDispatch, uiDispatch, uiState, socket } = React.useContext(
    Context
  );
  const { errors, loading } = uiState;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setPassword("");
    uiDispatch({ type: CLEAR_ERRORS });
  };

  const handleClick = () => {
    const newChatRoom = {
      name,
      password
    };
    addChatroom(newChatRoom, userDispatch, uiDispatch, handleClose, socket);
  };
  return (
    <React.Fragment>
      <Tooltip title="Add Chat Room">
        <IconButton onClick={handleClickOpen} size="small" color="inherit">
          <AddIcon />
        </IconButton>
      </Tooltip>

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
        <DialogTitle id="alert-dialog-slide-title">
          {"Add new ChatRoom"}
        </DialogTitle>
        <DialogContent>
          <form>
            <div className={classes.textField}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={1}>
                  <ChatIcon />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="name"
                    name="name"
                    type="text"
                    label="Name"
                    margin="dense"
                    value={name}
                    helperText={errors && errors.name}
                    error={errors && errors.name ? true : false}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>
            <div className={classes.textField}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={1}>
                  <LockIcon />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="password"
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
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? <CircularProgress size={25} /> : "Add"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

// styles
const useStyles = makeStyles(theme => ({
  textField: {
    textAlign: "center",
    margin: "10px 20px"
  },
  button: {
    margin: theme.spacing(1),
    width: 100
  },
  center: {
    textAlign: "center"
  }
}));

export default AddChatroom;
