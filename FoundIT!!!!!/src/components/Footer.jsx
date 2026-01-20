import { Link } from 'react-router-dom'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer style={styles.footer}>
            <div className="container" style={styles.container}>
                <div style={styles.grid}>
                    {/* About Section */}
                    <div style={styles.section}>
                        <h4 style={styles.title}>FoundIt!</h4>
                        <p style={styles.description}>
                            Intelligent lost and found matching platform with university-level priority.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div style={styles.section}>
                        <h4 style={styles.title}>Quick Links</h4>
                        <div style={styles.links}>
                            <Link to="/" style={styles.link}>Home</Link>
                            <Link to="/report-lost" style={styles.link}>Report Lost</Link>
                            <Link to="/report-found" style={styles.link}>Report Found</Link>
                            <Link to="/matches" style={styles.link}>Matches</Link>
                            <Link to="/about" style={styles.link}>About Us</Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div style={styles.section}>
                        <h4 style={styles.title}>Contact</h4>
                        <div style={styles.links}>
                            <a href="mailto:support@foundit.com" style={styles.link}>
                                support@foundit.com
                            </a>
                            <p style={styles.link}>Help Center</p>
                            <p style={styles.link}>Privacy Policy</p>
                        </div>
                    </div>
                </div>

                <div style={styles.bottom}>
                    <p style={styles.copyright}>
                        © {currentYear} FoundIt! All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

const styles = {
    footer: {
        background: 'var(--gray-900)',
        color: 'var(--white)',
        padding: '3rem 0 1.5rem',
        marginTop: 'auto',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    title: {
        fontSize: '1.125rem',
        fontWeight: 700,
        color: 'var(--white)',
        marginBottom: '0.5rem',
    },
    description: {
        color: 'var(--gray-400)',
        fontSize: '0.875rem',
        lineHeight: 1.6,
        margin: 0,
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    link: {
        color: 'var(--gray-400)',
        fontSize: '0.875rem',
        textDecoration: 'none',
        transition: 'color var(--transition-fast)',
        cursor: 'pointer',
        margin: 0,
    },
    bottom: {
        borderTop: '1px solid var(--gray-700)',
        paddingTop: '1.5rem',
        textAlign: 'center',
    },
    copyright: {
        color: 'var(--gray-500)',
        fontSize: '0.875rem',
        margin: 0,
    },
}

// Add hover effect
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  footer a:hover {
    color: var(--primary-blue) !important;
  }
`
document.head.appendChild(styleSheet)

export default Footer
