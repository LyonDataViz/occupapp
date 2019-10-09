<script>
  import Image from 'components/Image.svelte'
  // import ResponsiveImage from 'components/ResponsiveImage.svelte'
  import { imageName } from 'modules/stores.js'

  // Properties
  let outerWidth = 0
  export { outerWidth as width }

  let width = 0
  let ratio = 1

  // Validation
  $: widthOK = width > 0

  // Dimensions
  const toLowerStep = dim => {
    const step = 50
    // some margin to avoid pixel-perfect problems
    const margin = 4
    return Math.floor((dim - margin) / step) * step
  }
  const setRatioFrom = event => {
    const img = event.target
    ratio = img.height / img.width
  }
  $: width = toLowerStep(outerWidth)
  $: height = ratio * width

  $: showChart = widthOK
</script>

<style type="text/scss">
  .inner {
    position: relative;
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<div
  class="height-full width-full d-flex flex-items-center flex-justify-center">
  {#if showChart}
    <div class="inner">
      <!-- <ResponsiveImage name={imageName} {width} on:load={setRatioFrom} /> -->
      <Image name={$imageName} {width} on:load={setRatioFrom} />
      <svg {height} {width} viewBox="0 0 {width} {height}">
        <rect width="100%" height="100%" style="fill: red;" opacity="0.2" />
      </svg>
    </div>
  {/if}
</div>
