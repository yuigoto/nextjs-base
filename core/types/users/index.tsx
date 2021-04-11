import { HashMap } from "core/types/index";

export type UserCompany = HashMap<any> & {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type UserAddress = HashMap<any> & {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string
  }
};

export type UserListItem = HashMap<any> & {
  id: string|number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
};
