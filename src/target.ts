class Target {
  sprite: PIXI.Sprite

  constructor(public image: string) {
    this.sprite = PIXI.Sprite.fromImage(image)
  }
}