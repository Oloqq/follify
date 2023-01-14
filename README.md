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
3. Rename `envtemplate` to `.env`
4. Replace placeholder `!!!` with Client ID and Client Secret from `https://developer.spotify.com/dashboard/applications`.

## Run
1. Go to project root and `npm start`

# Development

## Setup
1. Perform the steps described in *Hosting locally* section
2. Go to `/client` and `npm install` to prepare React app for development
3. Adjust environment variables (`.env`) to use React's port during development
   1. Alternatively, each time you update React app `npm build` in `client` and copy `client/build` folder to `src/views`

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

# Deployment

1. Set `REACT_APP_PATH` in `client/.env` to url of your deployed app.
2. Build the React app by running `npm run build` in `client`
3. Copy `client/build` to `src/views`. This step is not automated in case React app contains experimental changes.
4. Run deployment script with `npm run deploy`. The script will output complete compiled app in `dist`.
5. The script will force-push contents of `dist` to a github repo so that it can be imported on a hosting service. Edit `deploy.js` to change that repo's link or disable that behavior.
6. Import the packaged code on your hosting service
7. Set environment variables by analogy to those in `.env`. Set `NODE_ENV=production`
8. Install dependencies with `npm install`
9. Start the app with `npm start`