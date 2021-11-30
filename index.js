console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
// let About = document.getElementsByClassName("About");
// About.addEventListener("click", () => {
//   About.classList.add("active");
// });
// fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer ${userAccessToken}`,
//   },
// })
//   .then((response) => response.json())
//   .then(({ beats }) => {
//     beats.forEach((beat, index) => {
//       console.log(`Beat ${index} starts at ${beat.start}`);
//     });
//   });
let songs = [
  {
    songName: "Baarish",
    filePath: "song/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Kanta Laga",
    filePath: "song/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Mere Yaara",
    filePath: "song/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Tadap",
    filePath: "song/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Raatan Lambiyan",
    filePath: "song/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Ranjha",
    filePath: "song/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Jugnu",
    filePath: "song/7.mp3",
    coverPath: "covers/7.jpg",
  },
];
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  // element.getElementById("gif")[0].style.opacity = 1;
});
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

// const makeAll0 = () => {
//   Array.from(gif).forEach((element) => {
//     element.style.opacity = 0;
//   });
// };
let click = 0;
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      masterSongName.innerText = songs[songIndex].songName;
      click++;
      if (click % 2 == 0) {
        e.target.classList.add("fa-play-circle");
        e.target.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        audioElement.pause();
        gif.style.opacity = 0;
      }
    });
  }
);
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  masterSongName.innerText = songs[songIndex].songName;
});

document.getElementById("prev").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  masterSongName.innerText = songs[songIndex].songName;
});
