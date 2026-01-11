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
      description: "Crafting scalable, high-performance web applications using modern architectures. From responsive landing pages to complex enterprise solutions, I deliver clean, maintainable code that drives business growth."
    },
    {
      title: "App Development",
      description: "Engineering intuitive, cross-platform mobile experiences. utilizing React Native to build robust applications that provide seamless user interactions across Android and iOS ecosystems."
    },
    {
      title: "Content Creation",
      description: "Producing high-impact technical content that resonates with audiences. Specialized in breaking down complex concepts into engaging, digestible media formats for diverse platforms."
    },
    {
      title: "Video Editing",
      description: "Transforming raw footage into cinematic narratives. Expert in color grading, sound design, and pacing to create visually stunning stories that captivate viewers and enhance brand identity."
    },
    {
      title: "VFX & Animations",
      description: "Designing immersive visual experiences. Leveraging 3D tools and motion graphics to add depth, realism, and dynamic flair to digital interfaces and video productions."
    },
    {
      title: "Page Automation",
      description: "Streamlining operations through intelligent automation. Developing custom scripts and bots to eliminate repetitive tasks, optimize workflows, and boost operational efficiency."
    },
      title: "UI/UX Design",
      description: "Designing intuitive and accessible user interfaces. Focusing on user-centered design principles to create engaging digital products that delight users."
    },
    {
      title: "SEO Optimization",
      description: "Optimizing websites for search engines to increase visibility and drive organic traffic. Implementing best practices for on-page and technical SEO."
    },
    {
      title: "Cloud Architecture",
      description: "Designing scalable and secure cloud infrastructure. Leveraging AWS/Azure services to ensure high availability and disaster recovery for enterprise applications."
    }
  ];
  res.json(services);
});

app.get('/api/experience', (req, res) => {
    const experience = [
        {
            role: "Senior Full Stack Developer",
            company: "TechSolutions Inc.",
            period: "2023 - Present",
            description: "Leading the development of enterprise-scale web applications. Architected microservices solutions and mentored junior developers. Improved system performance by 40%."
        },
        {
            role: "Freelance Creative Technologist",
            company: "Self-Employed",
            period: "2021 - 2023",
            description: "Delivered custom digital solutions for diverse clients. Combined technical development with creative content strategy to boost client engagement metrics."
        },
        {
            role: "Web Developer",
            company: "Digital Studio",
            period: "2020 - 2021",
            description: "Collaborated with designers to implement pixel-perfect user interfaces. Specialized in frontend animations and interactive experiences."
        },
        {
            role: "Frontend Developer Intern",
            company: "Creative Agencies",
            period: "2019 - 2020",
            description: "Assisted in the development of client websites. Gained hands-on experience with modern frontend frameworks and responsive design techniques."
        },
        {
            role: "Open Source Contributor",
            company: "GitHub Community",
            period: "2018 - Present",
            description: "Actively contributing to various open-source projects. Focusing on tooling, documentation, and community support for developer tools."
        }
    ];
    res.json(experience);
});

app.get('/api/stats', (req, res) => {
    const stats = [
        { value: 17, label: "Web Development", suffix: "+" },
        { value: 3, label: "App Development", suffix: "+" },
        { value: 100, label: "Client Satisfaction", suffix: "%" },
        { value: 24, label: "Support Available", suffix: "/7" },
    ];
    res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
