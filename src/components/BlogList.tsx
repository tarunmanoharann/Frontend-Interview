import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface BlogListProps {
  onSelectBlog: (id: string) => void;
  selectedBlogId?: string;
  isCreating: boolean;
}

export function BlogList({ onSelectBlog, selectedBlogId, isCreating }: BlogListProps) {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  // Auto-select the first blog if none is selected and NOT creating
  useEffect(() => {
    if (!isCreating && !selectedBlogId && blogs && blogs.length > 0) {
      onSelectBlog(blogs[0].id);
    }
  }, [blogs, selectedBlogId, onSelectBlog, isCreating]);

  if (isLoading) return <div className="p-4 text-center">Loading blogs...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">Error loading blogs</div>;

  return (
    <div className="flex flex-col gap-4 p-4 min-h-full">
      <h2 className="text-xl font-bold mb-2">Latest Articles</h2>
      {blogs?.map((blog) => (
        <Card 
          key={blog.id} 
          className={`cursor-pointer hover:shadow-md transition-shadow ${selectedBlogId === blog.id ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}
          onClick={() => onSelectBlog(blog.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start mb-1">
               <div className="flex flex-wrap gap-1">
                {blog.category.map(cat => (
                  <span key={cat} className="text-[10px] font-bold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-full uppercase tracking-wider">
                    {cat}
                  </span>
                ))}
               </div>
               <span className="text-[10px] text-gray-400 shrink-0 ml-2">{new Date(blog.date).toLocaleDateString()}</span>
            </div>
            <CardTitle className="text-base font-bold">{blog.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-2 text-sm text-gray-500">{blog.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
