//import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3090;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:4200' // Configure to accept requests from your Angular app
}));

// Middleware
app.use(bodyParser.json());


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Define API endpoints
app.post('/api/optimization', (req, res) => {
  // Handle resume optimization logic here
  
  const jobDescription = req.body.jobDescription;
  const jobSeekerResume = req.body.jobSeekerResume;
  
  // Perform resume optimization based on the job description and job seeker's resume
  // Add your logic here to extract keywords, identify gaps, and generate suggestions
  
  // Return the optimized resume
  res.json({ optimizedResume: `Your optimized ${jobDescription}` });
  });
  
  
  // Start the server
  app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
  });
  

module.exports = async function (req, res) { 

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  } 
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
