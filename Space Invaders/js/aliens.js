export class Alien {
  constructor(squares, width) {
    this.squares = squares;
    this.width = width;
    this.alienInvaders = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ];
    this.direction = 1;
    this.goingRight = true;
    this.aliensRemoved = [];
    this.laserSpeed = 100;
  }

  draw() {
    this.alienInvaders.forEach((pos, i) => {
      if (!this.aliensRemoved.includes(i)) {
        this.squares[pos].classList.add('invader');
      }
    });
  }

  remove() {
    this.alienInvaders.forEach((pos) => {
      this.squares[pos].classList.remove('invader');
    });
  }
  
  move() {
    const leftEdge = this.alienInvaders[0] % this.width === 0;
    const rightEdge = this.alienInvaders[this.alienInvaders.length - 1] % this.width === this.width - 1;

    this.remove();

    if (rightEdge && this.goingRight) {
      this.alienInvaders = this.alienInvaders.map((pos) => pos + this.width + 1);
      this.direction = -1;
      this.goingRight = false;
    }

    if (leftEdge && !this.goingRight) {
      this.alienInvaders = this.alienInvaders.map((pos) => pos + this.width - 1);
      this.direction = 1;
      this.goingRight = true;
    }

    this.alienInvaders = this.alienInvaders.map((pos) => pos + this.direction);

    this.draw();
    this.shoot();
  }

  // funcion para que disparen los aliens
  shoot() {
    const randomAlienIndex = Math.floor(Math.random() * this.alienInvaders.length);
    const currentAlienPos = this.alienInvaders[randomAlienIndex];

    if (this.aliensRemoved.includes(randomAlienIndex)) return;

    let currentLaserIndex = currentAlienPos + this.width; 

    const laserId = setInterval(() => {
      if (currentLaserIndex >= this.squares.length) {
        clearInterval(laserId);
        return;
      }

      this.squares[currentLaserIndex].classList.remove('laser2');
      currentLaserIndex += this.width; 

      if (this.squares[currentLaserIndex].classList.contains('shooter')) {
        this.squares[currentLaserIndex].classList.remove('laser2');
        this.squares[currentLaserIndex].classList.remove('shooter');
        this.squares[currentLaserIndex].classList.add('boom');

        setTimeout(() => this.squares[currentLaserIndex].classList.remove('boom'), 300);
        clearInterval(laserId);
        alert("Game Over");
        location.reload();
      }

      this.squares[currentLaserIndex].classList.add('laser2');
    }, this.laserSpeed);
  }
}
