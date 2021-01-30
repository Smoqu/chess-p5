"use strict";
let debug = false;
let board;
const size = 800;
let canvas;
let state;
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
let turn;
let whitePlayer;
let darkPlayer;
function preload() {
    const p = ["Bishop", "King", "Knight", "Pawn", "Queen", "Rook"];
    for (let i = 0; i < 12; i++) {
        if (i <= 5) {
            let piece = i;
            const path = `assets/pieces/black/${p[i]}_black.png`;
            darkPieces.images.push({
                piece: p[piece],
                image: loadImage(path),
                path,
            });
        }
        else if (i > 5) {
            let piece = i - 6;
            const path = `assets/pieces/white/${p[i - 6]}_white.png`;
            whitePieces.images.push({
                piece: p[piece],
                image: loadImage(path),
                path,
            });
        }
    }
}
function setup() {
    createCanvas(size, size);
    canvas = document.querySelector(".p5Canvas");
    background(50);
    visualBoard = new Board();
    board = visualBoard.getBoardArray();
    darkPawns = darkPieces.pieces.Pawns;
    whitePawns = whitePieces.pieces.Pawns;
    darkBishops = darkPieces.pieces.Bishops;
    whiteBishops = whitePieces.pieces.Bishops;
    darkKnights = darkPieces.pieces.Knights;
    whiteKnights = whitePieces.pieces.Knights;
    darkRooks = darkPieces.pieces.Rooks;
    whiteRooks = whitePieces.pieces.Rooks;
    squares.forEach((square) => {
        square.getNeighbours();
    });
    initPieces();
    allPieces.forEach((piece) => {
        piece.moves();
    });
    whitePlayer = new Player("White", pieces[1], "José");
    turn = whitePlayer;
    darkPlayer = new Player("Dark", pieces[0], "Juan");
    allPieces.forEach((piece) => {
        if (piece.color === whitePlayer.color) {
            piece.player = whitePlayer;
            piece.adversary = darkPlayer;
        }
        else {
            piece.player = darkPlayer;
            piece.adversary = whitePlayer;
        }
    });
    state = new State();
    state.updateState(allPieces);
    allPieces.forEach((piece) => piece.updateForbiddenMoves(state));
}
function draw() {
    visualBoard.show();
    allPieces.forEach((piece) => {
        piece.show();
    });
}
function mousePressed() {
    allPieces.forEach((piece) => {
        piece.click(mouseX, mouseY);
        piece.onClickUpdate();
        piece.moves();
        piece.check();
    });
}
function mouseMoved() {
}
function mouseDragged() {
    allPieces.forEach((piece) => piece.drag(mouseX, mouseY));
}
function mouseReleased() {
    allPieces.forEach((piece) => {
        piece.released();
        piece.moves();
        if (piece.piece === "King") {
            piece.updateForbiddenMoves(state);
        }
        piece.check();
    });
}
function initPieces() {
    const initPawns = (color, sqIndex, col) => {
        for (let pawn = 0; pawn < 8; pawn++) {
            const p = new Pawn("Pawn", {
                column: pawn,
                sqIndex,
                letter: letters[pawn],
            }, col);
            color.push(p);
            allPieces.push(p);
        }
    };
    initPawns(darkPawns, 1, "Dark");
    initPawns(whitePawns, 6, "White");
    const initBishops = (color, sqIndex, col) => {
        for (let bishop = 0; bishop < 2; bishop++) {
            const column = bishop === 0 ? 2 : 5;
            const b = new Bishop("Bishop", { column, sqIndex, letter: letters[column] }, col);
            color.push(b);
            allPieces.push(b);
        }
    };
    initBishops(darkBishops, 0, "Dark");
    initBishops(whiteBishops, 7, "White");
    const initKnights = (color, sqIndex, col) => {
        for (let knight = 0; knight < 2; knight++) {
            const column = knight === 0 ? 1 : 6;
            const k = new Knight("Knight", { column, sqIndex, letter: letters[column] }, col);
            color.push(k);
            allPieces.push(k);
        }
    };
    initKnights(darkKnights, 0, "Dark");
    initKnights(whiteKnights, 7, "White");
    const initRooks = (color, sqIndex, col) => {
        for (let rook = 0; rook < 2; rook++) {
            const column = rook === 0 ? 0 : 7;
            const r = new Rook("Rook", { column, sqIndex, letter: letters[column] }, col);
            color.push(r);
            allPieces.push(r);
        }
    };
    initRooks(darkRooks, 0, "Dark");
    initRooks(whiteRooks, 7, "White");
    darkPieces.pieces.Queen = new Queen("Queen", { column: 3, sqIndex: 0, letter: letters[3] }, "Dark");
    whitePieces.pieces.Queen = new Queen("Queen", { column: 3, sqIndex: 7, letter: letters[3] }, "White");
    darkPieces.pieces.King = new King("King", { column: 4, sqIndex: 0, letter: letters[4] }, "Dark");
    whitePieces.pieces.King = new King("King", { column: 4, sqIndex: 7, letter: letters[4] }, "White");
    allPieces.push(darkPieces.pieces.Queen, whitePieces.pieces.Queen, darkPieces.pieces.King, whitePieces.pieces.King);
}
