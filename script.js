const arry = [
  { songName: "Mujh ko Pechhan Lo", singerName: "Don 2 | SRK | Krishnakumar Kunnath", url: "./songs/mujhko pehchanlo.mp3", img: "./images/srk.jpg" },
  { songName: "Laila Main Laila", singerName: "Raees | Shah Rukh Khan | Sunny Leone | Pawni Pandey", url: "./songs/Laila.Main.Laila.mp3", img: "./images/Laila-Main-Laila-Lyrics-1.webp" },
  { songName: "Saari Duniya jalaa Denga", singerName: "Ranbir K,Anil K,Bobby D|Sandeep|B Praak,Jaani", url: "./songs/saari Duniya jalaa Denga.mp3", img: "awe.jpg" },
  { songName: "Dil Cheez Tujhe Dedi", singerName: " AIRLIFT | Akshay Kumar | Ankit Tiwari, Arijit Singh", url: "./songs/Dil Cheez Tujhe Dedi (From Airlift).mp3", img: "./images/maxresdefault.jpg" },


]

const allSongs = document.querySelector("#all-songs");
const songTitle = document.querySelector("#song-title");
const songDecripation = document.querySelector("#song-discripation");

const songProgress = document.querySelector("#progress");

const poster = document.querySelector(".poster")
const posterTwo = document.querySelector(".poster-two")
const play = document.querySelector("#play")
const backward = document.querySelector("#back")
const forward = document.querySelector("#forward")
const audio = new Audio()


let selectedSong = 0;


function mainfunction() {

  var clutter = "";

  arry.forEach(function (elem, index) {
    clutter += `
    <div class="d-flex align-items-center justify-content-center  hoverList">
    <div class="song-list" id=${index}>
      <img class="img-fluid img-thumbnail w-25 m-2  "  src=${elem.img} alt="" srcset="">
      <h2 class="song-name">${elem.songName}</h2>
      </div>
      <h3 class="icon ">
        <i id="playIcon" class="ri-play-fill"></i>
      </h3>
      </div>

    `
  })



  audio.src = arry[selectedSong].url

  allSongs.innerHTML = clutter;
  poster.style.backgroundImage = `url(${arry[selectedSong].img})`
  posterTwo.style.backgroundImage = `url(${arry[selectedSong].img})`

  songTitle.innerText = arry[selectedSong].songName;
  songDecripation.innerHTML = arry[selectedSong].singerName;

}

mainfunction()

allSongs.addEventListener("click", function (dets) {
  selectedSong = dets.target.id

  mainfunction()

  play.innerHTML = `<i class="ri-pause-mini-line"></i>`
  play.style.boxShadow = "inset 0.5px 0.5px  6px  #3d3d3d"
  play.style.backgroundColor = " #7491F5"
  flag = 1

  audio.play();


})


var flag = 0

play.addEventListener("click", function () {
  if (flag == 0) {
    play.style.boxShadow = "inset 0.5px 0.5px  6px  #3d3d3d"
    play.style.backgroundColor = " #7491F5"
    play.innerHTML = `<i class="ri-pause-mini-line"></i>`
    mainfunction()
    flag = 1
    audio.play()

  } else {

    play.style.boxShadow = "8px 8px 16px #999999, -8px -8px 18px #ffffff"
    play.style.backgroundColor = " #DCE5F3"
    play.innerHTML = `<i class="ri-play-fill"></i>`
    mainfunction()
    audio.pause()
    flag = 0
  }

})







forward.addEventListener("click", function () {
  if (selectedSong < arry.length - 1) {
    selectedSong++;
    mainfunction();
    audio.play();
    play.innerHTML = `<i class="ri-pause-mini-line"></i>`;
    play.style.boxShadow = "inset 0.5px 0.5px  6px  #3d3d3d";
    play.style.backgroundColor = " #7491F5";
    flag = 1; // Update flag to indicate the song is playing
    backward.style.opacity = "1";
    updateProgressBar();// Start updating progress bar
    audio.addEventListener('timeupdate', updateProgressBar);

  } else {
    forward.style.opacity = "0.4";
  }
});


backward.addEventListener("click", function () {
  if (selectedSong > 0) {
    selectedSong--;
    mainfunction();
    audio.play();
    play.innerHTML = `<i class="ri-pause-mini-line"></i>`;
    play.style.boxShadow = "inset 0.5px 0.5px  6px  #3d3d3d";
    play.style.backgroundColor = " #7491F5";
    flag = 1; // Update flag to indicate the song is playing
    forward.style.opacity = "1"; // Ensure forward button is enabled
    updateProgressBar();    // Start updating progress bar
    audio.addEventListener('timeupdate', updateProgressBar);

  } else {
    backward.style.opacity = "0.4";
  }

});


//progressbar 

audio.onloadedmetadata = function () {
  songProgress.max = audio.duration;
  songProgress.value = audio.currentTime;
}

if (audio.play()) {
  setInterval(() => {
    songProgress.value = audio.currentTime;

  }, 500);

}

songProgress.onchange = function () {
  audio.play();
  audio.currentTime = progress.value
  play.innerHTML = `<i class="ri-pause-mini-line"></i>`;
  play.style.boxShadow = "inset 0.5px 0.5px  6px  #3d3d3d";
  play.style.backgroundColor = " #7491F5"

}
