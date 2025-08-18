"use client";

import { useEffect, useRef, useState } from "react";

export default function TweetEmbed({ tweetId }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const isEmbeddingRef = useRef(false);
  const hasEmbeddedRef = useRef(false);

  useEffect(() => {
    const create = async () => {
      if (!containerRef.current || !window.twttr || !window.twttr.widgets)
        return;
      if (hasEmbeddedRef.current || isEmbeddingRef.current) return;
      isEmbeddingRef.current = true;
      containerRef.current.innerHTML = "";
      try {
        await window.twttr.widgets.createTweet(tweetId, containerRef.current, {
          align: "center",
          theme: "light",
          dnt: true,
        });
        hasEmbeddedRef.current = true;
        setLoaded(true);
      } finally {
        isEmbeddingRef.current = false;
      }
    };

    if (typeof window === "undefined") return;

    if (window.twttr && window.twttr.widgets) {
      create();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", create, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.addEventListener("load", create, { once: true });
    document.body.appendChild(script);
  }, [tweetId]);

  return (
    <div className="my-6">
      <div ref={containerRef} />
      {!loaded && (
        <a
          href={`https://x.com/i/status/${tweetId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600"
        >
          View on X
        </a>
      )}
    </div>
  );
}
