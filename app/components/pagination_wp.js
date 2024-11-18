import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, currentPage, updatePage }) => {
  // 総ページ数を計算
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // 最大5つのページ番号を表示するロジック
  const visiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // ページ変更のメソッド
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      updatePage(page);
    }
  };

  // 次のページ
  const nextPage = () => {
    if (currentPage < totalPages) {
      updatePage(currentPage + 1);
    }
  };

  // 前のページ
  const prevPage = () => {
    if (currentPage > 1) {
      updatePage(currentPage - 1);
    }
  };

  return (
    <div className="pagination">
      <button 
        onClick={prevPage} 
        disabled={currentPage === 1}
        className={currentPage === 1 ? 'disabled' : ''}
      >
        Previous
      </button>

      {/* ページ番号のボタン */}
      {visiblePages().map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={nextPage} 
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? 'disabled' : ''}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
