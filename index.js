/// <reference path="./TSDef/p5.global-mode.d.ts" />

let debug = false;

let board = new Array(8);
const size = 800;

let canvas;

// let piece;
let visualBoard;

let buttonCoords;
let buttonHitbox;
let buttonDebug;

let darkPawns;
let whitePawns;

let darkBishops;
let whiteBishops;

let darkKnights;
let whiteKnights;

let darkRooks;
let whiteRooks;

let darkQueen;
let whiteQueen;

let darkKing;
let whiteKing;

function preload() {
  const p = ["Bishop", "King", "Knight", "Pawn", "Queen", "Rook"];
  for (let i = 0; i < 12; i++) {
    if (i <= 5) {
      let piece = i;
      darkPieces.images.push({
        piece: p[piece],
        image: loadImage(`assets/pieces/black/${p[i]}_black.png`),
      });
    } else if (i > 5) {
      let piece = i - 6;
      whitePieces.images.push({
        piece: p[piece],
        image: loadImage(`assets/pieces/white/${p[i - 6]}_white.png`),
      });
    }
  }
}

function setup() {
  createCanvas(size, size);
  canvas = document.querySelector(".p5Canvas");

  background(50);
  for (let i = 0; i < 8; i++) board[i] = new Array(8);
  visualBoard = new Board();

  darkPawns = darkPieces.pieces.Pawns;
  whitePawns = whitePieces.pieces.Pawns;

  darkBishops = darkPieces.pieces.Bishops;
  whiteBishops = whitePieces.pieces.Bishops;

  darkKnights = darkPieces.pieces.Knights;
  whiteKnights = whitePieces.pieces.Knights;

  darkRooks = darkPieces.pieces.Rooks;
  whiteRooks = whitePieces.pieces.Rooks;

  // console.log(darkPawns);

  squares.forEach((square) => {
    square.getNeighbours();
  });

  initPieces();

  allPieces.forEach((piece) => {
    piece.moves();
  });

  // console.log(piecesImages);

  buttonDebug = createButton("Debug");
  buttonCoords = createButton("Show coordinates");
  buttonHitbox = createButton("Show hitboxes");
}

function draw() {
  visualBoard.show();

  allPieces.forEach((piece) => {
    piece.show();
    // piece.moves();
    // piece.check();
    // if (piece.piece === "Pawn") piece.onClickUpdate(false, -1, -1);
  });

  if (debug) {
    buttonCoords.show();
    buttonHitbox.show();
  } else {
    buttonCoords.hide();
    buttonHitbox.hide();
  }

  // image(darkPieces.images[6], 250, 250);
}

function mousePressed() {
  buttonDebug.mousePressed(() => (debug = !debug));
  buttonCoords.mousePressed(() => (showCoords = !showCoords));
  buttonHitbox.mousePressed(() => (showHitbox = !showHitbox));

  allPieces.forEach((piece) => {
    piece.click(mouseX, mouseY);
    piece.onClickUpdate();
  });
  // b.cell(mouseX, mouseY);
}

function mouseMoved() {
  // allPieces.forEach((piece) => piece.hover(mouseX, mouseY));
  //
}

// function doubleClicked() {
//   // piece.dblClick(mouseX, mouseY);
// }

function mouseDragged() {
  allPieces.forEach((piece) => piece.drag(mouseX, mouseY));
}

function mouseReleased() {
  allPieces.forEach((piece) => {
    piece.released();
    piece.moves();
    piece.check();
  });
}

function initPieces() {
  const initPawns = (color, sqIndex, col) => {
    for (let pawn = 0; pawn < 8; pawn++) {
      const p = new Pawn(
        "Pawn",
        {
          column: pawn,
          sqIndex,
          letter: letters[pawn],
        },
        col
      );
      color.push(p);
      allPieces.push(p);
    }

    // color.forEach((pawn) => pawn.updateCurrentSquare());
  };

  initPawns(darkPawns, 1, "Dark");
  initPawns(whitePawns, 6, "White");

  const initBishops = (color, sqIndex, col) => {
    for (let bishop = 0; bishop < 2; bishop++) {
      const column = bishop === 0 ? 2 : 5;
      const b = new Bishop(
        "Bishop",
        { column, sqIndex, letter: letters[column] },
        col
      );

      color.push(b);
      allPieces.push(b);
    }

    // color.forEach((bishop) => bishop.updateCurrentSquare());
  };

  initBishops(darkBishops, 0, "Dark");
  initBishops(whiteBishops, 7, "White");

  const initKnights = (color, sqIndex, col) => {
    for (let knight = 0; knight < 2; knight++) {
      const column = knight === 0 ? 1 : 6;
      const k = new Knight(
        "Knight",
        { column, sqIndex, letter: letters[column] },
        col
      );
      color.push(k);
      allPieces.push(k);
    }

    // color.forEach((knight) => knight.updateCurrentSquare());
  };

  initKnights(darkKnights, 0, "Dark");
  initKnights(whiteKnights, 7, "White");

  const initRooks = (color, sqIndex, col) => {
    for (let rook = 0; rook < 2; rook++) {
      const column = rook === 0 ? 0 : 7;
      const r = new Rook(
        "Rook",
        { column, sqIndex, letter: letters[column] },
        col
      );
      color.push(r);
      allPieces.push(r);
    }

    // color.forEach((rook) => rook.updateCurrentSquare());
  };

  initRooks(darkRooks, 0, "Dark");
  initRooks(whiteRooks, 7, "White");

  darkPieces.pieces.Queen = new Queen(
    "Queen",
    { column: 3, sqIndex: 0, letter: letters[3] },
    "Dark"
  );
  whitePieces.pieces.Queen = new Queen(
    "Queen",
    { column: 3, sqIndex: 7, letter: letters[3] },
    "White"
  );

  darkPieces.pieces.King = new King(
    "King",
    { column: 4, sqIndex: 0, letter: letters[4] },
    "Dark"
  );
  whitePieces.pieces.King = new King(
    "King",
    { column: 4, sqIndex: 7, letter: letters[4] },
    "White"
  );

  allPieces.push(
    darkPieces.pieces.Queen,
    whitePieces.pieces.Queen,
    darkPieces.pieces.King,
    whitePieces.pieces.King
  );
}
