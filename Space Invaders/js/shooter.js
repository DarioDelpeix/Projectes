export class Shooter {
  constructor(squares, width = 15, currentShooterIndex = 202) {
    this.squares = squares;
    this.width = width;
    this.currentShooterIndex = currentShooterIndex;
  }

  initializeShooter() {
    this.squares[this.currentShooterIndex].classList.add('shooter');
  }

  // mover el jugador
  moveShooter(e) {
    this.squares[this.currentShooterIndex].classList.remove('shooter');

    switch(e.code) {
      case 'KeyA':
        if (this.currentShooterIndex % this.width !== 0) this.currentShooterIndex -= 1;
        break;
      case 'KeyD':
        if (this.currentShooterIndex % this.width < this.width - 1) this.currentShooterIndex += 1;
        break;
    }

    this.squares[this.currentShooterIndex].classList.add('shooter');
  }

  // disparar un laser al presionar W
  shoot(e, shootLaser) {
    if (e.code !== 'KeyW') return; 
    shootLaser(this.currentShooterIndex, -this.width, 'laser');
  }

  shootLaser(startPos, step, className, alienInvaders, aliensRemoved) {
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

        const alienIndex = alienInvaders.indexOf(currentPos);
        if (alienIndex >= 0) {
          aliensRemoved.push(alienIndex);
        }

        return;
      }

      this.squares[currentPos].classList.add(className);
    }, 100);
  }
}