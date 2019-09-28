import React from "react";
import AppIcon from "../images/logo.png";
import AvatarChoose from "../components/AvatarChoose";
import { signupUser } from "../data/actions";
import { CLEAR_ERRORS } from "../data/types";

import { Context } from "../data/AppContext";

//MUI Staff
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// MUI icons staff
import AccountCircle from "@material-ui/icons/AccountCircle";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";

const Signup = props => {
  const { history } = props;
  const classes = useStyles();

  const { uiState, uiDispatch } = React.useContext(Context);
  const { loading, errors } = uiState;

  const [handle, setHandle] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [avatar, setAvatar] = React.useState("boy.png");

  React.useEffect(() => {
    uiDispatch({ type: CLEAR_ERRORS });
  }, []);

  const handleClick = e => {
    const newUser = {
      handle,
      email,
      password,
      confirmPassword,
      avatar
    };

    signupUser(newUser, uiDispatch, history);
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
          <Typography variant="h4">SignUp</Typography>

          <form>
            <div className={classes.textField}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={1}>
                  <AccountCircle />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="handle"
                    name="handle"
                    type="text"
                    label="Handle"
                    margin="dense"
                    value={handle}
                    helperText={errors && errors.handle}
                    error={errors && errors.handle ? true : false}
                    onChange={e => setHandle(e.target.value)}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>
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
            <div className={classes.textField}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={1}>
                  <LockIcon />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    margin="dense"
                    value={confirmPassword}
                    helperText={errors && errors.confirmPassword}
                    error={errors && errors.confirmPassword ? true : false}
                    onChange={e => setConfirmPassword(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>

            <div className={classes.avatar}>
              <AvatarChoose setAvatar={setAvatar} />
            </div>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? <CircularProgress size={25} /> : "SignUp"}
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
  },
  avatar: {
    margin: "20px 0px 0px 20px"
  }
}));

export default Signup;
