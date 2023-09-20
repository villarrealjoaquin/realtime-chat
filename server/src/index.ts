import server from './app';
import { connectDB } from './libs/mongodb';

const PORT = process.env.PORT || 4000;

connectDB();
server.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
