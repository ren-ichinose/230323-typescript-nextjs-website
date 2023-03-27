import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={50} height={50} />
          </Link>
          <ul>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
