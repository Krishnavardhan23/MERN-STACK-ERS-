import express from 'express';
import Organization from '../models/orginit.js';
import Employee from '../models/Employee.js';
import transporter from '../Controller/UserAuth.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
  const { organization_name, mail, adminname } = req.body;

  try {
    if (!organization_name || !mail || !adminname) {
      return res.status(422).json({ error: "FILL ALL THE FIELDS PROPERLY" });
    }
    const Org = await Organization.findOne({ mail });
    if (Org) {
      return res.status(400).json({ error: 'Organization with this email already exists' });
    }
    const newOrganization = new Organization({
      organization_name,
      mail,
      adminname,
    });
    await newOrganization.save();
    res.status(201).json({ message: 'Organization registered successfully', organization: newOrganization });
  } catch (error) {
    console.error('Error registering organization:', error);
    res.status(500).json({ error: 'Failed to register organization', details: error.message });
  }
});

router.post('/admindetails', async (req, res) => {
  const { organizationName, password, age, Employeestatus } = req.body;

  try {
    const organization = await Organization.findOne({ organization_name: organizationName });
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const admincode = Math.floor(10000 + Math.random() * 90000);
    const newEmployee = new Employee({
      empname: organization.adminname,
      organization: organization._id,
      mail: organization.mail,
      password,
      age,
      Employeestatus,
      rating: 4,
      role: Employeestatus,
      admincode,
    });

    await newEmployee.save();
    organization.employees.push(newEmployee._id);
    await organization.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: organization.mail,
      subject: 'Thank You for Registering Your Organization In ERS',
      text: `Hello ${organization.adminname},\n\nHere are your Login Details!\n\nYour Email-ID is: ${organization.mail}\n\nYour password: ${password}\n\nYour admin dashboard code: ${admincode}\n\nBest regards,\n\nThis is an auto-generated email, please do not reply.`,
    });

    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'This email is already registered.' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  }
});

router.get('/fetchorgdata', async (req, res) => {
  const { organization_name } = req.query;

  try {
    const organization = await Organization.findOne({ organization_name });
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { organization_name, mail, password } = req.body;

  try {
    if (!organization_name || !mail || !password) {
      return res.status(400).json({ error: 'All credentials for login are not filled' });
    }

    const organization = await Organization.findOne({ organization_name });
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const employee = await Employee.findOne({ organization: organization._id, mail });
    if (!employee) {
      return res.status(404).json({ error: 'Mail ID does not exist in the organization' });
    }

    const isPasswordMatch = await bcrypt.compare(password, employee.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', organization_name, employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
});

router.get('/employee/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch employee details', details: error.message });
  }
});

router.post('/adminlogin/:organization_name/:id', async (req, res) => {
  const { organization_name, id } = req.params;
  const { mail, admincode } = req.body;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    console.log(`Comparing: ${employee.mail} (type: ${typeof employee.mail}) === ${mail.trim()} (type: ${typeof mail.trim()}) && ${employee.admincode} (type: ${typeof employee.admincode}) === ${Number(admincode)} (type: ${typeof Number(admincode)})`);
    if (employee.mail.trim() !== mail.trim() || employee.admincode !== Number(admincode)) {
      return res.status(401).json({ error: 'Incorrect mail ID or admin code' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});

router.get('/fetchadmindata/:organization_name/:empId', async (req, res) => {
  const { organization_name, empId } = req.params;

  try {
    const admin = await Employee.findById(empId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin ID not found' });
    }

    const organization = await Organization.findOne({ organization_name });
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const employeeDetails = [];
    for (const employeeId of organization.employees) {
      const employee = await Employee.findById(employeeId);
      if (employee) {
        employeeDetails.push(employee);
      }
    }

    res.status(200).json({ message: 'Data fetched', admin, employees: employeeDetails });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});
export default router;
