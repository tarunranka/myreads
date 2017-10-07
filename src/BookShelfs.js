import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import Loader from './Loader';

class BookShelfs extends Component {
  getBookShelf(shelfName) {
    return this.props.books.filter(books => books.shelf === shelfName);
  }
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  };
  render() {
    const shelftype = [
      {
        type: 'currentlyReading',
        title: 'Currently Reading',
        id: 'shelf1'
      },
      {
        type: 'wantToRead',
        title: 'Currently Reading',
        id: 'shelf2'
      },
      {
        type: 'read',
        title: 'read',
        id: 'shelf3'
      }
    ];
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {this.props.books.length === 0 && <Loader />}
            {this.props.books.length !== 0 && (
              <div>
                {shelftype.map(type => (
                  <BookShelf
                    title={type.title}
                    books={this.getBookShelf(type.type)}
                    changeBookShelf={this.props.changeBookShelf}
                    key={type.id}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}
export default BookShelfs;
