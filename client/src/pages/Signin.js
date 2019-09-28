import React from "react";
import AppIcon from "../images/logo.png";
import { signinUser } from "../data/actions";
import { Context } from "../data/AppContext";
import { CLEAR_ERRORS } from "../data/types";
// MUI Staff
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// MUI icons staff
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";

const Signin = props => {
  const classes = useStyles();

  const { history } = props;

  // context staff
  const {
    uiState,
    uiDispatch,
    userDispatch,
    currentChatRoomDispatch,
    dataDispatch
  } = React.useContext(Context);
  const { loading, errors } = uiState;

  // state staff
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    uiDispatch({ type: CLEAR_ERRORS });
  }, []);

  const handleClick = e => {
    const user = {
      email,
      password
    };

    signinUser(
      user,
      uiDispatch,
      userDispatch,
      currentChatRoomDispatch,
      dataDispatch,
      history
    );
  };

  return (
    <Grid container>
      <Grid item xs={4} />
      <Grid item xs={4} className={classes.main}>
        <Paper className={classes.paper}>
          <img
            draggable={false}
            src={AppIcon}
            alt="chat app"
            className={classes.img}
          />
          <Typography variant="h4">SignIn</Typography>

          <form>
            <div className={classes.textField}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={1}>
                  <AlternateEmailIcon />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="email"
                    name="email"
                    type="text"
                    label="Email"
                    margin="dense"
                    value={email}
                    helperText={errors && errors.email}
                    error={errors && errors.email ? true : false}
                    onChange={e => setEmail(e.target.value)}
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
            {errors && errors.general && (
              <Typography variant="body1" color="error">
                {errors.general}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? <CircularProgress size={25} /> : "SignIn"}
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: "30px",
    textAlign: "center"
  },
  img: {
    height: 70,
    width: 70
  },
  textField: {
    textAlign: "center",
    margin: "10px 20px"
  },
  paper: {
    paddingBottom: "30px"
  },
  button: {
    margin: theme.spacing(1),
    width: 100
  }
}));

export default Signin;
