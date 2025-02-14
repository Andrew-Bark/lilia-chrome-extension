chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "translateWord",
      title: "Translate",
      contexts: ["selection"]
    });
  });


  // initialise wordData with placeholder data
const wordData = {targetLanguage: "English", isDifficultyEnabled: false, word: "", sentence: "", difficulty: 0, sourceLanguage: "German"};

// this function returns the selected word and the sentence that it is contained within. It does so by looking for punctuation before and after the selected word.
// If it can't find any, it looks for boundaries of a node. 
function getSelectedText() {
    const selection = window.getSelection() as Selection;
    const text = selection.toString().trim();
    if (text.split(' ').length > 1) {
        //TODO: Show user they can only select a word.
        console.log("more than one word selected")
        return;
    } 

    
    if (text) {
        const range = selection.getRangeAt(0);
        const node = range.startContainer;
        const nodeText = node.textContent as String;
        
        // Get the start and end offset of the selected text within the node
        const startOffset = range.startOffset;
        const endOffset = range.endOffset;
        // Find the sentence boundaries
        const beforeSelection = nodeText.slice(0, startOffset);
        const afterSelection = nodeText.slice(endOffset);
        
        // Use regular expressions to find the boundaries of the sentence
        const sentenceStart = beforeSelection.lastIndexOf('.') + 1 || 0;
        let sentenceEnd = afterSelection.search(/[.!?]/) + endOffset;

        while (
            // continue if its a decimal number (eg 4.5 is not the end of the sentence)
            sentenceEnd !== -1 && 
            /\d/.test(nodeText.charAt(sentenceEnd - 1)) && 
            /\d/.test(nodeText.charAt(sentenceEnd + 1)) 
        ) {
            const nextEnd = nodeText.slice(sentenceEnd + 1).search(/[.!?]/) + sentenceEnd + 1;
            if (nextEnd === sentenceEnd + 1) {
                // No further periods found, break the loop
                break;
            }
            sentenceEnd = nextEnd;
        }
        if (sentenceEnd === -1) {
            sentenceEnd = nodeText.length;
        }
          
        // If no punctuation is found after the selection, return the rest of the text
        const finalSentenceEnd = sentenceEnd > endOffset ? sentenceEnd : nodeText.length;
    
        const sentence = nodeText.slice(sentenceStart, finalSentenceEnd).trim();
    
        return {sentence: sentence, word: text};
      }

    
    return null;
}
  

// This function fetches the translation data from the backend, passing the user's preferences (diffuclty, target language, source language)
async function fetchTranslation(textObj: any, tab: any) {
    // send this textObj to the server, with the parameters (difficultyenabled, difficulty, target language)
    wordData.word = textObj.word;
    wordData.sentence = textObj.sentence;
    try {
      const response = await fetch('http://localhost:3000/message', {
        method: "POST", 
        body: JSON.stringify(wordData),
        headers: {
            "Content-Type": "application/json"
        },
    })
    const translation = await response.json();
    const tabId = tab.id;
    // send the translation and user preferences to content.tsx, which mounts the translation component
    chrome.tabs.sendMessage(tabId, { type: 'DISPLAY_TRANSLATION', data: { ...wordData, translation } } , (response) => {
      if (chrome.runtime.lastError) {
          console.log('Error sending message:', chrome.runtime.lastError);
      } else {
          console.log('Message sent successfully');
      }
    });
    
  } catch (error) {
      console.log('API fetching error', error)
    }
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const tabId: number = tab?.id ?? 20; 
    if (info.menuItemId === "translateWord") {
      chrome.scripting.executeScript({
        target: { tabId },
        func: getSelectedText
      }, (results) => {
        const selectedText = results[0].result;
        if (selectedText) {
          fetchTranslation(selectedText, tab);
        }
      });
    }
});


  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'SEND_DATA') {
      
      console.log('Received data from app:', message.data);
      if (message.data.targetLanguage) {
        wordData.targetLanguage =message.data.targetLanguage;
      } else if(message.data.sourceLanguage) {
        wordData.sourceLanguage = message.data.sourceLanguage;
      } else {
        wordData.isDifficultyEnabled =message.data.isDifficultyEnabled;
        if (message.data.isDifficultyEnabled) {
            wordData.difficulty =message.data.difficulty;
        }
      }
    }
    console.log("wordData", wordData);
  });