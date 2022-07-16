import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/Postdetails.css";

function Postdetails() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const fetchPost = async () => {
      const url = `http://hn.algolia.com/api/v1/items/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setItems(data);
    };

    fetchPost();
    setIsLoading(false);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <h1>Hacker News</h1>

      <section className="section-post">
        <button onClick={() => navigate(-1)} className="btn1">
          Go back
        </button>
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <article className="cards">
              <div>
                <h2>{items.title}</h2>
                <ul>
                  <li>By {items.author}</li>
                  <li>
                    <a href={items.url} target="_blank" rel="noreferrer">
                      Read more
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>Points: {items.points}</li>
                </ul>
              </div>
            </article>
          </>
        )}
      </section>
    </>
  );
}

export default Postdetails;
