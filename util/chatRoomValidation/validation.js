const isValid = newChatRoom => {
  let errors = {};

  if (isEmpty(newChatRoom.name)) errors.name = "Name is required";
  if (isEmpty(newChatRoom.password)) errors.password = "Password is required";

  return { errors, valid: Object.keys(errors).length === 0 };
};

const isValidJoinChatRoom = request => {
  let errors = {};

  if (isEmpty(request.chatRoom)) errors.chatRoom = "ChatRoom is reuired";
  if (isEmpty(request.password)) errors.password = "Password is required";

  return { errors, valid: Object.keys(errors).length === 0 };
};

const isEmpty = field => {
  return field.trim() === "";
};

module.exports = { isValid, isValidJoinChatRoom };
