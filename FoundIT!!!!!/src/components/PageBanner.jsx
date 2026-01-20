import bannerImg from '../assets/banner.jpg'

function PageBanner({ title, subtitle }) {
    return (
        <div style={styles.banner}>
            <img src={bannerImg} alt={title} style={styles.bannerImg} />
            <div style={styles.overlay}>
                <div className="container" style={styles.content}>
                    <h1 style={styles.title}>{title}</h1>
                    {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
                </div>
            </div>
        </div>
    )
}

const styles = {
    banner: {
        position: 'relative',
        height: '300px',
        overflow: 'hidden',
        marginTop: '70px',
    },
    bannerImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.85) 0%, rgba(123, 104, 238, 0.85) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        textAlign: 'center',
        color: 'var(--white)',
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: 900,
        color: 'var(--white)',
        marginBottom: '1rem',
        textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        letterSpacing: '-1px',
    },
    subtitle: {
        fontSize: '1.25rem',
        color: 'rgba(255, 255, 255, 0.95)',
        margin: 0,
        fontWeight: 500,
    },
}

// Add responsive styles
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  @media (max-width: 768px) {
    .page-banner {
      height: 200px !important;
      margin-top: 60px !important;
    }
    .page-banner h1 {
      font-size: 2.5rem !important;
    }
    .page-banner p {
      font-size: 1rem !important;
    }
  }
`
document.head.appendChild(styleSheet)

export default PageBanner
