import Link from 'next/link';
import { FC } from 'react';

interface Props {
  numberPages: number;
}

const Pagination: FC<Props> = ({ numberPages }) => {
  return (
    <h2>
      {Array.from({ length: numberPages }, (_, i) => (
        <Link key={i + 1} href={i === 0 ? `/blog` : `/blog/page/${i + 1}`}>
          {i + 1}
        </Link>
      ))}
    </h2>
  );
};

export default Pagination;
