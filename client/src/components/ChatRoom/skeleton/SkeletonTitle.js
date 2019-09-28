import React from "react";

// MUI staff
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

function SkeletonChatRoom() {
  // class Name
  const classes = useStyles();
  return (
    <div>
      <Box boxShadow={1} className={classes.wrapper}>
        <Skeleton variant="rect" width={100} height={30} />

        <Skeleton
          className={classes.close}
          variant="rect"
          width={30}
          height={30}
        />
      </Box>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
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
  }
}));

export default SkeletonChatRoom;
