"use client";
import PostCard from "@/src/components/post/PostCard";
import { useGetMyPostsQuery } from "@/src/redux/features/post";
import { IPost } from "@/src/types";

interface SingleUserPostProps {
  params: {
    userId: string;
  };
}

const SingleUserPost: React.FC<SingleUserPostProps> = ({ params }) => {
  const id = params.userId;
  const { data } = useGetMyPostsQuery(id);
  const posts = data?.data;

  return (
    <div className="space-y-3">
      {posts?.map((post: IPost) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default SingleUserPost;
