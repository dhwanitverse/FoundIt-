import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ReportLost() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        itemName: '',
        category: '',
        customCategory: '',
        university: '',
        location: '',
        description: '',
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const categories = ['Electronics', 'ID Cards', 'Keys', 'Wallet', 'Others']
    const universities = [
        'MIT',
        'Stanford University',
        'Harvard University',
        'UC Berkeley',
        'Oxford University',
        'Cambridge University',
        'IIT Delhi',
        'IIT Bombay',
        'Other',
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.itemName.trim()) {
            newErrors.itemName = 'Item name is required'
        }

        if (!formData.category) {
            newErrors.category = 'Please select a category'
        }

        if (formData.category === 'Others' && !formData.customCategory.trim()) {
            newErrors.customCategory = 'Please specify the category'
        }

        if (!formData.university) {
            newErrors.university = 'University selection is required'
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsLoading(true)

        setTimeout(() => {
            const lostItems = JSON.parse(localStorage.getItem('lostItems') || '[]')
            const newItem = {
                id: Date.now(),
                ...formData,
                category: formData.category === 'Others' ? formData.customCategory : formData.category,
                timestamp: new Date().toISOString(),
                type: 'lost',
            }
            lostItems.push(newItem)
            localStorage.setItem('lostItems', JSON.stringify(lostItems))
            localStorage.setItem('lastSubmittedItem', JSON.stringify(newItem))

            setIsLoading(false)
            navigate('/matches')
        }, 1500)
    }

    const styles = `
        .report-page {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-height: calc(100vh - 80px);
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 60px 20px;
        }

        .report-container {
            max-width: 700px;
            margin: 0 auto;
        }

        .report-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .report-title {
            font-size: 2.5rem;
            font-weight: 900;
            color: #1E293B;
            margin: 0 0 0.5rem;
        }

        .report-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .report-subtitle {
            font-size: 1.1rem;
            color: #64748B;
            margin: 0;
        }

        .form-card {
            background: white;
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
        }

        .form-group {
            margin-bottom: 2rem;
        }

        .form-label {
            display: block;
            font-weight: 700;
            color: #1E293B;
            margin-bottom: 0.75rem;
            font-size: 1rem;
        }

        .form-label .required {
            color: #ef4444;
        }

        .form-input,
        .form-select,
        .form-textarea {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
            outline: none;
            border-color: #4F46E5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .form-input.error,
        .form-select.error,
        .form-textarea.error {
            border-color: #ef4444;
        }

        .form-textarea {
            resize: vertical;
            min-height: 120px;
        }

        .form-error {
            font-size: 0.9rem;
            color: #ef4444;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .form-note {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            font-size: 0.95rem;
            color: #92400e;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        .submit-btn {
            width: 100%;
            padding: 1.2rem;
            background: linear-gradient(135deg, #4F46E5, #7C3AED);
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
        }

        .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        @media (max-width: 768px) {
            .report-page {
                padding: 40px 20px;
            }

            .form-card {
                padding: 2rem;
            }

            .form-row {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }

            .report-title {
                font-size: 1.75rem;
            }
        }
    `

    return (
        <div className="report-page">
            <style>{styles}</style>

            <div className="report-container">
                <div className="report-header">
                    <div className="report-icon">📍</div>
                    <h1 className="report-title">Report Lost Item</h1>
                    <p className="report-subtitle">Help us find your lost item by providing details</p>
                </div>

                <div className="form-card">
                    <div className="form-note">
                        ℹ️ <strong>Image upload is an upcoming feature</strong> and will be available in future updates.
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">
                                Item Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                name="itemName"
                                className={`form-input ${errors.itemName ? 'error' : ''}`}
                                placeholder="e.g., Black iPhone 14"
                                value={formData.itemName}
                                onChange={handleChange}
                            />
                            {errors.itemName && <div className="form-error">❌ {errors.itemName}</div>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">
                                    Category <span className="required">*</span>
                                </label>
                                <select
                                    name="category"
                                    className={`form-select ${errors.category ? 'error' : ''}`}
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {errors.category && <div className="form-error">❌ {errors.category}</div>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    University / College <span className="required">*</span>
                                </label>
                                <select
                                    name="university"
                                    className={`form-select ${errors.university ? 'error' : ''}`}
                                    value={formData.university}
                                    onChange={handleChange}
                                >
                                    <option value="">Select your university</option>
                                    {universities.map(uni => (
                                        <option key={uni} value={uni}>{uni}</option>
                                    ))}
                                </select>
                                {errors.university && <div className="form-error">❌ {errors.university}</div>}
                            </div>
                        </div>

                        {formData.category === 'Others' && (
                            <div className="form-group">
                                <label className="form-label">
                                    Specify Category <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="customCategory"
                                    className={`form-input ${errors.customCategory ? 'error' : ''}`}
                                    placeholder="e.g., Watch, Bag, etc."
                                    value={formData.customCategory}
                                    onChange={handleChange}
                                />
                                {errors.customCategory && <div className="form-error">❌ {errors.customCategory}</div>}
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">
                                Location Where Lost <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                name="location"
                                className={`form-input ${errors.location ? 'error' : ''}`}
                                placeholder="e.g., Library, Cafeteria, etc."
                                value={formData.location}
                                onChange={handleChange}
                            />
                            {errors.location && <div className="form-error">❌ {errors.location}</div>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Description <span className="required">*</span>
                            </label>
                            <textarea
                                name="description"
                                className={`form-textarea ${errors.description ? 'error' : ''}`}
                                placeholder="Describe your item in detail (color, size, distinctive marks, etc.)"
                                value={formData.description}
                                onChange={handleChange}
                            />
                            {errors.description && <div className="form-error">❌ {errors.description}</div>}
                        </div>

                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? '⏳ Searching for matches...' : '🔍 Submit & Find Matches'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReportLost
