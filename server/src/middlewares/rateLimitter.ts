import rateLimit from "express-rate-limit";

export const loginLimitter = rateLimit({
  windowMs: 15 * 60 * 1000, // 5 minutes
  max: 3, // Limit each IP to 3 Login requests per windowMs
  message: {message: 'Too many requests, please try again after 5 minutes'},
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export const registerLimitter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 Register requests per windowMs
  message: {message: 'Too many requests, please try again after 5 minutes'},
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

