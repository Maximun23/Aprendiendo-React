import React from 'react';

const ContentSection = ({ id, title, content, active }) => {
  return (
    <section className={`content-container ${active === id ? "active" : "hidden"}`} id={id}>
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
};

export default ContentSection;
