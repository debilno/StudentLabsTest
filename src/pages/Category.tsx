import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Quote } from "../common/types";
import { useFetch } from "../common/use-fetch.hook";
import LikeButton from "../components/btnLike/LikeButton";
import "./style.css";

interface QuoteResponse {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: Quote[];
}

const Category = () => {
  const [likes, setLikes] = useState<number[]>([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likes") || "[]";
    const parsedLikes = JSON.parse(storedLikes);
    setLikes(parsedLikes);
  }, []);

  function addLike() {
    const newLikes = likes.concat(1);
    localStorage.setItem("likes", JSON.stringify(newLikes));
    setLikes(newLikes);
  }

  function removeLike() {
    const newLikes = likes.filter((like) => like !== 1);
    localStorage.setItem("likes", JSON.stringify(newLikes));
    setLikes(newLikes);
  }

  const splitedHref = window.location.href.split("/");
  const tag = splitedHref[splitedHref.length - 1];
  const [page, setPage] = useState(0);
  const quoteResponse = useFetch<QuoteResponse | null>(
    `https://api.quotable.io/quotes?page=${page}&tags=${tag}`,
    undefined,
    null,
    [page]
  );

  if (quoteResponse === null) {
    return null;
  }

  return (
    <main className="page">
      <h2 className="title-1">Category — {decodeURI(tag)}</h2>

      <div className="btn-container">
        <button
          className="btn-back"
          onClick={() =>
            quoteResponse.page - 1 > 0 && setPage(quoteResponse.page - 1)
          }
        >
          PREV
        </button>
        <button
          className="btn-next"
          onClick={() =>
            quoteResponse.page + 1 <= quoteResponse.totalPages &&
            setPage(quoteResponse.page + 1)
          }
        >
          NEXT
        </button>
        <div className="pageCount">
          {" "}
          page {quoteResponse.page}/{quoteResponse.totalPages}
        </div>
      </div>

      <ListGroup>
        {quoteResponse.results.map((quote) => (
          <ListGroup.Item
            key={quote._id}
            className="d-flex flex-column flex-md-row justify-content-between listGroup align-items-start wrapper"
          >
            <div className="col-12 col-md-8 ">
              <div className="ms-2 me-auto listGroup ">
                <div className="fw-bold">{quote.content}</div>
                <div>— {quote.author}</div>
              </div>
            </div>

            <div className="quote-rating">
              <LikeButton
                quoteId={quote._id}
                onLike={likes.length === 0 ? addLike : removeLike}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </main>
  );
};

export default Category;
