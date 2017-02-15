class Target {
  image = util.randomItem(FOOD_IMAGES)
  sprite = PIXI.Sprite.fromImage(this.image)

  constructor() {
    this.sprite.position.set(VIEW_WIDTH / 2, VIEW_HEIGHT / 2)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.scale.set(1.2)
  }
}

class Game {
  app = new PIXI.Application(VIEW_WIDTH, VIEW_HEIGHT)
  levelStage = new PIXI.Container()
  targets = [] as PIXI.Sprite[]
  level = 0

  start() {
    document.body.appendChild(this.app.view)

    let background = PIXI.Sprite.fromImage('resources/sky.png')
    background.width = VIEW_WIDTH
    background.height = VIEW_HEIGHT

    this.app.stage.addChild(background)
    this.app.stage.addChild(this.levelStage)

    this.startNextLevel()
  }

  startNextLevel() {
    this.level += 1

    let target = new Target()
    let targetDisplay = this.createTargetDisplay(target.image)

    let level = this.levelStage
    level.removeChildren()
    level.addChild(targetDisplay)
    level.addChild(target.sprite)
  }

  createTargetDisplay(targetImage: string) {
    let targetDisplay = new PIXI.Container()
    let targetText = targetDisplay.addChild(new PIXI.Text('Touch:', {
      fill: 'white', stroke: 'black', strokeThickness: 3, fontSize: 40,
    }))
    let targetSprite = targetDisplay.addChild(PIXI.Sprite.fromImage(targetImage))

    targetText.anchor.set(0, 0.5)

    targetSprite.anchor.set(0, 0.5)
    targetSprite.position.set(targetText.width, 0)
    targetSprite.scale.set(0.75)

    targetDisplay.pivot.set(targetDisplay.width / 2, targetDisplay.height / 2)
    targetDisplay.position.set(VIEW_WIDTH / 2, 100)
    return targetDisplay
  }
}
