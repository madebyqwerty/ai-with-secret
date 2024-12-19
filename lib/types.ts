export type SecurityCheckResult = {
  safe: boolean;
  message?: string;
};

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};