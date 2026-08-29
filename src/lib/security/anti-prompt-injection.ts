export interface SanitizationResult {
  isSafe: boolean;
  sanitizedText: string;
  flaggedPatterns: string[];
}

const INJECTION_PATTERNS = [
  /ignore previous instructions/i,
  /system override/i,
  /you are now a/i,
  /as an unrestricted ai/i,
  /bypass security/i,
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  /drop table/i,
  /delete from/i,
  /grant all privileges/i,
];

export function sanitizePromptInput(input: string): SanitizationResult {
  const flaggedPatterns: string[] = [];
  let sanitized = input;

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(sanitized)) {
      flaggedPatterns.push(pattern.toString());
      sanitized = sanitized.replace(pattern, "[FILTERED]");
    }
  }

  // Prevent excessive length exploits
  if (sanitized.length > 5000) {
    sanitized = sanitized.slice(0, 5000);
  }

  return {
    isSafe: flaggedPatterns.length === 0,
    sanitizedText: sanitized,
    flaggedPatterns,
  };
}
