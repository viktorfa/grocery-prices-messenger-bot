interface AmpOffer {
  heading: string;
  pricing: AmpPricing;
  description?: string;
  image_url: string;
  dealer?: string;
  provenance: string;
  select_method?: string;
  is_promoted?: boolean;
  uri: string;
}
interface AmpPricing {
  price?: number;
  price_text?: string;
  pre_price?: number;
}
