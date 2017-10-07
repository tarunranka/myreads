import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book.js';
import PropTypes from 'prop-types';
import Loader from './Loader';

class SearchBar extends Component {
  state = {
    searchedBook: [],
    searchResult: true,
    loading: false,
    query: ''
  };
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  };
  updateQuery = query => {
    query = query.trim();
    this.setState({query: query});
    if (query) {
      this.setState({loading: true});
      BooksAPI.search(query, 20).then(selectedBook => {
        if (selectedBook.length > 0) {
          selectedBook.forEach((book, index) => {
            const isSameBook = this.props.books.find(b => {
              return book.id === b.id;
            });
            if (isSameBook) {
              selectedBook[index].shelf = isSameBook.shelf;
            } else {
              selectedBook[index].shelf = 'none';
            }
            this.setState({searchedBook: selectedBook, searchResult: true});
          });
        } else {
          this.setState({searchedBook: [], searchResult: false});
        }
        this.setState({loading: false});
      });
    } else {
      this.setState({searchedBook: [], searchResult: true});
    }
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        {this.state.loading && <Loader />}
        {this.state.searchedBook.length !== 0 &&
        !this.state.loading && (
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.searchedBook.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    changeBookShelf={this.props.changeBookShelf}
                  />
                </li>
              ))}
            </ol>
          </div>
        )}
        {this.state.searchedBook.length === 0 &&
        !this.state.searchResult && (
          <div className="search-books-results">
            <h3>Sorry, no Books found!</h3>
            <p>Please check the spelling or try searching for something else</p>
          </div>
        )}
      </div>
    );
  }
}

export default SearchBar;
