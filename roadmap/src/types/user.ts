import { Role } from "./enum";

export type UserD = {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  profile_pic: string | null;
  name: string | null;
  username: string | null;
  phone_no?: string | null;
  phone_code?: string | null;
  email?: string | null;
  country?: string | null;
  role?: Role;
};
