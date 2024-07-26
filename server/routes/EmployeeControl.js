import express from 'express';
import Organization from '../models/orginit.js';
import Employee from '../models/Employee.js';
import Work from '../models/Work.js'
import transporter from '../Controller/UserAuth.js';
import Review from '../models/Review.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();
const emprouter = express.Router();
emprouter.get('/getemployeedata/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    try 
    {
      const employee = await Employee.findById(employeeId);
      if (!employee) 
        {
            return res.status(404).json({ error: 'Employee not found' });
        }
      res.status(200).json({ employee });
    } 
    catch (error) 
    {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch employee details', details: error.message });
    }
  });
  emprouter.post('/changepassword/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const { currentPassword, newPassword } = req.body;
  
    try {
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      const isMatch = await bcrypt.compare(currentPassword, employee.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
  
      const salt = await bcrypt.genSalt(12);
      employee.password = await bcrypt.hash(newPassword, salt);
      await employee.save();
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: employee.mail,
        subject: 'Your Password has Been Updated',
        text: `Dear ${employee.empname},\n\nYour password has been updated. If you did not make this change, please contact your admin.\n\nThank you.`,
      });
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Failed to change password', details: error.message });
    }
  });
  
  
  emprouter.post('/forgotpassword/:employeeId', async (req, res) => {
    const { email, password } = req.body;

    try {
      const employee = await Employee.findOne({ mail: email });
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      const salt = await bcrypt.genSalt(12);
      employee.password = await bcrypt.hash(password, salt);
      await employee.save();
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Password has Been Changed',
        text: `Dear ${employee.empname},\n\nYour password has been updated. If you did not make this change, please contact your admin.\n\nThank you.`,
      });
  
      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Failed to reset password', details: error.message });
    }
  });
  
  
export default emprouter;