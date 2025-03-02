document.getElementById('summarizeBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: fetchTranscript,
    });
});

async function fetchTranscript() {
    const videoId = new URLSearchParams(window.location.search).get('v');
    const response = await fetch(`https://your-flask-api-url/summarize?videoId=${videoId}`);
    const data = await response.json();
    document.getElementById('summary').innerText = data.summary;
}
