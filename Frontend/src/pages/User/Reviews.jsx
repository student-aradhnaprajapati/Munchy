import React, { useEffect, useState } from "react";
import { getReviews, addReview } from "../../services/reviewService.js";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newReview.rating || !newReview.comment.trim()) {
      alert("Please provide both a rating and a comment.");
      return;
    }

    try {
      const response = await addReview(newReview);
      setReviews((prev) => [response, ...prev]);
      setNewReview({ rating: 0, comment: "" });
      alert("Thank you for your feedback!");
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ⭐ Customer Reviews
        </h1>

        {/* Add Review Section */}
        <div className="bg-gray-100 p-5 rounded-xl mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Leave a Review
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating Stars */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className={`cursor-pointer text-2xl transition-transform transform hover:scale-110 ${
                      ratingValue <= (hover || newReview.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() =>
                      setNewReview((prev) => ({ ...prev, rating: ratingValue }))
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </div>

            {/* Comment Box */}
            <textarea
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Write your feedback..."
              value={newReview.comment}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, comment: e.target.value }))
              }
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        {loading ? (
          <div className="text-center text-gray-500">Loading reviews...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No reviews yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="space-y-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md bg-white transition"
              >
                {/* Rating and Date */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`${
                          index < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {review.created_at
                      ? new Date(review.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </p>
                </div>

                {/* Review Comment */}
                <p className="text-gray-700">{review.comment}</p>

                {/* Reviewer Name */}
                <p className="text-sm text-gray-500 mt-1">
                  — {review.user_name || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
