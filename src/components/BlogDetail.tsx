import { useQuery } from '@tanstack/react-query';
import { getBlogById } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Share2, ThumbsUp, MessageSquare } from 'lucide-react';

interface BlogDetailProps {
  blogId: string | null;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => getBlogById(blogId!),
    enabled: !!blogId,
  });

  if (!blogId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-gray-50/50">
        <div className="text-center p-8 max-w-md">
           <h3 className="text-lg font-medium text-gray-900 mb-2">Select an article to read</h3>
           <p>Choose from the list on the left to view full details here.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="p-8 text-center">Loading article...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">Error loading article</div>;
  if (!blog) return null;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto bg-white min-h-full">
      <div className="mb-8 rounded-xl overflow-hidden shadow-lg h-64 md:h-[400px] w-full relative group">
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <h1 className="text-white text-3xl font-bold">{blog.title}</h1>
        </div>
      </div>

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-blue-600">
            {blog.category.map((cat, i) => (
                <span key={cat} className="uppercase">
                {cat}{i < blog.category.length - 1 ? ' • ' : ''}
                </span>
            ))}
            <span className="text-gray-300 mx-2">•</span>
            <span className="text-gray-500 font-normal">5 min read</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl leading-tight">{blog.title}</h1>

            <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
                <Share2 className="w-4 h-4 mr-2" /> Share Article
            </Button>
        </div>

        <div className="grid grid-cols-3 border-y py-6 bg-gray-50 rounded-xl">
           <div className="text-center border-r border-gray-200">
             <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Category</div>
             <div className="font-semibold text-gray-900">{blog.category[0]}</div>
           </div>
           <div className="text-center border-r border-gray-200">
             <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Read Time</div>
             <div className="font-semibold text-gray-900">5 Mins</div>
           </div>
           <div className="text-center">
             <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Date</div>
             <div className="font-semibold text-gray-900">{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
           </div>
        </div>

        <div className="prose prose-lg prose-blue max-w-none text-gray-700">
          <p className="lead text-xl text-gray-600 font-medium italic border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
            {blog.description}
          </p>
          <div className="mt-8 whitespace-pre-wrap leading-relaxed font-serif text-lg">
            {blog.content}
          </div>
        </div>
        
        {/* Footer with author and interactions */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white shadow-md">
                     {/* Placeholder avatar */}
                     <img src="https://github.com/shadcn.png" alt="Author" className="w-full h-full object-cover" />
                </div>
                <div>
                    <div className="text-sm font-bold text-gray-900">Written by Arjun Mehta</div>
                    <div className="text-xs text-gray-500">Senior Financial Analyst</div>
                </div>
            </div>
            <div className="flex gap-6 text-gray-400">
                <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="text-xs font-medium">Like</span>
                </div>
                <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-xs font-medium">Comment</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
