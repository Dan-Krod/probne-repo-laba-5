import React from 'react';
import '../styles/MainContent.css';

const MainContent = () => {
  return(
    <main>
      <section className="banner">
        <div className="banner-image">
          <img src="/images.jpg" alt="Bookshelf with books" />
        </div>
        <div className="banner-text">
          <h2>Welcome to the World of Books</h2>
          <p>
            Dive into an ocean of stories, where every page leads you on a new adventure. 
            Discover bestsellers, hidden gems, and exclusive collections, all handpicked for book lovers like you. 
            Whether you're a fan of fiction, biographies, or audiobooks, you'll find your next great read here...
          </p>
          <p className="fun-fact">
            <strong>Did you know?</strong> The world's smallest book is only 0.07 mm wide!
          </p>
        </div>
      </section>
    </main>
  );
};
export default MainContent;
