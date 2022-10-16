if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

function assert(variable: string) {
  if (process.env[variable] === undefined) {
    console.log(`FATAL: environment.${variable} is not set`);
    process.exit();
  }
}

(function verifyEnvironment() {
  assert("NODE_ENV");
  assert("PORT");
  assert("SPOTIFY_CLIENT_ID");
  assert("SPOTIFY_CLIENT_SECRET");
  assert("CALLBACK");
  assert("FRONTEND");
  assert("SESSION_SECRET");
})();