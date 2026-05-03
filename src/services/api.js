// API service — calls Express backend
const API_BASE = typeof window !== 'undefined' ? window.location.origin : '';

export async function sendChatMessage(message, history = []) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to get response');
  }

  return data.reply;
}
