import express from 'express'
import connectDB from './config/db.js'
import videoRoutes from './routes/videoRoutes.js'
import dotenv from 'dotenv'
const app = express()
app.use(express.json());
const port = 3000

dotenv.config();

connectDB();



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use("/api/videos", videoRoutes);



