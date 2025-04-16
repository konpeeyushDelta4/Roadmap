import { SubscriptionE } from "../types/enum";

export const STORAGE_KEYS = {
  theme: "theme",
  emailLinkAuth: "emailLinkAuth",
  claimProductRoute: "claimProductRoute",
};

export const SHORT_DESC_LENGTH = 255;

export const TOPICS = [
  {
    name: "AI",
    id: 1,
  },
  {
    name: "Art",
    id: 2,
  },
  {
    name: "Artificial Intelligence",
    id: 3,
  },
  {
    name: "Productivity",
    id: 4,
  },
  {
    name: "Marketing",
    id: 5,
  },
  {
    name: "SaaS",
    id: 6,
  },
  {
    name: "Tech",
    id: 7,
  },
  {
    name: "Image Manipulation",
    id: 8,
  },
  {
    name: "Development",
    id: 9,
  },
  {
    name: "Business",
    id: 10,
  },
  {
    name: "E-commerce",
    id: 11,
  },
];

export const SORT = [
  {
    label: "Most recent",
    value: "recent",
  },
  {
    label: "Most Viewed",
    value: "viewed",
  },
  {
    label: "Most Liked",
    value: "liked",
  },
  {
    label: "Most Saved",
    value: "saved",
  },
];

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ja", name: "Japanese" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "zh", name: "Chinese" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  { code: "ko", name: "Korean" },
  { code: "tr", name: "Turkish" },
  { code: "pl", name: "Polish" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  { code: "cs", name: "Czech" },
  { code: "id", name: "Indonesian" },
  { code: "ro", name: "Romanian" },
  { code: "hu", name: "Hungarian" },
  { code: "vi", name: "Vietnamese" },
  { code: "th", name: "Thai" },
  { code: "el", name: "Greek" },
  { code: "bg", name: "Bulgarian" },
  { code: "fi", name: "Finnish" },
  { code: "da", name: "Danish" },
  { code: "no", name: "Norwegian" },
  { code: "uk", name: "Ukrainian" },
  { code: "he", name: "Hebrew" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "fa", name: "Persian" },
  { code: "lt", name: "Lithuanian" },
  { code: "ab", name: "Abkhazian" },
  { code: "aa", name: "Afar" },
  { code: "af", name: "Afrikaans" },
  { code: "ak", name: "Akan" },
  { code: "sq", name: "Albanian" },
  { code: "am", name: "Amharic" },
  { code: "an", name: "Aragonese" },
  { code: "hy", name: "Armenian" },
  { code: "as", name: "Assamese" },
  { code: "av", name: "Avaric" },
  { code: "ae", name: "Avestan" },
  { code: "ay", name: "Aymara" },
  { code: "az", name: "Azerbaijani" },
  { code: "bm", name: "Bambara" },
  { code: "ba", name: "Bashkir" },
  { code: "eu", name: "Basque" },
  { code: "be", name: "Belarusian" },
  { code: "bh", name: "Bihari languages" },
  { code: "bi", name: "Bislama" },
  { code: "bs", name: "Bosnian" },
  { code: "br", name: "Breton" },
  { code: "my", name: "Burmese" },
  { code: "ca", name: "Catalan, Valencian" },
  { code: "km", name: "Central Khmer" },
  { code: "ch", name: "Chamorro" },
  { code: "ce", name: "Chechen" },
  { code: "ny", name: "Chichewa, Chewa, Nyanja" },
  { code: "cu", name: "Church Slavonic, Old Bulgarian, Old Church Slavonic" },
  { code: "cv", name: "Chuvash" },
  { code: "kw", name: "Cornish" },
  { code: "co", name: "Corsican" },
  { code: "cr", name: "Cree" },
  { code: "hr", name: "Croatian" },
  { code: "dv", name: "Divehi, Dhivehi, Maldivian" },
  { code: "nl", name: "Dutch, Flemish" },
  { code: "dz", name: "Dzongkha" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian" },
  { code: "ee", name: "Ewe" },
  { code: "fo", name: "Faroese" },
  { code: "fj", name: "Fijian" },
  { code: "ff", name: "Fulah" },
  { code: "gd", name: "Gaelic, Scottish Gaelic" },
  { code: "gl", name: "Galician" },
  { code: "lg", name: "Ganda" },
  { code: "ka", name: "Georgian" },
  { code: "ki", name: "Gikuyu, Kikuyu" },
  { code: "el", name: "Greek (Modern)" },
  { code: "kl", name: "Greenlandic, Kalaallisut" },
  { code: "gn", name: "Guarani" },
  { code: "gu", name: "Gujarati" },
  { code: "ht", name: "Haitian, Haitian Creole" },
  { code: "ha", name: "Hausa" },
  { code: "hz", name: "Herero" },
  { code: "ho", name: "Hiri Motu" },
  { code: "is", name: "Icelandic" },
  { code: "io", name: "Ido" },
  { code: "ig", name: "Igbo" },
  { code: "ia", name: "Interlingua (International Auxiliary Language Association)" },
  { code: "ie", name: "Interlingue" },
  { code: "iu", name: "Inuktitut" },
  { code: "ik", name: "Inupiaq" },
  { code: "ga", name: "Irish" },
  { code: "jv", name: "Javanese" },
  { code: "kn", name: "Kannada" },
  { code: "kr", name: "Kanuri" },
  { code: "ks", name: "Kashmiri" },
  { code: "kk", name: "Kazakh" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "kv", name: "Komi" },
  { code: "kg", name: "Kongo" },
  { code: "kj", name: "Kwanyama, Kuanyama" },
  { code: "ku", name: "Kurdish" },
  { code: "ky", name: "Kyrgyz" },
  { code: "lo", name: "Lao" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvian" },
  { code: "lb", name: "Letzeburgesch, Luxembourgish" },
  { code: "li", name: "Limburgish, Limburgan, Limburger" },
  { code: "ln", name: "Lingala" },
  { code: "lu", name: "Luba-Katanga" },
  { code: "mk", name: "Macedonian" },
  { code: "mg", name: "Malagasy" },
  { code: "ms", name: "Malay" },
  { code: "ml", name: "Malayalam" },
  { code: "mt", name: "Maltese" },
  { code: "gv", name: "Manx" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi" },
  { code: "mh", name: "Marshallese" },
  { code: "ro", name: "Moldovan, Moldavian, Romanian" },
  { code: "mn", name: "Mongolian" },
  { code: "na", name: "Nauru" },
  { code: "nv", name: "Navajo, Navaho" },
  { code: "nd", name: "Northern Ndebele" },
  { code: "ng", name: "Ndonga" },
  { code: "ne", name: "Nepali" },
  { code: "se", name: "Northern Sami" },
  { code: "nb", name: "Norwegian Bokmål" },
  { code: "nn", name: "Norwegian Nynorsk" },
  { code: "ii", name: "Nuosu, Sichuan Yi" },
  { code: "oc", name: "Occitan (post 1500)" },
  { code: "oj", name: "Ojibwa" },
  { code: "or", name: "Oriya" },
  { code: "om", name: "Oromo" },
  { code: "os", name: "Ossetian, Ossetic" },
  { code: "pi", name: "Pali" },
  { code: "pa", name: "Panjabi, Punjabi" },
  { code: "ps", name: "Pashto, Pushto" },
  { code: "qu", name: "Quechua" },
  { code: "rm", name: "Romansh" },
  { code: "rn", name: "Rundi" },
  { code: "sm", name: "Samoan" },
  { code: "sg", name: "Sango" },
  { code: "sa", name: "Sanskrit" },
  { code: "sc", name: "Sardinian" },
  { code: "sr", name: "Serbian" },
  { code: "sn", name: "Shona" },
  { code: "sd", name: "Sindhi" },
  { code: "si", name: "Sinhala, Sinhalese" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "so", name: "Somali" },
  { code: "st", name: "Sotho, Southern" },
  { code: "nr", name: "South Ndebele" },
  { code: "es", name: "Spanish, Castilian" },
  { code: "su", name: "Sundanese" },
  { code: "sw", name: "Swahili" },
  { code: "ss", name: "Swati" },
  { code: "tl", name: "Tagalog" },
  { code: "ty", name: "Tahitian" },
  { code: "tg", name: "Tajik" },
  { code: "ta", name: "Tamil" },
  { code: "tt", name: "Tatar" },
  { code: "te", name: "Telugu" },
  { code: "bo", name: "Tibetan" },
  { code: "ti", name: "Tigrinya" },
  { code: "to", name: "Tonga (Tonga Islands)" },
  { code: "ts", name: "Tsonga" },
  { code: "tn", name: "Tswana" },
  { code: "tk", name: "Turkmen" },
  { code: "tw", name: "Twi" },
  { code: "ug", name: "Uighur, Uyghur" },
  { code: "ur", name: "Urdu" },
  { code: "uz", name: "Uzbek" },
  { code: "ve", name: "Venda" },
  { code: "vo", name: "Volap_k" },
  { code: "wa", name: "Walloon" },
  { code: "cy", name: "Welsh" },
  { code: "fy", name: "Western Frisian" },
  { code: "wo", name: "Wolof" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "za", name: "Zhuang, Chuang" },
  { code: "zu", name: "Zulu" },
  { code: "zh-CN", name: "Simplified Chinese" },
  { code: "zh-TW", name: "Traditional Chinese" },
  { code: "fr-CA", name: "French (Canada)" },
  { code: "es-419", name: "Spanish (Latin America)" },
];

export const SOCIAL_LINKS = {
  youtube: "https://www.youtube.com/@TheEpicXplorer",
  discord: "https://discord.gg/f2yK5AcswT",
  twitter: "https://twitter.com/TheEpicXplorer",
};


export const ROADMAP_STATUS = [
  {
    name: "all",
    value: "all",
    color: "text-red-400",
  },
  {
    name: "In Review",
    value: "in_review",
    color: "text-yellow-400",

  },
  {
    name: "Under Planning",
    value: "under_planning",
    color: "text-gray-400",
  },
  {
    name: "Planned",
    value: "planned",
    color: "text-blue-400",
  },
  {
    name: "In Progress",
    value: "in_progress",
    color: "text-green-400",
  },
  {
    name: "Complete",
    value: "complete",
    color: "text-primary",
  },
];

export const SUBMISSION_BOARD_COLORS = [
  "#f5a523",
  "#3C4A6B",
  "#0070ef",
  "#19c964",
  "#925fff",
  "#008E9B",
  "#FF6F91",
  "#8AA5FF",
  "#FF9C7F",
  "#FF3647",
]

export const NOTIFICATION_EVENTS = [
  { id: "1", event: 'roadmap:created', label: 'On Submission Create' },
  { id: "2", event: 'roadmap:removed', label: 'On Submission Remove' },
  { id: "3", event: 'roadmap:updated', label: 'On Submission Update' },
  { id: "4", event: 'submission:board:updated', label: 'On Submission Board Update' }

  // { id: 5, event: 'roadmap:comment:created', label: 'On Roadmap Comment Create' },
  // { id: 6, event: 'roadmap:comment:removed', label: 'On Roadmap Comment Remove' },
  // { id: 7, event: 'roadmap:comment:updated', label: 'On Roadmap Comment Update' },
  // { id: 8, event: 'roadmap:upvote', label: 'On Roadmap Upvote' },
  // { id: 9, event: 'roadmap:board:created', label: 'On Roadmap Board Create' },
  // { id: 10, event: 'roadmap:board:removed', label: 'On Roadmap Board Remove' },
  // { id: 11, event: 'roadmap:board:updated', label: 'On Roadmap Board Update' },
  // { id: 12, event: 'changelog:created', label: 'On Changelog Create' },
  // { id: 13, event: 'changelog:removed', label: 'On Changelog Remove' },
  // { id: 14, event: 'changelog:updated', label: 'On Changelog Update' },
  // { id: 15, event: 'changelog:reaction:added', label: 'On Changelog Reaction Add' },
  // { id: 16, event: 'changelog:reaction:removed', label: 'On Changelog Reaction Remove' },
  // { id: 17, event: 'list:product:added', label: 'On List Product Add' },
  // { id: 18, event: 'list:product:removed', label: 'On List Product Remove' },
  // { id: 19, event: 'product:banned_user:added', label: 'On Product Banned User Add' },
  // { id: 20, event: 'product:banned_user:removed', label: 'On Product Banned User Remove' },
  // { id: 21, event: 'product:connected_domain:added', label: 'On Product Connected Domain Add' },
  // { id: 22, event: 'product:connected_domain:removed', label: 'On Product Connected Domain Remove' },
  // { id: 23, event: 'product:connected_domain:verified', label: 'On Product Connected Domain Verifie' },
  // { id: 24, event: 'product:dashboard_setting:updated', label: 'On Product Dashboard Setting Update' },
  // { id: 25, event: 'product:sso_setting:updated', label: 'On Product SSO Setting Update' },
  // { id: 26, event: 'product:member:added', label: 'On Product Member Add' },
  // { id: 27, event: 'product:member:removed', label: 'On Product Member Remove' },
  // { id: 28, event: 'product:member:updated', label: 'On Product Member Update' },
  // { id: 29, event: 'product:settings:created', label: 'On Product Settings Create' },
  // { id: 30, event: 'product:settings:updated', label: 'On Product Settings Update' },
  // { id: 31, event: 'product:subscribe', label: 'On Product Subscribe' },
  // { id: 32, event: 'product:unsubscribe', label: 'On Product Unsubscribe' },
  // { id: 33, event: 'product:upvote', label: 'On Product Upvote' },
  // { id: 34, event: 'product:rating:created', label: 'On Product Rating Create' },
  // { id: 35, event: 'product:rating:updated', label: 'On Product Rating Update' },
  // { id: 36, event: 'product:rating:removed', label: 'On Product Rating Remove' },
  // { id: 37, event: 'product:rating:message:created', label: 'On Product Rating Message Create' },
  // { id: 38, event: 'product:rating:message:updated', label: 'On Product Rating Message Update' },
  // { id: 39, event: 'product:rating:message:removed', label: 'On Product Rating Message Remove' },
];


export const PLANS = [
  {
    title: "Free",
    key: SubscriptionE.FREE,
    desc: "Free forever. No credit card needed.",
    price: 0,
    points: ["Product Listing", "Normal Product", "Feedbacks", "ChangeLogs"],
    monthly_key: SubscriptionE.FREE,
    yearly_key: SubscriptionE.FREE
  },
  {
    title: "Starter",
    key: SubscriptionE.STARTER,
    desc: "For small teams or early-stage startups.",
    price: 19,
    points: [
      "Everything in Free",
      "Free Roadmap",
      "Private Dashboard",
      "Connect Your Domain",
      "Unlimited Boards",
    ],
    monthly_key: SubscriptionE.STARTER_MONTHLY,
    yearly_key: SubscriptionE.STARTER_YEARLY
  },
  {
    title: "Supreme",
    key: SubscriptionE.SUPREME,
    desc: "For established businesses and large teams.",
    price: 39,
    points: ["Everything in Starter", "SSO LOGIN", "Webhook Notifications"],
    monthly_key: SubscriptionE.SUPREME_MONTHLY,
    yearly_key: SubscriptionE.SUPREME_YEARLY
  },
];


// const SUBSCRIPTIONS = {
//   yearly: {
//     starter_yearly: {
//       plan_id: 1,
//       stripe_plan_id: "price_1OcMwtSCGUCtkYR97FlEPsS3",
//       recurring_interval: 'yearly'
//     },
//     supreme_yearly: {
//       plan_id: 2,
//       stripe_plan_id: "price_1OcMvlSCGUCtkYR92INuU4r4",
//       recurring_interval: 'yearly'
//     }
//   },
//   monthly: {
//     starter_monthly: {
//       plan_id: 3,
//       stripe_plan_id: "price_1ObgQHSCGUCtkYR9GCBVt1wn",
//       recurring_interval: 'monthly'
//     },
//     supreme_monthly: {
//       plan_id: 4,
//       stripe_plan_id: "price_1OcMmKSCGUCtkYR91OS2xEim",
//       recurring_interval: 'monthly'
//     }
//   }
// }