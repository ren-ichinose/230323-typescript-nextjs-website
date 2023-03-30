import Link from 'next/link';

const PrevNext = ({ prev, next }) => {
  return (
    <div style={{ display: 'flex' }}>
      {prev && (
        <Link href={`/blog/${prev.slug}`} style={{ display: 'flex' }}>
          <img src="/images/arrow-left.svg" alt="arrow-left" />
          <h3>前の記事</h3>
        </Link>
      )}
      {next && (
        <Link href={`/blog/${next.slug}`} style={{ display: 'flex' }}>
          <h3>次の記事</h3>
          <img src="/images/arrow-right.svg" alt="arrow-right" />
        </Link>
      )}
    </div>
  );
};

export default PrevNext;
