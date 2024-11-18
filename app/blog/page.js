

'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Pagination from '../components/pagination_wp'; // Paginationコンポーネント
import CategoryList from '../components/categoryList'; // CategoryListコンポーネント

export default function BlogPage() {
  // ステート定義
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 1;

  // データをフェッチ
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('https://ononama.sakura.ne.jp/sample/wp_rest_api_test/wp-json/wp/v2/posts');
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  // 総投稿数
  const totalPosts = posts.length;

  // ページネーションによる表示投稿
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    return posts.slice(start, end);
  }, [posts, currentPage, postsPerPage]);

  // ページ変更ハンドラー
  const updatePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>ブログ一覧</h1>
      <div className="catL">
        <CategoryList />
      </div>
      {/* 投稿のリストを表示 */}
      {paginatedPosts.map((post) => (
        <div key={post.id}>
          <Link href={`/blog/${post.id}`}>
            <p>{post.title.rendered}</p>
          </Link>
          {post.acf?.main && (
            <div className="main">
              <img src={post.acf.main} alt="Image" />
            </div>
          )}
        </div>
      ))}
      {/* Paginationコンポーネント */}
      <Pagination
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        updatePage={updatePage}
      />
    </div>
  );
}
