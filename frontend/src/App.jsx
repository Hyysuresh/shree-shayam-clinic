import { useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-orb" />
        <p>Preparing your smile experience...</p>
      </div>
    );
  }

  return <HomePage />;
}

