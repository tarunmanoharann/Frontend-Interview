import axios from 'axios';

export interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

export type CreateBlogDto = Omit<Blog, 'id'>;

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await api.get('/blogs');
  return response.data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blog: CreateBlogDto): Promise<Blog> => {
  const response = await api.post('/blogs', blog);
  return response.data;
};
