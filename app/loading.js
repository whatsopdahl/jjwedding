module.exports = function loadingComponent() {
  return {
    restrict : 'E',
    template : require('./templates/loading.html')
  };
}
