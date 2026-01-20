import { useState, useEffect } from 'react'

function About() {
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        setAnimate(true)

        // Scroll reveal animation
        const scrollElements = document.querySelectorAll(".scroll-reveal")

        const elementInView = (el, offset = 100) => {
            const elementTop = el.getBoundingClientRect().top
            return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        }

        const displayScrollElement = (element) => {
            element.classList.add("active")
        }

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 100)) {
                    displayScrollElement(el)
                }
            })
        }

        window.addEventListener("scroll", handleScrollAnimation)
        handleScrollAnimation()

        // Progress bar animation
        const progressBars = document.querySelectorAll(".progress-fill")
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute("data-width")
                    setTimeout(() => {
                        entry.target.style.width = width + "%"
                    }, 200)
                    progressObserver.unobserve(entry.target)
                }
            })
        }, { threshold: 0.5 })

        progressBars.forEach(bar => progressObserver.observe(bar))

        return () => window.removeEventListener("scroll", handleScrollAnimation)
    }, [])

    const styles = `
        .about-page * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .about-page {
            --primary-blue: #4F46E5;
            --primary-purple: #7C3AED;
            --primary-pink: #EC4899;
            --dark: #0F172A;
            --gray-900: #1E293B;
            --gray-800: #334155;
            --gray-600: #64748B;
            --gray-400: #94A3B8;
            --gray-200: #E2E8F0;
            --gray-100: #F1F5F9;
            --gray-50: #F8FAFC;
            --white: #FFFFFF;
            --success: #10B981;
            --info: #3B82F6;
            --warning: #F59E0B;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--gray-900);
            overflow-x: hidden;
            background: var(--white);
        }

        .about-page .hero {
            position: relative;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 120px 20px 80px;
            text-align: center;
            overflow: hidden;
        }

        .about-page .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom;
            background-size: cover;
            animation: wave 15s linear infinite;
        }

        @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .about-page .hero-content {
            position: relative;
            z-index: 1;
            max-width: 900px;
            margin: 0 auto;
        }

        .about-page .hero h1 {
            font-size: 4rem;
            font-weight: 900;
            margin-bottom: 1.5rem;
            animation: fadeInUp 1s ease-out;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .about-page .hero p {
            font-size: 1.5rem;
            opacity: 0.95;
            animation: fadeInUp 1s ease-out 0.2s both;
            line-height: 1.8;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .about-page .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .about-page .container-sm {
            max-width: 900px;
        }

        .about-page .section {
            padding: 80px 20px;
            position: relative;
        }

        .about-page .section-alt {
            background: var(--gray-50);
        }

        .about-page .card {
            background: white;
            border-radius: 20px;
            padding: 2.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid var(--gray-200);
            position: relative;
            overflow: hidden;
        }

        .about-page .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-blue), var(--primary-purple), var(--primary-pink));
            transform: scaleX(0);
            transition: transform 0.4s ease;
            transform-origin: left;
        }

        .about-page .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(79, 70, 229, 0.15);
        }

        .about-page .card:hover::before {
            transform: scaleX(1);
        }

        .about-page .card-title {
            font-size: 2rem;
            font-weight: 800;
            color: var(--gray-900);
            margin-bottom: 1.5rem;
            position: relative;
            display: inline-block;
        }

        .about-page .card-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-blue), var(--primary-purple));
            border-radius: 2px;
        }

        .about-page .problem-solution-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .about-page .feature-card {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            border: 2px solid transparent;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .about-page .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 0;
        }

        .about-page .feature-card:hover::before {
            opacity: 0.05;
        }

        .about-page .feature-card:hover {
            border-color: var(--primary-blue);
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(79, 70, 229, 0.2);
        }

        .about-page .feature-icon {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 1;
            box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }

        .about-page .feature-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--gray-900);
            position: relative;
            z-index: 1;
        }

        .about-page .feature-card p {
            color: var(--gray-600);
            line-height: 1.7;
            position: relative;
            z-index: 1;
            margin: 0;
        }

        .about-page .matching-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .about-page .match-factor {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            border: 2px solid var(--gray-200);
            transition: all 0.4s ease;
        }

        .about-page .match-factor::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background: linear-gradient(180deg, var(--primary-blue), var(--primary-purple));
            transition: width 0.4s ease;
        }

        .about-page .match-factor:hover::before {
            width: 100%;
            opacity: 0.05;
        }

        .about-page .match-factor:hover {
            transform: translateX(5px);
            border-color: var(--primary-blue);
            box-shadow: 0 10px 30px rgba(79, 70, 229, 0.15);
        }

        .about-page .match-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .about-page .match-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--gray-900);
        }

        .about-page .match-weight {
            font-size: 2rem;
            font-weight: 900;
            background: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .about-page .match-description {
            color: var(--gray-600);
            line-height: 1.6;
            margin: 0;
        }

        .about-page .progress-bar {
            height: 8px;
            background: var(--gray-200);
            border-radius: 10px;
            margin-top: 1rem;
            overflow: hidden;
        }

        .about-page .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-blue), var(--primary-purple));
            border-radius: 10px;
            transition: width 1s ease-out;
        }

        .about-page .alert {
            padding: 1.5rem;
            border-radius: 12px;
            margin-top: 2rem;
            border-left: 5px solid;
            animation: slideInLeft 0.6s ease-out;
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .about-page .alert-info {
            background: rgba(59, 130, 246, 0.1);
            border-color: var(--info);
            color: var(--gray-900);
        }

        .about-page .alert strong {
            color: var(--info);
        }

        .about-page .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2.5rem;
            margin-top: 3rem;
        }

        .about-page .team-card {
            background: white;
            border-radius: 20px;
            padding: 3rem 2rem;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
        }

        .about-page .team-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .about-page .team-card:hover::before {
            opacity: 0.05;
        }

        .about-page .team-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(79, 70, 229, 0.2);
            border-color: var(--primary-blue);
        }

        .about-page .team-avatar {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            margin: 0 auto 1.5rem;
            position: relative;
            z-index: 1;
            box-shadow: 0 10px 30px rgba(79, 70, 229, 0.3);
            transition: transform 0.3s ease;
        }

        .about-page .team-card:hover .team-avatar {
            transform: scale(1.1) rotate(5deg);
        }

        .about-page .team-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            position: relative;
            z-index: 1;
        }

        .about-page .team-card p {
            color: var(--gray-600);
            position: relative;
            z-index: 1;
            margin: 0;
        }

        .about-page .cta-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 80px 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .about-page .cta-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%);
            animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
        }

        .about-page .cta-content {
            position: relative;
            z-index: 1;
            max-width: 800px;
            margin: 0 auto;
        }

        .about-page .cta-section h2 {
            font-size: 3rem;
            font-weight: 900;
            margin-bottom: 1rem;
            color: #ffffff !important;
        }

        .about-page .cta-section p {
            font-size: 1.25rem;
            margin-bottom: 2.5rem;
            color: #ffffff !important;
            opacity: 0.95;
        }

        .about-page .cta-buttons {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .about-page .btn {
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-size: 1.125rem;
            font-weight: 700;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            border: 2px solid;
            cursor: pointer;
        }

        .about-page .btn-primary {
            background: white;
            color: var(--primary-blue);
            border-color: white;
        }

        .about-page .btn-primary:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .about-page .btn-outline {
            background: transparent;
            color: white;
            border-color: white;
        }

        .about-page .btn-outline:hover {
            background: white;
            color: var(--primary-blue);
            transform: translateY(-3px) scale(1.05);
        }

        .about-page .scroll-reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease-out;
        }

        .about-page .scroll-reveal.active {
            opacity: 1;
            transform: translateY(0);
        }

        @media (max-width: 768px) {
            .about-page .hero h1 {
                font-size: 2.5rem;
            }

            .about-page .hero p {
                font-size: 1.125rem;
            }

            .about-page .section {
                padding: 60px 20px;
            }

            .about-page .card {
                padding: 2rem;
            }

            .about-page .card-title {
                font-size: 1.5rem;
            }

            .about-page .cta-section h2 {
                font-size: 2rem;
            }

            .about-page .cta-buttons {
                flex-direction: column;
            }

            .about-page .btn {
                width: 100%;
            }
        }
    `

    return (
        <div className="about-page">
            <style>{styles}</style>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>About FoundIt!</h1>
                    <p>Revolutionizing lost and found with intelligent matching technology powered by advanced AI algorithms</p>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="section">
                <div className="container container-sm">
                    <div className="card scroll-reveal">
                        <h2 className="card-title">The Problem</h2>
                        <p style={{ marginBottom: '1rem', fontSize: '1.125rem', lineHeight: '1.8' }}>
                            Every day, thousands of items are lost on university campuses, in public spaces, and various locations.
                            Traditional lost and found systems are inefficient, relying on manual searches through unorganized databases
                            or physical lost and found boxes.
                        </p>
                        <p style={{ margin: 0, fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--gray-600)' }}>
                            Students and individuals waste countless hours trying to recover their belongings, often without success.
                            The lack of an intelligent, automated matching system means that even when items are found and reported,
                            they rarely make it back to their rightful owners.
                        </p>
                    </div>
                </div>
            </section>

            {/* Solution */}
            <section className="section section-alt">
                <div className="container">
                    <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Our Solution</h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--gray-600)', maxWidth: '700px', margin: '0 auto' }}>
                            An intelligent platform that connects lost items with found reports in milliseconds
                        </p>
                    </div>

                    <div className="problem-solution-grid">
                        <div className="feature-card scroll-reveal">
                            <div className="feature-icon">📱</div>
                            <h3>Item Category</h3>
                            <p>Precise categorization system for accurate matching across Electronics, ID Cards, Keys, Wallets, and more</p>
                        </div>
                        <div className="feature-card scroll-reveal">
                            <div className="feature-icon">🎓</div>
                            <h3>University Priority</h3>
                            <p>Smart location-based matching that prioritizes items within the same institution for faster recovery</p>
                        </div>
                        <div className="feature-card scroll-reveal">
                            <div className="feature-icon">🤖</div>
                            <h3>AI Analysis</h3>
                            <p>Advanced text analysis powered by machine learning to find similarities in descriptions and features</p>
                        </div>
                        <div className="feature-card scroll-reveal">
                            <div className="feature-icon">⚡</div>
                            <h3>Real-Time Matching</h3>
                            <p>Instant notifications when potential matches are found with confidence scoring</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Matching Logic */}
            <section className="section">
                <div className="container">
                    <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>How Our Matching Logic Works</h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--gray-600)', maxWidth: '800px', margin: '0 auto' }}>
                            Our intelligent engine uses a multi-factor scoring system to determine match likelihood
                        </p>
                    </div>

                    <div className="matching-grid">
                        <div className="match-factor scroll-reveal">
                            <div className="match-header">
                                <span className="match-title">Category Match</span>
                                <span className="match-weight">40%</span>
                            </div>
                            <p className="match-description">
                                Items in the same category receive a significant boost in confidence score for accurate matching
                            </p>
                            <div className="progress-bar">
                                <div className="progress-fill" data-width="40" style={{ width: '0%' }}></div>
                            </div>
                        </div>

                        <div className="match-factor scroll-reveal">
                            <div className="match-header">
                                <span className="match-title">University Match</span>
                                <span className="match-weight">30%</span>
                            </div>
                            <p className="match-description">
                                Same university items are prioritized as most lost items are found nearby on campus
                            </p>
                            <div className="progress-bar">
                                <div className="progress-fill" data-width="30" style={{ width: '0%' }}></div>
                            </div>
                        </div>

                        <div className="match-factor scroll-reveal">
                            <div className="match-header">
                                <span className="match-title">Location Similarity</span>
                                <span className="match-weight">15%</span>
                            </div>
                            <p className="match-description">
                                Matching or similar locations increase the likelihood of finding the correct match
                            </p>
                            <div className="progress-bar">
                                <div className="progress-fill" data-width="15" style={{ width: '0%' }}></div>
                            </div>
                        </div>

                        <div className="match-factor scroll-reveal">
                            <div className="match-header">
                                <span className="match-title">Description Analysis</span>
                                <span className="match-weight">15%</span>
                            </div>
                            <p className="match-description">
                                AI analyzes keywords, colors, brands, and distinctive features for smart matching
                            </p>
                            <div className="progress-bar">
                                <div className="progress-fill" data-width="15" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="container-sm">
                        <div className="alert alert-info scroll-reveal">
                            <strong>🎯 Confidence Threshold:</strong> Matches with 65% or higher confidence are considered high-quality
                            matches and include contact information for immediate follow-up. Our algorithm ensures accuracy while minimizing false positives.
                        </div>
                    </div>
                </div>
            </section>

            {/* University Priority */}
            <section className="section section-alt">
                <div className="container container-sm">
                    <div className="card scroll-reveal">
                        <h2 className="card-title">Why University-Level Priority?</h2>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.125rem', lineHeight: '1.8' }}>
                            University campuses are unique ecosystems where lost items are most likely to be found within the same community.
                            Our university-level priority system offers several game-changing advantages:
                        </p>
                        <div className="problem-solution-grid" style={{ marginTop: '2rem' }}>
                            <div className="feature-card">
                                <div className="feature-icon">📍</div>
                                <h3>Geographical Proximity</h3>
                                <p>Items lost on campus are typically found nearby, making same-university matches highly relevant and actionable</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">🤝</div>
                                <h3>Community Trust</h3>
                                <p>Students trust and connect better with members of their own university community</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">⚡</div>
                                <h3>Faster Recovery</h3>
                                <p>Limiting matches to the same university reduces noise and dramatically speeds up recovery</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">🚀</div>
                                <h3>Scalability</h3>
                                <p>University-based filtering ensures efficiency even with millions of reports across institutions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section">
                <div className="container">
                    <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Our Team</h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--gray-600)' }}>
                            Passionate experts dedicated to solving real-world problems
                        </p>
                    </div>

                    <div className="team-grid">
                        <div className="team-card scroll-reveal">
                            <div className="team-avatar">👨‍💻</div>
                            <h3>Development Team</h3>
                            <p>Building innovative solutions with cutting-edge technology for real-world impact</p>
                        </div>
                        <div className="team-card scroll-reveal">
                            <div className="team-avatar">🎨</div>
                            <h3>Design Team</h3>
                            <p>Creating beautiful, intuitive experiences that users love to interact with</p>
                        </div>
                        <div className="team-card scroll-reveal">
                            <div className="team-avatar">🤖</div>
                            <h3>AI Team</h3>
                            <p>Developing intelligent algorithms that power accurate and fast matching</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Find Your Lost Item?</h2>
                    <p>Join thousands of users who have successfully recovered their belongings with FoundIt!</p>
                    <div className="cta-buttons">
                        <a href="#" className="btn btn-primary">Report Lost Item</a>
                        <a href="#" className="btn btn-outline">Report Found Item</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
