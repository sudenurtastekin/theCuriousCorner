import { useState, useEffect, useContext } from 'react';
import { CommentsContext } from '../../App';

export default function Sidebar() {
  const { setPostId } = useContext(CommentsContext);

  const handlePostClick = (postId) => {
    setPostId(postId); 
    location.hash = "#/blog"; 
  };

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      const data = await response.json();

      const recentPosts = data.reverse().slice(0, 15);
      setPosts(recentPosts);
    } catch (error) {
      console.error('Postları çekerken bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    const intervalId = setInterval(fetchPosts, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="sidebar">
      <div className="widget"></div>

      <div className="widget">
        <h4>Son Eklenen Postlar</h4>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <button onClick={() => handlePostClick(post.id)}>
                {post.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
