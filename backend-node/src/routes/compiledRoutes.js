const express = require('express');
const { listCompiledFiles } = require('../controllers/compiledController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Public or Authenticated? Let's make it public for now as per "upload to web" vibe, 
// but user can add auth later if needed. The user said "upload to web", usually implies access.
// But given it's "project data", maybe safe to require auth? 
// The user previously wanted to remove features, so maybe simple is better.
// I'll leave it public for now to ensure it works easily, can be secured later.
router.get('/', listCompiledFiles);

module.exports = router;
