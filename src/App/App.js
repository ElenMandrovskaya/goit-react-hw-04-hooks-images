import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../services/api';
import { Container } from './App.styled';
import { SearchBar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Modal } from '../components/Modal/Modal';
import { Spinner } from '../components/Loader/Spinner';
import { LoadBtn } from '../components/Button/Button'

export default class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    status: 'idle',
    page: 1,
    // showModal: false,
    selectedImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: "pending" });
      try {
        const images = await fetchImages(searchQuery, page);
        if (!images.length) {
          throw new Error();
        }
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          status: "resolved",
        }));
      } catch (error) {
        this.setState({
          status: "rejected"
        });
        toast.warning(`Not Found any images by query: ${searchQuery}`);
      }

      page > 1 &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
    }
  };

  handleQueryChange = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      toast.info('Please, enter new query!');
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  };

  resetState = () => {
    this.setState({
      searchQuery: "",
      page: 1,
      images: [],
      selectedImage: null,
      status: "idle",
    });
  };

  toggleModal = () => {
    this.setState(({ selectedImage }) => ({
      selectedImage: !selectedImage,
    }));
  };

  incrementPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  handleSelectedImage = imageURL => {
    this.setState({ selectedImage: imageURL });
  };
  

  render() {

    const { images, selectedImage, status } = this.state;

    if (status === "idle") {
      return (
        <Container>
          <SearchBar onSearch={this.handleQueryChange} />
        </Container>
      )
    }

    if (status === "pending") {
      return (
        <Container>
          <SearchBar onSearch={this.handleQueryChange} />
          <Spinner />
        </Container>
      )
   }

    if (status === "resolved") {
          return (
          <Container>
            <SearchBar onSearch={this.handleQueryChange} />
            <ImageGallery images={images} onImageSelect={this.handleSelectedImage}/>
            {images.length > 0 && <LoadBtn onClick={this.incrementPage} />}
            {selectedImage && (
              <Modal largeImageURL={selectedImage} onClose={this.toggleModal} />
            )}
            <ToastContainer />
          </Container>
        )}
      
    if (status === "rejected") {
        return (
          <Container>
            <SearchBar onSearch={this.handleQueryChange} />
            <ToastContainer />
          </Container>
        )}
  }
}

