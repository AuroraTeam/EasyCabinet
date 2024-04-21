import { Notify } from "notiflix";

export function failure(message) {
  showMessage("failure", message);
}

export function success(message) {
  showMessage("success", message);
}

function showMessage(type, message) {
  if (Array.isArray(message)) {
    return message.forEach((item) => _showMessage(type, item));
  }
  _showMessage(type, message);
}

function _showMessage(type, message) {
  Notify[type](message, {
    position: "right-bottom",
    fontSize: "14px",
  });
}
