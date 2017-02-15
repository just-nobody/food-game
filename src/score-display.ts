class ScoreDisplay {
  sprite = new PIXI.Text('', {
    fill: 'white',
    fontSize: 40,
    stroke: 'black',
    strokeThickness: 3,
  })

  constructor() {
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.position.set(VIEW_WIDTH / 2, VIEW_HEIGHT * 0.9)
    this.update(0)
  }

  update(score: any) {
    this.sprite.text = 'Score: ' + score.toString()
  }
}
