const { admin } = require("./firebaseInit");

const db = admin.firestore();

const verifyToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const idToken = req.headers.authorization.split("Bearer ")[1];

    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        return db
          .collection("users")
          .where("id", "==", decodedToken.uid)
          .limit(1)
          .get();
      })
      .then(data => {
        req.handle = data.docs[0].data().handle;
        req.avatar = data.docs[0].data().avatar;
        return next();
      })
      .catch(err => {
        console.log(err);
        return res.status(403).json({
          err
        });
      });
  } else {
    return res.status(403).json({
      err: "Unauthorized"
    });
  }
};

module.exports = verifyToken;
