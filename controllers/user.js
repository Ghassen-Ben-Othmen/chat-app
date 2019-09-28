const {
  validationSignUp,
  validationSignIn
} = require("../util/userValidation/validation");

const { admin, firebase } = require("../util/firebaseInit");

const db = admin.firestore();

// signup user
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
    avatar: req.body.avatar
  };

  const { errors, valid } = validationSignUp(newUser);
  if (!valid) return res.status(400).json({ errors });

  db.collection("users")
    .doc(newUser.handle)
    .get()
    .then(doc => {
      if (doc.exists) {
        res.status(401).json({
          errors: {
            handle: "This handle is already taken!"
          }
        });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        avatar: newUser.avatar,
        id: data.user.uid
      };

      return db
        .collection("users")
        .doc(userCredentials.handle)
        .set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({
        success: true
      });
    })
    .catch(err => {
      if (err.code === "auth/weak-password")
        return res.status(400).json({
          errors: {
            password: err.message
          }
        });
      else if (err.code === "auth/email-already-in-use")
        return res.status(400).json({
          errors: {
            email: "invalid email please try another one"
          }
        });
      else
        res.status(500).json({
          errors: err
        });
    });
};

// signin user
exports.signin = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { errors, valid } = validationSignIn(user);
  if (!valid) return res.status(400).json({ errors });

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.status(200).json({
        token
      });
    })
    .catch(err => {
      res.status(403).json({
        errors: {
          general: "invalid email or password"
        }
      });
    });
};

exports.getUserData = (req, res) => {
  const credentials = {};
  const userJoinedChatRooms = [];

  db.doc(`users/${req.handle}`)
    .get()
    .then(doc => {
      credentials.id = doc.data().id;
      credentials.handle = doc.id;
      credentials.avatar = doc.data().avatar;
      return db
        .collection("userJoinedChatRooms")
        .where("userHandle", "==", req.handle)
        .orderBy("joinedAt", "desc")
        .get();
    })
    .then(data => {
      data.docs.forEach(doc => {
        let mappedDoc = {
          ...doc.data()
        };
        userJoinedChatRooms.push(mappedDoc);
      });

      return res.status(200).json({
        credentials,
        userJoinedChatRooms
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        err
      });
    });
};
