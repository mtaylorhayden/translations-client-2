"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("http://localhost:8080/workbooks", {
          credentials: "include",
        });
        const data = await JSON.stringify(response);

        console.log("response in home ", data);

        if (!response.ok) {
          console.log("Invalid username or password in home page");
          // how can we display an error here without state?
          return;
        }
      };
      fetchData();
    } catch (error) {}
  }, []);

  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}
