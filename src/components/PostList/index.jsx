
import React, { useState } from 'react';
import more from '../../assets/more.svg';

export default function PostList({ posts, setPostId }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  const paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <div className="select-page-size">
        <label htmlFor="pageSize">Posts per page: </label>
        <select id="pageSize" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="24">24</option>
        </select>
      </div>

      <div className="post-grid">
        {paginatedPosts.map((x) => (
          <div key={x.id} className="post-item">
            <h3>{x.title}</h3>
            <p>Author: {x.user.name}</p>
            <p>Posted on: {new Date(x.createdAt).toLocaleString()}</p> 
            <button
              className="post-btn"
              onClick={(e) => {
                e.preventDefault();
                setPostId(x.id); 
              }}
            >
              Read more... <img src={more} alt="" />
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((prevPage) => prevPage - 1)}
          disabled={page === 1}
          className={page === 1 ? 'disabled' : ''}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={page * pageSize >= posts.length}
          className={page * pageSize >= posts.length ? 'disabled' : ''}
        >
          Next
        </button>
      </div>
    </>
  );
}
