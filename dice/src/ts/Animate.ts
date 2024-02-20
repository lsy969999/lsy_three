class Animate {
  private _animates: Map<string, () => void> = new Map();
  constructor() {
    window.requestAnimationFrame(() => {
      this.animate()
    })
  }

  private animate() {
    this._animates.forEach((value) => {
      value()
    })

    window.requestAnimationFrame(() => {
      this.animate()
    })
  }

  addAnimate(name: string, callbackFn: () => void) {
    this._animates.set(name, callbackFn);
  }

  removeAnimate(name: string,) {
    this._animates.delete(name)
  }
}

export const SAnimate = new Animate();