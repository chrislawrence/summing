/* Set tracks from Soundcloud URLs */

var client_id='868d4d0d5593ea5fc793133becab0671'

function setTrackSource(title, id){
  SC.get('/tracks/' + id, {}, function(sound){
    $('#' + title).attr('src', sound.stream_url + '?client_id=' + client_id);
  });
}

window.onload = function() {
  SC.initialize({client_id: client_id});
  setTrackSource('direct-ascent', '184686304');
  setTrackSource('creator', '184686296');
  setTrackSource('hegemony', '184686291');
  setTrackSource('charleston', '184686290');
  setTrackSource('hartandcohle', '184686288');
}

/* Player controls */


var currentTrack

function play(index){
  loading(index)
  pauseAll()
  $("audio")[index].play();
  currentTrack = index;
  showControls();
  $(".play-button").hide();
  $(".play-pause").show();
  $("audio")[currentTrack].ontimeupdate = function() { updateTime() }
}

function loading(index) {
  var selector = $('.tracklisting li:nth-child('+(index + 1)+')');
  selector.append("<div class='spinner'></div>");
  selector.children(".time").hide();
}

function offLoading() {
  $('.spinner').each(function(){$(this).remove()});
  $('.time').each(function(){$(this).show()});
  }

function pause() {
  $("audio").each(function(){this.pause()})
  $(".play-button").show()
  $(".play-pause").hide()
}

function resume() {
  $("audio")[currentTrack].play()
  $(".play-button").hide()
  $(".play-pause").show()
}

function nextTrack() {
  pauseAll();
  if (currentTrack < 4) {
    currentTrack += 1;
    play(currentTrack);
  }
  else {
    currentTrack = 0;
  }
}

function prevTrack() {
  pauseAll();
  if (currentTrack > 0){
    currentTrack -= 1;
    play(currentTrack);
  }
}

function pauseAll() {
  $("audio").each( function() {
    this.pause();
    this.currentTime = 0;
    $(".play-button").show();
    $(".play-pause").hide();
  })
  $(".elapsed").each(function(){ $(this).empty() });
  $(".tracklisting").children().each(function(){ $(this).removeClass("current")});
}

function showControls() {
  $(".player").slideDown()
}


function updateTime() {
  time = $("audio")[currentTrack].currentTime
  if ( time > 0 ) {
    offLoading();
    selector = $('.tracklisting li:nth-child('+(currentTrack + 1)+')');
    selector.addClass('current');
    selector.children('.elapsed').html(prettyTime(time));
  }
}

function prettyTime(time) {
  var sec_num = parseInt(time, 10);
  var minutes = Math.floor(sec_num/ 60);
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  var seconds = sec_num - (minutes * 60);
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  return minutes + ":" + seconds + " / "
}

