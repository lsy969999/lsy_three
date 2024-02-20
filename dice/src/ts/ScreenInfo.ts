class ScreenInfo {
  private _width: number;
  get width() { return this._width; }
  set width(value) { this._width = value; }

  private _height: number;
  get height() { return this._height; }
  set height(value) { this._height = value; }

  private _domEl: HTMLCanvasElement;
  get domEl() { return this._domEl; }

  private _dpr
  get dpr() { return this._dpr }

  constructor() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    const dom = document.querySelector('#app canvas') as HTMLCanvasElement;
    this._domEl = dom;
    this._dpr = Math.min(2, window.devicePixelRatio)
  }

  resize() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._dpr = Math.min(2, window.devicePixelRatio)
  }
}

export const SScreenInfo = new ScreenInfo();