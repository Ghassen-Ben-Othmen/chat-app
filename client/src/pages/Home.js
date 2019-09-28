import React from "react";
import JoinedChatRoomsList from "../components/JoinedChatRoomsList";
import AvailableChatRoomList from "../components/AvailableChatRoomList";
import ChatRoom from "../components/ChatRoom/ChatRoom";
// MUI staff
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// context
import { Context } from "../data/AppContext";

function Home() {
  const classes = useStyles();
  const {
    dataState,
    userState,
    currentChatRoomDispatch,
    currentChatRoomState
  } = React.useContext(Context);
  const { availableChatRooms } = dataState;
  const { userJoinedChatRooms } = userState;

  return (
    <Container>
      <Grid
        spacing={2}
        container
        justify="center"
        alignItems="center"
        className={classes.home}
      >
        <Grid item xs={2}>
          <Paper className={classes.paperSides}>
            <Typography className={classes.title} variant="caption">
              Joined
            </Typography>
            <JoinedChatRoomsList
              chatRooms={userJoinedChatRooms}
              userHandle={userState.credentials.handle}
              currentChatRoomDispatch={currentChatRoomDispatch}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <ChatRoom chatRoomState={currentChatRoomState} />
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paperSides}>
            <Typography className={classes.title} variant="caption">
              Available
            </Typography>
            <AvailableChatRoomList chatRooms={availableChatRooms} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  home: {
    marginTop: 30
  },
  paper: {
    height: "80vh",
    position: "relative"
  },
  paperSides: {
    height: "80vh",
    position: "relative",
    textAlign: "center"
  },
  title: {
    fontWeight: 700
  }
}));

export default Home;
