

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".navigation li");

  // Set the initial selected item to the first section
  navItems[0].classList.add("selected");

  // Listen for scroll events on the container element
  const container = document.querySelector(".container");
  container.addEventListener("scroll", () => {
    // Find the current section that's in view
    const currentSection = Array.from(sections).find((section) => {
        const rect = section.getBoundingClientRect();
        const middle = (rect.top + rect.bottom) / 2; // Get the middle of the section
        return middle >= 0 && middle <= window.innerHeight;
      });

    // Remove the "selected" class from all nav items
    navItems.forEach((item) => {
      item.classList.remove("selected");
    });

    // Add the "selected" class to the nav item that corresponds to the current section
    const index = Array.from(sections).indexOf(currentSection);
    if (index !== -1) {
      navItems[index].classList.add("selected");
    }
  });

  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Find the corresponding section based on index
      const section = document.querySelectorAll("section")[index];
      // Scroll to the section
      section.scrollIntoView({ behavior: "smooth" });
    });
  });

  var video = document.getElementById("myVideo");
  // Set the playback rate to 0.5 (half speed)
  video.playbackRate = 0.9;

  const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(otherCard => {
      if (otherCard !== card) {
        otherCard.classList.remove('enlarged');
      }
    });
    card.classList.toggle('enlarged');
  });
});

const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#musictitle')
const cover = document.querySelector('#cover')

// Song titles
const songs = ['Lake', 'Littleroot Town', 'Valor Lakefront (Day)', 'Pokemon Lab Theme']

// Keep track of songs
let songIndex = 3

// Load song info DOM
loadSong(songs[songIndex])

//Update song details
function loadSong(song){
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `img/${song}.png`
}

function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}

function pauseSong(){
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

function prevSong() {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])

  playSong()
}

function nextSong() {
  songIndex++

  if (songIndex > songs.length -1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])

  playSong()

}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration
  
  audio.currentTime = (clickX / width) * duration

}

// Event listners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')

  if(isPlaying){
    pauseSong()
  } else{
    playSong()
  }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)