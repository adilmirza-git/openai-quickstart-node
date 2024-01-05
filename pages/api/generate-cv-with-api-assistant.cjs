const express = require('express');
//const { Configuration, OpenAIApi, Assistant } = require('openai');
const {OpenAI} = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:4200' // Configure to accept requests from your Angular app
}));



//const configuration = new Configuration ({
  //apiKey: process.env.OPENAI_API_KEY, -- To be corrected
  //apiKey: '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',
//});
//const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  //apiKey: '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', // This is the default and can be omitted
  apiKey: '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',


});

console.log (openai.apiKey)

app.post('/generate-cv-with-api-assistant', async (req, res) => {
  if (!openai.apiKey) {
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
   
    console.log("Before creating assistant");
    const assistant = await openai.beta.assistants.create({
      name: "CV Writer",
      instructions: "You are a CV Writer. Re Write a CV from the existing CV and the Job Description",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-3.5-turbo-1106"
    });


    console.log("Assistant created successfully");

    const thread = await openai.beta.threads.create();

    console.log("Thread created successfully");

    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "assistant",
      //  content: "You are a CV Writer. Re Write a CV from the existing CV and the Job Description"
      content: `Rewrite a CV from my Existing CV and the Job Description
      Job Description: ${jobDescription}
      Existing CV: ${existingCV}`
      }
    );

    console.log("Message created successfully");


    const run = await openai.beta.threads.runs.create(
      thread.id,
      { 
        assistant_id: assistant.id,
        instructions: "Please address the user as Mirza. The user has a premium account."
      }
    );

    console.log("Run Assistant");

    const messages = await openai.beta.threads.messages.list(
      thread.id
    );

    console.log("Return Assistant Response");

/*const conversation = await assistant.createConversation();

    await conversation.appendMessage({
      role: "system",
      content: "You are a CV Writer. Re Write a CV from the existing CV and the Job Description"
    });

    await conversation.appendMessage({
      role: "user",
      content: `Rewrite a CV from my old CV and the Job Description
      Job Description: ${jobDescription}
      Existing CV: ${existingCV}`
    });

    const messages = await conversation.getMessages();
*/
    res.status(200).json(messages.data);


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


const PORT = process.env.PORT || 3092;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



