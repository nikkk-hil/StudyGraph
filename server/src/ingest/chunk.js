/**
 * Cleans page-level PDF text before it is split into chunks.
 *
 * The returned array always has one entry for each input page, so callers can
 * attach chunks to their original page number.
 */
const cleanPagesForChunking = (pageTexts, { repeatedLineThreshold = 0.3 } = {}) => {
    if (!Array.isArray(pageTexts)) {
        throw new TypeError('pageTexts must be an array containing one string per page');
    }

    if (!Number.isFinite(repeatedLineThreshold) || repeatedLineThreshold < 0) {
        throw new RangeError('repeatedLineThreshold must be a non-negative number');
    }

    const pages = pageTexts.map((pageText, index) => {
        if (typeof pageText !== 'string') {
            throw new TypeError(`pageTexts[${index}] must be a string`);
        }

        return pageText.split(/\r?\n/);
    });

    // Count a line once per page. A repeated line within a single page should
    // not make it look like a document-wide header or footer.
    const pageFrequency = new Map();
    for (const lines of pages) {
        for (const line of new Set(lines)) {
            if (line.length > 0) {
                pageFrequency.set(line, (pageFrequency.get(line) ?? 0) + 1);
            }
        }
    }

    const repeatedLineLimit = pages.length * repeatedLineThreshold;

    return pages.map((lines) => {
        const withoutHeadersFootersOrPageNumbers = lines.filter((line) => {
            const isPageNumber = /^\d+$/.test(line.trim());
            const occursOnMultiplePages = (pageFrequency.get(line) ?? 0) > 1;
            const isRepeatedHeaderOrFooter = occursOnMultiplePages
                && pageFrequency.get(line) > repeatedLineLimit;

            return !isPageNumber && !isRepeatedHeaderOrFooter;
        });

        return withoutHeadersFootersOrPageNumbers;
    });
};

const chunkBySentence = (pageTexts) => {
    if (!Array.isArray(pageTexts)) {
        throw new TypeError('pageTexts must be an array containing one string per page');
    }

    const pages = cleanPagesForChunking(pageTexts, { repeatedLineThreshold: 0.3 });
    const chunks = [];
    let pageNo = 1;
    for (const page of pages) {
        const pageChunks = [];
        let chunk = '';
        let chunkWordCount = 0;

        for (const sentence of page) {
            const trimmedSentence = sentence.trim();
            const sentenceWordCount = trimmedSentence === '' ? 0 : trimmedSentence.split(/\s+/).length;

            if (sentenceWordCount === 0) {
                continue;
            }

            chunk = chunk === '' ? trimmedSentence : `${chunk} ${trimmedSentence}`;
            chunkWordCount += sentenceWordCount;

            // Keep sentences intact; the chunk may be slightly over 150 when
            // the sentence that reaches the target is added.
            if (chunkWordCount >= 150) {
                pageChunks.push({ page: pageNo, content: chunk });
                chunk = '';
                chunkWordCount = 0;
            }
        }

        if (chunk !== '') {
            // Only merge into a chunk from this page, preserving page boundaries.
            if (chunkWordCount < 30 && pageChunks.length > 0) {
                pageChunks[pageChunks.length - 1].content += ` ${chunk}`;
            } else {
                pageChunks.push({ page: pageNo, content: chunk });
            }
        }

        chunks.push(...pageChunks);
        pageNo++;
    }

    return chunks;
}

export { chunkBySentence };
