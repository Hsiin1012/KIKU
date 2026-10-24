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
  "narrator": { name: "旁白", title: "", color: "#718093", image: null },
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
  "龍神高中 (校園全景黃昏)": "assets/backgrounds/bg_office.webp",
  "職員室": "assets/backgrounds/bg_office.webp",
  "校園走廊 (放學後)": "assets/backgrounds/bg_corridor_evening.webp"
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
    "smile": "assets/characters/ren/ren_smile.webp",
    "serious": "assets/characters/ren/ren_serious.webp",
    "sad": "assets/characters/ren/ren_sad.webp",
    "shy": "assets/characters/ren/ren_shy.webp"
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
    "smile": "assets/characters/toru/toru_smile.webp",
    "angry": "assets/characters/toru/toru_angry.webp",
    "sad": "assets/characters/toru/toru_sad.webp",
    "surprised": "assets/characters/toru/toru_surprised.webp"
  },
  "sato": {
    "溫和微笑": "assets/characters/sato/sato_smile.webp",
    "黑臉微笑": "assets/characters/sato/sato_scarysmile.webp",
    "標準": "assets/characters/sato/sato_normal.webp",
    "normal": "assets/characters/sato/sato_normal.webp",
    "scarysmile": "assets/characters/sato/sato_scarysmile.webp",
    "smile": "assets/characters/sato/sato_smile.webp",
    "wrysmile": "assets/characters/sato/sato_wrysmile.webp",
    "sigh": "assets/characters/sato/sato_sigh.webp",
    "pleased": "assets/characters/sato/sato_pleased.webp"
  },
  "misaki": {
    "活潑得意": "assets/characters/misaki/misaki_excited.webp",
    "標準": "assets/characters/misaki/misaki_normal.webp",
    "excited": "assets/characters/misaki/misaki_excited.webp",
    "normal": "assets/characters/misaki/misaki_normal.webp",
    "curious": "assets/characters/misaki/misaki_curious.webp",
    "embarrased": "assets/characters/misaki/misaki_embarrased.webp",
    "surprised": "assets/characters/misaki/misaki_surprised.webp",
    "angry": "assets/characters/misaki/misaki_angry.webp",
    "sad": "assets/characters/misaki/misaki_sad.webp",
    "serious": "assets/characters/misaki/misaki_serious.webp",
    "laugh": "assets/characters/misaki/misaki_laugh.webp"
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

/*
 * Extra Event Collection Replay Mode
 * 收藏頁重播與主線觸發流程分離。
 */
let extraEventReplayFromCollection = false;

const EXTRA_AUDIO = {
  seTrigger: "assets/se/se_extra_trigger.ogg",
  seTitle: "assets/se/se_extra_title.ogg",
  seImagination: "assets/se/se_imagination.ogg",
  bgmComedy: "assets/bgm/bgm_extra_comedy.ogg"
};

let extraBgmAudio = null;
let extraBgmFadeTimer = null;

/*
 * Extra Event BGM Web Audio
 * iPhone / iPad 上不依賴 HTMLAudio.volume。
 * Extra BGM 使用獨立 GainNode，並保留自己的音量倍率。
 */
const EXTRA_BGM_VOLUME_FACTOR = 0.48;
let extraBgmAudioContext = null;
let extraBgmMasterGain = null;
let extraBgmAudioNodes = new WeakMap();

function updateExtraBgmGain() {
  if (!extraBgmMasterGain) return;

  const volume = Math.max(
    0,
    Math.min(
      1,
      (gameSettings.bgmVolume ?? 0) / 100
    )
  );

  try {
    extraBgmMasterGain.gain.value =
      volume * EXTRA_BGM_VOLUME_FACTOR;
  } catch (e) {}
}

function ensureExtraBgmWebAudio(audio) {
  if (!audio) return null;

  try {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) return null;

    if (!extraBgmAudioContext) {
      extraBgmAudioContext =
        new AudioContextClass();

      extraBgmMasterGain =
        extraBgmAudioContext.createGain();

      extraBgmMasterGain.connect(
        extraBgmAudioContext.destination
      );

      updateExtraBgmGain();
    }

    if (extraBgmAudioNodes.has(audio)) {
      return extraBgmAudioNodes.get(audio);
    }

    const source =
      extraBgmAudioContext
        .createMediaElementSource(audio);

    const fadeGain =
      extraBgmAudioContext.createGain();

    fadeGain.gain.value = 0;

    source.connect(fadeGain);
    fadeGain.connect(extraBgmMasterGain);

    const nodes = { source, fadeGain };
    extraBgmAudioNodes.set(audio, nodes);

    audio.volume = 1;
    updateExtraBgmGain();

    return nodes;
  } catch (err) {
    console.warn(
      "[EXTRA BGM] Web Audio init failed:",
      err
    );
    return null;
  }
}

function resumeExtraBgmAudioContext() {
  if (
    extraBgmAudioContext &&
    extraBgmAudioContext.state === "suspended"
  ) {
    try {
      extraBgmAudioContext.resume().catch(() => {});
    } catch (e) {}
  }
}

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

