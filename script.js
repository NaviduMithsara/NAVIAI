// Replace this with the actual API key you received from Google AI Studio
const API_KEY = "AIzaSyDSy8v_Yj_lnNka52JwrSTmashKY1S1MlI"; 

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const promptForm = document.querySelector('.prompt-form');
const promptInput = document.querySelector('.prompt-input');
const chatsContainer = document.querySelector('.chats-container');

// Function to create message elements
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};


// Scroll to the bottom of the container
const scrollToBottom = () => container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

// Handle form submission
const handleFormSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission
  const userMessage = promptInput.value.trim();
  if (!userMessage) return;

  // Display user message
  chatsContainer.innerHTML += `<div class="message user-message">${userMessage}</div>`;
  promptInput.value = "";

  // API Request
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ]
    })
  });

  const data = await response.json();

  // Display bot response
  const botMessage = data.candidates[0].content.parts[0].text;
  chatsContainer.innerHTML += `<div class="message bot-message">${botMessage}</div>`;
  scrollToBottom();
};

// Listen for form submission
promptForm.addEventListener('submit', handleFormSubmit);
