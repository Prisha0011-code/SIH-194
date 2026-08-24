import pool from '../config/database.js';
import { rescheduleTasksAI } from '../services/aiService.js';

export const getTasks = async (req, res) => {
  const userId = req.user?.id || 1;
  try {
    const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC', [userId]);
    res.status(200).json(tasks.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const submitTasks = async (req, res) => {
  const { tasks } = req.body;
  const userId = req.user?.id || 1;

  try {
    const optimizedTasks = await rescheduleTasksAI({ tasks, userProfile: req.body.userProfile });

    // Store raw/optimized tasks
    for (const task of optimizedTasks) {
      await pool.query(
        'INSERT INTO tasks (user_id, title, duration, priority, time_slot, completed) VALUES ($1, $2, $3, $4, $5, $6)',
        [userId, task.title, task.duration, task.priority, task.timeSlot, task.completed || false]
      );
    }

    res.status(201).json({ message: 'Tasks submitted & scheduled', tasks: optimizedTasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await pool.query(
      'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, id]
    );

    res.status(200).json(updatedTask.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const rescheduleTasks = async (req, res) => {
  const { tasks, userProfile } = req.body;

  try {
    const rescheduled = await rescheduleTasksAI({ tasks, userProfile });
    res.status(200).json({ tasks: rescheduled });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};