export interface SanitizationResult {
  isSafe: boolean;
  sanitizedText: string;
  flaggedPatterns: string[];
}

/**
 * Defense-in-depth note: this filter is an advisory tripwire, NOT a
 * security boundary. The real protections against prompt injection are:
 *   1. Zod-validated structured outputs (src/lib/ai/parsers.ts)
 *   2. Fixed system prompts that instruct the model to ignore embedded
 *      instructions and only extract budget intent
 *   3. Human approval before any generated draft becomes official
 */

const INJECTION_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  // English instruction-override attempts (also catches obfuscated spacing)
  { label: "instruction-override", pattern: /ignore\s+(all\s+|any\s+|the\s+)?(previous|prior|above|earlier)\s+(instructions?|prompts?|rules?)/i },
  { label: "instruction-override", pattern: /disregard\s+(all\s+|the\s+)?(previous|prior|above|system)/i },
  { label: "system-override", pattern: /system\s*(override|prompt|command)/i },
  { label: "persona-hijack", pattern: /you\s+are\s+now\s+(a|an|the)/i },
  { label: "persona-hijack", pattern: /act\s+as\s+(an?\s+)?(unrestricted|unfiltered|jailbroken|evil)/i },
  { label: "persona-hijack", pattern: /as\s+an?\s+unrestricted\s+ai/i },
  { label: "jailbreak", pattern: /\b(DAN|do\s+anything\s+now)\b/i },
  { label: "security-bypass", pattern: /bypass\s+(security|safety|filter|restriction)/i },
  { label: "prompt-leak", pattern: /(reveal|show|print|repeat|leak)\s+(me\s+)?(your|the)\s+(system\s+)?(prompt|instructions?)/i },
  { label: "delimiter-injection", pattern: /(<\|im_start\|>|<\|im_end\|>|\[INST\]|\[\/INST\]|<<SYS>>|<\/s>)/i },

  // Thai instruction-override attempts
  { label: "thai-instruction-override", pattern: /(ลืม|เพิกเฉย|ไม่ต้องทำตาม|ยกเลิก).{0,20}(คำสั่ง|กฎ|ระบบ|ข้อความ)(ก่อนหน้า|เดิม|ทั้งหมด)?/ },
  { label: "thai-persona-hijack", pattern: /(ตอนนี้)?คุณ(คือ|จะเป็น|ต้องเป็น).{0,15}(AI|บอท|ผู้ช่วย).{0,20}(ไม่มีข้อจำกัด|อิสระ)/ },
  { label: "thai-prompt-leak", pattern: /(บอก|แสดง|เปิดเผย).{0,15}(system\s*prompt|คำสั่งระบบ|พรอมป์)/i },

  // HTML/script smuggling into downstream documents
  { label: "script-tag", pattern: /<script[\s\S]*?>[\s\S]*?<\/script\s*>/gi },
  { label: "html-event-handler", pattern: /\son(click|load|error|focus|mouseover)\s*=/i },
  { label: "iframe-embed", pattern: /<iframe[\s\S]*?>/i },

  // SQL-flavored probing (input is never used in SQL, but flag anyway)
  { label: "sql-drop", pattern: /drop\s+table/i },
  { label: "sql-delete", pattern: /delete\s+from\s+\w/i },
  { label: "sql-grant", pattern: /grant\s+all\s+privileges/i },
];

const MAX_INPUT_LENGTH = 5000;

export function sanitizePromptInput(input: string): SanitizationResult {
  const flaggedPatterns: string[] = [];
  let sanitized = input;

  for (const { label, pattern } of INJECTION_PATTERNS) {
    // Reset lastIndex for global regexes to keep repeated calls deterministic
    pattern.lastIndex = 0;
    if (pattern.test(sanitized)) {
      flaggedPatterns.push(label);
      pattern.lastIndex = 0;
      sanitized = sanitized.replace(pattern, "[FILTERED]");
    }
  }

  // Prevent excessive length exploits
  if (sanitized.length > MAX_INPUT_LENGTH) {
    sanitized = sanitized.slice(0, MAX_INPUT_LENGTH);
  }

  return {
    isSafe: flaggedPatterns.length === 0,
    sanitizedText: sanitized,
    flaggedPatterns: [...new Set(flaggedPatterns)],
  };
}
