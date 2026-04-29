'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

function MediaTemplate({ file }) {
  if (file.type === 'mp4') {
    return (
      <video
        width="320"
        height="240"
        muted
        autoPlay
        loop
        className="w-full h-full object-cover object-center"
      >
        <source src={file.url} />
        Your browser does not support the video tag
      </video>
    );
  }

  return (
    <Image
      src={file.url}
      alt={file.key}
      width={128}
      height={128}
      className="rounded-md"
    />
  );
}


export default function Home() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFiles() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/gallery", { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data.objects)) {
          setFiles(data.objects);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">

      {loading && <p>Loading files...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && files.length === 0 && <p>No files found.</p>}

      {files.map(file => (
        <MediaTemplate file={file} key={file.key} />
      ))}
    </div>
  );
}