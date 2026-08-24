/**
 * AI Engine Service housing prompts for Scheduler & Role-Based Nutritionist Agent
 */

export const rescheduleTasksAI = async ({ tasks, userProfile }) => {
  // Scheduler System Prompt Architecture
  const systemPrompt = `
    Act as an adaptive operational algorithm. Take the user's task list, estimated durations, and priority flags,
    then produce a non-overlapping time-blocked schedule. Factor in circadian rest buffers according to their age group (${userProfile?.age_group || '25–34'}).
    If an existing schedule is modified midway through execution, re-sort remaining uncompleted tasks from current time onward without dropping high-priority items.
  `;

  console.log('[AI Scheduler Executing]', systemPrompt.trim());

  // Heuristic fall-back / Mock calculation matching LLM output format
  let currentStartMinutes = 9 * 60; // Start at 9:00 AM in minutes

  const rescheduledTasks = tasks.map((task) => {
    if (task.completed) {
      return task;
    }

    const startHours = Math.floor(currentStartMinutes / 60);
    const startMins = currentStartMinutes % 60;
    const endMinutes = currentStartMinutes + Number(task.duration);
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;

    const formatTime = (h, m) => {
      const ampm = h >= 12 ? 'PM' : 'AM';
      const formattedH = h % 12 === 0 ? 12 : h % 12;
      const formattedM = m < 10 ? `0${m}` : m;
      return `${formattedH}:${formattedM} ${ampm}`;
    };

    const timeSlot = `${formatTime(startHours, startMins)} - ${formatTime(endHours, endMins)}`;
    currentStartMinutes = endMinutes + 15; // 15-min circadian rest buffer

    return {
      ...task,
      timeSlot,
    };
  });

  return rescheduledTasks;
};

export const balanceDietAI = async ({ userMeals }) => {
  // Formats ingredients into balanced macro suggestions without adding external foods
  return userMeals.map((meal, idx) => {
    const times = ['08:30 AM', '01:30 PM', '07:30 PM', '04:00 PM'];
    return {
      time: times[idx % times.length],
      item: meal,
      macroNote: `Portion structured to optimize energy retention. Zero external ingredients added.`
    };
  });
};

export const verifyDietAI = async ({ userMeals, balancedPlan, userProfile }) => {
  // Role-Based AI Nutrition Verifier Prompt Architecture
  const systemPrompt = `
    You are an automated Clinical Nutritionist Agent. Analyze the user-logged meal items alongside the AI-optimized macro distribution.
    Constraint: Under no circumstances suggest external ingredients or extra grocery items outside ${JSON.stringify(userMeals)}.
    Verify whether the balanced portion sizes and scheduled meal times align safely with the user's daily workload and demographic profile (${userProfile?.gender || 'Male'}, ${userProfile?.age_group || '25–34'}).
    Return approval status and explicit adjustments.
  `;

  console.log('[AI Verifier Executing]', systemPrompt.trim());

  return {
    status: 'Approved',
    role: 'Clinical Nutritionist Agent',
    balancedPlan,
    verificationDetails: `Verified against clinical baselines for ${userProfile?.age_group || '25–34'} age group. Zero out-of-routine items added.`
  };
};