import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"; // Assuming you're using React Bootstrap for styling

// Sample data representing pages or content of your site
const pages: Page[] = [
  {
    title: "Home",
    content: "View details on the Arena Arcade, and why you should buy it",
    link: "/home",
  },
  {
    title: "Pricing",
    content: "Learn about our offers and deals that are currently available",
    link: "/pricing",
  },
  {
    title: "Leaderboard",
    content: "Keep up with who's dominating th Arena right now",
    link: "/leaderboard",
  },
];

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Page[]>([]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = pages.filter((page) => {
      // Search in both title and content for the query
      return (
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setSearchResults(results);
  };

  return (
    <div style={{ position: "relative" }}>
      <Form className="d-flex" onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline-success" type="submit">
          Go
        </Button>
      </Form>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 100,
            padding: "1rem",
            background: "#343a40",
          }}
        >
          <h3 className="text-light">Search Results:</h3>
          <ul className="list-unstyled">
            {searchResults.map((result, index) => (
              <li key={index}>
                <a href={result.link}>{result.title}:</a> {result.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
