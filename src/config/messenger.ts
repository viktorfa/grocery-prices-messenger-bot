import { FacebookMessagingAPIClient } from "fb-messenger-bot-api";
import { fbApplicationSecret } from "./vars";

const messagingClient = new FacebookMessagingAPIClient(fbApplicationSecret);

export default messagingClient;
