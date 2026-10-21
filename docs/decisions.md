# Decisions

## Embedding dimension

Use **768 dimensions** for all stored text embeddings. This is a Gemini-recommended
reduced size that keeps vector storage and similarity search efficient while retaining
strong semantic-retrieval quality. The embedding request must set
`outputDimensionality` to `768`; database vector columns and indexes must use the
same dimension.

