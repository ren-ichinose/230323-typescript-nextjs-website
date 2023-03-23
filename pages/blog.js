import matter from 'gray-matter';

const Blog = () => {
  return (
    <>
      <h1>Blog</h1>
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const blogs = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
      const value = values[index];
      const { data } = matter(value.default);
      return {
        frontmatter: data,
        slug,
      };
    });

    return data;
  })(require.context('../data', true, /\.md$/));
  
  return {
    props: {},
  };
}

// console.log('contextです', context);
// console.log('keysです', keys);
// console.log('valuesです', values);
// console.log('dataです', data);
