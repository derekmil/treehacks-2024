export default class AutocompleteService {
    static async getPromptResponse(prompt: string) {
        console.log("Prompt:", prompt);
        // console.log(prompt.type)
        const response = await fetch('http://localhost:8000/ai/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });
        return await response.json() as { text: string };
    }
}