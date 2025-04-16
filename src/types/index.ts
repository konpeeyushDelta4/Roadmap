import { SubscriptionE } from "./enum";

export type SocialLoginD = "google" | "twitter" | "github";

export type ProductD = {
  id: number;
  //   name: null;
  logo: string;
  platform: string;
  pricing: string;
  status: string;
  //   user_id: null;
  slug: string;
  //   has_trial: null;
  website_url: string;
  tags: string;
  //   overall_rating: null;
  //   upvotes: null;
  //   views: null;
  starting_price: number;
  product_detail: ProductDetailD;
};

type ProductDetailD = {
  id: number;
  title: string;
  short_description: string;
  product_id: number;
  description: string;
  language: string;
};

export type CategoryD = {
  id: number;
  name: string;
};

export type SubscriptionDetailT = {
  id: number;
  subscription_id: string;
  canceled_at: string;
  cancel_at_period_end: boolean;
  collection_method: string;
  created: number;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  customer_id: string;
  user_id: string;
  product_id: string;
  plan_id: number;
  status: string;
  stripe_plan_id: string;
  plan_name: string;
  subscription_benefits: string;
  cancel_at: string;
  createdAt: string;
  updatedAt: string;
}


export type PlansArrayT = {
  title: string;
  desc: string;
  price: number;
  points: string[];
  monthly_key: SubscriptionE;
  yearly_key: SubscriptionE;
  key: SubscriptionE;
}