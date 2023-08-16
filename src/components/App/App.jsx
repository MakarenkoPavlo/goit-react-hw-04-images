import React, { Component } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';

const API_KEY = '37760459-bf670a4af420eae2f9d25b705';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageUrl: '',
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    if (!query) return;

    this.setState({ isLoading: true });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newImages = response.data.hits;

      this.setState((prevState) => ({
        images: page === 1 ? newImages : [...prevState.images, ...newImages],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = (query) => {
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ largeImageUrl: largeImageURL, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, isLoading, showModal, largeImageUrl } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={this.handleImageClick}
            />
          ))}
        </ImageGallery>
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && images.length % 12 === 0 && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        {showModal && (
          <Modal isOpen={showModal} onClose={this.handleCloseModal} imageUrl={largeImageUrl} />
        )}
      </div>
    );
  }
}

export default App;