// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              FA
            </div>
            <span className="ml-3 text-xl font-semibold">FA Visualizer</span>
          </Link>
          
          {/* Navigation Links - Increased spacing */}
          <div className="flex space-x-8"> {/* Increased from space-x-4 to space-x-8 */}
            <Link href="/" className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors duration-200">
              Home
            </Link>
            <Link href="/form" className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors duration-200">
              Form
            </Link>
            <Link href="/saved-forms" className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors duration-200">
              Saved Forms
            </Link>
            <Link href="/circles-demo" className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors duration-200">
              Circles Demo
            </Link>
            <Link href="/circle-connections" className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors duration-200">
              Circle Connections
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}