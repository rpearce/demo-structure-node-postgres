import mandrill from 'mandrill-api/mandrill';
import { findOrCreateUser } from '../../users/user';
import { createSession } from '../session';
import { buildSignInEmail } from '../mailer';
import { path } from '../../reactRoutes';

const postSignIn = async (req, res) => {
  try {
    const { email } = req.body,
          user_id = await findOrCreateUser(email),
          token = await createSession(user_id),
          message = buildSignInEmail({ email, token }),
          mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

    mandrillClient.messages.send({
      message,
      async: false
    }, (mandrillRes) => {
      if (mandrillRes.reject_reason != null) {
        res.redirect(302, path('SignInRoute').concat('?error=email+sending+fail'));
      } else {
        res.redirect(302, path('CheckEmailRoute'));
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export default postSignIn;
