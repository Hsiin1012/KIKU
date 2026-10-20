/* ==========================================================================
   [BUILD] Visual Novel Core Engine (Responsive, Fullscreen & Manual Transition Fix)
   ========================================================================== */
console.log("[BUILD] Visual Novel Core Engine (Responsive, Fullscreen & Manual Transition Fix)");

/* ==========================================================================
   1. 角色視覺設定與素材對應映射 (Asset Mapping / Sprite & Background Registry)
   ========================================================================== */
const CHARACTERS = {
  get hero() {
    return { name: gameState.playerName || "転校生", title: "不可或缺的朋友", color: "#2ecc71", image: null };
  },
  "ren": { name: "鬼塚 蓮", title: "嘴硬行動派", color: "#e84118", image: null },
  "toru": { name: "白石 透", title: "冷面吐槽役", color: "#00a8ff", image: null },
  "sato": { name: "佐藤先生", title: "班導師", color: "#9c88ff", image: null },
  "misaki": { name: "小林 美咲", title: "班級情報通", color: "#fbc531", image: null },
  "teacher_other": { name: "其他老師", title: "校內教師", color: "#718093", image: null },
  "player": {
    get name() { return gameState.playerName || "転校生"; },
    title: "轉學生",
    color: "#2ecc71",
    image: null
  }
};

/* 背景對應表 */
const BACKGROUND_MAP = {
  "2年B班 教室 (早晨)": "assets/backgrounds/bg_classroom_moring.webp",
  "2年B班 教室 (課堂)": "assets/backgrounds/bg_classroom_day.webp",
  "2年B班 教室 (放學後)": "assets/backgrounds/bg_classroom_evening.webp",
  "校園走廊 (文化祭準備中)": "assets/backgrounds/bg_corridor_day.webp",
  "校園走廊 (熱鬧混亂)": "assets/backgrounds/bg_corridor_evening.webp",
  "放學後的屋頂 (夕陽風吹)": "assets/backgrounds/bg_rooftop.webp",
  "校園中庭 (交流會後夕陽微風)": "assets/backgrounds/bg_eventspace_evening.webp",
  "龍神高中 (校園全景黃昏)": "assets/backgrounds/bg_office.webp"
};

/* 角色立繪對應表 */
const CHARACTER_SPRITE_MAP = {
  "ren": {
    "怒吼衝動": "assets/characters/ren/ren_angry.webp",
    "困惑反差": "assets/characters/ren/ren_surprised.webp",
    "衝動慌張": "assets/characters/ren/ren_embarrased.webp",
    "熱血提議": "assets/characters/ren/ren_smile.webp",
    "標準": "assets/characters/ren/ren_normal.webp",
    "suspect": "assets/characters/ren/ren_suspect.webp",
    "surprised": "assets/characters/ren/ren_surprised.webp",
    "roast": "assets/characters/ren/ren_normal.webp",
    "sigh": "assets/characters/ren/ren_normal.webp",
    "throwshade": "assets/characters/ren/ren_throwshade.webp",
    "scarysmile": "assets/characters/ren/ren_normal.webp",
    "smirk": "assets/characters/ren/ren_smile.webp",
    "angry": "assets/characters/ren/ren_angry.webp",
    "normal": "assets/characters/ren/ren_normal.webp",
    "embarrased": "assets/characters/ren/ren_embarrased.webp",
    "smile": "assets/characters/ren/ren_smile.webp"
  },
  "toru": {
    "冷漠推眼鏡": "assets/characters/toru/toru_smile.webp",
    "溫和微笑": "assets/characters/toru/toru_smile.webp",
    "標準": "assets/characters/toru/toru_normal.webp",
    "normal": "assets/characters/toru/toru_normal.webp",
    "roast": "assets/characters/toru/toru_roast.webp",
    "sigh": "assets/characters/toru/toru_sigh.webp",
    "smirk": "assets/characters/toru/toru_smirk.webp",
    "serious": "assets/characters/toru/toru_serious.webp",
    "smile": "assets/characters/toru/toru_smile.webp"
  },
  "sato": {
    "溫和微笑": "assets/characters/sato/sato_smile.webp",
    "黑臉微笑": "assets/characters/sato/sato_scarysmile.webp",
    "標準": "assets/characters/sato/sato_normal.webp",
    "normal": "assets/characters/sato/sato_normal.webp",
    "scarysmile": "assets/characters/sato/sato_scarysmile.webp",
    "smile": "assets/characters/sato/sato_smile.webp"
  },
  "misaki": {
    "活潑得意": "assets/characters/misaki/misaki_excited.webp",
    "標準": "assets/characters/misaki/misaki_normal.webp",
    "excited": "assets/characters/misaki/misaki_excited.webp",
    "normal": "assets/characters/misaki/misaki_normal.webp"
  },
  "player": {
    "溫和微笑": "",
    "困惑觀察": "",
    "標準": ""
  }
};

/* ==========================================================================
   EXTRA EVENT DATA: 「幻の焼きそばラリー」
   ========================================================================== */
const EXTRA_EVENT_STEPS = [
  { type: "blackout" },
  { type: "title_card", title: "EXTRA EVENT", subtitle: "「幻の焼きそばラリー」" },
  { type: "narrative", text: "――文化祭当日。" },
  { type: "cg", cgKey: "cg01" },
  { speaker: "misaki", jp: "蓮！ また十人ゴールしたよ！", zh: "蓮！又有十個人闖到終點了！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_001_misaki.m4a" },
  { speaker: "ren", jp: "十人！？", zh: "十個！？", audio: "assets/voice/chapter1/extra/voice_ch1_extra_002_ren.m4a" },
  { speaker: "toru", jp: "待て。焼きそばが追いつかない。", zh: "等一下，炒麵根本來不及做。", audio: "assets/voice/chapter1/extra/voice_ch1_extra_003_toru.m4a" },
  { speaker: "misaki", jp: "でも、ゴールした人には一人一つでしょ？", zh: "可是我們不是說好，每個闖到終點的人都有一份嗎？", audio: "assets/voice/chapter1/extra/voice_ch1_extra_004_misaki.m4a" },
  { speaker: "ren", jp: "そうだけど……こんなに来ると思わねえだろ！", zh: "是沒錯啦……誰知道會來這麼多人啊！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_005_ren.m4a" },
  { speaker: "toru", jp: "お前、『絶対こっちのほうが客来る』って言ってただろ。", zh: "你之前不是還說「這樣絕對會有更多人來」嗎？", audio: "assets/voice/chapter1/extra/voice_ch1_extra_006_toru.m4a" },
  { speaker: "ren", jp: "……来すぎなんだよ！", zh: "……也來太多了吧！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_007_ren.m4a" },
  { speaker: "misaki", jp: "あっ、またゴールした！", zh: "啊！又有人闖到終點了！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_008_misaki.m4a" },
  { speaker: "ren", jp: "白石、もっと速く焼け！", zh: "白石，再炒快一點！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_009_ren.m4a" },
  { speaker: "toru", jp: "鉄板には限界があるんだよ。", zh: "鐵板也是有極限的好嗎。", audio: "assets/voice/chapter1/extra/voice_ch1_extra_010_toru.m4a" },
  { speaker: "ren", jp: "じゃあ俺がそっちやる！", zh: "那我來弄你那邊！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_011_ren.m4a" },
  { speaker: "toru", jp: "待て、勝手に入れるな！", zh: "等等，不要擅自加進去！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_012_toru.m4a" },
  { speaker: "ren", jp: "なんでだよ！", zh: "為什麼啊！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_013_ren.m4a" },
  { speaker: "toru", jp: "まだ焼けてない！", zh: "那邊還沒熟！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_014_toru.m4a" },
  { speaker: "ren", jp: "先に言えよ！", zh: "你早點說啊！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_015_ren.m4a" },
  { speaker: "toru", jp: "見れば分かるだろ！", zh: "看就知道了吧！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_016_toru.m4a" },
  { speaker: "misaki", jp: "二人とも！ 次、五人！", zh: "你們兩個！下一批五個人！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_017_misaki.m4a" },
  { speaker: "dual", jp: "増えた！？", zh: "又增加了！？", audio: ["assets/voice/chapter1/extra/voice_ch1_extra_018_ren.m4a", "assets/voice/chapter1/extra/voice_ch1_extra_018_toru.m4a"] },
  { type: "time_passage", text: "【參加者的隊伍終於逐漸縮短。\n三人已經明顯筋疲力盡。】" },
  { speaker: "misaki", jp: "……あと一人！", zh: "……只剩一個人了！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_019_misaki.m4a" },
{ speaker: "ren", jp: "ほんとか！？", zh: "真的嗎！？", audio: "assets/voice/chapter1/extra/voice_ch1_extra_020_ren.m4a" },
{ speaker: "toru", jp: "今度こそ間違いないだろうな。", zh: "這次真的沒算錯吧。", audio: "assets/voice/chapter1/extra/voice_ch1_extra_021_toru.m4a" },
{ speaker: "misaki", jp: "たぶん！", zh: "大概！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_022_misaki.m4a" },
{ speaker: "toru", jp: "おい。", zh: "喂。", audio: "assets/voice/chapter1/extra/voice_ch1_extra_023_toru.m4a" },

{ type: "blackout" },
{ type: "narrative", text: "文化祭終了後" },
{ type: "cg", cgKey: "cg02" },

{ speaker: "misaki", jp: "…………完売！", zh: "…………全部賣完了！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_024_misaki.m4a" },
{ speaker: "ren", jp: "っしゃあああ！", zh: "好耶啊啊啊！", audio: "assets/voice/chapter1/extra/voice_ch1_extra_025_ren.m4a" },
{ speaker: "toru", jp: "…………終わった。", zh: "…………終於結束了。", audio: "assets/voice/chapter1/extra/voice_ch1_extra_026_toru.m4a" },

{ speaker: "ren", jp: "……もう焼きそば見たくねえ。", zh: "……我已經不想再看到炒麵了。", audio: "assets/voice/chapter1/extra/voice_ch1_extra_027_ren.m4a" },
  { speaker: "misaki", jp: "……私も。", zh: "……我也是。", audio: "assets/voice/chapter1/extra/voice_ch1_extra_028_misaki.m4a" },
  { speaker: "toru", jp: "だから言っただろ。", zh: "所以我早就說了吧。", audio: "assets/voice/chapter1/extra/voice_ch1_extra_029_toru.m4a" },
  { speaker: "ren", jp: "……でも、完売したぞ。", zh: "……可是，我們賣完了耶。", audio: "assets/voice/chapter1/extra/voice_ch1_extra_030_ren.m4a" },
  { speaker: "toru", jp: "もういい。黙れ。", zh: "夠了。閉嘴。", audio: "assets/voice/chapter1/extra/voice_ch1_extra_031_toru.m4a" },
  { type: "blackout" },
  { type: "if_end_title", title: "IF END", subtitle: "「幻の焼きそばラリー」" },
  { type: "if_end_text", text: "――という企画ではない。" }
];

const extraEventState = {
  active: false,
  stepIndex: 0,
  currentCgKey: null
};

const EXTRA_AUDIO = {
  seTrigger: "assets/se/se_extra_trigger.ogg",
  seTitle: "assets/se/se_extra_title.ogg",
  seImagination: "assets/se/se_imagination.ogg",
  bgmComedy: "assets/bgm/bgm_extra_comedy.ogg"
};

let extraBgmAudio = null;
let extraBgmFadeTimer = null;
const extraSePool = new Set();

function playExtraSe(path, onEnded = null) {
  if (!path) {
    if (typeof onEnded === "function") onEnded();
    return;
  }

  let cleanPath = path.startsWith("/") ? path.slice(1) : path;
  if (!cleanPath.startsWith("assets/")) {
    cleanPath = "assets/" + cleanPath;
  }

  const volume = (gameSettings.seVolume ?? 50) / 100;

  if (volume <= 0) {
    if (typeof onEnded === "function") onEnded();
    return;
  }

  try {
    const audio = new Audio(cleanPath);

extraSePool.add(audio);

audio.volume = volume;
audio.loop = false;

    let finished = false;

    const finishOnce = () => {
  if (finished) return;
  finished = true;

  extraSePool.delete(audio);

  audio.onended = null;
  audio.onerror = null;

      if (typeof onEnded === "function") {
        onEnded();
      }
    };

    audio.onended = finishOnce;
    audio.onerror = () => {
      console.error("[EXTRA SE] FILE ERROR:", cleanPath);
      finishOnce();
    };

    console.log("[EXTRA SE] load:", cleanPath);

    audio.play()
      .then(() => {
        console.log("[EXTRA SE] playing:", cleanPath);
      })
      .catch(err => {
        console.error("[EXTRA SE] PLAY FAILED:", cleanPath, err);
        finishOnce();
      });

  } catch (err) {
    console.error("[EXTRA SE] ERROR:", cleanPath, err);

    if (typeof onEnded === "function") {
      onEnded();
    }
  }
}

function playExtraBgm(path, fadeMs = 700) {
  if (!path) return;

  let cleanPath = path.startsWith("/") ? path.slice(1) : path;
  if (!cleanPath.startsWith("assets/")) {
    cleanPath = "assets/" + cleanPath;
  }

  if (extraBgmFadeTimer) {
    clearInterval(extraBgmFadeTimer);
    extraBgmFadeTimer = null;
  }

  if (extraBgmAudio) {
    try {
      extraBgmAudio.pause();
      extraBgmAudio.currentTime = 0;
    } catch (e) {}

    extraBgmAudio = null;
  }

  try {
    const audio = new Audio(cleanPath);

    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0;

    extraBgmAudio = audio;

    console.log("[EXTRA BGM] load:", cleanPath);

    audio.play()
      .then(() => {
        console.log("[EXTRA BGM] playing:", cleanPath);

        const targetVolume =
          Math.max(
            0,
            Math.min(
              1,
              (gameSettings.bgmVolume ?? 50) / 100
            )
          );

        if (fadeMs <= 0) {
          audio.volume = targetVolume;
          return;
        }

        const startTime = performance.now();

        extraBgmFadeTimer = setInterval(() => {
          const progress = Math.min(
            1,
            (performance.now() - startTime) / fadeMs
          );

          audio.volume = targetVolume * progress;

          if (progress >= 1) {
            clearInterval(extraBgmFadeTimer);
            extraBgmFadeTimer = null;
            audio.volume = targetVolume;
          }
        }, 40);
      })
      .catch(err => {
        console.error("[EXTRA BGM] PLAY FAILED:", cleanPath, err);
      });

  } catch (err) {
    console.error("[EXTRA BGM] ERROR:", cleanPath, err);
  }
}

function stopExtraBgm(fadeMs = 700) {
  const audio = extraBgmAudio;

  extraBgmAudio = null;

  if (extraBgmFadeTimer) {
    clearInterval(extraBgmFadeTimer);
    extraBgmFadeTimer = null;
  }

  if (!audio) return;

  const startVolume = audio.volume;

  if (fadeMs <= 0 || startVolume <= 0) {
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}
    return;
  }

  const startTime = performance.now();

  const timer = setInterval(() => {
    const progress = Math.min(
      1,
      (performance.now() - startTime) / fadeMs
    );

    audio.volume = Math.max(
      0,
      startVolume * (1 - progress)
    );

    if (progress >= 1) {
      clearInterval(timer);

      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {}
    }
  }, 40);
}


let extraEventBgmAudio = null;

function playExtraEventBgm(path, fadeMs = 700) {
  if (!path) return;

  if (extraEventBgmAudio) {
    extraEventBgmAudio.pause();
    extraEventBgmAudio = null;
  }

  const audio = new Audio(path);
  extraEventBgmAudio = audio;

  audio.loop = true;
  audio.volume = 0;

  const targetVolume = (gameSettings.bgmVolume ?? 50) / 100;

  audio.play().catch(err => {
    console.error("[EXTRA BGM] PLAY FAILED:", path, err);
  });

  const startTime = performance.now();

  function fadeIn(now) {
    if (extraEventBgmAudio !== audio) return;

    const progress = Math.min((now - startTime) / fadeMs, 1);
    audio.volume = targetVolume * progress;

    if (progress < 1) {
      requestAnimationFrame(fadeIn);
    }
  }

  requestAnimationFrame(fadeIn);
}

function stopExtraEventBgm(fadeMs = 700) {
  const audio = extraEventBgmAudio;
  if (!audio) return;

  const startVolume = audio.volume;
  const startTime = performance.now();

  function fadeOut(now) {
    if (extraEventBgmAudio !== audio) return;

    const progress = Math.min((now - startTime) / fadeMs, 1);
    audio.volume = startVolume * (1 - progress);

    if (progress < 1) {
      requestAnimationFrame(fadeOut);
    } else {
      audio.pause();
      audio.currentTime = 0;

      if (extraEventBgmAudio === audio) {
        extraEventBgmAudio = null;
      }
    }
  }

  requestAnimationFrame(fadeOut);
}

let parallelAudioInstances = [];

function playParallelVoices(paths) {
  stopParallelVoices();
  const currentVol = (gameSettings.voiceVolume ?? 50) / 100;
  if (!paths || paths.length === 0 || currentVol <= 0) return;

  paths.forEach(p => {
    let cleanPath = p.startsWith("/") ? p.slice(1) : p;
    if (!cleanPath.startsWith("assets/")) cleanPath = "assets/" + cleanPath;

    try {
      const audio = new Audio(cleanPath);
      audio.volume = currentVol;
      parallelAudioInstances.push(audio);
      audio.play().catch(err => {
        console.warn("[Parallel Audio Blocked]", err);
      });
    } catch (e) {}
  });
}

function stopParallelVoices() {
  parallelAudioInstances.forEach(audio => {
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.onended = null;
    } catch (e) {}
  });
  parallelAudioInstances = [];
}

function getExtraEventCgSource(cgKey) {
  const isLandscape = window.innerWidth >= window.innerHeight;
  if (cgKey === "cg01") {
    return isLandscape 
      ? "assets/cg/chapter1/cg_ch1_extra_yakisoba_day_landscape.webp"
      : "assets/cg/chapter1/cg_ch1_extra_yakisoba_day_portrait.webp";
  } else if (cgKey === "cg02") {
    return isLandscape
      ? "assets/cg/chapter1/cg_ch1_extra_yakisoba_evening_landscape.webp"
      : "assets/cg/chapter1/cg_ch1_extra_yakisoba_evening_portrait.webp";
  }
  return "";
}

/* =========================================================
   EXTRA EVENT STAGED PRELOAD
   ========================================================= */

const extraEventPreloadState = {
  firstHalf: false,
  secondHalf: false
};

function collectExtraEventVoiceResources(
  startNumber,
  endNumber
) {
  const resources = [];

  EXTRA_EVENT_STEPS.forEach(step => {
    if (!step.audio) return;

    const paths =
      Array.isArray(step.audio)
        ? step.audio
        : [step.audio];

    paths.forEach(path => {
      const match =
        path.match(
          /voice_ch1_extra_(\d{3})_/
        );

      if (!match) return;

      const number =
        Number(match[1]);

      if (
        number >= startNumber &&
        number <= endNumber
      ) {
        resources.push({
          type: "audio",
          path
        });
      }
    });
  });

  return resources;
}


function preloadExtraEventFirstHalf() {
  if (
    extraEventPreloadState.firstHalf
  ) {
    return;
  }

  extraEventPreloadState.firstHalf = true;

  const resources = [
    {
      type: "image",
      path: getExtraEventCgSource("cg01")
    },

    {
      type: "audio",
      path: EXTRA_AUDIO.seTitle
    },

    {
      type: "audio",
      path: EXTRA_AUDIO.seImagination
    },

    {
      type: "audio",
      path: EXTRA_AUDIO.bgmComedy
    },

    ...collectExtraEventVoiceResources(
      1,
      23
    )
  ];

  preloadResourceBatch(resources)
    .catch(err => {
      console.warn(
        "[EXTRA PRELOAD FIRST HALF] failed:",
        err
      );
    });
}


function preloadExtraEventSecondHalf() {
  if (
    extraEventPreloadState.secondHalf
  ) {
    return;
  }

  extraEventPreloadState.secondHalf = true;

  const resources = [
    {
      type: "image",
      path: getExtraEventCgSource("cg02")
    },

    ...collectExtraEventVoiceResources(
      24,
      31
    )
  ];

  preloadResourceBatch(resources)
    .catch(err => {
      console.warn(
        "[EXTRA PRELOAD SECOND HALF] failed:",
        err
      );
    });
}

