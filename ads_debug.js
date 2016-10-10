var Ads = function(videoid, source) {

    // Your config
      this.AdTagInput = "<AD_TAG>";
      this.options = {
          html5: {
  	      p2pConfig:{
  	        streamrootKey: "<YOUR-STREAMROOT-KEY>",
  	        debug: true
  	      },
  	      hlsjsConfig: {}
  	    },
  	    debug: true,
        autoplay: false
  	  };

       var adOptions = {
        id: videoid,
        adTagUrl: this.AdTagInput,
   	    showCountdown: true,
   	    adLabel: "Publicité",
   	    //forceNonLinearFullSlot: false,
   	    vpaidMode: google.ima.ImaSdkSettings.VpaidMode.ENABLED
      };

      this.source = source;
      this.player = videojs(videoid, this.options);

      // Remove controls from the player on iPad to stop native controls from stealing
      // our click
      var contentPlayer =  document.getElementById(videoid + '_html5_api');
      if ((navigator.userAgent.match(/iPad/i) ||
              navigator.userAgent.match(/Android/i)) &&
          contentPlayer.hasAttribute('controls')) {
        contentPlayer.removeAttribute('controls');
      }


      // Start ads when the video player is clicked, but only the first time it's
      // clicked.
      /*var startEvent = 'click';
      if (navigator.userAgent.match(/iPhone/i) ||
          navigator.userAgent.match(/iPad/i) ||
          navigator.userAgent.match(/Android/i)) {
        startEvent = 'touchend';
      }
      this.player.one(startEvent, this.bind(this, this.init));*/

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

      var pl = this.player;

      pl.ima(
          adOptions,
          this.bind(this, this.adsManagerLoadedCallback)
      );

      // adding the Sound on mouse over option:
     pl.on('mouseover', function(){
       pl.volume(1);
     });
     pl.on('mouseout', function(){
       pl.volume(0);
     });
     pl.volume(0);

     this.init();
};

Ads.prototype.init = function() {
	console.log("initializing");
    // this.player.ima.initializeAdDisplayContainer(); // Automatic if not explicitly done
    this.player.ima.setContentWithAdTag(this.source, this.AdTagInput, false);
    this.player.ima.requestAds();
    this.player.play();
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
  this.log('Ad event: ' + event.type);
};

Ads.prototype.log = function(message) {
  console.log(message);
}

Ads.prototype.bind = function(thisObj, fn) {
  return function() {
    fn.apply(thisObj, arguments);
  };
};
