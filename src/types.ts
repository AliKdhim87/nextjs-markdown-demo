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
    content: string;
  }