import express from 'express';
import Organization from '../models/orginit.js';
import Employee from '../models/Employee.js';
import Work from '../models/Work.js'
import transporter from '../Controller/UserAuth.js';
import Review from '../models/Review.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

const adminRouter = express.Router();

adminRouter.post('/addemployee/:organization_name/:employeeId', async (req, res) => {
    const { organization_name, employeeId } = req.params;
    const { empname, mail, password, age, Employeestatus, rating, projectspending } = req.body;

    try {
        const admin = await Employee.findById(employeeId);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        const adminmail = admin.mail;

        const organization = await Organization.findOne({ organization_name });
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newEmployee = new Employee({
            empname,
            mail,
            password: hashedPassword,
            age,
            Employeestatus,
            rating,
            projectspending,
            organization: organization._id,
        });

        await newEmployee.save();

        organization.employees.push(newEmployee._id);
        await organization.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: mail,
            subject: `Welcome Onboard..You Are Now Officially an Employee in ${organization_name}`,
            text: `Hello ${empname},\n\nHere are your Login Details!\n\nYour Email-ID is: ${mail}\n\nYour password: ${password}..\n\n
            Your Admin for the ${organization_name} is ${admin.empname}. Contact him using ${adminmail}.\n\n
            Head To Employee Dashboard and change your Password\n\nBest regards,\n\nThis is an auto-generated email, please do not reply.`,
        });

        res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Failed to add employee' });
    }
});

adminRouter.get('/employee/:employeeId', async (req, res) => {
    try {
      const { employeeId } = req.params;
      const employee = await Employee.findById(employeeId);
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json(employee);
    } catch (error) {
      console.error('Error fetching employee details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  adminRouter.delete('/deleteemployee/:organization_name/:employeeId', async (req, res) => {
    const { organization_name, employeeId } = req.params;
  
    try {
      // Find the organization
      const organization = await Organization.findOne({ organization_name });
      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }
      const employee = await Employee.findByIdAndDelete(employeeId);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Remove the employee from the organization's employees list
      organization.employees.pull(employeeId);
      await organization.save();
  
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Failed to delete employee:', error);
      res.status(500).json({ error: 'Failed to delete employee', details: error.message });
    }
  });
  adminRouter.get('/getemployees/:organization_name', async (req, res) => {
    const { organization_name } = req.params;
    try {
      const organization = await Organization.findOne({ organization_name }).populate('employees');
      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }
      res.status(200).json({ employees: organization.employees });
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      res.status(500).json({ error: 'Failed to fetch employees', details: error.message });
    }
  });
  adminRouter.post('/addwork/:organization_name/:employeeId', async (req, res) => {
    const { organization_name, employeeId } = req.params;
    const { title, description, due_date, assigned_to } = req.body;
  
    try {
      const organization = await Organization.findOne({ organization_name });
      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }
  
      const employee = await Employee.findById(employeeId);
      const workassigningemp = await Employee.findById(assigned_to);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      if (!workassigningemp) {
        return res.status(404).json({ error: 'Assigned employee not found' });
      }
  
      workassigningemp.projectspending = workassigningemp.projectspending + 1;
  
      const newWork = new Work({
        organization_id: organization._id,
        assigned_by: employee._id,
        assigned_to: assigned_to,
        title,
        description,
        due_date
      });
  
      await newWork.save();
      await workassigningemp.save(); 
      res.status(200).json({ message: 'Work added successfully' });
    } catch (error) {
      console.error('Failed to add work:', error);
      res.status(500).json({ error: 'Failed to add work', details: error.message });
    }
  });
  adminRouter.get('/getreviews/:organization_name/:userId', async (req, res) => {
    const { organization_name, userId } = req.params;
    try {
        const organization = await Organization.findOne({ organization_name });
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        const reviews = await Review.find({ 
            organization_name: organization._id, 
            Reviewedto: userId 
        }).populate('Reviewedby', 'empname');

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Failed to get reviews:', error);
        res.status(500).json({ error: 'Failed to get reviews', details: error.message });
    }
});

adminRouter.post('/promoteemployee/:organization_name/:promotingemployeeId', async (req, res) => {
  const { organization_name,promotingemployeeId } = req.params;

  try {
    const employee = await Employee.findById(promotingemployeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    if (employee.Employeestatus === "Manager") {
      return res.status(400).json({ error: 'Employee is already a Manager' });
    }

    employee.Employeestatus = "Manager";
    employee.admincode = Math.floor(10000 + Math.random() * 90000);
    await employee.save();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: mail,
      subject: `You are PROMOTED,you are now A Manager in ${organization_name}`,
      text: `CONGRATULATIONS ${employee.empname},\n\n
        Your Admin for the ${organization_name} --- ${admin.empname} has Promoted You . Contact him using ${adminmail}.\n\n
        Your Admin Dashboard Password is:
      \n\nBest regards,\n\nThis is an auto-generated email, please do not reply.`,
  });
    res.status(200).json({ message: 'Employee promoted successfully', employee });
  } catch (error) {
    console.error('Failed to promote employee:', error);
    res.status(500).json({ error: 'Failed to promote employee', details: error.message });
  }
});


export default adminRouter;
