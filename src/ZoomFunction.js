export const ZOOM_SALT = 0.2;

export class ZoomFunction {

	constructor(player, options) {
		this.state = {
			...options.state,
			saltMoveX: 70,
			saltMoveY: 70
		};
		this.player = player.el();
		this.plugin = options.plugin;
		player.on('playing', () => {
			this._updateSalt();
		});
	}

	_updateSalt() {
		this.state.saltMoveX = (this.player.offsetWidth * ZOOM_SALT) / 2;
		this.state.saltMoveY = (this.player.offsetHeight * ZOOM_SALT) / 2;
	}

	_zoom() {
		this.plugin.zoom(this.state.zoom);
		this.plugin.listeners.change(this.state);
	}

	zoomIn() {
		if (this.state.zoom >= 9.8) return;
		this.state.moveCount++;
		this.state.zoom += ZOOM_SALT;
		this._zoom();
	}

	zoomOut() {
		if (this.state.zoom <= 1) return;
		this.state.moveCount--;
		this.state.zoom -= ZOOM_SALT;
		this.plugin.move(0, 0);
		this._zoom();
	}

	_move() {
		this.plugin.move(this.state.moveX, this.state.moveY);
		this.plugin.listeners.change(this.state);
	}

	moveUp() {
		const next = this.state.moveY + this.state.saltMoveY;
		const available = this.state.moveCount * this.state.saltMoveY;
		if (available < next) return;
		this._updateSalt();
		this.state.moveY += this.state.saltMoveY;
		this._move();
	}

	moveDown() {
		const next = this.state.moveY - this.state.saltMoveY;
		const available = this.state.moveCount * this.state.saltMoveY;
		if (-available > next) return;
		this._updateSalt();
		this.state.moveY -= this.state.saltMoveY;
		this._move();
	}

	reset() {
		this.state.zoom = 1;
		this.state.moveX = 0;
		this.state.moveY = 0;
		this.state.rotate = 0;
		this.state.moveCount = 0;
		this.plugin.zoom(1);
		this.plugin.rotate(0);
		this.plugin.move(0, 0);
		this.plugin.listeners.change(this.state);
	}

	moveLeft() {
		const next = this.state.moveX + this.state.saltMoveX;
		const available = this.state.moveCount * this.state.saltMoveX;
		if (available < next) return;
		this._updateSalt();
		this.state.moveX += this.state.saltMoveX;
		this._move();
	}

	moveRight() {
		const next = this.state.moveX - this.state.saltMoveX;
		const available = this.state.moveCount * this.state.saltMoveX;
		if (-available > next) return;
		this._updateSalt();
		this.state.moveX -= this.state.saltMoveX;
		this._move();
	}

	_rotate() {
		this.plugin.rotate(this.state.rotate);
		this.plugin.listeners.change(this.state);
	}

	rotateLeft() {
		this.state.rotate -= 180;
		this._rotate();
	}

	rotateRight() {
		this.state.rotate += 180;
		this._rotate();
	}

}