function handleExtraEventResize() {
  if (!extraEventState.active) return;
  if (!extraEventState.currentCgKey) return;
  const cgUrl = getExtraEventCgSource(extraEventState.currentCgKey);
  if (elements.bgLayer && cgUrl) {
    elements.bgLayer.style.backgroundImage = `url('${cgUrl}')`;
    elements.bgLayer.style.backgroundSize = "cover";
    elements.bgLayer.style.backgroundPosition = "center";
    elements.bgLayer.style.backgroundColor = "";
  }
}

window.addEventListener('resize', handleExtraEventResize);

function startExtraEvent() {
  extraEventState.active = true;
  extraEventState.stepIndex = 0;
  extraEventState.currentCgKey = null;

  if (elements.quizOverlay) elements.quizOverlay.classList.add('hidden');
  if (elements.feedbackModal) elements.feedbackModal.classList.add('hidden');

  const hudConfigBtn = document.getElementById('hud-config-btn');
  const hudGameExitBtn = document.getElementById('btn-game-exit');
  if (hudConfigBtn) hudConfigBtn.style.display = 'none';
  if (hudGameExitBtn) hudGameExitBtn.style.display = 'none';

  renderExtraEventStep();
}

function renderExtraEventStep() {
  stopAllTypewriters();
  stopActiveAudio("extraEventStep", "extra");
  stopParallelVoices();
  removeReplayAudioButton("extraEventStep");

  const step =
    EXTRA_EVENT_STEPS[
      extraEventState.stepIndex
    ];

  /*
    Extra Event CG 持續顯示
    cg step 設定 currentCgKey 後，
    後續角色台詞也持續重新套用 CG
  */
  if (
    extraEventState.currentCgKey &&
    step &&
    step.type !== "blackout"
  ) {
    const currentCgUrl =
      getExtraEventCgSource(
        extraEventState.currentCgKey
      );

    if (
      elements.bgLayer &&
      currentCgUrl
    ) {
      elements.bgLayer.style.backgroundImage =
        `url('${currentCgUrl}')`;

      elements.bgLayer.style.backgroundSize =
        "cover";

      elements.bgLayer.style.backgroundPosition =
        "center";

      elements.bgLayer.style.backgroundColor =
        "";

      elements.bgLayer.classList.remove(
        "dimmed",
        "memory"
      );
    }
  }

  if (!step) {
    finishExtraEvent();
    return;
  }

  // Hide standing sprites during Extra Event
  if (elements.spriteLeft) {
    elements.spriteLeft.classList.add(
      "hidden"
    );
  }

  if (elements.spriteCenter) {
    elements.spriteCenter.classList.add(
      "hidden"
    );
  }

  if (elements.spriteRight) {
    elements.spriteRight.classList.add(
      "hidden"
    );
  }

  /* =========================================================
     CG
     ========================================================= */

  if (step.type === "cg") {
    extraEventState.currentCgKey =
      step.cgKey;

    // CG01 開始時播放 Extra Event comedy BGM
    if (step.cgKey === "cg01") {
      playExtraBgm(
        EXTRA_AUDIO.bgmComedy
      );
    }

    const cgUrl =
      getExtraEventCgSource(
        step.cgKey
      );

    if (
      elements.bgLayer &&
      cgUrl
    ) {
      elements.bgLayer.style.backgroundImage =
        `url('${cgUrl}')`;

      elements.bgLayer.style.backgroundSize =
        "cover";

      elements.bgLayer.style.backgroundPosition =
        "center";

      elements.bgLayer.style.backgroundColor =
        "";

      elements.bgLayer.classList.remove(
        "dimmed",
        "memory"
      );
    }

    extraEventState.stepIndex++;
    renderExtraEventStep();
    return;
  }

  /* =========================================================
     BLACKOUT
     ========================================================= */

  if (step.type === "blackout") {
    extraEventState.currentCgKey = null;

    if (elements.bgLayer) {
      elements.bgLayer.style.backgroundImage =
        "none";

      elements.bgLayer.style.backgroundColor =
        "#000000";
    }

    if (elements.bgNameTag) {
      elements.bgNameTag.innerText = "";
    }

    if (elements.speakerName) {
      elements.speakerName.innerText = "";
    }

    if (elements.speakerTitle) {
      elements.speakerTitle.innerText = "";
    }

    if (elements.vnNameplate) {
      elements.vnNameplate.style.backgroundColor =
        "transparent";
    }

    if (elements.dialogueJp) {
      elements.dialogueJp.innerHTML = "";
      elements.dialogueJp.style.display =
        "none";
    }

    if (elements.dialogueZh) {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display =
        "none";
    }

    extraEventState.stepIndex++;
    renderExtraEventStep();
    return;
  }

  // ↓ 你原本 renderExtraEventStep()
  // blackout 後面的 title_card / narrative /
  // dialogue / if_end 等程式碼繼續接在這裡

  if (step.type === "title_card") {
  playExtraSe(EXTRA_AUDIO.seTitle);

    if (elements.bgNameTag) elements.bgNameTag.innerText = "【EXTRA EVENT】";
    if (elements.speakerName) elements.speakerName.innerText = step.title;
    if (elements.speakerTitle) elements.speakerTitle.innerText = "特別劇本";
    if (elements.vnNameplate) elements.vnNameplate.style.backgroundColor = "#e84118";

    if (elements.dialogueJp) {
      elements.dialogueJp.style.display = "block";
      typeWriterText(elements.dialogueJp, step.subtitle);
    }
    if (elements.dialogueZh) {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display = "none";
    }
    showScreen('gameplay');
    return;
  }

  if (step.type === "narrative") {

    if (elements.bgNameTag) elements.bgNameTag.innerText = "【場景】";
    if (elements.speakerName) elements.speakerName.innerText = "旁白";
    if (elements.speakerTitle) elements.speakerTitle.innerText = "";
    if (elements.vnNameplate) elements.vnNameplate.style.backgroundColor = "#718093";

    if (elements.dialogueJp) {
      elements.dialogueJp.style.display = "block";
      typeWriterText(elements.dialogueJp, step.text);
    }
    if (elements.dialogueZh) {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display = "none";
    }
    showScreen('gameplay');
    return;
  }

  if (step.type === "time_passage") {
    if (elements.bgNameTag) elements.bgNameTag.innerText = "【時間経過】";
    if (elements.speakerName) elements.speakerName.innerText = "旁白";
    if (elements.speakerTitle) elements.speakerTitle.innerText = "";
    if (elements.vnNameplate) elements.vnNameplate.style.backgroundColor = "#718093";

    if (elements.dialogueJp) {
      elements.dialogueJp.style.display = "block";
      typeWriterText(elements.dialogueJp, step.text);
    }
    if (elements.dialogueZh) {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display = "none";
    }
    showScreen('gameplay');
    return;
  }

  if (step.type === "if_end_title") {
    if (elements.bgNameTag) elements.bgNameTag.innerText = "【IF END】";
    if (elements.speakerName) elements.speakerName.innerText = step.title;
    if (elements.speakerTitle) elements.speakerTitle.innerText = "特別結局";
    if (elements.vnNameplate) elements.vnNameplate.style.backgroundColor = "#e84118";

    if (elements.dialogueJp) {
      elements.dialogueJp.style.display = "block";
      typeWriterText(elements.dialogueJp, step.subtitle);
    }
    if (elements.dialogueZh) {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display = "none";
    }
    showScreen('gameplay');
    return;
  }

  if (step.type === "if_end_text") {
    if (elements.bgNameTag) elements.bgNameTag.innerText = "【IF END】";
    if (elements.speakerName) elements.speakerName.innerText = "特別結局";
    if (elements.speakerTitle) elements.speakerTitle.innerText = "「幻の焼きそばラリー」";
    if (elements.vnNameplate) elements.vnNameplate.style.backgroundColor = "#e84118";

    if (elements.dialogueJp) {
      elements.dialogueJp.style.display = "block";
      typeWriterText(elements.dialogueJp, step.text);
    }
    if (elements.dialogueZh) {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display = "none";
    }
    showScreen('gameplay');
    return;
  }

  // Normal Dialogue Step
  const speaker = CHARACTERS[step.speaker] || { name: "蓮・透", title: "聯合演出", color: "#e84118" };
  if (elements.speakerName) elements.speakerName.innerText = speaker.name;
  if (elements.speakerTitle) elements.speakerTitle.innerText = speaker.title;
  if (elements.vnNameplate) elements.vnNameplate.style.backgroundColor = speaker.color;

  if (elements.dialogueJp) {
    elements.dialogueJp.style.display = "block";
    typeWriterText(elements.dialogueJp, step.jp);
  }

  const subtitlesEnabled = ((gameSettings.chineseSubtitle || "on") === 'on');
  if (elements.dialogueZh) {
    if (subtitlesEnabled && step.zh) {
      elements.dialogueZh.innerText = formatTextWithPlayer(step.zh);
      elements.dialogueZh.style.display = "block";
    } else {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display = "none";
    }
  }

  if (step.speaker === "dual" && Array.isArray(step.audio)) {
    playParallelVoices(step.audio);
  } else if (step.audio) {
    playVoiceAudio(step.audio, "extra_step_" + extraEventState.stepIndex);
  }

  showScreen('gameplay');
}

function advanceExtraEvent() {
  const currentStep =
    EXTRA_EVENT_STEPS[extraEventState.stepIndex];

  // 「――文化祭当日。」→ imagination SE → CG01
  if (
    currentStep?.type === "narrative" &&
    currentStep.text === "――文化祭当日。"
  ) {
    playExtraSe(EXTRA_AUDIO.seImagination);

    extraEventState.stepIndex++;
    renderExtraEventStep();
    return;
  }

  // 023 結束後，進入 blackout 前淡出 Extra Event BGM
  if (
    currentStep?.audio ===
    "assets/voice/chapter1/extra/voice_ch1_extra_023_toru.m4a"
  ) {
    stopExtraBgm(700);
  }

  extraEventState.stepIndex++;

  if (
    extraEventState.stepIndex >=
    EXTRA_EVENT_STEPS.length
  ) {
    finishExtraEvent();
  } else {
    renderExtraEventStep();
  }
}

function finishExtraEvent() {
  stopExtraBgm(0);

  extraEventState.active = false;
  extraEventState.stepIndex = 0;
  extraEventState.currentCgKey = null;

  // Extra Event 已正常完成
  gameState.extraEventPending = false;

  stopAllTypewriters();
  stopActiveAudio("finishExtraEvent", "extra");
  stopParallelVoices();
  removeReplayAudioButton("finishExtraEvent");

  if (elements.bgLayer) {
    elements.bgLayer.style.backgroundImage = "";
    elements.bgLayer.style.backgroundColor = "";
    elements.bgLayer.style.backgroundSize = "";
    elements.bgLayer.style.backgroundPosition = "";
  }
  if (elements.bgNameTag) elements.bgNameTag.innerText = "";
  if (elements.speakerName) elements.speakerName.innerText = "";
  if (elements.speakerTitle) elements.speakerTitle.innerText = "";
  if (elements.dialogueJp) {
    elements.dialogueJp.innerHTML = "";
    elements.dialogueJp.style.display = "block";
  }
  if (elements.dialogueZh) {
    elements.dialogueZh.innerHTML = "";
    elements.dialogueZh.style.display = "none";
  }

  updateHUD();
  if (elements.feedbackModal) {
    elements.feedbackModal.classList.remove('hidden');
  }
  saveGameData();
}

/* ==========================================================================
   2. 跨章節流程資料結構
   ========================================================================== */
