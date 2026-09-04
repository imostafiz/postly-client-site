"use client";
import React from "react";

import PostCard from "./PostCard";

import { IPost } from "@/src/types";
import CardSkeleton from "@/src/skeleton/CardSkeleton";

// eslint-disable-next-line prettier/prettier
const UserPost = ({ posts, isLoading }:any) => {
  if (isLoading) return <CardSkeleton/>;

  return (
    <div className="space-y-3">
      {posts?.length > 0 ? (
        // eslint-disable-next-line prettier/prettier
        posts.map((post:IPost) => <PostCard key={post.id} post={post} />)
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default UserPost;
