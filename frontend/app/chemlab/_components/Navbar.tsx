"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Beaker, BookOpen, Brain, FlaskConical, Home, Microscope, Menu, X, Info } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: 'Trang Chủ', path: '/chemlab', icon: <Home className="w-4 h-4" /> },
        { name: 'Khám Phá', path: '/chemlab/explore', icon: <FlaskConical className="w-4 h-4" /> },
        { name: 'Mô Phỏng', path: '/chemlab/simulation', icon: <Beaker className="w-4 h-4" /> },
        { name: 'Bài Kiểm Tra', path: '/chemlab/periodic-test', icon: <BookOpen className="w-4 h-4" /> },
        { name: 'Giả Kim Thuật', path: '/chemlab/alchemist', icon: <Brain className="w-4 h-4" /> },
        { name: 'Kính Hiển Vi', path: '/chemlab/microscope', icon: <Microscope className="w-4 h-4" /> },

    ];

    const isActive = (path: string) => {
        if (path === '/chemlab' && pathname === '/chemlab') return true;
        if (path !== '/chemlab' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => {
                            const active = isActive(link.path);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${active
                                        ? 'text-white bg-gradient-to-r from-primary to-blue-600 shadow-lg shadow-primary/30'
                                        : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                                        }`}
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-300"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 overflow-hidden'
                    }`}
            >
                <div className="px-4 pt-2 pb-6 space-y-2">
                    {navLinks.map((link) => {
                        const active = isActive(link.path);
                        return (
                            <Link
                                key={link.name}
                                href={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${active
                                    ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${active ? 'bg-white/20' : 'bg-gray-100'}`}>
                                    {link.icon}
                                </div>
                                <span>{link.name}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
