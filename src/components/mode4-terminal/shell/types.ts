export type FSNodeType = 'file' | 'dir';

export interface FSNode {
  type: FSNodeType;
  name: string;
}

export interface FSFile extends FSNode {
  type: 'file';
  content: string;
}

export interface FSDirectory extends FSNode {
  type: 'dir';
  children: Record<string, FSFile | FSDirectory>;
}

export type TerminalLineType = 
  | 'prompt' 
  | 'normal' 
  | 'success' 
  | 'error' 
  | 'header' 
  | 'dir' 
  | 'file' 
  | 'highlight';

export interface TerminalLine {
  text: string;
  type: TerminalLineType;
}

export interface CommandContext {
  args: string[];
  currentPath: string[];
  setCurrentPath: (path: string[]) => void;
  setMode: (mode: 1 | 2 | 3 | 4) => void;
  clearLines: () => void;
  systemFS: FSDirectory;
  outputLines: TerminalLine[];
  theme?: string;
  setTheme?: (theme: string) => void;
  router: any;
}

