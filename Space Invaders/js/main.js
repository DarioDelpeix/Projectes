import { Shooter } from './shooter.js';
import { Alien } from './aliens.js';

class Game {
  constructor() {
    this.grid = document.querySelector('.grid');
    this.resultsDisplay = document.querySelector('.results');
    this.squares = [];
    this.width = 15;
    this.shooter = null;
    this.alien = null;
    this.GO = false;
    this.intervalId = null;

    this.init();
  }

  // funcio per crear partida 
  init() {
    this.createGrid();
    this.shooter = new Shooter(this.squares, this.width, 202); 
    this.shooter.initializeShooter(); 
    this.alien = new Alien(this.squares, this.width); 
    this.alien.draw();

    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    this.intervalId = setInterval(() => this.update(), 600); // actualiza el movimiento de los aliens cada 600ms
  }

  // funcio per crear la taula
  createGrid() {
    for (let i = 0; i < 225; i++) {
      const square = document.createElement('div');
      this.grid.appendChild(square);
      this.squares.push(square); 
    }
  }

  handleKeydown(e) {
    this.shooter.moveShooter(e);
    this.shooter.shoot(e, (startPos, step, className) => this.shootLaser(startPos, step, className));
  }

  shootLaser(startPos, step, className) {
    let currentPos = startPos;

    const laserId = setInterval(() => {
      this.squares[currentPos].classList.remove(className);
      currentPos += step;

      if (currentPos < 0 || currentPos >= this.squares.length) {
        clearInterval(laserId); 
        return;
      }

      if (this.squares[currentPos].classList.contains('invader')) {
        this.squares[currentPos].classList.remove(className, 'invader');
        this.squares[currentPos].classList.add('boom');

        setTimeout(() => this.squares[currentPos].classList.remove('boom'), 300);
        clearInterval(laserId);

        const alienIndex = this.alien.alienInvaders.indexOf(currentPos);
        if (alienIndex >= 0) this.alien.aliensRemoved.push(alienIndex); 

        this.resultsDisplay.textContent = parseInt(this.resultsDisplay.textContent) + 1; 
        return;
      }

      this.squares[currentPos].classList.add(className);
    }, 100);
  }

  update() {
    if (this.GO) {
      alert("Game Over");
      location.reload();
    } else {
      this.alien.move(); 
    }
  }
}

new Game(); 
