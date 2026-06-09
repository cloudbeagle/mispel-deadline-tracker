'use client';

import { useState } from 'react';
import { Link2, Code2, Check, AlertCircle } from 'lucide-react';

async function writeToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API first (requires HTTPS or localhost)
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to execCommand fallback
    }
  }
  // Legacy fallback via execCommand (deprecated but widely supported)
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

type CopyState = 'idle' | 'copied' | 'error';

export default function ShareBar() {
  const [linkState, setLinkState] = useState<CopyState>('idle');
  const [embedState, setEmbedState] = useState<CopyState>('idle');

  const copyLink = async () => {
    const ok = await writeToClipboard(window.location.href);
    setLinkState(ok ? 'copied' : 'error');
    setTimeout(() => setLinkState('idle'), 2000);
  };

  const copyEmbed = async () => {
    const src = `${window.location.origin}/embed/countdown`;
    const snippet = `<iframe src="${src}" width="400" height="120" frameborder="0" style="border:none;overflow:hidden" allowtransparency="true" title="MiSpeL Deadline Countdown"></iframe>`;
    const ok = await writeToClipboard(snippet);
    setEmbedState(ok ? 'copied' : 'error');
    setTimeout(() => setEmbedState('idle'), 2000);
  };

  return (
    <div className="flex gap-2 justify-end">
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-muted transition-colors"
        title="Aktuellen Link (inkl. Formularstand) kopieren"
      >
        {linkState === 'copied' && <Check className="h-3.5 w-3.5 text-green-600" />}
        {linkState === 'error' && <AlertCircle className="h-3.5 w-3.5 text-red-500" />}
        {linkState === 'idle' && <Link2 className="h-3.5 w-3.5" />}
        {linkState === 'copied' ? 'Kopiert!' : linkState === 'error' ? 'Fehler' : 'Link teilen'}
      </button>
      <button
        onClick={copyEmbed}
        className="flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-muted transition-colors"
        title="iframe-Snippet für Kanzlei-/Blog-Einbettung kopieren"
      >
        {embedState === 'copied' && <Check className="h-3.5 w-3.5 text-green-600" />}
        {embedState === 'error' && <AlertCircle className="h-3.5 w-3.5 text-red-500" />}
        {embedState === 'idle' && <Code2 className="h-3.5 w-3.5" />}
        {embedState === 'copied' ? 'Kopiert!' : embedState === 'error' ? 'Fehler' : 'Einbetten'}
      </button>
    </div>
  );
}
