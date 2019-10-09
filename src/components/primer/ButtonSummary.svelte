<script>
  import { createEventDispatcher } from 'svelte'

  let className = ''
  export { className as class }
  export let expanded = false
  export let truncate = true
  export let prefix = ''
  export let title = 'Summary'

  const dispatch = createEventDispatcher()
  const summaryKeydown = event => {
    if (event.key === 'ArrowDown') {
      dispatch('arrowdown')
      event.preventDefault()
      event.stopPropagation()
    }
  }
</script>

<style>

</style>

<summary
  class="btn-link muted-link {className}"
  class:css-truncate={truncate}
  type="button"
  aria-haspopup={expanded}
  aria-expanded={expanded}
  on:keydown={summaryKeydown}>
  {prefix}
  <strong class:css-truncate-target={truncate} {title}>
    <slot>{title}</slot>
  </strong>
  <div class="dropdown-caret" />
</summary>
