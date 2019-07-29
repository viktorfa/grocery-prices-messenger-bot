import { Router } from "express";
import { ValidateWebhook, FacebookMessageParser } from "fb-messenger-bot-api";
import { handleMessage } from "./messenger";

const messageParser = FacebookMessageParser;
const router = Router();

router.get("/webhook", (req, res) => {
  ValidateWebhook.validateServer(req, res);
});
router.post("/webhook", async (req, res) => {
  try {
    const incomingMessages = messageParser.parsePayload(req.body);
    const result = await Promise.all(incomingMessages.map(handleMessage));
    console.log(`Result sent`);
    console.log(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
  res.status(200).end();
});

router.get("/status", (req, res) => res.send("OK"));

export default router;
