const https = require('https');
const fs = require('fs');

const downloadImage = (prompt, filename) => {
  const url = `https://copilot-sg-og.byteintl.net/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=landscape_16_9`;
  console.log('Downloading:', url);
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(filename);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => reject(err));
    });
  });
};

async function main() {
  try {
    await downloadImage(
      "A glowing golden curved line waveform transitioning into a flying bird silhouette on a dark textured background, with scattered sparkles and several golden musical note icons around the curve, elegant, high quality, cinematic lighting, 8k resolution, masterpiece, minimalist",
      "public/images/bg-dark-gen.jpg"
    );
    await downloadImage(
      "A soft golden curved line waveform transitioning into a flying bird silhouette on a clean ivory white paper textured background, with scattered subtle sparkles and several golden musical note icons around the curve, elegant, high quality, bright and airy, minimalist, masterpiece",
      "public/images/bg-light-gen.jpg"
    );
    console.log("Images downloaded successfully.");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
