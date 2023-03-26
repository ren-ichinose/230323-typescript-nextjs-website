import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

const Blog = ({ Blogs }) => {
  return (
    <>
      <div>
        <div>
          <h1>Blog</h1>
          <p>エンジニアの日常生活をお届けします</p>
          {Blogs.map(({ frontmatter, slug }) => {
            return (
              <div key={slug}>
                <div>
                  <h3>{frontmatter.title}</h3>
                  <p>{frontmatter.excerpt}</p>
                  <p>{frontmatter.date}</p>
                  <Link href={`/blog/${slug}`}>Read More</Link>
                </div>
                <div>
                  <Image
                    src={frontmatter.image}
                    alt="card-image"
                    height={300}
                    width={520}
                    quality={90}
                    priority
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
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

  const orderedBlogs = blogs.sort((a, b) => {
    return b.frontmatter.id - a.frontmatter.id;
  });
  return {
    props: { Blogs: orderedBlogs },
  };
}
