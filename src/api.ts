import axios from "axios";
import { apiUrl } from "./config/vars";

export const searchOffers = async (query: string): Promise<Array<AmpOffer>> => {
  const path = `/offers/search/${query}`;
  try {
    const response = await axios.get(`${apiUrl}${path}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};
