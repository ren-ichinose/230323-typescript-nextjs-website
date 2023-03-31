import { getAllBlogs, getSingleBlog } from '../../utils/mdQueries';
import { GetStaticPropsContext, NextPage } from 'next';
import { Blog } from '../../interfaces/interface';
import PrevNext from '../../components/prevNext';
import Layout from '../../components/Layout';
import ReactMarkdown from 'react-markdown';
import Seo from '../../components/seo';
import Image from 'next/image';

interface Props {
  frontmatter: Blog['frontmatter'];
  markdownBody: string;
  prev: Blog | null;
  next: Blog | null;
}

interface getStaticPaths {
  paths: string[];
  fallback: boolean;
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

export async function getStaticPaths(): Promise<getStaticPaths> {
  const { orderedBlogs }: { orderedBlogs: Blog[] } = await getAllBlogs();
  const paths = orderedBlogs.map(({ slug }: Blog) => `/blog/${slug}`);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
): Promise<{ props: Props }> {
  const { singleDocument, prev, next } = await getSingleBlog(context);
  const { data, content } = singleDocument;
  return {
    props: {
      frontmatter: data as Blog['frontmatter'],
      markdownBody: content,
      prev,
      next,
    },
  };
}
