const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function interactWithAssistant(Input) {
  try {
    const assistants =  await openai.beta.assistants.retrieve("asst_OPPcV3Uq1Uw6TEYT9ybb4ZTC");

    let thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: Input,
    });

    await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistants.id,
    });

    while (true) {
      thread = await openai.beta.threads.retrieve(thread.id);
      console.log(thread);
      if (thread.status !== 'processing') {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
    }
    //await new Promise(resolve => setTimeout(resolve, 2000));

    // Here we await the result of messages.list before trying to access its properties
    const messages = await openai.beta.threads.messages.list(thread.id);

    // Ensure messages.data exists before attempting to access it
  
    if (messages.data) {
      const assistantMessage = messages.data.find(message => message.role === "assistant");
      if (assistantMessage) {
        console.log(assistantMessage.content);
        return assistantMessage.content;
      }

    } else {
      console.log("No messages found or incorrect response format.");
    }
  } catch (error) {
    console.error("Error:", error);
  }

}

module.exports.RunAI = interactWithAssistant;