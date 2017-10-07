import React, {Component} from 'react';
import Book from './Book.js';
import PropTypes from 'prop-types';

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  };
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  changeBookShelf={this.props.changeBookShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default BookShelf;
