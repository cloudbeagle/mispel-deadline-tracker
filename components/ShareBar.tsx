'use client';

import { useState } from 'react';
import { Link2, Code2, Check } from 'lucide-react';

export default function ShareBar() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyEmbed = async () => {
    const src = `${window.location.origin}/embed/countdown`;
    const snippet = `<iframe src="${src}" width="400" height="120" frameborder="0" style="border:none;overflow:hidden" allowtransparency="true" title="MiSpeL Deadline Countdown"></iframe>`;
    await navigator.clipboard.writeText(snippet).catch(() => {});
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <div className="flex gap-2 justify-end">
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-muted transition-colors"
        title="Aktuellen Link (inkl. Formularstand) kopieren"
      >
        {copiedLink ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Link2 className="h-3.5 w-3.5" />}
        {copiedLink ? 'Kopiert!' : 'Link teilen'}
      </button>
      <button
        onClick={copyEmbed}
        className="flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-muted transition-colors"
        title="iframe-Snippet für Kanzlei-/Blog-Einbettung kopieren"
      >
        {copiedEmbed ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Code2 className="h-3.5 w-3.5" />}
        {copiedEmbed ? 'Kopiert!' : 'Einbetten'}
      </button>
    </div>
  );
}
