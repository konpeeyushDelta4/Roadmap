import { UserD } from "../types/user";
import { differenceInHours, format, formatDistanceToNow, parseISO } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SubmissionDetailT } from "../types/product";

export const log = (...args: any[]) => {
  // return;
  return console.log(...args);
};
export const logErr = (...args: any[]) => {
  // return;
  return console.error(...args);
};

function isValidURL(url: string) {
  // Regular expression to match a URL pattern
  var urlPattern = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,6}(\/.*)?$/i;
  return urlPattern.test(url);
}

export const isJSON = (str: string) => {
  if (!str) return false;
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};

export function catIdReducer(data: { name: string; id: number }[]) {
  return data?.reduce((acc, i) => {
    if (acc === "") {
      return i.id.toString();
    } else {
      return acc + "," + i.id;
    }
  }, "");
}

export const validateImageSize = ({ file, height, width }: { file: any; height: number; width: number }) => {
  const image = new Image();
  image.src = URL.createObjectURL(file);

  return new Promise((resolve) => {
    image.onload = function () {
      const imgWidth = image.width;
      const imgHeight = image.height;
      resolve(imgWidth <= width && imgHeight <= height);
    };
  });
};

export const validateSquareImage = ({ file }: { file: any }) => {
  const image = new Image();
  image.src = URL.createObjectURL(file);
  return new Promise((resolve) => {
    image.onload = function () {
      const imgWidth = image.width;
      const imgHeight = image.height;
      resolve(imgWidth === imgHeight);
    };
  });
};

export function getMediumDarkColorHex(firstLetter: any) {
  const colorMap: any = {
    a: "#3498db",
    b: "#8e44ad",
    c: "#e74c3c",
    d: "#2ecc71",
    e: "#f39c12",
    f: "#d35400",
    g: "#27ae60",
    h: "#2980b9",
    i: "#9b59b6",
    j: "#c0392b",
    k: "#1abc9c",
    l: "#e67e22",
    m: "#2c3e50",
    n: "#7f8c8d",
    o: "#34495e",
    p: "#f1c40f",
    q: "#16a085",
    r: "#d35400",
    s: "#95a5a6",
    t: "#27ae60",
    u: "#bdc3c7",
    v: "#9b59b6",
    w: "#8e44ad",
    x: "#3498db",
    y: "#e74c3c",
    z: "#1abc9c",
  };

  const firstLetter1 = typeof firstLetter === "string" ? firstLetter[0]?.toLowerCase() : firstLetter?.toLowerCase();
  return colorMap[firstLetter1] || "#333333";
}

export const getUserName = (u: UserD | null): string => {
  if (!u) return "";

  return u.first_name || u.username || `User${(Number(u.id || 0) * 1.3).toFixed(0)}`;
};


export function getNameToDisplay(ud: UserD | null) {
  if (!ud) return

  let name: string;
  if (ud?.first_name) {
    name = ud?.first_name
    if (ud?.last_name) {
      name = ud?.first_name + " " + ud?.last_name
    }
  } else if (ud?.name) {
    name = ud?.name
  } else {
    name = ud?.username || ""
  }

  return name;
}


export const isMac = typeof window !== "undefined" ? navigator.userAgent.indexOf("Mac OS X") != -1 : false;

//  Date format

export function formatDate(inputDate: string) {
  if (!inputDate) return;

  const dt = new Date(inputDate);

  if (differenceInHours(new Date(), dt) > 24) {
    return format(dt, "d MMM , HH:MM aa");
  } else {
    return formatDistanceToNow(dt);
  }
}


export const getEmbedLink = (url: String) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  } else {
    return "error";
  }
};



export function getLastDigitAfterDecimal(number: number) {
  // Convert the number to a string
  const numberString = number.toString();

  // Find the position of the decimal point
  const decimalIndex = numberString.indexOf('.');

  // If there is no decimal point, return 0
  if (decimalIndex === -1) {
    return 0;
  }

  // Get the character after the decimal point
  const digit = numberString.charAt(decimalIndex + 1);

  // Convert the character to a number
  const lastDigit = parseInt(digit);

  return lastDigit;
}




export function dateFormater({ date, formatt = "dd MM, YYYY" }: { date: string, formatt?: string }) {
  if (!date) return
  const d = parseISO(date)
  let formattedDate

  if (d) {
    formattedDate = format(d, formatt)
  }

  if (formattedDate) {
    return formattedDate
  } else {
    return date
  }

}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const Feature_requests = {
  data: [] as SubmissionDetailT[],
  page: 1,
  hasMore: true,
  loading: true,
  redirected: false,
  setData: (data: any) => {
    Feature_requests.data = data
  },
  setNextPage: (page: number) => {
    Feature_requests.page = page
  },
  setHasMore: (hasMore: boolean) => {
    Feature_requests.hasMore = hasMore
  },
  setLoading: (loading: boolean) => {
    Feature_requests.loading = loading
  },
  setRedirected: (redirected: boolean) => {
    Feature_requests.redirected = redirected
  },
}