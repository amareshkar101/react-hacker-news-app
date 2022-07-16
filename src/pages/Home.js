import React from "react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Home.css";

function Home() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchNews = async () => {
      const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
      const res = await fetch(url);
      const data = await res.json();

      setItems(data.hits);
    };

    fetchNews();
    setIsLoading(false);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      toast.error("Input is empty");
    } else {
      setQuery(text);
      setText("");
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <h1>Hacker News</h1>
      <section className="section">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Search for something"
            autoComplete="off"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Search
          </button>
        </form>
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <p className="category">
              Category: <span>{query}</span>
            </p>
            <article className="cards">
              {items.map((item) => {
                const { author, created_at, objectID, title } = item;

                return (
                  <div
                    key={objectID}
                    onClick={() => {
                      navigate("/postdetails/" + objectID);
                    }}
                  >
                    <h2>{title}</h2>
                    <ul>
                      <li>By {author}</li>
                      <li></li>
                    </ul>
                    <p>{format(new Date(created_at), "dd MMMM yyyy")}</p>
                  </div>
                );
              })}
            </article>
          </>
        )}
      </section>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Home;
