"use client";
import PostCard from "@/src/components/post/PostCard";
import { useGetMyPostsQuery } from "@/src/redux/features/post";
import { IPost } from "@/src/types";

// Define the type for the component props
interface SingleUserPostProps {
  params: {
    userId: string; // Adjust the type if userId is not a string
  };
}

const SingleUserPost: React.FC<SingleUserPostProps> = ({ params }) => {
  const id = params.userId; // Access userId from params
  const { data } = useGetMyPostsQuery(id); // Fetch posts for the given userId
  const posts = data?.data; // Extract posts from data

  return (
    <div>
      {posts?.map((post: IPost) => (
        <PostCard key={post.id} post={post} /> // Render each post using PostCard component
      ))}
    </div>
  );
};

export default SingleUserPost;
