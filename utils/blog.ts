import matter from 'gray-matter'
import { marked } from "marked"
import sanitizeHtml from 'sanitize-html';

import fs from 'fs'
import { join, basename } from 'path'

// Add markdown files in `content/blog`
const postsDirectory = join(process.cwd(), 'content', 'blog')

export function getPostBySlug(slug: string) {
    const realSlug = basename(slug, '.md')
    const fullPath = join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const html = marked(sanitizeHtml(content))
    return { slug: realSlug, frontmatter: { ...data }, html }
}

export function getAllPosts() {
    const slugs = fs.readdirSync(postsDirectory)
    const posts = slugs.map((slug) => getPostBySlug(slug))

    return posts
}