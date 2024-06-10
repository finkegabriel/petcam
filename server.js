const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3097

app.post('/move', (req, res) => {
    const setX = req.params.x;
    const setY = req.params.y;
    console.log("post data ",setX,setY);
    if(setX>0){
        exec(`uvcdynctrl -d /dev/video0 -s 'Pan (relative)' ${setX}`, (err, stdout, stderr) => {
            if (err) {
              // node couldn't execute the command
              return;
            }
          
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          });
    }
    if(setY>0){
        exec(`uvcdynctrl -d /dev/video0 -s 'Tilt (relative)' ${setY}`, (err, stdout, stderr) => {
            if (err) {
              // node couldn't execute the command
              return;
            }
          
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          });
    }
    res.send(`moving X ${setX} && Y ${setY}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})