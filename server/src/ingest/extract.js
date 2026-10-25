import { extractText, getDocumentProxy } from 'unpdf';
import { readFile } from 'node:fs/promises';


const extractTextFromPDF = async (filePath) => {
    try {
        const buffer = await readFile(filePath);
        const pdf = await getDocumentProxy(new Uint8Array(buffer));

        const { totalPages, text } = await extractText(pdf, { mergePages: false });
        console.log(JSON.stringify(text[0]));
        return { totalPages, text };
    } catch (error) {
        console.error('Error extracting PDF text:', error);
    }
}

extractTextFromPDF('D:/AngelaYu/StudyGraph/server/data/dbms-notes.pdf');;

export { extractTextFromPDF };