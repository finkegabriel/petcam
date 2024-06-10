const express = require('express');
const { exec } = require('child_process');
var bodyParser = require('body-parser')
const app = express();
const port = 3097

var urlencodedParser = bodyParser.json();

app.post('/move',urlencodedParser, (req, res) => {
    var payload = JSON.parse(req.body);
    console.log("post data ",payload.x,payload.y);
    if(payload.x<0){
        exec(`uvcdynctrl -d /dev/video0 -s 'Pan (relative)' -- ${(payload.x)}`, (err, stdout, stderr) => {
            if (err) {
              // node couldn't execute the command
              return;
            }
          
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          });

    }
    if(payload.x>0){
        exec(`uvcdynctrl -d /dev/video0 -s 'Pan (relative)' ${payload.x}`, (err, stdout, stderr) => {
            if (err) {
              // node couldn't execute the command
              return;
            }
          
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          });

    }
    if(payload.y>0){
        exec(`uvcdynctrl -d /dev/video0 -s 'Tilt (relative)' ${payload.y}`, (err, stdout, stderr) => {
            if (err) {
              // node couldn't execute the command
              return;
            }
          
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          });
    }
    res.send(`moving X ${payload.x} && Y ${payload.y}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})