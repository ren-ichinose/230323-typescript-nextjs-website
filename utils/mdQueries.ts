import matter from 'gray-matter';
import { GetStaticPropsContext } from 'next';
import { Blog } from '../interfaces/interface';

export const blogsPerPage = 5;

interface getAllBlogsResult {
  orderedBlogs: Blog[];
  numberPages: number;
}

interface SingleBlog {
  singleDocument: matter.GrayMatterFile<string>;
  prev: Blog | null;
  next: Blog | null;
}

export async function getAllBlogs(): Promise<getAllBlogsResult> {
  const blogs = ((context) => {
    const keys = context.keys();
    const data = keys.map((key) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
      const value = context(key);
      const { data } = matter(value.default);
      return {
        frontmatter: data as Blog['frontmatter'],
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

export async function getSingleBlog(
  context: GetStaticPropsContext<{ slug: string }>
): Promise<SingleBlog> {
  // 下記のコードはTypeScriptの場合、undefindになる可能性がある為、エラーが発生する。
  // const { slug } = context.params;

  const slug = context.params?.slug;
  const blogData = await import(`../data/${slug}.md`);
  const singleDocument = matter(blogData.default);
  const { orderedBlogs } = await getAllBlogs();

  const prev = orderedBlogs.filter((_, index, array) => {
    return (
      index !== 0 && singleDocument.data.id === array[index - 1].frontmatter.id
    );
  });
  const next = orderedBlogs.filter((_, index, array) => {
    return (
      index !== array.length - 1 &&
      singleDocument.data.id === array[index + 1].frontmatter.id
    );
  });

  return {
    singleDocument,
    prev: prev[0] || null,
    next: next[0] || null,
  };
}
