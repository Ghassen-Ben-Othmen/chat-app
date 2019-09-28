import React from "react";
import { getChatroom } from "../data/actions";
// MUI Staff
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GradeIcon from "@material-ui/icons/Grade";

const JoinedChatRoomsList = ({
  chatRooms,
  userHandle,
  currentChatRoomDispatch
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleClick = name => {
    getChatroom(name, currentChatRoomDispatch);
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
                handleClick(chatRoom.chatRoomName);
              }}
              icon={
                userHandle === chatRoom.userCreator ? (
                  <GradeIcon fontSize="small" className={classes.icon} />
                ) : null
              }
            />
          ))}
      </Tabs>
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
  }
}));

export default React.memo(JoinedChatRoomsList);
