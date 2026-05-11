"use client";

import { useArticles } from "@/hooks/useArticles";

export default function Home() {
  const { data: articles, isLoading, isError } = useArticles();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      
      {isLoading && <p>Loading articles...</p>}
      {isError && <p className="text-red-500">Failed to load articles. Make sure backend is running.</p>}
      
      {!isLoading && !isError && articles && articles.length === 0 && (
        <p>No articles found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles?.map((article) => (
          <div key={article.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-600 mt-2">{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
