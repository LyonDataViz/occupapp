<script>
  import Image from 'components/Image.svelte'
  import Points from 'components/Chart/Points.svelte'
  import Partition from 'components/Chart/Partition.svelte'
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
    hideOverlay = false
  }
  $: width = toLowerStep(outerWidth)
  $: height = ratio * width

  $: showChart = widthOK

  // Hide the overlay when the image is loading, and the dimensions are unknown
  let hideOverlay = true
  $: if ($imageName) {
    hideOverlay = true
  }
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
      {#if !hideOverlay}
        <Partition {height} {width} />
        <svg {height} {width} viewBox="0 0 {width} {height}">
          <Points {height} {width} />
        </svg>
      {/if}
    </div>
  {/if}
</div>
