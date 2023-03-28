import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { blogsPerPage, getAllBlogs } from '../utils/mdQueries';
import Pagination from '../components/pagination';

const Blog = ({ blogs, numberPages }) => {
  return (
    <Layout>
      <div>
        <div>
          <h1>Blog</h1>
          <p>エンジニアの日常生活をお届けします</p>
          {blogs.map(({ frontmatter, slug }) => {
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
        <Pagination numberPages={numberPages} />
      </div>
    </Layout>
  );
};

export default Blog;

export async function getStaticProps() {
  const { orderedBlogs, numberPages } = await getAllBlogs();
  const limitedBlogs = orderedBlogs.slice(0, blogsPerPage);

  return {
    props: { blogs: limitedBlogs, numberPages },
  };
}
