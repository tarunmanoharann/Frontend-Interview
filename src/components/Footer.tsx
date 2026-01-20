import { Newspaper, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f1115] text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-white text-black p-1.5 rounded-md">
                <Newspaper className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">CA MONK</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Empowering the next generation of financial leaders with tools, community, and knowledge.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Resources</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-white cursor-pointer transition-colors">Webinars</li>
            <li className="hover:text-white cursor-pointer transition-colors">Case Studies</li>
          </ul>
        </div>

        {/* Platform */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Platform</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer transition-colors">Job Board</li>
            <li className="hover:text-white cursor-pointer transition-colors">Practice Tests</li>
            <li className="hover:text-white cursor-pointer transition-colors">Mentorship</li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Connect</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                <Linkedin className="w-4 h-4" /> LinkedIn
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                <Twitter className="w-4 h-4" /> Twitter
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                <Instagram className="w-4 h-4" /> Instagram
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; 2024 CA Monk. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
