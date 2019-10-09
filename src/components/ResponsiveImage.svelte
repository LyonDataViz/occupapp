<script>
  const defaultName = 'petanque'
  const defaultAlt = 'NYC - Brooklyn - Boerum Hill: Grand Petanque Tournament'
  const availableWidths = [320, 640, 768, 1024, 1366, 1600, 1920]
  const defaultWidths = availableWidths

  export let name = defaultName
  export let alt = ''
  export let widths = ''

  let computedWidths = []

  const updateWidths = widths => {
    const computedWidths = widths
      .split(',')
      .map(width => +width)
      .filter(
        width => width > 0 && width < 4000 && availableWidths.includes(width)
      )
      .sort((a, b) => a > b)
    return computedWidths.length === 0 ? defaultWidths : computedWidths
  }
  const getFilename = (name, width) =>
    `https://github.com/severo/pictures/raw/master/images,w_${width}/${name}.jpg`

  $: computedAlt = alt !== '' ? alt : name === defaultName ? defaultAlt : ''
  $: computedWidths = updateWidths(widths)
  $: maxWidth = computedWidths.reduce((acc, cur) => (cur > acc ? cur : acc), 0)
  $: srcset = computedWidths.reduce(
    (acc, cur) => `${acc}, ${getFilename(name, cur)} ${cur}w`,
    ''
  )

  /*
   * See https://github.com/severo/pictures
   *
   * <ResponsiveImage name="petanque" />
   * <ResponsiveImage name="walruses" widths="320,500,1920" />
   * <ResponsiveImage name="petanque" alt="test" />
   * <ResponsiveImage name="pizza" widths="320, 640, 768, 1024, 1366, 1600, 1920" />
   */
</script>

<picture>
  <img
    sizes="(max-width: {maxWidth}px) 100vw, {maxWidth}px"
    {srcset}
    src={getFilename(name, maxWidth)}
    alt={computedAlt} />
</picture>
