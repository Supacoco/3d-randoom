import { Xorshift } from '@supacoc0/randoom'
import P5 from 'p5'

const generator = new Xorshift(1337)
// const generator = new Xorshift(new Date())

const CANVAS_WIDTH = 800
const BOX_WIDTH = CANVAS_WIDTH / 2
const ITERATIONS = 1000

const root = document.createElement('div')
root.id = 'root'

document.querySelector('body')
  .appendChild(root)

// const dots = Array(ITERATIONS)
//   .fill()
//   .map(() => ({
//     x: generator.generate(),
//     y: generator.generate(),
//     z: generator.generate()
//   }))
const dots = []
const test = () => {
  let x, y, r
  const numbers = []

  for (let counter = ITERATIONS * 3; counter > 0; counter--) {
    do {
      x = 2 * generator.generate() - 1
      y = 2 * generator.generate() - 1
      r = x * x + y * y
    } while (r >= 1 || r === 0)

    numbers.push(
      x * Math.sqrt(-2 * Math.log(r) / r)
    )
  }

  return numbers
}
const tmpDots = test()
while (tmpDots.length) {
  let meh = tmpDots.splice(0, 3)
  dots.push({
    x: meh[0],
    y: meh[1],
    // z: 0
    z: meh[2]
  })
  // dots.push({
  //   x: Math.atan(meh[0]),
  //   y: Math.atan(meh[1]),
  //   z: Math.atan(meh[2])
  // })
}

console.log(dots)

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
    p5.rotateX(p5.mouseY / 100)
    // p5.stroke('grey')
    // p5.noFill()
    // p5.sphere(BOX_WIDTH, 8, 8)
    p5.stroke('white')
    p5.line(-BOX_WIDTH / 1.25, 0, 0, BOX_WIDTH / 1.25, 0, 0)
    p5.line(0, -BOX_WIDTH / 1.25, 0, 0, BOX_WIDTH / 1.25, 0)
    p5.line(0, 0, BOX_WIDTH / 1.25, 0, 0, -BOX_WIDTH / 1.25)
    p5.fill(128)
    p5.noStroke()
    // p5.sphere(10)
    dots.forEach(dot => {
      color = p5.map(currentIndex, 0, ITERATIONS, 0, 255)
      p5.fill(color, 255, 255)
      p5.push()
      // p5.translate(-BOX_WIDTH / 2, BOX_WIDTH / 2, BOX_WIDTH / 2)
      p5.translate(dot.x * BOX_WIDTH / 4, dot.y * BOX_WIDTH / 4, dot.z * BOX_WIDTH / 4)
      p5.sphere(1)
      p5.pop()
      currentIndex++
    })
  }
}, root)
