// Response after requesting a token
interface SpotifyTokens {
  accessToken: string;
  expiry: Date;
  refreshToken: string;
}

// Row of the authorization table
interface UserTokens {
  userId: string;
  accessToken: string;
  expiry: Date;
  refreshToken: string;
}