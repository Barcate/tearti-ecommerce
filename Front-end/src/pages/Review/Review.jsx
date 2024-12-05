import { useState, useEffect } from "react";
import "./Review.css";
import { useNavigate, useParams } from "react-router-dom";

const Review = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:5000/reviews/${id}`);
  
      if (!response.ok) {
        alert('Houve um erro ao buscar reviews.');
        navigate('/carrinho');
      } else {
        const data = await response.json();
        setComments(data.reviews)
    
        console.log(data)
      }
    })()
  }, [])

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    let isValid = true;

    if (!token) {
      navigate('/login');
      isValid = false;
    } else {
      fetch('http://localhost:5000/usuarios/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(async (response) => {
        if (!response.ok) {
          localStorage.clear();
          isValid = false;
          navigate('/login');
        }
      })
    }


    if (newComment.trim()) {
      const newCommentObj = {
        avaliacao: newRating,
        texto: newComment,
        produtoId: id
      };

      fetch(`http://localhost:5000/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCommentObj)
      })


      setComments([...comments, newCommentObj]);
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
              className={`estrela ${rating <= newRating ? "cheio" : ""}`}
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
            <p className="author">{comment.nome}</p>
            <p className="comment">{comment.texto}</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  className={`estrela ${rating <= comment.avaliacao ? "cheio" : ""}`}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
