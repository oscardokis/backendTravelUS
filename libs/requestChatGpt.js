const OpenAI = require("openai");
const { config } = require('../config');
const openai = new OpenAI({
  apiKey: config.apiKeyOpenAI,
});

async function mainChatGpt({city, state, activity, month}) {

  const activitiesPrompt = {
    prompt: "Respond only using this JSON object with the properties included in this JSON object. Respond with only valid JSON",
    question: `List 3 things with a description for activities to do at/in ${city} ${state} if the focus of the trip is ${activity} in ${month}, fun fact of each activity and accessories that you will need to do the activity (at least one). ThingsToDo should have a property called activity, description, accessories and funFact. accessories must be a string. Always respond with at least one activity`,
    thingsToDo: [],
  };

  const activitiesResponse = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." },
    { role: "user", content: JSON.stringify(activitiesPrompt) }],
    model: "gpt-3.5-turbo",
    max_tokens: 450,
  });
  console.log(JSON.parse(activitiesResponse.choices[0].message.content))
  return JSON.parse(activitiesResponse.choices[0].message.content);
}

module.exports = { mainChatGpt } ;