const CHAPTER_DATA = {
  1: {
    title: "第一章：誰把我們的班級交給這兩個人了？",
    totalQuizzes: 5,
    steps: [
      { id: "ch1_s01_001_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "normal", position: "left", jp: "おい、俺のプリン知らねえ？", zh: "喂，你有沒有看到我的布丁？", audio: "/assets/voice/chapter1/ch1_s01_001_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_002_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "normal", position: "right", jp: "知らない。", zh: "不知道。", audio: "/assets/voice/chapter1/ch1_s01_002_toru.m4a", listeningSection: 1 },
      { id: "ch1_s01_003_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "suspect", position: "left", jp: "ほんとか？", zh: "真的嗎？", audio: "/assets/voice/chapter1/ch1_s01_003_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_004_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "normal", position: "right", jp: "お前のプリンがどこにあるかなんて、俺が知るわけないだろ。", zh: "你的布丁在哪裡我怎麼可能知道？", audio: "/assets/voice/chapter1/ch1_s01_004_toru.m4a", listeningSection: 1 },
      { id: "ch1_s01_005_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "suspect", position: "left", jp: "……じゃあ、なんで口の周りにカラメルついてんだよ。", zh: "……那為什麼你嘴邊沾了焦糖？", audio: "/assets/voice/chapter1/ch1_s01_005_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_006_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "normal", position: "right", jp: "これは昨日のだ。", zh: "這是昨天的。", audio: "/assets/voice/chapter1/ch1_s01_006_toru.m4a", listeningSection: 1 },
      { id: "ch1_s01_007_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "surprised", position: "left", jp: "昨日からついてんのかよ！", zh: "從昨天就一直沾在上面喔！", audio: "/assets/voice/chapter1/ch1_s01_007_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_008_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "roast", position: "right", jp: "そこに驚くのか。", zh: "你竟然對這個感到驚訝啊。", audio: "/assets/voice/chapter1/ch1_s01_008_toru.m4a", listeningSection: 1 },
      { id: "ch1_s01_009_player", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "player", expression: "溫和微笑", position: "center", jp: "……ふふっ。", zh: "……呵呵。", audio: null, listeningSection: 1 },
      { id: "ch1_s01_009_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "surprised", position: "left", jp: "……誰だ、お前。", zh: "……你誰啊。", audio: "/assets/voice/chapter1/ch1_s01_009_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_010_player", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "player", expression: "溫和微笑", position: "center", jp: "えっと……今日からこのクラスに転校してきたんだけど……。", zh: "那個……我從今天起轉到這個班級……。", audio: null, listeningSection: 1 },
      { id: "ch1_s01_011_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "sigh", position: "right", jp: "ああ、転校生か。悪いな、初日からこんなとこ見せて。", zh: "啊，轉學生啊。抱歉啊，第一天就讓你看到這種場面。", audio: "/assets/voice/chapter1/ch1_s01_011_toru.m4a", listeningSection: 1 },
      { id: "ch1_s01_012_player", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "player", expression: "困惑觀察", position: "center", jp: "……。", zh: "……。", audio: null, listeningSection: 1 },
      { id: "ch1_s01_013_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "throwshade", position: "left", jp: "なんでお前が謝るんだよ。あと、プリン返せ。", zh: "為什麼你要幫忙道歉啊。還有，把布丁還來。", audio: "/assets/voice/chapter1/ch1_s01_013_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_014_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "sigh", position: "right", jp: "だから、俺じゃないって。", zh: "所以就說不是我啦。", audio: "/assets/voice/chapter1/ch1_s01_014_toru.m4a", listeningSection: 1 },
      { type: "quiz", id: "ch1_q1", listeningSection: 1, nextStepIndex: 15 },

      { id: "ch1_s02_015_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "normal", position: "center", jp: "来月の文化祭ですが、このクラスでも一つ、クラス企画を決めてもらいます。", zh: "關於下個月的文化祭，希望你們班也決定一項班級企劃。", audio: "/assets/voice/chapter1/ch1_s02_015_sato.m4a", listeningSection: 2 },
      { id: "ch1_s02_016_misaki", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "misaki", expression: "excited", position: "center", jp: "先生、何でもいいんですか？", zh: "老師，什麼都可以嗎？", audio: "/assets/voice/chapter1/ch1_s02_016_misaki.m4a", listeningSection: 2 },
      { id: "ch1_s02_017_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "normal", position: "center", jp: "予算と安全面に問題がなければ、基本的には自由です。ただし、飲食物を扱う企画は事前に許可が必要です。", zh: "只要在預算和安全面上沒問題，基本上是自由的。不過，涉及飲食的企劃需要事前許可。", audio: "/assets/voice/chapter1/ch1_s02_017_sato.m4a", listeningSection: 2 },
      { id: "ch1_s02_018_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "normal", position: "left", jp: "じゃ、やらなくてよくね？", zh: "那不辦不就好了？", audio: "/assets/voice/chapter1/ch1_s02_018_ren.m4a", listeningSection: 2 },
      { id: "ch1_s02_019_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "scarysmile", position: "center", jp: "鬼塚くん。今、何とおっしゃいましたか？", zh: "鬼塚同學。你剛剛說了什麼？", audio: "/assets/voice/chapter1/ch1_s02_019_sato.m4a", listeningSection: 2 },
      { id: "ch1_s02_020_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "embarrased", position: "left", jp: "……楽しみです、って。", zh: "……我是說我很期待。", audio: "/assets/voice/chapter1/ch1_s02_020_ren.m4a", listeningSection: 2 },
      { id: "ch1_s02_021_toru", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "toru", expression: "roast", position: "right", jp: "無理があるだろ。", zh: "這太勉強了吧。", audio: "/assets/voice/chapter1/ch1_s02_021_toru.m4a", listeningSection: 2 },
      { id: "ch1_s02_022_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "smile", position: "center", jp: "では、企画の内容については今日中にある程度まとめておいてください。", zh: "那麼，關於企劃內容請在今天之內大致整理好。", audio: "/assets/voice/chapter1/ch1_s02_022_sato.m4a", listeningSection: 2 },
      { id: "ch1_s02_023_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "surprised", position: "left", jp: "今日中？", zh: "今天之內？", audio: "/assets/voice/chapter1/ch1_s02_023_ren.m4a", listeningSection: 2 },
      { id: "ch1_s02_024_toru", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "toru", expression: "sigh", position: "right", jp: "……嫌な予感がする。", zh: "……有種不好的預感。", audio: "/assets/voice/chapter1/ch1_s02_024_toru.m4a", listeningSection: 2 },
      { id: "ch1_s02_025_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "smile", position: "center", jp: "はい。それから――鬼塚くんと白石くん。", zh: "是的。還有——鬼塚同學和白石同學。", audio: "/assets/voice/chapter1/ch1_s02_025_sato.m4a", listeningSection: 2 },
      { id: "ch1_s02_026_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "surprised", position: "left", jp: "え、俺ら？", zh: "咦，我們？", audio: "/assets/voice/chapter1/ch1_s02_026_ren.m4a", listeningSection: 2 },
      { id: "ch1_s02_027_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "smile", position: "center", jp: "今日の放課後、二人で企画書を職員室まで持ってきてください。", zh: "今天放學後，請兩人把企劃書帶到教職員室。", audio: "/assets/voice/chapter1/ch1_s02_027_sato.m4a", listeningSection: 2 },
      { type: "quiz", id: "ch1_q2", listeningSection: 2, nextStepIndex: 28 },

      { id: "ch1_s02_028_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "embarrased", position: "left", jp: "いや、それとこれとは――", zh: "不是啊，這跟那兩碼事——", audio: "/assets/voice/chapter1/ch1_s02_028_ren.m4a", listeningSection: 3 },
      { id: "ch1_s02_029_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "scarysmile", position: "center", jp: "はい。先ほど『やらなくていい』とおっしゃるくらいですから、ずいぶん余裕があるのかと思いまして。", zh: "是的。既然你剛才說『不辦也罷』，我想你應該相當游刃有餘才對。", audio: "/assets/voice/chapter1/ch1_s02_029_sato.m4a", listeningSection: 3 },
      { id: "ch1_s02_030_toru", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "toru", expression: "sigh", position: "right", jp: "先生、笑顔で仕返しするのやめてもらえますか。", zh: "老師，可以請你別用笑容報復嗎。", audio: "/assets/voice/chapter1/ch1_s02_030_toru.m4a", listeningSection: 3 },
      { id: "ch1_s02_031_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "smile", position: "center", jp: "仕返しではありません。適材適所です。", zh: "這不是報復。這是適才所用。", audio: "/assets/voice/chapter1/ch1_s02_031_sato.m4a", listeningSection: 3 },
      { id: "ch1_s02_032_toru", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "toru", expression: "roast", position: "right", jp: "絶対違うだろ。", zh: "絕對才怪。", audio: "/assets/voice/chapter1/ch1_s02_032_toru.m4a", listeningSection: 3 },
      { type: "quiz", id: "ch1_q3", listeningSection: 3, nextStepIndex: 34 },

      { id: "ch1_s03_033_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "smile", position: "center", jp: "転校生さんも、よかったら一緒に考えてみませんか？", zh: "轉學生同學，如果不介意的話要不要也一起想想看？", audio: "/assets/voice/chapter1/ch1_s03_033_sato.m4a", listeningSection: 4 },
      { id: "ch1_s03_034_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "surprised", position: "left", jp: "いや、こいつ今日来たばっかだろ。", zh: "不對啊，這傢伙今天才剛來耶。", audio: "/assets/voice/chapter1/ch1_s03_034_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_035_toru", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "toru", expression: "roast", position: "right", jp: "お前だって、今日まで何も考えてなかっただろ。", zh: "你還不是一樣，直到今天什麼都沒想。", audio: "/assets/voice/chapter1/ch1_s03_035_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_036_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "smile", position: "center", jp: "では、鬼塚くん、白石くん、美咲さん、それから転校生さんの四人でお願いしますね。", zh: "那麼，就拜託鬼塚同學、白石同學、美咲同學，還有轉學生同學四個人了。", audio: "/assets/voice/chapter1/ch1_s03_036_sato.m4a", listeningSection: 4 },
      { id: "ch1_s03_037_player", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "player", expression: "困惑觀察", position: "center", jp: "えっ……？", zh: "咦……？", audio: null, listeningSection: 4 },
      { id: "ch1_s03_038_toru", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "toru", expression: "smirk", position: "right", jp: "ご愁傷様。", zh: "真是辛苦啦。", audio: "/assets/voice/chapter1/ch1_s03_038_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_039_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "angry", position: "left", jp: "うるせえな！", zh: "吵死了！", audio: "/assets/voice/chapter1/ch1_s03_039_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_040_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "angry", position: "left", jp: "お前、他人事だと思ってんだろ！", zh: "你這傢伙，覺得跟自己無關對吧！", audio: "/assets/voice/chapter1/ch1_s03_040_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_041_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "normal", position: "right", jp: "他人事じゃないから、今ここにいるんだよ。", zh: "就是因為跟自己有關，我現在才站在這裡啊。", audio: "/assets/voice/chapter1/ch1_s03_041_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_042_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "normal", position: "left", jp: "とりあえず、食べ物でよくね？ 焼きそばとか。", zh: "總之，弄吃的不是很好嗎？像是炒麵之類的。", audio: "/assets/voice/chapter1/ch1_s03_042_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_043_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "sigh", position: "right", jp: "さっき先生の話聞いてなかったのか？", zh: "你剛才沒聽老師說話嗎？", audio: "/assets/voice/chapter1/ch1_s03_043_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_044_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "normal", position: "left", jp: "聞いてたよ。", zh: "我有聽啊。", audio: "/assets/voice/chapter1/ch1_s03_044_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_045_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "じゃあ、調理の許可は？ 設備は？ 予算は？", zh: "那烹飪許可呢？設備呢？預算呢？", audio: "/assets/voice/chapter1/ch1_s03_045_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_046_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "embarrased", position: "left", jp: "……これから考える。", zh: "……現在開始想。", audio: "/assets/voice/chapter1/ch1_s03_046_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_047_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "roast", position: "right", jp: "つまり何も考えてないんだな。", zh: "也就是說你根本什麼都沒想嘛。", audio: "/assets/voice/chapter1/ch1_s03_047_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_048_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "……お前、楽しいこと考える才能ないな。", zh: "……你這傢伙，真沒想快樂事情的才能。", audio: "/assets/voice/chapter1/ch1_s03_048_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_049_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "roast", position: "right", jp: "お前には現実を見る才能がないけどな。", zh: "不過你倒是沒有面對現實的才能就是了。", audio: "/assets/voice/chapter1/ch1_s03_049_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_050_player", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "じゃあ……校内を回りながら、いくつかのミッションに挑戦するのはどう？", zh: "那……邊參觀校園邊挑戰幾個任務怎麼樣？", audio: null, listeningSection: 4 },
      { id: "ch1_s03_051_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "suspect", position: "left", jp: "ミッション？", zh: "任務？", audio: "/assets/voice/chapter1/ch1_s03_051_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_052_player", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "うん。校內的何か所かに問題とかミッションを用意して、順番に回ってもらうとか。", zh: "對啊。在校內好幾個地方準備題目或任務，讓大家依序去闖關之類的。", audio: null, listeningSection: 4 },
      { id: "ch1_s03_053_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "スタンプラリーみたいな感じか。", zh: "像是集章闖關的感覺嗎。", audio: "/assets/voice/chapter1/ch1_s03_053_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_054_player", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "そうそう。食べ物みたいに調理もいらないし。", zh: "對對。又不像食物那樣需要烹調。", audio: null, listeningSection: 4 },
      { type: "quiz", id: "ch1_q4", listeningSection: 4, nextStepIndex: 57 },

      { id: "ch1_s03_055_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "smile", position: "left", jp: "……それ、ちょっと面白そうじゃね？", zh: "……這個，聽起來好像挺有趣的不是嗎？", audio: "/assets/voice/chapter1/ch1_s03_055_ren.m4a", listeningSection: 5 },
      { id: "ch1_s03_056_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "smirk", position: "right", jp: "へえ。お前が人の案を素直に褒めるなんて珍しいな。", zh: "這，你竟然會坦率稱讚別人的點子，真難得。", audio: "/assets/voice/chapter1/ch1_s03_056_toru.m4a", listeningSection: 5 },
      { id: "ch1_s03_057_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "suspect", position: "left", jp: "何だよ、それ。", zh: "幹嘛啦。", audio: "/assets/voice/chapter1/ch1_s03_057_ren.m4a", listeningSection: 5 },
      { id: "ch1_s03_058_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "roast", position: "right", jp: "いつもなら、まず文句言うだろ。", zh: "照常理你應該先抱怨才對。", audio: "/assets/voice/chapter1/ch1_s03_058_toru.m4a", listeningSection: 5 },
      { id: "ch1_s03_059_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "angry", position: "left", jp: "言わねえよ！", zh: "才沒有咧！", audio: "/assets/voice/chapter1/ch1_s03_059_ren.m4a", listeningSection: 5 },
      { id: "ch1_s03_060_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "normal", position: "right", jp: "言う。", zh: "會有。", audio: "/assets/voice/chapter1/ch1_s03_060_toru.m4a", listeningSection: 5 },
      { id: "ch1_s03_061_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "angry", position: "left", jp: "言わねえって！", zh: "就說才沒有！", audio: "/assets/voice/chapter1/ch1_s03_061_ren.m4a", listeningSection: 5 },
      { id: "ch1_s03_062_player", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "……ふふっ。", zh: "……呵呵。", audio: null, listeningSection: 5 },
      { id: "ch1_s03_063_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "embarrased", position: "left", jp: "お前まで笑うな！", zh: "連你也笑我！", audio: "/assets/voice/chapter1/ch1_s03_063_ren.m4a", listeningSection: 5 },
      { type: "quiz", id: "ch1_q5", listeningSection: 5, nextStepIndex: -1 }
    ]
  }
};

/* =========================================================
   CHAPTER RESOURCE COLLECTOR
   ========================================================= */

function collectListeningSectionResources(
  chapterNumber,
  sectionNumber
) {
  const chapterData =
    CHAPTER_DATA[chapterNumber];

  if (!chapterData) {
    return [];
  }

  const resources = [];

  const sectionSteps =
    chapterData.steps.filter(
      step =>
        step.type === "dialogue" &&
        step.listeningSection === sectionNumber
    );

  sectionSteps.forEach(step => {

    /* Background */

    if (step.bg) {
      const bgPath =
        BACKGROUND_MAP[step.bg];

      if (bgPath) {
        resources.push({
          type: "image",
          path: bgPath
        });
      }
    }


    /* Character Sprite */

    if (
      step.speaker &&
      step.speaker !== "player"
    ) {
      const charMap =
        CHARACTER_SPRITE_MAP[
          step.speaker
        ];

      if (charMap) {
        const spritePath =
          charMap[step.expression] ||
          charMap["標準"];

        if (spritePath) {
          resources.push({
            type: "image",
            path: spritePath
          });
        }
      }
    }


    /* Voice */

    if (step.audio) {
      resources.push({
        type: "audio",
        path: step.audio
      });
    }
  });

  return resources;
}

/* =========================================================
   INITIAL GAME RESOURCES
   TAP TO START 後第一批必要資源
   ========================================================= */

function getInitialGameResources() {
  const resources = [];

  /* =========================================================
     CHAPTER 1
     全部 Listening Section 一次載入
     會包含：
     - Background
     - Character Sprite
     - Voice 001–063
     ========================================================= */

  for (let section = 1; section <= 5; section++) {
    resources.push(
      ...collectListeningSectionResources(
        1,
        section
      )
    );
  }


  /* =========================================================
     MAIN STORY AUDIO
     BGM / Ambient / SE 全部一次載入
     ========================================================= */

  resources.push(
    {
      type: "audio",
      path: MAIN_AUDIO.bgmDaily
    },
    {
      type: "audio",
      path: MAIN_AUDIO.bgmSchoolDay
    },
    {
      type: "audio",
      path: MAIN_AUDIO.bgmNewIdea
    },

    {
      type: "audio",
      path: MAIN_AUDIO.ambSchoolMorning
    },

    // Q1 → 015 的上課鐘聲
    // 手機版特別重要，必須在遊戲開始前完成
    {
      type: "audio",
      path: MAIN_AUDIO.seSchoolBell
    },

    {
      type: "audio",
      path: MAIN_AUDIO.seChoiceOpen
    },
    {
      type: "audio",
      path: MAIN_AUDIO.seChoiceSelect
    },
    {
      type: "audio",
      path: MAIN_AUDIO.seCorrect
    },
    {
      type: "audio",
      path: MAIN_AUDIO.seWrong
    },
    {
      type: "audio",
      path: MAIN_AUDIO.seChapterClear
    }
  );


  /* =========================================================
     EXTRA EVENT
     CG01 / CG02
     Voice 001–031
     BGM / SE
     ========================================================= */

  resources.push(
    {
      type: "image",
      path: getExtraEventCgSource("cg01")
    },
    {
      type: "image",
      path: getExtraEventCgSource("cg02")
    },

    {
      type: "audio",
      path: EXTRA_AUDIO.seTrigger
    },
    {
      type: "audio",
      path: EXTRA_AUDIO.seTitle
    },
    {
      type: "audio",
      path: EXTRA_AUDIO.seImagination
    },
    {
      type: "audio",
      path: EXTRA_AUDIO.bgmComedy
    },

    ...collectExtraEventVoiceResources(
      1,
      31
    )
  );


  /* =========================================================
     preloadResourceBatch() 本身會自動去除重複 path
     所以這裡不需要另外 dedupe
     ========================================================= */

  return resources;
}

async function preloadInitialGameResources(
  onProgress = null
) {
  const resources =
    getInitialGameResources();

  await preloadResourceBatch(
    resources,
    onProgress
  );
}

/* =========================================================
   STAGED BACKGROUND PRELOAD
   遊戲進行中分段預載下一個 Listening Section
   ========================================================= */

const stagedPreloadState = {
  sections: new Set()
};

function preloadListeningSectionInBackground(
  chapterNumber,
  sectionNumber
) {
  if (!chapterNumber || !sectionNumber) {
    return;
  }

  const key =
    `${chapterNumber}:${sectionNumber}`;

  if (
    stagedPreloadState.sections.has(key)
  ) {
    return;
  }

  stagedPreloadState.sections.add(key);

  const resources =
    collectListeningSectionResources(
      chapterNumber,
      sectionNumber
    );

  if (resources.length === 0) {
    return;
  }

  preloadResourceBatch(resources)
    .catch(err => {
      console.warn(
        "[STAGED PRELOAD] failed:",
        key,
        err
      );
    });
}


function preloadNextListeningSection(
  currentSection
) {
  const chapterNumber =
    gameState.currentChapter || 1;

  const nextSection =
    currentSection + 1;

  const chapterData =
    CHAPTER_DATA[chapterNumber];

  if (!chapterData) {
    return;
  }

  const hasNextSection =
    chapterData.steps.some(
      step =>
        step.type === "dialogue" &&
        step.listeningSection === nextSection
    );

  if (!hasNextSection) {
    return;
  }

  preloadListeningSectionInBackground(
    chapterNumber,
    nextSection
  );
}

/* ==========================================================================
   3. 全章節題目合集
   ========================================================================== */
const QUIZZES = {
  "ch1_q1": {
    quizNumber: 1, type: "聽力理解任務",
    section: 1,
    question: "蓮が驚いたのは、なぜですか。",
    trustTarget: "toru",
    options: [
      { text: "A. 透が蓮のプリンを食べたから。", isCorrect: false },
      { text: "B. 透が昨日から口の周りにカラメルをつけたままだったから。", isCorrect: true },
      { text: "C. 自分のプリンが教室になかったから。", isCorrect: false },
      { text: "D. 転校生にプリンのことを聞かれたから。", isCorrect: false }
    ],
    feedback: {
      correct: {
        title: "正解！ (B)", story: "你精準聽懂了對話中的關鍵細節。",
        jpOriginal: "昨日からついてんのかよ！", zhTrans: "從昨天就一直沾在上面喔！",
        words: "カラメル(焦糖)、驚く(驚訝)", explanation: "蓮對於透從昨天到今天嘴邊一直留著焦糖感到極度震驚。"
      },
      wrong: {
        title: "不正解！ (正確答案為 B)", story: "稍微有些混淆了對話內容哦。",
        jpOriginal: "昨日からついてんのかよ！", zhTrans: "從昨天就一直沾在上面喔！",
        words: "カラメル(焦糖)、驚く(驚訝)", explanation: "正確答案為 B，蓮是驚訝於透竟然把焦糖留了一整天。"
      }
    }
  },
  "ch1_q2": {
    quizNumber: 2, type: "聽力理解任務",
    section: 2,
    question: "佐藤先生の説明と合っているものはどれですか。",
    trustTarget: "ren",
    options: [
      { text: "A. 蓮と透は、今日の放課後に企画書を提出することになった。", isCorrect: true },
      { text: "B. 明日の放課後、クラス全員で企画書を作ることになった。", isCorrect: false },
      { text: "C. 今日中に文化祭の準備をすべて終わらせることになった。", isCorrect: false },
      { text: "D. 今日の昼休みに、蓮が一人で企画書を提出することになった。", isCorrect: false }
    ],
    feedback: {
      correct: {
        title: "正解！ (A)", story: "完全掌握了老師交代的任務時間與地點！",
        jpOriginal: "今日の放課後、二人で企画書を職員室まで持ってきてください。", zhTrans: "今天放學後，請兩人把企劃書帶到教職員室。",
        words: "放課後(ほうかご)、職員室(しょくいんしつ)", explanation: "佐藤先生明確指示今天放學後兩人要將企劃書送到教職員室。"
      },
      wrong: {
        title: "不正解！ (正確答案為 A)", story: "時間或地點記錯囉。",
        jpOriginal: "今日の放課後、二人で企画書を職員室まで持ってきてください。", zhTrans: "今天放學後，請兩人把企劃書帶到教職員室。",
        words: "放課後(ほうかご)、職員室(しょくいんしつ)", explanation: "正確答案為 A。"
      }
    }
  },
  "ch1_q3": {
    quizNumber: 3, type: "聽力理解任務",
    section: 3,
    question: "佐藤先生が蓮と透に企画書を任せた理由として、最も近いものはどれですか。",
    trustTarget: "sato",
    options: [
      { text: "A. 二人が文化祭の企画を一番楽しみにしていたから。", isCorrect: false },
      { text: "B. 二人が以前から企画書を作る準備をしていたから。", isCorrect: false },
      { text: "C. 蓮の発言をきっかけに、先生が二人に企画を考えさせることにしたから。", isCorrect: true },
      { text: "D. 二人が自分から企画を担当したいと言ったから。", isCorrect: false }
    ],
    feedback: {
      correct: {
        title: "正解！ (C)", story: "你聽懂了老師藉由蓮的輕率發言順勢交辦任務的因果關係。",
        jpOriginal: "先ほど『やらなくていい』とおっしゃるくらいですから……", zhTrans: "既然你剛才說『不辦也罷』……",
        words: "きっかけ(契機)、任せる(託付)", explanation: "因為蓮說了「不辦不就好了」，老師順水推舟懲罰兩人承辦。"
      },
      wrong: {
        title: "不正解！ (正確答案為 C)", story: "這是老師帶有懲罰性質的安排。",
        jpOriginal: "先ほど『やらなくていい』とおっしゃるくらいですから……", zhTrans: "既然你剛才說『不辦也罷』……",
        words: "きっかけ(契機)、任せる(託付)", explanation: "正確答案為 C。"
      }
    }
  },
  "ch1_q4": {
    quizNumber: 4, type: "聽力理解任務",
    section: 4,
    question: "転校生が提案した企画は、どのようなものですか。",
    trustTarget: "toru",
    options: [
      { text: "A. 教室で料理を作り、参加者に食べてもらう企画。", isCorrect: false },
      { text: "B. 校内の何か所かを回りながら、問題やミッションに挑戦する企画。", isCorrect: true },
      { text: "C. 教室の中に問題を置いて、全部解けた人に料理を作ってもらう企画。", isCorrect: false },
      { text: "D. 校内を回ってスタンプだけを集め、最後に焼きそばをもらう企画。", isCorrect: false }
    ],
    feedback: {
      correct: {
        title: "正解！ (B)", story: "完美掌握了轉學生提出的校園闖關提案！",
        jpOriginal: "校內的何か所かに問題とかミッションを用意して、順番に回ってもらうとか。", zhTrans: "在校內好幾個地方準備題目或任務，讓大家依序去闖關之類的。",
        words: "ミッション(任務)、回る(繞行/參觀)", explanation: "正確答案為 B。"
      },
      wrong: {
        title: "不正解！ (正確答案為 B)", story: "轉學生的提案是校園闖關任務。",
        jpOriginal: "校內的何か所かに問題とかミッションを用意して、順番に回ってもらうとか。", zhTrans: "在校內好幾個地方準備題目或任務，讓大家依序去闖關之類的。",
        words: "ミッション(任務)、回る(繞行/參觀)", explanation: "正確答案為 B。"
      }
    }
  },
  "ch1_q5": {
    quizNumber: 5, type: "聽力理解任務",
    section: 5,
    question: "透は、蓮のどんなところをからかっていますか。",
    trustTarget: "toru",
    options: [
      { text: "A. 自分の案ではないのに、自分が考えたように話しているところ。", isCorrect: false },
      { text: "B. 普段は文句を言うのに、今回は素直に人の案を褒めたところ。", isCorrect: true },
      { text: "C. 文化祭に参加したくないと言っていたのに、一人で企画を決めようとしているところ。", isCorrect: false },
      { text: "D. 焼きそばの企画をまだあきらめていないところ。", isCorrect: false }
    ],
    feedback: {
      correct: {
        title: "正解！ (B)", story: "完全理解了透的腹黑吐槽與調侃心態！",
        jpOriginal: "へえ。お前が人の案を素直に褒めるなんて珍しいな。", zhTrans: "這，你竟然會坦率稱讚別人的點子，真難得。",
        words: "素直に(坦率地)、褒める(稱讚)、珍しい(少見)、文句(抱怨)、からかう(調侃)", explanation: "透調侃平常愛抱怨的蓮竟然會坦率稱讚別人的點子。"
      },
      wrong: {
        title: "不正解！ (正確答案為 B)", story: "透是在調侃蓮平時愛抱怨卻突然稱讚別人。",
        jpOriginal: "いつもなら、まず文句言うだろ。", zhTrans: "照常理你應該先抱怨才對。",
        words: "素直に(坦率地)、褒める(稱讚)、珍しい(少見)、文句(抱怨)、からかう(調侃)", explanation: "正確答案為 B。"
      }
    }
  }
};

/* =========================================================
   EXTRA EVENT GALLERY COLLECTION
   與主線存檔分離
   ========================================================= */

const EXTRA_GALLERY_STORAGE_KEY =
  "furyo_vn_extra_gallery";

const extraGalleryState = {
  unlocked: {
    yakisobaRally: false
  }
};


function loadExtraGalleryData() {
  const raw =
    localStorage.getItem(
      EXTRA_GALLERY_STORAGE_KEY
    );

  if (!raw) {
    return;
  }

  try {
    const data = JSON.parse(raw);

    if (
      data &&
      data.unlocked
    ) {
      extraGalleryState.unlocked.yakisobaRally =
        data.unlocked.yakisobaRally === true;
    }
  } catch (err) {
    console.warn(
      "[EXTRA GALLERY] load failed:",
      err
    );
  }
}


function saveExtraGalleryData() {
  const data = {
    unlocked: {
      yakisobaRally:
        extraGalleryState.unlocked
          .yakisobaRally === true
    }
  };

  try {
    localStorage.setItem(
      EXTRA_GALLERY_STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch (err) {
    console.warn(
      "[EXTRA GALLERY] save failed:",
      err
    );
  }
}


function unlockExtraEvent(eventKey) {
  if (
    !Object.prototype.hasOwnProperty.call(
      extraGalleryState.unlocked,
      eventKey
    )
  ) {
    console.warn(
      "[EXTRA GALLERY] unknown event:",
      eventKey
    );

    return;
  }

  if (
    extraGalleryState.unlocked[eventKey] ===
    true
  ) {
    return;
  }

  extraGalleryState.unlocked[eventKey] = true;

  saveExtraGalleryData();

  console.log(
    "[EXTRA GALLERY] unlocked:",
    eventKey
  );
}


function isExtraEventUnlocked(eventKey) {
  return (
    extraGalleryState.unlocked[eventKey] ===
    true
  );
}

/* =========================================================
   EXTRA EVENT COLLECTION UI
   ========================================================= */

function renderExtraCollection() {
  const card =
    document.getElementById(
      "extra-card-yakisoba"
    );

  const image =
    document.getElementById(
      "extra-card-yakisoba-image"
    );

  const lock =
    document.getElementById(
      "extra-card-yakisoba-lock"
    );

  const title =
    document.getElementById(
      "extra-card-yakisoba-title"
    );

  const status =
    document.getElementById(
      "extra-card-yakisoba-status"
    );

  if (
    !card ||
    !image ||
    !lock ||
    !title ||
    !status
  ) {
    return;
  }


  const unlocked =
    isExtraEventUnlocked(
      "yakisobaRally"
    );


  if (unlocked) {

    card.classList.remove(
      "is-locked"
    );

    card.disabled = false;


    /*
      只有已解鎖時才指定 src。

      所以 LOCKED 狀態完全不會載入縮圖。
    */
    if (!image.src) {
      image.src =
        "assets/gallery/extra_yakisoba_rally.webp";
    }

    image.classList.remove(
      "hidden"
    );

    lock.classList.add(
      "hidden"
    );

    title.innerHTML =
      "幻の焼きそば<br>ラリー";

    status.textContent =
      "CLEAR";

  } else {

    card.classList.add(
      "is-locked"
    );

    card.disabled = true;

    image.removeAttribute(
      "src"
    );

    image.classList.add(
      "hidden"
    );

    lock.classList.remove(
      "hidden"
    );

    title.textContent =
      "??????";

    status.textContent =
      "LOCKED";
  }
}


function openExtraCollection() {
  renderExtraCollection();

  showScreen(
    "extraCollection"
  );
}

/* ==========================================================================
   4. 遊戲狀態與 CONFIG 全局設定資料庫
   ========================================================================== */
const gameState = {
  extraEventPending: false,
  hasValidSave: false,
  currentChapter: 1,
  currentStepIndex: 0,
  score: 0,
  totalQuizzes: 5,
  trustPoints: { ren: 0, toru: 0, sato: 0 },
  currentQuizId: null,
  isCleared: false,
  playerName: "転校生",
  playerHonorific: "ちゃん",
  listeningState: "BLIND_LISTENING",
  currentListeningSection: 1,
  completedSections: [],
  scoredSections: [],
  wrongQuestions: []
};

const gameSettings = {
  bgmVolume: 18,
  seVolume: 25,
  voiceVolume: 50,
  textSpeed: "normal",
  chineseSubtitle: "on"
};

let previousScreenBeforeConfig = "title";
const typingTimers = new Map();
let activeAudioInstance = null;
let currentPlaybackToken = 0;

/* =========================================================
   CHAPTER 1 MAIN STORY AUDIO
   ※ EXTRA EVENT 暫時不處理
   ========================================================= */

const MAIN_AUDIO = {
  bgmDaily: "assets/bgm/bgm_daily.ogg",
  bgmSchoolDay: "assets/bgm/bgm_school_dayL.ogg",
  bgmNewIdea: "assets/bgm/bgm_new_idea.ogg",

  ambSchoolMorning: "assets/se/amb_school_morning.ogg",
  seSchoolBell: "assets/se/se_school_bell.ogg",

  seChoiceOpen: "assets/se/se_choice_open.ogg",
  seChoiceSelect: "assets/se/se_choice_select.ogg",
  seCorrect: "assets/se/se_correct.ogg",
  seWrong: "assets/se/se_wrong.ogg",

  seChapterClear: "assets/se/se_chapter_clear.ogg",

// Extra Event
seExtraTrigger: "assets/se/se_extra_trigger.ogg",
seExtraTitle: "assets/se/se_extra_title.ogg",
seImagination: "assets/se/se_imagination.ogg",
bgmExtraComedy: "assets/bgm/bgm_extra_comedy.ogg"
};

let mainBgmAudio = null;
let mainBgmPath = "";
let mainBgmDuckFactor = 1;
let mainBgmFadeTimer = null;

let mainBgmAudioContext = null;

/*
 * 使用者在設定頁調整的 BGM 總音量。
 * 例如 slider = 30% → 0.3
 */
let mainBgmGainNode = null;

/*
 * 每一個 Main BGM Audio 都有自己的 Fade Gain。
 *
 * audio
 *   ↓
 * source
 *   ↓
 * fadeGain
 *   ↓
 * mainBgmGainNode
 *   ↓
 * speakers
 */
const mainBgmAudioNodes = new WeakMap();

let morningAmbientAudio = null;
let morningAmbientFadeTimer = null;

let mainAudioUnlocked = false;

const mainSePool = [];

const MAIN_BGM_DUCK_FACTOR = 0.35;
const MORNING_AMBIENT_FACTOR = 0.28;


/* =========================================================
   RESOURCE PRELOADER
   圖片 / Voice / BGM / SE 預載
   ========================================================= */

const resourcePreloader = {
  loaded: new Set(),
  loading: new Map()
};


/* ---------- path ---------- */

function normalizePreloadPath(path) {
  if (!path) return "";

  return path.startsWith("/")
    ? path.slice(1)
    : path;
}


/* ---------- image ---------- */

function preloadImage(path) {
  const src = normalizePreloadPath(path);

  if (!src) {
    return Promise.resolve();
  }

  if (resourcePreloader.loaded.has(src)) {
    return Promise.resolve();
  }

  if (resourcePreloader.loading.has(src)) {
    return resourcePreloader.loading.get(src);
  }

  const promise = new Promise(resolve => {
    const img = new Image();

    const finish = () => {
      resourcePreloader.loaded.add(src);
      resourcePreloader.loading.delete(src);
      resolve();
    };

    img.onload = finish;

    // 某一張圖片失敗時，不要讓整個遊戲卡死
    img.onerror = finish;

    img.src = src;
  });

  resourcePreloader.loading.set(src, promise);

  return promise;
}


/* ---------- audio ---------- */

function preloadAudio(path) {
  const src = normalizePreloadPath(path);

  if (!src) {
    return Promise.resolve();
  }

  if (resourcePreloader.loaded.has(src)) {
    return Promise.resolve();
  }

  if (resourcePreloader.loading.has(src)) {
    return resourcePreloader.loading.get(src);
  }


  const promise = new Promise(resolve => {

    const audio = new Audio();

    let finished = false;
    let timeoutId = null;


    const cleanup = () => {

      audio.removeEventListener(
        "canplaythrough",
        finish
      );

      audio.removeEventListener(
        "error",
        finish
      );

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

    };


    const finish = () => {

      if (finished) return;

      finished = true;

      cleanup();

      resourcePreloader.loaded.add(src);

      resourcePreloader.loading.delete(src);

      resolve();

    };


    /*
      不使用 loadeddata 當完成條件。

      手機 Safari 的 loadeddata
      只代表已經取得第一段可播放資料，
      不代表整個音訊已經準備好。
    */

    audio.preload = "auto";


    audio.addEventListener(
      "canplaythrough",
      finish,
      { once: true }
    );


    audio.addEventListener(
      "error",
      finish,
      { once: true }
    );


    audio.src = src;


    try {
      audio.load();
    } catch (err) {
      console.warn(
        "[PRELOAD AUDIO] load failed:",
        src,
        err
      );
    }


    /*
      iOS Safari 不保證觸發 canplaythrough。

      所以仍保留 timeout，
      避免 Loading 永久卡住。

      手機網路通常比桌機慢，
      這裡給 12 秒。
    */

    timeoutId = window.setTimeout(
      finish,
      12000
    );

  });


  resourcePreloader.loading.set(
    src,
    promise
  );


  return promise;
}


/* ---------- batch ---------- */

async function preloadResourceBatch(
  resources,
  onProgress = null
) {
  const uniqueResources = [
    ...new Map(
      resources
        .filter(item => item && item.path)
        .map(item => [
          normalizePreloadPath(item.path),
          {
            ...item,
            path: normalizePreloadPath(item.path)
          }
        ])
    ).values()
  ];

  const total = uniqueResources.length;

  if (total === 0) {
    if (onProgress) {
      onProgress(1, 1, 100);
    }
    return;
  }

  let completed = 0;

  const reportProgress = () => {
    completed++;

    const percent = Math.round(
      (completed / total) * 100
    );

    if (onProgress) {
      onProgress(
        completed,
        total,
        percent
      );
    }
  };


  /* =========================================================
     Mobile-safe preload queue

     不再 Promise.all() 同時載入全部資源。
     iPhone Safari 同時建立大量 Audio / Image
     容易造成卡死或記憶體壓力。

     一次最多 4 個。
     ========================================================= */

  const MAX_CONCURRENT = 4;
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const index = nextIndex++;

      if (index >= total) {
        return;
      }

      const resource =
        uniqueResources[index];

      try {
        if (resource.type === "image") {
          await preloadImage(
            resource.path
          );
        } else {
          await preloadAudio(
            resource.path
          );
        }
      } catch (err) {
        /*
         單一素材失敗不能讓整個 Start Loading 卡死。
         繼續載下一個。
        */
        console.warn(
          "[PRELOAD] resource failed:",
          resource.path,
          err
        );
      } finally {
        reportProgress();
      }
    }
  }


  const workerCount =
    Math.min(
      MAX_CONCURRENT,
      total
    );

  const workers = [];

  for (
    let i = 0;
    i < workerCount;
    i++
  ) {
    workers.push(
      worker()
    );
  }

  await Promise.all(workers);
}

/* ---------- path ---------- */

function normalizeMainAudioPath(path) {
  if (!path) return "";

  let cleanPath = path.startsWith("/")
    ? path.slice(1)
    : path;

  if (!cleanPath.startsWith("assets/")) {
    cleanPath = "assets/" + cleanPath;
  }

  return cleanPath;
}


/* ---------- volume ---------- */

function getMainBgmVolume() {
  /*
   * 使用者設定的 BGM 音量由 GainNode 負責。
   * HTMLAudioElement.volume 只負責
   * fade / duck。
   */
  return Math.max(
    0,
    Math.min(
      1,
      mainBgmDuckFactor
    )
  );
}

function getMainSeVolume() {
  return Math.max(
    0,
    Math.min(
      1,
      (gameSettings.seVolume ?? 50) / 100
    )
  );
}

function getMorningAmbientVolume() {
  return Math.max(
    0,
    Math.min(
      1,
      getMainSeVolume() *
      MORNING_AMBIENT_FACTOR
    )
  );
}


/* ---------- fade ---------- */

function fadeMainAudio(
  audio,
  targetVolume,
  duration = 700,
  type = "bgm",
  onComplete = null
) {
  if (!audio) {
    if (onComplete) onComplete();
    return;
  }

  /*
   * =========================
   * Main BGM
   * =========================
   *
   * BGM 不再修改 audio.volume。
   * 改由 Web Audio fadeGain 控制。
   */
  if (type === "bgm") {
    if (mainBgmFadeTimer) {
      clearInterval(mainBgmFadeTimer);
      mainBgmFadeTimer = null;
    }

    const nodes =
      ensureMainBgmWebAudio(audio);

    if (!nodes || !nodes.fadeGain) {
      /*
       * 極舊瀏覽器不支援 Web Audio 時的 fallback。
       */
      audio.volume = Math.max(
        0,
        Math.min(1, targetVolume)
      );

      if (onComplete) onComplete();
      return;
    }

    const fadeGain =
      nodes.fadeGain;

    const startVolume =
      fadeGain.gain.value;

    const safeTarget = Math.max(
      0,
      Math.min(1, targetVolume)
    );

    if (duration <= 0) {
      fadeGain.gain.value =
        safeTarget;

      if (onComplete) onComplete();
      return;
    }

    const startTime =
      performance.now();

    const timer =
      setInterval(() => {
        const elapsed =
          performance.now() -
          startTime;

        const progress =
          Math.min(
            1,
            elapsed / duration
          );

        fadeGain.gain.value =
          startVolume +
          (safeTarget - startVolume) *
          progress;

        if (progress >= 1) {
          clearInterval(timer);

          if (
            mainBgmFadeTimer === timer
          ) {
            mainBgmFadeTimer = null;
          }

          fadeGain.gain.value =
            safeTarget;

          if (onComplete) {
            onComplete();
          }
        }
      }, 40);

    mainBgmFadeTimer = timer;

    return;
  }

  /*
   * =========================
   * Morning Ambient
   * =========================
   *
   * Ambient 目前沒有手機音量問題，
   * 所以保留原本 HTMLAudioElement.volume。
   */
  if (
    type === "ambient" &&
    morningAmbientFadeTimer
  ) {
    clearInterval(
      morningAmbientFadeTimer
    );

    morningAmbientFadeTimer = null;
  }

  const startVolume =
    Number.isFinite(audio.volume)
      ? audio.volume
      : 0;

  const safeTarget = Math.max(
    0,
    Math.min(1, targetVolume)
  );

  if (duration <= 0) {
    audio.volume = safeTarget;

    if (onComplete) onComplete();
    return;
  }

  const startTime =
    performance.now();

  const timer =
    setInterval(() => {
      const elapsed =
        performance.now() -
        startTime;

      const progress =
        Math.min(
          1,
          elapsed / duration
        );

      audio.volume =
        startVolume +
        (safeTarget - startVolume) *
        progress;

      if (progress >= 1) {
        clearInterval(timer);

        if (
          type === "ambient" &&
          morningAmbientFadeTimer === timer
        ) {
          morningAmbientFadeTimer = null;
        }

        audio.volume =
          safeTarget;

        if (onComplete) {
          onComplete();
        }
      }
    }, 40);

  if (type === "ambient") {
    morningAmbientFadeTimer =
      timer;
  }
}

function fadeDetachedMainAudioOut(
  audio,
  duration = 500
) {
  if (!audio) return;

  const nodes =
    ensureMainBgmWebAudio(audio);

  /*
   * Web Audio 不可用時 fallback。
   */
  if (!nodes || !nodes.fadeGain) {
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}

    return;
  }

  const fadeGain =
    nodes.fadeGain;

  const startVolume =
    fadeGain.gain.value;

  /*
   * 已經沒有聲音，直接停止。
   */
  if (
    duration <= 0 ||
    startVolume <= 0
  ) {
    fadeGain.gain.value = 0;

    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}

    return;
  }

  const startTime =
    performance.now();

  const timer =
    setInterval(() => {
      const progress =
        Math.min(
          1,
          (
            performance.now() -
            startTime
          ) /
          Math.max(1, duration)
        );

      fadeGain.gain.value =
        Math.max(
          0,
          startVolume *
          (1 - progress)
        );

      if (progress >= 1) {
        clearInterval(timer);

        fadeGain.gain.value = 0;

        try {
          audio.pause();
          audio.currentTime = 0;
        } catch (e) {}
      }
    }, 40);
}

function ensureMainBgmWebAudio(audio) {
  if (!audio) return null;

  try {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) {
      return null;
    }

    /*
     * 建立共用 AudioContext
     * ＋使用者 BGM Master Gain。
     */
    if (!mainBgmAudioContext) {
      mainBgmAudioContext =
        new AudioContextClass();

      mainBgmGainNode =
        mainBgmAudioContext.createGain();

      mainBgmGainNode.connect(
        mainBgmAudioContext.destination
      );
    }

    /*
     * 同一個 HTMLAudioElement
     * 只能建立一次 MediaElementSource。
     */
    if (mainBgmAudioNodes.has(audio)) {
      return mainBgmAudioNodes.get(audio);
    }

    const source =
      mainBgmAudioContext
        .createMediaElementSource(audio);

    /*
     * 每一首 BGM 有自己的 fadeGain。
     * 切歌時新舊兩首才能各自淡入／淡出。
     */
    const fadeGain =
      mainBgmAudioContext.createGain();

    fadeGain.gain.value = 0;

    source.connect(fadeGain);
    fadeGain.connect(mainBgmGainNode);

    const nodes = {
      source,
      fadeGain
    };

    mainBgmAudioNodes.set(
      audio,
      nodes
    );

    /*
     * HTML Audio 本身永遠保持 100%。
     * 不再用 audio.volume 控制 Main BGM。
     */
    audio.volume = 1;

    updateMainBgmGain();

    return nodes;

  } catch (err) {
    console.warn(
      "[MAIN BGM] Web Audio init failed:",
      err
    );

    return null;
  }
}


function updateMainBgmGain() {
  if (!mainBgmGainNode) return;

  const volume = Math.max(
    0,
    Math.min(
      1,
      (gameSettings.bgmVolume ?? 0) / 100
    )
  );

  mainBgmGainNode.gain.value = volume;
}

/* ---------- audio unlock ---------- */

function unlockMainStoryAudio() {
  if (mainAudioUnlocked) return;

  try {
    /*
     * Main BGM channel
     * TAP 時先建立正式的 mainBgmAudio。
     * 後續 playMainBgm() 必須沿用這個 instance，
     * 不再另外建立第二個 Audio。
     */
    if (!mainBgmAudio) {
  mainBgmAudio = new Audio();
  mainBgmAudio.preload = "auto";
  mainBgmAudio.loop = true;
  mainBgmAudio.volume = 1;
}

/*
 * 將正式 Main BGM channel
 * 接到 Web Audio GainNode。
 */
ensureMainBgmWebAudio(mainBgmAudio);

if (
  mainBgmAudioContext &&
  mainBgmAudioContext.state === "suspended"
) {
  mainBgmAudioContext
    .resume()
    .catch(() => {});
}

    /*
     * Morning ambience channel
     */
    if (!morningAmbientAudio) {
      morningAmbientAudio = new Audio();
      morningAmbientAudio.preload = "auto";
      morningAmbientAudio.loop = true;
      morningAmbientAudio.volume = 0;
    }

    /*
     * SE channels
     */
    if (mainSePool.length === 0) {
      for (let i = 0; i < 4; i++) {
        const seAudio = new Audio();
        seAudio.preload = "auto";
        mainSePool.push(seAudio);
      }
    }

    mainAudioUnlocked = true;

    console.log("[MAIN AUDIO] channels ready");

  } catch (e) {
    console.warn("[MAIN AUDIO] channel init failed", e);
  }
}


/* ---------- BGM ---------- */

function playMainBgm(path, fadeMs = 700) {
  if (
    typeof extraEventState !== "undefined" &&
    extraEventState.active
  ) {
    return;
  }

  unlockMainStoryAudio();

  const cleanPath =
    normalizeMainAudioPath(path);

  if (!cleanPath) return;

  /*
   * 同一首 BGM
   */
  if (
    mainBgmAudio &&
    mainBgmPath === cleanPath
  ) {
    const playPromise =
      mainBgmAudio.play();

    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ) {
      playPromise.catch((err) => {
        console.error(
          "[MAIN BGM] resume failed:",
          cleanPath,
          err
        );
      });
    }

    fadeMainAudio(
      mainBgmAudio,
      getMainBgmVolume(),
      fadeMs,
      "bgm"
    );

    return;
  }

  /*
 * 第一次 TAP 後：
 * mainBgmAudio 已建立，
 * 但 mainBgmPath 還是空的。
 *
 * 這種情況沿用已解鎖的 Audio instance。
 */
const canReuseUnlockedChannel =
  mainBgmAudio &&
  !mainBgmPath;

const oldAudio =
  canReuseUnlockedChannel
    ? null
    : mainBgmAudio;

/*
 * 真正切換不同 BGM 時，
 * 舊 Audio 獨立淡出。
 */
if (oldAudio) {
  fadeDetachedMainAudioOut(
    oldAudio,
    Math.min(fadeMs, 500)
  );
}

/*
 * 第一次播放：
 * 沿用 TAP 解鎖的 Audio。
 *
 * 後續真正切歌：
 * 建立新的 Audio。
 */
const audio =
  canReuseUnlockedChannel
    ? mainBgmAudio
    : new Audio();

audio.preload = "auto";
audio.loop = true;
audio.src = cleanPath;

const bgmNodes =
  ensureMainBgmWebAudio(audio);

if (
  bgmNodes &&
  bgmNodes.fadeGain
) {
  bgmNodes.fadeGain.gain.value = 0;
} else {
  /*
   * Web Audio fallback
   */
  audio.volume = 0;
}

mainBgmAudio = audio;
mainBgmPath = cleanPath;

  console.log(
    "[MAIN BGM] load:",
    cleanPath
  );

  audio.addEventListener(
    "error",
    () => {
      console.error(
        "[MAIN BGM] FILE ERROR:",
        cleanPath,
        audio.error
      );
    },
    { once: true }
  );

  const playPromise = audio.play();

  if (
    playPromise &&
    typeof playPromise.then === "function"
  ) {
    playPromise
      .then(() => {
        console.log(
          "[MAIN BGM] playing:",
          cleanPath
        );

        if (mainBgmAudio !== audio) {
          return;
        }

        fadeMainAudio(
          audio,
          getMainBgmVolume(),
          fadeMs,
          "bgm"
        );
      })
      .catch((err) => {
        console.error(
          "[MAIN BGM] PLAY FAILED:",
          cleanPath,
          err
        );
      });
  }
}


function stopMainBgm(fadeMs = 700) {
  const audio = mainBgmAudio;

  mainBgmAudio = null;
  mainBgmPath = "";

  if (!audio) return;

  if (mainBgmFadeTimer) {
    clearInterval(mainBgmFadeTimer);
    mainBgmFadeTimer = null;
  }

  fadeDetachedMainAudioOut(
    audio,
    fadeMs
  );
}


function setMainBgmDucked(
  ducked,
  fadeMs = 250
) {
  mainBgmDuckFactor =
    ducked
      ? MAIN_BGM_DUCK_FACTOR
      : 1;

  if (!mainBgmAudio) return;

  fadeMainAudio(
    mainBgmAudio,
    getMainBgmVolume(),
    fadeMs,
    "bgm"
  );
}


/* ---------- SE ---------- */

function getAvailableMainSeChannel() {
  unlockMainStoryAudio();

  let audio = mainSePool.find(
    item =>
      item.paused ||
      item.ended ||
      !item.src
  );

  /*
   * 同時有多個 SE 時允許增加 channel。
   */
  if (!audio) {
    audio = new Audio();
    audio.preload = "auto";
    mainSePool.push(audio);
  }

  return audio;
}


function playMainSe(path, onEnded = null) {
  if (
    typeof extraEventState !== "undefined" &&
    extraEventState.active
  ) {
    if (typeof onEnded === "function") onEnded();
    return;
  }

  const volume = getMainSeVolume();

  if (volume <= 0) {
    if (typeof onEnded === "function") onEnded();
    return;
  }

  const cleanPath =
    normalizeMainAudioPath(path);

  if (!cleanPath) {
    if (typeof onEnded === "function") onEnded();
    return;
  }

  try {
    const audio =
      getAvailableMainSeChannel();

    audio.pause();
    audio.currentTime = 0;

    audio.src = cleanPath;
    audio.loop = false;
    audio.volume = volume;

    let finished = false;
    const finishOnce = () => {
      if (finished) return;
      finished = true;

      audio.onended = null;
      audio.onerror = null;

      if (typeof onEnded === "function") {
        onEnded();
      }
    };

    audio.onended = () => {
      finishOnce();
    };

    audio.onerror = () => {
      console.error(
        "[MAIN SE] FILE ERROR:",
        cleanPath,
        audio.error
      );
      finishOnce();
    };

    const playPromise = audio.play();

    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ) {
      playPromise.catch((err) => {
        console.error(
          "[MAIN SE] PLAY FAILED:",
          cleanPath,
          err
        );
        finishOnce();
      });
    }

  } catch (e) {
    console.error(
      "[MAIN SE] ERROR:",
      cleanPath,
      e
    );
    if (typeof onEnded === "function") {
      onEnded();
    }
  }
}

/* ---------- morning ambience ---------- */

function startMorningAmbient(
  fadeMs = 700
) {
  if (
    typeof extraEventState !== "undefined" &&
    extraEventState.active
  ) {
    return;
  }

  unlockMainStoryAudio();

  const cleanPath =
    normalizeMainAudioPath(
      MAIN_AUDIO.ambSchoolMorning
    );

  /*
   * 已經是同一個環境音
   */
  if (
    morningAmbientAudio &&
    morningAmbientAudio.dataset &&
    morningAmbientAudio.dataset.mainPath ===
      cleanPath
  ) {
    const playPromise =
      morningAmbientAudio.play();

    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ) {
      playPromise.catch((err) => {
        console.error(
          "[MORNING AMBIENT] resume failed:",
          cleanPath,
          err
        );
      });
    }

    fadeMainAudio(
      morningAmbientAudio,
      getMorningAmbientVolume(),
      fadeMs,
      "ambient"
    );

    return;
  }

  const oldAudio =
    morningAmbientAudio;

  if (
    oldAudio &&
    oldAudio.src
  ) {
    if (morningAmbientFadeTimer) {
      clearInterval(
        morningAmbientFadeTimer
      );

      morningAmbientFadeTimer = null;
    }

    fadeDetachedMainAudioOut(
      oldAudio,
      Math.min(fadeMs, 500)
    );
  }

  const audio = new Audio();

  audio.preload = "auto";
  audio.loop = true;
  audio.volume = 0;
  audio.src = cleanPath;

  audio.dataset.mainPath = cleanPath;

  morningAmbientAudio = audio;

  console.log(
    "[MORNING AMBIENT] load:",
    cleanPath
  );

  audio.addEventListener(
    "error",
    () => {
      console.error(
        "[MORNING AMBIENT] FILE ERROR:",
        cleanPath,
        audio.error
      );
    },
    { once: true }
  );

  const playPromise = audio.play();

  if (
    playPromise &&
    typeof playPromise.then === "function"
  ) {
    playPromise
      .then(() => {
        console.log(
          "[MORNING AMBIENT] playing:",
          cleanPath
        );

        if (
          morningAmbientAudio !== audio
        ) {
          return;
        }

        fadeMainAudio(
          audio,
          getMorningAmbientVolume(),
          fadeMs,
          "ambient"
        );
      })
      .catch((err) => {
        console.error(
          "[MORNING AMBIENT] PLAY FAILED:",
          cleanPath,
          err
        );
      });
  }
}


function stopMorningAmbient(
  fadeMs = 700
) {
  const audio =
    morningAmbientAudio;

  morningAmbientAudio = null;

  if (!audio) return;

  if (morningAmbientFadeTimer) {
    clearInterval(
      morningAmbientFadeTimer
    );

    morningAmbientFadeTimer = null;
  }

  fadeDetachedMainAudioOut(
    audio,
    fadeMs
  );
}


/* ---------- emergency cleanup ---------- */

function stopMainStoryAudioImmediately() {
  if (mainBgmFadeTimer) {
    clearInterval(mainBgmFadeTimer);
    mainBgmFadeTimer = null;
  }

  if (morningAmbientFadeTimer) {
    clearInterval(
      morningAmbientFadeTimer
    );

    morningAmbientFadeTimer = null;
  }

  if (mainBgmAudio) {
    try {
      mainBgmAudio.pause();
      mainBgmAudio.currentTime = 0;
    } catch (e) {}

    mainBgmAudio = null;
    mainBgmPath = "";
  }

  if (morningAmbientAudio) {
    try {
      morningAmbientAudio.pause();
      morningAmbientAudio.currentTime = 0;
    } catch (e) {}

    morningAmbientAudio = null;
  }

  mainSePool.forEach(audio => {
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}
  });

  mainBgmDuckFactor = 1;
}


let screens = {};
let elements = {};

function hasValidStorySave() {
  const raw = localStorage.getItem('furyo_vn_save');
  if (!raw) return false;
  try {
    const data = JSON.parse(raw);
    if (!data.hasValidSave) return false;
    const hasProgress = (data.currentStepIndex && data.currentStepIndex > 0) || data.isCleared || (data.completedSections && data.completedSections.length > 0);
    return !!hasProgress;
  } catch (e) {
    return false;
  }
}

function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatTextWithPlayer(text) {
  if (!text) return "";
  const pName = gameState.playerName || "転校生";
  const pHono = gameState.playerHonorific || "ちゃん";
  return text
    .replace(/\{\{playerName\}\}/g, pName)
    .replace(/\{\{playerHonorific\}\}/g, pHono);
}

function stopAllTypewriters() {
  typingTimers.forEach((timer, el) => {
    clearInterval(timer);
  });
  typingTimers.clear();
}

function typeWriterText(element, text) {
  if (!element) return;
  
  const oldTimer = typingTimers.get(element);
  if (oldTimer) {
    clearInterval(oldTimer);
    typingTimers.delete(element);
  }

  const formattedText = formatTextWithPlayer(text);
  element.setAttribute('data-full-text', formattedText);
  
  if (gameSettings.textSpeed === "instant") {
    element.innerHTML = formattedText;
    element.removeAttribute('data-full-text');
    return;
  }

  element.innerHTML = "";
  let i = 0;
  let speedDelay = 35;
  if (gameSettings.textSpeed === "slow") speedDelay = 70;
  if (gameSettings.textSpeed === "fast") speedDelay = 15;

  const timer = setInterval(() => {
    if (i < formattedText.length) {
      element.innerHTML += formattedText.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      typingTimers.delete(element);
      element.removeAttribute('data-full-text');
    }
  }, speedDelay);

  typingTimers.set(element, timer);
}

function stopActiveAudio(reason = "manual_stop", dialogueId = "unknown") {
  currentPlaybackToken++;
  if (activeAudioInstance) {
    activeAudioInstance.pause();
    activeAudioInstance.currentTime = 0;
    activeAudioInstance.onended = null;
    activeAudioInstance.onerror = null;
    activeAudioInstance = null;
  }
}

/* ==========================================================================
   iOS Audio Unlock & Playback Utility
   ========================================================================== */

function unlockAudioContextIOS() {
  try {
    const silentAudio = new Audio();
    silentAudio.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
    const promise = silentAudio.play();
    if (promise && typeof promise.then === "function") {
      promise.then(() => {
        silentAudio.pause();
        silentAudio.currentTime = 0;
      }).catch(() => {});
    }
  } catch (e) {}

  unlockMainStoryAudio();

  try {
    
  } catch (e) {}

  
}

function playVoiceAudio(audioPath, dialogueId = "unknown", onEndedCallback) {
  stopActiveAudio("new_playback_replacement", dialogueId);
  const thisToken = currentPlaybackToken;
  const currentVol = (gameSettings.voiceVolume ?? 50) / 100;

  let cleanPath = audioPath ? (audioPath.startsWith("/") ? audioPath.slice(1) : audioPath) : "";
  if (cleanPath && !cleanPath.startsWith("assets/")) {
    cleanPath = "assets/" + cleanPath;
  }

  if (!audioPath || currentVol <= 0) {
    const replayBtn = document.getElementById('btn-audio-play');
    if (replayBtn) replayBtn.remove();
    if (onEndedCallback) onEndedCallback();
    return;
  }

  try {
    const audio = new Audio(cleanPath);
    audio.volume = currentVol;
    activeAudioInstance = audio;

    audio.play().then(() => {}).catch(err => {
      console.warn("[iOS Audio Autoplay Blocked / NotAllowedError]", err);
      if (currentPlaybackToken === thisToken && onEndedCallback) {
        onEndedCallback();
      }
    });

    audio.onended = () => {
      if (currentPlaybackToken !== thisToken) return;
      if (activeAudioInstance === audio) {
        activeAudioInstance = null;
      }
      if (onEndedCallback) onEndedCallback();
    };
  } catch (e) {
    if (currentPlaybackToken === thisToken && onEndedCallback) {
      onEndedCallback();
    }
  }
}

function removeReplayAudioButton(reason = "cleanup") {
  const replayBtn = document.getElementById('btn-audio-play');
  if (replayBtn) {
    replayBtn.onclick = null;
    replayBtn.remove();
  }
}

function saveGameData() {
  const saveData = {
    hasValidSave: gameState.hasValidSave,
    currentChapter: gameState.currentChapter,
    currentStepIndex: gameState.currentStepIndex,
    score: gameState.score,
    trustPoints: gameState.trustPoints,
    isCleared: gameState.isCleared,
    playerName: gameState.playerName,
    playerHonorific: gameState.playerHonorific,
    listeningState: gameState.listeningState,
    currentListeningSection: gameState.currentListeningSection,
    completedSections: gameState.completedSections,
    scoredSections: gameState.scoredSections,
    wrongQuestions: gameState.wrongQuestions,
    
    extraEventPending: gameState.extraEventPending === true,
    
    settings: gameSettings
  };
  localStorage.setItem('furyo_vn_save', JSON.stringify(saveData));
  updateTitleScreenButtons();
}

function loadGameData() {
  const raw = localStorage.getItem('furyo_vn_save');
  if (!raw) {
    gameState.hasValidSave = false;
    return false;
  }
  try {
    const data = JSON.parse(raw);
    
    if (data.settings) {
      gameSettings.bgmVolume = data.settings.bgmVolume ?? 50;
      gameSettings.seVolume = data.settings.seVolume ?? 25;
      gameSettings.voiceVolume = data.settings.voiceVolume ?? 50;
      gameSettings.textSpeed = data.settings.textSpeed || "normal";
      gameSettings.chineseSubtitle = data.settings.chineseSubtitle || "on";
    }

    if (!data.hasValidSave || !hasValidStorySave()) {
      gameState.hasValidSave = false;
      syncConfigUI();
      return false;
    }

    gameState.hasValidSave = true;
    gameState.currentChapter = data.currentChapter || 1;
    gameState.currentStepIndex = data.currentStepIndex || 0;
    gameState.score = data.score || 0;
    gameState.trustPoints = data.trustPoints || { ren: 0, toru: 0, sato: 0 };
    gameState.isCleared = data.isCleared || false;
    gameState.playerName = (data.playerName !== undefined && data.playerName !== "") ? data.playerName : "転校生";
    gameState.playerHonorific = data.playerHonorific || "ちゃん";
    gameState.listeningState = data.listeningState || "BLIND_LISTENING";
    gameState.currentListeningSection = data.currentListeningSection || 1;
    gameState.completedSections = data.completedSections || [];
    gameState.scoredSections = data.scoredSections || [];
    gameState.wrongQuestions = data.wrongQuestions || [];
    gameState.extraEventPending =data.extraEventPending === true;

    syncConfigUI();
    return true;
  } catch (e) {
    gameState.hasValidSave = false;
    return false;
  }
}

function updateTitleScreenButtons() {
  if (!elements.btnContinue || !elements.btnStart || !elements.btnReview) return;
  const validSave = hasValidStorySave();

  if (validSave) {
    elements.btnContinue.classList.remove('hidden');
  } else {
    elements.btnContinue.classList.add('hidden');
  }

  if (gameState.isCleared || gameState.wrongQuestions.length > 0) {
    elements.btnReview.classList.remove('hidden');
    elements.btnReview.innerText = "聽力回顧";
  } else {
    elements.btnReview.classList.add('hidden');
  }
}

/* ==========================================================================
   FULLSCREEN MANAGEMENT
   ========================================================================== */
function checkFullscreenSupport() {
    const elem = document.getElementById('game-container');
    if (!elem) return false;
    return typeof elem.requestFullscreen === 'function' || typeof elem.webkitRequestFullscreen === 'function';
}

function toggleFullscreen() {
    const elem = document.getElementById('game-container');
    if (!elem) return;

    if (!checkFullscreenSupport()) {
        console.warn("此裝置 / 瀏覽器不支援 Element Fullscreen API。");
        return;
    }

    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);

    if (!isFs) {
        let requestPromise = null;
        if (elem.requestFullscreen) {
            requestPromise = elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            requestPromise = elem.webkitRequestFullscreen();
        }

        if (requestPromise && typeof requestPromise.then === 'function') {
            requestPromise.catch(err => {
                console.error("全螢幕請求失敗:", err);
            });
        }
    } else {
        let exitPromise = null;
        if (document.exitFullscreen) {
            exitPromise = document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            exitPromise = document.webkitExitFullscreen();
        }

        if (exitPromise && typeof exitPromise.then === 'function') {
            exitPromise.catch(err => {
                console.error("退出全螢幕失敗:", err);
            });
        }
    }
}

function updateFullscreenButtonState() {
    if (!elements.btnModeFullscreen || !elements.btnModeWindow) return;

    if (!checkFullscreenSupport()) {
        elements.btnModeFullscreen.textContent = '此裝置不支援全螢幕';
        elements.btnModeFullscreen.disabled = true;
        elements.btnModeFullscreen.style.opacity = '0.6';
        elements.btnModeFullscreen.style.cursor = 'not-allowed';
        elements.btnModeWindow.classList.add('active');
        elements.btnModeFullscreen.classList.remove('active');
        return;
    }

    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    elements.btnModeWindow.classList.toggle('active', !isFs);
    elements.btnModeFullscreen.classList.toggle('active', isFs);
    elements.btnModeFullscreen.textContent = isFs ? '視窗模式' : '全螢幕';
    elements.btnModeFullscreen.disabled = false;
    elements.btnModeFullscreen.style.opacity = '1';
    elements.btnModeFullscreen.style.cursor = 'pointer';
}

function syncConfigUI() {
  if (!elements.cfgBgmSlider) return;
  elements.cfgBgmSlider.value = gameSettings.bgmVolume;
  if(elements.cfgBgmVal) elements.cfgBgmVal.innerText = `${gameSettings.bgmVolume}%`;

  if(elements.cfgSeSlider) elements.cfgSeSlider.value = gameSettings.seVolume;
  if(elements.cfgSeVal) elements.cfgSeVal.innerText = `${gameSettings.seVolume}%`;

  if(elements.cfgVoiceSlider) elements.cfgVoiceSlider.value = gameSettings.voiceVolume;
  if(elements.cfgVoiceVal) elements.cfgVoiceVal.innerText = `${gameSettings.voiceVolume}%`;

  if(elements.cfgTextSpeedGroup) {
    elements.cfgTextSpeedGroup.querySelectorAll('.vn-btn-select').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.speed === gameSettings.textSpeed);
    });
  }

  if(elements.cfgSubtitleGroup) {
    elements.cfgSubtitleGroup.querySelectorAll('.vn-btn-select').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.sub === (gameSettings.chineseSubtitle || "on"));
    });
  }

  updateFullscreenButtonState();

  const pName = gameState.playerName || "転校生";
  if(elements.cfgPlayerNameText) elements.cfgPlayerNameText.innerText = pName;
  if(elements.cfgPlayerHonorificText) elements.cfgPlayerHonorificText.innerText = pName + (gameState.playerHonorific || "ちゃん");
}

function openConfigScreen(fromScreen) {
  previousScreenBeforeConfig = fromScreen;
  syncConfigUI();
  showScreen('config');
}

function closeConfigScreen() {
  saveGameData();
  if (previousScreenBeforeConfig === 'gameplay') {
    showScreen('gameplay');
  } else {
    showScreen('title');
  }
}

let titleBgmWaitingForGesture = false;

function startTitleBgm() {
  if (
    !screens.title ||
    !screens.title.classList.contains("active")
  ) {
    return;
  }

  if ((gameSettings.bgmVolume ?? 0) <= 0) {
    stopMainBgm(0);
    return;
  }

  playMainBgm(
    MAIN_AUDIO.bgmNewIdea,
    700
  );
}
  
function armTitleBgm() {
  if (
    !screens.title ||
    !screens.title.classList.contains("active")
  ) {
    return;
  }

  const startGate =
    document.getElementById("start-gate");

  // 首次進站時由 TAP TO START 負責解鎖音訊。
  if (
    startGate &&
    !startGate.classList.contains("is-closing")
  ) {
    return;
  }

  // 已經通過 Start Gate，例如遊戲內返回 Title。
  startTitleBgm();
}
function initStartGate() {
  const startGate =
    document.getElementById("start-gate");

  const startButton =
    document.getElementById("btn-start-gate");

  const loadingFill =
    document.getElementById("start-loading-fill");

  const loadingPercent =
    document.getElementById("start-loading-percent");

  if (!startGate || !startButton) {
    return;
  }

  let started = false;

  const updateLoadingProgress = (
    completed,
    total,
    percent
  ) => {
    const safePercent =
      Math.max(
        0,
        Math.min(100, percent || 0)
      );

    if (loadingFill) {
      loadingFill.style.width =
        `${safePercent}%`;
    }

    if (loadingPercent) {
      loadingPercent.textContent =
        `${safePercent}%`;
    }
  };

  const enterGame = async () => {
    if (started) return;

    started = true;
    startButton.disabled = true;

    /*
      必須在第一個 await 之前執行。
      這裡仍然屬於 TAP TO START 的 user gesture。
    */
    unlockAudioContextIOS();
    unlockMainStoryAudio();

    /*
      直接使用正式 mainBgmAudio 播放 Title BGM。
      不建立第二個 Audio，因此 Loading → Title
      全程都是同一個 BGM instance。
    */
    if ((gameSettings.bgmVolume ?? 0) > 0) {
      playMainBgm(
        MAIN_AUDIO.bgmNewIdea,
        0
      );
    }

    /*
      TAP → LOADING
    */
    startGate.classList.add(
      "is-loading"
    );

    updateLoadingProgress(
      0,
      1,
      0
    );

    /*
      先讓瀏覽器完成畫面更新，
      再開始完整資源預載。
    */
    await new Promise(resolve => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });

    try {
      await preloadInitialGameResources(
        (
          completed,
          total,
          percent
        ) => {
          updateLoadingProgress(
            completed,
            total,
            percent
          );
        }
      );
    } catch (err) {
      console.warn(
        "[INITIAL PRELOAD] failed:",
        err
      );
    }

    /*
      強制完成 Loading UI
    */
    updateLoadingProgress(
      1,
      1,
      100
    );

    /*
      讓 100% 在實機上可見一下。
    */
    await new Promise(resolve => {
      window.setTimeout(
        resolve,
        350
      );
    });

    startGate.classList.add(
      "is-ready"
    );

    /*
      這裡保留。
      playMainBgm() 偵測到同一首 BGM 時，
      只會沿用既有 mainBgmAudio，
      不會重新建立 Audio。
    */
    startTitleBgm();

    window.setTimeout(() => {
      startGate.classList.add(
        "is-closing"
      );

      window.setTimeout(() => {
        startGate.remove();
      }, 750);

    }, 350);
  };

  startButton.addEventListener(
    "click",
    enterGame,
    { once: true }
  );
}

function showScreen(screenKey) {
  Object.keys(screens).forEach(k => {
    if (screens[k]) screens[k].classList.remove('active');
  });
  if (screens[screenKey]) screens[screenKey].classList.add('active');

  if (screenKey === "title") {
  const titlePath =
    normalizeMainAudioPath(
      MAIN_AUDIO.bgmNewIdea
    );

  const isTitleBgmAlreadyPlaying =
    mainBgmAudio &&
    mainBgmPath === titlePath &&
    !mainBgmAudio.paused;

  if (!isTitleBgmAlreadyPlaying) {
    stopMainStoryAudioImmediately();
  }

  armTitleBgm();
}


  const hudConfigBtn = document.getElementById('hud-config-btn');
  const hudGameExitBtn = document.getElementById('btn-game-exit');

  if (screenKey === 'gameplay') {
    if (elements.vnHud && !extraEventState.active) elements.vnHud.classList.remove('hidden');
    if (hudConfigBtn) hudConfigBtn.style.display = extraEventState.active ? 'none' : 'block';
    if (hudGameExitBtn) hudGameExitBtn.style.display = extraEventState.active ? 'none' : 'block';
    const chapterData = CHAPTER_DATA[gameState.currentChapter];
    if (chapterData && elements.hudChapterTitle) elements.hudChapterTitle.innerText = chapterData.title;
  } else {
    if (elements.vnHud) elements.vnHud.classList.add('hidden');
    if (hudConfigBtn) hudConfigBtn.style.display = 'none';
    if (hudGameExitBtn) hudGameExitBtn.style.display = 'none';
  }
}

function updateHUD() {
  const chapterData = CHAPTER_DATA[gameState.currentChapter];
  if (chapterData && elements.hudChapterTitle) elements.hudChapterTitle.innerText = chapterData.title;
  if (elements.trustRen) elements.trustRen.innerText = gameState.trustPoints.ren;
  if (elements.trustToru) elements.trustToru.innerText = gameState.trustPoints.toru;
  if (elements.trustSato) elements.trustSato.innerText = gameState.trustPoints.sato;
}

function renderSprite(position, charKey, expression) {
  const containerMap = { left: elements.spriteLeft, center: elements.spriteCenter, right: elements.spriteRight };
  const bodyMap = { left: elements.spriteLeftBody, center: elements.spriteCenterBody, right: elements.spriteRightBody };

  Object.keys(containerMap).forEach(pos => {
    if (!containerMap[pos] || !bodyMap[pos]) return;
    if (pos === position && charKey && charKey !== "player") {
      const char = CHARACTERS[charKey] || CHARACTERS["hero"];
      const charMap = CHARACTER_SPRITE_MAP[charKey] || {};
      const spriteUrl = charMap[expression] || charMap["標準"] || "";

      containerMap[pos].classList.remove('hidden');
      bodyMap[pos].style.borderColor = char.color;
      
      if (spriteUrl) {
        bodyMap[pos].style.backgroundImage = `url('${spriteUrl}')`;
        bodyMap[pos].style.backgroundSize = "contain";
        bodyMap[pos].style.backgroundRepeat = "no-repeat";
        bodyMap[pos].style.backgroundPosition = "center bottom";
      } else {
        bodyMap[pos].style.backgroundImage = "none";
      }
    } else {
      containerMap[pos].classList.add('hidden');
    }
  });
}

function renderDialogueStep(stepData) {
  removeReplayAudioButton("renderDialogueStep");
  stopAllTypewriters();
  stopActiveAudio("renderDialogueStep", stepData.id);


  if (stepData.listeningSection === 1) {
    startMorningAmbient();
    playMainBgm(MAIN_AUDIO.bgmDaily);
  } else if (
    stepData.listeningSection === 2 ||
    stepData.listeningSection === 3 ||
    stepData.listeningSection === 4
  ) {
    stopMorningAmbient();
    playMainBgm(MAIN_AUDIO.bgmSchoolDay);
  } else if (stepData.listeningSection === 5) {
    stopMorningAmbient();

    if (stepData.id === "ch1_s03_055_ren") {
      setTimeout(() => {
        if (
          gameState.currentListeningSection === 5 &&
          (
            typeof extraEventState === "undefined" ||
            !extraEventState.active
          )
        ) {
          playMainBgm(MAIN_AUDIO.bgmNewIdea, 700);
        }
      }, 800);
    } else {
      playMainBgm(MAIN_AUDIO.bgmNewIdea);
    }
  }

  if (elements.bgNameTag) elements.bgNameTag.innerText = `【背景：${stepData.bg}】`;
  
  const bgUrl = BACKGROUND_MAP[stepData.bg] || "assets/backgrounds/bg_classroom_day.webp";
  if (elements.bgLayer) {
    elements.bgLayer.style.backgroundImage = `url('${bgUrl}')`;
    elements.bgLayer.style.backgroundSize = "cover";
    elements.bgLayer.style.backgroundPosition = "center";

    elements.bgLayer.classList.remove("dimmed", "memory");
    if (stepData.bg.includes("回憶")) {
      elements.bgLayer.classList.add("memory");
    } else if (stepData.bg.includes("混亂") || stepData.bg.includes("寂靜") || stepData.bg.includes("凝結")) {
      elements.bgLayer.classList.add("dimmed");
    }
  }

  const speaker = CHARACTERS[stepData.speaker] || CHARACTERS["hero"];
  if (elements.speakerName) elements.speakerName.innerText = speaker.name;
  if (elements.speakerTitle) elements.speakerTitle.innerText = speaker.title;
  if (elements.vnNameplate) elements.vnNameplate.style.backgroundColor = speaker.color;

  const isPlayer = (stepData.speaker === "player");
  const subtitlesEnabled = ((gameSettings.chineseSubtitle || "on") === 'on');

  if (elements.dialogueJp) {
    elements.dialogueJp.style.display = "block";
  }

  if (isPlayer) {
    typeWriterText(elements.dialogueJp, stepData.jp);
    if (elements.dialogueJp) elements.dialogueJp.style.display = "block";

    if (subtitlesEnabled && stepData.zh) {
      typeWriterText(elements.dialogueZh, stepData.zh);
      if (elements.dialogueZh) elements.dialogueZh.style.display = "block";
    } else {
      if (elements.dialogueZh) {
        elements.dialogueZh.innerHTML = "";
        elements.dialogueZh.style.display = "none";
      }
    }
  } else {
    typeWriterText(elements.dialogueJp, "🎧 [盲聽中... 請仔細聆聽角色語音與情境]");
    if (elements.dialogueZh) {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display = "none";
    }

    if (stepData.audio) {
      playVoiceAudio(stepData.audio, stepData.id);
    }
  }

  renderSprite(stepData.position, stepData.speaker, stepData.expression);

  if (elements.quizOverlay) elements.quizOverlay.classList.add('hidden');
  if (elements.choiceOverlay) elements.choiceOverlay.classList.add('hidden');
  showScreen('gameplay');
  saveGameData();
}

function renderQuizOverlay(quizId, frozenSection = null) {
  removeReplayAudioButton("renderQuizOverlay");
  stopAllTypewriters();
  stopActiveAudio("renderQuizOverlay", quizId);
  gameState.currentQuizId = quizId;
  gameState.listeningState = "QUESTION";

  if (frozenSection !== null) {
    gameState.activeQuestionSection = frozenSection;
  } else {
    const currentStep = CHAPTER_DATA[gameState.currentChapter].steps[gameState.currentStepIndex];
    gameState.activeQuestionSection = currentStep ? currentStep.listeningSection : gameState.currentListeningSection;
  }

  const quiz = QUIZZES[quizId];

  setMainBgmDucked(true);
  playMainSe(MAIN_AUDIO.seChoiceOpen);

  if (elements.quizTypeBadge) elements.quizTypeBadge.innerText = quiz.type;
  if (elements.quizNumberTag) elements.quizNumberTag.innerText = `任務檢定 Q${quiz.quizNumber}`;
  if (elements.quizQuestion) elements.quizQuestion.innerHTML = formatTextWithPlayer(quiz.question);

  if (elements.quizOptions) {
    elements.quizOptions.innerHTML = '';
    quiz.options.forEach((opt, optionIndex) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = formatTextWithPlayer(opt.text);

      btn.onclick = (e) => {
        e.stopPropagation();
        handleAnswer(opt, quiz, optionIndex);
      };
      elements.quizOptions.appendChild(btn);
    });

    const replaySectionBtn = document.createElement('button');
    replaySectionBtn.className = 'vn-btn secondary';
    replaySectionBtn.style.marginTop = '12px';
    replaySectionBtn.style.width = '100%';
    replaySectionBtn.innerText = "🔊 開字幕重聽一次";
    replaySectionBtn.onclick = (e) => {
      e.stopPropagation();
      isWrongReviewMode = false;
      triggerSectionReplay();
    };
    elements.quizOptions.appendChild(replaySectionBtn);
  }

  if (elements.quizOverlay) elements.quizOverlay.classList.remove('hidden');
  saveGameData();
}

function handleAnswer(selectedOpt, quizData, optionIndex) {
  removeReplayAudioButton("handleAnswer");
  stopAllTypewriters();
  stopActiveAudio("handleAnswer", quizData.id);
  const isCorrect = selectedOpt.isCorrect;
  
  const isQ4ExtraD =
    quizData.quizNumber === 4 &&
    optionIndex === 3;

  if (!isQ4ExtraD) {
    playMainSe(MAIN_AUDIO.seChoiceSelect);

    if (isCorrect) {
      playMainSe(MAIN_AUDIO.seCorrect);
    } else {
      playMainSe(MAIN_AUDIO.seWrong);
    }
  }

  const feedback = quizData.feedback;
  const correctOpt = quizData.options.find(o => o.isCorrect === true);
  gameState.listeningState = "REVIEW";

  const currentSec = gameState.activeQuestionSection;
  if (!gameState.wrongQuestions.includes(quizData.quizNumber) && !isCorrect) {
    gameState.wrongQuestions.push(quizData.quizNumber);
  }

  if (!gameState.completedSections.includes(currentSec)) {
    gameState.completedSections.push(currentSec);
  }

  const alreadyScored = gameState.scoredSections.includes(currentSec);

  if (elements.playerChoiceBox) elements.playerChoiceBox.classList.remove('hidden');
  if (elements.playerChoiceText) elements.playerChoiceText.innerHTML = formatTextWithPlayer(selectedOpt.text);
  if (elements.correctChoiceText) elements.correctChoiceText.innerHTML = correctOpt ? formatTextWithPlayer(correctOpt.text) : "";
  if (elements.feedbackParsingContainer) elements.feedbackParsingContainer.classList.remove('hidden');

  if (isCorrect) {
    if (!alreadyScored) {
      gameState.score++;
      if (quizData.trustTarget) gameState.trustPoints[quizData.trustTarget]++;
      gameState.scoredSections.push(currentSec);
    }

    if (elements.feedbackIcon) elements.feedbackIcon.innerText = "✅";
    if (elements.feedbackTitle) {
      elements.feedbackTitle.innerText = feedback.correct.title;
      elements.feedbackTitle.style.color = "#27ae60";
    }
    if (elements.playerChoiceBox) elements.playerChoiceBox.classList.add('success-theme');

    if (elements.feedbackStory) elements.feedbackStory.innerHTML = formatTextWithPlayer(feedback.correct.story);
    if (elements.feedbackJpOriginal) elements.feedbackJpOriginal.innerHTML = "原句：" + formatTextWithPlayer(feedback.correct.jpOriginal);
    if (elements.feedbackZhTrans) elements.feedbackZhTrans.innerHTML = "翻譯：" + formatTextWithPlayer(feedback.correct.zhTrans);
    if (elements.feedbackWords) elements.feedbackWords.innerText = "單字：" + feedback.correct.words;
    if (elements.feedbackExplanation) elements.feedbackExplanation.innerText = "解析：" + feedback.correct.explanation;
    if (elements.btnRetryQuiz) elements.btnRetryQuiz.classList.add('hidden');
  } else {
    if (elements.feedbackIcon) elements.feedbackIcon.innerText = "💭";
    if (elements.feedbackTitle) {
      elements.feedbackTitle.innerText = feedback.wrong.title;
      elements.feedbackTitle.style.color = "#e84118";
    }
    if (elements.playerChoiceBox) elements.playerChoiceBox.classList.remove('success-theme');

    if (elements.feedbackStory) elements.feedbackStory.innerHTML = formatTextWithPlayer(feedback.wrong.story);
    if (elements.feedbackJpOriginal) elements.feedbackJpOriginal.innerHTML = "原句：" + formatTextWithPlayer(feedback.wrong.jpOriginal);
    if (elements.feedbackZhTrans) elements.feedbackZhTrans.innerHTML = "翻譯：" + formatTextWithPlayer(feedback.wrong.zhTrans);
    if (elements.feedbackWords) elements.feedbackWords.innerText = "單字：" + feedback.wrong.words;
    if (elements.feedbackExplanation) elements.feedbackExplanation.innerText = "解析：" + feedback.wrong.explanation;
    if (elements.btnRetryQuiz) elements.btnRetryQuiz.classList.add('hidden');
  }

  updateHUD();

  if (isQ4ExtraD) {
  if (elements.quizOverlay) {
    elements.quizOverlay.classList.add('hidden');
  }

  // 永久解鎖 Gallery 收藏
  unlockExtraEvent(
    "yakisobaRally"
  );

  // 記錄 Extra Event 尚未完成
  gameState.extraEventPending = true;
  saveGameData();

  // 選項確認音
  playMainSe(MAIN_AUDIO.seChoiceSelect);

  setTimeout(() => {
    // Extra Event 觸發音
    playExtraSe(EXTRA_AUDIO.seTrigger);

    // 主線 school_day BGM 淡出
    stopMainBgm(700);

    startExtraEvent();
  }, 500);

  return;
}

  if (elements.feedbackModal) elements.feedbackModal.classList.remove('hidden');
  saveGameData();
}

let isTransitionExecuting = false;

function playChapterTransition(nextChapter, callback) {
  if (isTransitionExecuting) return;
  isTransitionExecuting = true;

  removeReplayAudioButton("playChapterTransition");

  if (elements.chapterBanner && elements.bannerSubtitle && elements.bannerTitle) {
    elements.bannerSubtitle.innerText = nextChapter === 1 ? "INTRODUCTION" : `CHAPTER ${nextChapter - 1} CLEAR`;
    elements.bannerTitle.innerText = CHAPTER_DATA[nextChapter].title;
    
    let bannerHint = elements.chapterBanner.querySelector('.banner-hint');
    if (!bannerHint) {
      bannerHint = document.createElement('p');
      bannerHint.className = 'banner-hint';
      elements.chapterBanner.querySelector('div').appendChild(bannerHint);
    }
    bannerHint.innerText = "點擊開始";

    elements.chapterBanner.classList.add('active');

    let hasCompleted = false;
    const proceedTransition = () => {
      if (hasCompleted) return;
      hasCompleted = true;
      isTransitionExecuting = false;
      elements.chapterBanner.removeEventListener('click', proceedTransition);

      gameState.currentChapter = nextChapter;
      gameState.currentStepIndex = 0;
      gameState.listeningState = "BLIND_LISTENING";
      gameState.currentListeningSection = 1;
      gameState.completedSections = [];
      gameState.scoredSections = [];
      gameState.hasValidSave = true;
      
      saveGameData();
      elements.chapterBanner.classList.remove('active');

      updateHUD();
      if (callback) callback();
    };

    elements.chapterBanner.onclick = (e) => {
      e.stopPropagation();
      unlockAudioContextIOS();
      proceedTransition();
    };
  } else {
    isTransitionExecuting = false;
    gameState.currentChapter = nextChapter;
    gameState.currentStepIndex = 0;
    gameState.listeningState = "BLIND_LISTENING";
    gameState.currentListeningSection = 1;
    gameState.completedSections = [];
    gameState.scoredSections = [];
    gameState.hasValidSave = true;
    saveGameData();
    updateHUD();
    if (callback) callback();
  }
}

function nextStep() {
  const chapterData = CHAPTER_DATA[gameState.currentChapter];
  const currentStep = chapterData.steps[gameState.currentStepIndex];

  if (currentStep && currentStep.type === "quiz") {
    if (!gameState.completedSections.includes(currentStep.listeningSection)) {
      renderQuizOverlay(currentStep.id, currentStep.listeningSection);
      return;
    }
  }

  gameState.currentStepIndex++;

  if (gameState.currentStepIndex >= chapterData.steps.length) {
    renderEnding();
    return;
  }

  const nextStepData = chapterData.steps[gameState.currentStepIndex];
  updateHUD();

  if (nextStepData.listeningSection !== gameState.currentListeningSection) {
    gameState.currentListeningSection = nextStepData.listeningSection;
    gameState.listeningState = "BLIND_LISTENING";
  }

  if (nextStepData.type === "quiz") {
    if (gameState.completedSections.includes(nextStepData.listeningSection)) {
      nextStep();
      return;
    }
    renderQuizOverlay(nextStepData.id, nextStepData.listeningSection);
  } else {
    renderDialogueStep(nextStepData);
  }
}

let sectionReplayQueue = [];
let sectionReplayIndex = 0;
let sectionReplayQuizIdToReturn = null;
let sectionReplayFrozenSection = 1;
let isWrongReviewMode = false;

function triggerSectionReplay() {
  unlockAudioContextIOS();
  const chapterData = CHAPTER_DATA[gameState.currentChapter];
  const targetSection = gameState.activeQuestionSection || gameState.currentListeningSection;
  sectionReplayQuizIdToReturn = gameState.currentQuizId;
  sectionReplayFrozenSection = targetSection;

  sectionReplayQueue = chapterData.steps.filter(s => s.listeningSection === targetSection && s.type === "dialogue");
  if (sectionReplayQueue.length === 0) return;

  sectionReplayIndex = 0;
  if (elements.quizOverlay) elements.quizOverlay.classList.add('hidden');
  gameState.listeningState = "QUESTION_REPLAY";
  renderReplayStepManual(sectionReplayIndex);
}

function triggerWrongReviewReplay(sectionNumber) {
  unlockAudioContextIOS();

  const chapterData =
    CHAPTER_DATA[gameState.currentChapter];

  sectionReplayQueue = chapterData.steps.filter(
    s =>
      s.listeningSection === sectionNumber &&
      s.type === "dialogue"
  );

  if (sectionReplayQueue.length === 0) return;

  isWrongReviewMode = true;
  sectionReplayIndex = 0;
  gameState.listeningState = "QUESTION_REPLAY";

  // 錯題重聽專用 BGM
  switch (sectionNumber) {
    case 1:
      playMainBgm(MAIN_AUDIO.bgmDaily, 500);
      break;

    case 2:
    case 3:
    case 4:
      playMainBgm(MAIN_AUDIO.bgmSchoolDay, 500);
      break;

    case 5:
      playMainBgm(MAIN_AUDIO.bgmNewIdea, 500);
      break;
  }

  renderReplayStepManual(sectionReplayIndex);
}

function renderReplayStepManual(index) {
  stopAllTypewriters();

  if (index >= sectionReplayQueue.length) {
    removeReplayAudioButton("replayQueueFinished");
    gameState.listeningState = "BLIND_LISTENING";
    if (isWrongReviewMode) {
      isWrongReviewMode = false;
      renderWrongReviewScreen();
    } else if (sectionReplayQuizIdToReturn) {
      renderQuizOverlay(sectionReplayQuizIdToReturn, sectionReplayFrozenSection);
    }
    return;
  }

  const stepData = sectionReplayQueue[index];
  stopActiveAudio("renderReplayStepManual", stepData.id);
  
  if (elements.bgNameTag) elements.bgNameTag.innerText = `【背景：${stepData.bg}】`;
  const bgUrl = BACKGROUND_MAP[stepData.bg] || "assets/backgrounds/bg_classroom_day.webp";
  if (elements.bgLayer) {
    elements.bgLayer.style.backgroundImage = `url('${bgUrl}')`;
    elements.bgLayer.style.backgroundSize = "cover";
    elements.bgLayer.style.backgroundPosition = "center";
  }

  const speaker = CHARACTERS[stepData.speaker] || CHARACTERS["hero"];
  if (elements.speakerName) elements.speakerName.innerText = speaker.name;
  if (elements.speakerTitle) elements.speakerTitle.innerText = speaker.title;
  if (elements.vnNameplate) elements.vnNameplate.style.backgroundColor = speaker.color;

  const subtitlesEnabled = ((gameSettings.chineseSubtitle || "on") === 'on');

  if (elements.dialogueJp) {
    elements.dialogueJp.style.display = "block";
  }
  typeWriterText(elements.dialogueJp, stepData.jp);

  if (elements.dialogueZh) {
    if (subtitlesEnabled && stepData.zh) {
      elements.dialogueZh.innerText = formatTextWithPlayer(stepData.zh);
      elements.dialogueZh.style.display = "block";
    } else {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display = "none";
    }
  }

  renderSprite(stepData.position, stepData.speaker, stepData.expression);

  const isPlayer = (stepData.speaker === "player");
  if (isPlayer) {
    removeReplayAudioButton("playerReplayLine");
  } else if (stepData.audio) {
    let replayBtn = document.getElementById('btn-audio-play');
    const controlsContainer = document.querySelector('.vn-dialogue-controls');
    if (!replayBtn && controlsContainer) {
      replayBtn = document.createElement('button');
      replayBtn.id = 'btn-audio-play';
      replayBtn.className = 'vn-ctrl-btn';
      controlsContainer.insertBefore(replayBtn, controlsContainer.firstChild);
    }

    if (replayBtn) {
      replayBtn.classList.remove('hidden');
      playVoiceAudio(stepData.audio, stepData.id);
      replayBtn.disabled = false;
      replayBtn.style.opacity = "1";
      replayBtn.innerText = "🔊 語音重聽";
      replayBtn.onclick = (e) => {
        e.stopPropagation();
        unlockAudioContextIOS();
        playVoiceAudio(stepData.audio, stepData.id);
      };
    }
  } else {
    removeReplayAudioButton("noAudioReplayLine");
  }

  showScreen('gameplay');
}

function refreshCurrentReplaySubtitleLive() {
  if (gameState.listeningState === "QUESTION_REPLAY" || isWrongReviewMode) {
    if (sectionReplayQueue && sectionReplayQueue.length > 0) {
      const stepData = sectionReplayQueue[sectionReplayIndex];
      if (stepData) {
        const subtitlesEnabled = ((gameSettings.chineseSubtitle || "on") === 'on');
        if (elements.dialogueZh) {
          if (subtitlesEnabled && stepData.zh) {
            elements.dialogueZh.innerText = formatTextWithPlayer(stepData.zh);
            elements.dialogueZh.style.display = "block";
          } else {
            elements.dialogueZh.innerHTML = "";
            elements.dialogueZh.style.display = "none";
          }
        }
      }
    }
  } else if (extraEventState.active) {
    const step = EXTRA_EVENT_STEPS[extraEventState.stepIndex];
    if (step && step.zh) {
      const subtitlesEnabled = ((gameSettings.chineseSubtitle || "on") === 'on');
      if (elements.dialogueZh) {
        if (subtitlesEnabled) {
          elements.dialogueZh.innerText = formatTextWithPlayer(step.zh);
          elements.dialogueZh.style.display = "block";
        } else {
          elements.dialogueZh.innerHTML = "";
          elements.dialogueZh.style.display = "none";
        }
      }
    }
  }
}

function renderWrongReviewScreen() {
  removeReplayAudioButton("renderWrongReviewScreen");

  // 回顧列表本身不播放首頁 BGM
  stopMainBgm(300);
  if (!elements.reviewListContent) return;
  elements.reviewListContent.innerHTML = '';
  
  if (!gameState.wrongQuestions || gameState.wrongQuestions.length === 0) {
    elements.reviewListContent.innerHTML = `<div style="text-align: center; padding: 30px; color: #718093; font-weight: bold;">目前沒有錯題。太棒了！</div>`;
  } else {
    gameState.wrongQuestions.forEach(qNum => {
      const div = document.createElement('div');
      div.className = 'review-item';
      div.style.cursor = "pointer";
      div.innerHTML = `
        <div class="review-jp" style="color: #e84118;">📌 任務檢定 Q${qNum} 錯題重聽</div>
        <div class="review-zh">點擊此處重新聆聽 Section ${qNum} 對應的對話內容</div>
      `;

      div.onclick = (e) => {
        e.stopPropagation();
        triggerWrongReviewReplay(qNum);
      };

      elements.reviewListContent.appendChild(div);
    });
  }

  showScreen('review');
}

function renderEnding() {
  removeReplayAudioButton("renderEnding");
  stopAllTypewriters();
  setMainBgmDucked(false);
  stopMorningAmbient(500);
  stopMainBgm(900);

  setTimeout(() => {
    playMainSe(MAIN_AUDIO.seChapterClear);
  }, 950);
  gameState.isCleared = true;
  gameState.listeningState = "COMPLETE";
  stopActiveAudio("renderEnding", "ending");

  if (elements.quizOverlay) {
    elements.quizOverlay.classList.add('hidden');
  }
  if (elements.feedbackModal) {
    elements.feedbackModal.classList.add('hidden');
  }

  const hudConfigBtn = document.getElementById('hud-config-btn');
  const hudGameExitBtn = document.getElementById('btn-game-exit');
  if (hudConfigBtn) hudConfigBtn.style.display = 'none';
  if (hudGameExitBtn) hudGameExitBtn.style.display = 'none';

  if (elements.btnReview) {
    elements.btnReview.classList.remove('hidden');
    elements.btnReview.innerText = "聽力回顧";
  }
  saveGameData();

  if (elements.finalScore) elements.finalScore.innerText = gameState.score;
  if (elements.totalQuizzes) elements.totalQuizzes.innerText = gameState.totalQuizzes;

  const { ren, toru, sato } = gameState.trustPoints;
  if (elements.trustSummaryText) elements.trustSummaryText.innerText = `蓮: ${ren} | 透: ${toru} | 佐藤先生: ${sato}`;

  if (elements.endingBadgeTag) elements.endingBadgeTag.innerText = "CHAPTER 1 CLEAR";
  if (elements.endingTitle) elements.endingTitle.innerText = "第一章完結：不良たちの日本語講座！";
  if (elements.endingEvalText) {
    elements.endingEvalText.innerHTML = formatTextWithPlayer(
      "【第一章測驗全部完成！】：\n" +
      "順利通過全部 5 項聽力任務！{{playerName}}{{playerHonorific}} 成功協助蓮與透完成了文化祭企劃！\n\n" +
      "第一章已順利完成！您可以點擊下方按鈕返回標題畫面，或查看聽力回顧。"
    );
  }

  showScreen('ending');
}

let tempName = "";
let tempHonorific = "ちゃん";

function openNameSetupFlow(onComplete) {
  tempName = (gameState.playerName && gameState.playerName !== "転校生") ? gameState.playerName : "";
  tempHonorific = gameState.playerHonorific || "ちゃん";
  renderNameStep1(onComplete);
  if (elements.nameSetupModal) elements.nameSetupModal.classList.remove('hidden');
}

function renderNameStep1(onComplete) {
  if (!elements.nameSetupBody) return;
  elements.nameSetupBody.innerHTML = `
    <p style="font-weight: bold; margin-bottom: 8px;">請輸入您的玩家名稱：</p>
    <p style="font-size: 0.85rem; color: #718093; margin-bottom: 12px;">（若留空將預設為「転校生」）</p>
    <input type="text" id="input-player-name" class="name-input-field" value="${escapeHTML(tempName)}" placeholder="例如：千夏 / あおい" maxlength="12" style="width: 100%; padding: 10px; font-size: 1rem; border: 1px solid #cbd5e0; border-radius: 6px; margin-bottom: 15px;">
    <div class="modal-footer" style="text-align: right;"><button id="btn-name-next" class="vn-btn primary">下一步 ➔</button></div>
  `;
  const input = document.getElementById('input-player-name');
  if(input) {
    input.focus();
    input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        document.getElementById('btn-name-next').click();
      }
    };
  }
  const nextBtn = document.getElementById('btn-name-next');
  if(nextBtn) {
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      unlockAudioContextIOS();
      tempName = input && input.value.trim() ? input.value.trim() : "転校生";
      renderNameStep2(onComplete);
    };
  }
}

function renderNameStep2(onComplete) {
  if (!elements.nameSetupBody) return;
  const safeName = escapeHTML(tempName);
  elements.nameSetupBody.innerHTML = `
    <p style="font-weight: bold; margin-bottom: 8px;">請問希望被如何稱呼？</p>
    <div style="display: flex; gap: 12px; margin-bottom: 20px;">
      <button class="vn-btn ${tempHonorific === 'ちゃん' ? 'primary' : 'secondary'}" id="btn-opt-chan" style="flex:1; padding: 14px;">${safeName}醬 (ちゃん)</button>
      <button class="vn-btn ${tempHonorific === 'くん' ? 'primary' : 'secondary'}" id="btn-opt-kun" style="flex:1; padding: 14px;">${safeName}君 (くん)</button>
    </div>
    <div class="modal-footer" style="display: flex; justify-content: space-between;"><button id="btn-name-back" class="vn-btn secondary">返回</button><button id="btn-name-next2" class="vn-btn primary">下一步 ➔</button></div>
  `;
  document.getElementById('btn-opt-chan').onclick = (e) => { e.stopPropagation(); unlockAudioContextIOS(); tempHonorific = "ちゃん"; renderNameStep2(onComplete); };
  document.getElementById('btn-opt-kun').onclick = (e) => { e.stopPropagation(); unlockAudioContextIOS(); tempHonorific = "くん"; renderNameStep2(onComplete); };
  document.getElementById('btn-name-back').onclick = (e) => { e.stopPropagation(); renderNameStep1(onComplete); };
  document.getElementById('btn-name-next2').onclick = (e) => { e.stopPropagation(); unlockAudioContextIOS(); renderNameStep3(onComplete); };
}

function renderNameStep3(onComplete) {
  if (!elements.nameSetupBody) return;
  const safeFullName = escapeHTML(tempName + tempHonorific);
  elements.nameSetupBody.innerHTML = `
    <p style="font-weight: bold; margin-bottom: 12px; text-align: center;">確認設定</p>
    <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 20px; font-size: 1.15rem; color: #e84118; font-weight: bold;">確認使用「${safeFullName}」嗎？</div>
    <div class="modal-footer" style="display: flex; justify-content: space-between;"><button id="btn-name-back2" class="vn-btn secondary">重新修改</button><button id="btn-name-confirm" class="vn-btn primary">確認</button></div>
  `;
  document.getElementById('btn-name-back2').onclick = (e) => { e.stopPropagation(); renderNameStep2(onComplete); };
  document.getElementById('btn-name-confirm').onclick = (e) => {
    e.stopPropagation();
    unlockAudioContextIOS();
    gameState.playerName = tempName;
    gameState.playerHonorific = tempHonorific;
    if (elements.nameSetupModal) elements.nameSetupModal.classList.add('hidden');
    saveGameData();
    if (onComplete) onComplete();
  };
}

function startNewGame() {
  unlockAudioContextIOS();
  openNameSetupFlow(() => {
    gameState.hasValidSave = true;
    gameState.currentChapter = 1;
    gameState.currentStepIndex = 0;
    gameState.score = 0;
    gameState.trustPoints = { ren: 0, toru: 0, sato: 0 };
    gameState.isCleared = false;
    gameState.listeningState = "BLIND_LISTENING";
    gameState.currentListeningSection = 1;
    gameState.completedSections = [];
    gameState.scoredSections = [];
    gameState.wrongQuestions = [];
    saveGameData();
    
    playChapterTransition(1, () => {
      renderDialogueStep(CHAPTER_DATA[1].steps[0]);
    });
  });
}

function continueGame() {
  unlockAudioContextIOS();

  const loaded = loadGameData();

  if (!loaded || !gameState.hasValidSave) {
    if (elements.noSaveModal) {
      elements.noSaveModal.classList.add('hidden');
    }
    return;
  }

  // Extra Event 中途曾經重整：
  // 不回 Q4 Quiz，直接從 Extra Event 開頭重新播放。
  if (gameState.extraEventPending === true) {
    stopMainBgm(0);
    startExtraEvent();
    return;
  }

  updateHUD();
  const chapterData = CHAPTER_DATA[gameState.currentChapter] || CHAPTER_DATA[1];
  let stepIndex = Math.min(gameState.currentStepIndex, chapterData.steps.length - 1);
  
  const step = chapterData.steps[stepIndex];
  if (step && step.type === "quiz") {
    if (gameState.completedSections.includes(step.listeningSection)) {
      if (step.nextStepIndex !== undefined && step.nextStepIndex !== -1) {
        stepIndex = step.nextStepIndex;
      } else {
        const foundIdx = chapterData.steps.findIndex(s => s.type !== "quiz" && s.listeningSection > step.listeningSection);
        if (foundIdx !== -1) {
          stepIndex = foundIdx;
        } else {
          renderEnding();
          return;
        }
      }
    }
  }

  gameState.currentStepIndex = stepIndex;
  const targetStep = chapterData.steps[stepIndex];

  if (targetStep && targetStep.type === "quiz") {
    renderQuizOverlay(targetStep.id, targetStep.listeningSection);
  } else if (targetStep) {
    renderDialogueStep(targetStep);
  } else {
    renderDialogueStep(chapterData.steps[0]);
  }
}

let isMainStoryTransitioning = false;

function handleDialogueBoxClick(e) {
  e.stopPropagation();
  if (isMainStoryTransitioning) return;
  unlockAudioContextIOS();

  if (elements.quizOverlay && !elements.quizOverlay.classList.contains('hidden')) return;
  if (elements.choiceOverlay && !elements.choiceOverlay.classList.contains('hidden')) return;
  if (elements.feedbackModal && !elements.feedbackModal.classList.contains('hidden')) return;
  if (elements.nameSetupModal && !elements.nameSetupModal.classList.contains('hidden')) return;
  if (elements.dangerConfirmModal && !elements.dangerConfirmModal.classList.contains('hidden')) return;
  if (elements.exitConfirmModal && !elements.exitConfirmModal.classList.contains('hidden')) return;
  if (elements.noSaveModal && !elements.noSaveModal.classList.contains('hidden')) return;

  if (extraEventState.active) {
    const fullTextAttr = elements.dialogueJp ? elements.dialogueJp.getAttribute('data-full-text') : null;
    if (fullTextAttr && typingTimers.has(elements.dialogueJp)) {
      const timer = typingTimers.get(elements.dialogueJp);
      if (timer) {
        clearInterval(timer);
        typingTimers.delete(elements.dialogueJp);
      }
      elements.dialogueJp.innerHTML = fullTextAttr;
      elements.dialogueJp.removeAttribute('data-full-text');
      return;
    }
    advanceExtraEvent();
    return;
  }

  if (isWrongReviewMode) {
    stopAllTypewriters();
    stopActiveAudio("handleDialogueBoxClick_wrongReview", "wrongReview");
    sectionReplayIndex++;
    renderReplayStepManual(sectionReplayIndex);
    return;
  }

  if (gameState.listeningState === "QUESTION_REPLAY") {
    stopAllTypewriters();
    stopActiveAudio("handleDialogueBoxClick_replay", "replay");
    sectionReplayIndex++;
    renderReplayStepManual(sectionReplayIndex);
    return;
  }

  const chapterData = CHAPTER_DATA[gameState.currentChapter];
  const currentStep = chapterData.steps[gameState.currentStepIndex];
  if (currentStep && currentStep.type === "quiz") {
    if (gameState.completedSections.includes(currentStep.listeningSection)) {
      nextStep();
      return;
    }
    renderQuizOverlay(currentStep.id, currentStep.listeningSection);
    return;
  }

  nextStep();
}

/* ==========================================================================
   DOM 安全事件綁定初始化
   ========================================================================== */

function closeMobileHudMenu() {
  const panel =
    document.getElementById('hud-mobile-menu-panel');

  const button =
    document.getElementById('hud-mobile-menu-btn');

  if (panel) {
    panel.classList.remove('is-open');
  }

  if (button) {
    button.setAttribute('aria-expanded', 'false');
  }
}

function toggleMobileHudMenu() {
  const panel =
    document.getElementById('hud-mobile-menu-panel');

  const button =
    document.getElementById('hud-mobile-menu-btn');

  if (!panel || !button) return;

  const willOpen =
    !panel.classList.contains('is-open');

  panel.classList.toggle('is-open', willOpen);

  button.setAttribute(
    'aria-expanded',
    willOpen ? 'true' : 'false'
  );
}

function initEventListeners() {
  screens.title = document.getElementById('screen-title');
  screens.instructions = document.getElementById('screen-instructions');
  screens.gameplay = document.getElementById('screen-gameplay');
  screens.ending = document.getElementById('screen-ending');
  screens.review = document.getElementById('screen-review');
  screens.config = document.getElementById('screen-config');

  screens.extraCollection =
    document.getElementById(
    'screen-extra-collection'
  );

  elements = {
    vnHud: document.getElementById('vn-hud'),
    trustRen: document.getElementById('trust-ren'),
    trustToru: document.getElementById('trust-toru'),
    trustSato: document.getElementById('trust-sato'),
    hudChapterTitle: document.getElementById('hud-chapter-title'),
    bgLayer: document.getElementById('vn-background'),
    bgNameTag: document.getElementById('bg-name-tag'),
    spriteLeft: document.getElementById('sprite-left'),
    spriteCenter: document.getElementById('sprite-center'),
    spriteRight: document.getElementById('sprite-right'),
    spriteLeftBody: document.getElementById('sprite-left-body'),
    spriteCenterBody: document.getElementById('sprite-center-body'),
    spriteRightBody: document.getElementById('sprite-right-body'),
    speakerName: document.getElementById('speaker-name'),
    speakerTitle: document.getElementById('speaker-title'),
    vnNameplate: document.getElementById('vn-nameplate'),
    dialogueJp: document.getElementById('dialogue-jp'),
    dialogueZh: document.getElementById('dialogue-zh'),
    btnAudioPlay: document.getElementById('btn-audio-play'),
    btnStart: document.getElementById('btn-start'),
    btnContinue: document.getElementById('btn-continue'),
    btnTitleConfig: document.getElementById('btn-title-config'),
    btnReview: document.getElementById('btn-review'),
    quizOverlay: document.getElementById('vn-quiz-overlay'),
    quizTypeBadge: document.getElementById('quiz-type-badge'),
    quizNumberTag: document.getElementById('quiz-number-tag'),
    quizQuestion: document.getElementById('quiz-question'),
    quizOptions: document.getElementById('quiz-options'),
    choiceOverlay: document.getElementById('vn-choice-overlay'),
    choiceButtonsGrid: document.getElementById('choice-buttons-grid'),
    feedbackModal: document.getElementById('feedback-modal'),
    feedbackParsingContainer: document.getElementById('feedback-parsing-container'),
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackTitle: document.getElementById('feedback-title'),
    playerChoiceBox: document.getElementById('player-choice-box'),
    playerChoiceText: document.getElementById('player-choice-text'),
    correctChoiceText: document.getElementById('correct-choice-text'),
    feedbackStory: document.getElementById('feedback-story'),
    feedbackJpOriginal: document.getElementById('feedback-jp-original'),
    feedbackZhTrans: document.getElementById('feedback-zh-trans'),
    feedbackWords: document.getElementById('feedback-words'),
    feedbackExplanation: document.getElementById('feedback-explanation'),
    btnRetryQuiz: document.getElementById('btn-retry-quiz'),
    btnCloseFeedback: document.getElementById('btnCloseFeedback'),
    finalScore: document.getElementById('final-score'),
    totalQuizzes: document.getElementById('total-quizzes'),
    trustSummaryText: document.getElementById('trust-summary-text'),
    endingBadgeTag: document.getElementById('ending-badge-tag'),
    endingTitle: document.getElementById('ending-title'),
    endingEvalText: document.getElementById('ending-eval-text'),
    chapterBanner: document.getElementById('chapter-banner'),
    bannerSubtitle: document.getElementById('banner-subtitle'),
    bannerTitle: document.getElementById('banner-title'),
    reviewListContent: document.getElementById('review-list-content'),
    nameSetupModal: document.getElementById('name-setup-modal'),
    nameSetupBody: document.getElementById('name-setup-body'),
    cfgBgmSlider: document.getElementById('cfg-bgm-slider'),
    cfgSeSlider: document.getElementById('cfg-se-slider'),
    cfgVoiceSlider: document.getElementById('cfg-voice-slider'),
    cfgBgmVal: document.getElementById('cfg-bgm-val'),
    cfgSeVal: document.getElementById('cfg-se-val'),
    cfgVoiceVal: document.getElementById('cfg-voice-val'),
    cfgTextSpeedGroup: document.getElementById('cfg-text-speed-group'),
    cfgSubtitleGroup: document.getElementById('cfg-subtitle-group'),
    btnModeWindow: document.getElementById('btn-mode-window'),
    btnModeFullscreen: document.getElementById('btn-mode-fullscreen'),
    cfgPlayerNameText: document.getElementById('cfg-player-name-text'),
    cfgPlayerHonorificText: document.getElementById('cfg-player-honorific-text'),
    btnCfgChangeName: document.getElementById('btn-cfg-change-name'),
    btnCfgChangeHonorific: document.getElementById('btn-cfg-change-honorific'),
    btnCfgResetData: document.getElementById('btn-cfg-reset-data'),
    btnConfigBack: document.getElementById('btn-config-back'),
    dangerConfirmModal: document.getElementById('danger-confirm-modal'),
    btnCancelReset: document.getElementById('btn-cancel-reset'),
    btnConfirmReset: document.getElementById('btn-confirm-reset'),
    exitConfirmModal: document.getElementById('exit-confirm-modal'),
    btnCancelExit: document.getElementById('btn-cancel-exit'),
    btnConfirmExit: document.getElementById('btn-confirm-exit'),
    noSaveModal: document.getElementById('no-save-modal'),
    btnNoSaveOk: document.getElementById('btn-no-save-ok')
  };

  const bindClick = (id, handler) => {
    const el = document.getElementById(id);
    if (el) {
      el.onclick = (e) => {
        e.stopPropagation();
        unlockAudioContextIOS();
        try {
          handler(e);
        } catch (err) {
          console.error(`[ERROR in handler for #${id}]:`, err);
        }
      };
    }
  };

  
  bindClick('btn-start', () => startNewGame());
bindClick('btn-continue', () => continueGame());

bindClick(
  'btn-how-to-play',
  () => showScreen('instructions')
);

bindClick(
  'btn-extra-collection',
  () => openExtraCollection()
);

bindClick(
  'btn-extra-collection-back',
  () => showScreen('title')
);

bindClick(
  'btn-title-config',
  () => openConfigScreen('title')
);

bindClick(
  'btn-review',
  () => renderWrongReviewScreen()
);

bindClick(
  'vn-btn-review',
  () => renderWrongReviewScreen()
);

  bindClick('hud-mobile-menu-btn', (event) => {
  event.stopPropagation();
  toggleMobileHudMenu();
});

  bindClick('hud-config-btn', () => {
  closeMobileHudMenu();
  openConfigScreen('gameplay');
});

  bindClick('btn-game-exit', () => {
  closeMobileHudMenu();

  if (elements.exitConfirmModal) {
    elements.exitConfirmModal.classList.remove('hidden');
  }
});

document.addEventListener('click', (event) => {
  const panel =
    document.getElementById('hud-mobile-menu-panel');

  const button =
    document.getElementById('hud-mobile-menu-btn');

  if (!panel || !button) return;
  if (!panel.classList.contains('is-open')) return;

  if (
    panel.contains(event.target) ||
    button.contains(event.target)
  ) {
    return;
  }

  closeMobileHudMenu();
});

  bindClick('btn-back-to-title', () => showScreen('title'));
  bindClick('btn-restart', () => {
    saveGameData();
    stopAllTypewriters();
    stopActiveAudio("restartButton", "restart");
    removeReplayAudioButton("restartButton");
    showScreen('title');
    updateTitleScreenButtons();
  });
  bindClick('btn-close-review', () => showScreen('title'));

  bindClick('btn-cancel-exit', () => {
    if (elements.exitConfirmModal) elements.exitConfirmModal.classList.add('hidden');
  });
  bindClick('btn-confirm-exit', () => {
    saveGameData();
    stopAllTypewriters();
    stopActiveAudio("confirmExit", "exit");
    removeReplayAudioButton("confirmExit");
    if (elements.exitConfirmModal) elements.exitConfirmModal.classList.add('hidden');
    showScreen('title');
    updateTitleScreenButtons();
  });

  bindClick('btn-no-save-ok', () => {
    if (elements.noSaveModal) elements.noSaveModal.classList.add('hidden');
  });

  bindClick('btn-retry-quiz', () => {
    if (elements.feedbackModal) elements.feedbackModal.classList.add('hidden');
    renderQuizOverlay(gameState.currentQuizId, gameState.activeQuestionSection);
  });

  bindClick('btnCloseFeedback', (e) => {
    if (isMainStoryTransitioning) return;
    e.stopPropagation();

    const quiz = QUIZZES[gameState.currentQuizId];
    const qNum = quiz ? quiz.quizNumber : 1;

    // 若為 Q1，立即鎖定轉場並關閉 UI
    if (qNum === 1) {
      isMainStoryTransitioning = true;
    }

    if (elements.feedbackModal) elements.feedbackModal.classList.add('hidden');
    if (elements.quizOverlay) elements.quizOverlay.classList.add('hidden');
    if (elements.choiceOverlay) elements.choiceOverlay.classList.add('hidden');

    if (qNum === 1) {
      setMainBgmDucked(false);
      stopMorningAmbient(700);
      stopMainBgm(700);
    } else if (qNum === 2 || qNum === 3) {
      setMainBgmDucked(false);
    } else if (qNum === 4) {
      setMainBgmDucked(false);
      stopMainBgm(700);
    }

    stopAllTypewriters();
    stopActiveAudio("closeFeedback", "feedback");
    removeReplayAudioButton("closeFeedback");

    const chapterData = CHAPTER_DATA[gameState.currentChapter];
    let nextStepIdx = -1;

    if (qNum === 1) {
      nextStepIdx = chapterData.steps.findIndex(s => s.id === "ch1_s02_015_sato");
    } else if (qNum === 2) {
      nextStepIdx = chapterData.steps.findIndex(s => s.id === "ch1_s02_028_ren");
    } else if (qNum === 3) {
      nextStepIdx = chapterData.steps.findIndex(s => s.id === "ch1_s03_033_sato");
    } else if (qNum === 4) {
      nextStepIdx = chapterData.steps.findIndex(s => s.id === "ch1_s03_055_ren");
    } else if (qNum === 5) {
      isMainStoryTransitioning = false;
      renderEnding();
      return;
    }

    if (nextStepIdx === -1 || nextStepIdx >= chapterData.steps.length) {
      isMainStoryTransitioning = false;
      renderEnding();
      return;
    }

    const continueToNextStep = () => {
      gameState.currentStepIndex = nextStepIdx;
      const nextStepData = chapterData.steps[gameState.currentStepIndex];

      gameState.currentListeningSection = nextStepData.listeningSection;
      gameState.listeningState = "BLIND_LISTENING";
      gameState.currentQuizId = null;

      updateHUD();

      if (nextStepData.type === "quiz") {
        if (!gameState.completedSections.includes(nextStepData.listeningSection)) {
          renderQuizOverlay(nextStepData.id, nextStepData.listeningSection);
        } else {
          nextStep();
        }
      } else {
        renderDialogueStep(nextStepData);
      }

      // 解除轉場鎖
      isMainStoryTransitioning = false;
    };

    if (qNum === 1) {
  const dialogueBoxEl = document.getElementById('vn-dialogue-box');

  const gameplayLayers = [
    elements.bgLayer,
    elements.spriteLeft,
    elements.spriteCenter,
    elements.spriteRight,
    dialogueBoxEl
  ].filter(Boolean);

  // 014 整個畫面一起淡出：
  // 背景 + 立繪 + 對話框
  gameplayLayers.forEach(el => {
    el.style.transition = "opacity 500ms ease";
    el.style.opacity = "0";
  });

  setTimeout(() => {
    // 進入純黑畫面
    if (elements.bgLayer) {
      elements.bgLayer.style.backgroundImage = "none";
      elements.bgLayer.style.backgroundColor = "#000000";
      elements.bgLayer.style.opacity = "1";
    }

    // 立繪與對話框保持隱藏
    [
      elements.spriteLeft,
      elements.spriteCenter,
      elements.spriteRight,
      dialogueBoxEl
    ].filter(Boolean).forEach(el => {
      el.style.opacity = "0";
    });

    // 黑畫面期間完整播放鐘聲
    playMainSe(MAIN_AUDIO.seSchoolBell, () => {

      // 鐘聲結束後才正式載入 015
      continueToNextStep();

      // 015 已經 render，但先保持透明
      [
        elements.spriteLeft,
        elements.spriteCenter,
        elements.spriteRight,
        dialogueBoxEl
      ].filter(Boolean).forEach(el => {
        el.style.opacity = "0";
      });

      if (elements.bgLayer) {
        elements.bgLayer.style.opacity = "0";
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {

          // 015 新場景整體淡入
          gameplayLayers.forEach(el => {
            el.style.opacity = "1";
          });

          // 淡入完成後清掉臨時樣式
          setTimeout(() => {
            gameplayLayers.forEach(el => {
              el.style.transition = "";
              el.style.opacity = "";
            });

            if (elements.bgLayer) {
              elements.bgLayer.style.backgroundColor = "";
            }
          }, 500);
        });
      });
    });
  }, 500);

  return;
}

    continueToNextStep();
  });

  bindClick('btn-config-back', () => closeConfigScreen());
  bindClick('btn-cfg-reset-data', () => {
    if (elements.dangerConfirmModal) elements.dangerConfirmModal.classList.remove('hidden');
  });
  bindClick('btn-cancel-reset', () => {
    if (elements.dangerConfirmModal) elements.dangerConfirmModal.classList.add('hidden');
  });
  bindClick('btn-confirm-reset', () => {
    stopAllTypewriters();
    stopActiveAudio("confirmReset", "reset");
    removeReplayAudioButton("confirmReset");
    gameState.currentChapter = 1;
    gameState.currentStepIndex = 0;
    gameState.score = 0;
    gameState.trustPoints = { ren: 0, toru: 0, sato: 0 };
    gameState.isCleared = false;
    gameState.listeningState = "BLIND_LISTENING";
    gameState.currentListeningSection = 1;
    gameState.completedSections = [];
    gameState.scoredSections = [];
    gameState.wrongQuestions = [];
    gameState.hasValidSave = false;
    
    localStorage.removeItem('furyo_vn_save');
    if (elements.dangerConfirmModal) elements.dangerConfirmModal.classList.add('hidden');
    updateTitleScreenButtons();
    showScreen('title');
  });

  if (elements.cfgTextSpeedGroup) {
    elements.cfgTextSpeedGroup.querySelectorAll('.vn-btn-select').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        unlockAudioContextIOS();
        const speed = btn.dataset.speed;
        if (speed) {
          gameSettings.textSpeed = speed;
          syncConfigUI();
          saveGameData();
        }
      };
    });
  }

  if (elements.cfgSubtitleGroup) {
    elements.cfgSubtitleGroup.querySelectorAll('.vn-btn-select').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        unlockAudioContextIOS();
        const sub = btn.dataset.sub;
        if (sub) {
          gameSettings.chineseSubtitle = sub;
          syncConfigUI();
          saveGameData();
          refreshCurrentReplaySubtitleLive();
        }
      };
    });
  }

  if (elements.btnModeWindow) {
    elements.btnModeWindow.onclick = (e) => {
      e.stopPropagation();
      unlockAudioContextIOS();
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        let exitPromise = null;
        if (document.exitFullscreen) {
          exitPromise = document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          exitPromise = document.webkitExitFullscreen();
        }
        if (exitPromise && typeof exitPromise.then === 'function') {
          exitPromise.catch(err => {
            console.error("退出全螢幕失敗:", err);
          });
        }
      }
      syncConfigUI();
    };
  }

  if (elements.btnModeFullscreen) {
    elements.btnModeFullscreen.onclick = (e) => {
      e.stopPropagation();
      unlockAudioContextIOS();
      toggleFullscreen();
      syncConfigUI();
    };
  }

  document.addEventListener("fullscreenchange", () => { syncConfigUI(); });
  document.addEventListener("webkitfullscreenchange", () => { syncConfigUI(); });

  if (elements.btnCfgChangeName) {
    elements.btnCfgChangeName.onclick = (e) => {
      e.stopPropagation();
      unlockAudioContextIOS();
      openNameSetupFlow(() => {
        syncConfigUI();
        saveGameData();
      });
    };
  }

  if (elements.btnCfgChangeHonorific) {
    elements.btnCfgChangeHonorific.onclick = (e) => {
      e.stopPropagation();
      unlockAudioContextIOS();
      openNameSetupFlow(() => {
        syncConfigUI();
        saveGameData();
      });
    };
  }

  const dialogueBoxEl = document.getElementById('vn-dialogue-box');
  if (dialogueBoxEl) {
    dialogueBoxEl.onclick = handleDialogueBoxClick;
  }

  if (elements.cfgBgmSlider) {
  elements.cfgBgmSlider.oninput = (e) => {
    gameSettings.bgmVolume =
      parseInt(e.target.value, 10);

    if (elements.cfgBgmVal) {
      elements.cfgBgmVal.innerText =
        `${gameSettings.bgmVolume}%`;
    }

    const volume = Math.max(
      0,
      Math.min(
        1,
        (gameSettings.bgmVolume ?? 0) / 100
      )
    );

    /*
     * 先停止舊的 Main BGM fade，
     * 否則 slider 剛設定的 volume
     * 會被 fade timer 再寫回去。
     */
    if (mainBgmFadeTimer) {
      clearInterval(mainBgmFadeTimer);
      mainBgmFadeTimer = null;
    }

    /*
 * Main BGM 的使用者音量
 * 統一交給 Web Audio GainNode。
 */
updateMainBgmGain();

    /*
     * Extra Event BGM
     */
    if (
      typeof extraBgmAudio !== "undefined" &&
      extraBgmAudio
    ) {
      if (extraBgmFadeTimer) {
        clearInterval(extraBgmFadeTimer);
        extraBgmFadeTimer = null;
      }

      extraBgmAudio.volume = volume;
    }

    /*
     * 相容舊 channel。
     */
    if (
      typeof extraEventBgmAudio !== "undefined" &&
      extraEventBgmAudio
    ) {
      extraEventBgmAudio.volume = volume;
    }

    saveGameData();
  };
}

  if (elements.cfgSeSlider) {
  elements.cfgSeSlider.oninput = (e) => {
    gameSettings.seVolume =
      parseInt(e.target.value, 10);

    if (elements.cfgSeVal) {
      elements.cfgSeVal.innerText =
        `${gameSettings.seVolume}%`;
    }

    const volume =
      getMainSeVolume();

    /*
     * 校園早晨環境音
     */
    if (morningAmbientAudio) {
      if (morningAmbientFadeTimer) {
        clearInterval(
          morningAmbientFadeTimer
        );
        morningAmbientFadeTimer = null;
      }

      morningAmbientAudio.volume =
        getMorningAmbientVolume();
    }

    /*
     * Main Story SE
     */
    if (
      typeof mainSePool !== "undefined" &&
      Array.isArray(mainSePool)
    ) {
      mainSePool.forEach((audio) => {
        if (!audio) return;

        audio.volume = volume;
      });
    }

    /*
     * Extra Event SE
     */
    if (
      typeof extraSePool !== "undefined" &&
      extraSePool
    ) {
      extraSePool.forEach((audio) => {
        if (!audio) return;

        audio.volume = volume;
      });
    }

    saveGameData();
  };
}

