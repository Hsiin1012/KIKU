/* ==========================================================================
   [BUILD] current P0 UI recovery build loaded (Approved Fix: Q5 Quiz Overlay Cleanup at Chapter End)
   ========================================================================== */
console.log("[BUILD] current P0 UI recovery build loaded (Approved Fix: Q5 Quiz Overlay Cleanup at Chapter End)");

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
  "2年B班 教室 (早晨)": "assets/backgrounds/bg_classroom_moring.png",
  "2年B班 教室 (課堂)": "assets/backgrounds/bg_classroom_day.png",
  "2年B班 教室 (放學後)": "assets/backgrounds/bg_classroom_evening.png",
  "校園走廊 (文化祭準備中)": "assets/backgrounds/bg_corridor_day.png",
  "校園走廊 (熱鬧混亂)": "assets/backgrounds/bg_corridor_evening.png",
  "放學後的屋頂 (夕陽風吹)": "assets/backgrounds/bg_rooftop.png",
  "校園中庭 (交流會後夕陽微風)": "assets/backgrounds/bg_eventspace_evening.png",
  "龍神高中 (校園全景黃昏)": "assets/backgrounds/bg_office.png"
};

/* 角色立繪對應表 */
const CHARACTER_SPRITE_MAP = {
  "ren": {
    "怒吼衝動": "assets/characters/ren/ren_angry.PNG",
    "困惑反差": "assets/characters/ren/ren_surprised.PNG",
    "衝動慌張": "assets/characters/ren/ren_embarrased.PNG",
    "熱血提議": "assets/characters/ren/ren_smile.PNG",
    "標準": "assets/characters/ren/ren_normal.PNG"
  },
  "toru": {
    "冷漠推眼鏡": "assets/characters/toru/toru_smile.PNG",
    "溫和微笑": "assets/characters/toru/toru_smile.PNG",
    "標準": "assets/characters/toru/toru_normal.PNG"
  },
  "sato": {
    "溫和微笑": "assets/characters/sato/sato_smile.PNG",
    "黑臉微笑": "assets/characters/sato/sato_scarysmile.PNG",
    "標準": "assets/characters/sato/sato_normal.PNG"
  },
  "misaki": {
    "活潑得意": "assets/characters/misaki/misaki_excited.PNG",
    "標準": "assets/characters/misaki/misaki_normal.PNG"
  },
  "player": {
    "溫和微笑": "",
    "困惑觀察": "",
    "標準": ""
  }
};

/* ==========================================================================
   2. 跨章節流程資料結構
   ========================================================================== */
