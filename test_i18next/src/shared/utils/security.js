// Security utilities for Firebase frontend

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input string
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters long'
    };
  }
  
  if (password.length > 128) {
    return {
      isValid: false,
      message: 'Password must be less than 128 characters'
    };
  }
  
  return {
    isValid: true,
    message: 'Password is valid'
  };
};

/**
 * Escape HTML entities
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
export const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Check if user has permission for action
 * @param {Object} user - User object
 * @param {string} action - Action to check
 * @returns {boolean} - Has permission
 */
export const hasPermission = (user, action) => {
  if (!user) return false;
  
  const permissions = {
    'user': ['view', 'add_to_cart', 'add_to_favorites'],
    'admin': ['view', 'add_to_cart', 'add_to_favorites', 'create', 'update', 'delete']
  };
  
  return permissions[user.role]?.includes(action) || false;
};

/**
 * Rate limiting helper
 */
export class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }
  
  isAllowed(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    // Clean old requests
    for (const [timestamp, count] of this.requests.entries()) {
      if (timestamp < windowStart) {
        this.requests.delete(timestamp);
      }
    }
    
    // Check current rate
    const currentCount = Array.from(this.requests.values()).reduce((sum, count) => sum + count, 0);
    
    if (currentCount >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    this.requests.set(now, (this.requests.get(now) || 0) + 1);
    return true;
  }
}

// Global rate limiter for API calls
export const apiRateLimiter = new RateLimiter(50, 60000); // 50 requests per minute
