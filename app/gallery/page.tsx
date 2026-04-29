'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Code review comment -> Use AbortController to cancel fetch if the component unmounts before completion.
    const controller = new AbortController();

    async function fetchFiles() {
      try {
        setLoading(true);
        setError(null);

        // Code review comment -> Always handle non-200 responses explicitly.
        const res = await fetch("/api/gallery", { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();

        // Code review comment -> Validate that data.objects is an array before setting state.
        if (Array.isArray(data.objects)) {
          setFiles(data.objects);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err) {
        // Code review comment -> Differentiate between abort errors and actual failures.
        if (err.name !== "AbortError") {
          console.error("Error fetching files:", err);
          setError("Failed to load files");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      {/* Code review comment -> Provide clear loading and error states for better UX */}
      {loading && <p>Loading files...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Code review comment -> Handle empty list case explicitly */}
      {!loading && !error && files.length === 0 && <p>No files found.</p>}

      <ul>
        {files.map(file => (
          // Code review comment -> Use a stable unique key; S3 object Key is unique in a bucket.
          <li key={file.key}>
            <video width="320" height="240" muted autoPlay loop>
              <source src={file.url} />
              Your browser does not support the video tags
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
}