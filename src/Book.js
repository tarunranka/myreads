import React, {Component} from 'react';
import PropTypes from 'prop-types';
import noImg from './icons/No_Image_Available.png';

class Book extends Component {
  state = {
    cuurentShelf: ''
  };
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  };
  changeBookShelf = event => {
    this.props.changeBookShelf(this.props.book, event.target.value);
    this.setState({
      cuurentShelf: event.target.value
    });
    this.props.book.shelf = event.target.value;
  };
  render() {
    const {book} = this.props;
    const coverImg =
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : noImg;
    const title = book.title || 'Book Title is missing';
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${coverImg}")`
            }}
          />
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.changeBookShelf}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {book.authors && (
          <div className="book-authors">
            {book.authors.map((author, index) => (
              <span className="book-author" key={index + book.id}>
                {author}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Book;
