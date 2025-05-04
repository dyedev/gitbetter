import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code as string | undefined;

  if (!code) {
    res.status(400).json({ error: "Missing code query parameter" });
    return;
  }

  const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    res
      .status(500)
      .json({ error: "GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is not set" });
    return;
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id,
          client_secret,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      res.status(400).json({
        error: tokenData.error_description || "Error obtaining access token",
      });
      return;
    }

    const accessToken = tokenData.access_token;

    // TODO: You can store the access token in an HttpOnly cookie or session here for authenticated requests
    // For simplicity, just redirect to homepage with token as query (for demonstration, not for production)
    res.redirect(`/?access_token=${accessToken}`);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
