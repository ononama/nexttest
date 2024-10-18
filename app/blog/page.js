
import Link from 'next/link'   // 追加
import Image from 'next/image'  // 追加
import fs from "fs"       // 追加
import path from "path"  // 追加
import matter from "gray-matter"   // 追加

async function getAllBlogs() {
    const files = fs.readdirSync(path.join("data"))
    const blogs = files.map((fileName) => {
      
        const slug = fileName.replace(".md", "")    // 追加
        const fileData = fs.readFileSync(
            path.join("data", fileName),
            "utf-8"
        )
        console.log(fileData)  // 削除
        // ⬇追加
        const { data } = matter(fileData) 
        return {
            frontmatter: data,
            slug: slug,
        }
        // ⬆追加
    })
    const orderedBlogs = blogs.sort((a, b) => {
      return b.frontmatter.id - a.frontmatter.id
    })
    // ⬇追加  
    return{
      blogs: orderedBlogs
    }
    // ⬆追加
}

const Blog = async() => {

    const { blogs } = await getAllBlogs() // 追加
                     // 追加
    return (
      
      <div>
        <h1>ブログページ</h1>
          {blogs.map((blog, index) => 
              <div>
                <div key={index}>
                    <h2>{blog.frontmatter.title}</h2>
                    <p>{blog.frontmatter.date}</p>
                    <Link href={`/blog/${blog.slug}`}>Read More</Link>
                </div>
                <div>
                  <Image src={blog.frontmatter.image} alt="card-image" height={300} width={1000} quality={90} priority={true} />
                </div>
              </div>
          )}  
      </div>

    )
}

export default Blog