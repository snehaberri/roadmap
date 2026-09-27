// Extract only a compact reading preview; full page text never leaves the browser.
function pagePreview() {
  const meta = document.querySelector('meta[name="description"], meta[property="og:description"]');
  const text = (document.querySelector('article, main, [role="main"]') || document.body).innerText.replace(/\s+/g, ' ').trim();
  const candidate = meta?.content || text;
  const sentences = candidate.match(/[^.!?]+[.!?]+/g) || [candidate];
  return sentences.slice(0, 2).join(' ').slice(0, 300);
}
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === 'GET_PAGE_DATA') sendResponse({ title: document.title, summary: pagePreview() });
});
