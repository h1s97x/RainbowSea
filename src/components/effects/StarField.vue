<template>
  <canvas ref="canvasRef" class="star-field"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationId = null
let stars = []

class Star {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.z = Math.random() * this.canvas.width
    this.speed = Math.random() * 2 + 1
  }

  update() {
    this.z -= this.speed
    if (this.z <= 0) {
      this.reset()
    }
  }

  draw(ctx) {
    const x = (this.x - this.canvas.width / 2) * (this.canvas.width / this.z)
    const y = (this.y - this.canvas.height / 2) * (this.canvas.width / this.z)
    const size = (1 - this.z / this.canvas.width) * 3

    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    ctx.beginPath()
    ctx.arc(centerX + x, centerY + y, size, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
  }
}

const initStars = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  stars = []
  for (let i = 0; i < 200; i++) {
    stars.push(new Star(canvas))
  }
}

const animate = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  stars.forEach(star => {
    star.update()
    star.draw(ctx)
  })

  animationId = requestAnimationFrame(animate)
}

const handleResize = () => {
  initStars()
}

onMounted(() => {
  initStars()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="scss">
.star-field {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #000;
}
</style>
