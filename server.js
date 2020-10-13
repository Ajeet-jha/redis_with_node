const express = require("express");
const app = express();
const port = 3000;
const Redis = require("./library/redis");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.sendFile(app.use(express.static('public')));
});

app.post("/", async (req, res) => {
    const redis = new Redis();
    const { fname, lname } = req.body;
    var obj = {
        name : fname,
        lname : lname
    }
    try{
        await redis.set("user_info", obj);
        const data = await redis.get("user_info");
        res.send({result : data})
    } catch(e) {
        console.log(e)
    }
});


// client.get("key", redis.print);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});