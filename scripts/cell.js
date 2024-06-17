class Cell {
  size = 10;
  constructor(x, y, isAlive) {
    this.x = x;
    this.y = y;
    this.isAlive = isAlive;
    this.nextState = false;
  }

  indexesValid = (point, len) => {
    if (!point && point.length === 0) return false;
    const [x, y] = point;
    if (x < 0 || x >= len) return false;
    if (y < 0 || y >= len) return false;
    return true;
  };

  generateHtml() {
    this.isAlive = this.nextState;
    return `<div class='cell ${this.isAlive ? "active" : ""}' id="${this.x}-${
      this.y
    }" style="top:${this.y}px;left:${this.x}px"></div>`;
  }

  initClickEvent = () => {
    const id = document.getElementById(`${this.x}-${this.y}`);
    id.addEventListener("click", () => {
      this.setState(!this.isAlive);
      if (this.isAlive) {
        id.classList.add("active");
      } else {
        id.classList.remove("active");
      }
    });
  };

  changeColor() {
    const id = document.getElementById(`${this.x}-${this.y}`);
    this.isAlive = this.nextState;
    if (this.isAlive) {
      id.classList.add("active");
    } else {
      id.classList.remove("active");
    }
  }

  setState(state) {
    this.isAlive = state;
    this.nextState = state;
  }

  updateState(arr, position) {
    const arrLen = arr.length;
    const [x, y] = position;
    const data = [
      [x - 1, y - 1],
      [x - 1, y + 1],

      [x + 1, y - 1],
      [x + 1, y + 1],

      [x - 1, y],
      [x + 1, y],

      [x, y - 1],
      [x, y + 1],
    ];

    const mappedData = data.map((point) => {
      const isValid = this.indexesValid(point, arrLen);
      if (!isValid) return 0;
      const [x, y] = point;
      if (!arr[y][x].isAlive) {
        return 0;
      }
      return 1;
    });
    const aliveNumber = mappedData.filter((a) => a === 1).length;
    if (aliveNumber === 3) {
      this.nextState = true;
    } else if (aliveNumber === 2 && this.isAlive) {
      this.nextState = true;
    } else {
      this.nextState = false;
    }
  }
}
