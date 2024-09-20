import React, { useState, useEffect, useContext, createContext } from 'react';

export default function Home() {
  return (
    <div className="home-section">
      <h2>Welcome to Our Blog!</h2>
      <p>
        Hey there! 👋 We're thrilled to have you here. This is not just another blog; it's a cozy little corner of the internet where we share thoughts, stories, and things that fascinate us. Grab a cup of coffee (or tea, no judgment here) and stay a while!
      </p>
      <p>
        Feel free to explore our content, whether you're into tech, lifestyle, or just here to see what all the fuss is about. Got questions or thoughts? Hit us up on the <strong><a href="#/addyours">AddYours</a></strong> page!
      </p>
      <h3>What to Expect</h3>
      <p>
        On this blog, we dive deep into topics that range from the latest trends in technology to personal stories and life hacks. We believe in creating a community where curiosity thrives and learning never stops. Whether you’re looking to up your coding skills or just want to unwind with some light reading, we've got you covered.
      </p>
      <h3>Join the Conversation</h3>
      <p>
        We’re more than just readers and writers here—we're a community. Your thoughts, feedback, and ideas are what make this space so special. So don’t be shy! Comment on our posts, share your ideas, and let’s grow together. Welcome to the family!
      </p>
    </div>
  );
}