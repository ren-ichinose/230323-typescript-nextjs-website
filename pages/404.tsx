import { NextPage } from 'next';
import Layout from '../components/Layout';
import Seo from '../components/seo';

const NotFoundPage: NextPage = () => {
  return (
    <Layout>
      <Seo title="ページが見つかりません" description="これは404ページです" />
      <div style={{ textAlign: 'center', height: '70vh' }}>
        <h1>401:NotFoundPage</h1>
        <p>ページが見つかりません</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
