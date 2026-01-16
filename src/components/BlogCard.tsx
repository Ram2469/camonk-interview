import { Blog } from "../api/blogs";

interface Props {
  blog: Blog;
  onSelect: (blog: Blog) => void;
}

export default function BlogCard({ blog, onSelect }: Props) {
  return (
    <div
      onClick={() => onSelect(blog)}
      className="cursor-pointer rounded-xl border p-4 hover:shadow-md transition bg-white"
    >
      <p className="text-xs font-semibold text-blue-600 uppercase mb-1">
        {blog.category[0]}
      </p>
      <h3 className="font-semibold text-gray-900 leading-snug">
        {blog.title}
      </h3>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
        {blog.description}
      </p>
    </div>
  );
}
