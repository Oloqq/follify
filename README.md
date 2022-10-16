# Setup

1. install Node.js https://nodejs.org/en/
2. clone repo `git clone https://github.com/Oloqq/follify.git`
3. backend
   * go to root folder (contains `tsconfig.json`)
   * `npm install`
   * necessary directories should be created during the first bootup, if something fails create the following in root directory:
     * `.data`
     * `logs`
   * create `.env` file and set up the variables (see class Environment in `src/environment.ts`)
     * see sample file below
     * SESSION_SECRET is arbitrary
     * SPOTIFY variables: set up an app on `https://developer.spotify.com/dashboard/login` or DM me for keys. Those not to be shared anywhere.
4. frontend
   * `cd client`
   * `npm install`

### Sample `.env`
```
NODE_ENV=dev
PORT=5000
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
CALLBACK=http://localhost:5000/callback
FRONTEND=http://localhost:3000
SESSION_SECRET=
```

# Running
* start backend through `npm start` in the root folder
  * now you should be able to open http://localhost:5000 in a browser and see an ugly page sent from the backend
* start frontend
  * open another terminal (vscode is great with that)
  * `cd client`
  * `npm start`
  * now you should be able to open http://localhost:3000 and see the page made with react
  * verify that the two can communicate by pressing the inc button and checking if any button changes it's label
* at any point you can run unit tests with `npm test` in the root folder
  * those are tests for the backend, you have to figure out frontend tests yourself
  * if possible, `jest` is nice as it generates code coverage reports

# Development
1. cały frontend jest w folderze `client`
2. przy konfliktach na pushu lepiej żeby git robił rebase niż merge, zalatwia to komenda:<br>`git config --global pull.rebase true`
3. pamietajcie zeby swoje zmiany robic na branchach i laczyc z masterem dopiero jak cos sensownego bedzie gotowe. przed mergem z masterem zpullujcie go
4. przed pushem na masterze upewnijcie sie ze apka sie buduje