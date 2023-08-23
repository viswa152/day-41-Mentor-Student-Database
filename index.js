require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

const URL = process.env.ATLAS_URI;
mongoose
  .connect(URL)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

//Creating Schema
var mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  course: { type: String, required: true },
  studentsAssigned: [],
});

var studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  batch: { type: String, required: true },
  course: { type: String, required: true },
  mentor: {
    type: [],
  },
});

// Creating Model
const MentorModel = mongoose.model("Mentor", mentorSchema, "mentors");

const StudentModel = mongoose.model("Students", studentSchema, "students");

// api endpoint for homepage
app.get("/", function (req, res) {
  res.send(" <h1>Day 41 Task - Student_Mentor Assigning with DB</h1>");
});

// api endpoint to get mentors details
app.get("/mentors", (req, res) => {
  MentorModel.find({}, {}).then((men) => {
    res.status(200).json(men);
  });
});

// api endpoint to get students details
app.get("/students", (req, res) => {
  StudentModel.find({}, {}).then((stu) => {
    res.status(200).json(stu);
  });
});

// 1. api endpoint to create new mentor
app.post("/create-mentor", async (req, res) => {
  const { name, email, course } = req.body;
  const addMentor = new MentorModel({
    name: name,
    email: email,
    course: course,
  });

  try {
    let mentor = await addMentor.save();
    res.status(200).send({
      mentor,
      message: "New mentor details added!",
    });
  } catch (error) {
    res.status(404).send({
      message: "Please enter valid data",
      error,
    });
  }
});

// 2. api endpoint to create new student
app.post("/create-student", async (req, res) => {
  const addStudent = new StudentModel({
    name: req.body.name,
    email: req.body.email,
    batch: req.body.batch,
    course: req.body.course,
    mentor: req.body.mentor ? req.body.mentor : undefined,
  });
  try {
    let student = await addStudent.save();
    res.status(200).send({
      student,
      message: "New student details added!",
    });
  } catch (error) {
    res.status(404).send({
      message: "Please enter valid data",
      error,
    });
  }
});

// 3. api endpoint to assign a student to mentor
app.post("/assign-student/:mentorId/:studentId", async (req, res) => {
  try {
    const { mentorId, studentId } = req.params;
    const mentor = await MentorModel.findById(mentorId);
    const student = await StudentModel.findById(studentId);

    let mentorName = mentor.name;
    let studentName = student.name;

    if (!student || !mentor) {
      return res.status(404).json({ message: "Not found" });
    }

    mentor.studentsAssigned.push(studentName);

    student.mentor.push(mentorName);
    await mentor.save();
    await student.save();
    res
      .status(200)
      .json({ message: "student assigned to mentor successfully" });
  } catch (error) {
    console.log(error);
  }
});

// 4. api endpoint to assign or change mentor for a particular student
app.post("/change-mentor/:studentId/:mentorId", async (req, res) => {
  const { mentorId, studentId } = req.params;
  const mentor = await MentorModel.findById(mentorId);
  const student = await StudentModel.findById(studentId);

  let mentorName = mentor.name;
  let studentName = student.name;

  try {
    student.mentor.push(mentorName);
    mentor.studentsAssigned = studentName;

    await student.save();
    await mentor.save();
    res.send(student);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

//  5. api endpoint to show all students of a particluar mentor
app.get("/mentor/:mentorId/studentList", async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await MentorModel.findById(mentorId);
    if (!mentor) return res.status(404).json({ error: "not found" });
    let mentorsStudent = {
      Name: `${mentor.name}`,
      StudentList: `${mentor.studentsAssigned}`,
    };
    return res.status(200).json(mentorsStudent);
  } catch (error) {
    console.log(error);
  }
});

//  6. api endpoint to show the previously assigned mentor for a particular student
app.get("/previous-mentor/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await StudentModel.findById(studentId);
    let mentorList = student.mentor;
    let mentorsStudent = {
      Name: `${student.name}`,
      PreviousMentor: `${student.mentor[0]}`,
    };

    if (mentorList.length == 0)
      return res.status(404).json({ error: "Mentor details not found" });
    else return res.status(200).json(mentorsStudent);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
