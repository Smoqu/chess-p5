let allPieces = [];

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

    // this.spot takes the relay in terms of positioning
    this.spot = this.initialSpot;

    // finds the initial square on which the piece is on
    // const currentSquare = squares.find(
    //   (square) =>
    //     square.coords.column === this.spot.column &&
    //     square.coords.sqIndex === this.spot.sqIndex
    // );

    this.isDead = false;

    // keeps in memory useful information about the square
    // this.square = {
    //   x: this.spot.pos * this.spot.column,
    //   y: this.spot.pos * this.spot.sqIndex,
    //   currentSquare,
    // };

    // this.square;

    this.square = this.updateCurrentSquare();

    // its position on the canvas
    // this.x = this.square.x + this.spot.pos / 2;
    // this.y = this.square.y + this.spot.pos / 2;
    this.scale = 3;

    let { x, y, imageX, imageY } = this.move();
    [this.x, this.y, this.imageX, this.imageY] = [x, y, imageX, imageY];
    // this.x = move.x;
    // this.y = move.y;
    // this.imageX = move.imageX;
    // this.imageY = move.imageY;

    console.log(this.square);
    // the scale of the image
    // the center of the image
    // this.imageX = this.x - this.spot.pos / this.scale;
    // this.imageY = this.y - this.spot.pos / this.scale;
    this.imageSize = this.spot.pos / (this.scale * 0.5);

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
  }

  hitbox(mX, mY) {
    if (
      mX > this.square.x &&
      mX < this.square.x + this.spot.pos &&
      mY > this.square.y &&
      mY < this.square.y + this.spot.pos
    ) {
      return true;
    }
  }

  convertLetterCoord2Coords(letter, row) {
    const column = letters.indexOf(letter);
    // console.log(column);
    const sqIndex = row - 1;
    // console.log()

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

  hover(mX, mY) {
    const hb = this.hitbox(mX, mY);
    if (hb) cursorHover = true;
    else cursorHover = false;
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

    // this.square.currentSquare.highlightNeighbours = this.square.currentSquare
    //   .highlightNeighbours
    //   ? false
    //   : true;
    // console.log(this.square.currentSquare.highlightNeighbours);

    if (hb) {
      // this.square.currentSquare.highlightNeighbours = true;
      // console.log(this.square.currentSquare.highlightNeighbours);
      console.log(this);
      const letterCoord = this.convertLetterCoord2Coords("F", 3);
      this.spot.column = letterCoord.column;
      this.spot.sqIndex = letterCoord.sqIndex;
      this.spot.letter = letters[letterCoord.column];
      this.updateFormerSquare();
      this.square = this.updateCurrentSquare();
      const { x, y, imageX, imageY } = this.move();
      [this.x, this.y, this.imageX, this.imageY] = [x, y, imageX, imageY];
      console.log(this);
    } else {
      // this.square.currentSquare.highlightNeighbours = false;
      // console.log(this.square.currentSquare.highlightNeighbours);
    }

    // this.square.currentSquare.highlightNeigh(hb);
  }

  death() {
    this.death = true;
  }
}

class King extends Piece {
  constructor(piece, initialSpot, color) {
    super(piece, initialSpot, color);
  }
}

class Queen extends Piece {
  constructor(piece, initialSpot, color) {
    super(piece, initialSpot, color);
  }
}

class Bishop extends Piece {
  constructor(piece, initialSpot, color) {
    super(piece, initialSpot, color);
  }
}

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
}

class Rook extends Piece {
  constructor(piece, initialSpot, color) {
    super(piece, initialSpot, color);
  }
}
