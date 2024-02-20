class WindowEvents {
  private resizeEvents: Map<string, () => void> = new Map();
  constructor() {
    window.addEventListener('resize', () => {
      this.resizeEvents.forEach(revent => {
        revent();
      })
    })
  }
  addResizeEvent(name: string, callbackFn: () => void) {
    this.resizeEvents.set(name, callbackFn);
  }
}

export const SWindowEvents = new WindowEvents()