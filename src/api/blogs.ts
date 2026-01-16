export interface Blog {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

const API_URL = "http://localhost:3001/blogs";

export const getBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getBlogById = async (id: number): Promise<Blog> => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const createBlog = async (blog: Omit<Blog, "id">) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  return res.json();
};

export async function deleteBlog(id: number) {
  const res = await fetch(`http://localhost:3001/blogs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete blog");
  }
}
