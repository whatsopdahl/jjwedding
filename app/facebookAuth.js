window.fbAsyncInit = function() {
  FB.init({
    appId      : '1309173769148582',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();   
};

(function(d) {
  var js, fjs = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1309173769148582";
  fjs.parentNode.insertBefore(js, fjs);
}(document));
