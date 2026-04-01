"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { getLoginUrl } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  const [org1, setOrg1] = useState({});
  const [org2, setOrg2] = useState({});

  const [connected1, setConnected1] = useState(false);
  const [connected2, setConnected2] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("org1_access_token")) setConnected1(true);
    if (localStorage.getItem("org2_access_token")) setConnected2(true);
  }, []);

  const handleConnect = async (orgKey, data) => {
    try {
      // 1. Save config in backend
      await axios.post("/api/save-org", {
        org: orgKey,
        ...data,
      });

      // 2. Redirect to Salesforce
      const url = getLoginUrl(orgKey, data.domain, data.client_id);
      window.location.href = url;
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const renderForm = (orgKey, state, setState, connected) => (
    <div style={{ border: "1px solid black", padding: 20 }}>
      <h3>{orgKey.toUpperCase()}</h3>

      {connected ? (
        <p>✅ Connected</p>
      ) : (
        <>
          <input
            placeholder="Client ID"
            onChange={(e) => setState({ ...state, client_id: e.target.value })}
          />
          <br />
          <br />

          <input
            placeholder="Client Secret"
            onChange={(e) =>
              setState({ ...state, client_secret: e.target.value })
            }
          />
          <br />
          <br />

          <input
            placeholder="Domain (https://xxx.my.salesforce.com)"
            onChange={(e) => setState({ ...state, domain: e.target.value })}
          />
          <br />
          <br />

          <button onClick={() => handleConnect(orgKey, state)}>Connect</button>
        </>
      )}
    </div>
  );

  return (
    <div style={{ padding: 40 }}>
      <h1>Connect Salesforce Orgs</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {renderForm("org1", org1, setOrg1, connected1)}
        {renderForm("org2", org2, setOrg2, connected2)}
      </div>

      <br />

      <button
        disabled={!(connected1 && connected2)}
        onClick={() => router.push("/home")}>
        Enter Application
      </button>
    </div>
  );
}
