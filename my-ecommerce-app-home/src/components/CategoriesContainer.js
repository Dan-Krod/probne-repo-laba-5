import React from 'react';
import Categories from './Categories';

const CategoriesContainer = () => {
  const categoriesData = [
    {
      id: 1,
      title: 'Books',
      image: 'books.jpg',
      description: 'Find the latest releases and bestsellers.',
      items: ['Fiction', 'Historical', 'Other...'],
    },
    {
      id: 2,
      title: 'Audiobooks',
      image: 'audiobooks.jpg',
      description: 'Listen to your favorite books on the go.',
      items: ['New Releases', 'Bestsellers', 'Exclusive Collections'],
    },
    {
      id: 3,
      title: 'Author signs',
      image: 'sign-writer.jpg',
      description: 'Explore exclusive photographs of famous authors.',
      items: ['Signed Photos', 'High-Quality Prints', 'Limited Editions'],
    },
    {
      id: 4,
      title: 'Book Events',
      image: 'book-event.jpg',
      description: 'Buy tickets to upcoming book events and meetings.',
      items: ['Meet & Greet Events', 'Book Signings', 'Author Talks'],
    },
    {
      id: 5,
      title: 'Magazines',
      image: 'magazines.jpg',
      description: 'Browse the latest issues of popular magazines.',
      items: ['Fashion', 'Technology', 'Health'],
    },
  ];

  return <Categories categories={categoriesData} />;
};

export default CategoriesContainer;
