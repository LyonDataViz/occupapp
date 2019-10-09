<script>
  import Credits from './Credits.svelte'
</script>

<style>
  .sidebar {
    height: calc(100vh);
  }
  footer {
    margin-top: auto;
  }
</style>

<div class="sidebar d-flex flex-column p-3">
  <div class="pagehead mb-4">
    <h1>Occupapp</h1>
  </div>

  <footer class="pt-6 pb-2">
    <Credits />
  </footer>
</div>
