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

// console.log(darkPieces);

class Piece {
  constructor(piece, initialSpot, color) {
    this.piece = piece;
    this.color = color;

    this.initialSpot = initialSpot;
    this.initialSpot.pos = size / 8;

    this.spot = this.initialSpot;

    const currentSquare = squares.find(
      (square) =>
        square.coords.column === this.spot.column &&
        square.coords.sqIndex === this.spot.sqIndex
    );

    this.square = {
      x: this.spot.pos * this.spot.column,
      y: this.spot.pos * this.spot.sqIndex,
      currentSquare,
    };

    this.x = this.square.x + this.spot.pos / 2;
    this.y = this.square.y + this.spot.pos / 2;

    this.scale = 3;
    this.imageX = this.x - this.spot.pos / this.scale;
    this.imageY = this.y - this.spot.pos / this.scale;
    this.imageSize = this.spot.pos / (this.scale * 0.5);

    if (this.color === "Dark")
      this.img = darkPieces.images.find((image) => image.piece === this.piece);
    else
      this.img = whitePieces.images.find((image) => image.piece === this.piece);
  }

  show() {
    // if (this.color === 255) stroke(0);
    // else stroke(255);
    // fill(this.color);
    // ellipse(this.x, this.y, this.radius);

    // imageMode(CENTER);
    image(
      this.img.image,
      this.imageX,
      this.imageY,
      this.imageSize,
      this.imageSize
    );

    stroke(255, 0, 0);
    line(
      this.square.x,
      this.square.y,
      this.square.x + this.spot.pos,
      this.square.y + this.spot.pos
    );
  }

  onSquare() {
    let square = squares.find(
      (sq) =>
        this.spot.column === sq.coords.column &&
        this.spot.sqIndex === sq.coords.sqIndex
    );

    if (square != "undefined") {
      square.meta.Piece = this;
      square.meta.hasPiece = true;
    }

    console.log(square);
  }

  click(mX, mY) {
    // const distance = dist(mX, mY, this.x, this.y);

    // const col = this.color;

    if (
      mX > this.square.x &&
      mX < this.square.x + this.spot.pos &&
      mY > this.square.y &&
      mY < this.square.y + this.spot.pos
    ) {
      // this.color = 56
      console.log(this);
      cursorHover = true;
      console.log(cursorHover);
    }

    cursorHover = false;
    // console.log(cursorHover);
  }

  // dblClick(mX, mY) {
  //   const distance = dist(mX, mY, this.x, this.y);
  //   let x = this.x;
  //   let y = this.y;

  //   if (this.radius > distance) {
  //     this.lockOnMouse = true;
  //   } else {
  //     this.lockOnMouse = false;
  //     this.x = x;
  //     this.y = y;
  //   }
  // }
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
