import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const BookDetailPage = () => {
  const params = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddReading = () => {};

  useEffect(() => {
    const fetchBooksData = async () => {
      let url = `http://localhost:5000/books/${params.id}`;
      setLoading(true);
      try {
        const data = await fetch(url);
        if (data.ok) {
          const results = await data.json();
          console.log(results);
          setBook(results);
        } else {
          const error = await data.text;
          console.log(error);
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchBooksData();
  }, [params.id]);

  return (
    <Card
      className="d-flex flex-row justify-content-center"
      style={{ width: "35rem" }}
    >
      <div>
        <Card.Img src={`http://localhost:5000/${book.imageLink}`} />
      </div>
      <div>
        <Card.Body>
          <Card.Title>
            <h1>{book?.title}</h1>
          </Card.Title>
          <Card.Text>
            <div>
              <b>Author:</b> {book?.author}
            </div>
            <div>
              <b>Year:</b> {book?.year}
            </div>
            <div>
              <b>Country:</b> {book?.country}
            </div>
            <div>
              <b>Pages:</b> {book?.pages}
            </div>
            <div>
              <b>Language:</b> {book?.language}
            </div>
          </Card.Text>
          <Button onClick={() => handleAddReading()} className="mt-1">
            Add to Reading
          </Button>
        </Card.Body>
      </div>
    </Card>
  );
};

export default BookDetailPage;
