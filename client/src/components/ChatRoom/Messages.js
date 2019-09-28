import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// context
import { Context } from "../../data/AppContext";
// MUI Staff
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const Messages = ({ messages }) => {
  // react context
  const { userState, currentChatRoomState } = React.useContext(Context);
  const { credentials } = userState;
  const { loading_message } = currentChatRoomState;
  // ref
  const divRef = React.useRef(null);
  // effect
  React.useEffect(() => {
    divRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [loading_message, messages]);
  // className
  const classes = useStyles();
  // date fromatter
  dayjs.extend(relativeTime);

  return (
    <div className={classes.wrapper}>
      {messages.map((message, i) => {
        let img = `https://firebasestorage.googleapis.com/v0/b/chat-app-f6ad4.appspot.com/o/${message.userAvatar}?alt=media`;
        if (
          message.type === "message" &&
          credentials.handle === message.userHandle
        ) {
          return (
            <div key={i} className={classes.marginMsg}>
              <Tooltip title={dayjs(message.sendAt).fromNow()}>
                <Chip
                  className={classes.floatRight}
                  avatar={<Avatar alt="img" src={img} />}
                  color={"primary"}
                  label={
                    <div>
                      <div className={classes.handle}>{message.userHandle}</div>
                      <Typography variant="body2">{message.content}</Typography>
                    </div>
                  }
                />
              </Tooltip>

              <br />
              <br />
            </div>
          );
        } else if (message.type === "message") {
          return (
            <div key={i} className={classes.marginMsg}>
              <Tooltip title={dayjs(message.sendAt).fromNow()}>
                <Chip
                  avatar={<Avatar alt="img" src={img} />}
                  label={
                    <div>
                      <div className={classes.handle}>{message.userHandle}</div>
                      <Typography variant="body2">{message.content}</Typography>
                    </div>
                  }
                />
              </Tooltip>
              <br />
              <br />
            </div>
          );
        } else if (message.type === "create") {
          return (
            <div key={i} className={classes.margin}>
              <Tooltip title={dayjs(message.sendAt).fromNow()}>
                <Chip
                  className={classes.createColor}
                  avatar={<Avatar alt="img" src={img} />}
                  size="small"
                  label={
                    <div>
                      <Typography variant="body2">{message.content}</Typography>
                    </div>
                  }
                />
              </Tooltip>
              <br />
              <br />
            </div>
          );
        } else if (message.type === "leave") {
          return (
            <div key={i} className={classes.margin}>
              <Tooltip title={dayjs(message.sendAt).fromNow()}>
                <Chip
                  className={classes.leaveColor}
                  avatar={<Avatar alt="img" src={img} />}
                  size="small"
                  label={
                    <div>
                      <Typography variant="body2">{message.content}</Typography>
                    </div>
                  }
                />
              </Tooltip>
              <br />
              <br />
            </div>
          );
        } else if (message.type === "join") {
          return (
            <div key={i} className={classes.margin}>
              <Tooltip title={dayjs(message.sendAt).fromNow()}>
                <Chip
                  className={classes.joinColor}
                  avatar={<Avatar alt="img" src={img} />}
                  size="small"
                  label={
                    <div>
                      <Typography variant="body2">{message.content}</Typography>
                    </div>
                  }
                />
              </Tooltip>
              <br />
              <br />
            </div>
          );
        }
        return null;
      })}

      {loading_message ? (
        <Skeleton component={Chip} className={classes.skeleton} />
      ) : null}

      <div style={{ float: "right", clear: "both" }} ref={divRef}></div>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: "10vh",
    position: "absolute",
    overflowY: "auto",
    height: "62vh",
    width: "100%"
  },
  marginMsg: {
    margin: "10px 10px"
  },
  margin: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0px"
  },
  createColor: {
    backgroundColor: "#ffc107"
  },
  leaveColor: {
    backgroundColor: "#b71c1c",
    color: "white"
  },
  joinColor: {
    backgroundColor: "#28a745"
  },
  floatRight: {
    float: "right"
  },
  handle: {
    fontWeight: "700",
    textDecoration: "underline"
  },
  skeleton: {
    height: 40,
    width: 300,
    float: "right",
    clear: "right",
    margin: "10px 10px"
  }
}));

export default Messages;
