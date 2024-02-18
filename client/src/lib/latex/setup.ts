import * as monacoCore from 'monaco-editor-core';
import { richLanguageConfiguration, monarchLanguage } from "./latex";

export const languageID = "latex";

export const languageExtensionPoint = {
    id: languageID,
}

export function setupLanguage(monaco: typeof monacoCore) {
    monaco.languages.register(languageExtensionPoint);
    monaco.languages.onLanguage(languageID, () => {
        monaco.languages.setMonarchTokensProvider(languageID, monarchLanguage);
		monaco.languages.setLanguageConfiguration(languageID, richLanguageConfiguration);
    });
}
