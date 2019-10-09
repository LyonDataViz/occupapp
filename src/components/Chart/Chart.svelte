<script>
  import ResponsiveImage from 'components/Chart/ResponsiveImage.svelte'

  // Properties
  let outerWidth = 0
  export { outerWidth as width }

  // Validation
  $: widthOK = width > 0

  // Dimensions
  const toLowerStep = dim => {
    const step = 50
    // some margin to avoid pixel-perfect problems
    const margin = 4
    return Math.floor((dim - margin) / step) * step
  }
  $: width = toLowerStep(outerWidth)
  $: showChart = widthOK

  let image = 'petanque'
</script>

<style global type="text/scss">

</style>

<div
  class="height-full width-full d-flex flex-items-center flex-justify-center">
  {#if showChart}
    <ResponsiveImage {width} name={image} />
  {/if}
</div>
