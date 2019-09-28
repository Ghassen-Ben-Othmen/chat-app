import React from "react";

// MUI Staff
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const SkeletonMessages = () => {
  // className
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {Array(10)
        .fill(0)
        .map((el, i) => (
          <Skeleton
            key={i}
            style={{ margin: "5px 5px" }}
            variant="rect"
            width={210}
            height={50}
          />
        ))}
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
  }
}));

export default SkeletonMessages;
