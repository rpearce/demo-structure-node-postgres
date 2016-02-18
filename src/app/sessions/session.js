import { find, create, update } from '../../db/queryUtils';

const table = 'sessions';

export const findSession = async (id) => {
  try {
    const res = await find({ table, where: { id } });
    return res[0];
  } catch (err) {
    console.error(err);
  }
}

export const createSession = async (user_id) => {
  try {
    await deactivateOldSessions(user_id);
    const res = await create({ table, attrs: { user_id } });
    return res[0];
  } catch (err) {
    console.error(err);
  }
}

export const isValidSession = ({ is_active, created_at }) =>
  is_active && isWithinTimeframe(created_at);

export const deactivateOldSessions = async (user_id) =>
  update({ table, where: { user_id }, attrs: { is_active: false } });

export const isWithinTimeframe = (timeString) => {
  const timeframe = 60 * 15 * 1000; // 15 minutes in milliseconds
  const currentTime = new Date();
  const time = new Date(timeString);
  return (currentTime - time) < timeframe;
}
