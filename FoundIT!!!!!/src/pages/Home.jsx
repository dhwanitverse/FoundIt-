import { Link } from 'react-router-dom'

function Home() {
    const styles = `
        .home-page {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 120px 20px 80px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%);
        }

        .hero-content {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            margin: 0 auto;
        }

        .hero h1 {
            font-size: 4.5rem;
            font-weight: 900;
            margin: 0 0 1rem;
            line-height: 1.1;
        }

        .hero h1 span {
            display: block;
        }

        .hero-subtitle {
            font-size: 1.5rem;
            opacity: 0.95;
            margin: 0 0 2rem;
            line-height: 1.6;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero-buttons {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 3rem;
        }

        .btn {
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-size: 1.125rem;
            font-weight: 700;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            border: 2px solid white;
            cursor: pointer;
        }

        .btn-primary {
            background: white;
            color: #667eea;
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .btn-secondary {
            background: transparent;
            color: white;
            border-color: white;
        }

        .btn-secondary:hover {
            background: white;
            color: #667eea;
            transform: translateY(-3px);
        }

        .hero-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            max-width: 800px;
            margin: 0 auto;
        }

        .stat-item {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 900;
            display: block;
            margin-bottom: 0.5rem;
        }

        .stat-label {
            font-size: 0.95rem;
            opacity: 0.9;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .section {
            padding: 100px 20px;
        }

        .section-alt {
            background: #f8fafc;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-title {
            font-size: 2.75rem;
            font-weight: 900;
            color: #1E293B;
            margin: 0 0 1rem;
        }

        .section-subtitle {
            font-size: 1.25rem;
            color: #64748B;
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.6;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }

        .feature-card {
            background: white;
            border-radius: 16px;
            padding: 2.5rem;
            border: 2px solid transparent;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .feature-card:hover {
            transform: translateY(-8px);
            border-color: #4F46E5;
            box-shadow: 0 20px 40px rgba(79, 70, 229, 0.15);
        }

        .feature-icon {
            font-size: 3.5rem;
            margin-bottom: 1rem;
        }

        .feature-card h3 {
            font-size: 1.5rem;
            font-weight: 800;
            color: #1E293B;
            margin: 0 0 1rem;
        }

        .feature-card p {
            color: #64748B;
            line-height: 1.7;
            margin: 0;
        }

        .process-container {
            max-width: 1000px;
            margin: 0 auto;
        }

        .process-steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .process-step {
            position: relative;
            text-align: center;
        }

        .step-number {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #4F46E5, #7C3AED);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.75rem;
            font-weight: 900;
            margin: 0 auto 1.5rem;
            box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
        }

        .process-step h3 {
            font-size: 1.25rem;
            font-weight: 800;
            color: #1E293B;
            margin: 0 0 0.75rem;
        }

        .process-step p {
            color: #64748B;
            line-height: 1.6;
            margin: 0;
        }

        .cta-section {
            background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
            color: white;
            text-align: center;
            padding: 100px 20px;
            border-radius: 20px;
            margin: 60px 0;
        }

        .cta-title {
            font-size: 2.75rem;
            font-weight: 900;
            margin: 0 0 1rem;
            color: #ffffff !important;
        }

        .cta-text {
            font-size: 1.25rem;
            opacity: 0.95;
            max-width: 600px;
            margin: 0 auto 2.5rem;
            line-height: 1.6;
            color: #ffffff !important;
        }

        @media (max-width: 768px) {
            .hero {
                padding: 80px 20px 50px;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .hero-subtitle {
                font-size: 1rem;
            }

            .hero-buttons {
                flex-direction: column;
            }

            .btn {
                width: 100%;
            }

            .section {
                padding: 60px 20px;
            }

            .section-title {
                font-size: 2rem;
            }

            .section-subtitle {
                font-size: 1rem;
            }

            .cta-section {
                margin: 40px 0;
                padding: 60px 20px;
            }

            .cta-title {
                font-size: 2rem;
            }
        }
    `

    return (
        <div className="home-page">
            <style>{styles}</style>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>
                        <span>Lost It?</span>
                        <span>Found It!</span>
                    </h1>
                    <p className="hero-subtitle">
                        Our intelligent matching engine connects lost items with found reports in milliseconds. Join thousands of students recovering their belongings every day.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/report-lost" className="btn btn-primary">
                            📍 Report Lost Item
                        </Link>
                        <Link to="/report-found" className="btn btn-secondary">
                            ✅ Report Found Item
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">10K+</span>
                            <span className="stat-label">Items Recovered</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50K+</span>
                            <span className="stat-label">Active Users</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">95%</span>
                            <span className="stat-label">Success Rate</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose FoundIt?</h2>
                        <p className="section-subtitle">
                            Powerful features designed to reunite you with your belongings
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎓</div>
                            <h3>University-Based</h3>
                            <p>Priority matching within your university community for faster recovery</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h3>AI-Powered</h3>
                            <p>Intelligent matching engine with advanced confidence scoring</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📧</div>
                            <h3>Notifications</h3>
                            <p>Get instant alerts when potential matches are found</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Lightning Fast</h3>
                            <p>Connects lost items with found reports in milliseconds</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">
                            Simple steps to recover your lost items
                        </p>
                    </div>

                    <div className="process-container">
                        <div className="process-steps">
                            <div className="process-step">
                                <div className="step-number">1</div>
                                <h3>Report Your Item</h3>
                                <p>Tell us about your lost or found item with details and location</p>
                            </div>
                            <div className="process-step">
                                <div className="step-number">2</div>
                                <h3>AI Matching</h3>
                                <p>Our intelligent engine analyzes and finds potential matches</p>
                            </div>
                            <div className="process-step">
                                <div className="step-number">3</div>
                                <h3>Get Matched</h3>
                                <p>Receive notifications with matching items and confidence scores</p>
                            </div>
                            <div className="process-step">
                                <div className="step-number">4</div>
                                <h3>Reunite</h3>
                                <p>Connect with the other person and arrange item pickup</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <div className="container">
                <div className="cta-section">
                    <h2 className="cta-title">Ready to Find Your Lost Item?</h2>
                    <p className="cta-text">
                        Join thousands of students who have successfully recovered their belongings with FoundIt!
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/report-lost" className="btn btn-primary" style={{ background: 'white', color: '#667eea' }}>
                            Report Lost Item
                        </Link>
                        <Link to="/report-found" className="btn btn-secondary" style={{ background: 'transparent', color: 'white', borderColor: 'white' }}>
                            Report Found Item
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
