if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express, { Request, Response } from 'express';
import cors from "cors";

const app = express();
app.use(cors());

app.get('/', (req: Request, res: Response)=> {
  res.send('bruh');
});

app.get('/testAPI', (req: Request, res: Response)=> {
  res.send("BRUH")
});
// check if port defined
var listener = app.listen(process.env.PORT, () => {
  console.log('started');
})