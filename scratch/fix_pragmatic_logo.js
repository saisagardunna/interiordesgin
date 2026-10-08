const sharp = require('sharp');
const path = require('path');

async function fixLogo() {
  const inputPath = path.join(__dirname, '../public/images/clients/pragmatic-play.png');
  const outputPath = path.join(__dirname, '../public/images/clients/pragmatic-play.png');

  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // data is a Buffer of RGBA values
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a > 20) {
      // If it's white or light grey (text portion)
      // White text has high R, G, B values (all > 180 and close to each other)
      if (r > 180 && g > 180 && b > 180) {
        // Change white text pixels to sleek dark charcoal (#171717)
        data[i] = 23;     // Red
        data[i + 1] = 23; // Green
        data[i + 2] = 23; // Blue
      }
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels
    }
  })
  .png()
  .toFile(outputPath + '.tmp');

  const fs = require('fs');
  fs.renameSync(outputPath + '.tmp', outputPath);
  console.log('Successfully updated Pragmatic Play logo to dark charcoal text!');
}

fixLogo().catch(console.error);
