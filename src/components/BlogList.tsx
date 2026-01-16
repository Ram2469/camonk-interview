import { Blog } from "../api/blogs";
import BlogCard from "./BlogCard";

interface Props {
  blogs: Blog[];
  onSelect: (blog: Blog) => void;
}

export default function BlogList({ blogs, onSelect }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg">Latest Articles</h2>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} onSelect={onSelect} />
      ))}
    </div>
  );
}
