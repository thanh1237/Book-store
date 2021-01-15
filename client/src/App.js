import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import PublicNavbar from "./components/PublicNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookDetailPage from "./pages/BookDetailPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ReadingPage from "./pages/ReadingPage";
import "./App.css";

export const App = () => {
  const BACKEND_API = process.env.REACT_APP_BACKEND_API;
  const [scroll, setScroll] = useState(false);

  const handleScroll = (e) => {
    e.preventDefault();
    setScroll(true);
    console.log(scroll);
  };

  return (
    <div  className="App">
      <Router >
        <PublicNavbar scroll={scroll} />
        <Container>
          <Switch>
            <Route exact path="/books/:id" component={BookDetailPage} />
            <Route exact path="/reading" component={ReadingPage} />
            <Route exact path="/" component={() => <HomePage />} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
