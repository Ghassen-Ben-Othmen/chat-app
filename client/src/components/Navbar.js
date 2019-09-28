import React from "react";
import { Link } from "react-router-dom";

import { Context } from "../data/AppContext";
import { signout } from "../data/actions";
import AddChatRoom from "./AddChatroom";

// MUI Staff
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MUILink from "@material-ui/core/Link";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

// MUI Icons
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Navbar = props => {
  const classes = useStyles();

  const {
    userState,
    userDispatch,
    dataDispatch,
    currentChatRoomDispatch
  } = React.useContext(Context);
  const { authenticated } = userState;
  const { avatar, handle } = userState.credentials;

  let img;

  if (authenticated) {
    img = `https://firebasestorage.googleapis.com/v0/b/chat-app-f6ad4.appspot.com/o/${avatar}?alt=media`;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Chat TEAM
          </Typography>
          <div className={classes.navContainer}>
            {!authenticated ? (
              <React.Fragment>
                <Tooltip title="SignIn">
                  <MUILink component={Link} to={"/signin"} color="inherit">
                    <IconButton size="small" color="inherit">
                      <PowerSettingsNewIcon />
                    </IconButton>
                  </MUILink>
                </Tooltip>

                <Tooltip title="SignUp" className={classes.marginLeft}>
                  <MUILink component={Link} to={"/signup"} color="inherit">
                    <IconButton size="small" color="inherit">
                      <PersonAddIcon />
                    </IconButton>
                  </MUILink>
                </Tooltip>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <AddChatRoom />

                <Tooltip title="SignOut" className={classes.marginLeft}>
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={e => {
                      signout(
                        userDispatch,
                        dataDispatch,
                        currentChatRoomDispatch
                      );
                    }}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </Tooltip>
              </React.Fragment>
            )}
          </div>
          {authenticated ? (
            <Chip
              color="primary"
              label={handle}
              avatar={<Avatar src={img} />}
            />
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  navContainer: {
    margin: "auto"
  },
  marginLeft: {
    marginLeft: "20px"
  }
}));

export default Navbar;
