import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogs } from '../utils/mdQueries';

const Blog = ({ Blogs }) => {
  return (
    <Layout >
      <div>
        <div>
          <h1>Blog</h1>
          <p>エンジニアの日常生活をお届けします</p>
          {Blogs.map(({ frontmatter, slug }) => {
            return (
              <div key={slug} style={{ display: 'flex' }}>
                <div>
                  <Image
                    src={frontmatter.image}
                    alt="card-image"
                    height={250}
                    width={420}
                    quality={90}
                    priority
                  />
                </div>
                <div>
                  <h3>{frontmatter.title}</h3>
                  <p>{frontmatter.excerpt}</p>
                  <p>{frontmatter.date}</p>
                  <Link href={`/blog/${slug}`}>Read More</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

export async function getStaticProps() {
  const { orderedBlogs } = await getAllBlogs();
  
  return {
    props: { Blogs: orderedBlogs },
  };
}
