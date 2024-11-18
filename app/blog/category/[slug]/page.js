// app/blog/category/[slug]/page.js

'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Pagination from '../../../components/pagination_wp'; // Paginationコンポーネント
import CategoryList from '../../../components/categoryList'; // CategoryListコンポーネント

export default function CategoryPage({ params }) {
  const { slug } = params; // URLパラメータからslugを取得
  const [categoryId, setCategoryId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 1;

  // スラッグに基づいてカテゴリーIDを取得
  useEffect(() => {
    if (slug) {
      async function fetchCategoryId() {
        const res = await fetch(
          `https://ononama.sakura.ne.jp/sample/wp_rest_api_test/wp-json/wp/v2/categories?slug=${slug}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setCategoryId(data[0].id); // カテゴリーIDをセット
        } else {
          console.error('Category not found');
        }
      }
      fetchCategoryId();
    }
  }, [slug]);

  // カテゴリーIDに基づいて投稿をフェッチ
  useEffect(() => {
    if (categoryId) {
      async function fetchPostsByCategory() {
        const res = await fetch(
          `https://ononama.sakura.ne.jp/sample/wp_rest_api_test/wp-json/wp/v2/posts?categories=${categoryId}`
        );
        const data = await res.json();
        setPosts(data);
      }
      fetchPostsByCategory();
    }
  }, [categoryId]);

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
      <h1>{slug} の投稿一覧</h1>
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
