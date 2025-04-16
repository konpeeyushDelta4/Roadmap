export type TopicsItemD = {
  id: number;
  language: string;
  name: string;
  slug: string;
  description: string;
  tags: string;
};

export type GetProductByTopicD = {
  id: number;
  name: string;
  logo: string;
  platform: string;
  pricing: string;
  status: string;
  user_id: number;
  slug: string;
  has_trial: boolean;
  website_url: string;
  tags: string;
  overall_rating: number;
  upvotes: number;
  views: number;
  starting_price: number;
  support_email: string;
  claim: string;
  total_followers: number;
  createdAt: string;
  saved: string;
  topic_product_priority: number;
  logo_url: string;
  user_vote: string;
  user_saved: string;
  product_detail: {
    id: number;
    title: string;
    short_description: string;
    product_id: number;
    description: string;
    language: string;
    product_detail_media: any[];
  };
};
