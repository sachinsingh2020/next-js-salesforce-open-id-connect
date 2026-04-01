export const getLoginUrl = () => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  });

  return `${process.env.NEXT_PUBLIC_AUTH_URL}?${params.toString()}`;
};
