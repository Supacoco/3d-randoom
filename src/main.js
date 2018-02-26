import { Xorshift } from '@supacoc0/randoom'

const generator = new Xorshift(1337)

const WIDTH = 600

const root = document.createElement('div')
root.id = 'root'

const canvas = document.createElement('canvas')
canvas.id = 'canvas'
canvas.width = WIDTH
canvas.height = WIDTH

document.querySelector('body')
  .appendChild(root)
  .appendChild(canvas)

const context = canvas.getContext('2d')
context.fillStyle = '#000'
context.fillRect(0, 0, WIDTH, WIDTH)

context.fillStyle = '#3F3'

Array(10000)
  .fill()
  .map(() => ({
    x: generator.generate(),
    y: generator.generate()
  }))
  .forEach(dot => {
    context.beginPath()
    context.arc(
      dot.x * WIDTH,
      dot.y * WIDTH,
      1,
      0,
      Math.PI * 2
    )
    context.fill()
  })
