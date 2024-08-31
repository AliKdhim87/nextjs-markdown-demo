import matter from 'gray-matter'

import fs from 'fs'
import { join, basename } from 'node:path'
import { notFound } from 'next/navigation'

// Add markdown files in `src/content/blog`
const postsDirectory = join(process.cwd(),'src', 'content', 'blog')

export function getPostBySlug(slug: string) {
    const realSlug = basename(slug, '.md')
    const fullPath = join(postsDirectory, `${realSlug}.md`)
    // check if the file name exist
    if (!fs.existsSync(fullPath)) return notFound();
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return { slug: realSlug, frontmatter: { ...data }, content }
}

export function getAllPosts() {
    // validate if the directory is exist
    if (!fs.existsSync(postsDirectory)) return [];
    const slugs = fs.readdirSync(postsDirectory)
    const posts = slugs.map((slug) => getPostBySlug(slug))

    return posts
}