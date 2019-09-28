import React from "react";
// MUI staff
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const icons = [
  {
    avatar: "boy.png",
    alt: "boy",
    src:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-f6ad4.appspot.com/o/boy.png?alt=media"
  },
  {
    avatar: "man.png",
    alt: "man",
    src:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-f6ad4.appspot.com/o/man.png?alt=media"
  },
  {
    avatar: "girl.png",
    alt: "girl",
    src:
      "https://firebasestorage.googleapis.com/v0/b/chat-app-f6ad4.appspot.com/o/girl.png?alt=media"
  }
];

const AvatarChoose = props => {
  const classes = useStyles();

  const [selectedAvatar, setSelectedAvatar] = React.useState(icons[0].src);

  return (
    <div className={classes.wrapper}>
      {icons.map((icon, i) => (
        <IconButton
          key={i}
          onClick={e => {
            setSelectedAvatar(icon.src);
            props.setAvatar(icon.avatar);
          }}
        >
          <Avatar className={classes.avatar} alt={icon.alt} src={icon.src} />
        </IconButton>
      ))}
      <div className={classes.margin}>
        <Chip
          avatar={
            <Avatar
              className={classes.selectedAvatar}
              alt=""
              src={selectedAvatar}
            />
          }
          label="Your Avatar is?"
        />
      </div>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  avatar: {
    height: 60,
    width: 60
  },
  selectedAvatar: {
    height: 40,
    width: 40
  },
  margin: {
    margin: "20px 0px"
  }
}));

export default AvatarChoose;
