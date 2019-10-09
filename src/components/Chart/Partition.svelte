<script>
  export let height = 50
  export let width = 50
  import { onMount, afterUpdate } from 'svelte'

  let canvas = undefined

  function updateCanvas(context, width, height) {
    context.clearRect(0, 0, width, height)
    context.save()
    context.fillStyle = `rgba(255, 0, 0, ${width / 600})`
    context.fillRect(0, 0, width, height)
    // context.drawImage(image, 0, 0, width, height)
    // drawVoronoi({ transform, context })
    context.restore()
  }

  afterUpdate(() => {
    if (canvas) {
      const context = canvas.getContext('2d')
      updateCanvas(context, width, height)
    }
  })
  onMount(() => {
    if (canvas) {
      const context = canvas.getContext('2d')
      updateCanvas(context, width, height)
    }
  })
</script>

<style type="text/scss">
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<canvas bind:this={canvas} {width} {height} />
