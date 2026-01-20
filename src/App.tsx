import { useState } from 'react';
import { BlogList } from '@/components/BlogList';
import { BlogDetail } from '@/components/BlogDetail';
import { CreateBlogForm } from '@/components/CreateBlogForm';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PlusCircle, Newspaper } from 'lucide-react';

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSelectBlog = (id: string) => {
    setSelectedBlogId(id);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setSelectedBlogId(null);
  };

  const handleCreateSuccess = () => {
    setIsCreating(false);
    setSelectedBlogId(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white  px-6 py-3 grid grid-cols-[auto_1fr_auto] items-center shadow-sm shrink-0 gap-4 h-16">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
            <div className="bg-black text-white p-1.5 rounded-md">
                <Newspaper className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">CA MONK</span>
        </div>

        {/* Navigation - Centered */}
        <nav className="hidden md:flex justify-center gap-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Tools</a>
            <a href="#" className="hover:text-black transition-colors">Practice</a>
            <a href="#" className="hover:text-black transition-colors">Events</a>
            <a href="#" className="hover:text-black transition-colors">Job Board</a>
            <a href="#" className="hover:text-black transition-colors">Points</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
            <Button onClick={handleCreateNew} size="sm" className={`bg-blue-600 hover:bg-blue-700 ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isCreating}>
                <PlusCircle className="w-4 h-4 mr-2" />
                New Article
            </Button>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-blue-700 transition-colors">
                CA
            </div>
        </div>
      </header>

      {/* Hero Section */}
      {!isCreating && (
        <div className="bg-white py-16 text-center  shadow-xm  ">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">CA Monk Blog</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto px-6">
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex items-start max-w-[1600px] mx-auto w-full">
        {/* Left Panel */}
        <aside className="hidden md:block sticky top-16 w-full md:w-[400px] lg:w-[450px] border-r bg-white h-[calc(100vh-4rem)] overflow-y-auto flex-shrink-0 z-0 scrollbar-hide">
          <BlogList onSelectBlog={handleSelectBlog} selectedBlogId={selectedBlogId || undefined} isCreating={isCreating} />
        </aside>

        {/* Right Panel */}
        <section className="flex-1 min-w-0 bg-gray-50 relative flex flex-col min-h-[calc(100vh-4rem)]">
          <div className="flex-1">
            {isCreating ? (
              <CreateBlogForm 
                onSuccess={handleCreateSuccess} 
                onCancel={() => setIsCreating(false)} 
              />
            ) : (
              <BlogDetail blogId={selectedBlogId} />
            )}
          </div>
        </section>
      </main>
      
      {!isCreating && <Footer />}
    </div>
  );
}

export default App;
