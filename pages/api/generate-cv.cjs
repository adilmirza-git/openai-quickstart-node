const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:4200' // Configure to accept requests from your Angular app
}));



const configuration = new Configuration({
  //apiKey: process.env.OPENAI_API_KEY, -- To be corrected
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

app.post('/generate-cv', async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).send({
      error: "OpenAI API key not configured, please follow instructions in README.md",
    });
    return;
  }

  const jobDescription = req.body.jobDescription || '';
  const existingCV = req.body.existingCV || '';

  if (jobDescription.trim().length === 0) {
    res.status(400).send({
      error: "Please enter a valid job description",
    });
    return;
  }

  if (existingCV.trim().length === 0) {
    res.status(400).send({
      error: "Please enter an existing CV",
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt: generatePrompt(jobDescription, existingCV),
      temperature: 0.6,
      max_tokens: 3000 
    });
    //res.status(200).send({ result: completion.data });
    res.status(200).json(completion.data);
  } catch(error) {
    // Error handling logic
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).send({
        error: 'An error occurred during your request.',
      });
    }
  }
});

function generatePrompt(jobDescription, existingCV) {
  //const capitalizedAnimal = jobDescription[0].toUpperCase() + jobDescription.slice(1).toLowerCase();
 // return `create a CV that matches the job Description: ${jobDescription}`;

 return `Here is a job description and an existing CV. 
 Please rewrite the CV to better match the requirements and preferences outlined in the job description, 
 highlighting relevant skills, experiences, and qualifications. 
 
 Make the CV more appealing for this specific job opportunity. 
 
 Job Description: ${jobDescription}  
 
 Existing CV: ${existingCV}`;

}

const PORT = process.env.PORT || 3091;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



