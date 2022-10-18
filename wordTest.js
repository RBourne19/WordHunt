const express = require('express')
const app = express();


const port = 3002
var allWords = require('wordlist-english')
var englishWords = allWords['english'];



const cors = require('cors');

app.use(cors({
    origin: '*'
}));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get('/wordguess', (req, res) => {
  const word = req.query.word
  if(englishWords.includes(word)){
    res.send(true)
  }
  else{
    res.send(false);
  }
});

