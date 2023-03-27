import Image from 'next/image';
import Layout from '../../components/Layout';
import ReactMarkdown from 'react-markdown';
import { getAllBlogs, getSingleBlog } from '../../utils/mdQueries';
import PrevNext from '../../components/prevNext';

const ShingleBlog = ({ frontmatter, markdownBody, prev, next }) => {
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
        <PrevNext prev={prev} next={next} />
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
  const { singleDocument, prev, next } = await getSingleBlog(context);
  const { data, content } = singleDocument;
  return {
    props: {
      frontmatter: data,
      markdownBody: content,
      prev,
      next,
    },
  };
}
