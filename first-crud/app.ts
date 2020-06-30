import express = require('express')
import path = require('path')

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
})

const port = (parseInt(process.env.PORT) || 3000);

app.listen(port, () => {
	console.log("Executing server on port " + port);
});