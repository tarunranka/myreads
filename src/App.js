import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelfs from './BookShelfs.js';
import SearchBar from './SearchBar.js';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books});
    });
  }

  changeBookShelf = (book, newBookShelf) => {
    BooksAPI.update(book, newBookShelf).then(() => {
      this.setState(state => ({
        books: this.state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  };
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookShelfs
              books={this.state.books}
              changeBookShelf={this.changeBookShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBar
              books={this.state.books}
              changeBookShelf={this.changeBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
