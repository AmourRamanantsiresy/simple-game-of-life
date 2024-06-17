class Board {
  constructor(width, height) {
    this.cells = this.generateCellsTable(width, height);
    this.board = document.getElementById("board");
  }

  generateCellsTable = (width, height) => {
    const cellYRange = [];
    for (let a = 0; a < height; a++) {
      const cellXRange = [];
      for (let b = 0; b < width; b++) {
        cellXRange.push(new Cell(b * 12, a * 12, false));
      }
      cellYRange.push(cellXRange);
    }
    return cellYRange.slice();
  };

  generateCellsHtml = () => {
    let cellHtml = "";
    this.cells.forEach((cellsXRange) => {
      cellsXRange.forEach((cell) => {
        cellHtml += cell.generateHtml();
      });
    });
    return cellHtml;
  };

  initCellsClickEvent = () => {
    this.cells.forEach((cellsXRange) => {
      cellsXRange.forEach((cell) => {
        cell.initClickEvent();
      });
    });
  };

  initializeBoard = () => {
    this.board.innerHTML = this.generateCellsHtml(this.cells);
    this.initCellsClickEvent(this.cells);
  };

  updateCells = () => {
    this.cells.forEach((cellsXRange, y) => {
      cellsXRange.forEach((cell, x) => {
        cell.updateState(this.cells, [x, y]);
      });
    });
    this.cells.forEach((cellsXRange) => {
      cellsXRange.forEach((cell) => {
        cell.changeColor();
      });
    });
  };

  killAllCells = () => {
    this.cells.forEach((cellsXRange) => {
      cellsXRange.forEach((cell) => {
        cell.setState(false);
      });
    });
    this.cells.forEach((cellsXRange) => {
      cellsXRange.forEach((cell) => {
        cell.changeColor();
      });
    });
  };
}
