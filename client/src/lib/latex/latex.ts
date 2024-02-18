import * as monaco from "monaco-editor-core";
import IRichLanguageConfiguration = monaco.languages.LanguageConfiguration;
import ILanguage = monaco.languages.IMonarchLanguage;

export const richLanguageConfiguration: IRichLanguageConfiguration = {
    // If we want to support code folding, brackets ... ( [], (), {}....), we can override some properties here
    // check the doc
};

export const monarchLanguage: ILanguage = {
    tokenizer: {
        root: [
            [/(\\[a-zA-Z]+\*?)(\{)/, ["keyword", "delimiter.bracket"]],
            [/(\\[a-zA-Z]+\*?)/, ["keyword"]],
            [/(%.*)/, 'comment'],
        ]
    },
}
