import messagingClient from "../config/messenger";
import _ from "lodash";

import {
  getMessageText,
  offerSortFunction,
  offerToPayload,
  getSenderId,
} from "./helpers";
import { searchOffers } from "../api";
import { MESSAGE_TEMPLATE_TYPE, BUTTON_TYPE } from "fb-messenger-bot-api";
import { FacebookMessagePayloadMessagingEntry } from "fb-messenger-bot-api";

export const OFFER_LIMIT = 10;
export const handleMessage = async (
  entry: FacebookMessagePayloadMessagingEntry,
): Promise<any> => {
  const senderId = getSenderId(entry);
  const text = getMessageText(entry);
  messagingClient.markSeen(senderId);
  if (text) {
    return handleTextMessage(text, entry);
  }
  return;
};

export const handleTextMessage = async (
  text: string,
  entry: FacebookMessagePayloadMessagingEntry,
) => {
  const senderId = getSenderId(entry);
  messagingClient.toggleTyping(senderId, true);
  await messagingClient.sendTextMessage(senderId, `Søker etter ${text}`);
  const offers = await searchOffers(text);
  if (offers.length) {
    if (offers.length > OFFER_LIMIT) {
      offers.sort(offerSortFunction);
      const url = `https://allematpriser.no/sok/${text}`;
      const buttons = [{ url, title: `Se alle ↗️`, type: BUTTON_TYPE.URL }];
      await messagingClient.sendButtonsMessage(
        senderId,
        `Fant ${offers.length} resultater fra allematpriser.no`,
        buttons,
      );
    } else {
      messagingClient.sendTextMessage(
        senderId,
        `Fant ${offers.length} resultater`,
      );
    }
    const templatePayload = {
      template_type: MESSAGE_TEMPLATE_TYPE.GENERIC,
      elements: _.take(offers, OFFER_LIMIT).map(offerToPayload),
    };
    await messagingClient.sendTemplateMessage(senderId, templatePayload);
  } else {
    messagingClient.sendTextMessage(
      senderId,
      `Fant ingen resultater på ${text}`,
    );
  }
  return messagingClient.toggleTyping(senderId, false);
};
