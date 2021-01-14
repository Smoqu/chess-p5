let allPieces = [];

let pieceClickedOn;

let pieces = [
  {
    color: "Dark",
    pieces: {
      Rooks: [],
      Bishops: [],
      Knights: [],
      Pawns: [],
      King: null,
      Queen: null,
    },
    images: [],
  },
  {
    color: "White",
    pieces: {
      Rooks: [],
      Bishops: [],
      Knights: [],
      Pawns: [],
      King: null,
      Queen: null,
    },
    images: [],
  },
];

let darkPieces = pieces.find((piece) => piece.color === "Dark");
let whitePieces = pieces.find((piece) => piece.color === "White");

let cursorHover = false;

class Piece {
  constructor(piece, initialSpot, color) {
    // piece = the name of the piece ("Bishop", "Pawn", etc..)
    this.piece = piece;
    // Its color obviously (Black, white)
    this.color = color;

    //initial spot keeps in memory the inital spot
    this.initialSpot = initialSpot;
    // its the scale basicaly
    this.initialSpot.pos = size / 8;

    Object.freeze(this.initialSpot);

    // this.spot takes the relay in terms of positioning
    this.spot = { ...this.initialSpot };

    this.isDead = false;

    this.square = this.updateCurrentSquare();

    this.scale = 3;

    this.clickedOn = false;

    this.availableMoves = [];

    let { x, y, imageX, imageY } = this.move();
    [this.x, this.y, this.imageX, this.imageY] = [x, y, imageX, imageY];

    console.log(this.square);

    this.imageSize = this.spot.pos / (this.scale * 0.5);

    // [this.neighbours, this.enemies] = {neighbours, enemies};

    this.neighbours = [];
    this.enemies = [];

    // finds the right image for the piece
    if (this.color === "Dark")
      this.img = darkPieces.images.find((image) => image.piece === this.piece);
    else
      this.img = whitePieces.images.find((image) => image.piece === this.piece);
  }

  // Methods to show on the canvas if not dead
  show() {
    if (!this.isDead) {
      image(
        this.img.image,
        this.imageX,
        this.imageY,
        this.imageSize,
        this.imageSize
      );
    }
    if (showHitbox) {
      stroke(255, 0, 0);
      line(
        this.square.x,
        this.square.y,
        this.square.x + this.spot.pos,
        this.square.y + this.spot.pos
      );
      stroke(0);
    }

    if (pieceClickedOn === this) {
      this.highlightPossibleMoves();
    }
  }

  hitbox(mX, mY) {
    return (
      mX > this.square.x &&
      mX < this.square.x + this.spot.pos &&
      mY > this.square.y &&
      mY < this.square.y + this.spot.pos
    );
  }

  convertLetterCoord2Coords(letter, row) {
    const column = letters.indexOf(letter);
    const sqIndex = row - 1;

    return { column, sqIndex };
  }

  //
  updateCurrentSquare() {
    let square = squares.find(
      (sq) =>
        this.spot.column === sq.coords.column &&
        this.spot.sqIndex === sq.coords.sqIndex
    );

    if (square != "undefined") {
      square.meta.Piece = this;
      square.meta.hasPiece = true;
      const x = this.spot.pos * this.spot.column;
      const y = this.spot.pos * this.spot.sqIndex;

      return { x, y, currentSquare: square };
    }

    console.log(square);
  }

  updateFormerSquare() {
    this.square.currentSquare.meta.Piece = null;
    this.square.currentSquare.meta.hasPiece = false;
  }

  move() {
    const x = this.square.x + this.spot.pos / 2;
    const y = this.square.y + this.spot.pos / 2;
    const imageX = x - this.spot.pos / this.scale;
    const imageY = y - this.spot.pos / this.scale;

    return { x, y, imageX, imageY };
  }

  click(mX, mY) {
    const hb = this.hitbox(mX, mY);

    if (hb) {
      this.clickedOn = true;
      // canvas.cursor.style = "move";
    } else this.clickedOn = false;
  }

  death() {
    this.isDead = true;
  }

