import { Xorshift } from '@supacoc0/randoom'
import P5 from 'p5'

const generator = new Xorshift(1337)
// const generator = new Xorshift(new Date())

const WIDTH = 600
const ITERATIONS = 1000

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

new P5((p5) => {
  p5.setup = () => {
    p5.createCanvas(500, 500, p5.WEBGL)
    p5.camera(250, 250, (500 / 2) / p5.tan(p5.PI / 6), 250, 250, 0, 0, 1, 0)
    p5.colorMode(p5.HSB)
  }

  p5.draw = () => {
    currentIndex = 0
    p5.background(0)
    p5.translate(500 / 2, 500 / 2, -100)
    p5.rotateY(p5.mouseX / 100)
    p5.stroke(255)
    p5.noFill()
    p5.box(200)
    p5.noStroke()
    dots.forEach(dot => {
      const color = p5.map(currentIndex, 0, ITERATIONS, 0, 255)
      p5.fill(color, 255, 255)
      p5.push()
      p5.translate(-100, 100, 100)
      p5.sphere(10)
      p5.translate(dot.x * 200, dot.y * -200, dot.z * -200)
      p5.sphere(1)
      p5.pop()
      currentIndex++
    })
  }
}, root)
