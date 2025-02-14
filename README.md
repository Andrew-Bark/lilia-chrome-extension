# AI-Powered Chrome Extension for Context-Informed Translations

## 🚀 Overview
This Chrome extension leverages AI to provide context-informed translations. It enhances language learning and comprehension by offering:

- 📖 **Context-aware translations** for words.
- 🔍 **Synonyms and example sentences** to deepen understanding.
- 📚 **Personal dictionary** where users can save words for later reference.

## 📦 Installation
To run the project locally, follow these steps:

### Backend Setup
To run the backend service, you will need an [OpenAI API key](https://platform.openai.com/signup).
You will also need to make sure you have [MongoDB](https://www.mongodb.com/docs/manual/installation/) installed.
```sh
cd server
npm i
create a .env file and paste your key as OPENAI_API_KEY
nodemon
```

### Frontend Setup
```sh
from the root folder
npm i
npm run dev
```


in chrome, from chrome://extensions/
1. Toggle developer mode
2. Select "load unpacked"
3. Select this project's dist folder

## 🎯 Usage
1. Highlight a word or phrase on any webpage.
2. View translations, synonyms, and contextual examples.
3. Save words to your dictionary for future reference.

![App Preview](assets/app-preview.png)
## 🛠 Technologies Used
- **Express.js** for backend and APIs
- **React.js, Vite, shadcn/ui** for frontend
- **Chrome Extension API** for browser integration
- **OpenAI API** for intelligent translations

## 🤝 Contributing
Feel free to fork this repository and submit pull requests! Any suggestions or feature requests are welcome. 

## 📜 License
This project is licensed under the MIT License.

---
Enjoy seamless, intelligent translations while browsing the web! 🌍✨
