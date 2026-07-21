/* ==================================================================
   CONFIG — edit these to customize the experience
   ================================================================== */

// 🎵 Background music source. Swap this single URL to change the track.
const MUSIC_URL = "romantic-bgm.mp3";

// 🔐 The password required on Page 2 (case-insensitive, whitespace trimmed).
const CORRECT_PASSWORD = "tarkm";

// 💌 The three love letters revealed by the gift envelopes.
const LOVE_LETTERS = [
  `To My Roka 💛

Happy 27th Birthday to the most dramatic person I know. 😂

Seriously... if there was an Oscar for overreacting, you'd win it every single year.

You somehow turn the smallest thing into the biggest story ever... and somehow... it's actually entertaining.

You're loud, funny, social, a little crazy, and honestly that's exactly why everyone loves being around you.

You also take pictures of literally EVERYTHING...
The coffee.
The flowers.
The sunset.
The food.
Even random walls...

And somehow after all that...
you STILL don't know how to take a good picture. 😂📸

Please never change.

Life would be so much quieter...
and way more boring without you.

Happy Birthday, my favorite drama queen. 💛`,

  `My Funny Little Raheek 🌼

Thank you for filling every place with your energy.

I love how you laugh at your own jokes.
I love how excited you get over the smallest things.
I love how one second you're laughing...
and the next second you're acting like the whole world is against you. 😂

You're one of the kindest people I know.

Even though you scream the second you see the tiniest bug...
seriously...
I've never seen someone so terrified of insects. 🐞😂

I hope this year brings you more flowers, more coffee, more trips, more voice-over projects, and every opportunity you've been dreaming about.

Because you truly deserve beautiful things.

Happy Birthday, Roka. 🌸`,

  `My Roka, My Raheek 💚

There are so many memories I hope we'll never stop making.

I hope we travel together again.

I hope we eat sushi together again.

I hope we keep buying way too much food...

...and hiding it from everyone like we're on some secret mission. 😂

Those little moments might seem ordinary,
but they're some of my favorite memories with you.

Thank you for always making life louder,
funnier,
and happier.

I'm so proud of the amazing woman you've become.

Even if you're still a little dramatic...
still scared of every bug on Earth...
and still convinced you're a professional photographer. 📷😂

I wouldn't change a single thing about you.

Happy 27th Birthday, my beautiful sister.

I hope your life is filled with love,
adventures,
flowers,
coffee,
beautiful sunsets,
and endless happiness.

I love you more than you'll ever know. 💛🌼`,
];

/* ==================================================================
   ELEMENT REFERENCES
   ================================================================== */
const pages = Array.from(document.querySelectorAll(".page"));
const petalsContainer = document.getElementById("petals-container");
const heartsContainer = document.getElementById("hearts-container");
const confettiContainer = document.getElementById("confetti-container");
const sparkleContainer = document.getElementById("sparkle-container");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

const toLoveBtn = document.getElementById("toLoveBtn");
const startBtn = document.getElementById("startBtn");

const typewriterText = document.getElementById("typewriterText");

const giftRow = document.getElementById("giftRow");
const letterModal = document.getElementById("letterModal");
const letterBackdrop = document.getElementById("letterBackdrop");
const letterBody = document.getElementById("letterBody");
const letterClose = document.getElementById("letterClose");

const toPhotosBtn = document.getElementById("toPhotosBtn");
const toFinalBtn = document.getElementById("toFinalBtn");

const photoTrack = document.getElementById("photoTrack");
const photoSlides = Array.from(document.querySelectorAll(".photo-slide"));
const photoPrevZone = document.getElementById("photoPrevZone");
const photoNextZone = document.getElementById("photoNextZone");
const photoDots = document.getElementById("photoDots");
const photoCounter = document.getElementById("photoCounter");

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

const mascot = document.getElementById("mascot");

let currentPageIndex = 0;
let typewriterStarted = false;

/* ==================================================================
   PAGE NAVIGATION (fade + slide transition)
   ================================================================== */
function goToPage(pageId) {
  const target = document.getElementById(pageId);
  const current = pages.find((p) => p.classList.contains("active"));
  if (!target || target === current) return;

  if (current) {
    current.classList.add("leaving");
    current.classList.remove("active");
    setTimeout(() => current.classList.remove("leaving"), 700);
  }

  requestAnimationFrame(() => {
    target.classList.add("active");
  });

  currentPageIndex = pages.indexOf(target);

  if (pageId === "page-birthday") {
    animateBirthdayLetters();
    burstConfetti(60);
    mascotJump();
  }
  if (pageId === "page-love" && !typewriterStarted) {
    typewriterStarted = true;
    startTypewriter();
  }
  if (pageId === "page-photos") {
    renderPhotoDots();
    showPhoto(0, true);
  }
  if (pageId === "page-final") {
    burstConfetti(90);
    burstConfetti(90);
    mascotJump();
  }

  mascotWander();
}

