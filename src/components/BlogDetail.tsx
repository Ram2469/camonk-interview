import { Blog } from "../api/blogs";

interface Props {
  blog: Blog | null;
}

export default function BlogDetail({ blog }: Props) {
  if (!blog) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select an article to read
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <img
        src={blog.coverImage}
        className="w-full h-64 object-cover"
        alt={blog.title}
      />

      <div className="p-6">
        <p className="text-xs text-blue-600 font-semibold uppercase">
          {blog.category.join(" • ")}
        </p>

        <h1 className="text-2xl font-bold mt-2 text-gray-900">
          {blog.title}
        </h1>

        <div className="flex gap-6 text-sm text-gray-500 mt-3">
          <span>📅 {new Date(blog.date).toDateString()}</span>
          <span>⏱ 5 min read</span>
        </div>

        <p className="mt-6 text-gray-700 leading-relaxed">
          {blog.content}
        </p>
      </div>
    </div>
  );
}
