import { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { getAllPosts, getPostBySlug } from "../../utils/blog";
import { CSSProperties } from "react";

type ImageType = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export interface BlogPostProps {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    mainImage: ImageType;
    excerpt: string;
  };
  html: string;
}

const blogContainerStyle: CSSProperties | undefined = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 1.0875rem 1.45rem",
};

const BlogPost: NextPage<BlogPostProps> = (post) => {
  return (
    <>
      <Head>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.frontmatter.excerpt} />
      </Head>
      <>
        <Image
          src={post.frontmatter.mainImage.src}
          alt={post.frontmatter.mainImage.alt}
          width={post.frontmatter.mainImage.width}
          height={post.frontmatter.mainImage.height}
          layout="intrinsic"
        />
        <div style={blogContainerStyle}>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </>
    </>
  );
};

export default BlogPost;

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  return {
    props: {
      ...post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
