import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import { getAllBlogs, blogsPerPage } from '../../../utils/mdQueries';
import Pagination from '../../../components/pagination';

const PaginationPage = ({ blogs, numberPages }) => {
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

export default PaginationPage;

export async function getStaticPaths() {
  const { numberPages } = await getAllBlogs();

  const paths =
    numberPages > 1
      ? Array.from({ length: numberPages - 1 }, (_, i) => `/blog/page/${i + 2}`)
      : [];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { orderedBlogs, numberPages } = await getAllBlogs();
  const currentPage = context.params.pagination;
  const limitedBlogs = orderedBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );
  return {
    props: {
      blogs: limitedBlogs,
      numberPages: numberPages,
    },
  };
}
