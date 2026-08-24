import React, { useState } from 'react';
import { Plus, Clock, RefreshCw, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

export default function TaskTracker({ token, userProfile }) {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Deep Work: Core Architecture', duration: 120, priority: 'High', timeSlot: '09:00 - 11:00 AM', completed: true },
    { id: '2', title: 'Team Sync & Standup', duration: 30, priority: 'Medium', timeSlot: '11:15 - 11:45 AM', completed: false },
    { id: '3', title: 'Client Proposal Review', duration: 60, priority: 'High', timeSlot: '01:00 - 02:00 PM', completed: false }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [duration, setDuration] = useState(30);
  const [priority, setPriority] = useState('Medium');
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Submit raw task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      duration: Number(duration),
      priority,
      timeSlot: 'Pending AI Sorting',
      completed: false
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle('');
    triggerAIReschedule([...tasks, newTask]);
  };

  // Toggle Completion
  const toggleTaskStatus = (id) => {
    // API Call: PATCH /api/v1/tasks/{id}/status
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Trigger Dynamic Task Resampler
  const triggerAIReschedule = (currentTasks = tasks) => {
    setIsRescheduling(true);
    // API Call: POST /api/v1/schedule/reschedule
    setTimeout(() => {
      let currentHour = 14; // Mock starting after mid-day
      const updated = currentTasks.map((task) => {
        if (task.completed) return task;
        const start = `${currentHour}:00`;
        currentHour += Math.ceil(task.duration / 60);
        const end = `${currentHour}:00`;
        return { ...task, timeSlot: `${start} - ${end}` };
      });
      setTasks(updated);
      setIsRescheduling(false);
    }, 800);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="bg-slate-800/60 rounded-2xl border border-slate-700 p-6 space-y-6">
      {/* Header & Metric */}
      <div className="flex justify-between items-center border-b border-slate-700/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Task Schedule & Routine Tracker
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-Time Resampler adapts timeline based on progress
          </p>
        </div>
        <button
          onClick={() => triggerAIReschedule()}
          disabled={isRescheduling}
          className="flex items-center gap-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-teal-300 px-3 py-1.5 rounded-lg border border-slate-600 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRescheduling ? 'animate-spin' : ''}`} />
          {isRescheduling ? 'Resampling...' : 'Reschedule AI'}
        </button>
      </div>

      {/* Task Input Form */}
      <form onSubmit={handleAddTask} className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
        <input
          type="text"
          placeholder="What task needs to be completed today?"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
        />
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">Duration:</span>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none"
            >
              <option value={15}>15 mins</option>
              <option value={30}>30 mins</option>
              <option value={60}>60 mins</option>
              <option value={90}>90 mins</option>
              <option value={120}>120 mins</option>
            </select>
          </div>

          <div className="flex-1 flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5">
            <AlertCircle className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">Priority:</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-4 rounded-lg flex items-center gap-1 text-xs transition"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </form>

      {/* Routine Tracker Metric */}
      <div className="bg-slate-900/40 border border-slate-700/40 rounded-lg p-3 flex justify-between items-center text-xs">
        <span className="text-slate-400">
          Completion Rate: <strong className="text-white">{tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0}%</strong>
        </span>
        <span className="text-teal-400 font-mono">{completedCount} of {tasks.length} tasks completed</span>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-3.5 rounded-xl border flex items-center justify-between transition ${
              task.completed
                ? 'bg-slate-900/30 border-slate-800 text-slate-500'
                : 'bg-slate-900/80 border-slate-700 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <button onClick={() => toggleTaskStatus(task.id)} className="text-teal-400 hover:text-teal-300">
                {task.completed ? <CheckCircle2 className="w-5 h-5 text-teal-500" /> : <Circle className="w-5 h-5 text-slate-500" />}
              </button>
              <div>
                <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-teal-300 font-mono">{task.timeSlot}</span>
                  <span>{task.duration} mins</span>
                </div>
              </div>
            </div>

            <span
              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                task.priority === 'High'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : task.priority === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}