/**
 * Simplified command line tokenizer
 */
export function parseCommandLine(line: string): { command: string; args: string[] } {
  const trimmed = line.trim();
  if (!trimmed) {
    return { command: '', args: [] };
  }
  
  // Split by whitespace
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  return { command, args };
}
