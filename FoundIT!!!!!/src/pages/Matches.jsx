import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Matches() {
    const [matches, setMatches] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [lastItem, setLastItem] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            const lastSubmitted = JSON.parse(localStorage.getItem('lastSubmittedItem') || 'null')
            setLastItem(lastSubmitted)

            if (lastSubmitted) {
                const oppositeType = lastSubmitted.type === 'lost' ? 'foundItems' : 'lostItems'
                const items = JSON.parse(localStorage.getItem(oppositeType) || '[]')

                const matchedItems = items
                    .map(item => {
                        let confidence = 0

                        if (item.category.toLowerCase() === lastSubmitted.category.toLowerCase()) {
                            confidence += 40
                        }

                        if (item.university === lastSubmitted.university) {
                            confidence += 30
                        }

                        if (item.location.toLowerCase().includes(lastSubmitted.location.toLowerCase()) ||
                            lastSubmitted.location.toLowerCase().includes(item.location.toLowerCase())) {
                            confidence += 15
                        }

                        const itemWords = item.description.toLowerCase().split(' ')
                        const submittedWords = lastSubmitted.description.toLowerCase().split(' ')
                        const commonWords = itemWords.filter(word =>
                            submittedWords.includes(word) && word.length > 3
                        )
                        if (commonWords.length > 0) {
                            confidence += Math.min(15, commonWords.length * 3)
                        }

                        return {
                            ...item,
                            confidence: Math.min(100, confidence),
                        }
                    })
                    .filter(item => item.confidence >= 30)
                    .sort((a, b) => b.confidence - a.confidence)

                setMatches(matchedItems)
            }

            setIsLoading(false)
        }, 1000)
    }, [])

    const styles = `
        .matches-page {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-height: calc(100vh - 80px);
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 60px 20px;
        }

        .matches-container {
            max-width: 1000px;
            margin: 0 auto;
        }

        .matches-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .matches-title {
            font-size: 2.5rem;
            font-weight: 900;
            color: #1E293B;
            margin: 0 0 0.5rem;
        }

        .matches-subtitle {
            font-size: 1.1rem;
            color: #64748B;
            margin: 0;
        }

        .loading-spinner {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            gap: 1.5rem;
        }

        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #e2e8f0;
            border-top-color: #4F46E5;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .spinner-text {
            color: #64748B;
            font-weight: 600;
        }

        .empty-state {
            background: white;
            border-radius: 20px;
            padding: 4rem 2rem;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
        }

        .empty-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
        }

        .empty-title {
            font-size: 1.75rem;
            font-weight: 800;
            color: #1E293B;
            margin: 0 0 0.5rem;
        }

        .empty-text {
            font-size: 1.1rem;
            color: #64748B;
            margin: 0 0 2rem;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }

        .empty-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            padding: 0.9rem 2rem;
            border-radius: 10px;
            font-weight: 700;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 1rem;
        }

        .btn-primary {
            background: linear-gradient(135deg, #4F46E5, #7C3AED);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
        }

        .btn-secondary {
            background: transparent;
            border: 2px solid #4F46E5;
            color: #4F46E5;
        }

        .btn-secondary:hover {
            background: #4F46E5;
            color: white;
        }

        .submitted-item {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 2px solid #e2e8f0;
            border-left: 4px solid #4F46E5;
        }

        .submitted-item-label {
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            color: #4F46E5;
            margin-bottom: 0.5rem;
        }

        .submitted-item-name {
            font-size: 1.5rem;
            font-weight: 800;
            color: #1E293B;
            margin-bottom: 1rem;
        }

        .submitted-item-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            font-size: 0.95rem;
        }

        .detail-item {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .detail-label {
            color: #64748B;
            font-weight: 600;
            font-size: 0.85rem;
        }

        .detail-value {
            color: #1E293B;
            font-weight: 500;
        }

        .matches-list {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .match-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
            animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .match-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        .match-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 2rem;
            border-bottom: 1px solid #e2e8f0;
        }

        .match-info h3 {
            font-size: 1.5rem;
            font-weight: 800;
            color: #1E293B;
            margin: 0 0 0.5rem;
        }

        .match-category {
            display: inline-block;
            background: #f1f5f9;
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 600;
            color: #4F46E5;
        }

        .confidence-badge {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }

        .confidence-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 1.75rem;
            color: white;
        }

        .confidence-high {
            background: linear-gradient(135deg, #10b981, #059669);
        }

        .confidence-medium {
            background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .confidence-low {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .confidence-label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #64748B;
        }

        .match-body {
            padding: 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        }

        .match-detail {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .match-detail-label {
            color: #64748B;
            font-weight: 600;
            font-size: 0.85rem;
            text-transform: uppercase;
        }

        .match-detail-value {
            color: #1E293B;
            font-weight: 500;
            font-size: 1rem;
        }

        .match-description {
            grid-column: 1 / -1;
            background: #f8fafc;
            padding: 1rem;
            border-radius: 10px;
            border-left: 3px solid #4F46E5;
            font-style: italic;
            color: #475569;
        }

        .match-footer {
            padding: 1.5rem 2rem;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            text-align: center;
        }

        .contact-btn {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .contact-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
        }

        .success-section {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 2rem;
            text-align: center;
        }

        .success-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .success-title {
            font-size: 1.75rem;
            font-weight: 900;
            margin: 0 0 0.75rem;
        }

        .success-text {
            font-size: 1.1rem;
            opacity: 0.9;
            margin: 0;
        }

        .no-matches-section {
            background: white;
            border-radius: 16px;
            padding: 3rem 2rem;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
        }

        .no-matches-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }

        .no-matches-title {
            font-size: 1.75rem;
            font-weight: 800;
            color: #1E293B;
            margin: 0 0 0.75rem;
        }

        .no-matches-text {
            font-size: 1.1rem;
            color: #64748B;
            margin: 0 0 2rem;
        }

        @media (max-width: 768px) {
            .matches-page {
                padding: 40px 20px;
            }

            .matches-title {
                font-size: 1.75rem;
            }

            .match-header {
                flex-direction: column;
                gap: 1rem;
            }

            .confidence-badge {
                order: -1;
            }

            .match-body {
                grid-template-columns: 1fr;
            }
        }
    `

    if (isLoading) {
        return (
            <div className="matches-page">
                <style>{styles}</style>
                <div className="matches-container">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <div className="spinner-text">🔍 Searching for matches...</div>
                    </div>
                </div>
            </div>
        )
    }

    if (!lastItem) {
        return (
            <div className="matches-page">
                <style>{styles}</style>
                <div className="matches-container">
                    <div className="matches-header">
                        <h1 className="matches-title">No Submissions Yet</h1>
                    </div>
                    <div className="empty-state">
                        <div className="empty-icon">🔍</div>
                        <h2 className="empty-title">No Items Submitted</h2>
                        <p className="empty-text">Submit a lost or found item to see potential matches</p>
                        <div className="empty-buttons">
                            <Link to="/report-lost" className="btn btn-primary">
                                Report Lost Item
                            </Link>
                            <Link to="/report-found" className="btn btn-secondary">
                                Report Found Item
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const hasHighConfidenceMatches = matches.some(m => m.confidence >= 65)

    return (
        <div className="matches-page">
            <style>{styles}</style>
            <div className="matches-container">
                <div className="matches-header">
                    <h1 className="matches-title">🔍 Match Results</h1>
                    <p className="matches-subtitle">
                        {lastItem.type === 'lost' ? 'Found items matching your report' : 'Lost items matching your report'}
                    </p>
                </div>

                {/* Submitted Item */}
                <div className="submitted-item">
                    <div className="submitted-item-label">
                        {lastItem.type === 'lost' ? '📍 Your Lost Item' : '✅ Your Found Item'}
                    </div>
                    <div className="submitted-item-name">{lastItem.itemName}</div>
                    <div className="submitted-item-details">
                        <div className="detail-item">
                            <span className="detail-label">Category</span>
                            <span className="detail-value">{lastItem.category}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">University</span>
                            <span className="detail-value">{lastItem.university}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Location</span>
                            <span className="detail-value">{lastItem.location}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Description</span>
                            <span className="detail-value">{lastItem.description}</span>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {matches.length > 0 ? (
                    <>
                        {hasHighConfidenceMatches && (
                            <div className="success-section">
                                <div className="success-icon">🎉</div>
                                <h2 className="success-title">Great News!</h2>
                                <p className="success-text">We found potential matches for your item. Connect with users below!</p>
                            </div>
                        )}

                        <div className="matches-list">
                            {matches.map((match, index) => {
                                const confidenceLevel = match.confidence >= 65 ? 'high' : match.confidence >= 50 ? 'medium' : 'low'
                                return (
                                    <div key={match.id} className="match-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <div className="match-header">
                                            <div className="match-info">
                                                <h3>{match.itemName}</h3>
                                                <span className="match-category">{match.category}</span>
                                            </div>
                                            <div className="confidence-badge">
                                                <div className={`confidence-circle confidence-${confidenceLevel}`}>
                                                    {match.confidence}%
                                                </div>
                                                <div className="confidence-label">Confidence</div>
                                            </div>
                                        </div>
                                        <div className="match-body">
                                            <div className="match-detail">
                                                <span className="match-detail-label">University</span>
                                                <span className="match-detail-value">{match.university}</span>
                                            </div>
                                            <div className="match-detail">
                                                <span className="match-detail-label">Location</span>
                                                <span className="match-detail-value">{match.location}</span>
                                            </div>
                                            <div className="match-detail">
                                                <span className="match-detail-label">Reported</span>
                                                <span className="match-detail-value">{new Date(match.timestamp).toLocaleDateString()}</span>
                                            </div>
                                            <div className="match-description">
                                                <strong>Description:</strong> {match.description}
                                            </div>
                                        </div>
                                        {match.confidence >= 65 && (
                                            <div className="match-footer">
                                                <button className="contact-btn">
                                                    📧 Contact User & Arrange Pickup
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </>
                ) : (
                    <div className="no-matches-section">
                        <div className="no-matches-icon">😢</div>
                        <h2 className="no-matches-title">Sorry, No Matches Found</h2>
                        <p className="no-matches-text">
                            We couldn't find any items matching your report at this moment. Check back later!
                        </p>
                        <div className="empty-buttons">
                            <Link to="/report-lost" className="btn btn-primary">
                                Report Lost Item
                            </Link>
                            <Link to="/report-found" className="btn btn-secondary">
                                Report Found Item
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Matches
