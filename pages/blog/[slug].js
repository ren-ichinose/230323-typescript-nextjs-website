import Image from 'next/image';
import Layout from '../../components/Layout';
import ReactMarkdown from 'react-markdown';
import { getAllBlogs, getSingleBlog } from '../../utils/mdQueries';

const ShingleBlog = ({ frontmatter, markdownBody }) => {
  const { title, date } = frontmatter;
  return (
    <Layout>
      <div>
        <Image
          src={frontmatter.image}
          alt="blog-image"
          height={500}
          width={1000}
          priority
        />
      </div>
      <div>
        <div>
          <h1>{title}</h1>
          <p>{date}</p>
          <ReactMarkdown>{markdownBody}</ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};

export default ShingleBlog;

export async function getStaticPaths() {
  const { orderedBlogs } = await getAllBlogs();
  const paths = orderedBlogs.map(({ slug }) => `/blog/${slug}`);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { singleDocument } = await getSingleBlog(context);
  const { data, content } = singleDocument;
  return {
    props: {
      frontmatter: data,
      markdownBody: content,
    },
  };
}
