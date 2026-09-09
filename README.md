This is a cutomizable roadmap creation, especially to track everything i read on any topic
it can record or check teh websites i open, sites i open, topics i explore and create a roadmap for it to track my understanding


1- Browser extension (Chrome/Firefox, Manifest V3)
    Listens for tab updates / page loads
    On a page you spend real time on (not just a flash visit — set a dwell-time threshold), grabs: URL, title, and page text via a content script (e.g. Readability.js to strip boilerplate)
    Sends that payload to your backend
2-Backend
    Stores raw captures (url, title, text, timestamp)
    Runs each capture through an LLM or embedding model to: extract topic/subtopic tags, generate a one-line summary, and classify difficulty/type (intro article, paper, reference doc, tutorial)
    Deduplicates re-visits, updates "last seen" instead of creating dupes
3- Roadmap engine (the interesting part)
    Cluster captured items by topic similarity (embeddings + clustering, or just LLM-based grouping)
    Within a topic cluster, order items into a rough progression (LLM can infer "this is foundational, this assumes the reader knows X, this is advanced")
    This becomes a draft roadmap — auto-generated, but editable
4- Web app / dashboard
    Shows draft roadmaps per topic, lets you drag-reorder, rename, merge, delete
    "Save roadmap" persists a named, curated version distinct from the raw auto-clustered feed
    This is where the "no manual logging" promise is delivered — the roadmap is pre-populated from what you already read, you just prune/arrange