const divInformations = document.getElementsByClassName("informations")[0];
divInformations.style.width = "100%";
divInformations.style.height = size + "px";

class Player {
  constructor(color, pieces, name = "default") {
    this.pieces = pieces;
    this.color = color;
    this.name = name;

    this.eaten = [];

    this.PContainer = document.createElement("div");
    this.PContainer.className = `${color} info`;
    this.PTime = document.createElement("p");
    this.PName = document.createElement("p");
    this.PEaten = document.createElement("div");

    this.PName.innerHTML = this.name;
    this.PName.id = "name";

    this.PEaten.id = "eaten";

    this.PTime.id = "time";
    this.PTime.innerHTML = "Time";

    this.PContainer.appendChild(this.PTime);
    this.PContainer.appendChild(this.PName);
    this.PContainer.appendChild(this.PEaten);
    divInformations.appendChild(this.PContainer);
  }

  update(PTimeValue) {
    // this.PTimeValue = PTimeValue;

    this.PTime.innerHTML = PTimeValue;
  }

  updateEaten() {
    const piece = this.eaten[this.eaten.length - 1];
    // console.log("eaten", piece);
    const img = document.createElement("img");
    img.src = piece.img.path;
    img.width, img.style.width, img.height, (img.style.height = "20px");
    this.PEaten.appendChild(img);
  }
}

const divPlayersMoves = document.createElement("div");
divPlayersMoves.className = "playerMoves";

const everyMove = [];

function updateEveryMove(last) {
  const lastContainer = document.createElement("div");
  const lastP = document.createElement("p");

  // console.log("tout à fait", last);
  lastP.innerHTML = `${everyMove.length}. ${last.last.letter}${last.last.row}-${last.current.letter}${last.current.row}`;
  lastContainer.appendChild(lastP);
  divPlayersMoves.prepend(lastContainer);
}

divInformations.appendChild(divPlayersMoves);
