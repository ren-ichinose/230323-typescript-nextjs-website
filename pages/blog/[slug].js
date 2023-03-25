import matter from 'gray-matter';

const ShingleBlog = ({ frontmatter, markdownBody }) => {
  return <h1>記事ページ</h1>;
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
