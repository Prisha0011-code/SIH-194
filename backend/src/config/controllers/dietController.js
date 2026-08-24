import { balanceDietAI, verifyDietAI } from '../services/aiService.js';

export const balanceDiet = async (req, res) => {
  const { userMeals } = req.body;

  try {
    if (!userMeals || !Array.isArray(userMeals)) {
      return res.status(400).json({ error: 'userMeals array is required.' });
    }

    const balancedPlan = await balanceDietAI({ userMeals });
    res.status(200).json({ balancedPlan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyDiet = async (req, res) => {
  const { userMeals, balancedPlan, userProfile } = req.body;

  try {
    const verification = await verifyDietAI({ userMeals, balancedPlan, userProfile });
    res.status(200).json(verification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};