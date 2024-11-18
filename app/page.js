// app/page.js
import Link from 'next/link';
import Image from 'next/image';
import heroPic from '../public/images/pic1.jpg';

export default async function Index() {
  // データを取得
  const res = await fetch('https://ononama.sakura.ne.jp/sample/wp_rest_api_test/wp-json/wp/v2/posts', {
    next: { revalidate: 60 }, // ISR (インクリメンタル・スタティック・リジェネレーション) の設定
  });
  const posts = await res.json();

  return (
    <>
      <div>
        <div>
          <h1>nextテスト</h1>
        </div>
      </div>
      <div>
        <div>
          <div>
            <h2>トップページ</h2>
            <p>トップテキスト</p>
          </div>
          <div>
            <Image src={heroPic} alt="hero" />
          </div>
        </div>
        <div>
          <Link href="/contact">Make It Happen!</Link>
        </div>
      </div>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>
              id: {post.id}
              <br />
              slug: {post.slug}
              <br />
              title: {post.title.rendered}
              <br />
              contentTitle: <span dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </p>
            {post.acf?.main && (
              <div className="main">
                <p>メイン画像</p>
                <img src={post.acf.main} alt="Image" />
              </div>
            )}
            {post.acf?.txt && (
              <div className="txt">
                <p>{post.acf.txt}</p>
              </div>
            )}
            {console.log(post.acf?.loop)}
            {/* ACF 繰り返し */}
            {Array.isArray(post.acf?.loop) && post.acf.loop.length > 0 ? (
            post.acf.loop.map((item, index) => (
                <div key={index}>
                <h3>{item.txt}</h3>
                {item.img && <img src={item.img} alt="Image" />}
                </div>
            ))
            ) : (
            <p>No items available</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
