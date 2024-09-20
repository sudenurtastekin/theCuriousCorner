import React, { useState, useEffect, useContext, createContext } from 'react';

export default function About() {
  return (
    <div className="about-section">
      <h2>Who We Are</h2>
      <p>
        We're just a bunch of passionate individuals who believe in the magic of words, tech, and everything in between.
        Our goal? To make your time here worth every second. Whether we're talking about coding tips, life hacks, or deep dives into obscure topics—you're in for a treat.
      </p>

      <h3>Our Mission</h3>
      <p>
        Our mission is simple: to create a space where curiosity meets creativity. We're here to inspire, inform, and maybe even make you chuckle now and then.
      </p>

      <h3>Meet the Crew</h3>
      <ul className="crew-list">
        <li><strong>Sudenur Taştekin</strong> - CEO & Founder. The big boss, but also the one who brings in donuts every Friday. 🍩</li>
        <li><strong>Arda Toraman</strong> - Lead Developer. The coding ninja. If it's broken, she’ll fix it. If it's not broken, she’ll make it better.</li>
        <li><strong>Sıla Kara</strong> - UX/UI Designer. The one who makes everything look pretty and works like a charm.</li>
      </ul>
    </div>
  );
}