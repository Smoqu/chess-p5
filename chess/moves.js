function allAroundMoves() {
  return this.getPossibleMoves(this.square.currentSquare.meta.squareNeighbours);
}

function forwardMove() {
  const order = this.color === "White" ? -1 : 1;
  let m = [];
  m.push(
    this.square.currentSquare.meta.squareNeighbours.find((square) => {
      return (
        square.coords.column === this.spot.column &&
        square.coords.sqIndex === this.spot.sqIndex + 1 * order
      );
    })
  );

  if (this.history.length === 1) {
    if (!m.every((square) => square.meta.hasPiece)) {
      m.push(
        squares.find((square) => {
          return (
            square.coords.column === this.spot.column &&
            square.coords.sqIndex === this.spot.sqIndex + 2 * order
          );
        })
      );
    }
  }

  m = m.filter((square) => !square.meta.hasPiece);

  return this.getPossibleMoves(m);
}

// function horizontalAndVerticalMove() {
//     squares.forEach(square => {
//         if (square.coords.column )
//     })
// }

function diagonalMoves() {
  const m = [];

  // TOP LEFT = -1 -1
  // for (let tL = 1; tL < 9; tL++) {
  //   const column = board[this.spot.column - tL];
  //   if (column === undefined) break;
  //   const row = column[this.spot.sqIndex - tL];
  //   if (row === undefined) break;
  //   if (row.meta.hasPiece) {
  //     if (row.meta.Piece.color === this.color) break;
  //     else {
  //       m.push(row);
  //       break;
  //     }
  //   }
  //   m.push(row);
  // }

  // // TOP RIGHT = +1 -1
  // for (let tL = 1; tL < 9; tL++) {
  //   const column = board[this.spot.column + tL];
  //   if (column === undefined) break;
  //   const row = column[this.spot.sqIndex - tL];
  //   if (row === undefined) break;

  //   if (row.meta.hasPiece) {
  //     if (row.meta.Piece.color === this.color) break;
  //     else {
  //       m.push(row);
  //       break;
  //     }
  //   }
  //   m.push(row);
  // }

  // // BOTTOM RIGHT = +1 +1
  // for (let tL = 1; tL < 9; tL++) {
  //   const column = board[this.spot.column + tL];
  //   if (column === undefined) break;
  //   const row = column[this.spot.sqIndex + tL];
  //   if (row === undefined) break;
  //   if (row.meta.hasPiece) {
  //     if (row.meta.Piece.color === this.color) break;
  //     else {
  //       m.push(row);
  //       break;
  //     }
  //   }

  //   m.push(row);
  // }

  // for (let tL = 1; tL < 9; tL++) {
  //   const column = board[this.spot.column - tL];
  //   if (column === undefined) break;
  //   const row = column[this.spot.sqIndex + tL];
  //   if (row === undefined) break;
  //   if (row.meta.hasPiece) {
  //     if (row.meta.Piece.color === this.color) break;
  //     else {
  //       m.push(row);
  //       break;
  //     }
  //   }
  //   m.push(row);
  // }

  function initDiagonals(piece, signColumn, signRow) {
    for (let tL = 1; tL < 9; tL++) {
      const column = board[piece.spot.column + signColumn * tL];
      if (column === undefined) break;
      const row = column[piece.spot.sqIndex + signRow * tL];
      if (row === undefined) break;
      if (row.meta.hasPiece) {
        if (row.meta.Piece.color === piece.color) break;
        else {
          m.push(row);
          break;
        }
      }
      m.push(row);
    }
  }

  initDiagonals(this, -1, -1);
  initDiagonals(this, 1, -1);
  initDiagonals(this, 1, 1);
  initDiagonals(this, -1, 1);

  // console.log(topLeft);

  return m;
}

const kingMoves = {
  allAroundMoves,
};

const pawnMoves = {
  forwardMove,
};

const queenMoves = {
  allAroundMoves,
  diagonalMoves,
};

const bishopMoves = {
  diagonalMoves,
};
