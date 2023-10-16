const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const auth = require('../middleware/auth'); 

router.get('/', async (req, res) => {
    const employees = await Employee.find();
    res.send(employees);
});

router.post('/', auth, async (req, res) => {
    // Validate input...
    let employee = new Employee({
        // ...req.body
    });
    employee = await employee.save();
    res.status(201).send(employee);
});

router.get('/:id', async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send('Employee not found.');
    res.send(employee);
});

router.put('/:id', auth, async (req, res) => {
    // Validate input...
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).send('Employee not found.');
    res.send(employee);
});

router.delete('/:id', auth, async (req, res) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).send('Employee not found.');
    res.status(204).send();
});

module.exports = router;
