<script>
  import { points } from 'modules/stores.js'

  export let width = 0
  export let height = 0

  const r = 10
  const createNewPoint = (x, y) => {
    return {
      x: x || Math.random() * (width - 2 * r) + r,
      y: y || Math.random() * (height - 2 * r) + r,
      color: 'black',
    }
  }
  $: if (width > 0 && height > 0) {
    // Temporary: generate an array of points
    const petanque = Array.from({ length: 6 }).map(_ => createNewPoint())
    petanque.push({ ...createNewPoint(), color: 'red' })
    $points = petanque
  }
</script>

<style type="text/scss">
  circle {
    &.external {
      fill-opacity: 0.1;
      stroke-width: 2px;
    }
    &.internal {
      r: 1;
      stroke: none;
    }
  }
</style>

<svelte:options namespace="svg" />
<g>
  {#each $points as p, i}
    <g>
      <circle
        class="internal"
        cx={p.x}
        cy={p.y}
        r="1"
        style="fill: {p.color}" />
      <circle
        class="external"
        cx={p.x}
        cy={p.y}
        {r}
        style="stroke: {p.color}" />
    </g>
  {/each}
</g>
