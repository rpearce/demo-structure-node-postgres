import mandrill from 'mandrill-api/mandrill';
import { mailer as mailerDefaults } from '../../config';

export const buildSignInEmail = ({ email, token }) => {
  const { html, text } = buildSignInContent({ token });
  const subject = 'Sign in';
  return {
    'html': html,
    'text': text,
    'subject': subject,
    'from_email': mailerDefaults.from,
    'from_name': mailerDefaults.name,
    'to': [ { email } ]
  };
}

const buildSignInContent = ({ token }) => {
  const link = `http://localhost:3000/session?t=${token}`;
  const html = `
    <p>
      Click this link to sign in:
      <br />
      <br />
      <a href="${link}">${link}</a>
    </p>
  `;
  const text = `Click this link to sign in: ${link}`;
  return { html, text };
}
