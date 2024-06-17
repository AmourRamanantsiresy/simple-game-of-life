keyEvent = (key, callback) => {
  document.addEventListener("keydown", (e) => {
    if (e.key === key) {
      callback();
    }
  });
};
