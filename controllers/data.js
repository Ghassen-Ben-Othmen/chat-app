const { admin, firebase } = require("../util/firebaseInit");
const {
  isValid,
  isValidJoinChatRoom
} = require("../util/chatRoomValidation/validation");

const db = admin.firestore();

exports.otherChatRooms = (req, res) => {
  const availableChatRooms = [];
  const chatRooms = [];
  db.collection("chatRooms")
    .get()
    .then(docs => {
      docs.forEach(doc => {
        let chatRoom = {
          chatRoomName: doc.data().name,
          userHandle: doc.data().userHandle
        };
        chatRooms.push(chatRoom);
      });
      return db
        .collection("userJoinedChatRooms")
        .where("userHandle", "==", req.handle)
        .get();
    })
    .then(docs => {
      chatRooms.forEach(chatRoom => {
        let find = false;
        docs.forEach(doc => {
          if (chatRoom.chatRoomName === doc.data().chatRoomName) {
            find = true;
          }
        });
        if (!find) {
          availableChatRooms.push(chatRoom);
        }
      });
      return res.status(200).json({
        availableChatRooms
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getChatRoom = (req, res) => {
  const name = req.params.chatroom;

  db.collection("chatRooms")
    .where("name", "==", name)
    .limit(1)
    .get()
    .then(docs => {
      let currentChatRoom = {
        id: docs.docs[0].id,
        chatRoomName: docs.docs[0].data().name,
        userHandle: docs.docs[0].data().userHandle,
        messages: docs.docs[0].data().messages
      };
      return res.status(200).json({
        currentChatRoom
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(404).json({
        general: "chatroom not found!"
      });
    });
};

exports.addChatRoom = (req, res) => {
  const newChatRoom = {
    name: req.body.name.trim(),
    password: req.body.password
  };

  let { errors, valid } = isValid(newChatRoom);

  if (!valid) return res.status(400).json({ errors });

  let chatRoomRef = db
    .collection("chatRooms")
    .where("name", "==", newChatRoom.name)
    .limit(1);

  chatRoomRef
    .get()
    .then(doc => {
      if (doc.docs.length > 0) {
        return Promise.reject("nameTaken");
      } else {
        newChatRoom.userHandle = req.handle;
        newChatRoom.messages = [
          {
            content: `${req.handle} has created the Chat room`,
            userHandle: req.handle,
            userAvatar: req.avatar,
            sendAt: new Date().toISOString(),
            type: "create",
            chatRoomName: newChatRoom.name
          }
        ];
        return db
          .collection("chatRooms")
          .doc()
          .set(newChatRoom);
      }
    })
    .then(() => {
      return chatRoomRef.get();
    })
    .then(doc => {
      let userJoinedChatRoom = {
        chatRoomName: newChatRoom.name,
        joinedAt: new Date().toISOString(),
        userHandle: req.handle,
        userCreator: doc.docs[0].data().userHandle
      };
      return db
        .collection("userJoinedChatRooms")
        .doc()
        .set(userJoinedChatRoom);
    })
    .then(doc => {
      return db
        .collection("userJoinedChatRooms")
        .where("chatRoomName", "==", newChatRoom.name)
        .where("userHandle", "==", req.handle)
        .limit(1)
        .get();
    })
    .then(doc => {
      let userJoinedChatRoom = {
        chatRoomName: doc.docs[0].data().chatRoomName,
        joinedAt: doc.docs[0].data().joinedAt,
        userHandle: doc.docs[0].data().userHandle,
        userCreator: doc.docs[0].data().userCreator
      };
      return res.status(201).json({ userJoinedChatRoom });
    })
    .catch(err => {
      console.log(err);
      if (err === "nameTaken") {
        return res
          .status(400)
          .json({ errors: { name: "ChatRoom Name is already taken" } });
      }
      return res.status(500).json({ errors: err });
    });
};

exports.joinChatRoom = (req, res) => {
  let request = {
    chatRoom: req.body.chatRoom,
    password: req.body.password
  };

  let { errors, valid } = isValidJoinChatRoom(request);
  if (!valid) return res.status(400).json({ errors });

  let userJoinedChatRoom = {};
  let message;

  db.collection("chatRooms")
    .where("name", "==", request.chatRoom)
    .where("password", "==", request.password)
    .limit(1)
    .get()
    .then(doc => {
      if (doc.docs.length === 0) {
        return Promise.reject("invalidPassword");
      } else {
        let chatRoomRef = doc.docs[0].ref;
        let messages = doc.docs[0].data().messages;

        message = {
          content: `${req.handle} has joined the chat room`,
          userHandle: req.handle,
          userAvatar: req.avatar,
          sendAt: new Date().toISOString(),
          type: "join",
          chatRoomName: doc.docs[0].data().name
        };

        messages.push(message);
        chatRoomRef.update({ messages }, { merge: true });

        userJoinedChatRoom = {
          userHandle: req.handle,
          joinedAt: new Date().toISOString(),
          chatRoomName: req.body.chatRoom,
          userCreator: doc.docs[0].data().userHandle
        };
        return db
          .collection("userJoinedChatRooms")
          .doc()
          .set(userJoinedChatRoom);
      }
    })
    .then(() => {
      return res.status(201).json({ userJoinedChatRoom, message });
    })
    .catch(err => {
      if (err === "invalidPassword")
        res.status(400).json({ errors: { password: "Invalid password" } });
      console.log(err);
    });
};

exports.leaveChatRoom = (req, res) => {
  let chatRoomToLeave = req.body.chatRoom;
  let userHandle = req.handle;

  db.collection("userJoinedChatRooms")
    .where("chatRoomName", "==", chatRoomToLeave)
    .where("userHandle", "==", userHandle)
    .limit(1)
    .get()
    .then(doc => {
      if (doc.docs.length === 0) {
        return Promise.reject("Invalid");
      } else {
        return doc.docs[0].ref.delete();
      }
    })
    .then(() => {
      return db
        .collection("chatRooms")
        .where("name", "==", chatRoomToLeave)
        .limit(1)
        .get();
    })
    .then(doc => {
      let chatRoomRef = doc.docs[0].ref;
      let messages = doc.docs[0].data().messages;

      let message = {
        content: `${req.handle} has left the chat room`,
        userHandle: req.handle,
        userAvatar: req.avatar,
        sendAt: new Date().toISOString(),
        type: "leave",
        chatRoomName: doc.docs[0].data().name
      };

      messages.push(message);
      chatRoomRef.update({ messages }, { merge: true });

      let availableChatRoom = {
        chatRoomName: doc.docs[0].data().name,
        userHandle: doc.docs[0].data().userHandle
      };
      return res.status(200).json({ availableChatRoom, message });
    })
    .catch(err => {
      if (err === "Invalid")
        return res.status(400).json({ error: "Invalid action" });
      console.log(err);
    });
};

exports.deleteChatRoom = (req, res) => {
  let chatRoomToDelete = req.params.chatRoom;

  db.collection("chatRooms")
    .where("name", "==", chatRoomToDelete)
    .limit(1)
    .get()
    .then(doc => {
      if (doc.docs.length === 0) return Promise.reject("invalid");
      doc.docs[0].ref.delete();
      return db
        .collection("userJoinedChatRooms")
        .where("chatRoomName", "==", chatRoomToDelete)
        .get();
    })
    .then(snapshot => {
      let batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      return batch.commit();
    })
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch(err => {
      if (err === "invalid") return res.status(400).json({ errors: err });
      console.log(err);
    });
};

exports.addMessageToChtRoom = (req, res) => {
  let chatRoom = req.params.chatRoom;
  let message = {
    content: req.body.content,
    userHandle: req.handle,
    userAvatar: req.avatar,
    sendAt: new Date().toISOString(),
    type: req.body.type,
    chatRoomName: chatRoom
  };

  let messages;

  db.collection("chatRooms")
    .where("name", "==", chatRoom)
    .limit(1)
    .get()
    .then(snapshot => {
      if (snapshot.docs.length === 0) {
        return Promise.reject("invalid");
      } else {
        let doc = snapshot.docs[0];
        let docRef = snapshot.docs[0].ref;
        messages = doc.data().messages;
        messages.push(message);
        return docRef.update({ messages }, { merge: true });
      }
    })
    .then(() => {
      return res.status(201).json({
        message
      });
    })
    .catch(err => {
      if (err === "invalid") {
        return res.status(400).json({ error: "ChatRoom not found" });
      }
      console.log(err);
    });
};
