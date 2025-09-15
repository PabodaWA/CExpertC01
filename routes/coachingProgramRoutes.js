const express = require('express');
const router = express.Router();
const {
  getCoachingPrograms,
  getCoachingProgram,
  createCoachingProgram,
  updateCoachingProgram,
  deleteCoachingProgram,
  getProgramsByCoach,
  addMaterial,
  getProgramStats
} = require('../controllers/coachingProgramController');

// Public routes
router.get('/', getCoachingPrograms);
router.get('/:id', getCoachingProgram);
router.get('/coach/:coachId', getProgramsByCoach);

// Protected routes (for coaches/admins)
router.post('/', createCoachingProgram);
router.put('/:id', updateCoachingProgram);
router.delete('/:id', deleteCoachingProgram);
router.post('/:id/materials', addMaterial);
router.get('/:id/stats', getProgramStats);

module.exports = router;
