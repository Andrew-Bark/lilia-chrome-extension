import mountTranslationPopup from '../src/TranslationComponent';

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'DISPLAY_TRANSLATION') {
        mountTranslationPopup();
    }
});