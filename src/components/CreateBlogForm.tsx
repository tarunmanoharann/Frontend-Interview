import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog, CreateBlogDto } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface CreateBlogFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateBlogForm({ onSuccess, onCancel }: CreateBlogFormProps) {
  const [formData, setFormData] = useState<Partial<CreateBlogDto>>({
    title: '',
    description: '',
    coverImage: '',
    content: '',
  });
  const [categoriesInput, setCategoriesInput] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      onSuccess();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categories = categoriesInput.split(',').map(c => c.trim()).filter(Boolean);
    
    mutation.mutate({
      title: formData.title!,
      category: categories.length ? categories : ['GENERAL'],
      description: formData.description!,
      coverImage: formData.coverImage || 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg',
      content: formData.content!,
      date: new Date().toISOString(),
    } as CreateBlogDto);
  };

  return (
    <div className="min-h-full p-8 flex items-center justify-center">
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl text-blue-900">Create New Article</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Title</label>
                <Input 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Enter blog title"
                className="focus-visible:ring-blue-500"
                />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">Categories</label>
                    <Input 
                    value={categoriesInput}
                    onChange={e => setCategoriesInput(e.target.value)}
                    placeholder="e.g. FINANCE, TECH"
                    className="focus-visible:ring-blue-500"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Comma separated values</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">Cover Image URL</label>
                    <Input 
                    value={formData.coverImage}
                    onChange={e => setFormData({...formData, coverImage: e.target.value})}
                    placeholder="https://..."
                    className="focus-visible:ring-blue-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Description</label>
                <Input 
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Short description for the card preview"
                className="focus-visible:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Content</label>
                <textarea
                required
                className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                placeholder="Write your full article content here..."
                />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t bg-gray-50 py-4">
          <Button type="button" variant="outline" onClick={onCancel} className="hover:bg-gray-200">Cancel</Button>
          <Button type="submit" disabled={mutation.isPending} className="bg-blue-600 hover:bg-blue-700 min-w-[120px]">
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mutation.isPending ? 'Publishing...' : 'Publish Article'}
          </Button>
        </CardFooter>
      </form>
    </Card>
    </div>
  );
}
