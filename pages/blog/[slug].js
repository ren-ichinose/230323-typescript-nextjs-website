const ShingleBlog = () => {
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
