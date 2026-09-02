"use server";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import axiosInstance from "@/src/lib/asiosInstance";
import { envConfig } from "@/src/config/envConfig";

interface registerData {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  phone?: string;
  address?: string;
}

interface userDate {
  email: string;
  password: string;
}

export const registerUser = async (userData: registerData) => {
  try {
    const { data } = await axios.post(
      `${envConfig.baseApi}/auth/register`,
      userData
    );

    if (data.success) {
      cookies().set("accessToken", data?.token);
    }

    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Registration failed';
    throw new Error(message);
  }
};

export const loginUser = async (userData: userDate) => {
  try {
    const { data } = await axios.post(
      `${envConfig.baseApi}/auth/login`,
      userData
    );

    if (data.success) {
      cookies().set("accessToken", data?.token);
    }

    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Login failed';
    throw new Error(message);
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      id: decodedToken?.id,
      name: decodedToken?.name,
      role: decodedToken?.role,
      email: decodedToken?.email,
      address: decodedToken?.address,
      isPremium: decodedToken?.isPremium,
      verified: decodedToken?.verified,
      phone: decodedToken?.phone,
      followers: decodedToken?.followers,
      following: decodedToken?.following,
      profileImage: decodedToken?.profileImage,
    };
  }

  return null;
};

const IMAGE_UPLOAD_LINK =
  "https://api.imgbb.com/1/upload?key=63e5e5d08878e2104d3082bebc10b603";

export const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append("image", file);

  try {
    const response = await axios.post(IMAGE_UPLOAD_LINK, formData);

    return response.data?.data?.url; // Return the uploaded image URL
  } catch (error) {
    throw new Error("Image upload failed");
  }
};
export const logout = () => {
  cookies().delete("accessToken");
};

export const userUpdatedData = async () => {
  const response = await axiosInstance.get(`/auth/me`);

  return response.data;
};
