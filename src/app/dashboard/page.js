"use client";

import { useEffect, useState } from "react";

export default function DashboardClient() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    setToken(tokenValue);
  }, []);

  if (token) return <p>Redirecting...</p>; //!token 

  return <h1>Welcome to your dashboard!</h1>;
}
