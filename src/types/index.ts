import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUserRegistration {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  phone: string;
  address?: string;
}

export interface IUser {
  [x: string]: any;
  id: string;
  name: string;
  role: string;
  email: string;
  address: string;
  isPremium: boolean;
  verified: boolean;
  phone?: string;
  followers?: number;
  following?: number;
  profileImage?: string;
}

export interface IPost {
  id?: string;
  title: string;
  content: string;
  image: {
    type: [string];
    default: [];
  };
  userId: string;
  category: string;
  isPremium: boolean;
  upvotes?: number;
  downvotes?: number;
  comments?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
