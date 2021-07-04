import Soundfont from "https://cdn.skypack.dev/soundfont-player";

const ac = new AudioContext();
const NOTES = {
  keyz: "G3",
  keyx: "A3",
  keyc: "B3",
  keyv: "C4",
  keyb: "D4",
  keyn: "E4",
  keym: "F4",
  keyq: "G4",
  keyw: "A4",
  keye: "B4",
  keyr: "C5",
  keyt: "D5",
  keyy: "E5",
  keyu: "F5",
  keyi: "G5",
  keyo: "A5",
  keyp: "B5",
  keys: "G#3",
  keyd: "A#3",
  keyg: "C#4",
  keyh: "D#4",
  keyk: "F#4",
  keyl: "G#4",
  keyñ: "A#4",
  key5: "C#5",
  key6: "D#5",
  key8: "F#5",
  key9: "G#5",
  key0: "A#5"
};
const options = {
  soundfont: "FluidR3_GM"
};
let currentInstrument = "piano";
let currentVolume = 1;
const cumbiaSong = new Audio("/cumbia.mp3");

const instruments = {
  piano: await Soundfont.instrument(ac, "acoustic_grand_piano", options),
  fantasy: await Soundfont.instrument(ac, "lead_2_sawtooth", options),
  violin: await Soundfont.instrument(ac, "violin", options),
  flute: await Soundfont.instrument(ac, "flute", options)
}

const play = (instrument, note, duration = 2) => {
  instruments[instrument].play(note, ac.currentTime, { duration, gain: currentVolume });
}

const pianoKeys = document.querySelectorAll(".key");

pianoKeys.forEach(key => {
  const note = key.dataset.note;
  key.addEventListener("mousedown", () => play(currentInstrument, note));
});

document.addEventListener("keydown", (ev) => {
  const id = `key${ev.key}`;
  const note = NOTES[id];
  const key = document.querySelector(`[data-note="${note}"]`);
  key.classList.add("active");
  play(currentInstrument, note);
});

document.addEventListener("keyup", (ev) => {
  const id = `key${ev.key}`;
  const note = NOTES[id];
  const key = document.querySelector(`[data-note="${note}"]`);
  key.classList.remove("active");
});

const toneSliders = document.querySelectorAll(".tone input");
toneSliders.forEach(input => {
  input.addEventListener("click", () => {
    const instrument = input.id;
    currentInstrument = String(instrument);
  });
});

const volumeSliders = document.querySelectorAll(".volume input");
volumeSliders.forEach(input => {
  input.addEventListener("click", () => {
    const volume = input.value;
    currentVolume = Number(volume);
  })
});

const COLORS = ["#d81313", "#eace17", "#33ea12", "#12eae3", "#101eea", "#ea10e3"];

const changeColor = () => {
  setTimeout(() => {
    const color = COLORS[~~(Math.random() * COLORS.length)];
    document.body.classList.remove("dark");
    document.body.style.setProperty("--body-color", color);
    setTimeout(() => changeColor(), 350);
  }, 350);
}

const cViene = () => {
  document.body.classList.add("dark");
  setTimeout(() => {
    document.body.classList.add("party");
    changeColor();
  }, 27000);
  setTimeout(() => {
    const image = document.createElement("img");
    image.src = "/thanos.png";
    image.className = "thanos";
    document.body.appendChild(image);
  }, 18000);
}

const demoButton = document.querySelector("[data-type=demo");
demoButton.addEventListener("click", () => {
  if (cumbiaSong.paused) {
    cumbiaSong.play();
    cViene();
  }
  else
    cumbiaSong.pause();
});
