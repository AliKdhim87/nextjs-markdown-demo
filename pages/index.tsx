import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import styles from "../styles/Home.module.css"
import { getAllPosts } from "../utils/blog"
import { BlogPostProps } from "./blog/[slug]"

interface HomePageProps {
  posts?: BlogPostProps[]
}

const Home: NextPage<HomePageProps> = ({ posts }) => (
  <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Blog post</h1>
      <div className={styles.grid}>
        {posts?.map((post, index) => (
          <Link href={`/blog/${post.slug}`} passHref key={index}>
            <a className={styles.card}>
              <h2>{post.frontmatter.title}</h2>
              <p>{post.frontmatter.excerpt}</p>
            </a>
          </Link>
        ))}
      </div>
    </main>

    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </div>
)

export default Home

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: {
      posts,
    },
  }
}
