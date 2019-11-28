// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '300',
    width: '300',
    videoId: 'EI88KINLJIQ',
    playerVars: { 'autoplay': 0, 'showinfo' : 0, 'modestbranding' : 1},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  player.playVideo();
}


function onPlayerStateChange(event) {
  //----------------------------------------------TO DO
  }

function stopVideo() {
  player.stopVideo();
}

function play() {
 player.playVideo();
}

function pause() {
 player.pauseVideo();
}

function back5sec(){
player.seekTo((player.getCurrentTime()) - 5, true) ;
}

function frwd5sec(){
player.seekTo((player.getCurrentTime()) + 5, true) ;
}
