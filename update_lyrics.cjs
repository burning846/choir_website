const fs = require('fs');

const zhFile = '/Users/bytedance/Documents/personal/choir/public/performance-may-10.json';
const enFile = '/Users/bytedance/Documents/personal/choir/public/performance-may-10.en.json';

const zhData = JSON.parse(fs.readFileSync(zhFile, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

const getSong = (data, id) => {
  for (const part of data.parts) {
    const s = part.songs.find(s => s.id === id);
    if (s) return s;
  }
  return null;
}

const zhTranslations = {
  1: [
    "我听到远处的钟声",
    "我听到海螺里的海浪声",
    "我听到欢快的旋转木马，每一个都有故事要讲",
    "每一个都有自己的音乐",
    "新月洒下银色的光芒",
    "溪流中泛起温柔的涟漪",
    "梦境中充满甜蜜的满足；每一个似乎都有故事",
    "每一个都有自己的音乐",
    "周围的每一个景象和声音都有它的音乐",
    "敞开你的心扉，你就会听到",
    "一首关于我们土地和平的歌",
    "一首关于邻里手牵手的歌",
    "让世界上的人们都能找到一首为了全人类希望的歌",
    "听见音乐！"
  ],
  2: [
    "万民哪，你们都要赞美主！",
    "万国哪，你们都当赞美他！",
    "因为他向我们大施慈爱，",
    "主的诚实存到永远。",
    "愿荣耀归于父、子、圣灵，",
    "起初这样，现在这样，以后也这样，",
    "直到永远。阿们。"
  ],
  3: [
    "哦，我的爱人，你那明亮的双眼，",
    "用温柔的目光偷走了我的心。",
    "如果你稍稍看我一眼，我便心满意足，",
    "但如果你拒绝我，我会痛苦而死。",
    "哦，我的爱人，充满爱意的双眼，",
    "怜悯这颗为你憔悴而死的心吧。"
  ],
  4: [
    "啦啦啦，我不敢说，",
    "啦啦啦，我这就告诉你。",
    "我们城里有个男人，",
    "总是对他的妻子嫉妒。",
    "他的嫉妒并非毫无根据，",
    "但他根本不是个戴绿帽子的人。",
    "啦啦啦，我不敢说，",
    "啦啦啦，我这就告诉你。"
  ],
  8: [
    "紧绷的弓上颤动的弦啊，",
    "在月光下喧闹的你的心。",
    "磨得锋利的刀刃如此美丽，",
    "就如同你那侧脸一般。",
    "隐藏在悲伤与愤怒中的真心，",
    "只有森林中的精灵们才知道，只有精灵们才知道。"
  ],
  9: [
    "那地平线之所以闪耀，",
    "是因为在某处隐藏着你。",
    "那么多灯火让人怀念，",
    "是因为在那其中有一盏属于你。",
    "来吧，出发吧，把一块面包、",
    "小刀、提灯塞进背包。",
    "父亲留下的热情，",
    "母亲给我的那个眼神。",
    "地球旋转着，隐藏着你，",
    "闪耀的瞳孔，闪烁的灯火。",
    "地球旋转着，承载着你，",
    "承载着我们，总有一天一定会相遇。"
  ],
  10: [
    "呼唤着，在内心深处的某个地方，",
    "总想做一个令人心动的梦。",
    "悲伤虽然数不尽，",
    "但在它的另一面一定能遇见你。",
    "每当人们重复犯错时，",
    "才知晓那蔚蓝天空的湛蓝。",
    "道路虽然看起来绵延不绝，",
    "但这双手能拥抱光芒。",
    "离别时的宁静胸怀，",
    "归零的身体正倾耳聆听。",
    "活着的不可思议，死去的不可思议，",
    "花儿、风儿、城市，一切都一样。"
  ],
  11: [
    "啦啦啦啦啦啦",
    "独自坐在美丽的花园里",
    "望着清澈的天空",
    "空气如此清新舒适",
    "和平与安宁",
    "大自然美丽，气氛清新",
    "盛开的花朵",
    "摇曳的椰树",
    "象征着富饶的生活",
    "鸟儿飞翔",
    "享受自由",
    "孩子们奔跑着",
    "映照着幸福"
  ]
};

const enTranslations = {
  2: [
    "O praise the Lord, all ye nations:",
    "praise him, all ye people.",
    "For his merciful kindness is great toward us:",
    "and the truth of the Lord endureth for ever.",
    "Glory be to the Father, and to the Son,",
    "and to the Holy Ghost;",
    "As it was in the beginning, is now, and ever shall be,",
    "world without end. Amen."
  ],
  3: [
    "O eyes, my beloved, shining eyes,",
    "you steal my heart with your sweet glances.",
    "If you look at me a little, I am happy,",
    "but if you deny me, you make me die of hardship.",
    "O eyes, my beloved, eyes of love,",
    "have pity on this heart, that languishes and dies for you."
  ],
  4: [
    "La, la, la, I dare not say it,",
    "la, la, la, I will tell you.",
    "There is a man in our town,",
    "Who is jealous of his wife.",
    "He is not jealous without cause,",
    "But he is not a cuckold at all.",
    "La, la, la, I dare not say it,",
    "la, la, la, I will tell you."
  ],
  8: [
    "Trembling bowstring drawn tight,",
    "Your heart noisy in the moonlight.",
    "The sharpened blade is beautiful,",
    "Much like your profile.",
    "Knowing the true heart hidden in sorrow and anger,",
    "Only the spirits of the forest know, only the spirits know."
  ],
  9: [
    "The reason the horizon shines,",
    "Is because it hides you somewhere.",
    "The reason the many lights are nostalgic,",
    "Is because you are in one of them.",
    "Come, let's set out, stuffing a piece of bread,",
    "A knife, a lamp into a bag.",
    "The burning passion father left behind,",
    "That gaze mother gave me.",
    "The earth turns, hiding you,",
    "Shining eyes, twinkling lights.",
    "The earth turns, carrying you,",
    "Carrying us, we will surely meet someday."
  ],
  10: [
    "Calling out, somewhere deep in my heart,",
    "I always want to dream a thrilling dream.",
    "Though sorrows are countless,",
    "I will surely meet you beyond them.",
    "Every time people repeat their mistakes,",
    "They simply learn the blueness of the blue sky.",
    "Though the road seems to continue endlessly,",
    "These two hands can embrace the light.",
    "The quiet heart at the time of farewell,",
    "The body becoming zero listens closely.",
    "The wonder of living, the wonder of dying,",
    "Flowers, wind, and city, they are all the same."
  ]
};

for (const part of zhData.parts) {
  for (const song of part.songs) {
    if (zhTranslations[song.id]) {
      song.translation = zhTranslations[song.id];
    } else {
      delete song.translation;
    }
  }
}

for (const part of enData.parts) {
  for (const song of part.songs) {
    if (enTranslations[song.id]) {
      song.translation = enTranslations[song.id];
      song.lyrics = getSong(zhData, song.id).lyrics;
    } else if (song.id >= 5 && song.id !== 8 && song.id !== 9 && song.id !== 10) {
      song.translation = song.lyrics; 
      song.lyrics = getSong(zhData, song.id).lyrics;
    } else {
      delete song.translation;
    }
  }
}

fs.writeFileSync(zhFile, JSON.stringify(zhData, null, 2));
fs.writeFileSync(enFile, JSON.stringify(enData, null, 2));
console.log('done');