import {
    useEffect,
    useState,
} from 'react';

import {
    Beaker,
    Compass,
    FlaskConical,
    Home,
    Info,
    Menu,
    X,
    ClipboardCheck,
    Sparkles,
    Microscope as MicroscopeIcon,


} from 'lucide-react';
import {
    Link,
    useLocation,
} from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    const toggleMenu = () => setIsOpen(!isOpen)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Trang Chủ', path: '/', icon: <Home className="w-4 h-4" /> },
        { name: 'Khám Phá', path: '/explore', icon: <Compass className="w-4 h-4" /> },
        { name: 'Mô Phỏng', path: '/simulation', icon: <Beaker className="w-4 h-4" /> },
        { name: 'Bài Kiểm Tra', path: '/periodic-test', icon: <ClipboardCheck className="w-4 h-4" /> },
        { name: 'Giả Kim Thuật', path: '/alchemist', icon: <Sparkles className="w-4 h-4" /> },
        { name: 'Kính Hiển Vi', path: '/microscope', icon: <MicroscopeIcon className="w-4 h-4" /> },


        { name: 'Giới Thiệu', path: '/about', icon: <Info className="w-4 h-4" /> }
    ]

    const isActive = (path) => location.pathname === path

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-lg'
            : 'bg-white/95 backdrop-blur-sm shadow-md'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-600 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <div className="relative bg-gradient-to-br from-primary-600 to-blue-600 p-2.5 rounded-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                                <FlaskConical className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                                ChemLab
                            </span>
                            <span className="text-xs text-gray-500 font-medium -mt-1">
                                3D Chemistry Lab
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${isActive(link.path)
                                    ? 'text-white bg-gradient-to-r from-primary-600 to-blue-600 shadow-lg shadow-primary-600/30'
                                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                                    }`}
                            >
                                <span className={`transition-transform duration-300 ${isActive(link.path) ? '' : 'group-hover:rotate-12'
                                    }`}>
                                    {link.icon}
                                </span>
                                <span>{link.name}</span>
                                {!isActive(link.path) && (
                                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-600 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden relative p-3 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 group"
                    >
                        <div className="relative w-6 h-6">
                            <Menu className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                                }`} />
                            <X className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                                }`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="bg-gradient-to-b from-slate-50 to-white border-t border-gray-200 px-4 py-4 space-y-2">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={toggleMenu}
                            className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all duration-300 transform ${isActive(link.path)
                                ? 'text-white bg-gradient-to-r from-primary-600 to-blue-600 shadow-lg scale-105'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50 hover:scale-105'
                                }`}
                            style={{
                                transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                            }}
                        >
                            <span className={`transition-transform duration-300 ${isActive(link.path) ? '' : 'group-hover:rotate-12'
                                }`}>
                                {link.icon}
                            </span>
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
