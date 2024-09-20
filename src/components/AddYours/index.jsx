import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    content: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name, 
          title: formData.title,
          content: formData.content,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post başarıyla eklendi:', data);
        
        setIsSubmitted(true);
        
        setFormData({
          name: '',
          title: '',
          content: '',
        });
      } else {
        console.error('Bir hata oluştu:', response.statusText);
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  };

  return (
    <div>
      <form className="contact-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Enter your thoughts or the post you want to share.."
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>

      {isSubmitted && <p>Sent!</p>}
    </div>
  );
}
