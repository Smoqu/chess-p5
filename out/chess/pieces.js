"use strict";
let allPieces = [];
let pieceClickedOn;
let lastPiece;
let pieces;
pieces = [
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
        this.piece = piece;
        this.color = color;
        this.initialSpot = initialSpot;
        this.initialSpot.pos = size / 8;
        Object.freeze(this.initialSpot);
        this.spot = Object.assign({}, this.initialSpot);
        this.isDead = false;
        this.square = this.updateCurrentSquare();
        this.scale = 3;
        this.clickedOn = false;
        this.availableMoves = [];
        this.history = [];
        this.player = null;
        this.adversary = null;
        this.history.push({
            letter: this.spot.letter,
            row: this.spot.sqIndex + 1,
            square: this.square,
        });
        let { x, y, imageX, imageY } = this.move();
        [this.x, this.y, this.imageX, this.imageY] = [x, y, imageX, imageY];
        this.imageSize = this.spot.pos / (this.scale * 0.5);
        if (this.color === "Dark")
            this.img = darkPieces.images.find((image) => image.piece === this.piece);
        else
            this.img = whitePieces.images.find((image) => image.piece === this.piece);
    }
    show() {
        if (pieceClickedOn === this) {
            this.highlightPossibleMoves();
        }
        if (lastPiece === this) {
            this.highlightLastMove();
        }
        if (!this.isDead) {
            image(this.img.image, this.imageX, this.imageY, this.imageSize, this.imageSize);
        }
        if (showHitbox) {
            stroke(255, 0, 0);
            line(this.square.x, this.square.y, this.square.x + this.spot.pos, this.square.y + this.spot.pos);
            stroke(0, 0, 0);
        }
    }
    hitbox(mX, mY) {
        return (mX > this.square.x &&
            mX < this.square.x + this.spot.pos &&
            mY > this.square.y &&
            mY < this.square.y + this.spot.pos);
    }
    convertLetterCoord2Coords(letter, row) {
        const column = letters.indexOf(letter);
        const sqIndex = row - 1;
        return { column, sqIndex };
    }
    takes(square) {
        const index = allPieces.findIndex((p) => p === square.meta.Piece);
        allPieces[index].isDead = true;
        delete allPieces[index];
    }
    updateCurrentSquare() {
        let square = squares.find((sq) => this.spot.column === sq.coords.column &&
            this.spot.sqIndex === sq.coords.sqIndex);
        if (square !== undefined) {
            if (square.meta.hasPiece) {
                if (square.meta.Piece.piece !== "King") {
                    this.player.eaten.push(square.meta.Piece);
                    this.player.updateEaten();
                    this.takes(square);
                }
                else {
                    return this.square;
                }
            }
            square.meta.Piece = this;
            square.meta.hasPiece = true;
            const x = this.spot.pos * this.spot.column;
            const y = this.spot.pos * this.spot.sqIndex;
            return { x, y, currentSquare: square };
        }
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
    check() {
        var _a;
        let king;
        if (this.piece !== "King") {
            for (let move of this.availableMoves) {
                if (((_a = move.meta.Piece) === null || _a === void 0 ? void 0 : _a.piece) === "King") {
                    king = move.meta.Piece;
                }
            }
        }
        if (king !== undefined) {
            king.inCheck = true;
            king.inCh();
            setTimeout(() => {
                for (let move of this.availableMoves) {
                    king.availableMoves = king.availableMoves.filter((m) => m !== move);
                }
            }, 0.01);
        }
    }
    click(mX, mY) {
        const hb = this.hitbox(mX, mY);
        if (hb) {
            this.clickedOn = true;
        }
        else
            this.clickedOn = false;
    }
    death() {
        this.isDead = true;
    }
    changeSquare(column, sqIndex) {
        this.spot.column = column;
        this.spot.sqIndex = sqIndex;
        this.spot.letter = letters[column];
        this.updateFormerSquare();
        this.square = this.updateCurrentSquare();
        const { x, y, imageX, imageY } = this.move();
        [this.x, this.y, this.imageX, this.imageY] = [x, y, imageX, imageY];
    }
    getPossibleMoves(array) {
        const possibleMoves = [];
        for (let neigh of array) {
            if (!neigh.meta.hasPiece) {
                possibleMoves.push(neigh);
            }
            else {
                if (neigh.meta.Piece.color !== this.color)
                    possibleMoves.push(neigh);
            }
        }
        return possibleMoves;
    }
    hover(mX, mY) {
        const hb = this.hitbox(mX, mY);
        if (hb) {
            cursorHover = true;
        }
        else
            cursorHover = false;
    }
    drag(mX, mY) {
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
    highlightLastMove() {
        if (lastPiece === this) {
            const last = this.history.slice(-2);
            for (let el of last) {
                noStroke();
                fill(255, 255, 0, 100);
                rect(el.square.currentSquare.x, el.square.currentSquare.y, el.square.currentSquare.pos, el.square.currentSquare.pos);
            }
        }
    }
    released() {
        canvas.style.cursor = "default";
        if (this.availableMoves.length > 0) {
            this.availableMoves.forEach((square) => {
                if (mouseX > square.x &&
                    mouseX < square.x + square.pos &&
                    mouseY > square.y &&
                    mouseY < square.y + square.pos &&
                    pieceClickedOn === this &&
                    turn === this.player) {
                    this.changeSquare(square.coords.column, square.coords.sqIndex);
                    this.moves();
                    this.history.push({
                        letter: this.spot.letter,
                        row: this.spot.sqIndex + 1,
                        square: this.square,
                    });
                    this.check();
                    pieceClickedOn = null;
                    lastPiece = this;
                    turn = this.adversary;
                    const h = this.history.slice(-2);
                    const history = { last: h[0], current: h[1] };
                    everyMove.push(history);
                    updateEveryMove(history);
                    state.updateState(allPieces);
                }
                else {
                    const { x, y, imageX, imageY } = this.move();
                    [this.x, this.y, this.imageX, this.imageY] = [x, y, imageX, imageY];
                }
            });
        }
        else {
            const { x, y, imageX, imageY } = this.move();
            [this.x, this.y, this.imageX, this.imageY] = [x, y, imageX, imageY];
        }
    }
    highlightPossibleMoves() {
        if (this.availableMoves.length > 0) {
            for (let possibleMove of this.availableMoves) {
                noStroke();
                fill(255, 0, 0, 100);
                rect(possibleMove.x, possibleMove.y, possibleMove.pos, possibleMove.pos);
            }
        }
    }
    onClickUpdate() {
        if (this.clickedOn) {
            pieceClickedOn = this;
        }
    }
    updateForbiddenMoves(s) {
        return [];
    }
}
class Bishop extends Piece {
    constructor(piece, initialSpot, color) {
        super(piece, initialSpot, color);
    }
    diagonalMoves() {
        const topLeft = [];
        const topRight = [];
        const bottomRight = [];
        const bottomLeft = [];
        return { topLeft, topRight, bottomLeft, bottomRight };
    }
    moves() {
        const { topLeft, topRight, bottomRight, bottomLeft } = this.diagonalMoves();
        this.availableMoves = [
            ...topLeft,
            ...topRight,
            ...bottomRight,
            ...bottomLeft,
        ];
    }
}
Object.assign(Bishop.prototype, bishopMoves);
class King extends Piece {
    constructor(piece, initialSpot, color) {
        super(piece, initialSpot, color);
        this.inCheck = false;
        this.forbiddenMoves = [];
    }
    allAroundMoves() {
        return [];
    }
    moves() {
        this.availableMoves = this.allAroundMoves();
    }
    inCh() {
        if (this.inCheck)
            this.inCheck = false;
    }
}
Object.assign(King.prototype, kingMoves);
class Knight extends Piece {
    constructor(piece, initialSpot, color) {
        super(piece, initialSpot, color);
    }
    moves() {
        const m = squares.filter((square) => {
            if ((square.coords.column === this.spot.column - 1 &&
                square.coords.sqIndex === this.spot.sqIndex - 2) ||
                (square.coords.column === this.spot.column - 2 &&
                    square.coords.sqIndex === this.spot.sqIndex - 1) ||
                (square.coords.column === this.spot.column - 2 &&
                    square.coords.sqIndex === this.spot.sqIndex + 1) ||
                (square.coords.column === this.spot.column - 1 &&
                    square.coords.sqIndex === this.spot.sqIndex + 2) ||
                (square.coords.column === this.spot.column + 1 &&
                    square.coords.sqIndex === this.spot.sqIndex - 2) ||
                (square.coords.column === this.spot.column + 2 &&
                    square.coords.sqIndex === this.spot.sqIndex - 1) ||
                (square.coords.column === this.spot.column + 2 &&
                    square.coords.sqIndex === this.spot.sqIndex + 1) ||
                (square.coords.column === this.spot.column + 1 &&
                    square.coords.sqIndex === this.spot.sqIndex + 2)) {
                return square;
            }
        });
        this.availableMoves = this.getPossibleMoves(m);
    }
}
class Pawn extends Piece {
    constructor(piece, initialSpot, color) {
        super(piece, initialSpot, color);
        this.color = color;
    }
    forwardMove() {
        const order = this.color === "White" ? -1 : 1;
        let m = [];
        const forSquare = board[this.spot.column][this.spot.sqIndex + 1 * order];
        if (forSquare !== undefined)
            m.push(forSquare);
        if (this.history.length === 1 && !m[0].meta.hasPiece) {
            const secondSquare = board[this.spot.column][this.spot.sqIndex + 2 * order];
            if (secondSquare !== undefined)
                m.push(secondSquare);
        }
        m = m.filter((square) => !square.meta.hasPiece);
        let areEnemies;
        if (this.color === "White") {
            areEnemies = [
                this.square.currentSquare.meta.squareNeighbours[0],
                this.square.currentSquare.meta.squareNeighbours[5],
            ];
        }
        else {
            areEnemies = [
                this.square.currentSquare.meta.squareNeighbours[2],
                this.square.currentSquare.meta.squareNeighbours[7],
            ];
        }
        const enemies = areEnemies.filter((square) => {
            var _a;
            if (square === null || square === void 0 ? void 0 : square.meta.hasPiece) {
                if (((_a = square.meta.Piece) === null || _a === void 0 ? void 0 : _a.color) !== this.color)
                    return square;
            }
        });
        if (pieceClickedOn === this)
            m.push(...enemies);
        return m;
    }
    moves() {
        this.availableMoves = this.forwardMove();
    }
}
class Queen extends Piece {
    constructor(piece, initialSpot, color) {
        super(piece, initialSpot, color);
    }
    diagonalMoves() {
        const topLeft = [];
        const topRight = [];
        const bottomRight = [];
        const bottomLeft = [];
        return { topLeft, topRight, bottomLeft, bottomRight };
    }
    horizontalAndVerticalMoves() {
        const horz1 = [];
        const horz2 = [];
        const ver1 = [];
        const ver2 = [];
        return { horz1, horz2, ver1, ver2 };
    }
    moves() {
        const { topLeft, topRight, bottomRight, bottomLeft } = this.diagonalMoves();
        const diagonalMoves = [
            ...topLeft,
            ...topRight,
            ...bottomRight,
            ...bottomLeft,
        ];
        const { horz1, horz2, ver1, ver2 } = this.horizontalAndVerticalMoves();
        const horizontalAndVerticalMoves = [...horz1, ...horz2, ...ver1, ...ver2];
        const m = [...diagonalMoves, ...horizontalAndVerticalMoves];
        this.availableMoves = [...new Set(m)];
    }
}
Object.assign(Queen.prototype, queenMoves);
class Rook extends Piece {
    constructor(piece, initialSpot, color) {
        super(piece, initialSpot, color);
    }
    horizontalAndVerticalMoves() {
        const horz1 = [];
        const horz2 = [];
        const ver1 = [];
        const ver2 = [];
        return { horz1, horz2, ver1, ver2 };
    }
    moves() {
        const { horz1, horz2, ver1, ver2 } = this.horizontalAndVerticalMoves();
        const horizontalAndVerticalMoves = [...horz1, ...horz2, ...ver1, ...ver2];
        this.availableMoves = horizontalAndVerticalMoves;
    }
}
Object.assign(Rook.prototype, rookMoves);
