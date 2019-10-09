<script>
  import octicons from '@primer/octicons'

  export let symbol = ''
  export let ariaLabel = ''
  export let width = undefined
  export let height = undefined
  export let viewbox = undefined
  let className = ''
  export { className as class }

  $: ok = symbol && symbol in octicons
  $: i = ok ? octicons[symbol] : undefined
  $: o = ok ? i.options : undefined
  $: if (width !== undefined && +width > 0) {
    o.width = +width
  }
  $: if (height !== undefined && +height > 0) {
    o.width = +height
  }
  $: if (viewbox !== undefined) {
    o.viewbox = viewbox
  }
</script>

<style>
  .octicon {
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
  }
  .h1 .octicon,
  .h2 .octicon,
  .h3 .octicon,
  .h4 .octicon,
  .h5 .octicon,
  .h6 .octicon,
  h1 .octicon,
  h2 .octicon,
  h3 .octicon,
  h4 .octicon,
  h5 .octicon,
  h6 .octicon {
    vertical-align: bottom;
  }
</style>

<!-- TODO: manage more user-defined properties?
     See https://github.com/primer/octicons/tree/master/lib/octicons_node
     and https://github.com/igneosaur/vue-octicons/blob/master/src/components/Octicon.vue -->
{#if ok}
  <svg
    width={o.width}
    height={o.height}
    viewBox={o.viewbox}
    class="{o.class}
    {className}"
    aria-hidden={o['aria-hidden']}
    aria-label={ariaLabel}>
    {@html i.path}
  </svg>
{/if}
