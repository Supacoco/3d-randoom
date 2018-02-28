import { Xorshift } from '@supacoc0/randoom'
import P5 from 'p5'

const generator = new Xorshift(1337)
// const generator = new Xorshift(new Date())

const WIDTH = 600

const root = document.createElement('div')
root.id = 'root'

document.querySelector('body')
  .appendChild(root)

const dots = Array(10000)
  .fill()
  .map(() => ({
    x: generator.generate(),
    y: generator.generate(),
    z: generator.generate()
  }))
let currentIndex = 0

new P5((p5) => {
  p5.setup = () => {
    p5.createCanvas(WIDTH, WIDTH)
    p5.fill(51)
    p5.rect(0, 0, WIDTH, WIDTH)
  }

  p5.draw = () => {
    const dot = dots[currentIndex]
    p5.noStroke()
    p5.fill(51, 255, 51)
    p5.rect(dot.x * WIDTH, dot.y * WIDTH, 1, 1)

    currentIndex += 1
    if (currentIndex >= dots.length) {
      p5.noLoop()
      console.log('finished')
    }
  }
}, root)
