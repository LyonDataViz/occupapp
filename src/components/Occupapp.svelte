<script>
  import Chart from './Chart/Chart.svelte'
  import Sidebar from './Sidebar/Sidebar.svelte'
  import Credits from './Credits.svelte'

  const padding = 20
  let width = 0
</script>

<style type="text/scss">
  /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout/ */
  .header {
    grid-area: header;
  }
  .content {
    grid-area: content;
  }
  .sidebar {
    grid-area: sidebar;
  }
  .footer {
    grid-area: footer;
  }

  .wrapper {
    display: grid;
    grid-gap: 20px;
    grid-template-areas:
      'header'
      'content'
      'sidebar'
      'footer';
  }

  @media (min-width: 1023px) {
    .wrapper {
      grid-template-columns: 20em 1fr;
      grid-template-areas:
        'header  header'
        'sidebar content'
        'footer footer';
    }
  }
</style>

<div class="wrapper">
  <header class="header pagehead p-2 mb-2">
    <h1>Occupapp</h1>
  </header>
  <div class="sidebar">
    <Sidebar />
  </div>
  <div class="content" bind:clientWidth={width} style="padding: {padding}px">
    <Chart width={width - 2 * padding} />
  </div>
  <footer class="footer pt-6 pb-2">
    <Credits />
  </footer>
</div>
