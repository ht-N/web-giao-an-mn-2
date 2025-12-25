const express = require('express');
const { generateLessonPlan, generatePreschoolSlide } = require('../controllers/aiController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Allow all users (even guest) to generate lesson plans
router.post('/lesson-plan', generateLessonPlan);
router.post('/generate-slide', generatePreschoolSlide);

module.exports = router;
