import { useState } from "react";
import "./Review.css";

const Review = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      rating: 4,
      text: "Ótimo produto! A qualidade é excelente e o atendimento foi muito bom. Recomendo!",
    },
    {
      id: 2,
      rating: 3,
      text: "Produto bom, mas achei o preço um pouco alto comparado a outros similares no mercado.",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        rating: newRating,
        text: newComment,
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  const handleRatingChange = (rating) => {
    setNewRating(rating);
  };

  return (
    <div className="review-container">
      <h1 className="review-title">Comentários do Produto</h1>

      {/* Formulário de Comentário */}
      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Deixe seu comentário..."
          required
        ></textarea>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((rating) => (
            <span
              key={rating}
              className={`estrela ${rating <= newRating ? "filled" : ""}`}
              onClick={() => handleRatingChange(rating)}
            >
              &#9733;
            </span>
          ))}
        </div>

        <button type="submit">Enviar Comentário</button>
      </form>

      {/* Lista de Comentários */}
      <div className="review-list">
        {comments.map((comment) => (
          <div key={comment.id} className="review-item">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  className={`estrela ${rating <= comment.rating ? "filled" : ""}`}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <p className="comment">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