const CHAPTER_DATA = {
  1: {
    title: "第一章：誰把我們的班級交給這兩個人了？",
    totalQuizzes: 5,
    steps: [
      { id: "ch1_s01_001_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "怒吼衝動", position: "left", jp: "おい、俺のプリン知らねえ？", zh: "喂，你有沒有看到我的布丁？", audio: "/assets/voice/chapter1/ch1_s01_001_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_002_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "知らない。", zh: "不知道。", audio: "/assets/voice/chapter1/ch1_s01_002_toru.m4a", listeningSection: 1 },
      { id: "ch1_s01_003_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "困惑反差", position: "left", jp: "ほんとか？", zh: "真的嗎？", audio: "/assets/voice/chapter1/ch1_s01_003_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_004_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "お前のプリンがどこにあるかなんて、俺が知るわけないだろ。", zh: "你的布丁在哪裡我怎麼可能知道？", audio: "/assets/voice/chapter1/ch1_s01_004_toru.m4a", listeningSection: 1 },
      { id: "ch1_s01_005_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "怒吼衝動", position: "left", jp: "……じゃあ、なんで口の周りにカラメルついてんだよ。", zh: "……那為什麼你嘴邊沾了焦糖？", audio: "/assets/voice/chapter1/ch1_s01_005_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_006_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "これは昨日のだ。", zh: "這是昨天的。", audio: "/assets/voice/chapter1/ch1_s01_006_toru.m4a", listeningSection: 1 },
      { id: "ch1_s01_007_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "困惑反差", position: "left", jp: "昨日からついてんのかよ！", zh: "從昨天就一直沾在上面喔！", audio: "/assets/voice/chapter1/ch1_s01_007_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_008_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "そこに驚くのか。", zh: "你竟然對這個感到驚訝啊。", audio: "/assets/voice/chapter1/ch1_s01_008_toru.m4a", listeningSection: 1 },
      { id: "ch1_s01_009_player", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "player", expression: "溫和微笑", position: "center", jp: "……ふふっ。", zh: "……呵呵。", audio: null, listeningSection: 1 },
      { id: "ch1_s01_009_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "困惑反差", position: "left", jp: "……誰だ、お前。", zh: "……你誰啊。", audio: "/assets/voice/chapter1/ch1_s01_009_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_010_player", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "player", expression: "溫和微笑", position: "center", jp: "えっと……今日からこのクラスに転校してきたんだけど……。", zh: "那個……我從今天起轉到這個班級……。", audio: null, listeningSection: 1 },
      { id: "ch1_s01_011_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "溫和微笑", position: "right", jp: "ああ、転校生か。悪いな、初日からこんなとこ見せて。", zh: "啊，轉學生啊。抱歉啊，第一天就讓你看到這種場面。", audio: "/assets/voice/chapter1/ch1_s01_011_toru.m4a", listeningSection: 1 },
      { id: "ch1_s01_012_player", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "player", expression: "困惑觀察", position: "center", jp: "……。", zh: "……。", audio: null, listeningSection: 1 },
      { id: "ch1_s01_013_ren", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "ren", expression: "怒吼衝動", position: "left", jp: "なんでお前が謝るんだよ。あと、プリン返せ。", zh: "為什麼你要幫忙道歉啊。還有，把布丁還來。", audio: "/assets/voice/chapter1/ch1_s01_013_ren.m4a", listeningSection: 1 },
      { id: "ch1_s01_014_toru", type: "dialogue", bg: "2年B班 教室 (早晨)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "だから、俺じゃないって。", zh: "所以就說不是我啦。", audio: "/assets/voice/chapter1/ch1_s01_014_toru.m4a", listeningSection: 1 },
      { type: "quiz", id: "ch1_q1", listeningSection: 1, nextStepIndex: 15 },

      { id: "ch1_s02_015_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "溫和微笑", position: "center", jp: "来月の文化祭ですが、このクラスでも一つ、クラス企画を決めてもらいます。", zh: "關於下個月的文化祭，希望你們班也決定一項班級企劃。", audio: "/assets/voice/chapter1/ch1_s02_015_sato.m4a", listeningSection: 2 },
      { id: "ch1_s02_016_misaki", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "misaki", expression: "活潑得意", position: "center", jp: "先生、何でもいいんですか？", zh: "老師，什麼都可以嗎？", audio: "/assets/voice/chapter1/ch1_s02_016_misaki.m4a", listeningSection: 2 },
      { id: "ch1_s02_017_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "溫和微笑", position: "center", jp: "予算と安全面に問題がなければ、基本的には自由です。ただし、飲食物を扱う企画は事前に許可が必要です。", zh: "只要在預算和安全面上沒問題，基本上是自由的。不過，涉及飲食的企劃需要事前許可。", audio: "/assets/voice/chapter1/ch1_s02_017_sato.m4a", listeningSection: 2 },
      { id: "ch1_s02_018_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "衝動慌張", position: "left", jp: "じゃ、やらなくてよくね？", zh: "那不辦不就好了？", audio: "/assets/voice/chapter1/ch1_s02_018_ren.m4a", listeningSection: 2 },
      { id: "ch1_s02_019_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "黑臉微笑", position: "center", jp: "鬼塚くん。今、何とおっしゃいましたか？", zh: "鬼塚同學。你剛剛說了什麼？", audio: "/assets/voice/chapter1/ch1_s02_019_sato.m4a", listeningSection: 2 },
      { id: "ch1_s02_020_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "衝動慌張", position: "left", jp: "……楽しみです、って。", zh: "……我是說我很期待。", audio: "/assets/voice/chapter1/ch1_s02_020_ren.m4a", listeningSection: 2 },
      { id: "ch1_s02_021_toru", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "無理があるだろ。", zh: "這太勉強了吧。", audio: "/assets/voice/chapter1/ch1_s02_021_toru.m4a", listeningSection: 2 },
      { id: "ch1_s02_022_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "溫和微笑", position: "center", jp: "では、企画の内容については今日中にある程度まとめておいてください。", zh: "那麼，關於企劃內容請在今天之內大致整理好。", audio: "/assets/voice/chapter1/ch1_s02_022_sato.m4a", listeningSection: 2 },
      { id: "ch1_s02_023_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "衝動慌張", position: "left", jp: "今日中？", zh: "今天之內？", audio: "/assets/voice/chapter1/ch1_s02_023_ren.m4a", listeningSection: 2 },
      { id: "ch1_s02_024_toru", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "……嫌な予感がする。", zh: "……有種不好的預感。", audio: "/assets/voice/chapter1/ch1_s02_024_toru.m4a", listeningSection: 2 },
      { id: "ch1_s02_025_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "黑臉微笑", position: "center", jp: "はい。それから――鬼塚くんと白石くん。", zh: "是的。還有——鬼塚同學和白石同學。", audio: "/assets/voice/chapter1/ch1_s02_025_sato.m4a", listeningSection: 2 },
      { id: "ch1_s02_026_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "衝動慌張", position: "left", jp: "え、俺ら？", zh: "咦，我們？", audio: "/assets/voice/chapter1/ch1_s02_026_ren.m4a", listeningSection: 2 },
      { id: "ch1_s02_027_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "溫和微笑", position: "center", jp: "今日の放課後、二人で企画書を職員室まで持ってきてください。", zh: "今天放學後，請兩人把企劃書帶到教職員室。", audio: "/assets/voice/chapter1/ch1_s02_027_sato.m4a", listeningSection: 2 },
      { type: "quiz", id: "ch1_q2", listeningSection: 2, nextStepIndex: 28 },

      { id: "ch1_s02_028_ren", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "ren", expression: "怒吼衝動", position: "left", jp: "いや、それとこれとは――", zh: "不是啊，這跟那兩碼事——", audio: "/assets/voice/chapter1/ch1_s02_028_ren.m4a", listeningSection: 3 },
      { id: "ch1_s02_029_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "黑臉微笑", position: "center", jp: "はい。先ほど『やらなくていい』とおっしゃるくらいですから、ずいぶん余裕があるのかと思いまして。", zh: "是的。既然你剛才說『不辦也罷』，我想你應該相當游刃有餘才對。", audio: "/assets/voice/chapter1/ch1_s02_029_sato.m4a", listeningSection: 3 },
      { id: "ch1_s02_030_toru", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "先生、笑顔で仕返しするのやめてもらえますか。", zh: "老師，可以請你別用笑容報復嗎。", audio: "/assets/voice/chapter1/ch1_s02_030_toru.m4a", listeningSection: 3 },
      { id: "ch1_s02_031_sato", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "sato", expression: "溫和微笑", position: "center", jp: "仕返しではありません。適材適所です。", zh: "這不是報復。這是適才所用。", audio: "/assets/voice/chapter1/ch1_s02_031_sato.m4a", listeningSection: 3 },
      { id: "ch1_s02_032_toru", type: "dialogue", bg: "2年B班 教室 (課堂)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "絶対違うだろ。", zh: "絕對才怪。", audio: "/assets/voice/chapter1/ch1_s02_032_toru.m4a", listeningSection: 3 },
      { type: "quiz", id: "ch1_q3", listeningSection: 3, nextStepIndex: 34 },

      { id: "ch1_s03_033_sato", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "sato", expression: "溫和微笑", position: "center", jp: "転校生さんも、よかったら一緒に考えてみませんか？", zh: "轉學生同學，如果不介意的話要不要也一起想想看？", audio: "/assets/voice/chapter1/ch1_s03_033_sato.m4a", listeningSection: 4 },
      { id: "ch1_s03_034_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "怒吼衝動", position: "left", jp: "いや、こいつ今日来たばっかだろ。", zh: "不對啊，這傢伙今天才剛來耶。", audio: "/assets/voice/chapter1/ch1_s03_034_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_035_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "お前だって、今日まで何も考えてなかっただろ。", zh: "你還不是一樣，直到今天什麼都沒想。", audio: "/assets/voice/chapter1/ch1_s03_035_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_036_sato", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "sato", expression: "溫和微笑", position: "center", jp: "では、三人でお願いしますね。", zh: "那麼，就拜託你們三個人了。", audio: "/assets/voice/chapter1/ch1_s03_036_sato.m4a", listeningSection: 4 },
      { id: "ch1_s03_037_player", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "困惑觀察", position: "center", jp: "っ、三人？", zh: "咦，三個人？", audio: null, listeningSection: 4 },
      { id: "ch1_s03_038_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "ご愁傷様。", zh: "真是辛苦啦。", audio: "/assets/voice/chapter1/ch1_s03_038_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_039_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "怒吼衝動", position: "left", jp: "うるせえな！", zh: "吵死了！", audio: "/assets/voice/chapter1/ch1_s03_039_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_040_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "怒吼衝動", position: "left", jp: "お前、他人事だと思ってんだろ！", zh: "你這傢伙，覺得跟自己無關對吧！", audio: "/assets/voice/chapter1/ch1_s03_040_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_041_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "他人事じゃないから、今ここにいるんだよ。", zh: "就是因為跟自己有關，我現在才站在這裡啊。", audio: "/assets/voice/chapter1/ch1_s03_041_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_042_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "熱血提議", position: "left", jp: "とりあえず、食べ物でよくね？ 焼きそばとか。", zh: "總之，弄吃的不是很好嗎？像是炒麵之類的。", audio: "/assets/voice/chapter1/ch1_s03_042_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_043_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "さっき先生の話聞いてなかったのか？", zh: "你剛才沒聽老師說話嗎？", audio: "/assets/voice/chapter1/ch1_s03_043_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_044_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "困惑反差", position: "left", jp: "聞いてたよ。", zh: "我有聽啊。", audio: "/assets/voice/chapter1/ch1_s03_044_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_045_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "じゃあ、調理の許可は？ 設備は？ 予算は？", zh: "那烹飪許可呢？設備呢？預算呢？", audio: "/assets/voice/chapter1/ch1_s03_045_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_046_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "困惑反差", position: "left", jp: "……これから考える。", zh: "……現在開始想。", audio: "/assets/voice/chapter1/ch1_s03_046_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_047_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "つまり何も考えてないんだな。", zh: "也就是說你根本什麼都沒想嘛。", audio: "/assets/voice/chapter1/ch1_s03_047_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_048_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "怒吼衝動", position: "left", jp: "……お前、楽しいこと考える才能ないな。", zh: "……你這傢伙，真沒想快樂事情的才能。", audio: "/assets/voice/chapter1/ch1_s03_048_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_049_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "お前には現実を見る才能がないけどな。", zh: "不過你倒是沒有面對現實的才能就是了。", audio: "/assets/voice/chapter1/ch1_s03_049_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_050_player", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "じゃあ……校内を回りながら、いくつかのミッションに挑戦するのはどう？", zh: "那……邊參觀校園邊挑戰幾個任務怎麼樣？", audio: null, listeningSection: 4 },
      { id: "ch1_s03_051_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "困惑反差", position: "left", jp: "ミッション？", zh: "任務？", audio: "/assets/voice/chapter1/ch1_s03_051_ren.m4a", listeningSection: 4 },
      { id: "ch1_s03_052_player", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "うん。校内の何か所かに問題とかミッションを用意して、順番に回ってもらうとか。", zh: "對啊。在校內好幾個地方準備題目或任務，讓大家依序去闖關之類的。", audio: null, listeningSection: 4 },
      { id: "ch1_s03_053_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "スタンプラリーみたいな感じか。", zh: "像是集章闖關的感覺嗎。", audio: "/assets/voice/chapter1/ch1_s03_053_toru.m4a", listeningSection: 4 },
      { id: "ch1_s03_054_player", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "player", expression: "溫和微笑", position: "center", jp: "そうそう。食べ物みたいに調理もいらないし。", zh: "對對。又不像食物那樣需要烹調。", audio: null, listeningSection: 4 },
      { type: "quiz", id: "ch1_q4", listeningSection: 4, nextStepIndex: 57 },

      { id: "ch1_s03_055_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "熱血提議", position: "left", jp: "……それ、ちょっと面白そうじゃね？", zh: "……這個，聽起來好像挺有趣的不是嗎？", audio: "/assets/voice/chapter1/ch1_s03_055_ren.m4a", listeningSection: 5 },
      { id: "ch1_s03_056_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "珍しくまともな案が出たな。", zh: "難得提出了一個正常的方案呢。", audio: "/assets/voice/chapter1/ch1_s03_056_toru.m4a", listeningSection: 5 },
      { id: "ch1_s03_057_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "怒吼衝動", position: "left", jp: "俺じゃねえ！ 転校生の案だろ！", zh: "才不是我！這是轉學生的點子吧！", audio: "/assets/voice/chapter1/ch1_s03_057_ren.m4a", listeningSection: 5 },
      { id: "ch1_s03_058_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "お前が最初に『面白そう』って言ったんだろ。", zh: "是你最先說「好像很有趣」的吧。", audio: "/assets/voice/chapter1/ch1_s03_058_toru.m4a", listeningSection: 5 },
      { id: "ch1_s03_059_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "怒吼衝動", position: "left", jp: "それと俺が考えたかどうかは別だろ！", zh: "這跟是不是我想出來的根本是兩回事！", audio: "/assets/voice/chapter1/ch1_s03_059_ren.m4a", listeningSection: 5 },
      { id: "ch1_s03_060_toru", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "toru", expression: "冷漠推眼鏡", position: "right", jp: "分かってるよ。", zh: "我知道啦。", audio: "/assets/voice/chapter1/ch1_s03_060_toru.m4a", listeningSection: 5 },
      { id: "ch1_s03_061_ren", type: "dialogue", bg: "2年B班 教室 (放學後)", speaker: "ren", expression: "怒吼衝動", position: "left", jp: "じゃあなんで言ったんだよ！", zh: "那你幹嘛這樣講啦！", audio: "/assets/voice/chapter1/ch1_s03_061_ren.m4a", listeningSection: 5 },
      { type: "quiz", id: "ch1_q5", listeningSection: 5, nextStepIndex: -1 }
    ]
  }
};

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
      { text: "A. 今日の放課後、蓮と透は企画書を職員室まで持っていく。", isCorrect: true },
      { text: "B. 明日の放課後、クラス全員で企画書を作る。", isCorrect: false },
      { text: "C. 今日中に文化祭の準備をすべて終わらせる。", isCorrect: false },
      { text: "D. 今日の昼休みに、蓮が一人で企画書を提出する。", isCorrect: false }
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
        jpOriginal: "校内の何か所かに問題とかミッションを用意して、順番に回ってもらうとか。", zhTrans: "在校內好幾個地方準備題目或任務，讓大家依序去闖關之類的。",
        words: "ミッション(任務)、回る(繞行/參觀)", explanation: "正確答案為 B。"
      },
      wrong: {
        title: "不正解！ (正確答案為 B)", story: "轉學生的提案是校園闖關任務。",
        jpOriginal: "校内の何か所かに問題とかミッションを用意して、順番に回ってもらうとか。", zhTrans: "在校內好幾個地方準備題目或任務，讓大家依序去闖關之類的。",
        words: "ミッション(任務)、回る(繞行/參觀)", explanation: "正確答案為 B。"
      }
    }
  },
  "ch1_q5": {
    quizNumber: 5, type: "聽力理解任務",
    section: 5,
    question: "この会話で、透はなぜ「珍しくまともな案が出たな」と言いましたか。",
    trustTarget: "toru",
    options: [
      { text: "A. 蓮が初めて一人で良い企画を考えたと思ったから。", isCorrect: false },
      { text: "B. 転校生の提案が良いと思い、蓮を少しからかおうとしたから。", isCorrect: true },
      { text: "C. 蓮の焼きそばの案が一番現実的だと思ったから。", isCorrect: false },
      { text: "D. 転校生の提案を蓮のアイデアだと本当に勘違いしたから。", isCorrect: false }
    ],
    feedback: {
      correct: {
        title: "正解！ (B)", story: "完全理解了透的腹黑吐槽與調侃心態！",
        jpOriginal: "珍しくまともな案が出たな。", zhTrans: "難得提出了一個正常的方案呢。",
        words: "珍しい(罕見/難得)、from:からかう(調侃/開玩笑)", explanation: "透明明知道是轉學生的好主意，卻故意說是蓮想的來捉弄蓮。"
      },
      wrong: {
        title: "不正解！ (正確答案為 B)", story: "透是在藉機調侃蓮。",
        jpOriginal: "珍しくまともな案が出たな。", zhTrans: "難得提出了一個正常的方案呢。",
        words: "珍しい(罕見/難得)、from:からかう(調侃/開玩笑)", explanation: "正確答案為 B。"
      }
    }
  }
};

/* ==========================================================================
   4. 遊戲狀態與 CONFIG 全局設定資料庫
   ========================================================================== */
const gameState = {
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
  
  if (gameSettings.textSpeed === "instant") {
    element.innerHTML = formattedText;
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
    wrongQuestions: gameState.wrongQuestions,
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
    gameState.currentStepIndex = data.currentStepIndex || 0;
    gameState.score = data.score || 0;
    gameState.trustPoints = data.trustPoints || { ren: 0, toru: 0, sato: 0 };
    gameState.isCleared = data.isCleared || false;
    gameState.playerName = (data.playerName !== undefined && data.playerName !== "") ? data.playerName : "転校生";
    gameState.playerHonorific = data.playerHonorific || "ちゃん";
    gameState.listeningState = data.listeningState || "BLIND_LISTENING";
    gameState.currentListeningSection = data.currentListeningSection || 1;
    gameState.completedSections = data.completedSections || [];
    gameState.wrongQuestions = data.wrongQuestions || [];

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

function showScreen(screenKey) {
  Object.keys(screens).forEach(k => {
    if (screens[k]) screens[k].classList.remove('active');
  });
  if (screens[screenKey]) screens[screenKey].classList.add('active');

  if (screenKey === 'gameplay') {
    if (elements.vnHud) elements.vnHud.classList.remove('hidden');
    const chapterData = CHAPTER_DATA[gameState.currentChapter];
    if (chapterData && elements.hudChapterTitle) elements.hudChapterTitle.innerText = chapterData.title;
  } else {
    if (elements.vnHud) elements.vnHud.classList.add('hidden');
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

  if (elements.bgNameTag) elements.bgNameTag.innerText = `【背景：${stepData.bg}】`;
  
  const bgUrl = BACKGROUND_MAP[stepData.bg] || "assets/backgrounds/bg_classroom_day.png";
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
  if (elements.quizTypeBadge) elements.quizTypeBadge.innerText = quiz.type;
  if (elements.quizNumberTag) elements.quizNumberTag.innerText = `任務檢定 Q${quiz.quizNumber}`;
  if (elements.quizQuestion) elements.quizQuestion.innerHTML = formatTextWithPlayer(quiz.question);

  if (elements.quizOptions) {
    elements.quizOptions.innerHTML = '';
    quiz.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = formatTextWithPlayer(opt.text);

      btn.onclick = (e) => {
        e.stopPropagation();
        handleAnswer(opt, quiz);
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

function handleAnswer(selectedOpt, quizData) {
  removeReplayAudioButton("handleAnswer");
  stopAllTypewriters();
  stopActiveAudio("handleAnswer", quizData.id);
  const isCorrect = selectedOpt.isCorrect;
  const feedback = quizData.feedback;
  const correctOpt = quizData.options.find(o => o.isCorrect === true);
  gameState.listeningState = "REVIEW";

  if (!isCorrect) {
    if (!gameState.wrongQuestions.includes(quizData.quizNumber)) {
      gameState.wrongQuestions.push(quizData.quizNumber);
    }
  }

  const currentSec = gameState.activeQuestionSection;
  if (!gameState.completedSections.includes(currentSec)) {
    gameState.completedSections.push(currentSec);
  }

  if (elements.playerChoiceBox) elements.playerChoiceBox.classList.remove('hidden');
  if (elements.playerChoiceText) elements.playerChoiceText.innerHTML = formatTextWithPlayer(selectedOpt.text);
  if (elements.correctChoiceText) elements.correctChoiceText.innerHTML = correctOpt ? formatTextWithPlayer(correctOpt.text) : "";
  if (elements.feedbackParsingContainer) elements.feedbackParsingContainer.classList.remove('hidden');

  if (isCorrect) {
    gameState.score++;
    if (quizData.trustTarget) gameState.trustPoints[quizData.trustTarget]++;

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
      gameState.hasValidSave = true;
      
      saveGameData();
      elements.chapterBanner.classList.remove('active');

      updateHUD();
      if (callback) callback();
    };

    elements.chapterBanner.onclick = (e) => {
      e.stopPropagation();
      proceedTransition();
    };

    setTimeout(() => {
      if (!hasCompleted) {
        proceedTransition();
      }
    }, 2200);
  } else {
    isTransitionExecuting = false;
    gameState.currentChapter = nextChapter;
    gameState.currentStepIndex = 0;
    gameState.listeningState = "BLIND_LISTENING";
    gameState.currentListeningSection = 1;
    gameState.completedSections = [];
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
  const chapterData = CHAPTER_DATA[gameState.currentChapter];
  sectionReplayQueue = chapterData.steps.filter(s => s.listeningSection === sectionNumber && s.type === "dialogue");
  if (sectionReplayQueue.length === 0) return;

  isWrongReviewMode = true;
  sectionReplayIndex = 0;
  gameState.listeningState = "QUESTION_REPLAY";
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
  const bgUrl = BACKGROUND_MAP[stepData.bg] || "assets/backgrounds/bg_classroom_day.png";
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
        playVoiceAudio(stepData.audio, stepData.id);
      };
    }
  } else {
    removeReplayAudioButton("noAudioReplayLine");
  }

  showScreen('gameplay');
}

function renderWrongReviewScreen() {
  removeReplayAudioButton("renderWrongReviewScreen");
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
  gameState.isCleared = true;
  gameState.listeningState = "COMPLETE";
  stopActiveAudio("renderEnding", "ending");

  if (elements.quizOverlay) {
    elements.quizOverlay.classList.add('hidden');
  }
  if (elements.feedbackModal) {
    elements.feedbackModal.classList.add('hidden');
  }

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

  const quizOverlay = document.getElementById("vn-quiz-overlay");
  console.log("[ENDING UI CHECK]", {
    quizExists: !!quizOverlay,
    quizDisplay: quizOverlay
      ? getComputedStyle(quizOverlay).display
      : null,
    quizVisibility: quizOverlay
      ? getComputedStyle(quizOverlay).visibility
      : null
  });
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
  document.getElementById('btn-opt-chan').onclick = (e) => { e.stopPropagation(); tempHonorific = "ちゃん"; renderNameStep2(onComplete); };
  document.getElementById('btn-opt-kun').onclick = (e) => { e.stopPropagation(); tempHonorific = "くん"; renderNameStep2(onComplete); };
  document.getElementById('btn-name-back').onclick = (e) => { e.stopPropagation(); renderNameStep1(onComplete); };
  document.getElementById('btn-name-next2').onclick = (e) => { e.stopPropagation(); renderNameStep3(onComplete); };
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
    gameState.playerName = tempName;
    gameState.playerHonorific = tempHonorific;
    if (elements.nameSetupModal) elements.nameSetupModal.classList.add('hidden');
    saveGameData();
    if (onComplete) onComplete();
  };
}

function startNewGame() {
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
    gameState.wrongQuestions = [];
    saveGameData();
    
    playChapterTransition(1, () => {
      renderDialogueStep(CHAPTER_DATA[1].steps[0]);
    });
  });
}

function continueGame() {
  const loaded = loadGameData();
  if (!loaded || !gameState.hasValidSave) {
    if (elements.noSaveModal) elements.noSaveModal.classList.remove('hidden');
    return;
  }

  updateHUD();
  const chapterData = CHAPTER_DATA[gameState.currentChapter] || CHAPTER_DATA[1];
  const stepIndex = Math.min(gameState.currentStepIndex, chapterData.steps.length - 1);
  gameState.currentStepIndex = stepIndex;
  const step = chapterData.steps[stepIndex];

  if (step && step.type === "quiz") {
    renderQuizOverlay(step.id, step.listeningSection);
  } else if (step) {
    renderDialogueStep(step);
  } else {
    renderDialogueStep(chapterData.steps[0]);
  }
}

function handleDialogueBoxClick(e) {
  e.stopPropagation();
  if (elements.quizOverlay && !elements.quizOverlay.classList.contains('hidden')) return;
  if (elements.choiceOverlay && !elements.choiceOverlay.classList.contains('hidden')) return;
  if (elements.feedbackModal && !elements.feedbackModal.classList.contains('hidden')) return;
  if (elements.nameSetupModal && !elements.nameSetupModal.classList.contains('hidden')) return;
  if (elements.dangerConfirmModal && !elements.dangerConfirmModal.classList.contains('hidden')) return;
  if (elements.exitConfirmModal && !elements.exitConfirmModal.classList.contains('hidden')) return;
  if (elements.noSaveModal && !elements.noSaveModal.classList.contains('hidden')) return;
  if (isWrongReviewMode) return;

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
function initEventListeners() {
  screens.title = document.getElementById('screen-title');
  screens.instructions = document.getElementById('screen-instructions');
  screens.gameplay = document.getElementById('screen-gameplay');
  screens.ending = document.getElementById('screen-ending');
  screens.review = document.getElementById('screen-review');
  screens.config = document.getElementById('screen-config');

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
    btnCloseFeedback: document.getElementById('btn-close-feedback'),
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
  bindClick('btn-how-to-play', () => showScreen('instructions'));
  bindClick('btn-title-config', () => openConfigScreen('title'));
  bindClick('btn-review', () => renderWrongReviewScreen());
  bindClick('vn-btn-review', () => renderWrongReviewScreen());

  bindClick('hud-config-btn', () => openConfigScreen('gameplay'));
  bindClick('btn-game-exit', () => {
    if (elements.exitConfirmModal) elements.exitConfirmModal.classList.remove('hidden');
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

  bindClick('btnCloseFeedback', () => {
    const quiz = QUIZZES[gameState.currentQuizId];
    const qNum = quiz ? quiz.quizNumber : 1;

    if (elements.feedbackModal) elements.feedbackModal.classList.add('hidden');
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
      renderEnding();
      return;
    }

    if (nextStepIdx === -1 || nextStepIdx >= chapterData.steps.length) {
      renderEnding();
      return;
    }

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
    gameState.wrongQuestions = [];
    gameState.hasValidSave = false;
    
    localStorage.removeItem('furyo_vn_save');
    if (elements.dangerConfirmModal) elements.dangerConfirmModal.classList.add('hidden');
    updateTitleScreenButtons();
    showScreen('title');
  });

  const dialogueBoxEl = document.getElementById('vn-dialogue-box');
  if (dialogueBoxEl) {
    dialogueBoxEl.onclick = handleDialogueBoxClick;
  }

  if (elements.cfgBgmSlider) {
    elements.cfgBgmSlider.oninput = (e) => { gameSettings.bgmVolume = parseInt(e.target.value, 10); if(elements.cfgBgmVal) elements.cfgBgmVal.innerText = `${gameSettings.bgmVolume}%`; saveGameData(); };
  }
  if (elements.cfgSeSlider) {
    elements.cfgSeSlider.oninput = (e) => { gameSettings.seVolume = parseInt(e.target.value, 10); if(elements.cfgSeVal) elements.cfgSeVal.innerText = `${gameSettings.seVolume}%`; saveGameData(); };
  }
  if (elements.cfgVoiceSlider) {
    elements.cfgVoiceSlider.oninput = (e) => { gameSettings.voiceVolume = parseInt(e.target.value, 10); if(elements.cfgVoiceVal) elements.cfgVoiceVal.innerText = `${gameSettings.voiceVolume}%`; saveGameData(); };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  loadGameData();
  updateTitleScreenButtons();
  showScreen('title');
});