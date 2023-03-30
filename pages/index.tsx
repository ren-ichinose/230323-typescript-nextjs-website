import Link from 'next/link';
import Layout from '../components/Layout';
import Seo from '../components/seo';
// import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      <Seo
        title="Abe Hiroki"
        description="Abe Hirokiのポートフォリオサイトです"
      />
      <div>
        {/* <Image
          src="/images/index-hero.jpg"
          alt="hero"
          fill
          quality={90}
          priority
        /> */}
        <img src="/images/index-hero.jpg" alt="hero" />
        <div>
          <h1>I'm Ren Ichinose!</h1>
          <h3>TypeScript Developer</h3>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex' }}>
          <div>
            <h2>TypeScript Nerd</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div>
            {/* <Image
              src="/images/profile.jpg"
              alt="hero"
              fill
              sizes="(max-width: 800px) 100vw"
              quality={90}
              priority
            /> */}
            <img
              src="/images/profile.jpg"
              alt="hero"
              style={{ width: '500px' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', padding: '50PX' }}>
            <img
              src="/images/javascript.svg"
              alt="javascript"
              style={{ width: '100%' }}
            />
            <span>JavaScript / 10 years</span>
          </div>
          <div style={{ width: '25%', padding: '50PX' }}>
            <img
              src="/images/react.svg"
              alt="react"
              style={{ width: '100%' }}
            />
            <span>React / 5 years</span>
          </div>
          <div style={{ width: '25%', padding: '50PX' }}>
            <img
              src="/images/gatsby.svg"
              alt="gatsby"
              style={{ width: '100%' }}
            />
            <span>Gatsby / 3 years</span>
          </div>
          <div style={{ width: '25%', padding: '50PX' }}>
            <img src="/images/next.svg" alt="next" style={{ width: '100%' }} />
            <span>Next.JS / 3 years</span>
          </div>
        </div>
        <div>
          <Link href="/contact">Make It Happen!</Link>
        </div>
      </div>
    </Layout>
  );
}
