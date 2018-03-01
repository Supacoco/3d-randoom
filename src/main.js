import { Xorshift } from '@supacoc0/randoom'
import P5 from 'p5'

const generator = new Xorshift(1337)
// const generator = new Xorshift(new Date())

const CANVAS_WIDTH = 800
const BOX_WIDTH = CANVAS_WIDTH / 2
const ITERATIONS = 5000

const root = document.createElement('div')
root.id = 'root'

document.querySelector('body')
  .appendChild(root)

const dots = Array(ITERATIONS)
  .fill()
  .map(() => ({
    x: generator.generate(),
    y: generator.generate(),
    z: generator.generate()
  }))

let currentIndex = 0
let color

new P5((p5) => {
  p5.setup = () => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_WIDTH, p5.WEBGL)
    p5.camera(BOX_WIDTH / 2, BOX_WIDTH / 2, (BOX_WIDTH / 2) / p5.tan(p5.PI / 6), BOX_WIDTH / 2, BOX_WIDTH / 2, 0, 0, 1, 0)
    p5.colorMode(p5.HSB)
  }

  p5.draw = () => {
    currentIndex = 0
    p5.background(0)
    p5.translate(BOX_WIDTH / 2, BOX_WIDTH / 2, -BOX_WIDTH / 2)
    p5.rotateY(p5.mouseX / 100)
    p5.stroke(255)
    p5.noFill()
    p5.box(BOX_WIDTH)
    p5.noStroke()
    dots.forEach(dot => {
      color = p5.map(currentIndex, 0, ITERATIONS, 0, 255)
      p5.fill(color, 255, 255)
      p5.push()
      p5.translate(-BOX_WIDTH / 2, BOX_WIDTH / 2, BOX_WIDTH / 2)
      p5.sphere(10)
      p5.translate(dot.x * BOX_WIDTH, dot.y * -BOX_WIDTH, dot.z * -BOX_WIDTH)
      p5.sphere(1)
      p5.pop()
      currentIndex++
    })
  }
}, root)
