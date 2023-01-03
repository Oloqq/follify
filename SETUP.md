# Hosting locally

## Prerequisites
1. Install Node.js: https://nodejs.org/en/
2. Get a Spotify account
### Register your app interacting with Spotify API:
1. Go to `https://developer.spotify.com/dashboard/applications`
2. *Create an app*, then in it's overview go to *EDIT SETTINGS*
3. Add those as **Redirect URIs**, remember to actually click *Add*
   - `http://localhost:5000/callback`
   - `http://localhost:5000/panelcallback`
4. *SAVE*

## Before first run
1. Make sure npm is installed: `npm --version`
2. Go to project root and `npm install`
3. Go to `/client` and `npm install`
4. Rename `envtemplate` to `.env`
5. Replace placeholder `!!!` with Client ID and Client Secret from `https://developer.spotify.com/dashboard/applications`.

## Run
1. Open two terminals
2. First terminal - backend:
   - Go to project root and `npm start`
   - You should see a line similar to this: \
   `18:49:28.735 INFO  Follify back-end started on port 5000`
   - Done!
3. Second terminal - frontend:
   - Go to `/client` and `npm start`
   - You should see something similar to code block below
   - React page should automatically open in your browser. If not, go to `http://localhost:3000`
  ```
  Compiled successfully!

  You can now view follify in the browser.

    Local:            http://localhost:3000
    On Your Network:  http://192.168.8.162:3000

  Note that the development build is not optimized.
  To create a production build, use npm run build.

  webpack compiled successfully
  ```


## Tests
Unit tests can be run by `npm test` in project root