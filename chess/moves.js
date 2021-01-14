function allAroundMoves() {
  return this.getPossibleMoves(this.square.currentSquare.meta.squareNeighbours);
}

function forwardMove() {
  const order = this.color === "White" ? -1 : 1;
  const m = [];
  m.push(
    this.square.currentSquare.meta.squareNeighbours.find((square) => {
      return (
        square.coords.column === this.spot.column &&
        square.coords.sqIndex === this.spot.sqIndex + 1 * order
      );
    })
  );

  console.log();

  if (objectEquality(this.initialSpot, this.spot)) {
    console.log("Oui ça devrait");
    m.push(
      squares.find((square) => {
        return (
          square.coords.column === this.spot.column &&
          square.coords.sqIndex === this.spot.sqIndex + 2 * order
        );
      })
    );

    console.log(this.spot, this.initialSpot);
  }

  return this.getPossibleMoves(m);
}

// function horizontalAndVerticalMove() {
//     squares.forEach(square => {
//         if (square.coords.column )
//     })
// }

const kingMoves = {
  allAroundMoves,
};

const pawnMoves = {
  forwardMove,
};

const queenMoves = {
  allAroundMoves,
};
