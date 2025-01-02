// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength check
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback = [];
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push('Include at least one uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    feedback.push('Include at least one number');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    feedback.push('Include at least one special character');
  }

  return { score, feedback };
};