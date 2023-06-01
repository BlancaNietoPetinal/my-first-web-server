const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.send("yasss queen")
})

app.listen(3000, ()=> console.log('Listening on port 3000'))