  changeSquare(column, sqIndex) {
    console.log(this);
    // const letterCoord = this.convertLetterCoord2Coords("G", 3);
    this.spot.column = column;
    this.spot.sqIndex = sqIndex;
    this.spot.letter = letters[column];
    this.updateFormerSquare();
    this.square = this.updateCurrentSquare();
    const { x, y, imageX, imageY } = this.move();
    [this.x, this.y, this.imageX, this.imageY] = [x, y, imageX, imageY];
    console.log(this);
    // this.death();
    console.log(this);
  }

  findNeighbours() {
    const n = this.square.currentSquare.meta.squareNeighbours.map(
      (neighbour) => {
        if (neighbour.meta.hasPiece) return neighbour.meta.Piece;
      }
    );

    // console.log(n);
    const enemies = this.square.currentSquare.meta.squareNeighbours.map(
      (neighbour) => {
        if (neighbour.meta.hasPiece && neighbour.meta.Piece.color != this.color)
          return neighbour.meta.Piece;
        else return null;
      }
    );

    return { n, enemies };
  }

  hover(mX, mY) {
    const hb = this.hitbox(mX, mY);
    if (hb) {
      cursorHover = true;
      console.log(this);
    } else cursorHover = false;

    // else
  }

  drag(mX, mY) {
    // const hb = this.hitbox(mX, mY);

    if (this.clickedOn) {
      canvas.style.cursor = "move";
      this.x = mX;
      this.imageX = this.x - this.spot.pos / this.scale;
      this.y = mY;
      this.imageY = this.y - this.spot.pos / this.scale;
    }
  }

  moves() {
    return;
  }

  released() {
    canvas.style.cursor = "default";
    if (this.availableMoves.length > 0) {
      this.availableMoves.forEach((square) => {
        if (
          mouseX > square.x &&
          mouseX < square.x + square.pos &&
          mouseY > square.y &&
          mouseY < square.y + square.pos &&
          pieceClickedOn === this
        ) {
          this.changeSquare(square.coords.column, square.coords.sqIndex);
          this.moves();
        } else {
          const { x, y, imageX, imageY } = this.move();
          [this.x, this.y, this.imageX, this.imageY] = [x, y, imageX, imageY];
        }
      });
    } else {
      const { x, y, imageX, imageY } = this.move();
      [this.x, this.y, this.imageX, this.imageY] = [x, y, imageX, imageY];
    }
  }

  getPossibleMoves(squareNeighboursArray) {
    const possibleMoves = [];
    for (let neigh of squareNeighboursArray) {
      if (!neigh.meta.hasPiece) {
        possibleMoves.push(neigh);
      }
    }

    if (possibleMoves.length > 0) return possibleMoves;
    else return [];
  }

  highlightPossibleMoves() {
    if (this.availableMoves.length > 0) {
      for (let possibleMove of this.availableMoves) {
        noStroke();
        fill(255, 0, 0, 100);
        rect(possibleMove.x, possibleMove.y, possibleMove.pos);
      }
    }
  }

  onClickUpdate() {
    if (this.clickedOn) {
      //   this.click(mouseX, mouseY)
      console.log(this);

      pieceClickedOn = this;
    }
    // this.availableMoves = this.getPossibleMoves(
    //   this.square.currentSquare.meta.squareNeighbours
    // );
  }
}

class Bishop extends Piece {
  constructor(piece, initialSpot, color) {
    super(piece, initialSpot, color);
  }
}

class King extends Piece {
  constructor(piece, initialSpot, color) {
    super(piece, initialSpot, color);
  }

  moves() {
    this.availableMoves = this.allAroundMoves();
    // console.log(this);
  }
}

Object.assign(King.prototype, kingMoves);
// console.log(King.prototype);

class Knight extends Piece {
  constructor(piece, initialSpot, color) {
    super(piece, initialSpot, color);
  }
}

class Pawn extends Piece {
  constructor(piece, initialSpot, color) {
    super(piece, initialSpot, color);
    this.color = color;
  }

  moves() {
    this.availableMoves = this.forwardMove();
  }
}

Object.assign(Pawn.prototype, pawnMoves);

class Queen extends Piece {
  constructor(piece, initialSpot, color) {
    super(piece, initialSpot, color);
  }

  moves() {
    this.availableMoves = this.allAroundMoves();
  }
}

Object.assign(Queen.prototype, queenMoves);

class Rook extends Piece {
  constructor(piece, initialSpot, color) {
    super(piece, initialSpot, color);
  }
}
