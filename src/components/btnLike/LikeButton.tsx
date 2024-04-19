import React, { useState, useEffect } from "react";
import "./btnStyle.css";

interface LikeButtonProps {
  quoteId: string;
  onLike: () => void;
}

export default function LikeButton({
  quoteId,
  onLike,
}: LikeButtonProps) {
  const isLikedItem = `isLiked-${quoteId}`;
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    return localStorage.getItem(isLikedItem) === "true";
  });

  useEffect(() => {
    localStorage.setItem(isLikedItem, String(isLiked));
  }, [isLiked]);

  function handleLike() {
    setIsLiked(!isLiked);
    onLike();
  }

  return (
    <button className={`${isLiked ? "liked" : "unliked"}`} onClick={handleLike}>
      {isLiked ? (
        <span className="material-icons">favorite</span>
      ) : (
        <span className="material-icons">favorite_border</span>
      )}
    </button>
  );
}
