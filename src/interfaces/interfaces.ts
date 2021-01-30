interface piece {
  color: string;
  pieces: {
    Rooks: Array<Rook>;
    Bishops: Array<Bishop>;
    Knights: Array<Knight>;
    Pawns: Array<Pawn>;
    King: King | null;
    Queen: Queen | null;
  };
  images: Array<image>;
}

type image = {
  piece: string;
  image: p5.Image;
  path: string;
};

interface pieceSpot {
  column: number;
  sqIndex: number;
  letter: string;
  pos?: number;
}

interface pieceSquare {
  x: number;
  y: number;
  currentSquare: Square;
}

interface pieceHistory {
  letter: string;
  row: number;
  square: pieceSquare | undefined;
}

interface diagonalMove {
  topLeft: Array<Square>;
  topRight: Array<Square>;
  bottomRight: Array<Square>;
  bottomLeft: Array<Square>;
}

interface horizontalAndVerticalMove {
  horz1: Array<Square>;
  horz2: Array<Square>;
  ver1: Array<Square>;
  ver2: Array<Square>;
}
