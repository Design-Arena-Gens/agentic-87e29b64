"use client";
import { useEffect, useState } from 'react';

export default function AdminPortal() {
  const [apiBase, setApiBase] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [modelName, setModelName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/ai-config').then((r) => r.json()).then((cfg) => {
      if (cfg) {
        setApiBase(cfg.apiBase || '');
        setApiKey(cfg.apiKey || '');
        setModelName(cfg.modelName || '');
      }
    });
  }, []);

  const onSave = async () => {
    setSaved(false);
    await fetch('/api/admin/ai-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiBase, apiKey, modelName }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Admin Portal</h1>
      <div className="card grid gap-2">
        <h3 className="font-semibold">AI Model Configuration</h3>
        <input className="input" placeholder="API Base (OpenAI-compatible)" value={apiBase} onChange={(e) => setApiBase(e.target.value)} />
        <input className="input" placeholder="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        <input className="input" placeholder="Model Name (e.g., gpt-4o-mini)" value={modelName} onChange={(e) => setModelName(e.target.value)} />
        <button className="btn btn-primary w-fit" onClick={onSave}>Save</button>
        {saved && <span className="text-sm text-green-700">Saved!</span>}
      </div>
    </div>
  );
}
