import express from 'express';
import connectMongoDb from './init/index.js'; 
import dotenv from 'dotenv';
import cors from 'cors'; 
import router from './routes/auth.js';
import adminRouter from './routes/admincontrol.js'; 
import emprouter from './routes/EmployeeControl.js';
dotenv.config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

connectMongoDb();
app.use(express.json());
app.use(cors()); 

app.use('/api', router);
app.use('/admin', adminRouter);
app.use('/employee',emprouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
