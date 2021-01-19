function allAroundMoves() {
  return this.getPossibleMoves(this.square.currentSquare.meta.squareNeighbours);
}

function horizontalAndVerticalMoves() {
  const m = [];

  function horizontal(piece, signColumn) {
    for (let i = 1; i < 9; i++) {
      const column = board[piece.spot.column + signColumn * i];
      if (column === undefined) break;
      const row = column[piece.spot.sqIndex];
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

  function vertical(piece, signRow) {
    for (let i = 1; i < 9; i++) {
      const column = board[piece.spot.column];
      if (column === undefined) break;
      const row = column[piece.spot.sqIndex + signRow * i];
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

  horizontal(this, 1);
  horizontal(this, -1);
  vertical(this, -1);
  vertical(this, 1);

  return m;
}

function diagonalMoves() {
  const m = [];

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

  return m;
}

const kingMoves = {
  allAroundMoves,
};

const queenMoves = {
  allAroundMoves,
  diagonalMoves,
  horizontalAndVerticalMoves,
};

const bishopMoves = {
  diagonalMoves,
};

const rookMoves = {
  horizontalAndVerticalMoves,
};
