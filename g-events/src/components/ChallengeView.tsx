'use client';

import React, { useState, useMemo } from 'react';
import { CHALLENGE_STATEMENT_TEXT } from '@/lib/demo-data';
import { Copy, Check, AlertCircle } from 'lucide-react';

function simpleMarkdownToHtml(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const result: string[] = [];
  let inUl = false;
  let inOl = false;

  const closeLists = () => {
    if (inUl) {
      result.push('</ul>');
      inUl = false;
    }
    if (inOl) {
      result.push('</ol>');
      inOl = false;
    }
  };

  const formatInline = (text: string): string => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      closeLists();
      continue;
    }

    if (line.startsWith('### ')) {
      closeLists();
      result.push(`<h3>${formatInline(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      closeLists();
      result.push(`<h2>${formatInline(line.slice(3))}</h2>`);
    } else if (line.startsWith('- ')) {
      if (inOl) {
        result.push('</ol>');
        inOl = false;
      }
      if (!inUl) {
        result.push('<ul>');
        inUl = true;
      }
      result.push(`<li>${formatInline(line.slice(2))}</li>`);
    } else if (/^\d+\.\s+/.test(line)) {
      if (inUl) {
        result.push('</ul>');
        inUl = false;
      }
      if (!inOl) {
        result.push('<ol>');
        inOl = true;
      }
      const itemContent = line.replace(/^\d+\.\s+/, '');
      result.push(`<li>${formatInline(itemContent)}</li>`);
    } else {
      closeLists();
      result.push(`<p>${formatInline(line)}</p>`);
    }
  }

  closeLists();
  return result.join('\n');
}

export function ChallengeView() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const htmlContent = useMemo(() => simpleMarkdownToHtml(CHALLENGE_STATEMENT_TEXT), []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(CHALLENGE_STATEMENT_TEXT);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = CHALLENGE_STATEMENT_TEXT;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (!successful) {
          throw new Error('Copy command failed');
        }
      }
      setCopied(true);
      setCopyError(null);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError('Failed to copy to clipboard. Please copy manually.');
      setTimeout(() => setCopyError(null), 3000);
    }
  };

  return (
    <div>
      <style>{`
        .challenge-content ol {
          list-style: decimal;
          padding-left: 20px;
          margin-bottom: 12px;
        }
      `}</style>

      {/* Header with Title and Copy button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 20,
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#17192D', margin: 0 }}>
            Campus Activity Platform
          </h1>
          <p style={{ fontSize: 13, color: '#8E93AD', margin: '4px 0 0' }}>
            Official Challenge Statement
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="g-btn g-btn-primary"
          style={{ minWidth: 140 }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {copyError && (
        <div style={{
          padding: '10px 14px',
          borderRadius: 8,
          background: '#FEE2E2',
          color: '#991B1B',
          fontSize: 13,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <AlertCircle size={16} />
          {copyError}
        </div>
      )}

      {/* Structured Challenge Body */}
      <div
        className="g-card challenge-content"
        style={{
          userSelect: 'text',
          WebkitUserSelect: 'text',
          background: 'white',
          padding: '24px 20px',
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
