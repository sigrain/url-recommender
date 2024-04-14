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
getDataFromURL("https://man7.org/linux/man-pages/man3/getenv.3.html");