import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/EmployeeReview.css';

const EmployeeReview = () => {
    const { organization_name, userid } = useParams();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Component rendered');

        const getReviews = async () => {
            try {
                console.log(`Fetching reviews for org: ${organization_name}, user: ${userid}`);
                const reviewData = await axios.get(`http://localhost:3000/admin/getreviews/${organization_name}/${userid}`);
                setReviews(reviewData.data);
            } catch (error) {
                console.error('Failed to fetch employee reviews:', error);
                setError(error.message);
            }
        };
        getReviews();
    }, [organization_name, userid]);

    return (
        <div className="review-container">
            <button className="back-button" onClick={() => navigate(`/adminhome/${organization_name}/${userid}`)}>
                Back to Dashboard
            </button>
            {error && <p className="error-message">{error}</p>}
            {reviews.map((review) => (
                <div className="review-box" key={review._id}>
                    <p><strong>Reviewed by:</strong> {review.Reviewedby.empname}</p>
                    <p><strong>Review:</strong> {review.ReviewContent}</p>
                </div>
            ))}
        </div>
    );
};

export default EmployeeReview;
