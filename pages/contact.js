import Layout from '../components/Layout'
import Seo from '../components/seo';

const Contact = () => {
  return (
    <Layout>
      <Seo title="問い合わせ" description="これは問い合わせページです" />
      <div>
        <div>
          <h1>Contact</h1>
          <p>お気軽にご連絡ください</p>
          <form action="https://formspree.io/f/xxxxx" method="POST">
            <div>
              <label htmlFor="name">お名前</label>
              <input type="text" name="name" id="name" required />
            </div>
            <div>
              <label htmlFor="email">メールアドレス</label>
              <input type="email" name="email" id="email" required />
            </div>
            <div>
              <label htmlFor="textarea">ご用件</label>
              <textarea
                name="message"
                rows="10"
                id="textarea"
                required
              ></textarea>
            </div>
            <button type="submit">送信</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
