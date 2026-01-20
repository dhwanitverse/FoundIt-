import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const user = localStorage.getItem('foundItUser')
        setIsLoggedIn(!!user)
    }, [location])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('foundItUser')
        setIsLoggedIn(false)
        window.location.href = '/'
    }

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/report-lost', label: 'Report Lost' },
        { path: '/report-found', label: 'Report Found' },
        { path: '/matches', label: 'Matches' },
    ]

    const styles = `
        .navbar {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: white;
            border-bottom: 1px solid rgba(79, 70, 229, 0.1);
            transition: all 0.3s ease;
            padding: 1rem 0;
        }

        .navbar.scrolled {
            box-shadow: 0 4px 20px rgba(79, 70, 229, 0.1);
            padding: 0.8rem 0;
        }

        .navbar-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .navbar-logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-decoration: none;
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #4F46E5, #7C3AED);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            transition: transform 0.2s ease;
            white-space: nowrap;
        }

        .navbar-logo:hover {
            transform: scale(1.05);
        }

        .logo-icon-wrapper {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #4F46E5, #7C3AED);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 1.5rem;
        }

        .navbar-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
            align-items: center;
            margin: 0;
            padding: 0;
        }

        .navbar-menu li {
            margin: 0;
        }

        .navbar-menu a {
            text-decoration: none;
            color: #1E293B;
            font-weight: 500;
            font-size: 0.95rem;
            transition: all 0.2s ease;
            padding: 0.5rem 0;
            position: relative;
        }

        .navbar-menu a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #4F46E5, #7C3AED);
            transition: width 0.3s ease;
        }

        .navbar-menu a:hover::after {
            width: 100%;
        }

        .navbar-menu a.active {
            color: #4F46E5;
            font-weight: 600;
        }

        .navbar-menu a.active::after {
            width: 100%;
        }

        .navbar-auth {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        .btn-login {
            padding: 0.6rem 1.5rem;
            border: 2px solid #4F46E5;
            background: transparent;
            color: #4F46E5;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
        }

        .btn-login:hover {
            background: #4F46E5;
            color: white;
            transform: translateY(-2px);
        }

        .btn-logout {
            padding: 0.6rem 1.5rem;
            background: linear-gradient(135deg, #4F46E5, #7C3AED);
            color: white;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        .btn-logout:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }

        .menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #1E293B;
        }

        @media (max-width: 768px) {
            .navbar-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                flex-direction: column;
                gap: 0;
                background: white;
                border-top: 1px solid rgba(79, 70, 229, 0.1);
                padding: 1rem;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            }

            .navbar-menu.active {
                display: flex;
            }

            .navbar-menu a {
                padding: 0.75rem;
            }

            .menu-toggle {
                display: block;
            }

            .navbar-auth {
                gap: 0.5rem;
            }
        }
    `

    return (
        <>
            <style>{styles}</style>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <div className="logo-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <span>FoundIt!</span>
                    </Link>

                    <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={location.pathname === link.path ? 'active' : ''}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="navbar-auth">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="btn-logout">
                                Logout
                            </button>
                        ) : (
                            <Link to="/auth" className="btn-login">
                                Login
                            </Link>
                        )}
                    </div>

                    <button
                        className="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar
