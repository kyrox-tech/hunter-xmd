const rateLimit = require('express-rate-limit');

/**
 * Rate limiter pour les endpoints publics
 */
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par 15 minutes
  message: '❌ Trop de requêtes, veuillez réessayer plus tard',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/health'
});

/**
 * Rate limiter strict pour les endpoints sensibles
 */
const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requêtes par minute
  message: '❌ Trop de tentatives, attendez 1 minute',
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Rate limiter pour les générations de QR code
 */
const qrLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // 10 QR codes par 10 minutes
  message: '❌ Trop de générations de QR, attendez 10 minutes',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    return req.ip; // Rate limit par IP
  }
});

module.exports = {
  publicLimiter,
  strictLimiter,
  qrLimiter
};
