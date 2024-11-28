const idObject = {
  footer: "footer",
  meter: "meter",
  progressBar: "progress_bar",
  playButton: "play_button",
  podcastStation: "podcast_station",
  podcastList: "podcast_list",
  controlButton: "control_button",
  audioPlayer: "audio_player",
  currentTime: "current_time",
  playerPlatButton: "player_play_button",
  whatsNowPlaying: "whats_now_playing",
};

const classListObject = {
  stationImage: "station_image",
  podStationButton: "pod_station_button",
  visible: "visible",
  collapse: "collapse",
};

const cssVisibility = {
  visible: "visible",
  collapse: "collapse",
};

const footer = document.getElementById(idObject.footer);
const meter = document.getElementById("meter");
const progressBar = document.getElementById("progress_bar");
const playButton = document.getElementsByClassName(idObject.playButton);
const podcastStationDiv = document.getElementById(idObject.podcastStation);
const podcastListDiv = document.getElementById(idObject.podcastList);
const playerPlayButton = document.getElementById(idObject.playerPlatButton);
const whatsNowPlayingDiv = document.getElementById(idObject.whatsNowPlaying);
let podcastList = [];

// music player class
class PodcastPlayer {
  player = document.getElementById(idObject.audioPlayer);
  audioTime = document.getElementById(idObject.currentTime);
  progressBar = document.getElementById(idObject.progressBar);
  whatsNowPlaying = document.getElementById(idObject.whatsNowPlaying);
  //playerPlayButton = document.getElementById(idObject.playerPlatButton)
  src = null;
  playtime = null;

  setSrc(podcast) {
    footer.style.visibility = "collapse";
    this.player.src = podcast.url;
    this.src = podcast.url;
    this.#setWhatsNowPlaying(podcast.title);
    this.play();
    footer.style.visibility = "visible";
  }
  play() {
    this.player.play();
    this.#setPlayerDisplayTime();
  }

  togglePlay() {
    if (this.player.paused) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  setPlayerTime(percentage) {
    this.player.currentTime = (this.#getPlayTime() * percentage) / 100;
    this.player.play();
  }
  //auxilary private functions accessible only for class
  #setPlayerTimeString(currentTime) {
    const currentTimeInSeconds = currentTime / 60;
    const minutes = Math.trunc(currentTimeInSeconds);
    const seconds = Math.trunc(currentTime % 60);
    return `${minutes}:${seconds}`;
  }
  //gets current playtime from media players
  #getCurrentTime() {
    return this.player.currentTime;
  }
  //gets total play time from media player
  #getPlayTime() {
    return this.player.duration;
  }
  //sets playtime
  #setPlayerDisplayTime() {
    this.playerTimeId = setInterval(() => {
      //const currentTime =this.getCurrentTime()
      const getTimeP = (this.#getCurrentTime() / this.#getPlayTime()) * 100;
      this.progressBar.style.width = `${getTimeP}%`;
      const currentPlaytime = this.#setPlayerTimeString(this.#getCurrentTime());
      this.audioTime.innerHTML = `${currentPlaytime} / ${this.#setPlayerTimeString(
        this.#getPlayTime()
      )}`;
    }, 100);
  }
  #setWhatsNowPlaying(nowPlaying) {
    whatsNowPlayingDiv.innerHTML = nowPlaying;
  }
}

const podcastPlayer = new PodcastPlayer();

//for setting scroll state
meter.addEventListener("click", (event) => {
  const totalWidth = meter.offsetWidth;
  const clickedWidth = event.clientX;
  const percentage = (clickedWidth / totalWidth) * 100;

  //console.log(event)
  progressBar.style.width = `${percentage}%`;
  podcastPlayer.setPlayerTime(percentage);
});

playerPlayButton.addEventListener("click", () => {
  podcastPlayer.togglePlay();
});

//***************AUXILIARY FUNCTIONS**************************
function setVersion() {
  const docVersion = document.getElementById("version");
  docVersion.innerHTML = "V 0.0.6B";
}

function setpodcastStations() {
  podcastStations.forEach((station) => {
    const newDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    //set name
    nameDiv.innerHTML = station.name;
    //set image
    const imgDiv = document.createElement("img");
    imgDiv.src = station.logo;
    imgDiv.classList.add(classListObject.stationImage);

    const button = document.createElement("button");
    button.innerHTML = "play";
    button.classList.add(classListObject.podStationButton);

    //append objects
    newDiv.appendChild(nameDiv);
    newDiv.appendChild(imgDiv);
    newDiv.appendChild(button);
    podcastStationDiv.appendChild(newDiv);
  });

  const podStationButton = document.getElementsByClassName(
    classListObject.podStationButton
  );

  for (let i = 0; i < podStationButton.length; i++) {
    podStationButton[i].addEventListener("click", (event) => {
      let podcastStation = podcastStations[i];
      const url = podcastStation.url;
      //alert(podcast.id)
      getPodcasts(url);
      //podcastPlayer.play()
    });
  }
}
//sets podcasts
async function getPodcasts(url) {
  podcastList = await getPodcastDataXML(url);
  podcastList.forEach((podcast) => {
    const newDiv = document.createElement("div");
    const header = document.createElement("h1");
    header.innerHTML = podcast.title;
    const button = document.createElement("button");
    button.classList.add(idObject.playButton);
    button.id = podcast.id;
    button.innerText = "Play Now";
    newDiv.appendChild(header);
    newDiv.appendChild(button);

    podcastListDiv.appendChild(newDiv);
  });
  //console.log(playButton)

  //console.log("at main page",podcastList)
  for (let i = 0; i < playButton.length; i++) {
    playButton[i].addEventListener("click", (event) => {
      let podcast = podcastList[i];
      const url = podcast.url;
      //alert(podcast.id)
      podcastPlayer.setSrc(podcast);
      //podcastPlayer.play()
    });
  }
  podcastListDiv.style.visibility = cssVisibility.visible;
}

setVersion();
setpodcastStations();
//getPodcasts();