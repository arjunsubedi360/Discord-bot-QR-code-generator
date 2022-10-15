const { Client, Intents } = require("discord.js");
const QRCode = require("qrcode");
const { unlinkSync } = require("fs");

const {
  checkUserTypedQrWord,
  findKeywordToMakeQrCodeAfterWordOf,
} = require("./helper");

require("dotenv").config();

const client = new Client({ ws: { intents: Intents.ALL } });

client.on("ready", () => {
  console.log(`Log In Successful, Client is ${client.user.tag}`);
});

client.on("message", (msg) => {
  // Do nothing if bot message
  if (msg.author.bot) {
    console.log("Ignoring bot message!");
    return;
  }

  async function generateQrCode(keywordForQrCode) {
    try {
      await QRCode.toFile("tmp.jpg", keywordForQrCode);
      await msg.reply({ files: ["./tmp.jpg"] });
      unlinkSync("./tmp.jpg");
    } catch (err) {
      console.error(err);
      msg.reply("Try Again Later!");
    }
  }

  // generateQrCode(msg.content);
  /* Abstracting word to generate qr code */
  const userKeywordToGenerateQrWord = findKeywordToMakeQrCodeAfterWordOf(
    msg.content
  );

  /*  checking if user has type word qr */
  const checkUserHasTypeQrWord = checkUserTypedQrWord(msg.content);

  console.log("word after qr of:", userKeywordToGenerateQrWord);

  if (checkUserHasTypeQrWord) {
    generateQrCode(userKeywordToGenerateQrWord);
  } else {
    msg.reply("Type: Qr of <TEXT>. To Generate Qr code");
  }
});

client.login(process.env.TOKEN);
