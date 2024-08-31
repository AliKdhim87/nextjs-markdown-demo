import Image from "next/image";

import { getPostBySlug } from "../../../utils/blog";
import { Metadata } from "next/types";
import Markdown from "react-markdown";

type GenerateMetadataProps = { params: { slug: string } };

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const slug = params.slug;

  const post = getPostBySlug(slug);

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

const BlogPost = ({ params }: { params: { slug: string } }) => {
  const post = getPostBySlug(params.slug);
  const image = post.frontmatter.mainImage;

  return (
    <>
      {image && image?.src && image?.alt && image?.width && image?.height && (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      )}
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <Markdown
        components={{
          img: (image) => {
            const match = image.alt?.match(/\{(\d+)x(\d+)\}/);
            const [width, height] = match ? match.slice(1) : [];
            const cleanAlt = image.alt?.replace(/\{(\d+)x(\d+)\}/g, "");

            return (
              image.src &&
              cleanAlt &&
              width &&
              height && (
                <Image
                  src={image.src}
                  alt={cleanAlt}
                  width={parseInt(width)}
                  height={parseInt(height)}
                />
              )
            );
          },
        }}
      >
        {post.content}
      </Markdown>
    </>
  );
};

export default BlogPost;
