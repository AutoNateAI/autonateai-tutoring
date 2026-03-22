import nodemailer from 'nodemailer';

function getMailTransport() {
  const user = process.env.GMAIL_SMTP_USER;
  const pass = process.env.GMAIL_SMTP_APP_PASSWORD;
  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {user, pass},
  });
}

export async function sendPortalPurchaseEmail({
  email,
  customerName,
  product,
  temporaryPassword,
}) {
  const transport = getMailTransport();
  if (!transport) {
    return {sent: false, skipped: true};
  }

  const fromEmail = process.env.GMAIL_SMTP_USER;
  const portalUrl = product.portalUrl;

  await transport.sendMail({
    from: `"AutoNateAI" <${fromEmail}>`,
    to: email,
    subject: `Your ${product.title} access is ready`,
    text: [
      `Thanks for purchasing ${product.title}, ${customerName}.`,
      '',
      `Portal: ${portalUrl}`,
      `Email: ${email}`,
      temporaryPassword ? `Temporary password: ${temporaryPassword}` : '',
      '',
      'If this is your first login, sign in with the temporary password and you will be asked to change it immediately.',
      'You can also use Google sign-in later if it matches the same paid email.',
      '',
      'If anything looks wrong, reply to this email and we will fix it.',
    ]
      .filter(Boolean)
      .join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
        <h2 style="margin-bottom:12px;">Your ${product.title} access is ready</h2>
        <p>Thanks for purchasing ${product.title}, ${customerName}.</p>
        <p><strong>Portal:</strong> <a href="${portalUrl}">${portalUrl}</a></p>
        <p><strong>Email:</strong> ${email}</p>
        ${
          temporaryPassword
            ? `<p><strong>Temporary password:</strong> <code style="font-size:16px;">${temporaryPassword}</code></p>`
            : ''
        }
        <p>If this is your first login, sign in with the temporary password and you will be asked to change it immediately.</p>
        <p>You can also use Google sign-in later if it matches the same paid email.</p>
        <p>If anything looks wrong, reply to this email and we will fix it.</p>
      </div>
    `,
  });

  return {sent: true, skipped: false};
}
