import {Fruit} from '../fruit'
import {game, GameState, viewHeight, viewWidth} from '../game'
import {images} from '../resources'
import {drawOutlinedText} from '../util/graphics'
import {randomItem} from '../util/random'
import {GameOver} from './game-over'

export class Gameplay implements GameState {
  private fruitTargetImage: HTMLImageElement
  private fruits = [] as Fruit[]
  private level = 0
  private score = 0
  private targetBlinkTime = 0
  private frozen = false

  enter() {
    this.targetBlinkTime = 0.8
    this.startLevel(this.level + 1)
  }

  leave() {}

  update(dt: number) {
    if (dt > 0.5) return
    this.fruits.forEach(fruit => fruit.updateBlink(dt))
    if (this.frozen) return
    this.fruits.forEach(fruit => fruit.update(dt))
    this.targetBlinkTime -= dt
  }

  pointerdown(x: number, y: number) {
    let tapped = this.fruits.filter(fruit => fruit.containsPoint(x, y))

    if (tapped.some(fruit => fruit.image === this.fruitTargetImage)) {
      this.score += 1
      this.startLevel(this.level + 1)
    } else if (tapped.length > 0) {
      this.frozen = true
      tapped[0].blinking = true
      window.setTimeout(() => game.switchState(new GameOver(this.score)), 1500)
    }
  }

  startLevel(level: number) {
    this.fruits = []
    this.level = level
    for (let i = 0; i < level; i++) {
      this.fruits.push(new Fruit(0.8 + 0.8 * (1 / level), 100 + level * 20))
    }
    this.fruitTargetImage = randomItem(this.fruits).image
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawBackground(ctx)
    this.fruits.forEach(fruit => fruit.draw(ctx))
    this.drawFruitTarget(ctx)
    this.drawScore(ctx)
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(images['sky'], 0, 0, viewWidth, viewHeight)
  }

  drawFruitTarget(ctx: CanvasRenderingContext2D) {
    if (this.targetBlinkTime > 0 && Math.sin(this.targetBlinkTime * 20) < 0) return

    ctx.font = '50px Roboto'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    let prefixText = 'Touch'
    let textWidth = ctx.measureText(prefixText).width
    let textPosition = viewWidth / 2 - textWidth / 2 - this.fruitTargetImage.width / 2

    drawOutlinedText(ctx, prefixText, textPosition, 50)

    ctx.save()
    ctx.translate(textPosition + textWidth, 50 - this.fruitTargetImage.height / 2 + 20)
    ctx.scale(0.7, 0.7)
    ctx.drawImage(this.fruitTargetImage, 0, 0)
    ctx.restore()
  }

  drawScore(ctx: CanvasRenderingContext2D) {
    ctx.font = '50px Roboto'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    drawOutlinedText(ctx, `Score: ${this.score}`, viewWidth / 2, viewHeight * 0.9)
  }
}
