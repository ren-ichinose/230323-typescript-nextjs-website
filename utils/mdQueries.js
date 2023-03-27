import matter from 'gray-matter';

export const blogsPerPage = 5;

export async function getAllBlogs() {
  const blogs = ((context) => {
    const keys = context.keys();
    const data = keys.map((key) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
      const value = context(key);
      const { data } = matter(value.default);
      return {
        frontmatter: data,
        slug,
      };
    });
    return data;
  })(require.context('../data', true, /\.md$/));

  const orderedBlogs = blogs.sort((a, b) => {
    return b.frontmatter.id - a.frontmatter.id;
  });

  const numberPages = Math.ceil(orderedBlogs.length / blogsPerPage);

  return {
    orderedBlogs: JSON.parse(JSON.stringify(orderedBlogs)),
    numberPages: numberPages,
  };
}

export async function getSingleBlog(context) {
  const { slug } = context.params;
  const blogData = await import(`../data/${slug}.md`);
  const singleDocument = matter(blogData.default);

  return {
    singleDocument,
  };
}
