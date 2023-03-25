import matter from 'gray-matter';
import Link from 'next/link';

const Blog = ({ blogs }) => {
  return (
    <>
      <h1>Blog</h1>
      {blogs.map(({ frontmatter, slug }) => {
        return (
          <div key={slug}>
            <h3>{frontmatter.title}</h3>
            <p>{frontmatter.date}</p>
            <Link href={`/blog/${slug}`}>Read More</Link>
          </div>
        );
      })}
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const blogs = ((context) => {
    const keys = context.keys();
    // const values = keys.map(context);

    const data = keys.map((key) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
      // const value = values[index];
      const value = context(key);
      const { data } = matter(value.default);

      return {
        frontmatter: data,
        slug,
      };
    });

    return data;
  })(require.context('../data', true, /\.md$/));

  return {
    props: { blogs },
  };
}
