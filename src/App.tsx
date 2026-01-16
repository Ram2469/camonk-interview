import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogs, createBlog, Blog } from "./api/blogs";
import { deleteBlog } from "./api/blogs";

export default function App() {
  const [selected, setSelected] = useState<Blog | null>(null);
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteMutation = useMutation({
  mutationFn: deleteBlog,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["blogs"] });
    setSelected(null); // clear selected blog
  },
});


  if (isLoading) {
    return <div className="p-10 text-center">Loading blogs...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <h1 className="text-3xl font-bold">CA Monk Blog</h1>
          <p className="text-gray-500 mt-2">
            Stay updated with the latest trends in finance and technology
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <aside className="space-y-4">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
            onClick={() =>
              mutation.mutate({
                title: "New Blog",
                description: "Demo description",
                content:
                  "This is full blog content. Replace it with actual content.",
                category: ["TECH"],
                coverImage:
                  "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
                date: new Date().toISOString(),
              })
            }
          >
            + Create Blog
          </button>

          <h2 className="font-semibold text-lg mt-6">Latest Articles</h2>

          {data.map((blog) => (
            <div
              key={blog.id}
              onClick={() => setSelected(blog)}
              className={`cursor-pointer rounded-xl border p-4 bg-white hover:shadow-md transition ${
                selected?.id === blog.id ? "border-blue-600" : ""
              }`}
            >
              <p className="text-xs text-blue-600 font-semibold uppercase">
                {blog.category[0]}
              </p>
              <h3 className="font-semibold text-gray-900 mt-1">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {blog.description}
              </p>
            </div>
          ))}
        </aside>

        {/* RIGHT */}
        <section className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <img
                src={selected.coverImage}
                className="w-full h-72 object-cover"
                alt={selected.title}
              />

              <div className="p-8">
                <p className="text-xs font-semibold text-blue-600 uppercase">
                  {selected.category.join(" • ")}
                </p>

                <h1 className="text-3xl font-bold mt-2 text-gray-900">
                  {selected.title}
                </h1>

                <div className="flex gap-6 text-sm text-gray-500 mt-3">
                  <span>
                    {new Date(selected.date).toDateString()}
                  </span>
                  <span>5 min read</span>
                </div>

                <p className="mt-6 text-gray-700 leading-relaxed">
                  {selected.content}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-10 text-center text-gray-400">
              Select an article to read
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
