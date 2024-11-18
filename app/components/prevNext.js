"use client"; // クライアントコンポーネントとして明示

import Link from 'next/link';

export default function PrevNext({ previousPost, nextPost }) {
  return (
    <div className="pagination-links">
      {/* 前の投稿へのリンク */}
      {previousPost && (
        <Link href={`/blog/${previousPost.id}`}>
          ← {previousPost.title.rendered}
        </Link>
      )}

      {/* 次の投稿へのリンク */}
      {nextPost && (
        <Link href={`/blog/${nextPost.id}`}>
          {nextPost.title.rendered} →
        </Link>
      )}

      <style jsx>{`
        .pagination-links {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
