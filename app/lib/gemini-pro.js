import dotenv from "dotenv"
import {GoogleGenerativeAI} from "@google/generative-ai"

dotenv.config()



function extractJSON(jsonString) {
    try {
      // Remove markdown code block syntax (triple backticks)
      const cleanedString = jsonString.replace(/```json\n|\n```/g, '').trim();
      // Parse the cleaned string into a JSON object
      const jsonObject = JSON.parse(cleanedString);
      return jsonObject;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null; // or you can throw the error
    }
  }

export const getDataFromURL = async (url) => {
    // console.log(process.env.REACT_APP_GEMINI_KEY)
    const genAI = new GoogleGenerativeAI("AIzaSyB1Gc9N9M3UfTo7KVCCcQqaK-OQyTcWZOg")
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
    const prompt = `From this url: ${url}, generate a suitable title for it and also create the summary of the webpage. You can only output
    JSON format. Do not write any other format.`
    const result = await model.generateContent(prompt)
    const response = await result.response;
    const text = response.text()
    // text = JSON.parse(text);
    
    return (extractJSON(text));
    // Now, stringify the object into a properly formatted JSON string
    // console.log(JSON.stringify(text, null, 2));
}

export const getInterestsFromURL = async (data) => {
  const genAI = new GoogleGenerativeAI("AIzaSyB1Gc9N9M3UfTo7KVCCcQqaK-OQyTcWZOg")
  const model = genAI.getGenerativeModel({model: "gemini-pro"});
  const prompt = `
  These are the search history of a person
    ${data}
  Generate the user's interests describe using a single word for every interest that the user might have. 
  U can only generate array of word. DO NOT INCLUDE SENTENCES AS THE INTEREST. Use ONLY ARRAY/LIST DATA STRUCTURE TO STORE THESE INTERESTS.
  `  
  const result = await model.generateContent(prompt)
  const response = await result.response;
  const text = response.text()
  console.log(text.split(" ").map(item => item.replace(/[^a-zA-Z ]/g, '').trim()).filter(item => /[a-zA-Z]/.test(item)))
  return text.split(" ").map(item => item.replace(/[^a-zA-Z ]/g, '').trim()).filter(item => /[a-zA-Z]/.test(item))
}
getInterestsFromURL(['Tech Central | For The People', 'Pythonで作った自作のPackageをMavenに公開する', 'Firestore - Adding Data', 'Pythonで作った自作のPackageをMavenに公開する', 'How to get data from Firestore by ID (which is UID)?', 'Firestore - Adding Data', 'Pythonで作った自作のPackageをMavenに公開する', 'Apple ID: A guide for parents and carers']);