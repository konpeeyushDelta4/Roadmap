export enum ApiResType {
  SUCCESS = "RXSUCCESS",
  ERROR = "RXERROR",
}

export enum Role {
  OWNER = "owner",
  ADMIN = "admin",
  USER = "user",
  EDITOR = "editor",
}

export enum ProductPlatformE {
  WEBSITE = "website",
  APP = "app",
  SOFTWARE = "software",
  OTHERS = "others",
}

export enum ProductPricingE {
  FREE = "free",
  PAID = "paid",
}

export enum ProductStatusE {
  DRAFT = "draft",
  INREVIEW = "inreview",
  PUBLISHED = "published",
  REJECTED = "rejected",
  INREVISION = "inrevision",
  APPROVED = "approved",
  PENDING = "pending",
}

export enum SignedUrlTypeD {
  LOGO = "logo",
  FEATURE = "featured_image",
  COMMENT = "comment",
  NORMAL = "normal_images",
}



// ["in_review","completed","cancelled","in_progress","planned"]

export enum SubmissionStatusE {
  INREVIEW = "in_review",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  INPROGRESS = "in_progress",
  PLANNED = "planned",
  ALL = "all",
}

export enum SubscriptionE {
  FREE = "free",
  STARTER = "starter",
  SUPREME = "supreme",
  STARTER_YEARLY = "starter_yearly",
  STARTER_MONTHLY = "starter_monthly",
  SUPREME_YEARLY = "supreme_yearly",
  SUPREME_MONTHLY = "supreme_monthly",
}

export enum SubscriptionDurationE {
  MONTHLY = "monthly",
  YEARLY = "yearly",
  NONE = "none",
}