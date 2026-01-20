import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Auth() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (isSignUp && !formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsLoading(true)

        setTimeout(() => {
            const userData = {
                email: formData.email,
                fullName: formData.fullName || formData.email.split('@')[0],
            }
            localStorage.setItem('foundItUser', JSON.stringify(userData))

            setIsLoading(false)
            navigate('/')
        }, 1000)
    }

    const toggleMode = () => {
        if (isAnimating) return
        setIsAnimating(true)

        // Wait for half the animation to toggle content so it's less jarring
        setTimeout(() => {
            setIsSignUp(!isSignUp)
            setErrors({})
            setFormData({ fullName: '', email: '', password: '' })
        }, 300)

        // Reset animation state after full transition
        setTimeout(() => {
            setIsAnimating(false)
        }, 600)
    }

    const styles = `
        .auth-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow-x: hidden;
        }

        .auth-wrapper {
            width: 100%;
            max-width: 1000px; /* Wider to accommodate movement */
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
            min-height: 600px;
            display: flex;
        }

        /* 
           PANEL LAYOUT & ANIMATION 
           We use translateX to swap the positions of the Form and Info panels.
        */
        .auth-form-section {
            flex: 1;
            padding: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: all 0.6s ease-in-out;
            z-index: 2;
            background: white;
            position: relative;
            max-width: 50%; /* Strictly half width */
        }

        .auth-info-section {
            flex: 1;
            padding: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            transition: all 0.6s ease-in-out;
            z-index: 1;
            position: relative;
            max-width: 50%; /* Strictly half width */
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            overflow: hidden;
        }

        /* Classes applied when Sign Up mode is active (Panels Swapped) */
        .auth-wrapper.sign-up-mode .auth-form-section {
            transform: translateX(100%);
            border-radius: 0 20px 20px 0;
        }

        .auth-wrapper.sign-up-mode .auth-info-section {
            transform: translateX(-100%);
            border-radius: 20px 0 0 20px;
        }

        /* CONTENT FADING 
           Content inside panels fades out/in mid-transition for smoothness 
        */
        .form-content, .info-content {
            transition: opacity 0.3s ease-in-out;
            opacity: 1;
            width: 100%;
        }

        .content-fading {
            opacity: 0;
            transform: scale(0.95);
        }

        /* FORM ELEMENTS */
        .auth-toggle {
            display: flex;
            background: #f1f5f9;
            border-radius: 50px;
            padding: 4px;
            margin-bottom: 2rem;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
        }

        .auth-toggle button {
            padding: 0.6rem 1.5rem;
            border: none;
            background: transparent;
            font-weight: 600;
            cursor: pointer;
            border-radius: 50px;
            transition: all 0.3s ease;
            color: #64748B;
            font-size: 0.9rem;
        }

        .auth-toggle button.active {
            background: white;
            color: #4F46E5;
            box-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);
        }

        .form-title {
            font-size: 2rem;
            font-weight: 800;
            color: #1E293B;
            margin-bottom: 0.5rem;
            text-align: center;
        }

        .form-subtitle {
            font-size: 1rem;
            color: #64748B;
            margin-bottom: 2rem;
            text-align: center;
        }

        .form-group {
            margin-bottom: 1.25rem;
            text-align: left;
        }

        .form-label {
            display: block;
            font-weight: 600;
            color: #1E293B;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }

        .form-input {
            width: 100%;
            padding: 0.875rem;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: #f8fafc;
        }

        .form-input:focus {
            outline: none;
            border-color: #4F46E5;
            background: white;
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .submit-btn {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #4F46E5, #7C3AED);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
        }

        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
        }

        /* INFO SECTION STYLES */
        .info-title {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            color: #ffffff !important; /* Force white over global h2 */
        }

        .auth-info-section p {
            color: #ffffff !important; /* Force white over global p */
        }

        .feature-list {
            margin-top: 2rem;
            text-align: left;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
        }

        .feature-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 1.1rem;
            background: rgba(255, 255, 255, 0.1);
            padding: 12px 20px;
            border-radius: 12px;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white !important;
            transition: transform 0.3s ease;
        }

        .feature-item:hover {
            transform: translateX(10px);
            background: rgba(255, 255, 255, 0.2);
        }

        .toggle-btn-container {
            margin-top: 2.5rem;
            display: flex;
            justify-content: center;
            width: 100%;
        }

        @media (max-width: 768px) {
            .auth-wrapper {
                flex-direction: column;
                min-height: auto;
                max-width: 500px;
            }

            .auth-form-section, .auth-info-section {
                max-width: 100%;
                flex: auto;
                padding: 30px;
            }
            
            /* Disable swap on mobile, just stack */
            .auth-wrapper.sign-up-mode .auth-form-section,
            .auth-wrapper.sign-up-mode .auth-info-section {
                transform: none;
            }
            
            .auth-info-section {
                order: -1; /* Info top on mobile? Or bottom */
                padding: 40px 20px;
            }
        }
    `

    return (
        <div className="auth-container">
            <style>{styles}</style>

            <div className={`auth-wrapper ${isSignUp ? 'sign-up-mode' : ''}`}>

                {/* FORM SECTION (Left by default) */}
                <div className="auth-form-section">
                    <div className={`form-content ${isAnimating ? 'content-fading' : ''}`}>

                        {/* Toggle button removed as per user request */}

                        <div className="form-title">
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </div>
                        <div className="form-subtitle">
                            {isSignUp ? 'Join FoundIt! to help recover lost items' : 'Enter your details to access your account'}
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Smooth Collapse for Full Name */}
                            <div style={{
                                maxHeight: isSignUp ? '100px' : '0',
                                opacity: isSignUp ? 1 : 0,
                                overflow: 'hidden',
                                transition: 'all 0.4s ease',
                                marginBottom: isSignUp ? '1.25rem' : '0'
                            }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-input"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="john@university.edu"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="submit-btn" disabled={isLoading}>
                                {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                            </button>
                        </form>
                    </div>
                </div>

                {/* INFO SECTION (Right by default) */}
                <div className="auth-info-section">
                    <div className={`info-content ${isAnimating ? 'content-fading' : ''}`}>
                        <h2 className="info-title">
                            {isSignUp ? 'Already Joined?' : 'New Here?'}
                        </h2>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                            {isSignUp ? 'To keep connected with us please login with your personal info' : 'Enter your personal details and start your journey with us'}
                        </p>

                        {/* Decorative Features */}
                        <div className="feature-list">
                            <div className="feature-item">
                                <span>🚀</span> <span>Fast Recovery</span>
                            </div>
                            <div className="feature-item">
                                <span>🔒</span> <span>Secure Matching</span>
                            </div>
                            <div className="feature-item">
                                <span>🎓</span> <span>Campus Network</span>
                            </div>
                        </div>

                        <div className="toggle-btn-container">
                            <button
                                onClick={toggleMode}
                                style={{
                                    padding: '1rem 2.5rem',
                                    border: '2px solid white',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    borderRadius: '50px',
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    backdropFilter: 'blur(5px)'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = 'white'
                                    e.target.style.color = '#667eea'
                                    e.target.style.transform = 'translateY(-3px)'
                                    e.target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)'
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = 'rgba(255,255,255,0.1)'
                                    e.target.style.color = 'white'
                                    e.target.style.transform = 'translateY(0)'
                                    e.target.style.boxShadow = 'none'
                                }}
                            >
                                {isSignUp ? 'Sign In Instead' : 'Sign Up Now'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Auth
