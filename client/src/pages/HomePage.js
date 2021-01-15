import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Row, Card, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import SearchForm from "../components/SearchForm";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleClickBook = (bookId) => {
    console.log(history);
    history.push(`/books/${bookId}`);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === "") {
      setQuery("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  const totalPageNum = 10;
  const limit = 10;

  useEffect(() => {
    const fetchBooksData = async () => {
      let url = `http://localhost:5000/books?_page=${pageNum}&_limit${limit}`;
      setLoading(true);
      try {
        if (query) url += `&q=${query}`;
        const data = await fetch(url);
        if (data.ok) {
          const results = await data.json();
          console.log(results);
          setBooks(results);
          setError("");
        } else {
          const error = await data.text;
          setError("Something doesn't work on the server side");
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchBooksData();
  }, [pageNum, limit, query]);

  return (
    <div>
      <h1>Home Page</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <SearchForm
        loading={loading}
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
      />
      <Row>
        <Col>
          <ul>
            <li className="d-flex  flex-wrap justify-content-around  ">
              {books.map((book) => (
                <Card
                  onClick={() => handleClickBook(book.id)}
                  style={{ width: "18rem" }}
                  key={`${book.id}`}
                  className="mt-5"
                >
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/${book.imageLink}`}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{`@${book.author}`}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </li>
          </ul>
        </Col>
      </Row>

      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
      />
    </div>
  );
};

export default HomePage;
