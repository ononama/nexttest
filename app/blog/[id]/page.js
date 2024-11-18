import PrevNext from '../../components/prevNext';


async function fetchPostData(id) {
  const post = await fetch(`https://ononama.sakura.ne.jp/sample/wp_rest_api_test/wp-json/wp/v2/posts/${id}`).then(res => res.json());
  return post;
}

async function fetchAllPosts() {
  const allPosts = await fetch('https://ononama.sakura.ne.jp/sample/wp_rest_api_test/wp-json/wp/v2/posts').then(res => res.json());
  return allPosts;
}

export default async function BlogPost({ params }) {
  const post = await fetchPostData(params.id);
  const allPosts = await fetchAllPosts();

  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>

      {post.acf && (
        <div>
          <h3>{post.acf.txt}</h3>
          <img src={post.acf.main} alt="Custom Image" />
        </div>
      )}

        {Array.isArray(post.acf?.loop) && post.acf.loop.length > 0 ? (
        post.acf.loop.map((item, index) => (
            <div key={index}>
            <h3>{item.txt}</h3>
            {item.img && <img src={item.img} alt="Image" />}
            </div>
        ))
        ) : (
        <p>No loop data available.</p> // loop が配列でない場合のフォールバック
        )}

      <PrevNext previousPost={previousPost} nextPost={nextPost} />
    </div>
  );
}

export async function generateMetadata({ params }) {
  const post = await fetch(`https://ononama.sakura.ne.jp/sample/wp_rest_api_test/wp-json/wp/v2/posts/${params.id}`).then(res => res.json());
  return {
    title: post.title.rendered,
    description: post.excerpt.rendered,
  };
}
