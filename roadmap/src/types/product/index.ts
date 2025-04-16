import { ProductPlatformE, ProductPricingE, SubmissionStatusE } from "../enum";
import { MediaType } from "../media";
import { UserD } from "../user";

export type RoadmapStatusD = "all" | "in_review" | "under_planning" | "planned" | "in_progress" | "complete";
export type ProductDetailD = {
  id: number;
  name: string;
  logo: string;
  platform: string;
  pricing: string;
  status: string;
  user_id: number;
  claim: string;
  subscribed_to: string;
  slug: string;
  has_trial: any;
  website_url: string;
  tags: string;
  overall_rating: number;
  views: any;
  starting_price: number;
  saved: string;
  review_status: string;
  logo_url: string;
  total_user_rating: string;
  user_vote: string;
  user_saved: string;
  support_email: string;
  upvotes: number;
  role: string;
  product_dashboard_setting: ProductDashboardSettingT;
  submission_boards: SubmissionBoardT[],
  subscription_status: string;
  redirect_url: string;
  product_detail: {
    id: number;
    title: string;
    short_description: string;
    product_id: number;
    description: string;
    language: string;
    product_detail_media: any[];
    other_detail: string;
  };
  Categories: {
    id: number;
    name: string;
  }[];
};

export type ProductDashboardSettingT = {
  id: number;
  product_id: number;
  enable_detail: number;
  enable_submissions: number;
  enable_announcements: number;
  enable_changelogs: number;
  enable_sso: number;
  redirect_url?: string;
  createdAt: string;
  updatedAt: string;
  secret_key?: string;
  button_label: string;
  mail_config: MailConfigT;
  webhook_url: string;
  subscribed_events: string;
};

export type FeaturedProductD = {
  id: number;
  product_id: number;
  priority: number;
  expires_at: string;
  product_detail: {
    id: number;
    name: string;
    logo: any;
    platform: string;
    pricing: string;
    status: string;
    user_id: any;
    slug: string;
    has_trial: any;
    website_url: any;
    product_detail_media: ApiMediaItem[];
    tags: any;
    overall_rating: any;
    upvotes: any;
    views: number;
    starting_price: any;
    saved: string;
    logo_url: any;
    total_user_rating: string;
  };
};

export type ProductInfoD = {
  title: string;
  desc: string;
  platform: ProductPlatformE;
  url: string;
  pricing: ProductPricingE;
  planPrice?: string;
  freeTrial?: boolean;
  detail: string;
  categories: { name: string; id: number }[];
};

export type MediaObj = {
  file: any;
  name: any;
  url: any;
  id: any;
  localId?: any;
  path?: any;
};

export type ApiMediaItem = {
  content_type?: "image" | "video";
  id?: any;
  media_url?: string;
  product_detail_id?: number;
  type: MediaType;
  file?: any;
  localId?: any;
};

// ! Roadmap Types

export type SubmissionDetailT = {
  id: number;
  product_id: number;
  user_id: number;
  feature_name: string;
  description: string;
  slug: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  comment_count: string;
  upvote_count: string;
  user_comment_status: string;
  user_vote_status: string;
  post_uid: string;
  submission_media: {
    content_type: "image" | "video";
    id: number;
    media_url: string;
    submission_id: number;
    type: string;
  }[];
  user: UserD;
  submission_topic: topicT[];
  submission_board: SubmissionBoardT;
};

export type SubmissionCommetsT = {
  id: number;
  submission_id: number;
  plainVal?: string;
  user_id: number;
  parent_comment_id: string;
  text: string;
  type: string;
  createdAt: string;
  like_count: string;
  like_status: number;
  comment_status: string;
  comment_media: ApiMediaItem[];
  reply: SubmissionCommetsT[];
  user_detail: {
    id: number;
    username: string;
    last_name: string;
    first_name: string;
    profile_pic: string;
    name: string;
  };
};

export type AnnouncementT = {
  id: number;
  title: string;
  content: string;
  product_id: number;
  user_id: number;
  is_active: boolean;
  category: string;
  expiration_date: string;
  createdAt: string;
  updatedAt: string;
  AnnouncementMedia: {
    announcement_id: number;
    content_type: "image" | "video";
    id: number;
    media_url: string;
    type: string;
  }[];
};

export type ChangelogsT = {
  id: number;
  title: string;
  content: string;
  product_id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  reactions: {
    id: number;
    count: string;
    type: string;
    user_reaction: string;
  }[];
};

export type topicT = {
  count: string;
  createdAt: string;
  id: number;
  name: string;
  product_id: string;
  updatedAt: string;
};

export type SubmissionBoardT = {
  id: number;
  slug: string;
  name: string;
  product_id: number;
  status: SubmissionStatusE;
  show_in_dashboard: string;
  color: string;
  default_status: string;
  createdAt: string;
  updatedAt: string;
}

export type MailConfigT = {
  host: string;
  port: string;
  email: string;
  auth: {
    user: string;
    pass: string;
  }
}

export type SubmissionJantaT = {
  id: string,
  username: string,
}