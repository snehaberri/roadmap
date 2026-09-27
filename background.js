const MIN_READING_MS = 20000;
const timers = new Map();
const eligible = (url = '') => /^https?:\/\//.test(url) && !/^(https?:\/\/)(localhost|127\.0\.0\.1)/.test(url);
async function capture(tabId) {
  const [tab] = await chrome.tabs.query({});
  const current = await chrome.tabs.get(tabId).catch(() => null);
  if (!current || !eligible(current.url)) return;
  const { activeTopic = '', captures = [] } = await chrome.storage.local.get({ activeTopic: '', captures: [] });
  if (!activeTopic) return;
  let page = { title: current.title || 'Untitled page', summary: '' };
  try { page = await chrome.tabs.sendMessage(tabId, { type: 'GET_PAGE_DATA' }); } catch (_) { /* protected pages cannot be read */ }
  const key = current.url.replace(/([?&])utm_[^&]+/g, '').replace(/[?&]$/, '');
  const existing = captures.find((item) => item.topic === activeTopic && item.url === key);
  if (existing) { existing.lastSeen = Date.now(); existing.visits = (existing.visits || 1) + 1; }
  else captures.unshift({ id: crypto.randomUUID(), topic: activeTopic, url: key, title: page.title, summary: page.summary || 'A source saved to your research trail.', savedAt: Date.now(), lastSeen: Date.now(), visits: 1 });
  await chrome.storage.local.set({ captures });
}
function schedule(tabId, url) { clearTimeout(timers.get(tabId)); if (eligible(url)) timers.set(tabId, setTimeout(() => capture(tabId), MIN_READING_MS)); }
chrome.tabs.onActivated.addListener(async ({ tabId }) => { const tab = await chrome.tabs.get(tabId); schedule(tabId, tab.url); });
chrome.tabs.onUpdated.addListener((tabId, change, tab) => { if (change.status === 'complete') schedule(tabId, tab.url); });
chrome.tabs.onRemoved.addListener((tabId) => clearTimeout(timers.get(tabId)));
chrome.runtime.onMessage.addListener((message, _, sendResponse) => { if (message.type === 'CAPTURE_NOW') { capture(message.tabId).then(() => sendResponse({ ok: true })); return true; } });
