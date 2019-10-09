<script>
  import Chart from './Chart/Chart.svelte'
  import Sidebar from './Sidebar/Sidebar.svelte'

  const padding = 20 // also change CSS if modified
  let height = undefined
  let width = undefined
</script>

<style global type="text/scss">
  .board {
    display: grid;
    grid-template-columns: 20em 1fr;
  }
  .main {
    padding: 20px; /* also change <script> if modified */
  }
</style>

<div class="board">
  <div class="left">
    <Sidebar />
  </div>
  <div class="main" bind:clientHeight={height} bind:clientWidth={width}>
    <Chart width={width - 2 * padding} />
  </div>
</div>
