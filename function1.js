import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "";

document.getElementById('pro').addEventListener('click', myfunction);

async function myfunction() {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Write a JavaScript code to add two numbers.";
        const result = await model.generateContent(prompt);
        
        if (!result || !result.response || !result.response.text) {
            throw new Error("Unexpected API response format.");
        }

        const responseText = result.response.text();
        document.getElementById('pro1').innerHTML = `<pre><code id="animatedCode"></code></pre>`;
        const codeContainer = document.getElementById('animatedCode');

        // Split the response text into lines
        const lines = responseText.split("\n");

        // Initialize variables to detect code block start and end
        let insideCodeBlock = false;
        let index = 0;

        const interval = setInterval(() => {
            if (index < lines.length) {
                const line = lines[index];
                const lineElement = document.createElement("span");

                // Detect start and end of the code block (assuming "```" denotes code block)
                if (line.includes("```")) {
                    insideCodeBlock = !insideCodeBlock; // Toggle flag
                    index++;
                    return; // Skip the delimiter line itself
                }

                // Apply styling only if inside the code block
                if (insideCodeBlock) {
                    lineElement.style.backgroundColor = "black";
                    lineElement.style.color = "white";
                }

                // Set the line content and add line breaks
                lineElement.textContent = line + "\n";
                codeContainer.appendChild(lineElement);

                index++;
            } else {
                clearInterval(interval); // Stop when done
            }
        }, 500); // Adjust interval for animation speed
    } catch (error) {
        console.error("Error generating content:", error);
        document.getElementById('pro1').innerHTML = "Error generating content.";
    }
}
