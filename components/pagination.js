import Link from "next/link";

const Pagination = ({ numberPages }) => {
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

export default Pagination