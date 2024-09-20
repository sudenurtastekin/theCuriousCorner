import { useContext, useState, useEffect } from 'react';
import { CommentsContext } from '../../App'; 
import PostDetail from '../PostDetail';
import PostList from '../PostList';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const { postId, setPostId } = useContext(CommentsContext);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');  
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          console.log("Postlar başarıyla çekildi:", data); 
        } else {
          console.error('Postlar çekilirken hata oluştu:', response.statusText);
          setError("Postlar yüklenemedi.");
        }
      } catch (error) {
        console.error('Bir hata oluştu:', error);
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {postId ? (
        <PostDetail postId={postId} setPostId={setPostId} />
      ) : (
        <PostList posts={posts} setPostId={setPostId} />
      )}
    </>
  );
}
