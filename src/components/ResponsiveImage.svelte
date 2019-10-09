<script>
  const defaultName = 'petanque'
  const defaultAlt = 'NYC - Brooklyn - Boerum Hill: Grand Petanque Tournament'
  const availableWidths = [320, 640, 768, 1024, 1366, 1600, 1920]
  const defaultWidths = availableWidths

  export let name = defaultName
  export let alt = ''
  export let widths = ''
  export let width = 0
  let className = ''
  export { className as class }

  let computedWidths = []

  const updateWidths = widths => {
    const computedWidths = widths
      .split(',')
      .map(w => +w)
      .filter(w => w > 0 && w < 4000 && availableWidths.includes(w))
      .sort((a, b) => a > b)
    return computedWidths.length === 0 ? defaultWidths : computedWidths
  }
  const getFilename = (name, w) =>
    `https://github.com/severo/pictures/raw/master/images,w_${w}/${name}.jpg`

  $: computedAlt = alt !== '' ? alt : name === defaultName ? defaultAlt : ''
  $: computedWidths = updateWidths(widths)
  $: maxImageWidth = computedWidths.reduce(
    (acc, cur) => (cur > acc ? cur : acc),
    0
  )
  $: srcset = computedWidths.map(w => `${getFilename(name, w)} ${w}w`).join(',')
  $: src = getFilename(name, maxImageWidth)

  /*
   * See https://github.com/severo/pictures
   *
   * <ResponsiveImage name="petanque" />
   * <ResponsiveImage name="walruses" widths="320,500,1920" />
   * <ResponsiveImage name="petanque" alt="test" />
   * <ResponsiveImage name="pizza" widths="320, 640, 768, 1024, 1366, 1600, 1920" />
   */
</script>

<style type="text/scss">
  img {
    object-fit: contain;
  }
</style>

<picture>
  <img
    on:load
    alt={computedAlt}
    {src}
    sizes="(max-width: {width}px) 100vw, {width}px"
    {srcset}
    class={className} />
</picture>
