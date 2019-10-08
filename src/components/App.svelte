<script>
  import ResponsiveImage from 'components/ResponsiveImage.svelte'

  let image = 'petanque'
</script>

<style global type="text/scss">
  @import '../global.scss';
</style>

<h1>Occupapp</h1>

<ResponsiveImage name={image} />
