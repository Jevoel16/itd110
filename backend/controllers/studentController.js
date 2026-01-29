const Student = require('../models/Student');

// Function to classify income 
const classification = (income) => {
    if (income < 240000) return 'Poor';
    if (income >= 240000 && income < 480000) return 'Lower Middle Class';
    if (income >= 480000 && income < 960000) return 'Middle Class';
    if (income >= 960000 && income < 1800000) return 'Upper Middle Class';
    if (income >= 1800000 && income < 4500000) return 'Rich';
    if (income >= 4500000 && income < 6000000) return 'Advanced Affluent';
    if (income >= 6000000 && income < 24000000) return 'Mega Rich';
    return 'Ultra Rich';

}

// Get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single student
const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create student
const createStudent = async (req, res) => {
    try {
        const { name, email, course, annual_household_income} = req.body;
        const income_class = classification(annual_household_income);
        const student = await Student.create({ name, email, course, annual_household_income, income_class });
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update student
const updateStudent = async (req, res) => {
    try {
        const { name, email, course, annual_household_income } = req.body;
        const income_class = classification(annual_household_income);
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { name, email, course, annual_household_income, income_class },
            { new: true, runValidators: true }
        );
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete student
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    classification
};
