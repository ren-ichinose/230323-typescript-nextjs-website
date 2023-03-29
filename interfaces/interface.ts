export interface Blog {
  frontmatter: {
    id: number;
    uid: number;
    title: string;
    date: string;
    image: string;
    excerpt: string;
  };
  slug: string;
}