audio.volume =
  volume * MAIN_SE_VOLUME_FACTOR;
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
    audio.muted = gameSettings.bgmVolume <= 0;

    const nodes = ensureExtraBgmWebAudio(audio);

    if (nodes) {
      audio.volume = 1;
      nodes.fadeGain.gain.value = 0;
      updateExtraBgmGain();
      resumeExtraBgmAudioContext();
    } else {
      audio.volume = 0;
    }

    extraBgmAudio = audio;

    console.log("[EXTRA BGM] load:", cleanPath);

    audio.play()
      .then(() => {
        console.log("[EXTRA BGM] playing:", cleanPath);

        if (nodes) {
          if (fadeMs <= 0) {
            nodes.fadeGain.gain.value = 1;
            return;
          }

          const startTime = performance.now();
          extraBgmFadeTimer = setInterval(() => {
            const progress = Math.min(
              1,
              (performance.now() - startTime) / fadeMs
            );

            nodes.fadeGain.gain.value = progress;

            if (progress >= 1) {
              clearInterval(extraBgmFadeTimer);
              extraBgmFadeTimer = null;
              nodes.fadeGain.gain.value = 1;
            }
          }, 40);
          return;
        }

        /* Web Audio 不可用時保留 HTMLAudio fallback。 */
        const targetVolume =
          Math.max(0, Math.min(1,
            ((gameSettings.bgmVolume ?? 50) / 100) *
            EXTRA_BGM_VOLUME_FACTOR
          ));

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

  const nodes = extraBgmAudioNodes.get(audio);

  if (nodes) {
    const startGain = nodes.fadeGain.gain.value;

    if (fadeMs <= 0 || startGain <= 0) {
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

      nodes.fadeGain.gain.value =
        Math.max(0, startGain * (1 - progress));

      if (progress >= 1) {
        clearInterval(timer);
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch (e) {}
      }
    }, 40);
    return;
  }

  /* Web Audio fallback。 */
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

  /*
   * Extra Event 中保留「設定」入口，方便即時調整 BGM / SE / Voice。
   * 「返回標題」仍維持隱藏，避免這次測試同時改動退出流程。
   */
  if (hudConfigBtn) hudConfigBtn.style.display = 'block';
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

  /*
   * 收藏頁 Replay：
   * 不顯示主線 Q4 feedback、不寫入主線存檔，
   * 播完直接回 Extra Event Collection。
   */
  if (extraEventReplayFromCollection) {
    extraEventReplayFromCollection = false;

    renderExtraCollection();
    showScreen("extraCollection");
    startTitleBgm();
    return;
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
  },
  2: {
    title: "第二章：每個人說的都不是同一件事",
    totalQuizzes: 5,
    steps: [
      { id: "ch2_player_001", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "じゃあ、進み具合を確認しようか。", zh: "那我們來確認一下目前的進度吧。", audio: null, listeningSection: 1 },
      { id: "ch2_s01_001_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "smile", position: "left", jp: "俺からでいいぞ。会場は押さえた。", zh: "我先說吧。場地已經搞定了。", audio: "/assets/voice/chapter2/voice_ch2_s01_001_ren.m4a", listeningSection: 1 },
      { id: "ch2_s01_002_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "normal", position: "left", jp: "多目的室。さっき見てきた。", zh: "多功能教室。我剛才去看過了。", audio: "/assets/voice/chapter2/voice_ch2_s01_002_ren.m4a", listeningSection: 1 },
      { id: "ch2_s01_003_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "surprised", position: "right", jp: "ちょっと待て。", zh: "等一下。", audio: "/assets/voice/chapter2/voice_ch2_s01_003_toru.m4a", listeningSection: 1 },
      { id: "ch2_s01_004_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "なんだよ。", zh: "幹嘛啦。", audio: "/assets/voice/chapter2/voice_ch2_s01_004_ren.m4a", listeningSection: 1 },
      { id: "ch2_s01_005_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "『押さえた』って、ちゃんと予約したのか？", zh: "你說「搞定了」，是真的有好好預約嗎？", audio: "/assets/voice/chapter2/voice_ch2_s01_005_toru.m4a", listeningSection: 1 },
      { id: "ch2_s01_006_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "embarrased", position: "left", jp: "……見てきた。", zh: "……我去看過了。", audio: "/assets/voice/chapter2/voice_ch2_s01_006_ren.m4a", listeningSection: 1 },
      { id: "ch2_s01_007_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "sigh", position: "right", jp: "何を？", zh: "看什麼？", audio: "/assets/voice/chapter2/voice_ch2_s01_007_toru.m4a", listeningSection: 1 },
      { id: "ch2_s01_008_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "会場。", zh: "場地啊。", audio: "/assets/voice/chapter2/voice_ch2_s01_008_ren.m4a", listeningSection: 1 },
      { id: "ch2_s01_009_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "予約は？", zh: "預約呢？", audio: "/assets/voice/chapter2/voice_ch2_s01_009_toru.m4a", listeningSection: 1 },
      { id: "ch2_s01_010_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "embarrased", position: "left", jp: "……まだ。", zh: "……還沒。", audio: "/assets/voice/chapter2/voice_ch2_s01_010_ren.m4a", listeningSection: 1 },
      { id: "ch2_s01_011_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "roast", position: "right", jp: "押さえてないじゃないか。", zh: "那根本就還沒訂好吧。", audio: "/assets/voice/chapter2/voice_ch2_s01_011_toru.m4a", listeningSection: 1 },
      { id: "ch2_s01_012_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "でも空いてたぞ？", zh: "可是那裡是空的啊？", audio: "/assets/voice/chapter2/voice_ch2_s01_012_ren.m4a", listeningSection: 1 },
      { id: "ch2_s01_013_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "今日空いてることと、文化祭当日に使えることは別だろ。", zh: "今天空著，跟文化祭當天能不能用是兩回事吧。", audio: "/assets/voice/chapter2/voice_ch2_s01_013_toru.m4a", listeningSection: 1 },
      { id: "ch2_s01_014_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "大丈夫だって。誰も使ってなかったし。", zh: "沒問題啦。又沒有人在用。", audio: "/assets/voice/chapter2/voice_ch2_s01_014_ren.m4a", listeningSection: 1 },
      { id: "ch2_s01_015_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "sigh", position: "right", jp: "その考え方で映画館に行ったらどうなるか、想像してみろ。", zh: "照你這種想法去電影院會怎樣，你自己想想看。", audio: "/assets/voice/chapter2/voice_ch2_s01_015_toru.m4a", listeningSection: 1 },
      { id: "ch2_s01_016_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "suspect", position: "left", jp: "映画館？", zh: "電影院？", audio: "/assets/voice/chapter2/voice_ch2_s01_016_ren.m4a", listeningSection: 1 },
      { id: "ch2_s01_017_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "予約してない席が空いてるからって、勝手に座るのか？", zh: "沒預約的座位空著，你就可以擅自坐下嗎？", audio: "/assets/voice/chapter2/voice_ch2_s01_017_toru.m4a", listeningSection: 1 },
      { id: "ch2_s01_018_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "embarrased", position: "left", jp: "……あとから客が来たら追い出される。", zh: "……之後客人來了，我就會被趕走。", audio: "/assets/voice/chapter2/voice_ch2_s01_018_ren.m4a", listeningSection: 1 },
      { id: "ch2_s01_019_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "smirk", position: "right", jp: "学習が早くて助かるよ。", zh: "學得真快，省得我解釋了。", audio: "/assets/voice/chapter2/voice_ch2_s01_019_toru.m4a", listeningSection: 1 },
      { id: "ch2_s01_020_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "embarrased", position: "left", jp: "うるせえな。じゃあ今から予約してくる。", zh: "吵死了。那我現在去預約總行了吧。", audio: "/assets/voice/chapter2/voice_ch2_s01_020_ren.m4a", listeningSection: 1 },
      { id: "ch2_s01_021_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "sigh", position: "right", jp: "最初からそうしろ。", zh: "一開始就這麼做啊。", audio: "/assets/voice/chapter2/voice_ch2_s01_021_toru.m4a", listeningSection: 1 },
      { type: "quiz", id: "ch2_q1", listeningSection: 1 },
      { id: "ch2_s02_022_ren", type: "dialogue", bg: "職員室", speaker: "ren", expression: "normal", position: "left", jp: "すみません。多目的室のことで聞きたいんですけど、田中先生いますか？", zh: "不好意思，我想問多功能教室的事，田中老師在嗎？", audio: "/assets/voice/chapter2/voice_ch2_s02_022_ren.m4a", listeningSection: 2 },
      { id: "ch2_s02_023_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "normal", position: "center", jp: "田中先生なら、今、会議中で席を外しているんですが。", zh: "田中老師的話，現在正在開會，不在座位上。", audio: "/assets/voice/chapter2/voice_ch2_s02_023_sato.m4a", listeningSection: 2 },
      { id: "ch2_s02_024_ren", type: "dialogue", bg: "職員室", speaker: "ren", expression: "surprised", position: "left", jp: "会議中？", zh: "在開會？", audio: "/assets/voice/chapter2/voice_ch2_s02_024_ren.m4a", listeningSection: 2 },
      { id: "ch2_s02_025_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "normal", position: "center", jp: "はい。しばらく戻らないと思いますよ。", zh: "是的。我想他暫時不會回來。", audio: "/assets/voice/chapter2/voice_ch2_s02_025_sato.m4a", listeningSection: 2 },
      { id: "ch2_s02_026_ren", type: "dialogue", bg: "職員室", speaker: "ren", expression: "normal", position: "left", jp: "じゃあ、あとで来ます。", zh: "那我晚點再來。", audio: "/assets/voice/chapter2/voice_ch2_s02_026_ren.m4a", listeningSection: 2 },
      { id: "ch2_s02_027_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "normal", position: "center", jp: "あ、鬼塚くん。急ぎなら、伝言を――", zh: "啊，鬼塚同學。如果很急的話，我可以幫你傳話——", audio: "/assets/voice/chapter2/voice_ch2_s02_027_sato.m4a", listeningSection: 2 },
      { id: "ch2_s02_028_ren", type: "dialogue", bg: "職員室", speaker: "ren", expression: "smile", position: "left", jp: "大丈夫です！　また来ます！", zh: "沒關係！我等等再來！", audio: "/assets/voice/chapter2/voice_ch2_s02_028_ren.m4a", listeningSection: 2 },
      { id: "ch2_s02_029_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "sigh", position: "center", jp: "……最後まで聞いてください。", zh: "……請聽人家說完。", audio: "/assets/voice/chapter2/voice_ch2_s02_029_sato.m4a", listeningSection: 2 },
      { id: "ch2_s02_time_001", type: "narrative", bg: "職員室", speaker: "narrator", expression: "normal", position: null, jp: "――少しして。", zh: "――過了一會兒。", audio: null, listeningSection: 2 },
      { id: "ch2_player_002", type: "dialogue", bg: "職員室", speaker: "player", expression: "溫和微笑", position: "center", jp: "失礼します。佐藤先生、この資料を持ってきました。", zh: "打擾了。佐藤老師，我把這份資料拿來了。", audio: null, listeningSection: 2 },
      { id: "ch2_s02_030_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "smile", position: "center", jp: "ああ、ありがとうございます。", zh: "啊，謝謝你。", audio: "/assets/voice/chapter2/voice_ch2_s02_030_sato.m4a", listeningSection: 2 },
      { id: "ch2_s02_031_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "normal", position: "center", jp: "そういえば、鬼塚くんは教室にいますか？", zh: "對了，鬼塚同學在教室嗎？", audio: "/assets/voice/chapter2/voice_ch2_s02_031_sato.m4a", listeningSection: 2 },
      { id: "ch2_player_003", type: "dialogue", bg: "職員室", speaker: "player", expression: "溫和微笑", position: "center", jp: "はい。たぶん、まだいると思います。", zh: "是的。我想他應該還在。", audio: null, listeningSection: 2 },
      { id: "ch2_s02_032_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "smile", position: "center", jp: "では、鬼塚くんに伝言をお願いしてもいいですか？", zh: "那可以麻煩你幫我傳話給鬼塚同學嗎？", audio: "/assets/voice/chapter2/voice_ch2_s02_032_sato.m4a", listeningSection: 2 },
      { id: "ch2_player_004", type: "dialogue", bg: "職員室", speaker: "player", expression: "溫和微笑", position: "center", jp: "はい。", zh: "好的。", audio: null, listeningSection: 2 },
      { id: "ch2_s02_033_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "normal", position: "center", jp: "先ほど田中先生が戻っていらっしゃったんですが、多目的室のことで鬼塚くんを探していました。", zh: "剛才田中老師回來了，他正在找鬼塚同學，說是有關多功能教室的事。", audio: "/assets/voice/chapter2/voice_ch2_s02_033_sato.m4a", listeningSection: 2 },
      { id: "ch2_player_005", type: "dialogue", bg: "職員室", speaker: "player", expression: "溫和微笑", position: "center", jp: "多目的室……。", zh: "多功能教室……。", audio: null, listeningSection: 2 },
      { id: "ch2_s02_034_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "normal", position: "center", jp: "『文化祭で多目的室を使いたい場合は、今日中に使用申請書を提出してください』とのことです。", zh: "他說：「如果文化祭想使用多功能教室，請在今天之內提交使用申請書。」", audio: "/assets/voice/chapter2/voice_ch2_s02_034_sato.m4a", listeningSection: 2 },
      { id: "ch2_player_006", type: "dialogue", bg: "職員室", speaker: "player", expression: "溫和微笑", position: "center", jp: "今日中ですね。", zh: "今天之內對吧。", audio: null, listeningSection: 2 },
      { id: "ch2_s02_035_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "smile", position: "center", jp: "はい。そうお伝えください。", zh: "是的。請你這樣轉告他。", audio: "/assets/voice/chapter2/voice_ch2_s02_035_sato.m4a", listeningSection: 2 },
      { id: "ch2_player_007", type: "dialogue", bg: "職員室", speaker: "player", expression: "溫和微笑", position: "center", jp: "わかりました。", zh: "我知道了。", audio: null, listeningSection: 2 },
      { type: "quiz", id: "ch2_q2", listeningSection: 2 },
      { id: "ch2_player_008", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "蓮、田中先生から伝言。", zh: "蓮，田中老師有話要轉告你。", audio: null, listeningSection: 3 },
      { id: "ch2_s03_036_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "suspect", position: "left", jp: "田中先生？", zh: "田中老師？", audio: "/assets/voice/chapter2/voice_ch2_s03_036_ren.m4a", listeningSection: 3 },
      { id: "ch2_player_009", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "文化祭で多目的室を使いたいなら、今日中に使用申請書を出してほしいって。", zh: "他說如果文化祭想用多功能教室，希望你今天之內把使用申請書交出去。", audio: null, listeningSection: 3 },
      { id: "ch2_s03_037_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "surprised", position: "left", jp: "……今日中？", zh: "……今天之內？", audio: "/assets/voice/chapter2/voice_ch2_s03_037_ren.m4a", listeningSection: 3 },
      { id: "ch2_s03_038_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "normal", position: "right", jp: "よかったな。まだ間に合うぞ。", zh: "太好了。還來得及。", audio: "/assets/voice/chapter2/voice_ch2_s03_038_toru.m4a", listeningSection: 3 },
      { id: "ch2_s05_094_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "分かってるよ。", zh: "我知道啦。", audio: "/assets/voice/chapter2/voice_ch2_s05_094_ren.m4a", listeningSection: 3 },
      { id: "ch2_s03_040_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "normal", position: "center", jp: "じゃあ、蓮は申請書ね。", zh: "那蓮就負責申請書囉。", audio: "/assets/voice/chapter2/voice_ch2_s03_040_misaki.m4a", listeningSection: 3 },
      { id: "ch2_s03_041_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "はいはい。", zh: "好好好。", audio: "/assets/voice/chapter2/voice_ch2_s03_041_ren.m4a", listeningSection: 3 },
      { id: "ch2_s03_042_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "sigh", position: "right", jp: "その返事、不安しかないな。", zh: "你這個回答只讓人更不安。", audio: "/assets/voice/chapter2/voice_ch2_s03_042_toru.m4a", listeningSection: 3 },
      { id: "ch2_s03_043_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "embarrased", position: "left", jp: "ちゃんと出すって。", zh: "就說我會好好交啦。", audio: "/assets/voice/chapter2/voice_ch2_s03_043_ren.m4a", listeningSection: 3 },
      { id: "ch2_s03_044_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "excited", position: "center", jp: "じゃあ次、私ね！　宣伝用のポスター、作っておいたよ！", zh: "那接下來換我！宣傳用的海報我已經做好了！", audio: "/assets/voice/chapter2/voice_ch2_s03_044_misaki.m4a", listeningSection: 3 },
      { id: "ch2_player_010", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "もう作ったの？", zh: "已經做好了？", audio: null, listeningSection: 3 },
      { id: "ch2_s03_045_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "excited", position: "center", jp: "昨日、二時間もかけたんだから。", zh: "我昨天可是花了整整兩個小時。", audio: "/assets/voice/chapter2/voice_ch2_s03_045_misaki.m4a", listeningSection: 3 },
      { id: "ch2_s03_046_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "excited", position: "center", jp: "じゃーん！　校内ミッションラリー！", zh: "鏘鏘！校內任務闖關！", audio: "/assets/voice/chapter2/voice_ch2_s03_046_misaki.m4a", listeningSection: 3 },
      { id: "ch2_player_011", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "……これ、何のイベントだっけ？", zh: "……這到底是什麼活動來著？", audio: null, listeningSection: 3 },
      { id: "ch2_s03_047_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "curious", position: "center", jp: "え？", zh: "咦？", audio: "/assets/voice/chapter2/voice_ch2_s03_047_misaki.m4a", listeningSection: 3 },
      { id: "ch2_player_012", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "お化け屋敷じゃなくて？", zh: "不是鬼屋嗎？", audio: null, listeningSection: 3 },
      { id: "ch2_s03_048_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "surprised", position: "center", jp: "違うよ？", zh: "才不是喔？", audio: "/assets/voice/chapter2/voice_ch2_s03_048_misaki.m4a", listeningSection: 3 },
      { id: "ch2_s03_049_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "sigh", position: "right", jp: "宣伝というより、脅迫状だな。", zh: "與其說是宣傳，不如說像恐嚇信。", audio: "/assets/voice/chapter2/voice_ch2_s03_049_toru.m4a", listeningSection: 3 },
      { id: "ch2_s03_050_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "angry", position: "center", jp: "えー、インパクトあっていいじゃん。", zh: "欸～很有衝擊力不是很好嗎。", audio: "/assets/voice/chapter2/voice_ch2_s03_050_misaki.m4a", listeningSection: 3 },
      { id: "ch2_s03_051_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "serious", position: "left", jp: "……俺は嫌いじゃない。", zh: "……我倒是不討厭。", audio: "/assets/voice/chapter2/voice_ch2_s03_051_ren.m4a", listeningSection: 3 },
      { id: "ch2_s03_052_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "roast", position: "right", jp: "お前の好みは聞いてない。", zh: "沒人在問你的喜好。", audio: "/assets/voice/chapter2/voice_ch2_s03_052_toru.m4a", listeningSection: 3 },
      { id: "ch2_s03_053_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "じゃあ聞けよ。", zh: "那你就問啊。", audio: "/assets/voice/chapter2/voice_ch2_s03_053_ren.m4a", listeningSection: 3 },
      { id: "ch2_s03_054_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "smirk", position: "right", jp: "聞く必要がない。", zh: "沒必要問。", audio: "/assets/voice/chapter2/voice_ch2_s03_054_toru.m4a", listeningSection: 3 },
      { type: "quiz", id: "ch2_q3", listeningSection: 3 },
      { id: "ch2_s04_055_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "excited", position: "center", jp: "そうだ。文化祭の日、佐藤先生も呼ぼうよ！", zh: "對了。文化祭那天也邀佐藤老師來吧！", audio: "/assets/voice/chapter2/voice_ch2_s04_055_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_056_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "suspect", position: "left", jp: "先生を？", zh: "老師？", audio: "/assets/voice/chapter2/voice_ch2_s04_056_ren.m4a", listeningSection: 4 },
      { id: "ch2_s04_057_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "excited", position: "center", jp: "うん！　せっかくだし、ミッションラリーやってもらいたい！", zh: "嗯！難得有機會，也想讓老師玩玩看任務闖關！", audio: "/assets/voice/chapter2/voice_ch2_s04_057_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_058_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "normal", position: "right", jp: "まあ、いいんじゃないか。", zh: "嗯，也沒什麼不好。", audio: "/assets/voice/chapter2/voice_ch2_s04_058_toru.m4a", listeningSection: 4 },
      { id: "ch2_s04_059_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "normal", position: "left", jp: "じゃあ美咲、誘ってこいよ。", zh: "那美咲，你去邀啊。", audio: "/assets/voice/chapter2/voice_ch2_s04_059_ren.m4a", listeningSection: 4 },
      { id: "ch2_s04_060_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "surprised", position: "center", jp: "え、私？", zh: "咦，我？", audio: "/assets/voice/chapter2/voice_ch2_s04_060_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_061_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "言い出したのお前だろ。", zh: "不是你先提的嗎。", audio: "/assets/voice/chapter2/voice_ch2_s04_061_ren.m4a", listeningSection: 4 },
      { id: "ch2_s04_062_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "embarrased", position: "center", jp: "……一緒に来てよ。", zh: "……陪我一起去啦。", audio: "/assets/voice/chapter2/voice_ch2_s04_062_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_063_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "やだ。", zh: "不要。", audio: "/assets/voice/chapter2/voice_ch2_s04_063_ren.m4a", listeningSection: 4 },
      { id: "ch2_s04_064_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "surprised", position: "center", jp: "即答！？", zh: "秒答！？", audio: "/assets/voice/chapter2/voice_ch2_s04_064_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_065_misaki", type: "dialogue", bg: "職員室", speaker: "misaki", expression: "embarrased", position: "center", jp: "佐藤先生、今よろしいですか？", zh: "佐藤老師，現在方便嗎？", audio: "/assets/voice/chapter2/voice_ch2_s04_065_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_066_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "normal", position: "center", jp: "はい、どうしました？", zh: "可以，怎麼了？", audio: "/assets/voice/chapter2/voice_ch2_s04_066_sato.m4a", listeningSection: 4 },
      { id: "ch2_s04_067_misaki", type: "dialogue", bg: "職員室", speaker: "misaki", expression: "serious", position: "center", jp: "文化祭の日なんですけど、もしお時間がありましたら、私たちのミッションラリーに参加していただけませんか？", zh: "關於文化祭那天，如果老師有時間的話，可以來參加我們的任務闖關嗎？", audio: "/assets/voice/chapter2/voice_ch2_s04_067_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_068_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "smile", position: "center", jp: "ああ、皆さんが準備している企画ですね。", zh: "啊，是你們正在準備的企劃吧。", audio: "/assets/voice/chapter2/voice_ch2_s04_068_sato.m4a", listeningSection: 4 },
      { id: "ch2_s04_069_misaki", type: "dialogue", bg: "職員室", speaker: "misaki", expression: "excited", position: "center", jp: "はい！", zh: "是！", audio: "/assets/voice/chapter2/voice_ch2_s04_069_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_070_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "wrysmile", position: "center", jp: "ぜひ、と言いたいところなんですが……当日は午前中、見回りの担当が入っているんです。", zh: "我很想答應，不過……當天上午我有巡視的工作。", audio: "/assets/voice/chapter2/voice_ch2_s04_070_sato.m4a", listeningSection: 4 },
      { id: "ch2_s04_071_misaki", type: "dialogue", bg: "職員室", speaker: "misaki", expression: "sad", position: "center", jp: "あ、そうなんですね……。", zh: "啊，原來是這樣……。", audio: "/assets/voice/chapter2/voice_ch2_s04_071_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_072_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "smile", position: "center", jp: "午後でしたら、時間が取れるかもしれません。", zh: "如果是下午的話，也許能抽出時間。", audio: "/assets/voice/chapter2/voice_ch2_s04_072_sato.m4a", listeningSection: 4 },
      { id: "ch2_s04_073_misaki", type: "dialogue", bg: "職員室", speaker: "misaki", expression: "surprised", position: "center", jp: "ほんとですか？", zh: "真的嗎？", audio: "/assets/voice/chapter2/voice_ch2_s04_073_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_074_toru", type: "dialogue", bg: "職員室", speaker: "toru", expression: "serious", position: "right", jp: "先生のご都合が分かりましたら、教えていただけますか？", zh: "老師確定時間之後，可以再告訴我們嗎？", audio: "/assets/voice/chapter2/voice_ch2_s04_074_toru.m4a", listeningSection: 4 },
      { id: "ch2_s04_075_sato", type: "dialogue", bg: "職員室", speaker: "sato", expression: "smile", position: "center", jp: "もちろんです。", zh: "當然可以。", audio: "/assets/voice/chapter2/voice_ch2_s04_075_sato.m4a", listeningSection: 4 },
      { id: "ch2_s04_076_misaki", type: "dialogue", bg: "職員室", speaker: "misaki", expression: "excited", position: "center", jp: "ありがとうございます！", zh: "謝謝老師！", audio: "/assets/voice/chapter2/voice_ch2_s04_076_misaki.m4a", listeningSection: 4 },
      { type: "quiz", id: "ch2_q4", listeningSection: 4 },
      { id: "ch2_s04_077_ren", type: "dialogue", bg: "校園走廊 (放學後)", speaker: "ren", expression: "suspect", position: "left", jp: "で、先生来るって？", zh: "所以，老師會來嗎？", audio: "/assets/voice/chapter2/voice_ch2_s04_077_ren.m4a", listeningSection: 4 },
      { id: "ch2_s04_078_misaki", type: "dialogue", bg: "校園走廊 (放學後)", speaker: "misaki", expression: "normal", position: "center", jp: "午前中は見回りなんだって。", zh: "他說上午要巡視。", audio: "/assets/voice/chapter2/voice_ch2_s04_078_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_079_ren", type: "dialogue", bg: "校園走廊 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "じゃあ来ないのか。", zh: "那就是不來囉。", audio: "/assets/voice/chapter2/voice_ch2_s04_079_ren.m4a", listeningSection: 4 },
      { id: "ch2_s04_080_toru", type: "dialogue", bg: "校園走廊 (放學後)", speaker: "toru", expression: "sigh", position: "right", jp: "午後なら時間が取れるかもしれないって言ってただろ。", zh: "他不是說下午也許能抽出時間嗎。", audio: "/assets/voice/chapter2/voice_ch2_s04_080_toru.m4a", listeningSection: 4 },
      { id: "ch2_s04_081_ren", type: "dialogue", bg: "校園走廊 (放學後)", speaker: "ren", expression: "suspect", position: "left", jp: "……じゃあ来るのか？", zh: "……所以會來嗎？", audio: "/assets/voice/chapter2/voice_ch2_s04_081_ren.m4a", listeningSection: 4 },
      { id: "ch2_s04_082_toru", type: "dialogue", bg: "校園走廊 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "まだ分からない。", zh: "還不知道。", audio: "/assets/voice/chapter2/voice_ch2_s04_082_toru.m4a", listeningSection: 4 },
      { id: "ch2_s04_083_ren", type: "dialogue", bg: "校園走廊 (放學後)", speaker: "ren", expression: "angry", position: "left", jp: "どっちだよ。", zh: "到底是哪個啦。", audio: "/assets/voice/chapter2/voice_ch2_s04_083_ren.m4a", listeningSection: 4 },
      { id: "ch2_s04_084_toru", type: "dialogue", bg: "校園走廊 (放學後)", speaker: "toru", expression: "sigh", position: "right", jp: "だから、まだ分からないって言ってるんだよ。", zh: "所以我就說，現在還不知道啊。", audio: "/assets/voice/chapter2/voice_ch2_s04_084_toru.m4a", listeningSection: 4 },
      { id: "ch2_s04_085_misaki", type: "dialogue", bg: "校園走廊 (放學後)", speaker: "misaki", expression: "normal", position: "center", jp: "蓮、人の話ちゃんと聞いてた？", zh: "蓮，你有好好聽人家說話嗎？", audio: "/assets/voice/chapter2/voice_ch2_s04_085_misaki.m4a", listeningSection: 4 },
      { id: "ch2_s04_086_ren", type: "dialogue", bg: "校園走廊 (放學後)", speaker: "ren", expression: "embarrased", position: "left", jp: "聞いてたよ！", zh: "我有聽啦！", audio: "/assets/voice/chapter2/voice_ch2_s04_086_ren.m4a", listeningSection: 4 },
      { id: "ch2_s04_087_toru", type: "dialogue", bg: "校園走廊 (放學後)", speaker: "toru", expression: "roast", position: "right", jp: "聞いてた結果がそれか。", zh: "有聽的結果就是這樣嗎。", audio: "/assets/voice/chapter2/voice_ch2_s04_087_toru.m4a", listeningSection: 4 },
      { id: "ch2_s05_088_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "sad", position: "left", jp: "……多目的室、もう他のクラスに取られてた。", zh: "……多功能教室，已經被其他班訂走了。", audio: "/assets/voice/chapter2/voice_ch2_s05_088_ren.m4a", listeningSection: 5 },
      { id: "ch2_s05_089_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "surprised", position: "center", jp: "えっ、じゃあ使えないの？", zh: "咦，那我們不能用了嗎？", audio: "/assets/voice/chapter2/voice_ch2_s05_089_misaki.m4a", listeningSection: 5 },
      { id: "ch2_s05_090_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "sad", position: "left", jp: "文化祭当日はな。", zh: "文化祭當天不行。", audio: "/assets/voice/chapter2/voice_ch2_s05_090_ren.m4a", listeningSection: 5 },
      { id: "ch2_s05_091_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "surprised", position: "right", jp: "……申請書は？", zh: "……申請書呢？", audio: "/assets/voice/chapter2/voice_ch2_s05_091_toru.m4a", listeningSection: 5 },
      { id: "ch2_s05_092_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "embarrased", position: "left", jp: "出そうと思ったときには、もう別のクラスが出してた。", zh: "等我想去交的時候，別班已經先交了。", audio: "/assets/voice/chapter2/voice_ch2_s05_092_ren.m4a", listeningSection: 5 },
      { id: "ch2_s05_093_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "昨日、今日中に出せって伝言があっただろ。", zh: "昨天不是有人傳話叫你要在今天之內交嗎。", audio: "/assets/voice/chapter2/voice_ch2_s05_093_toru.m4a", listeningSection: 5 },
      { id: "ch2_s05_094_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "angry", position: "left", jp: "分かってるよ。", zh: "我知道啦。", audio: "/assets/voice/chapter2/voice_ch2_s05_094_ren.m4a", listeningSection: 5 },
      { id: "ch2_s05_095_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "angry", position: "right", jp: "分かってたら、なんですぐ出さなかったんだよ。", zh: "既然知道，為什麼不馬上交？", audio: "/assets/voice/chapter2/voice_ch2_s05_095_toru.m4a", listeningSection: 5 },
      { id: "ch2_s05_096_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "embarrased", position: "left", jp: "うるせえな。別の場所探せばいいんだろ。", zh: "吵死了。找別的地方不就好了。", audio: "/assets/voice/chapter2/voice_ch2_s05_096_ren.m4a", listeningSection: 5 },
      { id: "ch2_s05_097_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "sad", position: "center", jp: "でも、もう文化祭まで三週間しかないよ？", zh: "可是離文化祭已經只剩三週了耶？", audio: "/assets/voice/chapter2/voice_ch2_s05_097_misaki.m4a", listeningSection: 5 },
      { id: "ch2_s05_098_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "まだ三週間ある。", zh: "還有三週。", audio: "/assets/voice/chapter2/voice_ch2_s05_098_ren.m4a", listeningSection: 5 },
      { id: "ch2_s05_099_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "『まだ』じゃなくて、『もう』だろ。", zh: "不是「還有」，是「只剩」吧。", audio: "/assets/voice/chapter2/voice_ch2_s05_099_toru.m4a", listeningSection: 5 },
      { id: "ch2_s05_100_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "serious", position: "left", jp: "……俺が何とかする。", zh: "……我會想辦法。", audio: "/assets/voice/chapter2/voice_ch2_s05_100_ren.m4a", listeningSection: 5 },
      { id: "ch2_s05_101_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "一人で？", zh: "你一個人？", audio: "/assets/voice/chapter2/voice_ch2_s05_101_toru.m4a", listeningSection: 5 },
      { id: "ch2_s05_102_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "throwshade", position: "left", jp: "そうだよ。もともと会場は俺の担当だし。", zh: "對啊。本來場地就是我負責的。", audio: "/assets/voice/chapter2/voice_ch2_s05_102_ren.m4a", listeningSection: 5 },
      { id: "ch2_s05_103_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "だからって、一人で全部やる必要はないだろ。", zh: "就算這樣，也沒必要全部一個人做吧。", audio: "/assets/voice/chapter2/voice_ch2_s05_103_toru.m4a", listeningSection: 5 },
      { id: "ch2_s05_104_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "angry", position: "left", jp: "いいって。俺がやるから。", zh: "就說不用了。我來處理。", audio: "/assets/voice/chapter2/voice_ch2_s05_104_ren.m4a", listeningSection: 5 },
      { id: "ch2_s06_105_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "angry", position: "left", jp: "俺のミスなんだから、俺が何とかすればいいだろ。", zh: "既然是我的失誤，我自己想辦法不就好了。", audio: "/assets/voice/chapter2/voice_ch2_s06_105_ren.m4a", listeningSection: 5 },
      { id: "ch2_s06_106_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "serious", position: "right", jp: "でも――", zh: "可是——", audio: "/assets/voice/chapter2/voice_ch2_s06_106_toru.m4a", listeningSection: 5 },
      { id: "ch2_s06_107_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "angry", position: "left", jp: "お前らには関係ねえよ。", zh: "跟你們沒關係。", audio: "/assets/voice/chapter2/voice_ch2_s06_107_ren.m4a", listeningSection: 5 },
      { id: "ch2_s06_108_toru", type: "dialogue", delayVoiceMs: 1200, bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "sad", position: "right", jp: "……そうかよ。", zh: "……是喔。", audio: "/assets/voice/chapter2/voice_ch2_s06_108_toru.m4a", listeningSection: 5 },
      { id: "ch2_s06_109_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "sad", position: "right", jp: "じゃあ、好きにすれば。", zh: "那你就隨便吧。", audio: "/assets/voice/chapter2/voice_ch2_s06_109_toru.m4a", listeningSection: 5 },
      { id: "ch2_s06_110_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "sad", position: "center", jp: "……今の、ちょっと言いすぎじゃない？", zh: "……你剛才那句，是不是說得有點太過分了？", audio: "/assets/voice/chapter2/voice_ch2_s06_110_misaki.m4a", listeningSection: 5 },
      { id: "ch2_s06_111_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "angry", position: "left", jp: "……なんだよ、あいつ。", zh: "……那傢伙是怎樣。", audio: "/assets/voice/chapter2/voice_ch2_s06_111_ren.m4a", listeningSection: 5 },
      { id: "ch2_s06_112_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "serious", position: "center", jp: "蓮は『自分で何とかする』って意味で言ったのかもしれないけど。", zh: "蓮可能只是想表達「我要自己想辦法」。", audio: "/assets/voice/chapter2/voice_ch2_s06_112_misaki.m4a", listeningSection: 5 },
      { id: "ch2_s06_113_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "sad", position: "center", jp: "でも、『お前らには関係ない』って言われたら、一緒にやってる側はどう思うかな。", zh: "可是，如果被說「跟你們沒關係」，一起努力的人會怎麼想呢。", audio: "/assets/voice/chapter2/voice_ch2_s06_113_misaki.m4a", listeningSection: 5 },
      { id: "ch2_s06_114_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "surprised", position: "left", jp: "……。", zh: "……。", audio: null, listeningSection: 5 },
      { id: "ch2_s06_115_misaki", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "misaki", expression: "sad", position: "center", jp: "いつも言ってるからって、相手が平気とは限らないでしょ。", zh: "就算平常總是這樣說，也不代表對方一定不會受傷吧。", audio: "/assets/voice/chapter2/voice_ch2_s06_115_misaki.m4a", listeningSection: 5 },
      { id: "ch2_s06_116_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "sad", position: "left", jp: "……。", zh: "……。", audio: null, listeningSection: 5 },
      { type: "quiz", id: "ch2_q5", listeningSection: 5 }
    ]
  }
};

/* =========================================================
   CHAPTER RESOURCE COLLECTOR
   ========================================================= */

function getChapter2MisakiPosterSource() {
  /*
   * iPad Safari can expose a desktop-like layout viewport even while the
   * physical device is portrait. Prefer the physical screen/orientation
   * signals, then fall back to the CSS media query / viewport dimensions.
   */
  let isPortrait = false;

  try {
    const orientationType = screen.orientation?.type || "";

    if (orientationType) {
      isPortrait = orientationType.startsWith("portrait");
    } else if (typeof window.orientation === "number") {
      isPortrait = Math.abs(window.orientation) !== 90;
    } else if (screen.width && screen.height) {
      isPortrait = screen.height >= screen.width;
    } else if (window.matchMedia) {
      isPortrait = window.matchMedia("(orientation: portrait)").matches;
    } else {
      isPortrait = window.innerHeight >= window.innerWidth;
    }
  } catch (e) {
    isPortrait = window.innerHeight >= window.innerWidth;
  }

  return isPortrait
    ? "assets/cg/chapter2/ch2_misaki_poster_portrait.webp"
    : "assets/cg/chapter2/ch2_misaki_poster.webp";
}

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


  // Chapter 2 Section 3 special poster CG.
  if (
    chapterNumber === 2 &&
    sectionNumber === 3
  ) {
    resources.push({
      type: "image",
      path: getChapter2MisakiPosterSource()
    });
  }

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
     Listening Section 1～2 於 Initial Loading 載入
     Section 3～5 於 Title 畫面背景預載
     會包含：
     - Background
     - Character Sprite
     - Voice 001–063
     ========================================================= */

  for (let section = 1; section <= 2; section++) {
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
      path: MAIN_AUDIO.seDoorClose
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
     preloadResourceBatch() 本身會自動去除重複 path
     所以這裡不需要另外 dedupe
     ========================================================= */

  return resources;
}

function preloadExtraEventInBackground() {
  const resources = [
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
  ];

  preloadResourceBatch(resources)
    .catch(err => {
      console.warn(
        "[EXTRA EVENT PRELOAD] failed:",
        err
      );
    });
}

async function preloadInitialGameResources(
  onProgress = null
) {
  /*
   * iPhone diagnostic / stability test:
   * Initial Loading only preloads images.
   *
   * Do not create additional HTMLAudio preload instances while the
   * title BGM is establishing its first playback session. Audio assets
   * will continue to load normally when they are actually needed, and
   * the existing staged background preload remains unchanged.
   */
  /*
   * Chapter 1 uses the original full preload plan again:
   * Section 1–2 + main BGM / ambient / quiz SE / school bell.
   * This makes the first quiz and its bell available before play starts.
   */
  const resources = getInitialGameResources();

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


/* =========================================================
   STORY SECTION PRELOAD SCHEDULE
   ========================================================= */

const storySectionPreloadTriggers = new Set();

function scheduleStorySectionPreload(
  chapterNumber,
  sectionNumber
) {
  if (!chapterNumber || !sectionNumber) {
    return;
  }

  const triggerKey =
    `${chapterNumber}:${sectionNumber}`;

  if (
    storySectionPreloadTriggers.has(
      triggerKey
    )
  ) {
    return;
  }

  storySectionPreloadTriggers.add(
    triggerKey
  );

  // Chapter 1 Section 1–2 is covered by Initial Loading.
  // Title prepares Section 3 only. From Section 3 onward, stay one section
  // ahead so mobile Safari never has to decode several future sections at once.
  if (chapterNumber === 1) {
    if (sectionNumber === 3) {
      preloadListeningSectionInBackground(1, 4);
      return;
    }

    if (sectionNumber === 4) {
      preloadListeningSectionInBackground(1, 5);
      return;
    }

    if (sectionNumber === 5) {
      preloadListeningSectionInBackground(2, 1);
      return;
    }
  }

  // Chapter 2 always stays one Listening Section ahead.
  if (chapterNumber === 2) {
    const nextSection = sectionNumber + 1;

    if (nextSection <= 5) {
      preloadListeningSectionInBackground(
        2,
        nextSection
      );
    }
  }
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
  }  ,
  "ch2_q1": {
    quizNumber: 1, type: "聽力理解任務", section: 1,
    question: "蓮が多目的室について実際にしたことは何ですか。", trustTarget: "toru",
    options: [
      { text: "A. 文化祭当日の使用予約をした。", isCorrect: false },
      { text: "B. 使用申請書を提出した。", isCorrect: false },
      { text: "C. 多目的室が空いていることを確認した。", isCorrect: true },
      { text: "D. 先生から使用の許可をもらった。", isCorrect: false }
    ],
    feedback: {
      correct: { title: "正解！ (C)", story: "蓮がしたのは、会場が空いているかを見に行ったことだけでした。", jpOriginal: "多目的室。さっき見てきた。", zhTrans: "多功能教室。我剛才去看過了。", words: "押さえる(預訂／確保)、予約(預約)、空いている(空著)", explanation: "蓮は予約や申請をしておらず、多目的室が空いていることを確認しただけです。" },
      wrong: { title: "不正解！ (正確答案為 C)", story: "『見てきた』と『予約した』の違いがポイントです。", jpOriginal: "……見てきた。", zhTrans: "……我去看過了。", words: "予約(預約)、確認する(確認)", explanation: "実際にしたのは、多目的室が空いていることの確認です。" }
    }
  },
  "ch2_q2": {
    quizNumber: 2, type: "聽力理解任務", section: 2,
    question: "佐藤先生がプレイヤーに頼んだことは何ですか。", trustTarget: "sato",
    options: [
      { text: "A. 田中先生が会議中だと蓮に伝えること。", isCorrect: false },
      { text: "B. 蓮に、今日中に使用申請書を出すよう伝えること。", isCorrect: true },
      { text: "C. 蓮の代わりに使用申請書を提出すること。", isCorrect: false },
      { text: "D. 田中先生が戻るまで職員室で待つこと。", isCorrect: false }
    ],
    feedback: {
      correct: { title: "正解！ (B)", story: "佐藤先生からの伝言内容を正確に聞き取れました。", jpOriginal: "今日中に使用申請書を提出してください", zhTrans: "請在今天之內提交使用申請書。", words: "伝言(傳話)、使用申請書(使用申請書)、提出する(提交)", explanation: "プレイヤーは、蓮に今日中の申請書提出を伝えるよう頼まれました。" },
      wrong: { title: "不正解！ (正確答案為 B)", story: "会議の話ではなく、田中先生が戻った後の伝言が重要です。", jpOriginal: "そうお伝えください。", zhTrans: "請你這樣轉告他。", words: "伝える(轉告)、今日中(今天之內)", explanation: "頼まれたのは、蓮に今日中の提出を伝えることです。" }
    }
  },
  "ch2_q3": {
    quizNumber: 3, type: "聽力理解任務", section: 3,
    question: "透が美咲のポスターを『脅迫状』と言ったのはなぜですか。", trustTarget: "toru",
    options: [
      { text: "A. ポスターに文化祭の日付が書かれていなかったから。", isCorrect: false },
      { text: "B. ポスターが怖すぎて、イベントの宣伝らしく見えなかったから。", isCorrect: true },
      { text: "C. 美咲が誰にも相談せずにポスターを作ったから。", isCorrect: false },
      { text: "D. ポスターに校内ミッションラリーと書かれていなかったから。", isCorrect: false }
    ],
    feedback: {
      correct: { title: "正解！ (B)", story: "透の『脅迫状』は、ポスターの怖すぎる見た目へのツッコミです。", jpOriginal: "宣伝というより、脅迫状だな。", zhTrans: "與其說是宣傳，不如說像恐嚇信。", words: "宣伝(宣傳)、脅迫状(恐嚇信)、インパクト(衝擊力)", explanation: "ポスターが怖く、普通のイベント宣伝に見えなかったためです。" },
      wrong: { title: "不正解！ (正確答案為 B)", story: "透が問題にしているのはポスターの雰囲気です。", jpOriginal: "宣伝というより、脅迫状だな。", zhTrans: "與其說是宣傳，不如說像恐嚇信。", words: "脅迫状(恐嚇信)、宣伝(宣傳)", explanation: "日付や相談の有無ではなく、怖すぎる見た目が理由です。" }
    }
  },
  "ch2_q4": {
    quizNumber: 4, type: "聽力理解任務", section: 4,
    question: "佐藤先生は、文化祭当日の参加についてどのように答えましたか。", trustTarget: "sato",
    options: [
      { text: "A. 午前中から必ず参加すると答えた。", isCorrect: false },
      { text: "B. 午前中は難しいが、午後なら参加できる可能性があると答えた。", isCorrect: true },
      { text: "C. 見回りがあるため、一日中参加できないと断った。", isCorrect: false },
      { text: "D. 午後の見回りが終わったら、必ず参加すると答えた。", isCorrect: false }
    ],
    feedback: {
      correct: { title: "正解！ (B)", story: "『かもしれません』が示す不確定さまで聞き取れています。", jpOriginal: "午後でしたら、時間が取れるかもしれません。", zhTrans: "如果是下午的話，也許能抽出時間。", words: "見回り(巡視)、午後(下午)、かもしれない(也許)", explanation: "午前中は見回りがあり、午後は参加できる可能性があるという回答です。" },
      wrong: { title: "不正解！ (正確答案為 B)", story: "先生は参加を確約していません。", jpOriginal: "時間が取れるかもしれません。", zhTrans: "也許能抽出時間。", words: "かもしれない(也許)、都合(時間安排)", explanation: "『かもしれない』なので、午後の参加はまだ確定ではありません。" }
    }
  },
  "ch2_q5": {
    quizNumber: 5, type: "聽力理解任務", section: 5,
    question: "蓮が『お前らには関係ねえよ』と言ったとき、本当に伝えたかったことに最も近いものはどれですか。", trustTarget: "ren",
    options: [
      { text: "A. この企画にはもう誰にも関わってほしくない。", isCorrect: false },
      { text: "B. 会場のことは自分のミスだから、自分で何とかしたい。", isCorrect: true },
      { text: "C. 透たちは文化祭の準備を何もしていない。", isCorrect: false },
      { text: "D. 校内ミッションラリーをやめたい。", isCorrect: false }
    ],
    feedback: {
      correct: { title: "正解！ (B)", story: "言葉そのものではなく、蓮がその直前に伝えようとしていた意図を理解できました。", jpOriginal: "俺のミスなんだから、俺が何とかすればいいだろ。", zhTrans: "既然是我的失誤，我自己想辦法不就好了。", words: "ミス(失誤)、何とかする(想辦法處理)、関係ない(沒有關係)", explanation: "蓮は仲間を拒絶したかったのではなく、自分の失敗を自分で処理しようとしていました。" },
      wrong: { title: "不正解！ (正確答案為 B)", story: "美咲の説明と、蓮が直前に言った内容を合わせて考えるのがポイントです。", jpOriginal: "蓮は『自分で何とかする』って意味で言ったのかもしれないけど。", zhTrans: "蓮可能只是想表達『我要自己想辦法』。", words: "意味(意思)、関係ない(沒關係)、平気(不在意／沒事)", explanation: "本意は『自分のミスだから自分で何とかしたい』に最も近いです。" }
    }
  }
};

/* =========================================================
   STORY ARCHIVE COLLECTION
   與主線存檔分離：已完成的 Section 永久解鎖。
   ========================================================= */

const STORY_ARCHIVE_STORAGE_KEY =
  "furyo_vn_story_archive";

const storyArchiveState = {
  chapter1: { unlockedSections: [false, false, false, false, false] },
  chapter2: { unlockedSections: [false, false, false, false, false] }
};

function loadStoryArchiveData() {
  const raw = localStorage.getItem(STORY_ARCHIVE_STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    [1, 2].forEach(chapterNumber => {
      const key = `chapter${chapterNumber}`;
      const saved = data?.[key]?.unlockedSections;
      if (Array.isArray(saved)) {
        storyArchiveState[key].unlockedSections = storyArchiveState[key].unlockedSections.map(
          (_, index) => saved[index] === true
        );
      }
    });
  } catch (err) { console.warn("[STORY ARCHIVE] load failed:", err); }
}

function saveStoryArchiveData() {
  try { localStorage.setItem(STORY_ARCHIVE_STORAGE_KEY, JSON.stringify(storyArchiveState)); }
  catch (err) { console.warn("[STORY ARCHIVE] save failed:", err); }
}

function unlockStorySection(chapterNumber, sectionNumber) {
  const chapterArchive = storyArchiveState[`chapter${Number(chapterNumber)}`];
  if (!chapterArchive) return;
  const index = Number(sectionNumber) - 1;
  const list = chapterArchive.unlockedSections;
  if (index < 0 || index >= list.length || list[index] === true) return;
  list[index] = true;
  saveStoryArchiveData();
  console.log("[STORY ARCHIVE] unlocked:", `chapter ${chapterNumber} / section ${sectionNumber}`);
}

function migrateStoryArchiveFromMainSave() {
  try {
    const raw = localStorage.getItem("furyo_vn_save");
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data) return;
    const chapterNumber = Number(data.currentChapter || 1);
    if (!storyArchiveState[`chapter${chapterNumber}`]) return;
    const completed = Array.isArray(data.completedSections) ? data.completedSections : [];
    completed.forEach(sectionNumber => unlockStorySection(chapterNumber, Number(sectionNumber)));
    if (data.isCleared === true) {
      for (let section = 1; section <= 5; section++) unlockStorySection(chapterNumber, section);
    }
  } catch (err) { console.warn("[STORY ARCHIVE] migration failed:", err); }
}

function isStorySectionUnlocked(chapterNumber, sectionNumber) {
  const chapterArchive = storyArchiveState[`chapter${Number(chapterNumber)}`];
  if (!chapterArchive) return false;
  return chapterArchive.unlockedSections[Number(sectionNumber) - 1] === true;
}

function renderStoryChapterCollection(chapterNumber) {
  migrateStoryArchiveFromMainSave();
  const cards = document.querySelectorAll(
    `#screen-story-chapter${chapterNumber} .story-timeline-card[data-story-section]`
  );
  let unlockedCount = 0;
  cards.forEach(card => {
    const sectionNumber = Number(card.dataset.storySection);
    const unlocked = isStorySectionUnlocked(chapterNumber, sectionNumber);
    const image = card.querySelector(".story-timeline-image");
    const lockLabel = card.querySelector(".story-timeline-lock-label");
    const thumb = card.querySelector(".story-timeline-thumb");
    const status = card.querySelector(".story-section-status");
    if (unlocked) {
      unlockedCount++; card.disabled = false; card.setAttribute("aria-disabled", "false");
      card.classList.remove("is-locked"); card.classList.add("is-unlocked");
      if (image) { const src = image.dataset.src; if (src && !image.getAttribute("src")) image.src = src; image.classList.remove("hidden"); }
      if (lockLabel) lockLabel.classList.add("hidden");
      if (thumb) thumb.classList.remove("is-placeholder");
      if (status) status.textContent = "REPLAY";
    } else {
      card.disabled = true; card.setAttribute("aria-disabled", "true");
      card.classList.add("is-locked"); card.classList.remove("is-unlocked");
      if (image) { image.removeAttribute("src"); image.classList.add("hidden"); }
      if (lockLabel) lockLabel.classList.remove("hidden");
      if (thumb) thumb.classList.add("is-placeholder");
      if (status) status.textContent = "LOCKED";
    }
  });
  const chapterStatus = document.querySelector(`#btn-story-chapter${chapterNumber} .story-chapter-status`);
  if (chapterStatus) chapterStatus.textContent = `${unlockedCount} / 5 SECTIONS`;
}

function renderStoryChapter1Collection() { renderStoryChapterCollection(1); }
function renderStoryChapter2Collection() { renderStoryChapterCollection(2); }

/* =========================================================
   STORY COLLECTION REPLAY MODE
   只播放該 Listening Section 的劇情，不寫入主線存檔。
   ========================================================= */

let storyCollectionReplayMode = false;
let storyCollectionReplaySection = null;
let storyCollectionReplayChapter = null;
let storyCollectionPreviousListeningState = null;
let storyCollectionPreviousChapter = null;

function playStoryCollectionSectionBgm(sectionNumber) {
  stopMorningAmbient(0);

  if (sectionNumber === 1) {
    startMorningAmbient();
    playMainBgm(MAIN_AUDIO.bgmDaily, 500);
  } else if (sectionNumber >= 2 && sectionNumber <= 4) {
    playMainBgm(MAIN_AUDIO.bgmSchoolDay, 500);
  } else if (sectionNumber === 5) {
    playMainBgm(MAIN_AUDIO.bgmNewIdea, 500);
  }
}

function startStorySectionFromCollection(sectionNumber, chapterNumber = 1) {
  const section = Number(sectionNumber);
  const chapter = Number(chapterNumber);

  if (!isStorySectionUnlocked(chapter, section)) return;

  const chapterData = CHAPTER_DATA[chapter];
  const queue = chapterData.steps.filter(
    step =>
      step.listeningSection === section &&
      step.type === "dialogue"
  );

  if (queue.length === 0) return;

  unlockAudioContextIOS();
  stopAllTypewriters();
  stopActiveAudio("startStorySectionFromCollection", `section-${section}`);
  removeReplayAudioButton("startStorySectionFromCollection");

  storyCollectionReplayMode = true;
  storyCollectionReplaySection = section;
  storyCollectionReplayChapter = chapter;
  storyCollectionPreviousListeningState = gameState.listeningState;
  storyCollectionPreviousChapter = gameState.currentChapter;
  gameState.currentChapter = chapter;

  sectionReplayQueue = queue;
  sectionReplayIndex = 0;
  sectionReplayQuizIdToReturn = null;
  sectionReplayFrozenSection = section;
  isWrongReviewMode = false;

  gameState.listeningState = "QUESTION_REPLAY";

  playStoryCollectionSectionBgm(section);
  renderReplayStepManual(0);
}

function finishStoryCollectionReplay() {
  removeReplayAudioButton("finishStoryCollectionReplay");
  stopAllTypewriters();
  stopActiveAudio("finishStoryCollectionReplay", "storyCollection");
  stopMorningAmbient(400);
  stopMainBgm(400);

  gameState.listeningState =
    storyCollectionPreviousListeningState || "BLIND_LISTENING";

  const finishedChapter = storyCollectionReplayChapter || 1;
  if (storyCollectionPreviousChapter !== null) gameState.currentChapter = storyCollectionPreviousChapter;

  storyCollectionReplayMode = false;
  storyCollectionReplaySection = null;
  storyCollectionReplayChapter = null;
  storyCollectionPreviousListeningState = null;
  storyCollectionPreviousChapter = null;
  sectionReplayQueue = [];
  sectionReplayIndex = 0;
  sectionReplayQuizIdToReturn = null;

  showScreen(`storyChapter${finishedChapter}`);
  renderStoryChapterCollection(finishedChapter);

  window.setTimeout(() => {
    playMainBgm(MAIN_AUDIO.bgmSchoolDay, 500);
  }, 250);
}

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

function startExtraEventFromCollection(eventKey) {
  if (!isExtraEventUnlocked(eventKey)) {
    return;
  }

  if (eventKey !== "yakisobaRally") {
    console.warn(
      "[EXTRA GALLERY] replay unavailable:",
      eventKey
    );
    return;
  }

  /*
   * 收藏重播不改動主線存檔。
   * 每次都交給 startExtraEvent() 從 step 0 開始。
   */
  extraEventReplayFromCollection = true;

  stopMainBgm(0);
  stopExtraBgm(0);
  stopAllTypewriters();
  stopActiveAudio(
    "startExtraEventFromCollection",
    "extraCollection"
  );
  stopParallelVoices();
  removeReplayAudioButton(
    "startExtraEventFromCollection"
  );

  startExtraEvent();
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
  bgmVolume: 50,
  seVolume: 50,
  voiceVolume: 50,
  textSpeed: "normal",
  chineseSubtitle: "on"
};

let previousScreenBeforeConfig = "title";
const typingTimers = new Map();
let activeAudioInstance = null;
let currentPlaybackToken = 0;

/*
 * Voice Ahead Preload
 * 不在 Initial Loading 預載整章音訊。
 * 遊戲進行中只提前抓「接下來 2 句有語音的台詞」，並存成 Blob URL。
 * 正式播放仍走原本 playVoiceAudio / Voice GainNode 路徑。
 */
const voiceAheadCache = new Map();

function normalizeVoicePath(audioPath) {
  let cleanPath = audioPath
    ? (audioPath.startsWith("/") ? audioPath.slice(1) : audioPath)
    : "";

  if (cleanPath && !cleanPath.startsWith("assets/")) {
    cleanPath = "assets/" + cleanPath;
  }

  return cleanPath;
}

function preloadVoicePath(audioPath) {
  const cleanPath = normalizeVoicePath(audioPath);
  if (!cleanPath || voiceAheadCache.has(cleanPath)) return;

  const entry = { status: "loading", objectUrl: "" };
  voiceAheadCache.set(cleanPath, entry);

  fetch(cleanPath, { cache: "force-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Voice preload HTTP ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      entry.objectUrl = URL.createObjectURL(blob);
      entry.status = "ready";
    })
    .catch((err) => {
      voiceAheadCache.delete(cleanPath);
      console.warn("[VOICE PRELOAD] failed:", cleanPath, err);
    });
}

function getVoicePlaybackSource(cleanPath) {
  const entry = voiceAheadCache.get(cleanPath);
  if (entry && entry.status === "ready" && entry.objectUrl) {
    return entry.objectUrl;
  }
  return cleanPath;
}

function preloadNextMainStoryVoices(count = 2) {
  const chapterData = CHAPTER_DATA[gameState.currentChapter];
  if (!chapterData || !Array.isArray(chapterData.steps)) return;

  let found = 0;
  for (
    let i = gameState.currentStepIndex + 1;
    i < chapterData.steps.length && found < count;
    i++
  ) {
    const futureStep = chapterData.steps[i];
    if (!futureStep || !futureStep.audio) continue;

    preloadVoicePath(futureStep.audio);
    found++;
  }
}

/*
 * Voice Web Audio
 * iPhone / iPad 上不依賴 HTMLAudio.volume 做實際音量縮放。
 * Voice Slider 改由獨立 GainNode 控制。
 */
let voiceAudioContext = null;
let voiceGainNode = null;
let voiceAudioNodes = new WeakMap();

function updateVoiceGain() {
  if (!voiceGainNode) return;

  const volume =
    Math.max(
      0,
      Math.min(
        1,
        (gameSettings.voiceVolume ?? 50) / 100
      )
    );

  try {
    voiceGainNode.gain.value = volume;
  } catch (e) {}
}

function ensureVoiceAudioContext() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) return null;

    if (!voiceAudioContext) {
      voiceAudioContext = new AudioContextClass();
      voiceGainNode = voiceAudioContext.createGain();
      voiceGainNode.connect(voiceAudioContext.destination);
      updateVoiceGain();
    }

    return voiceAudioContext;
  } catch (err) {
    console.warn("[VOICE] AudioContext unavailable:", err);
    return null;
  }
}

/*
 * DEBUG23 A/B TEST ONLY
 * Temporarily bypass Voice MediaElementAudioSourceNode routing so we can test
 * whether per-line Voice Web Audio routing is related to cumulative iOS lag.
 * Voice still plays through HTMLAudio fallback; on iOS the Voice volume slider
 * may not behave normally while this diagnostic switch is enabled.
 */
const DEBUG23_DISABLE_VOICE_WEBAUDIO = true;

function ensureVoiceWebAudio(audio) {
  if (DEBUG23_DISABLE_VOICE_WEBAUDIO) return null;
  if (!audio) return null;

  const context = ensureVoiceAudioContext();
  if (!context || !voiceGainNode) return null;

  try {
    if (voiceAudioNodes.has(audio)) {
      return voiceAudioNodes.get(audio);
    }

    const source =
      context.createMediaElementSource(audio);

    source.connect(voiceGainNode);

    const nodes = { source };
    voiceAudioNodes.set(audio, nodes);

    /*
     * HTMLAudio 固定 100%。
     * Voice 實際音量交給 voiceGainNode。
     */
    audio.volume = 1;
    updateVoiceGain();

    return nodes;
  } catch (err) {
    console.warn("[VOICE] Web Audio routing failed:", err);
    return null;
  }
}

function resumeVoiceAudioContext() {
  const context = ensureVoiceAudioContext();
  if (!context) return;

  if (context.state === "suspended") {
    try {
      context.resume().catch(() => {});
    } catch (e) {}
  }
}

/*
 * Title Screen -> Continue 專用 Voice Web Audio 重建。
 * iOS / WebKit 在重新進入存檔流程時，舊的 Voice AudioContext
 * 偶爾仍存在但 MediaElementSource 輸出會保持無聲。
 * 只在「繼續遊戲」這次使用者點擊中重建 Voice graph，
 * 不影響正常遊戲、PAUSED foreground replay、BGM / SE / Ambient。
 */
function resetVoiceAudioContextForContinue() {
  if (activeAudioInstance) {
    try {
      activeAudioInstance.pause();
      activeAudioInstance.currentTime = 0;
      activeAudioInstance.onended = null;
      activeAudioInstance.onerror = null;
    } catch (e) {}
    activeAudioInstance = null;
  }

  if (voiceGainNode) {
    try {
      voiceGainNode.disconnect();
    } catch (e) {}
  }

  if (voiceAudioContext) {
    try {
      voiceAudioContext.close().catch(() => {});
    } catch (e) {}
  }

  voiceAudioContext = null;
  voiceGainNode = null;
  voiceAudioNodes = new WeakMap();

  /*
   * 立刻在 Continue click 的 user gesture call stack 中
   * 建立並喚醒新的 Voice Context。
   */
  resumeVoiceAudioContext();
}

/*
 * Page Background Audio Pause / Resume
 */
const backgroundAudioState = {
  mainBgm: null,
  morningAmbient: null,
  extraBgm: null
};

let backgroundAudioRestorePending = false;
let backgroundAudioRestoreRunning = false;

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
  seDoorClose: "assets/se/se_door_close.ogg",

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
 * SE Master Gain
 * 手機 / 平板的 SE 音量統一由 Web Audio 控制
 */
let mainSeGainNode = null;

let mainSeAudioNodes = new WeakMap();

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
let mainBgmAudioNodes = new WeakMap();

let morningAmbientAudio = null;
let morningAmbientFadeTimer = null;

/*
 * Morning Ambient Web Audio
 *
 * audio
 *   ↓
 * fadeGain
 *   ↓
 * masterGain
 *   ↓
 * speakers
 */
let morningAmbientMasterGain = null;
let morningAmbientAudioNodes = new WeakMap();

let mainAudioUnlocked = false;

const mainSePool = [];

const MAIN_BGM_DUCK_FACTOR = 0.35;
const MORNING_AMBIENT_FACTOR = 0.175;

const MAIN_BGM_VOLUME_FACTOR = 0.3;
const MAIN_SE_VOLUME_FACTOR = 0.35;

/* =========================================================
   RESOURCE PRELOADER
   圖片 / Voice / BGM / SE 預載
   ========================================================= */

const resourcePreloader = {
  loaded: new Set(),
  loading: new Map(),
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
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;

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

/*
 * Mobile / tablet stability policy (fix17)
 * ---------------------------------------------------------
 * iOS / iPadOS Safari has a limited media pipeline. Creating many
 * temporary HTMLAudio elements for staged preload can eventually
 * compete with the real Voice player. The symptom is progressive
 * stutter near late Chapter 1 and Voice play() failures in Chapter 2.
 *
 * Images are still staged normally. Audio on touch/mobile-class
 * devices is loaded only by the real BGM / SE / Voice playback path.
 * Desktop keeps the existing audio preload behavior.
 */
function shouldSkipBackgroundAudioPreload() {
  try {
    const ua = navigator.userAgent || "";
    const platform = navigator.platform || "";
    const maxTouchPoints = Number(navigator.maxTouchPoints || 0);

    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isIPadDesktopMode =
      platform === "MacIntel" && maxTouchPoints > 1;
    const isAndroid = /Android/i.test(ua);
    const isTouchTabletOrPhone =
      maxTouchPoints > 1 &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;

    return (
      isIOS ||
      isIPadDesktopMode ||
      isAndroid ||
      isTouchTabletOrPhone
    );
  } catch (e) {
    return false;
  }
}

function preloadAudio(path) {
  /*
   * Critical: do not create preload-only HTMLAudio instances on
   * phones/tablets. Real playback still works normally via
   * playVoiceAudio / playMainSe / playMainBgm.
   */
  if (shouldSkipBackgroundAudioPreload()) {
    return Promise.resolve();
  }
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
        "loadeddata",
        finish
      );

      audio.removeEventListener(
        "canplay",
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
     * 不再等待 canplaythrough。
     *
     * loadeddata：
     * 已經取得可播放的媒體資料。
     *
     * canplay：
     * 瀏覽器已經可以開始播放。
     *
     * 兩者任一先到就視為 preload ready。
     */
    audio.preload = "auto";

    audio.addEventListener(
      "loadeddata",
      finish,
      { once: true }
    );

    audio.addEventListener(
      "canplay",
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

      finish();
      return;
    }

    /*
     * 最後保險。
     * 避免某些手機瀏覽器完全不回報 media event。
     */
    timeoutId = window.setTimeout(
      finish,
      5000
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
  onProgress = null,
  options = {}
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

  const MAX_CONCURRENT =
    Math.max(
      1,
      Number(options.maxConcurrent) || 4
    );

  const YIELD_MS =
    Math.max(
      0,
      Number(options.yieldMs) || 0
    );

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

      if (YIELD_MS > 0) {
        await new Promise(resolve => {
          window.setTimeout(resolve, YIELD_MS);
        });
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
  const userVolume = Math.max(
    0,
    Math.min(
      1,
      (gameSettings.bgmVolume ?? 50) / 100
    )
  );

  return Math.max(
    0,
    Math.min(
      1,
      userVolume *
      MAIN_BGM_VOLUME_FACTOR *
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


function ensureMorningAmbientWebAudio(audio) {
  if (!audio) return null;

  try {
    if (!mainBgmAudioContext) {
      if (mainBgmAudio) {
        ensureMainBgmWebAudio(mainBgmAudio);
      }
    }

    if (!mainBgmAudioContext) {
      return null;
    }

    /*
     * Ambient Master Gain
     * 負責 SE Slider × 0.28
     */
    if (!morningAmbientMasterGain) {
      morningAmbientMasterGain =
        mainBgmAudioContext.createGain();

      morningAmbientMasterGain.connect(
        mainBgmAudioContext.destination
      );
    }

    /*
     * 同一個 Audio 只能建立一次 MediaElementSource
     */
    if (morningAmbientAudioNodes.has(audio)) {
      return morningAmbientAudioNodes.get(audio);
    }

    const source =
      mainBgmAudioContext.createMediaElementSource(audio);

    const fadeGain =
      mainBgmAudioContext.createGain();

    fadeGain.gain.value = 0;

    source.connect(fadeGain);
    fadeGain.connect(morningAmbientMasterGain);

    const nodes = {
      source,
      fadeGain
    };

    morningAmbientAudioNodes.set(
      audio,
      nodes
    );

    /*
     * HTML Audio 固定 100%
     */
    audio.volume = 1;

    updateMorningAmbientGain();

    return nodes;

  } catch (err) {
    console.warn(
      "[MORNING AMBIENT] Web Audio init failed:",
      err
    );

    return null;
  }
}


function updateMorningAmbientGain() {
  if (!morningAmbientMasterGain) return;

  morningAmbientMasterGain.gain.value =
    getMorningAmbientVolume();
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

  let timerRef = null;

  if (type === "bgm") {
    if (mainBgmFadeTimer) {
      clearInterval(mainBgmFadeTimer);
      mainBgmFadeTimer = null;
    }
  }

  if (type === "ambient") {
    if (morningAmbientFadeTimer) {
      clearInterval(morningAmbientFadeTimer);
      morningAmbientFadeTimer = null;
    }
  }


  /*
   * Main BGM：
   * 如果這個 Audio 已經接上 Web Audio，
   * 淡入淡出改由該首 BGM 自己的 fadeGain 負責。
   *
   * Master Gain 只負責設定頁 Slider。
   */
  if (
    type === "bgm" &&
    mainBgmAudioNodes.has(audio)
  ) {
    const nodes =
      mainBgmAudioNodes.get(audio);

    const fadeGain =
      nodes && nodes.fadeGain;

    if (fadeGain) {
      /*
       * HTMLAudio 本身固定 100%。
       */
      audio.volume = 1;

      const startGain =
        Number.isFinite(fadeGain.gain.value)
          ? fadeGain.gain.value
          : 0;

      /*
       * 注意：
       * BGM Slider 音量已經由
       * mainBgmGainNode 負責。
       *
       * 所以這裡的 fade target：
       * 有聲 = mainBgmDuckFactor
       * 無聲 = 0
       */
      const safeTarget =
        targetVolume <= 0
          ? 0
          : Math.max(
              0,
              Math.min(
                1,
                mainBgmDuckFactor
              )
            );

      if (duration <= 0) {
        fadeGain.gain.value =
          safeTarget;

        if (onComplete) {
          onComplete();
        }

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
            startGain +
            (
              safeTarget -
              startGain
            ) *
              progress;

          if (progress >= 1) {
            clearInterval(timer);

            fadeGain.gain.value =
              safeTarget;

            if (
              mainBgmFadeTimer ===
              timer
            ) {
              mainBgmFadeTimer = null;
            }

            if (onComplete) {
              onComplete();
            }
          }
        }, 40);

      mainBgmFadeTimer = timer;

      return;
    }
  }


  /*
   * Morning Ambient：
   * 與 Main BGM 一樣，HTMLAudio 固定 100%，
   * fadeGain 只負責淡入淡出，Master Gain 負責 SE Slider × Ambient Factor。
   */
  if (
    type === "ambient" &&
    morningAmbientAudioNodes.has(audio)
  ) {
    const nodes =
      morningAmbientAudioNodes.get(audio);

    const fadeGain =
      nodes && nodes.fadeGain;

    if (fadeGain) {
      audio.volume = 1;

      const startGain =
        Number.isFinite(fadeGain.gain.value)
          ? fadeGain.gain.value
          : 0;

      const safeTarget =
        targetVolume <= 0 ? 0 : 1;

      if (duration <= 0) {
        fadeGain.gain.value = safeTarget;
        if (onComplete) onComplete();
        return;
      }

      const startTime = performance.now();
      const timer = setInterval(() => {
        const progress = Math.min(
          1,
          (performance.now() - startTime) /
            Math.max(1, duration)
        );

        fadeGain.gain.value =
          startGain +
          (safeTarget - startGain) * progress;

        if (progress >= 1) {
          clearInterval(timer);
          fadeGain.gain.value = safeTarget;

          if (morningAmbientFadeTimer === timer) {
            morningAmbientFadeTimer = null;
          }

          if (onComplete) onComplete();
        }
      }, 40);

      morningAmbientFadeTimer = timer;
      return;
    }
  }

  /*
   * 其他 Audio：
   * 保留原本 HTMLAudio.volume 的處理。
   */
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

    if (onComplete) {
      onComplete();
    }

    return;
  }

  const startTime = performance.now();

  const timer = setInterval(() => {
    const progress = Math.min(
      1,
      (performance.now() - startTime) /
        Math.max(1, duration)
    );

    audio.volume =
      startVolume +
      (safeTarget - startVolume) *
        progress;

    if (progress >= 1) {
      clearInterval(timer);

      audio.volume = safeTarget;

      if (
        type === "bgm" &&
        mainBgmFadeTimer === timer
      ) {
        mainBgmFadeTimer = null;
      }

      if (
        type === "ambient" &&
        morningAmbientFadeTimer === timer
      ) {
        morningAmbientFadeTimer = null;
      }

      if (onComplete) {
        onComplete();
      }
    }
  }, 40);

  timerRef = timer;

  if (type === "bgm") {
    mainBgmFadeTimer = timerRef;
  }

  if (type === "ambient") {
    morningAmbientFadeTimer = timerRef;
  }
}

function fadeDetachedMainAudioOut(
  audio,
  duration = 500
) {
  if (!audio) return;

  const startVolume =
    Number.isFinite(audio.volume)
      ? audio.volume
      : 0;

  if (
    duration <= 0 ||
    startVolume <= 0
  ) {
    try {
      audio.volume = 0;
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}

    return;
  }

  const startTime = performance.now();

  const timer = setInterval(() => {
    const progress = Math.min(
      1,
      (performance.now() - startTime) /
        Math.max(1, duration)
    );

    audio.volume = Math.max(
      0,
      startVolume * (1 - progress)
    );

    if (progress >= 1) {
      clearInterval(timer);

      try {
        audio.volume = 0;
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {}
    }
  }, 40);
}


/* ---------- Debug22: detached Main BGM cleanup ---------- */

function releaseMainBgmAudioElement(audio, reason = "cleanup") {
  if (!audio) return;

  try {
    const nodes = mainBgmAudioNodes.get(audio);

    if (nodes) {
      try {
        if (nodes.source) nodes.source.disconnect();
      } catch (e) {}

      try {
        if (nodes.fadeGain) nodes.fadeGain.disconnect();
      } catch (e) {}

      mainBgmAudioNodes.delete(audio);
    }
  } catch (e) {}

  try {
    audio.pause();
  } catch (e) {}

  try {
    audio.removeAttribute("src");
    audio.load();
  } catch (e) {}

  console.log(
    "[MAIN BGM] released:",
    reason
  );
}

function fadeDetachedMainBgmOut(
  audio,
  duration = 500
) {
  if (!audio) return;

  const nodes =
    mainBgmAudioNodes.get(audio);

  const fadeGain =
    nodes && nodes.fadeGain;

  /*
   * Web Audio path:
   * detached BGM fades with its own fadeGain.
   * When the fade is complete, fully detach only
   * this old BGM element from the graph.
   */
  if (fadeGain) {
    const startGain =
      Number.isFinite(fadeGain.gain.value)
        ? fadeGain.gain.value
        : 0;

    if (
      duration <= 0 ||
      startGain <= 0
    ) {
      try {
        fadeGain.gain.value = 0;
      } catch (e) {}

      releaseMainBgmAudioElement(
        audio,
        "detached-immediate"
      );
      return;
    }

    const startTime = performance.now();

    const timer = setInterval(() => {
      const progress = Math.min(
        1,
        (performance.now() - startTime) /
          Math.max(1, duration)
      );

      try {
        fadeGain.gain.value =
          Math.max(
            0,
            startGain * (1 - progress)
          );
      } catch (e) {}

      if (progress >= 1) {
        clearInterval(timer);

        try {
          fadeGain.gain.value = 0;
        } catch (e) {}

        releaseMainBgmAudioElement(
          audio,
          "detached-fade-complete"
        );
      }
    }, 40);

    return;
  }

  /*
   * HTMLAudio fallback when Web Audio is unavailable.
   */
  const startVolume =
    Number.isFinite(audio.volume)
      ? audio.volume
      : 0;

  if (
    duration <= 0 ||
    startVolume <= 0
  ) {
    try {
      audio.volume = 0;
    } catch (e) {}

    releaseMainBgmAudioElement(
      audio,
      "detached-fallback-immediate"
    );
    return;
  }

  const startTime = performance.now();

  const timer = setInterval(() => {
    const progress = Math.min(
      1,
      (performance.now() - startTime) /
        Math.max(1, duration)
    );

    try {
      audio.volume = Math.max(
        0,
        startVolume * (1 - progress)
      );
    } catch (e) {}

    if (progress >= 1) {
      clearInterval(timer);

      releaseMainBgmAudioElement(
        audio,
        "detached-fallback-fade-complete"
      );
    }
  }, 40);
}


function resetMainBgmContextForForeground() {

  /*
   * iOS Safari foreground restore 專用。
   *
   * 只重建 Main BGM 的 Web Audio Context。
   * 不碰：
   * - Main SE
   * - Voice
   * - Morning Ambient
   * - Extra Event
   * - mainAudioUnlocked
   */

  const oldContext = mainBgmAudioContext;

  /*
   * 丟棄舊 Main BGM Web Audio graph。
   *
   * 背景前的 HTMLAudio 已經 destructive unload，
   * 所以舊 MediaElementSource 不再使用。
   */
  mainBgmAudioContext = null;
  mainBgmGainNode = null;
  mainBgmAudioNodes = new WeakMap();

  /*
   * 不等待 close()。
   * 避免 iOS Safari 的 close Promise 卡住恢復流程。
   */
  if (oldContext) {
    try {
      oldContext.close().catch(() => {});
    } catch (e) {}
  }
  

  /*
   * 不在這裡直接建立新的 Context。
   *
   * 等新的 BGM Audio 建立後，
   * 交給 ensureMainBgmWebAudio(audio)
   * 建立新的：
   *
   * AudioContext
   * → MediaElementSource
   * → fadeGain
   * → mainBgmGainNode
   */
}

function rebuildMainAudioContext() {
  /*
   * iOS Safari 從背景回來後，
   * 舊 AudioContext 可能顯示正常，
   * 但實際已經無法輸出聲音。
   *
   * 因此直接捨棄舊 Context，
   * 建立全新的 AudioContext。
   */

  const oldContext = mainBgmAudioContext;

  /*
   * 先讓所有 Web Audio 相關變數
   * 不再指向舊 Context 的節點。
   */
  mainBgmAudioContext = null;
  mainBgmGainNode = null;
  mainSeGainNode = null;
  morningAmbientMasterGain = null;

  /*
   * 舊 MediaElementSource / GainNode
   * 也全部丟棄。
   */
  mainBgmAudioNodes = new WeakMap();
  mainSeAudioNodes = new WeakMap();
  morningAmbientAudioNodes = new WeakMap();

  /*
   * unlockMainStoryAudio() 必須允許重新初始化。
   */
  mainAudioUnlocked = false;

  /*
   * 舊 SE Audio 已經綁定舊 Context，
   * 不能拿去接新的 Context。
   */
  mainSePool.forEach((audio) => {
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute("src");
      audio.load();
    } catch (e) {}
  });

  mainSePool.length = 0;

  /*
   * 舊 Context 不等待 close()。
   * iOS 有可能讓 Promise 卡住。
   */
  if (oldContext) {
    try {
      oldContext.close().catch(() => {});
    } catch (e) {}
  }

  /*
   * 建立全新的 Context。
   */
  try {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) {
      return false;
    }

    mainBgmAudioContext =
      new AudioContextClass();

    /*
     * BGM Master Gain
     */
    mainBgmGainNode =
      mainBgmAudioContext.createGain();

    mainBgmGainNode.connect(
      mainBgmAudioContext.destination
    );

    /*
     * SE Master Gain
     */
    mainSeGainNode =
      mainBgmAudioContext.createGain();

    mainSeGainNode.connect(
      mainBgmAudioContext.destination
    );

    /*
     * Morning Ambient Master Gain
     */
    morningAmbientMasterGain =
      mainBgmAudioContext.createGain();

    morningAmbientMasterGain.connect(
      mainBgmAudioContext.destination
    );

    updateMainBgmGain();
    updateMainSeGain();
    updateMorningAmbientGain();

    /*
     * 重新建立 Main SE channels。
     */
    for (let i = 0; i < 4; i++) {
      const seAudio = new Audio();

      seAudio.preload = "auto";
      seAudio.volume = 1;

      mainSePool.push(seAudio);

      ensureMainSeWebAudio(seAudio);
    }

    if (
  mainBgmAudioContext &&
  mainBgmAudioContext.state === "suspended"
) {
  mainBgmAudioContext
    .resume()
    .catch(() => {});
}

    mainAudioUnlocked = true;

    console.log(
      "[BACKGROUND] Main AudioContext rebuilt"
    );

    return true;

  } catch (err) {
    console.warn(
      "[BACKGROUND] AudioContext rebuild failed:",
      err
    );

    return false;
  }
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

  mainBgmGainNode.gain.value =
  volume * MAIN_BGM_VOLUME_FACTOR;
}

function ensureMainSeWebAudio(audio) {
  if (!audio) return null;

  try {
    /*
     * AudioContext 會由 Main BGM 初始化。
     * 如果還沒有，就先讓 BGM Web Audio 建立它。
     */
    if (!mainBgmAudioContext) {
      if (mainBgmAudio) {
        ensureMainBgmWebAudio(mainBgmAudio);
      }
    }

    if (!mainBgmAudioContext) {
      return null;
    }

    /*
     * 建立共用 SE Master Gain。
     *
     * foreground restore 可能只重建 Main BGM AudioContext。
     * 此時舊的 mainSeGainNode 仍屬於舊 Context；若直接把
     * 新 Context 的 MediaElementSource 接上去，就會觸發
     * "cannot connect to an AudioNode belonging to a different audio context"。
     *
     * 因此只要 Context ownership 不一致，就丟棄舊 SE graph，
     * 在目前的 Main AudioContext 上重建 SE GainNode。
     */
    if (
      !mainSeGainNode ||
      mainSeGainNode.context !== mainBgmAudioContext
    ) {
      mainSeGainNode =
        mainBgmAudioContext.createGain();

      mainSeGainNode.connect(
        mainBgmAudioContext.destination
      );

      mainSeAudioNodes = new WeakMap();
    }

    /*
     * 同一個 Audio 只能建立一次 MediaElementSource
     */
    if (mainSeAudioNodes.has(audio)) {
      return mainSeAudioNodes.get(audio);
    }

    const source =
      mainBgmAudioContext
        .createMediaElementSource(audio);

    source.connect(mainSeGainNode);

    mainSeAudioNodes.set(
      audio,
      source
    );

    /*
     * HTML Audio 固定 100%
     * 真正 SE 音量交給 GainNode
     */
    audio.volume = 1;

    updateMainSeGain();

    return source;

  } catch (err) {
    console.warn(
      "[MAIN SE] Web Audio init failed:",
      err
    );

    return null;
  }
}


function updateMainSeGain() {
  if (!mainSeGainNode) return;

  mainSeGainNode.gain.value =
    getMainSeVolume() *
    MAIN_SE_VOLUME_FACTOR;
}

/* ---------- audio unlock ---------- */

function unlockMainStoryAudio() {
  if (mainAudioUnlocked) return;

  try {
    /*
     * Main BGM
     */
    if (!mainBgmAudio) {
      mainBgmAudio = new Audio();
      mainBgmAudio.preload = "auto";
      mainBgmAudio.loop = true;
      mainBgmAudio.volume = 0;
    }

    /*
     * Morning Ambient
     */
    if (!morningAmbientAudio) {
      morningAmbientAudio = new Audio();
      morningAmbientAudio.preload = "auto";
      morningAmbientAudio.loop = true;
      morningAmbientAudio.volume = 0;
    }

    /*
     * Main SE Pool
     */
    if (mainSePool.length === 0) {
      for (let i = 0; i < 4; i++) {
        const seAudio = new Audio();

        seAudio.preload = "auto";
        seAudio.volume =
          getMainSeVolume() *
          MAIN_SE_VOLUME_FACTOR;

        mainSePool.push(seAudio);
      }
    }

    mainAudioUnlocked = true;

    console.log(
      "[MAIN AUDIO] HTMLAudio channels ready"
    );

  } catch (e) {
    console.warn(
      "[MAIN AUDIO] channel init failed",
      e
    );
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
    mainBgmAudio.muted =
      gameSettings.bgmVolume <= 0;
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
  fadeDetachedMainBgmOut(
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

audio.muted =
  gameSettings.bgmVolume <= 0;

/*
 * Main BGM 接入 Web Audio：
 *
 * HTMLAudio
 * ↓
 * MediaElementSource
 * ↓
 * fadeGain
 * ↓
 * mainBgmGainNode
 * ↓
 * destination
 */
const bgmNodes =
  ensureMainBgmWebAudio(audio);

if (bgmNodes) {
  /*
   * Web Audio 模式：
   * HTMLAudio 本身固定 100%。
   * 初始淡入由 fadeGain = 0 開始。
   */
  audio.volume = 1;
  bgmNodes.fadeGain.gain.value = 0;

  updateMainBgmGain();
} else {
  /*
   * Web Audio 建立失敗時，
   * 保留原本 HTMLAudio fallback。
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

  mainBgmAudio = null;
  mainBgmPath = "";

  if (!audio) return;

  if (mainBgmFadeTimer) {
    clearInterval(mainBgmFadeTimer);
    mainBgmFadeTimer = null;
  }

  fadeDetachedMainBgmOut(
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

  /*
   * Main SE 不再重用舊 HTMLAudioElement。
   *
   * createMediaElementSource() 會永久把某個 HTMLAudioElement
   * 綁定到建立它的 AudioContext。背景恢復時 Main AudioContext
   * 可能重建，因此重用舊 SE channel 仍有機會觸發：
   * "cannot connect to an AudioNode belonging to a different audio context"。
   *
   * SE 都是短暫的一次性音效，所以每次播放建立全新的 Audio，
   * 並只接到「當下」的 Main AudioContext，是最安全的做法。
   * 播放結束後會從 mainSePool 移除，不會持續累積。
   */
  const audio = new Audio();
  audio.preload = "auto";
  audio.volume = 1;

  mainSePool.push(audio);
  return audio;
}

function releaseMainSeAudioElement(audio, reason = "cleanup") {
  if (!audio) return;

  audio.onended = null;
  audio.onerror = null;

  try {
    audio.pause();
  } catch (e) {}

  const source = mainSeAudioNodes.get(audio);
  if (source) {
    try {
      source.disconnect();
    } catch (e) {}
  }

  mainSeAudioNodes.delete(audio);

  const poolIndex = mainSePool.indexOf(audio);
  if (poolIndex !== -1) {
    mainSePool.splice(poolIndex, 1);
  }

  try {
    audio.removeAttribute("src");
    audio.load();
  } catch (e) {}
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

audio.muted =
  gameSettings.seVolume <= 0;

audio.volume = 1;

/*
 * 每次播放 Main SE 前，確認這個 channel 已接上
 * Main SE GainNode。
 *
 * 這一步很重要：unlockMainStoryAudio() 可能先建立
 * HTMLAudio channel，之後 BGM 才建立 AudioContext。
 * 若沒有在播放前補接，Slider 的 1～100% 只會改到
 * GainNode，實際鐘聲仍可能繞過 GainNode；只有 0% 的
 * HTMLAudio muted 會有反應。
 */
ensureMainSeWebAudio(audio);

    let finished = false;
    const finishOnce = () => {
      if (finished) return;
      finished = true;

      releaseMainSeAudioElement(
        audio,
        "finish"
      );

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

/* ---------- Final Performance: Morning Ambient cleanup ---------- */
function releaseMorningAmbientAudio(audio) {
  if (!audio) return;

  const nodes = morningAmbientAudioNodes.get(audio);

  if (nodes) {
    if (nodes.source) {
      try { nodes.source.disconnect(); } catch (e) {}
    }

    if (nodes.fadeGain) {
      try { nodes.fadeGain.disconnect(); } catch (e) {}
    }
  }

  morningAmbientAudioNodes.delete(audio);

  try {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
  } catch (e) {}
}

function fadeDetachedMorningAmbientOut(audio, duration = 500) {
  if (!audio) return;

  const nodes = morningAmbientAudioNodes.get(audio);
  const fadeGain = nodes && nodes.fadeGain;

  if (!fadeGain) {
    fadeDetachedMainAudioOut(audio, duration);
    window.setTimeout(() => {
      releaseMorningAmbientAudio(audio);
    }, Math.max(0, duration) + 80);
    return;
  }

  const startGain = Number.isFinite(fadeGain.gain.value)
    ? fadeGain.gain.value
    : 0;

  if (duration <= 0 || startGain <= 0) {
    try { fadeGain.gain.value = 0; } catch (e) {}
    releaseMorningAmbientAudio(audio);
    return;
  }

  const startTime = performance.now();
  const timer = setInterval(() => {
    const progress = Math.min(
      1,
      (performance.now() - startTime) / Math.max(1, duration)
    );

    try {
      fadeGain.gain.value = Math.max(0, startGain * (1 - progress));
    } catch (e) {}

    if (progress >= 1) {
      clearInterval(timer);
      releaseMorningAmbientAudio(audio);
    }
  }, 40);
}

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
    morningAmbientAudio.muted =
  gameSettings.seVolume <= 0;

    ensureMorningAmbientWebAudio(
      morningAmbientAudio
    );

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

    fadeDetachedMorningAmbientOut(
      oldAudio,
      Math.min(fadeMs, 500)
    );
  }

  const audio = new Audio();

audio.preload = "auto";
audio.loop = true;

audio.muted =
  gameSettings.seVolume <= 0;

audio.volume = 0;
audio.src = cleanPath;

  audio.dataset.mainPath = cleanPath;

  morningAmbientAudio = audio;

  /*
   * 每次播放 Morning Ambient 前，確認它真的接上
   * Ambient Web Audio GainNode。
   * iPhone 上不能只依賴 HTMLAudio.volume。
   */
  ensureMorningAmbientWebAudio(audio);

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

  fadeDetachedMorningAmbientOut(
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
    const ambientToRelease = morningAmbientAudio;
    morningAmbientAudio = null;
    releaseMorningAmbientAudio(ambientToRelease);
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
    const hasProgress = Number(data.currentChapter || 1) > 1 || (data.currentStepIndex && data.currentStepIndex > 0) || data.isCleared || (data.completedSections && data.completedSections.length > 0);
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
    element.textContent = formattedText;
    element.removeAttribute('data-full-text');
    return;
  }

  element.textContent = "";
  const textNode = document.createTextNode("");
  element.appendChild(textNode);

  let i = 0;
  let speedDelay = 35;
  if (gameSettings.textSpeed === "slow") speedDelay = 70;
  if (gameSettings.textSpeed === "fast") speedDelay = 15;

  const timer = setInterval(() => {
    if (i < formattedText.length) {
      i++;
      textNode.nodeValue = formattedText.slice(0, i);
    } else {
      clearInterval(timer);
      typingTimers.delete(element);
      element.removeAttribute('data-full-text');
    }
  }, speedDelay);

  typingTimers.set(element, timer);
}

function releaseVoiceAudioElement(audio, reason = "voice_release") {
  if (!audio) return;

  /*
   * iOS / WebKit: a connected MediaElementAudioSourceNode can keep its
   * one-shot HTMLAudioElement reachable after the line has finished.
   * Disconnect that per-line source and detach the media resource so Voice
   * playback does not accumulate across a long story session.
   */
  try {
    const nodes = voiceAudioNodes.get(audio);
    if (nodes && nodes.source) {
      try { nodes.source.disconnect(); } catch (e) {}
    }
    voiceAudioNodes.delete(audio);
  } catch (e) {}

  try { audio.pause(); } catch (e) {}
  try { audio.onended = null; } catch (e) {}
  try { audio.onerror = null; } catch (e) {}
  try {
    audio.removeAttribute("src");
    audio.load();
  } catch (e) {}
}

function stopActiveAudio(reason = "manual_stop", dialogueId = "unknown") {
  currentPlaybackToken++;

  if (reason !== "pageBackground") {
    activeVoiceReplayPath = "";
  }

  if (activeAudioInstance) {
    const audioToRelease = activeAudioInstance;
    activeAudioInstance = null;
    releaseVoiceAudioElement(audioToRelease, reason);
  }
}

/* ==========================================================================
   iOS Audio Unlock & Playback Utility
   ========================================================================== */

/*
 * iOS user-gesture unlock channel.
 *
 * IMPORTANT: this must be ONE reusable HTMLAudioElement.
 * The old implementation created a brand-new data-URI Audio on every
 * dialogue / UI click. On iOS/iPadOS that can accumulate media-player
 * resources even after pause(), causing progressive whole-page slowdown.
 */
let iosSilentUnlockAudio = null;

function unlockAudioContextIOS() {
  try {
    if (!iosSilentUnlockAudio) {
      iosSilentUnlockAudio = new Audio();
      iosSilentUnlockAudio.preload = "auto";
      iosSilentUnlockAudio.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
    }

    try {
      iosSilentUnlockAudio.currentTime = 0;
    } catch (e) {}

    const promise = iosSilentUnlockAudio.play();
    if (promise && typeof promise.then === "function") {
      promise.then(() => {
        try {
          iosSilentUnlockAudio.pause();
          iosSilentUnlockAudio.currentTime = 0;
        } catch (e) {}
      }).catch(() => {});
    }
  } catch (e) {}

  unlockMainStoryAudio();

  /*
   * TAP TO START 的 user gesture 中一併建立／喚醒 Voice Context。
   * 這樣 Loading 結束後第一句 Voice 不需要臨時建立 suspended Context。
   */
  resumeVoiceAudioContext();

  try {
    
  } catch (e) {}

  
}

function playVoiceAudio(audioPath, dialogueId = "unknown", onEndedCallback) {
  stopActiveAudio("new_playback_replacement", dialogueId);
  const thisToken = currentPlaybackToken;
  const currentVol = (gameSettings.voiceVolume ?? 50) / 100;

  const cleanPath = normalizeVoicePath(audioPath);

  if (!audioPath || currentVol <= 0) {
    activeVoiceReplayPath = "";
    const replayBtn = document.getElementById('btn-audio-play');
    if (replayBtn) replayBtn.remove();
    if (onEndedCallback) onEndedCallback();
    return;
  }

  activeVoiceReplayPath = cleanPath;

  try {
  const playbackSource = getVoicePlaybackSource(cleanPath);
  const audio = new Audio(playbackSource);

  audio.muted = currentVol <= 0;

  const voiceNodes =
    ensureVoiceWebAudio(audio);

  if (voiceNodes) {
    audio.volume = 1;
    updateVoiceGain();
  } else {
    /* Web Audio 不可用時保留原本 HTMLAudio fallback。 */
    audio.volume = currentVol;
  }

  activeAudioInstance = audio;

  /*
   * foreground 的 PAUSED Continue 也會走到這裡。
   * 不 await，讓 resume() 與 play() 都留在同一次 user gesture 中。
   */
  resumeVoiceAudioContext();

    audio.play().then(() => {}).catch(err => {
      console.warn("[iOS Audio Autoplay Blocked / NotAllowedError]", err);
      if (currentPlaybackToken === thisToken) {
        activeVoiceReplayPath = "";
        if (activeAudioInstance === audio) {
          activeAudioInstance = null;
        }
        releaseVoiceAudioElement(audio, "play_rejected");
      }
      if (currentPlaybackToken === thisToken && onEndedCallback) {
        onEndedCallback();
      }
    });

    audio.onended = () => {
      if (currentPlaybackToken !== thisToken) {
        releaseVoiceAudioElement(audio, "stale_ended");
        return;
      }
      activeVoiceReplayPath = "";
      if (activeAudioInstance === audio) {
        activeAudioInstance = null;
      }
      releaseVoiceAudioElement(audio, "natural_ended");
      if (onEndedCallback) onEndedCallback();
    };
  } catch (e) {
    if (currentPlaybackToken === thisToken) {
      activeVoiceReplayPath = "";
    }
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
  if (window.__KIKU_DEBUG_SESSION__ === true) {
    return;
  }

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
      gameSettings.seVolume = data.settings.seVolume ?? 50;
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
    gameState.totalQuizzes = CHAPTER_DATA[gameState.currentChapter]?.totalQuizzes || 5;
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
    MAIN_AUDIO.bgmSchoolDay,
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

  // 首頁 BGM 已經正在播放時，不要重新啟動。
if (
  mainBgmAudio &&
  mainBgmPath === MAIN_AUDIO.bgmSchoolDay &&
  !mainBgmAudio.paused
) {
  return;
}

startTitleBgm();
}

async function waitForInitialBgmBuffer(
  minBufferedSeconds = 3,
  timeoutMs = 3000
) {
  if (
    !mainBgmAudio ||
    mainBgmAudio.paused
  ) {
    return;
  }

  const startedAt = performance.now();

  while (
    performance.now() - startedAt < timeoutMs
  ) {
    try {
      const currentTime =
        Number(mainBgmAudio.currentTime) || 0;

      let bufferedAhead = 0;

      for (
        let i = 0;
        i < mainBgmAudio.buffered.length;
        i++
      ) {
        const start =
          mainBgmAudio.buffered.start(i);
        const end =
          mainBgmAudio.buffered.end(i);

        if (
          currentTime >= start &&
          currentTime <= end
        ) {
          bufferedAhead =
            Math.max(
              0,
              end - currentTime
            );
          break;
        }
      }

      if (
        bufferedAhead >=
        minBufferedSeconds
      ) {
        return;
      }
    } catch (err) {}

    await new Promise(resolve => {
      window.setTimeout(resolve, 100);
    });
  }
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
        MAIN_AUDIO.bgmSchoolDay,
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

/*
 * Initial Loading 已完成。
 * Mobile / iPad stability:
 * Title 畫面只準備 Chapter 1 Section 3。
 * Section 4、5 改成遊戲進行時逐段預載，避免大量 Voice Audio
 * 與 Extra Event 31 段語音同時在背景佔用 Safari media pipeline。
 */
    window.setTimeout(() => {
      preloadListeningSectionInBackground(1, 3);
    }, 250);


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
      MAIN_AUDIO.bgmSchoolDay
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
    /*
     * Extra Event 也顯示 HUD/Menu，但只開放「設定」。
     * 返回標題按鈕仍在 Extra Event 中隱藏。
     */
    if (elements.vnHud) elements.vnHud.classList.remove('hidden');
    if (hudConfigBtn) hudConfigBtn.style.display = 'block';
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

  /*
   * Section-based preload:
   * - Chapter 1 keeps its original preload plan.
   * - While Chapter 1 Section 5 is playing, prepare Chapter 2 Section 1.
   * - In Chapter 2, always prepare the next Listening Section one section early.
   */
  scheduleStorySectionPreload(
    gameState.currentChapter || 1,
    stepData.listeningSection
  );


  if (gameState.currentChapter === 2) {
    stopMorningAmbient();

    if (stepData.listeningSection >= 1 && stepData.listeningSection <= 4) {
      playMainBgm(MAIN_AUDIO.bgmSchoolDay);
    } else if (stepData.listeningSection === 5) {
      if (stepData.id === "ch2_s06_107_ren") {
        stopMainBgm(700);
      } else if (!stepData.id.startsWith("ch2_s06_")) {
        playMainBgm(MAIN_AUDIO.bgmDaily);
      }
    }

  } else if (stepData.listeningSection === 1) {
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

  const isChapter2MisakiPosterCg =
    gameState.currentChapter === 2 &&
    stepData.id === "ch2_s03_046_misaki";

  const isChapter2SilentRenSubtitle =
    gameState.currentChapter === 2 &&
    (
      stepData.id === "ch2_s06_114_ren" ||
      stepData.id === "ch2_s06_116_ren"
    );

  const speaker = CHARACTERS[stepData.speaker] || CHARACTERS["hero"];
  if (elements.speakerName) elements.speakerName.innerText = speaker.name;
  if (elements.speakerTitle) elements.speakerTitle.innerText = speaker.title;
  if (elements.vnNameplate) elements.vnNameplate.style.backgroundColor = speaker.color;

  const isPlayer = (stepData.speaker === "player");
  const isNarrative = (stepData.type === "narrative" || stepData.speaker === "narrator");
  const subtitlesEnabled = ((gameSettings.chineseSubtitle || "on") === 'on');

  if (elements.dialogueJp) {
    elements.dialogueJp.style.display = "block";
  }

  if (isNarrative) {
    typeWriterText(elements.dialogueJp, stepData.jp);
    if (elements.dialogueJp) elements.dialogueJp.style.display = "block";

    if (subtitlesEnabled && stepData.zh) {
      typeWriterText(elements.dialogueZh, stepData.zh);
      if (elements.dialogueZh) elements.dialogueZh.style.display = "block";
    } else if (elements.dialogueZh) {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display = "none";
    }
  } else if (isPlayer) {
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
  } else if (isChapter2SilentRenSubtitle) {
    // 這兩句蓮沒有 Voice；像玩家台詞一樣直接顯示文字，
    // 避免玩家誤以為音檔沒有成功播放。
    typeWriterText(elements.dialogueJp, stepData.jp);
    if (elements.dialogueJp) elements.dialogueJp.style.display = "block";

    if (subtitlesEnabled && stepData.zh) {
      typeWriterText(elements.dialogueZh, stepData.zh);
      if (elements.dialogueZh) elements.dialogueZh.style.display = "block";
    } else if (elements.dialogueZh) {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display = "none";
    }
  } else {
    if (isChapter2MisakiPosterCg) {
      // 海報先作為獨立演出出現；震動結束後等待玩家點擊才進入 046。
      if (elements.dialogueJp) elements.dialogueJp.innerHTML = "";
    } else {
      typeWriterText(elements.dialogueJp, "🎧 [盲聽中... 請仔細聆聽角色語音與情境]");
    }
    if (elements.dialogueZh) {
      elements.dialogueZh.innerHTML = "";
      elements.dialogueZh.style.display = "none";
    }

    if (stepData.audio && !isChapter2MisakiPosterCg) {
      const voiceDelayMs = Number(stepData.delayVoiceMs || 0);

      if (voiceDelayMs > 0) {
        const delayedStepId = stepData.id;
        isMainStoryTransitioning = true;

        setTimeout(() => {
          const chapterData = CHAPTER_DATA[gameState.currentChapter];
          const currentStep = chapterData && chapterData.steps
            ? chapterData.steps[gameState.currentStepIndex]
            : null;

          if (currentStep && currentStep.id === delayedStepId) {
            playVoiceAudio(
              stepData.audio,
              stepData.id,
              undefined
            );
          }

          isMainStoryTransitioning = false;
        }, voiceDelayMs);
      } else {
        playVoiceAudio(
          stepData.audio,
          stepData.id,
          undefined
        );
      }
    }
  }

  renderSprite(stepData.position, stepData.speaker, stepData.expression);

  /*
   * Chapter 2 Scene 03：美咲展示海報。
   * 045 結束後進入 046 時，先只展示海報 CG 並震動。
   * 震動完全結束後停住，等待玩家點擊；點擊後才顯示盲聽提示並播放 046「じゃーん！」Voice。
   * 下一步玩家台詞會照一般 renderDialogueStep() 自動恢復教室背景。
   */
  if (isChapter2MisakiPosterCg) {
  const posterSrc = getChapter2MisakiPosterSource();

  // 海報單獨展示期間隱藏整個對話 UI。
  const dialogueBox = document.querySelector(".vn-dialogue-box");
if (dialogueBox) {
  dialogueBox.style.opacity = "0";
}

  // CG 展示期間不顯示人物立繪，也暫時鎖住點擊避免跳過演出。
  [elements.spriteLeft, elements.spriteCenter, elements.spriteRight]
      .forEach((sprite) => {
        if (sprite) sprite.classList.add("hidden");
      });

    isMainStoryTransitioning = true;

    const posterImage = new Image();
    let posterHandled = false;

    const showPosterThenPlayVoice = () => {
      if (posterHandled) return;
      posterHandled = true;

      if (elements.bgLayer) {
        elements.bgLayer.style.backgroundImage = `url('${posterSrc}')`;
        elements.bgLayer.style.backgroundSize = "contain";
        elements.bgLayer.style.backgroundRepeat = "no-repeat";
        elements.bgLayer.style.backgroundPosition = "center";
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          let shakeAnimation = null;

          if (elements.bgLayer && typeof elements.bgLayer.animate === "function") {
            shakeAnimation = elements.bgLayer.animate(
              [
                { transform: "translateX(0)" },
                { transform: "translateX(-12px)" },
                { transform: "translateX(10px)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(6px)" },
                { transform: "translateX(-3px)" },
                { transform: "translateX(0)" }
              ],
              {
                duration: 420,
                easing: "ease-out",
                iterations: 1
              }
            );
          }

          const waitForPosterClick = () => {
            const currentStep = CHAPTER_DATA[2]?.steps?.[gameState.currentStepIndex];
            if (!currentStep || currentStep.id !== stepData.id) {
              isChapter2PosterAwaitingReveal = false;
              isMainStoryTransitioning = false;
              return;
            }

            // 海報震動結束後停在 CG 畫面，等待玩家主動點擊。
            // 這個階段不顯示 046 的盲聽提示，也不播放 046 Voice。
            isChapter2PosterAwaitingReveal = true;
            isMainStoryTransitioning = false;
          };

          if (shakeAnimation && shakeAnimation.finished) {
            shakeAnimation.finished
              .then(waitForPosterClick)
              .catch(() => setTimeout(waitForPosterClick, 420));
          } else {
            setTimeout(waitForPosterClick, 420);
          }
        });
      });
    };

    posterImage.onload = showPosterThenPlayVoice;
    posterImage.onerror = () => {
      console.warn("[CH2 POSTER CG] failed to load:", posterSrc);
      isMainStoryTransitioning = false;
    };
    posterImage.src = posterSrc;

    if (posterImage.complete && posterImage.naturalWidth > 0) {
      showPosterThenPlayVoice();
    }
  }

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
    gameState.currentChapter === 1 &&
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

  // Story Collection：完成該聽力 Section 後永久解鎖回顧。
  unlockStorySection(gameState.currentChapter, currentSec);

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
      gameState.wrongQuestions = [];
      gameState.score = 0;
      gameState.isCleared = false;
      gameState.totalQuizzes = CHAPTER_DATA[nextChapter]?.totalQuizzes || 5;
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
    gameState.wrongQuestions = [];
    gameState.score = 0;
    gameState.isCleared = false;
    gameState.totalQuizzes = CHAPTER_DATA[nextChapter]?.totalQuizzes || 5;
    gameState.hasValidSave = true;
    saveGameData();
    updateHUD();
    if (callback) callback();
  }
}

function nextStep() {
  const chapterData = CHAPTER_DATA[gameState.currentChapter];
  const currentStep = chapterData.steps[gameState.currentStepIndex];

  // Chapter 2 Scene 06：透最後一句之後，先退場並播放關門聲，
  // 等 SE 播放完再接美咲，避免台詞直接蓋過關門演出。
  if (currentStep && currentStep.id === "ch2_s06_109_toru") {
    if (isMainStoryTransitioning) return;
    isMainStoryTransitioning = true;

    stopAllTypewriters();
    stopActiveAudio("ch2DoorExit", currentStep.id);

    if (elements.spriteRight) {
      elements.spriteRight.classList.add("hidden");
    }

    playMainSe(MAIN_AUDIO.seDoorClose, () => {
      gameState.currentStepIndex++;
      const nextStepData = chapterData.steps[gameState.currentStepIndex];
      updateHUD();
      saveGameData();
      isMainStoryTransitioning = false;

      if (nextStepData) {
        renderDialogueStep(nextStepData);
      }
    });
    return;
  }

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

    if (storyCollectionReplayMode) {
      finishStoryCollectionReplay();
      return;
    }

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

  const clearedChapter = gameState.currentChapter;
  const restartBtn = document.getElementById("btn-restart");

  if (clearedChapter === 1) {
    if (elements.endingBadgeTag) elements.endingBadgeTag.innerText = "CHAPTER 1 CLEAR";
    if (elements.endingTitle) elements.endingTitle.innerText = "第一章完結：誰把我們的班級交給這兩個人了？";
    if (elements.endingEvalText) {
      elements.endingEvalText.innerHTML = formatTextWithPlayer(
        "【第一章測驗全部完成！】：\n" +
        "順利通過全部 5 項聽力任務！{{playerName}}{{playerHonorific}} 成功和蓮、透、美咲一起確定文化祭企劃！\n\n" +
        "下一章將進入文化祭準備階段。"
      );
    }
    if (restartBtn) restartBtn.innerText = "進入第二章";
  } else if (clearedChapter === 2) {
    if (elements.endingBadgeTag) elements.endingBadgeTag.innerText = "CHAPTER 2 CLEAR";
    if (elements.endingTitle) elements.endingTitle.innerText = "第二章完結：每個人說的都不是同一件事";
    if (elements.endingEvalText) {
      elements.endingEvalText.innerHTML = formatTextWithPlayer(
        "【第二章測驗全部完成！】：\n" +
        "順利通過全部 5 項聽力任務。文化祭準備卻因為場地問題與一句脫口而出的話，留下了新的裂痕。\n\n" +
        "――文化祭まで、あと三週間。"
      );
    }
    if (restartBtn) restartBtn.innerText = "返回標題畫面";
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

  /*
   * iPhone / iPad：從標題畫面讀取存檔時，
   * 用這次 Continue 點擊重新建立 Voice Web Audio graph。
   */
  resetVoiceAudioContextForContinue();

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
let isChapter2PosterAwaitingReveal = false;

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
      elements.dialogueJp.textContent = fullTextAttr;
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

  // Chapter 2 Scene 03 海報：震動結束後的第一次點擊只負責進入 046。
  // 同一次點擊不推進下一個 step；顯示與 Voice 都從這次點擊才開始。
  if (
  isChapter2PosterAwaitingReveal &&
  currentStep &&
  currentStep.id === "ch2_s03_046_misaki"
) {
  isChapter2PosterAwaitingReveal = false;

  const dialogueBox = document.querySelector(".vn-dialogue-box");
if (dialogueBox) {
  dialogueBox.style.opacity = "";
}

  typeWriterText(
    elements.dialogueJp,
    "🎧 [盲聽中... 請仔細聆聽角色語音與情境]"
  );

  if (currentStep.audio) {
    playVoiceAudio(
      currentStep.audio,
      currentStep.id,
      undefined
    );
  }
  return;
}

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

  screens.collection =
    document.getElementById('screen-collection');

  screens.storyCollection =
    document.getElementById('screen-story-collection');

  screens.storyChapter1 =
    document.getElementById('screen-story-chapter1');

  screens.storyChapter2 =
    document.getElementById('screen-story-chapter2');

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
  () => showScreen('collection')
);

bindClick(
  'btn-collection-back',
  () => showScreen('title')
);

bindClick(
  'btn-story-collection',
  () => showScreen('storyCollection')
);

bindClick(
  'btn-story-collection-back',
  () => showScreen('collection')
);

bindClick(
  'btn-story-chapter1',
  () => {
    renderStoryChapter1Collection();
    showScreen('storyChapter1');
  }
);

bindClick(
  'btn-story-chapter1-back',
  () => showScreen('storyCollection')
);

bindClick(
  'btn-story-chapter2',
  () => {
    renderStoryChapter2Collection();
    showScreen('storyChapter2');
  }
);

bindClick(
  'btn-story-chapter2-back',
  () => showScreen('storyCollection')
);

  [1, 2].forEach(chapterNumber => {
    document.querySelectorAll(
      `#screen-story-chapter${chapterNumber} .story-timeline-card[data-story-section]`
    ).forEach(card => {
      card.onclick = (e) => {
        e.stopPropagation();
        unlockAudioContextIOS();
        startStorySectionFromCollection(card.dataset.storySection, chapterNumber);
      };
    });
  });

bindClick(
  'btn-open-extra-collection',
  () => openExtraCollection()
);

bindClick(
  'btn-extra-collection-back',
  () => showScreen('collection')
);

bindClick(
  'extra-card-yakisoba',
  () => startExtraEventFromCollection(
    'yakisobaRally'
  )
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
    stopAllTypewriters();
    stopActiveAudio("restartButton", "restart");
    removeReplayAudioButton("restartButton");

    if (gameState.currentChapter === 1 && gameState.isCleared === true) {
      playChapterTransition(2, () => {
        renderDialogueStep(CHAPTER_DATA[2].steps[0]);
      });
      return;
    }

    saveGameData();
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

    // 第一章 Q1 保留原本的鐘聲黑畫面轉場。
    if (gameState.currentChapter === 1 && qNum === 1) {
      isMainStoryTransitioning = true;
    }

    if (elements.feedbackModal) elements.feedbackModal.classList.add('hidden');
    if (elements.quizOverlay) elements.quizOverlay.classList.add('hidden');
    if (elements.choiceOverlay) elements.choiceOverlay.classList.add('hidden');

    if (gameState.currentChapter === 2) {
      setMainBgmDucked(false);
    }

    if (gameState.currentChapter === 1 && qNum === 1) {
      setMainBgmDucked(false);
      stopMorningAmbient(700);
      stopMainBgm(700);
    } else if (qNum === 2 || qNum === 3) {
      setMainBgmDucked(false);
    } else if (qNum === 4) {
      setMainBgmDucked(false);
      if (gameState.currentChapter === 1) {
        stopMainBgm(700);
      }
    }

    stopAllTypewriters();
    stopActiveAudio("closeFeedback", "feedback");
    removeReplayAudioButton("closeFeedback");

    const chapterData = CHAPTER_DATA[gameState.currentChapter];
    let nextStepIdx = -1;

    if (gameState.currentChapter === 1) {
      if (qNum === 1) {
        nextStepIdx = chapterData.steps.findIndex(s => s.id === "ch1_s02_015_sato");
      } else if (qNum === 2) {
        nextStepIdx = chapterData.steps.findIndex(s => s.id === "ch1_s02_028_ren");
      } else if (qNum === 3) {
        nextStepIdx = chapterData.steps.findIndex(s => s.id === "ch1_s03_033_sato");
      } else if (qNum === 4) {
        nextStepIdx = chapterData.steps.findIndex(s => s.id === "ch1_s03_055_ren");
      }
    } else {
      const currentQuizIndex = chapterData.steps.findIndex(
        s => s.type === "quiz" && s.id === gameState.currentQuizId
      );
      nextStepIdx = currentQuizIndex >= 0 ? currentQuizIndex + 1 : -1;
    }

    if (qNum === 5) {
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

    if (gameState.currentChapter === 1 && qNum === 1) {
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

  // Chapter 2 Scene 03 海報 CG：震動結束後，整個遊戲畫面都可以點擊進入 046。
  // 對話框本身已有 onclick；它會 stopPropagation()，所以這裡只補接對話框以外的點擊。
  document.addEventListener('click', (event) => {
    if (!isChapter2PosterAwaitingReveal) return;
    if (isMainStoryTransitioning) return;

    const chapterData = CHAPTER_DATA[gameState.currentChapter];
    const currentStep = chapterData?.steps?.[gameState.currentStepIndex];

    if (!currentStep || currentStep.id !== "ch2_s03_046_misaki") return;

    // HUD／設定等操作元件維持自己的功能，不拿來觸發海報繼續。
    if (event.target.closest('button, input, select, textarea, a')) return;

    handleDialogueBoxClick(event);
  });

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
if (mainBgmAudio) {
  /*
   * 0% 繼續保留 muted。
   * 這是之前已經在 iPhone 實測成功的保險。
   */
  mainBgmAudio.muted =
    gameSettings.bgmVolume <= 0;

  /*
   * Main BGM 真正的 1～100% 音量
   * 改由 Web Audio Master Gain 控制。
   */
  if (
    mainBgmAudioNodes.has(
      mainBgmAudio
    )
  ) {
    mainBgmAudio.volume = 1;
    updateMainBgmGain();
  } else {
    /*
     * Web Audio 沒建立成功時的 fallback。
     */
    mainBgmAudio.volume =
      getMainBgmVolume();
  }

}

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

      extraBgmAudio.muted =
        gameSettings.bgmVolume <= 0;

      if (extraBgmAudioNodes.has(extraBgmAudio)) {
        extraBgmAudio.volume = 1;
        updateExtraBgmGain();
        resumeExtraBgmAudioContext();
      } else {
        extraBgmAudio.volume =
          volume * EXTRA_BGM_VOLUME_FACTOR;
      }
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
 * Morning Ambient
 */
if (morningAmbientAudio) {
  morningAmbientAudio.muted =
    gameSettings.seVolume <= 0;

  if (
    morningAmbientAudioNodes.has(
      morningAmbientAudio
    )
  ) {
    morningAmbientAudio.volume = 1;
    updateMorningAmbientGain();
  } else {
    /* fallback：Web Audio 尚未建立時保留原行為 */
    morningAmbientAudio.volume =
      getMorningAmbientVolume();
  }
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

  audio.muted =
    gameSettings.seVolume <= 0;

  audio.volume = 1;
});

  updateMainSeGain();
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

  audio.muted =
    gameSettings.seVolume <= 0;

  audio.volume =
    volume * MAIN_SE_VOLUME_FACTOR;
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
    updateVoiceGain();

    if (activeAudioInstance) {
      activeAudioInstance.muted =
        gameSettings.voiceVolume <= 0;

      /*
       * 已接上 Web Audio 時 HTMLAudio 維持 100%，
       * 真正音量由 voiceGainNode 控制。
       * 若 Web Audio routing 失敗，才沿用原本 volume fallback。
       */
      if (voiceAudioNodes.has(activeAudioInstance)) {
        activeAudioInstance.volume = 1;
      } else {
        activeAudioInstance.volume =
          Math.max(
            0,
            Math.min(
              1,
              (gameSettings.voiceVolume ?? 0) / 100
            )
          );
      }
    }

    saveGameData();
  };
}
}

let backgroundVoiceReplayPath = "";
let activeVoiceReplayPath = "";

function pauseGameAudioForBackground() {
  /*
   * Main BGM
   * 記錄播放資訊後，完全卸載 HTML Audio。
   */

  backgroundAudioState.mainBgm = null;

  if (mainBgmAudio && mainBgmPath) {
    backgroundAudioState.mainBgm = {
      path: mainBgmPath,
      time: Number.isFinite(mainBgmAudio.currentTime)
        ? mainBgmAudio.currentTime
        : 0,
      wasPlaying: !mainBgmAudio.paused
    };

    const audio = mainBgmAudio;

    mainBgmAudio = null;
    mainBgmPath = "";

    try {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    } catch (e) {}
  }


  /*
   * Morning Ambient
   * 同樣記錄位置後完全卸載。
   */
  backgroundAudioState.morningAmbient = null;

  if (morningAmbientAudio) {
    const ambientPath =
      morningAmbientAudio.dataset?.mainPath || "";

    backgroundAudioState.morningAmbient = {
      path: ambientPath,
      time: Number.isFinite(morningAmbientAudio.currentTime)
        ? morningAmbientAudio.currentTime
        : 0,
      wasPlaying: !morningAmbientAudio.paused
    };

    const audio = morningAmbientAudio;

    morningAmbientAudio = null;

    try {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    } catch (e) {}
  }


  /*
   * Extra Event BGM
   */
  backgroundAudioState.extraBgm = null;

  if (extraBgmAudio) {
    const audio = extraBgmAudio;

    backgroundAudioState.extraBgm = {
      path:
        audio.currentSrc ||
        audio.src ||
        "",
      time: Number.isFinite(audio.currentTime)
        ? audio.currentTime
        : 0,
      wasPlaying: !audio.paused
    };

    extraBgmAudio = null;

    if (extraBgmFadeTimer) {
      clearInterval(extraBgmFadeTimer);
      extraBgmFadeTimer = null;
    }

    try {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    } catch (e) {}
  }


    /*
   * Voice
   *
   * 如果切到背景時 Voice 正在播放，
   * 記住目前這一句的路徑。
   * 回到頁面並點擊繼續後，從頭重播一次。
   */
  backgroundVoiceReplayPath =
    activeVoiceReplayPath || "";

  try {
    stopActiveAudio(
      "pageBackground",
      "pageBackground"
    );
  } catch (e) {}


  /*
   * Extra Event 雙人 Voice
   */
  try {
    stopParallelVoices();
  } catch (e) {}


  /*
   * Main Story SE
   * 一次性音效不需要恢復。
   */
  if (Array.isArray(mainSePool)) {
    mainSePool.forEach((audio) => {
      if (!audio) return;

      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {}
    });
  }


  /*
   * Extra Event SE
   */
  if (extraSePool) {
    extraSePool.forEach((audio) => {
      if (!audio) return;

      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {}
    });
  }
}

async function resumeGameAudioFromBackground() {
    /*
   * iOS Safari：
   * foreground 的第一次 user gesture
   * 只重建 Main BGM Web Audio Context。
   *
   * SE / Voice / Ambient / Extra Event
   * 全部保持原本架構。
   */
  resetMainBgmContextForForeground();

  /*
   * Voice
   * 必須在 PAUSED 的「點擊繼續」這次 user gesture 中立刻重播，
   * 不等待 BGM restore，避免 iOS 失去播放授權。
   */
  const voiceToReplay = backgroundVoiceReplayPath;
  backgroundVoiceReplayPath = "";

  if (voiceToReplay) {
    try {
      playVoiceAudio(
        voiceToReplay,
        "backgroundVoiceReplay"
      );
    } catch (err) {
      console.warn(
        "[BACKGROUND] Voice replay failed:",
        err
      );
    }
  }

  /*
   * Main BGM
   */

  /*
   * Main BGM
   */
  const savedBgm =
    backgroundAudioState.mainBgm;


  backgroundAudioState.mainBgm = null;

  if (
    savedBgm &&
    savedBgm.wasPlaying &&
    savedBgm.path
  ) {
    try {
      const audio = new Audio();

audio.preload = "auto";
audio.loop = true;
audio.src = savedBgm.path;

audio.muted =
  gameSettings.bgmVolume <= 0;

/*
 * 把 foreground 新建立的 HTMLAudio
 * 接到全新的 Main BGM Web Audio graph。
 */
const bgmNodes =
  ensureMainBgmWebAudio(audio);


if (bgmNodes) {
  /*
   * HTMLAudio 固定 100%。
   * 真正 Slider 音量由 mainBgmGainNode 控制。
   *
   * foreground restore 不重新淡入，
   * 因此 fadeGain 直接恢復目前 duck 狀態。
   */
  audio.volume = 1;

  bgmNodes.fadeGain.gain.value =
    mainBgmDuckFactor;

  updateMainBgmGain();

  /*
   * 必須在 foreground user gesture
   * 觸發的恢復流程中喚醒新的 Context。
   */
  } else {
  /*
   * Web Audio 建立失敗時，
   * 保留 HTMLAudio fallback。
   */
  audio.volume =
    getMainBgmVolume();

}

mainBgmAudio = audio;
mainBgmPath = savedBgm.path;

      const restoreTime = () => {
        try {
          if (
            Number.isFinite(savedBgm.time) &&
            savedBgm.time >= 0
          ) {
            audio.currentTime =
              savedBgm.time;
          }
        } catch (e) {}
      };

      if (audio.readyState >= 1) {
        restoreTime();
      } else {
        audio.addEventListener(
          "loadedmetadata",
          restoreTime,
          { once: true }
        );
      }


/*
 * iOS foreground restore：
 * 先啟動 HTMLAudio，
 * 再於同一次 user gesture 中立刻 resume Web Audio。
 */
const bgmPlayPromise = audio.play();


if (
  mainBgmAudioContext &&
  mainBgmAudioContext.state === "suspended"
) {
  try {
    /*
     * 保持原本 restore 行為：
     * resume() 不 await，避免 iOS Safari Promise 卡住。
     */
    mainBgmAudioContext.resume().catch(() => {});
  } catch (e) {}
}
await bgmPlayPromise;


    } catch (err) {
      console.warn(
        "[BACKGROUND] Main BGM resume failed:",
        err
      );
    }
  }


  /*
   * Morning Ambient
   */
  const savedAmbient =
    backgroundAudioState.morningAmbient;

  backgroundAudioState.morningAmbient = null;

  if (
    savedAmbient &&
    savedAmbient.wasPlaying &&
    savedAmbient.path
  ) {
    try {
      const audio = new Audio();

      audio.preload = "auto";
      audio.loop = true;
      audio.volume =
        getMorningAmbientVolume();

      audio.src = savedAmbient.path;

      audio.dataset.mainPath =
        savedAmbient.path;

      morningAmbientAudio = audio;

      const restoreTime = () => {
        try {
          if (
            Number.isFinite(savedAmbient.time) &&
            savedAmbient.time >= 0
          ) {
            audio.currentTime =
              savedAmbient.time;
          }
        } catch (e) {}
      };

      if (audio.readyState >= 1) {
        restoreTime();
      } else {
        audio.addEventListener(
          "loadedmetadata",
          restoreTime,
          { once: true }
        );
      }

      await audio.play();

    } catch (err) {
      console.warn(
        "[BACKGROUND] Ambient resume failed:",
        err
      );
    }
  }


  /*
   * Extra Event BGM
   */
  const savedExtraBgm =
    backgroundAudioState.extraBgm;

  backgroundAudioState.extraBgm = null;

  if (
    savedExtraBgm &&
    savedExtraBgm.wasPlaying &&
    savedExtraBgm.path
  ) {
    try {
      const audio =
        new Audio(savedExtraBgm.path);

      audio.preload = "auto";
      audio.loop = true;

      extraBgmAudio = audio;

      const restoreTime = () => {
        try {
          if (
            Number.isFinite(savedExtraBgm.time) &&
            savedExtraBgm.time >= 0
          ) {
            audio.currentTime =
              savedExtraBgm.time;
          }
        } catch (e) {}
      };

      if (audio.readyState >= 1) {
        restoreTime();
      } else {
        audio.addEventListener(
          "loadedmetadata",
          restoreTime,
          { once: true }
        );
      }

      audio.muted =
        gameSettings.bgmVolume <= 0;

      const extraNodes =
        ensureExtraBgmWebAudio(audio);

      if (extraNodes) {
        audio.volume = 1;
        extraNodes.fadeGain.gain.value = 1;
        updateExtraBgmGain();
        resumeExtraBgmAudioContext();
      } else {
        audio.volume =
          Math.max(
            0,
            Math.min(
              1,
              ((gameSettings.bgmVolume ?? 50) / 100) *
              EXTRA_BGM_VOLUME_FACTOR
            )
          );
      }

      await audio.play();

    } catch (err) {
      console.warn(
        "[BACKGROUND] Extra BGM resume failed:",
        err
      );
    }
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

/* =========================================================
 * Background Pause Overlay
 *
 * 回到前景後不自動恢復音訊。
 * 顯示 PAUSED 畫面，等待玩家明確點擊「點擊繼續」。
 * 這個 click 本身就是 iOS Safari 所需的 user gesture。
 * ========================================================= */

let backgroundPauseOverlay = null;
let backgroundPauseShowTimer = null;
let backgroundPauseWasHidden = false;

function ensureBackgroundPauseOverlay() {
  if (backgroundPauseOverlay) {
    return backgroundPauseOverlay;
  }

  const overlay = document.createElement("div");
  overlay.id = "background-pause-overlay";

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "999998",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(12, 14, 18, 0.58)",
    opacity: "0",
    visibility: "hidden",
    transition: "opacity 300ms ease, visibility 300ms ease",
    pointerEvents: "none",
    boxSizing: "border-box",
    padding: "24px"
  });

  const content = document.createElement("div");
  Object.assign(content.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
    textAlign: "center",
    color: "#ffffff",
    transform: "translateY(8px)",
    transition: "transform 300ms ease"
  });

  const continueButton = document.createElement("button");
  continueButton.type = "button";
  continueButton.setAttribute("aria-label", "點擊繼續");

  const pauseMain = document.createElement("span");
  pauseMain.className = "start-gate-main";
  pauseMain.textContent = "PAUSED";

  const pauseSub = document.createElement("span");
  pauseSub.className = "start-gate-sub";
  pauseSub.textContent = "點擊繼續";

  continueButton.appendChild(pauseMain);
  continueButton.appendChild(pauseSub);

  /*
   * 與開頭 TAP TO START 使用同一套視覺語言：
   * 無框、透明、雙層文字、呼吸動畫。
   * 深色 PAUSED 遮罩上改用白字，確保可讀性。
   */
  Object.assign(continueButton.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "9px",
    margin: "0",
    padding: "28px 40px",
    border: "0",
    outline: "0",
    background: "transparent",
    color: "#ffffff",
    fontFamily: "inherit",
    textAlign: "center",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    animation: "startGateBreath 2.4s ease-in-out infinite",
    transition: "opacity 0.4s ease, transform 0.4s ease"
  });

  continueButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (!backgroundAudioRestorePending) {
      hideBackgroundPauseOverlay();
      return;
    }

    if (backgroundAudioRestoreRunning || document.hidden) {
      return;
    }

    backgroundAudioRestorePending = false;
    backgroundAudioRestoreRunning = true;
    continueButton.disabled = true;

    /*
     * 不 await：讓 audio.play() / AudioContext.resume()
     * 直接發生在這次 click 的 user gesture call stack 中。
     * Overlay 同時淡出，不讓玩家被音訊 Promise 卡住。
     */
    resumeGameAudioFromBackground()
      .catch((err) => {
        console.warn(
          "[BACKGROUND] continue restore failed:",
          err
        );
      })
      .finally(() => {
        backgroundAudioRestoreRunning = false;
        continueButton.disabled = false;
      });

    hideBackgroundPauseOverlay();
  });

  content.appendChild(continueButton);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  overlay._pauseContent = content;
  overlay._continueButton = continueButton;
  backgroundPauseOverlay = overlay;

  return overlay;
}

function showBackgroundPauseOverlay() {
  const overlay = ensureBackgroundPauseOverlay();

  if (overlay._continueButton) {
    overlay._continueButton.disabled = false;
  }

  overlay.style.visibility = "visible";
  overlay.style.pointerEvents = "auto";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      if (overlay._pauseContent) {
        overlay._pauseContent.style.transform = "translateY(0)";
      }
    });
  });
}

function hideBackgroundPauseOverlay() {
  if (!backgroundPauseOverlay) return;

  const overlay = backgroundPauseOverlay;
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";

  if (overlay._pauseContent) {
    overlay._pauseContent.style.transform = "translateY(8px)";
  }

  setTimeout(() => {
    if (overlay.style.opacity === "0") {
      overlay.style.visibility = "hidden";
    }
  }, 300);
}

document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      if (backgroundPauseShowTimer) {
        clearTimeout(backgroundPauseShowTimer);
        backgroundPauseShowTimer = null;
      }

      backgroundPauseWasHidden = true;
      backgroundAudioRestorePending = false;
      hideBackgroundPauseOverlay();
      pauseGameAudioForBackground();
    } else if (backgroundPauseWasHidden) {
      backgroundPauseWasHidden = false;

      /*
       * 還停在最初 TAP TO START、尚未點擊開始時，
       * 不顯示 PAUSED，避免兩個開始畫面疊在一起。
       */
      const startGate =
        document.getElementById("start-gate");

      const isUntouchedStartGate =
        startGate &&
        !startGate.classList.contains("is-loading") &&
        !startGate.classList.contains("is-ready") &&
        !startGate.classList.contains("is-closing");

      if (isUntouchedStartGate) {
        backgroundAudioRestorePending = false;
        hideBackgroundPauseOverlay();
        return;
      }

      backgroundAudioRestorePending = true;

      /* 約 300ms 的視覺緩衝，只延遲 Overlay 顯示。 */
      backgroundPauseShowTimer = setTimeout(() => {
        backgroundPauseShowTimer = null;

        if (
          !document.hidden &&
          backgroundAudioRestorePending
        ) {
          showBackgroundPauseOverlay();
        }
      }, 300);
    }
  }
);

document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  loadStoryArchiveData();
  migrateStoryArchiveFromMainSave();
  renderStoryChapter1Collection();

  loadExtraGalleryData();
  loadGameData();
  updateTitleScreenButtons();
  initStartGate();
  showScreen('title');
});



/* ==========================================================================
   TEMP DEBUG QUICK JUMP - mobile performance diagnosis only
   ========================================================================== */
function getDebugSectionStartIndex(chapterNumber, sectionNumber) {
  const chapterData = CHAPTER_DATA[chapterNumber];
  if (!chapterData || !Array.isArray(chapterData.steps)) return -1;

  return chapterData.steps.findIndex(step =>
    step &&
    step.type === "dialogue" &&
    Number(step.listeningSection) === Number(sectionNumber)
  );
}

function updateDebugStatusPanel() {
  const box = document.getElementById("debug-status");
  if (!box) return;

  let mobileAudioPreloadOff = false;
  try {
    mobileAudioPreloadOff = shouldSkipBackgroundAudioPreload();
  } catch (e) {}

  const voiceState =
    voiceAudioContext ? voiceAudioContext.state : "none";
  const mainState =
    mainBgmAudioContext ? mainBgmAudioContext.state : "none";

  box.innerHTML =
    `Mobile audio preload: <strong>${mobileAudioPreloadOff ? "OFF" : "ON"}</strong><br>` +
    `Voice AudioContext: <strong>${voiceState}</strong><br>` +
    `Main AudioContext: <strong>${mainState}</strong><br>` +
    `Staged sections: <strong>${stagedPreloadState.sections.size}</strong>`;
}

function debugJumpToStorySection(chapterNumber, sectionNumber) {
  const chapter = Number(chapterNumber);
  const section = Number(sectionNumber);
  const startIndex = getDebugSectionStartIndex(chapter, section);

  if (startIndex < 0) {
    console.warn("[DEBUG JUMP] section not found", chapter, section);
    return;
  }

  window.__KIKU_DEBUG_SESSION__ = true;

  stopAllTypewriters();
  stopActiveAudio("debugJumpToStorySection", `${chapter}:${section}`);
  stopParallelVoices();
  stopMorningAmbient();
  stopExtraBgm(0);
  stopMainBgm(0);
  removeReplayAudioButton("debugJumpToStorySection");

  gameState.hasValidSave = true;
  gameState.currentChapter = chapter;
  gameState.currentStepIndex = startIndex;
  gameState.totalQuizzes = CHAPTER_DATA[chapter]?.totalQuizzes || 5;
  gameState.isCleared = false;
  gameState.currentQuizId = null;
  gameState.currentListeningSection = section;
  gameState.listeningState = "BLIND_LISTENING";

  const panel = document.getElementById("debug-jump-panel");
  if (panel) panel.classList.add("hidden");

  showScreen("gameplay");
  updateHUD();
  renderDialogueStep(CHAPTER_DATA[chapter].steps[startIndex]);

  console.info("[DEBUG JUMP]", { chapter, section, startIndex });
}

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("btn-debug-jump");
  const panel = document.getElementById("debug-jump-panel");
  const closeBtn = document.getElementById("btn-debug-close");

  if (openBtn && panel) {
    openBtn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      unlockAudioContextIOS();
      updateDebugStatusPanel();
      panel.classList.remove("hidden");
    });
  }

  if (closeBtn && panel) {
    closeBtn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      panel.classList.add("hidden");
    });
  }

  document.querySelectorAll("[data-debug-chapter][data-debug-section]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      unlockAudioContextIOS();
      debugJumpToStorySection(
        button.dataset.debugChapter,
        button.dataset.debugSection
      );
    });
  });
});
