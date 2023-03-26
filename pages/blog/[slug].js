import Image from 'next/image';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

const ShingleBlog = ({ frontmatter, markdownBody }) => {
  const { title, date } = frontmatter;
  return (
    <>
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
    </>
  );
};

export default ShingleBlog;

export async function getStaticPaths() {
  const paths = ((context) => {
    const keys = context.keys();

    const generateBlogPaths = keys.map((key) => {
      const slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
      const path = `/blog/${slug}`;
      return path;
    });

    return generateBlogPaths;
  })(require.context('../../data', true, /\.md$/));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const blogData = await import(`../../data/${slug}.md`);
  const { data, content } = matter(blogData.default);
  return {
    props: {
      frontmatter: data,
      markdownBody: content,
    },
  };
}
