import app from './app';
import { connectDB } from './libs/mongodb';

const PORT = process.env.PORT || 4000;

connectDB();
app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
