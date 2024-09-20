import { useEffect, useRef, useState, useContext } from "react";
import { CommentsContext } from '../../App';

export default function PostDetail() {
  const { postId, comments, setComments, setPostId } = useContext(CommentsContext);
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!postId) {
      setError("Geçersiz postId");
      setIsLoading(false);
      return;
    }

    async function getData() {
      try {
        console.log("Post ID:", postId);
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`);

        if (!response.ok) {
          throw new Error(`Veri alınamadı, status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (e) {
        console.error("Hata:", e);
        setError("Veri yüklenirken bir hata oluştu.");
        setIsLoading(false);
      }
    }

    getData();
  }, [postId, refresh]);

  const handleAddNewCommentForm = async (e) => {
    e.preventDefault();
    const formObj = Object.fromEntries(new FormData(e.target));

    const newComment = {
      postId,
      ...formObj,
    };

    try {
      const response = await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
      if (response.ok) {
        const updatedComments = await response.json();
        setComments([...comments, updatedComments]);
        setRefresh(!refresh);
        formRef.current.reset();
      }
    } catch (e) {
      setError("Bir hata oluştu, yorum eklenemedi.");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setPostId(null); 
    setComments([]);
  };

  return (
    <div className="post-details">
      {isLoading ? (
        <div>Yükleniyor...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <p>
            <a href="#" onClick={handleClick} className="back-btn">
              &larr; Back to Blog Page
            </a>
          </p>
          <h1>{data.title}</h1>
          <p className="post-content">{data.content}</p>

          <div className="post-info">
            <span>Author: {data.user.name}</span>
            <span>Posted on: {new Date(data.createdAt).toLocaleString()}</span>
            <span>Likes: {data.likes}</span>
            <span>Dislikes: {data.dislikes}</span>
          </div>

          <div className="tags">
            {data.tags?.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>

          <form ref={formRef} onSubmit={handleAddNewCommentForm} className="comment-form">
            <textarea name="content" placeholder="Yorumunuz"></textarea>
            <br />
            <button type="submit">Yorumu Gönder</button>
          </form>

          <div className="comments-section">
            {data.comments?.reverse().map((comment) => (
              <div key={comment.id} className="comment">
                <p>{comment.content}</p>
                <button>Like {comment.likes}</button>
                <button>Dislike {comment.dislikes}</button>
              </div>
            ))}
          </div>

          {error && <small>{error}</small>}
        </div>
      )}
    </div>
  );
}
