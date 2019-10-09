<script>
  import ButtonSummary from 'components/primer/ButtonSummary.svelte'
  import SelectMenuTitle from 'components/primer/SelectMenuTitle.svelte'
  import Octicon from 'components/primer/Octicon.svelte'
  import ResponsiveImage from 'components/ResponsiveImage.svelte'

  import { imageName, init } from 'modules/stores.js'
  import { preferences } from 'modules/preferences.js'

  const images = [
    'petanque',
    'boats',
    'honeycomb',
    'spider',
    'wolves',
    'bazzania',
  ]
  let open = false
  let container = undefined
  $: num = images.length
  $: empty = num === 0

  const close = () => {
    open = false
  }
  const show = () => {
    open = true
  }
  const select = d => {
    $imageName = d
    close()
  }
  const focusSummary = () => {
    // we directly target the summary element in <ButtonSummmary>. Not ideal
    // since it's encapsulated
    container.querySelector(`summary`).focus()
  }
  const focusItem = i => {
    // nth-child uses 1-based numeration
    container
      .querySelector(`.SelectMenu-list .SelectMenu-item:nth-child(${i + 1})`)
      .focus()
  }

  const summaryArrowDown = event => {
    show()
  }
  const detailsToggled = event => {
    if (open && !empty) {
      focusItem(0)
    }
  }
  const itemKeydown = i => event => {
    if (['ArrowDown', 'ArrowUp', 'Escape'].includes(event.key)) {
      event.stopPropagation()
      event.preventDefault()
    }
    if (event.key === 'ArrowDown' && i < num - 1) {
      focusItem(i + 1)
    } else if (event.key === 'ArrowUp' && i > 0) {
      focusItem(i - 1)
    } else if (event.key === 'Escape') {
      close()
      focusSummary()
    }
  }
</script>

<style>
  /* .datasets {
    margin-bottom: 1em;
  } */
</style>

<div class="images" bind:this={container}>

  <details
    class="details-reset details-overlay select-menu"
    bind:open
    on:toggle={detailsToggled}>
    <ButtonSummary
      expanded={open}
      prefix="Image:"
      title={$imageName}
      on:arrowdown={summaryArrowDown} />
    <div class="SelectMenu">
      <div class="SelectMenu-modal">
        <SelectMenuTitle on:click={close}>Select an image</SelectMenuTitle>
        <div class="SelectMenu-list">
          {#each images as d, i}
            <button
              class="SelectMenu-item"
              role="menuitem"
              aria-checked={d === $imageName}
              on:click={() => select(d)}
              on:keydown={itemKeydown(i)}>
              <Octicon symbol="check" class="SelectMenu-icon" />
              <ResponsiveImage width="40" name={d} class="mr-2" />
              {d}
            </button>
          {/each}
        </div>
        <footer class="SelectMenu-footer">
          Showing {images.length} of {images.length}
        </footer>
      </div>
    </div>
  </details>
</div>
