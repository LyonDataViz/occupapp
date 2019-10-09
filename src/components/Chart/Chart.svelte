<script>
  import ResponsiveImage from 'components/ResponsiveImage.svelte'

  // Properties
  let outerHeight = 0
  export { outerHeight as height }
  let outerWidth = 0
  export { outerWidth as width }

  // Validation
  $: heightOK = height > 0
  $: widthOK = width > 0

  // Dimensions
  const toLowerStep = dim => {
    const step = 50
    // some margin to avoid pixel-perfect problems
    const margin = 4
    return Math.floor((dim - margin) / step) * step
  }
  $: height = toLowerStep(outerHeight)
  $: width = toLowerStep(outerWidth)
  $: showChart = height > 0 && width > 0

  let image = 'petanque'
</script>

<style global type="text/scss">

</style>

<div
  class="height-full width-full d-flex flex-items-center flex-justify-center">
  {#if showChart}
    <ResponsiveImage {height} {width} name={image} />
  {/if}
</div>
