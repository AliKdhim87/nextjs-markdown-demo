import Link from "next/link";

import { getAllPosts } from "../utils/blog";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Blog post website",
  description: "This is a blog post website built with Next.js",
};

const Home = () => {
  const posts = getAllPosts();

  return (
    <>
      <h1>Welcome to my Blog post</h1>
      <div className="blog-post">
        {Array.isArray(posts) &&
          posts.map((post, index) => (
            <Link
              href={`/blog/${post.slug}`}
              className="blog-post__card"
              key={index}
            >
              <h2>{post.frontmatter.title}</h2>
              <p>{post.frontmatter.excerpt}</p>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;
