import axios from "axios";

import { envConfig } from "@/src/config/envConfig";
import { IPost } from "@/src/types";

const BASE_URL = envConfig.baseApi || "http://localhost:5000/api";

//create a post
// eslint-disable-next-line prettier/prettier
export const createPost = async (data:any) => {
  const res = await axios.post(`${BASE_URL}/post`, data);

  return res.data;
};

//get all post
export const getPosts = async () => {
  const res = await fetch(`${BASE_URL}/post`, { cache: "no-store" });

  return res.json();
};

//edit my psot
export const updatePost = async (id: string, updateData: Partial<IPost>) => {
  const res = await axios.patch(`${BASE_URL}/post/${id}`, updateData, {
    headers: {
      "Cache-Control": "no-store",
    },
  });

  return res.data;
};

//deletePost
export const deletePost = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/post/${id}`, {
    headers: {
      "Cache-Control": "no-store",
    },
  });

  return res.data;
};

export const addLike = async (userId: string, postId: string) => {
  const res = await axios.post(
    `${BASE_URL}/likes`,
    {
      userId,
      postId,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );

  return res.data;
};

export const disLike = async (userId: string, postId: string) => {
  const res = await axios.post(
    `${BASE_URL}/dislikes`,
    {
      userId,
      postId,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );

  return res.data;
};
