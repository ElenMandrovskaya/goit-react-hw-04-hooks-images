import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header, SearchForm, SubmitBtn, BtnLabel, Input } from "./Searchbar.styled"

export function SearchBar({ onSearch }) {
  const handleSearch = e => {
    e.preventDefault();
    if (e.target.elements.searchQuery.value.trim() === "") {
      toast.info('Please, enter query!');
      return
    }
    onSearch(e.target.elements.searchQuery.value.toLowerCase().trim());
    e.target.elements.searchQuery.value = "";
  };

    return (
        <Header>
          <SearchForm
              onSubmit={handleSearch}>
                <SubmitBtn type="submit">
                    <BtnLabel>Search</BtnLabel>
                </SubmitBtn>
                <Input
                    name="searchQuery"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"/>
          </SearchForm>
        </Header>
    );
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};