/* ==================================================================
   SAKURA / LEAF PETALS — continuous ambient fall across every page
   ================================================================== */
function createPetal() {
  const petal = document.createElement("div");
  petal.className = "petal";

  const size = 10 + Math.random() * 14;
  const startX = Math.random() * 100;
  const duration = 8 + Math.random() * 7;
  const drift = (Math.random() - 0.5) * 200;
  const rotateStart = Math.random() * 360;
  const spin = (Math.random() - 0.5) * 720;

  // Soft green + pastel yellow + cream palette
  const palette = ["#b7d8b0", "#fbe8a6", "#f3d573", "#fffdf6", "#8fbf87"];
  const color = palette[Math.floor(Math.random() * palette.length)];

  petal.style.left = `${startX}%`;
  petal.style.width = `${size}px`;
  petal.style.height = `${size * 0.8}px`;
  petal.innerHTML = `
    <svg viewBox="0 0 100 80" width="100%" height="100%">
      <path d="M50 0 C80 10 100 35 90 60 C75 85 25 85 10 60 C0 35 20 10 50 0 Z" fill="${color}" opacity="0.85"/>
    </svg>`;

  petalsContainer.appendChild(petal);

  const animation = petal.animate(
    [
      {
        transform: `translate(0, -10vh) rotate(${rotateStart}deg)`,
        opacity: 0,
      },
      { offset: 0.1, opacity: 0.9 },
      {
        transform: `translate(${drift}px, 110vh) rotate(${rotateStart + spin}deg)`,
        opacity: 0.2,
      },
    ],
    { duration: duration * 1000, easing: "ease-in-out" },
  );

  animation.onfinish = () => petal.remove();
}

setInterval(createPetal, 600);
for (let i = 0; i < 6; i++) setTimeout(createPetal, i * 200);

/* ==================================================================
   SPARKLES — subtle twinkling ambient glow
   ================================================================== */
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.textContent = Math.random() > 0.5 ? "✦" : "✧";

  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  const size = 8 + Math.random() * 10;
  const duration = 1800 + Math.random() * 1400;

  sparkle.style.left = `${startX}%`;
  sparkle.style.top = `${startY}%`;
  sparkle.style.fontSize = `${size}px`;

  sparkleContainer.appendChild(sparkle);

  const anim = sparkle.animate(
    [
      { opacity: 0, transform: "scale(0.3) rotate(0deg)" },
      { opacity: 1, transform: "scale(1) rotate(90deg)", offset: 0.5 },
      { opacity: 0, transform: "scale(0.3) rotate(180deg)" },
    ],
    { duration, easing: "ease-in-out" },
  );

  anim.onfinish = () => sparkle.remove();
}

setInterval(createSparkle, 500);

/* ==================================================================
   HEART EXPLOSION — spawned from a given screen point
   ================================================================== */
function heartExplosion(x, y, count = 24) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.5 ? "💛" : "🌿";

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 160;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const duration = 900 + Math.random() * 700;
    const scale = 0.6 + Math.random() * 1.1;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heartsContainer.appendChild(heart);

    const anim = heart.animate(
      [
        { transform: `translate(-50%, -50%) scale(0)`, opacity: 1 },
        {
          transform: `translate(${dx - 50}px, ${dy - 50}px) scale(${scale})`,
          opacity: 1,
          offset: 0.6,
        },
        {
          transform: `translate(${dx * 1.3 - 50}px, ${dy * 1.3 + 40 - 50}px) scale(${scale * 0.8})`,
          opacity: 0,
        },
      ],
      { duration, easing: "cubic-bezier(.2,.8,.3,1)" },
    );
    anim.onfinish = () => heart.remove();
  }
}

/* ==================================================================
   CONFETTI BURST
   ================================================================== */
function burstConfetti(count = 60) {
  const colors = ["#b7d8b0", "#fbe8a6", "#f3d573", "#fffdf6", "#8fbf87"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";

    const size = 6 + Math.random() * 8;
    const isCircle = Math.random() > 0.5;
    const startX = Math.random() * 100;
    const duration = 2200 + Math.random() * 1800;
    const drift = (Math.random() - 0.5) * 260;
    const rotateEnd = (Math.random() - 0.5) * 900;
    const color = colors[Math.floor(Math.random() * colors.length)];

    piece.style.left = `${startX}%`;
    piece.style.width = `${size}px`;
    piece.style.height = `${isCircle ? size : size * 1.6}px`;
    piece.style.background = color;
    piece.style.borderRadius = isCircle ? "50%" : "2px";

    confettiContainer.appendChild(piece);

    const anim = piece.animate(
      [
        { transform: `translate(0, -10vh) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate(${drift}px, 105vh) rotate(${rotateEnd}deg)`,
          opacity: 0.9,
        },
      ],
      { duration, easing: "cubic-bezier(.35,.5,.4,1)" },
    );
    anim.onfinish = () => piece.remove();
  }
}

