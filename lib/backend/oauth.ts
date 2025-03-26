const GOOGLE_OAUTH_SIGNIN_API = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_OAUTH_USER_INFO_URL =
  "https://www.googleapis.com/oauth2/v2/userinfo";
const CALLBACK_URL = process.env.APP_URL + "/api/auth/callback/google";

export function getOAuthSignInUrl(redirectUrl: string): string {
  const searchParams = new URLSearchParams({
    client_id: process.env.GOOGLE_ID!,
    redirect_uri: CALLBACK_URL,
    response_type: "code",
    scope: "email profile",
    access_type: "offline",
    state: redirectUrl, // send url to redirect after finished OAuth
  });
  return GOOGLE_OAUTH_SIGNIN_API + "?" + searchParams.toString();
}

export async function handleCallback(
  callbackUrl: string,
): Promise<{ email: string; redirectUrl: string }> {
  const { searchParams } = new URL(callbackUrl);
  const code = searchParams.get("code");
  const redirectUrl = searchParams.get("state") || ""; // get url to redirect after finished OAuth
  if (!code) {
    throw new Error("Authorization code is missing");
  }

  const accessToken = await fetchAccessToken(code);
  const email = await fetchUserEmail(accessToken);
  return { email, redirectUrl };
}

async function fetchAccessToken(code: string): Promise<string> {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_ID!,
    client_secret: process.env.GOOGLE_SECRET!,
    redirect_uri: CALLBACK_URL,
    grant_type: "authorization_code",
    code: code,
  });

  const response = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const tokenData = await response.json();
  if (!tokenData || !tokenData.access_token) {
    throw new Error("Failed to get access token");
  }

  return tokenData.access_token;
}

async function fetchUserEmail(accessToken: string): Promise<string> {
  const response = await fetch(GOOGLE_OAUTH_USER_INFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const userData = await response.json();
  if (!userData.email || !userData.name) {
    throw new Error("Failed to fetch user data");
  }

  return userData.email;
}
