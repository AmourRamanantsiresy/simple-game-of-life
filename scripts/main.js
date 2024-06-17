const main = () => {
  let stop = true;
  keyEvent(" ", () => (stop = !stop));

  const board = new Board(200, 200);
  keyEvent("Backspace", () => board.killAllCells());

  board.initializeBoard();

  setInterval(() => {
    !stop && board.updateCells();
  }, [200]);
};

document.addEventListener("DOMContentLoaded", main);
