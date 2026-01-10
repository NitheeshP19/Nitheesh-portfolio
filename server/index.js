import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // In a real app, you would send an email here using nodemailer or similar
  console.log('Received contact form submission:', { name, email, message });
  
  // Simulate success
  res.status(200).json({ success: true, message: 'Message sent successfully!' });
});

// Mock Data Routes
app.get('/api/services', (req, res) => {
  const services = [
    {
      title: "Web Development",
      description: "Building responsive, high-performance websites using React, Tailwind, and modern frameworks."
    },
    {
      title: "App Development",
      description: "Creating seamless mobile experiences for Android and iOS using modern technologies."
    },
    {
      title: "Content Creation",
      description: "Producing engaging tech content that educates and entertaining audiences across platforms."
    },
    {
      title: "Video Editing",
      description: "Professional video editing services with cinematic cuts, color grading, and storytelling."
    },
    {
      title: "VFX & Animations",
      description: "Adding magic to visuals with high-quality visual effects and motion graphics."
    },
    {
      title: "Page Automation",
      description: "Automating workflows and page interactions to save time and increase efficiency."
    }
  ];
  res.json(services);
});

app.get('/api/stats', (req, res) => {
    const stats = [
        { value: 17, label: "Web Projects", suffix: "+" },
        { value: 3, label: "App Projects", suffix: "+" },
        { value: 100, label: "Client Satisfaction", suffix: "%" },
        { value: 24, label: "Support Available", suffix: "/7" },
    ];
    res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