/* ==================================================================
   MASCOT — cute wandering + reactions
   ================================================================== */
function mascotBlink() {
  mascot.classList.add("blink");
  setTimeout(() => mascot.classList.remove("blink"), 300);
}
setInterval(mascotBlink, 3200);

function mascotWave() {
  mascot.classList.add("wave");
  setTimeout(() => mascot.classList.remove("wave"), 1300);
}

function mascotJump() {
  mascot.classList.add("jump");
  setTimeout(() => mascot.classList.remove("jump"), 550);
}

function mascotWander() {
  const margin = 40;
  const maxX = window.innerWidth - 100;
  const maxY = window.innerHeight - 120;
  const newX = margin + Math.random() * (maxX - margin);
  const newY = margin + Math.random() * (maxY - margin);
  mascot.style.left = `${newX}px`;
  mascot.style.bottom = `${window.innerHeight - newY - 80}px`;
}

// Wander occasionally on its own
setInterval(() => {
  if (Math.random() > 0.4) mascotWander();
}, 6000);

// Wave when clicked
mascot.style.pointerEvents = "auto";
mascot.addEventListener("click", () => {
  mascotWave();
  mascotJump();
});

/* ==================================================================
   PAGE 1 — WELCOME: dodging "No" button + "Yes" heart explosion
   ================================================================== */
const DODGE_RADIUS = 110;

function moveNoButtonAwayFrom(clientX, clientY) {
  const rect = noBtn.getBoundingClientRect();
  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const dx = btnCenterX - clientX;
  const dy = btnCenterY - clientY;
  const dist = Math.hypot(dx, dy);

  if (dist > DODGE_RADIUS) return;

  const margin = 20;
  const maxX = window.innerWidth - rect.width - margin;
  const maxY = window.innerHeight - rect.height - margin;

  const newX = Math.min(Math.max(margin, Math.random() * maxX), maxX);
  const newY = Math.min(Math.max(margin, Math.random() * maxY), maxY);

  noBtn.classList.add("fixed-flee");
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
}

function randomFleePosition() {
  const rect = noBtn.getBoundingClientRect();
  const margin = 20;
  const maxX = window.innerWidth - rect.width - margin;
  const maxY = window.innerHeight - rect.height - margin;
  const newX = margin + Math.random() * (maxX - margin);
  const newY = margin + Math.random() * (maxY - margin);
  noBtn.classList.add("fixed-flee");
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
}

document.addEventListener("mousemove", (e) => {
  if (!document.getElementById("page-welcome").classList.contains("active"))
    return;
  moveNoButtonAwayFrom(e.clientX, e.clientY);
});

noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    randomFleePosition();
  },
  { passive: false },
);

noBtn.addEventListener("click", () => {
  randomFleePosition();
});

yesBtn.addEventListener("click", () => {
  const rect = yesBtn.getBoundingClientRect();
  heartExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
  mascotWave();
  setTimeout(() => goToPage("page-password"), 500);
});

/* ==================================================================
   PAGE 2 — PASSWORD
   ================================================================== */
passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = passwordInput.value.trim().toLowerCase();

  if (value === CORRECT_PASSWORD.toLowerCase()) {
    passwordError.textContent = "";
    passwordError.classList.remove("shake");
    goToPage("page-birthday");
  } else {
    passwordError.textContent = "Not quite... try again 🌿";
    passwordError.classList.remove("shake");
    void passwordError.offsetWidth;
    passwordError.classList.add("shake");
    passwordInput.value = "";
    passwordInput.focus();
  }
});

/* ==================================================================
   PAGE 3 — HAPPY BIRTHDAY
   ================================================================== */
function animateBirthdayLetters() {
  const letters = document.querySelectorAll("#birthdayHeading .letter");
  letters.forEach((el, i) => {
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animationDelay = `${i * 0.06}s`;
    el.style.animation = "";
  });
}

toLoveBtn.addEventListener("click", () => goToPage("page-love"));

/* ==================================================================
   PAGE 4 — LOVE (typewriter)
   ================================================================== */
