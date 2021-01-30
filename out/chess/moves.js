"use strict";
function allAroundMoves() {
    return this.getPossibleMoves(this.square.currentSquare.meta.squareNeighbours);
}
function horizontalAndVerticalMoves() {
    const m = [];
    function horizontal(piece, signColumn) {
        const sq = [];
        for (let i = 1; i < 9; i++) {
            const column = board[piece.spot.column + signColumn * i];
            if (column === undefined)
                break;
            const row = column[piece.spot.sqIndex];
            if (row.meta.hasPiece) {
                if (row.meta.Piece.color === piece.color)
                    break;
                else {
                    m.push(row);
                    sq.push(row);
                    break;
                }
            }
            m.push(row);
            sq.push(row);
        }
        return sq;
    }
    function vertical(piece, signRow) {
        const sq = [];
        for (let i = 1; i < 9; i++) {
            const column = board[piece.spot.column];
            if (column === undefined)
                break;
            const row = column[piece.spot.sqIndex + signRow * i];
            if (row === undefined)
                break;
            if (row.meta.hasPiece) {
                if (row.meta.Piece.color === piece.color)
                    break;
                else {
                    m.push(row);
                    sq.push(row);
                    break;
                }
            }
            m.push(row);
            sq.push(row);
        }
        return sq;
    }
    const horz1 = horizontal(this, 1);
    const horz2 = horizontal(this, -1);
    const ver1 = vertical(this, -1);
    const ver2 = vertical(this, 1);
    return { horz1, horz2, ver1, ver2 };
}
function diagonalMoves() {
    const m = [];
    function initDiagonals(piece, signColumn, signRow) {
        const sq = [];
        for (let tL = 1; tL < 9; tL++) {
            const column = board[piece.spot.column + signColumn * tL];
            if (column === undefined)
                break;
            const row = column[piece.spot.sqIndex + signRow * tL];
            if (row === undefined)
                break;
            if (row.meta.hasPiece) {
                if (row.meta.Piece.color === piece.color)
                    break;
                else {
                    m.push(row);
                    sq.push(row);
                    break;
                }
            }
            m.push(row);
            sq.push(row);
        }
        return sq;
    }
    const topLeft = initDiagonals(this, -1, -1);
    const topRight = initDiagonals(this, 1, -1);
    const bottomRight = initDiagonals(this, 1, 1);
    const bottomLeft = initDiagonals(this, -1, 1);
    return { topLeft, topRight, bottomRight, bottomLeft };
}
const kingMoves = {
    allAroundMoves,
};
const queenMoves = {
    diagonalMoves,
    horizontalAndVerticalMoves,
};
const bishopMoves = {
    diagonalMoves,
};
const rookMoves = {
    horizontalAndVerticalMoves,
};
