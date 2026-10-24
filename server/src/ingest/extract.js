import { extractText, getDocumentProxy } from 'unpdf';
import { readFile } from 'node:fs/promises';


const extractTextFromPDF = async (filePath) => {
    try {
        const buffer = await readFile(filePath);
        const pdf = await getDocumentProxy(new Uint8Array(buffer));

        const { totalPages, text } = await extractText(pdf, { mergePages: false });

        return { totalPages, text };
    } catch (error) {
        console.error('Error extracting PDF text:', error);
    }
}

export { extractTextFromPDF };