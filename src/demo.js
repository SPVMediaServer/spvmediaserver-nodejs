
const manifestUri =
    //'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd' //works
    'http://35.202.6.98/videos/bunny.m3u8' // error 4022
    //'/videos/index.m3u8'
    //'https://mymoney.stream/videos/bunny/bunny.mp4' // works
    //'https://mymoney.stream/videos/bunny/bunny.m3u8' // error 1002 CORS

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll()

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer()
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!')
  }
}

async function initPlayer() {
  // Create a Player instance.
  const video = document.getElementById('video')
  const player = new shaka.Player(video)

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player

  // Listen for error events.
  player.addEventListener('error', onErrorEvent)

  // additional config to support parsing hls
//   shaka.media.ManifestParser.registerParserByExtension("m3u8", shaka.hls.HlsParser)
//   shaka.media.ManifestParser.registerParserByMime("Application/vnd.apple.mpegurl", shaka.hls.HlsParser)
//   shaka.media.ManifestParser.registerParserByMime("application/x-mpegURL", shaka.hls.HlsParser)

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
      console.log(`loading ${manifestUri}`)
    await player.load(manifestUri);
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  } catch (e) {
    // onError is executed if the asynchronous load fails.
    //console.error(e)
    onError(e);
  }
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail)
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

document.addEventListener('DOMContentLoaded', initApp)