import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';

const API_KEY = '37760459-bf670a4af420eae2f9d25b705';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');

 useEffect(() => {
  const fetchImages = async () => {
    if (!query) return;

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newImages = response.data.hits;

      setImages((prevImages) => (page === 1 ? newImages : [...prevImages, ...newImages]));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchImages();
}, [query, page]);
  const handleSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (largeImageURL) => {
    setLargeImageUrl(largeImageURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery>
        {images.map((image) => (
          <ImageGalleryItem key={image.id} image={image} onClick={handleImageClick} />
        ))}
      </ImageGallery>
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && images.length % 12 === 0 && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
      {showModal && <Modal isOpen={showModal} onClose={handleCloseModal} imageUrl={largeImageUrl} />}
    </div>
  );
}

export default App;
