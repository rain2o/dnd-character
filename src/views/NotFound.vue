<script>
/**
 * We don't show the 404, but instead redirect to home page
 */
export default {
  name: 'NotFound',
  beforeRouteEnter(_to, _from, next) {
    next('/');
  },
};
</script>
