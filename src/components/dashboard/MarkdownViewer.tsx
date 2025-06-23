"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const markdownContent = `
# Review Summary

## 🐞 \`bad-code.js\` Issues

**Security**
- ⚠️ **Hardcoded Secrets (Critical):** \`const secretKey = "myHardcodedSecret";\` exposes sensitive credentials.
- ⚠️ **Use of \`eval()\` (Critical):** Enables arbitrary code execution vulnerabilities.

**Authentication Flaws**
- 🔐 Hardcoded Credentials.
- 🔓 Weak Comparison using \`==\` instead of \`===\`.

**Code Quality**
- 📛 Excessive logging may leak sensitive data.
- 🔍 Unused variable \`secretKey\`.

---

## 🚀 \`good-code.js\` Improvements

**Major Issue**
- 🐛 Type handling in \`calculateSum\`.

\`\`\`javascript
calculateSum([1, "2"]) // "12"
\`\`\`

**Fix:**
\`\`\`javascript
function calculateSum(numbers) {
  if (!Array.isArray(numbers)) throw new Error("...");
  return numbers.reduce((sum, num) => {
    const n = Number(num);
    if (isNaN(n)) throw new TypeError(\`Element \${num} is not a number\`);
    return sum + n;
  }, 0);
}
\`\`\`

**Minor Improvements**
- 📛 Empty user greeting handling.
- 💻 Avoid top-level \`console.log\` calls.

---

## ✅ Summary of Fixes
1. Remove \`eval()\`
2. Replace \`==\` with \`===\`
3. Move credentials to env variables
4. Add input validation
5. Set up ESLint & Prettier
`;

export default function MarkdownViewer({ content=markdownContent }: { content?: string }) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content || ""}
      </ReactMarkdown>
    </div>
  );
}
