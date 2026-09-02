"use client";

import { useGetUser } from "@/src/hooks/auth.hooks";
import { useGetMyFavoritePostQuery } from "@/src/redux/features/post";

const FavoritePostPage = () => {
  const { data } = useGetUser();
  const userId = data?.data?.id;

  const { data: postData } = useGetMyFavoritePostQuery(userId);
  const posts = postData?.data;

  return (
    <div>
      {posts?.length > 0 ? (
        // eslint-disable-next-line prettier/prettier
        posts.map((post: any) => (
          <div
            key={post.id}
            className='max-w-md mx-auto my-4 border  bg-black rounded-lg shadow-md overflow-hidden'
          >
            {/* Post Image */}
            {post?.post?.image?.length > 0 && (
              <img
                alt={post?.post?.title}
                className='w-full h-48 object-cover'
                src={post.post.image[0]}
              />
            )}

            {/* Post Title */}
            <div className='p-4'>
              <h2 className='text-xl font-semibold text-white'>
                {post?.post?.title}
              </h2>
              <p className='text-gray-300'>{post?.post?.content}</p>

              {/* Post Metadata */}
              <div className='mt-4 flex justify-between items-center text-sm text-gray-200'>
                <span>Category: {post?.post?.category}</span>
                <span>Likes: {post?.post?.likes?.length}</span>
              </div>

              {/* Post Comments */}
              <div className='mt-2 text-gray-200'>
                <span>Comments: {post?.post?.comments?.length}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>You have no favorite post.</p>
      )}
    </div>
  );
};

export default FavoritePostPage;