const LOVE_MESSAGE =
  "Happy Birthday, My Roka 💛\n\n" +
  "Life is simply more fun with you in it.\n" +
  "From our sushi days and secret food missions to all your dramatic moments,\n" +
  "you've filled my life with laughter, memories, and happiness.\n\n" +
  "Never stop being the funny, crazy, kind-hearted sister that everyone loves.\n" +
  "I hope this year brings you endless flowers, amazing trips, delicious coffee,\n" +
  "and every dream you've been quietly wishing for.\n\n" +
  "Love you always. 🌼";

function startTypewriter() {
  let i = 0;
  typewriterText.textContent = "";
  const speed = 32;

  function type() {
    if (i < LOVE_MESSAGE.length) {
      typewriterText.textContent += LOVE_MESSAGE.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

startBtn.addEventListener("click", () => {
  const rect = startBtn.getBoundingClientRect();
  heartExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
  setTimeout(() => goToPage("page-gifts"), 400);
});

/* ==================================================================
   PAGE 5 — GIFTS
   ================================================================== */
giftRow.addEventListener("click", (e) => {
  const giftBtn = e.target.closest(".gift");
  if (!giftBtn || giftBtn.classList.contains("opened")) return;

  const giftNumber = parseInt(giftBtn.dataset.gift, 10);
  giftBtn.classList.add("opened");

  const rect = giftBtn.getBoundingClientRect();
  heartExplosion(rect.left + rect.width / 2, rect.top, 16);
  mascotJump();

  setTimeout(() => openLetter(giftNumber), 450);
});

function openLetter(giftNumber) {
  const text = LOVE_LETTERS[giftNumber - 1] || LOVE_LETTERS[0];
  letterBody.textContent = text;
  letterModal.classList.add("open");
  letterModal.setAttribute("aria-hidden", "false");
}

function closeLetter() {
  letterModal.classList.remove("open");
  letterModal.setAttribute("aria-hidden", "true");
}

letterClose.addEventListener("click", closeLetter);
letterBackdrop.addEventListener("click", closeLetter);

toPhotosBtn.addEventListener("click", () => goToPage("page-photos"));

/* ==================================================================
   PAGE 6 — PHOTOS — full-screen viewer, tap left/right
   ================================================================== */
let currentPhotoIndex = 0;

function renderPhotoDots() {
  photoDots.innerHTML = "";
  photoSlides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    photoDots.appendChild(dot);
  });
}

function showPhoto(index, instant = false) {
  const total = photoSlides.length;
  currentPhotoIndex = (index + total) % total;

  photoSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentPhotoIndex);
  });

  const dots = photoDots.querySelectorAll(".dot");
  dots.forEach((dot, i) =>
    dot.classList.toggle("active", i === currentPhotoIndex),
  );

  photoCounter.textContent = `${currentPhotoIndex + 1} / ${total}`;
}

photoNextZone.addEventListener("click", () => showPhoto(currentPhotoIndex + 1));
photoPrevZone.addEventListener("click", () => showPhoto(currentPhotoIndex - 1));

// Basic swipe support for mobile
let touchStartX = null;
document.getElementById("photoViewer").addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
  },
  { passive: true },
);
document.getElementById("photoViewer").addEventListener(
  "touchend",
  (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) showPhoto(currentPhotoIndex + 1);
      else showPhoto(currentPhotoIndex - 1);
    }
    touchStartX = null;
  },
  { passive: true },
);

toFinalBtn.addEventListener("click", () => goToPage("page-final"));

/* ==================================================================
   BACKGROUND MUSIC
   ================================================================== */
let musicStarted = false;

function initMusicSource() {
  if (bgMusic.getAttribute("src") !== MUSIC_URL) {
    bgMusic.setAttribute("src", MUSIC_URL);
  }
}

function startMusic() {
  if (musicStarted) return;
  initMusicSource();
  bgMusic.volume = 0.55;
  bgMusic
    .play()
    .then(() => {
      musicStarted = true;
      musicToggle.classList.add("playing");
      musicIcon.textContent = "♪";
    })
    .catch(() => {});
}

["click", "touchstart", "keydown"].forEach((evt) => {
  document.addEventListener(evt, startMusic, { once: true, passive: true });
});

musicToggle.addEventListener("click", () => {
  if (!musicStarted) {
    startMusic();
    return;
  }
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.classList.add("playing");
    musicToggle.classList.remove("muted");
  } else {
    bgMusic.pause();
    musicToggle.classList.remove("playing");
    musicToggle.classList.add("muted");
  }
});

/* ==================================================================
   INIT
   ================================================================== */
document.getElementById("page-welcome").classList.add("active");
mascotWander();
