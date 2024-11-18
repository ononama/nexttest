'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch(
        'https://ononama.sakura.ne.jp/sample/wp_rest_api_test/wp-json/wp/v2/categories'
      );
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>カテゴリー</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
