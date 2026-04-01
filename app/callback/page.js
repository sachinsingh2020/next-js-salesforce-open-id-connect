"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      console.error("OAuth Error:", error);
      return;
    }

    if (code) {
      axios
        .post("/api/token", { code })
        .then((res) => {
          console.log("Token Response:", res.data);

          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("instance_url", res.data.instance_url);

          router.push("/dashboard");
        })
        .catch((err) => {
          console.error("Axios Error:", err.response?.data || err.message);
        });
    }
  }, [router]);

  return <h2>Processing Salesforce Login...</h2>;
}
