import Image from 'next/image';
import Layout from '../../components/Layout';
import ReactMarkdown from 'react-markdown';
import { getAllBlogs, getSingleBlog } from '../../utils/mdQueries';
import PrevNext from '../../components/prevNext';
import Seo from '../../components/seo';
import { GetStaticPropsContext, NextPage } from 'next';
import { Blog } from '../../interfaces/interface';

interface Props {
  frontmatter: Blog['frontmatter'];
  markdownBody: string;
  prev: Blog;
  next: Blog;
}

const ShingleBlog: NextPage<Props> = ({
  frontmatter,
  markdownBody,
  prev,
  next,
}) => {
  const { title, date, excerpt } = frontmatter;
  return (
    <Layout>
      <Seo title={title} description={excerpt} />
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
  const { orderedBlogs }: { orderedBlogs: Blog[] } = await getAllBlogs();
  const paths = orderedBlogs.map(({ slug }: Blog) => `/blog/${slug}`);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
): Promise<any> {
  const { singleDocument, prev, next } = await getSingleBlog(context);
  const { data, content }: any = singleDocument;
  return {
    props: {
      frontmatter: data,
      markdownBody: content,
      prev,
      next,
    },
  };
}
