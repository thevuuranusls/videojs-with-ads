var Ads = function(videoid, source) {

      // Your config
      this.AdTagInput = "<AD_TAG>";
      this.options = {
          html5: {
            p2pConfig:{
              streamrootKey: "<YOUR-STREAMROOT-KEY>"
            },
            hlsjsConfig: {}
          },
          autoplay: false
        };

        this.source = source;
        this.player = videojs(videoid, this.options);
        var pl = this.player;

        // adding the Sound on mouse over option:
       pl.on('mouseover', function(){
         pl.volume(1);
       });
       pl.on('mouseout', function(){
         pl.volume(0);
       });
       pl.volume(0);

      try{
          var adOptions = {
              id: videoid,
              adTagUrl: this.AdTagInput,
              showCountdown: true,
              adLabel: "Publicité",
              vpaidMode: google.ima.ImaSdkSettings.VpaidMode.ENABLED
          };

          // Remove controls from the player on iPad to stop native controls from stealing
          // our click
          var contentPlayer =  document.getElementById(videoid + '_html5_api');
          if ((navigator.userAgent.match(/iPad/i) ||
                  navigator.userAgent.match(/Android/i)) &&
              contentPlayer.hasAttribute('controls')) {
            contentPlayer.removeAttribute('controls');
          }

          this.events = [
            google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            google.ima.AdEvent.Type.CLICK,
            google.ima.AdEvent.Type.COMPLETE,
            google.ima.AdEvent.Type.FIRST_QUARTILE,
            google.ima.AdEvent.Type.LOADED,
            google.ima.AdEvent.Type.MIDPOINT,
            google.ima.AdEvent.Type.PAUSED,
            google.ima.AdEvent.Type.STARTED,
            google.ima.AdEvent.Type.THIRD_QUARTILE
          ];

          pl.ima(
              adOptions,
              this.bind(this, this.adsManagerLoadedCallback)
          );

          this.player.ima.setContentWithAdTag(this.source, this.AdTagInput, false);
          this.player.ima.requestAds();
     }
     catch(err) {
         this.player.src(this.source);
     }
     finally {
         this.player.play();
     }
 };

Ads.prototype.adsManagerLoadedCallback = function() {
  for (var index = 0; index < this.events.length; index++) {
    this.player.ima.addEventListener(
        this.events[index],
        this.bind(this, this.onAdEvent));
  }
  this.player.ima.startFromReadyCallback();
};

Ads.prototype.onAdEvent = function(event) {
};

Ads.prototype.log = function(message) {
  console.log(message);
}

Ads.prototype.bind = function(thisObj, fn) {
  return function() {
    fn.apply(thisObj, arguments);
  };
};
