const colors = [1, 0, 1, 0, 1, 0, 1, 0];
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
let showCoords = false;

class Square {
  constructor(column, sqIndex, color, letterCoord) {
    this.coords = { column, sqIndex };
    this.pos = size / 8;
    this.color = color === "white" ? 0 : 255;
    this.letterCoord = letterCoord;

    this.x = column * this.pos;
    this.y = sqIndex * this.pos;

    this.center = { x: this.x + this.pos / 2, y: this.y + this.pos / 2 };

    this.highlightNeighbours = false;

    this.meta = {
      squareNeighbours: [],
      hasPiece: false,
      Piece: null,
    };
  }

  click(mX, mY) {
    const distance = dist(mX, mY, this.center.x, this.center.y);

    // stroke(255, 0, 0);
    // line(mX, mY, this.center.x, this.center.y);

    if (
      distance >= this.x &&
      distance <= this.x + this.pos &&
      distance >= this.y &&
      distance <= this.y + this.pos
    ) {
      this.color = (255, 0, 0);
      this.highlightNeighbours = true;
    } else {
      this.highlightNeighbours = false;
    }
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.pos);

    if (showCoords) {
      fill(0, 0, 255);
      textSize(25);
      text(
        `${this.letterCoord.letter}${this.letterCoord.number}`,
        this.pos * this.coords.column + this.pos / 2,
        this.pos * this.coords.sqIndex + this.pos / 2
      );
    }
  }

  getNeighbours() {
    const column = this.coords.column;
    const sqIndex = this.coords.sqIndex;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          column + i > -1 &&
          column + i < board.length &&
          sqIndex + j > -1 &&
          sqIndex + j < board[column].length
        ) {
          let neighbour =
            board[this.coords.column + i][this.coords.sqIndex + j];
          if (!(i === 0 && j === 0)) this.meta.squareNeighbours.push(neighbour);
        }
      }
    }
  }
}

let squares = [];

class Board {
  constructor() {
    for (let column = 0; column < board.length; column++) {
      colors.reverse();
      const letter = letters[column];
      for (let sqIndex = 0; sqIndex < board[column].length; sqIndex++) {
        let squareColor = colors[sqIndex] === 0 ? "white" : "black";
        board[column][sqIndex] = new Square(column, sqIndex, squareColor, {
          letter,
          number: sqIndex + 1,
        });
        squares.push(board[column][sqIndex]);
      }
    }
  }

  show() {
    squares.forEach((square) => {
      square.show();
    });
  }
}
