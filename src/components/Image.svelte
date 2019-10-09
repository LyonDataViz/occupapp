<script>
  const defaultName = 'petanque'
  const defaultAlt = 'NYC - Brooklyn - Boerum Hill: Grand Petanque Tournament'
  const defaultWidth = 1024

  export let name = defaultName
  export let alt = ''
  export let width = 0
  let className = ''
  export { className as class }

  $: computedAlt = alt !== '' ? alt : name === defaultName ? defaultAlt : ''
  $: src = `https://github.com/severo/pictures/raw/master/images,w_${defaultWidth}/${name}.jpg`
</script>

<style type="text/scss">
  img {
    object-fit: contain;
  }
</style>

<img on:load alt={computedAlt} {src} {width} class={className} />