if (elements.cfgVoiceSlider) {
  elements.cfgVoiceSlider.oninput = (e) => {
    gameSettings.voiceVolume =
      parseInt(e.target.value, 10);

    if (elements.cfgVoiceVal) {
      elements.cfgVoiceVal.innerText =
        `${gameSettings.voiceVolume}%`;
    }

    /*
     * 正在播放中的主 Voice
     * 也立即套用新音量。
     */
    if (activeAudioInstance) {
      activeAudioInstance.volume =
        Math.max(
          0,
          Math.min(
            1,
            (gameSettings.voiceVolume ?? 0) / 100
          )
        );
    }

    saveGameData();
  };
}
}

function stopAllGameAudioForPageExit() {
  try {
    stopMainBgm(0);
  } catch (e) {}

  try {
    stopMorningAmbient(0);
  } catch (e) {}

  try {
    stopExtraBgm(0);
  } catch (e) {}

  try {
    stopActiveAudio(
      "pageExit",
      "pageExit"
    );
  } catch (e) {}

  try {
    stopParallelVoices();
  } catch (e) {}

  try {
    if (
      typeof mainSePool !== "undefined" &&
      Array.isArray(mainSePool)
    ) {
      mainSePool.forEach((audio) => {
        if (!audio) return;

        audio.pause();
        audio.currentTime = 0;
      });
      /*
 * Extra Event 正在播放中的 SE
 */
if (
  typeof extraSePool !== "undefined" &&
  extraSePool
) {
  const volume = getMainSeVolume();

  extraSePool.forEach((audio) => {
    if (audio) {
      audio.volume = volume;
    }
  });
}
    }
  } catch (e) {}
/*
 * Extra Event SE
 */
try {
  if (
    typeof extraSePool !== "undefined" &&
    extraSePool
  ) {
    extraSePool.forEach((audio) => {
      if (!audio) return;

      try {
        audio.pause();
        audio.currentTime = 0;
        audio.src = "";
        audio.load();
      } catch (e) {}
    });

    extraSePool.clear();
  }
} catch (e) {}

/*
 * 舊 Extra Event BGM channel
 */
try {
  if (
    typeof extraEventBgmAudio !== "undefined" &&
    extraEventBgmAudio
  ) {
    extraEventBgmAudio.pause();
    extraEventBgmAudio.currentTime = 0;
    extraEventBgmAudio.src = "";
    extraEventBgmAudio.load();
    extraEventBgmAudio = null;
  }
} catch (e) {}

}

window.addEventListener(
  "pagehide",
  stopAllGameAudioForPageExit
);

window.addEventListener(
  "beforeunload",
  stopAllGameAudioForPageExit
);



document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  loadExtraGalleryData();
  loadGameData();
  updateTitleScreenButtons();
  initStartGate();
  showScreen('title');
});