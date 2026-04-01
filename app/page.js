"use client";

import { getLoginUrl } from "@/lib/auth";

export default function Login() {
  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Salesforce OAuth (Web Server Flow)</h2>
      <button onClick={handleLogin}>Login with Salesforce</button>
    </div>
  );
}
