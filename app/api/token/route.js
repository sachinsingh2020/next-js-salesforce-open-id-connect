import axios from "axios";

export async function POST(req) {
  try {
    console.log("API HIT");

    const { code } = await req.json();
    console.log("CODE:", code);

    if (!code) {
      return Response.json(
        { error: "Authorization code missing" },
        { status: 400 },
      );
    }

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET);
    params.append("redirect_uri", process.env.REDIRECT_URI);

    const response = await axios.post(
      `${process.env.SF_LOGIN_URL}/services/oauth2/token`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    console.log("Salesforce Response:", response.data);

    return Response.json(response.data);
  } catch (error) {
    console.error(
      "Token Exchange Error:",
      error.response?.data || error.message,
    );

    return Response.json(
      {
        error: "Token exchange failed",
        details: error.response?.data,
      },
      { status: 500 },
    );
  }
}
