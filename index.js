const express = require('express');
const bodyParser = require('body-parser');
const Canvas = require("canvas")
const fs = require('fs')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('*', async (req, res) => {
  const output = req.url
  const test = output.substring(35);

   console.log(test)
  
  if (!test) {
    return;
  }
  const url = `https://cdn.discordapp.com/avatars/${test}`

  console.log(url)

const canvas = Canvas.createCanvas(200, 200);
  const context = canvas.getContext('2d');

  context.beginPath();
  context.arc(100, 100, 100, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();

 Canvas.loadImage(url).then((avatar) => {
  context.drawImage(avatar, 0, 0, 200, 200);

  const out = fs.createWriteStream(__dirname + '/image.png')
const stream = canvas.createPNGStream()
stream.pipe(out)
out.on('finish', () => {

})
  })
setTimeout(() => {
   res.sendFile(__dirname + '/image.png');
}, 200);
});

app.listen(8090, () => console.log('server started'));
