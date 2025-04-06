class Snake {
  constructor(body, direction) {
    this.body = body;
    this.direction = direction;
  }

  move(x, y) {
    this.body.unshift({ x, y }); // cambia las variables de la posicion de la sepiente para que se mueva
    this.body.pop(); // elimina la ultima posicion de la sepiente
  }

  grow() {
    const tail = this.body[this.body.length - 1];
    this.body.push({ ...tail }); // añade un uno trozo a la cola de la serpiente
  }

  verificarColisio() {
    const [head, ...body] = this.body;

    // colisiones con el cuerpo de la serpiente
    for (let segment of body) {
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }
    return false;
  }

  render(grid) {
    const existingSnakeParts = grid.querySelectorAll(".snake-part");
    existingSnakeParts.forEach((part) => part.remove());

    this.body.forEach((segment) => {
      const snakePart = document.createElement("div");
      snakePart.style.gridColumnStart = segment.x;
      snakePart.style.gridRowStart = segment.y;
      snakePart.classList.add("snake-part");
      grid.appendChild(snakePart);
  });
  }
}

class Manzana {
  constructor(manzanaElement) {
    this.manzanaElement = manzanaElement;
  }

  regenerar() {
    const randomX = Math.floor(Math.random() * 20) + 1;
    const randomY = Math.floor(Math.random() * 10) + 1;

    this.manzanaElement.style.gridColumnStart = randomX;
    this.manzanaElement.style.gridRowStart = randomY;

    this.manzanax = randomX;
    this.manzanay = randomY;
  }
}

class Game {
  constructor(grid, pointsDisplay, manzanaElement) {
    this.grid = grid;
    this.pointsDisplay = pointsDisplay;
    this.manzanaElement = manzanaElement;
    this.snake = new Snake([{ x: 1, y: 1 }], "right");
    this.manzana = new Manzana(manzanaElement);
    this.direction = null;
    this.points = 0;
    this.x = 1;
    this.y = 1;
    this.vidas = 3;
    this.gameInterval = null;
  }

  incrementarPunts() {
    this.points += 10;
    this.pointsDisplay.textContent = this.points;
  }

  moveSnake() {
    if (this.direction === "right") this.x++;
    if (this.direction === "left") this.x--;
    if (this.direction === "down") this.y++;
    if (this.direction === "up") this.y--;

    //colisiones con las paredes
    if (this.x < 1 || this.x > 20 || this.y < 1 || this.y > 10) {
      this.GameOver();
      return;
    }

    this.snake.move(this.x, this.y);

    if (this.snake.verificarColisio()) {
      this.GameOver();
      return;
    }

    // Comprobar si se come la manzana
    if (this.x === this.manzana.manzanax && this.y === this.manzana.manzanay) {
      this.incrementarPunts();
      this.snake.grow();
      this.manzana.regenerar();
    }

    this.snake.render(this.grid);
  }

  GameOver() {
    this.vidas--;

    if (this.vidas > 0) { 
        alert(`Te queda: ${this.vidas} vidas`);
        this.points = 0;
        this.pointsDisplay.textContent = this.points;
        this.snake = new Snake([{ x: 1, y: 1 }], "right");// devuelve la serpiente a su posición inicial
        this.direction = null;
        this.x = 1;
        this.y = 1;
        this.snake.render(this.grid);
    } 
    else {
        alert(`Game Over! ${this.vidas} vidas`);
        window.location.reload(); // recarga la pantalla y se reinicia el juego
    }
  }


  start() {
    this.manzana.regenerar();
    this.snake.render(this.grid);

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.code === "KeyD") this.direction = "right";
      if (event.key === "ArrowLeft" || event.code === "KeyA") this.direction = "left";
      if (event.key === "ArrowDown" || event.code === "KeyS") this.direction = "down";
      if (event.key === "ArrowUp" || event.code === "KeyW") this.direction = "up";
    });

    this.gameInterval = setInterval(() => this.moveSnake(), 120); //velocidad de la serpiente
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const pointsDisplay = document.getElementById("points");
  const manzanaElement = document.querySelector(".Manzana");

  const game = new Game(grid, pointsDisplay, manzanaElement);
  game.start();
 });
