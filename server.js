const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAIApi, Configuration } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

app.post("/shootme", async (req, res) => {
  const qstn = req.body.qstn;
  if (!qstn) {
    return res.status(400).send({ msg: "empty qstn" });
  }
  try {
    await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: qstn,
        temperature: 0,
        max_tokens: 2000,
      })
      .then((resp) => {
        res.status(200).send({ data: resp.data.choices[0].text });
      });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ msg: "server err" });
  }
});

app.listen(5000,()=>{
    console.log("listening on 5000🤖🤖🤖")
})