const fs = require('fs');

const zhFile = '/Users/bytedance/Documents/personal/choir/public/performance-may-10.json';
const enFile = '/Users/bytedance/Documents/personal/choir/public/performance-may-10.en.json';

const zhData = JSON.parse(fs.readFileSync(zhFile, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

const zhTitles = {
  1: "Hear the Music (听见音乐)",
  2: "Laudate Dominum (赞美上主)",
  3: "O occhi, manza mia (哦，我温柔的眼睛)",
  4: "La, la, la, je ne l'ose dire (啦啦啦，我不敢说)",
  5: "闻笛",
  6: "拥抱夕阳",
  7: "希望",
  8: "もののけ姫 (魔法公主)",
  9: "君をのせて (伴随着你)",
  10: "いつも何度でも (永远同在)",
  11: "Keindahan Taman (花园之美)",
  12: "细水长流",
  13: "牧羊姑娘",
  14: "友谊的歌声展开翅膀"
};

const enTitles = {
  1: "Hear the Music",
  2: "Laudate Dominum",
  3: "O occhi, manza mia",
  4: "La, la, la, je ne l'ose dire",
  5: "闻笛 (Hearing the Flute)",
  6: "拥抱夕阳 (Embrace the Sunset)",
  7: "希望 (Hope)",
  8: "もののけ姫 (Princess Mononoke)",
  9: "君をのせて (Carrying You)",
  10: "いつも何度でも (Always With Me)",
  11: "Keindahan Taman",
  12: "细水长流 (Love Endures)",
  13: "牧羊姑娘 (The Shepherd Girl)",
  14: "友谊的歌声展开翅膀 (Wings of Friendship)"
};

for (const part of zhData.parts) {
  for (const song of part.songs) {
    if (zhTitles[song.id]) {
      song.title = zhTitles[song.id];
    }
  }
}

for (const part of enData.parts) {
  for (const song of part.songs) {
    if (enTitles[song.id]) {
      song.title = enTitles[song.id];
    }
  }
}

fs.writeFileSync(zhFile, JSON.stringify(zhData, null, 2));
fs.writeFileSync(enFile, JSON.stringify(enData, null, 2));
console.log('JSON titles updated');