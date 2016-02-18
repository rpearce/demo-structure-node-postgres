import { findSession, isValidSession, deactivateOldSessions } from '../session';
import { path } from '../../reactRoutes';

const getSession = async (req, res) => {
  try {
    const token = req.query.t;
    if (token) {
      let session = await findSession(token);
      if (session && isValidSession(session)) {
        req.session.user_id = session.user_id;
        req.session.save();
        res.redirect(302, '/');
        deactivateOldSessions(session.user_id);
      } else {
        req.session.user_id = null;
        req.session.save();
        res.redirect(302, path('SignInRoute'));
      }
    } else {
      req.session.user_id = null;
      req.session.save();
      res.redirect(302, path('SignInRoute'));
    }
  } catch (err) {
    console.error(err);
  }
}

export default getSession;
