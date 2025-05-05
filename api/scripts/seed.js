const mongoose = require("mongoose");
const User = require("../models/User"); // <--- MISSING
const Salle = require("../models/Salle");
const Departement = require("../models/Departement");
const SujetPFE = require("../models/SujetPFE");
const Student = require("../models/Student");

mongoose
  .connect("mongodb://127.0.0.1:27017/studentUploaderDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB connected");

    const professors = await User.find({ role: "professor" });
    const students = await Student.find();
    const departments = await Departement.insertMany([
      { name: "Computer Science" },
      { name: "Electrical Engineering" },
      { name: "Mechanical Engineering" },
    ]);
    console.log("✅ Departments added");

    const salles = await Salle.insertMany([
      { name: "Room A1", capacity: 30 },
      { name: "Room B2", capacity: 50 },
      { name: "Room C3", capacity: 20 },
      { name: "Room A2", capacity: 30 },
      { name: "Room B3", capacity: 50 },
      { name: "Room C4", capacity: 20 },
      { name: "Room A3", capacity: 30 },
      { name: "Room B4", capacity: 50 },
      { name: "Room C5", capacity: 20 },
    ]);
    console.log("✅ Salles added");

    const sujets = 
      [
        {
          title: "Blockchain Technology",
          description: "An introduction to blockchain systems and their applications.",
        },
        {
          title: "Quantum Computing Basics",
          description: "Understanding the principles behind quantum computing and its future potential.",
        },
        {
          title: "Natural Language Processing",
          description: "Exploring techniques to process and analyze human language using AI.",
        },
        {
          title: "Augmented Reality in Education",
          description: "Leveraging AR to create immersive learning experiences.",
        },
        {
          title: "Robotics and Automation",
          description: "The role of robotics in modern industries and automation processes.",
        },
        {
          title: "IoT (Internet of Things)",
          description: "Connecting everyday objects to the internet and understanding its impact.",
        },
        {
          title: "Smart Cities",
          description: "Innovations in urban planning and the role of technology in smart city development.",
        },
        {
          title: "AI in Finance",
          description: "Exploring the impact of AI on financial markets and algorithmic trading.",
        },
        {
          title: "Edge Computing",
          description: "Processing data closer to the source to reduce latency and bandwidth usage.",
        },
        {
          title: "Cybersecurity and Ethical Hacking",
          description: "Learning about security techniques and the ethical side of hacking.",
        },
        {
          title: "Cloud Computing",
          description: "An overview of cloud infrastructure and its role in modern tech stacks.",
        },
        {
          title: "3D Printing and Prototyping",
          description: "How 3D printing is changing product design and manufacturing.",
        },
        {
          title: "Game Development with Unity",
          description: "Learning the fundamentals of game development using Unity.",
        },
        {
          title: "Data Analytics and Visualization",
          description: "Techniques for analyzing and visualizing data to gain valuable insights.",
        },
        {
          title: "Computer Vision",
          description: "Building systems that can interpret and understand visual information.",
        },
        {
          title: "Mobile App Development",
          description: "Creating mobile applications for both Android and iOS platforms.",
        },
        {
          title: "Virtual Reality for Gaming",
          description: "Exploring VR technologies and their potential in the gaming industry.",
        },
        {
          title: "AI Ethics and Responsible AI",
          description: "Discussing the ethical implications of AI systems and their societal impact.",
        },
        {
          title: "DevOps and Continuous Integration",
          description: "Understanding the principles of DevOps and how to implement continuous integration and delivery.",
        },
        {
          title: "Chatbots and Conversational AI",
          description: "Building intelligent chatbots that can converse naturally with users.",
        }
      ]
      
   
      for (let i = 0; i < sujets.length; i++) {
        try {
          const randomProfessor =
            professors[Math.floor(Math.random() * professors.length)];
      
          const randomStudent =
            students[Math.floor(Math.random() * students.length)];
      
          const newSujet = new SujetPFE({
            title: sujets[i].title,
            description: sujets[i].description,
            assignedTo: randomProfessor._id,
            studentId: randomStudent._id,
          });
      
          await newSujet.save();
          console.log(`✅ Sujet "${sujets[i].title}" inserted`);
        } catch (err) {
          console.error(`❌ Error inserting sujet "${sujets[i].title}":`, err.message);
        }
      }

    console.log(" All mock data inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
