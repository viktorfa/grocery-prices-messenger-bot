import _ from "lodash";
import { BUTTON_TYPE } from "fb-messenger-bot-api";

import {
  FacebookMessagePayloadMessagingEntry,
  IGenericTemplateElement,
} from "fb-messenger-bot-api";
export const getMessageText = (
  message: FacebookMessagePayloadMessagingEntry,
): string | null => {
  const text = _.get(message, ["message", "text"]);
  const isEcho = _.get(message, ["message", "is_echo"]);
  if (isEcho) {
    return null;
  }
  return text;
};

export const offerToPayload = (offer: AmpOffer): IGenericTemplateElement => {
  const { image_url, heading: title } = offer;
  const subtitle = getOfferSubtitle(offer) || offer.description || "";
  const url = getOfferUrl(offer);
  const default_action = {
    url,
    type: BUTTON_TYPE.URL,
  };
  const buttons = [
    { type: BUTTON_TYPE.URL, title: "Se på allematpriser.no", url },
  ];
  return { title, subtitle, image_url, buttons, default_action };
};

export const getOfferUrl = (offer: AmpOffer): string => {
  return `https://allematpriser.no/tilbud/${offer.uri}`;
};
export const getPrice = (pricing: AmpPricing): string => {
  if (pricing.price) {
    return `${pricing.price.toFixed(2)},-`;
  }
  return pricing.price_text || "";
};
export const getOfferSubtitle = (offer: AmpOffer): string => {
  const price = getPrice(offer.pricing);
  const { dealer } = offer;
  return [price, dealer].join(" – ");
};

const getProvenanceOrder = (provenance: string): number => {
  switch (provenance) {
    case "custom":
      return 1;
    case "shopgun":
      return 2;
    default:
      return 3;
  }
};
export const offerSortFunction = (a: AmpOffer, b: AmpOffer): number => {
  const provenanceResult =
    getProvenanceOrder(a.provenance) - getProvenanceOrder(b.provenance);
  return provenanceResult;
};

export const getSenderId = (
  entry: FacebookMessagePayloadMessagingEntry,
): string => {
  return _.get(entry, ["sender", "id"]);
};
