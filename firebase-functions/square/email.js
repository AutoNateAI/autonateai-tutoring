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
  organizationName,
}) {
  const transport = getMailTransport();
  if (!transport) {
    return {sent: false, skipped: true};
  }

  const fromEmail = process.env.GMAIL_SMTP_USER;
  const portalUrl = product.portalUrl;
  const workshopMeetUrl = 'https://meet.google.com/pwb-pxjh-yvj';

  if (product.fulfillmentType === 'organization-program') {
    await transport.sendMail({
      from: `"AutoNateAI" <${fromEmail}>`,
      to: email,
      subject: `Your ${product.title} is confirmed`,
      text: [
        `Thanks for securing the ${product.title}, ${customerName}.`,
        organizationName ? `Organization / Program: ${organizationName}` : '',
        product.studentCount ? `Student tier: up to ${product.studentCount} students` : '',
        product.workshopHours ? `Workshop duration: ${product.workshopHours} hours` : '',
        '',
        'Your payment is confirmed. Nate will follow up directly by email with scheduling options for the live session and the next installation steps.',
        'This program includes lifetime portal access for participating students, plus ongoing portal improvements over time.',
        '',
        'An admin dashboard for program directors is also in development so your team can monitor workflow usage trends and student engagement signals over time.',
        '',
        'If anything looks off, reply to this email and we will fix it.',
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
          <h2 style="margin-bottom:12px;">Your ${product.title} is confirmed</h2>
          <p>Thanks for securing the ${product.title}, ${customerName}.</p>
          ${organizationName ? `<p><strong>Organization / Program:</strong> ${organizationName}</p>` : ''}
          ${product.studentCount ? `<p><strong>Student tier:</strong> up to ${product.studentCount} students</p>` : ''}
          ${product.workshopHours ? `<p><strong>Workshop duration:</strong> ${product.workshopHours} hours</p>` : ''}
          <p>Your payment is confirmed. Nate will follow up directly by email with scheduling options for the live session and the next installation steps.</p>
          <p>This program includes lifetime portal access for participating students, plus ongoing portal improvements over time.</p>
          <p>An admin dashboard for program directors is also in development so your team can monitor workflow usage trends and student engagement signals over time.</p>
          <p>If anything looks off, reply to this email and we will fix it.</p>
        </div>
      `,
    });

    return {sent: true, skipped: false};
  }

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
      product.id === 'agentic-ai-workshop-apr-11-2026' ? 'Agentic AI Workshop' : '',
      product.id === 'agentic-ai-workshop-apr-11-2026' ? 'Saturday, Apr 11 · 10:00 AM–12:30 PM' : '',
      product.id === 'agentic-ai-workshop-apr-11-2026' ? `Google Meet joining info` : '',
      product.id === 'agentic-ai-workshop-apr-11-2026' ? `Video call link: ${workshopMeetUrl}` : '',
      product.id === 'ai-first-student'
        ? 'I will also personally email you my calendar availability so you can choose your live 2-hour coaching session.'
        : '',
      product.id === 'ai-first-student'
        ? 'The portal is a living system that keeps improving with weekly updates, student feedback, and new workflow features.'
        : '',
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
        ${
          product.id === 'agentic-ai-workshop-apr-11-2026'
            ? `<p><strong>Agentic AI Workshop</strong><br />Saturday, Apr 11 · 10:00 AM-12:30 PM<br /><strong>Google Meet joining info</strong><br /><a href="${workshopMeetUrl}">${workshopMeetUrl}</a></p>`
            : ''
        }
        ${
          product.id === 'ai-first-student'
            ? '<p>I will also personally email you my calendar availability so you can choose your live 2-hour coaching session.</p>'
            : ''
        }
        ${
          product.id === 'ai-first-student'
            ? '<p>The portal is a living system that keeps improving with weekly updates, student feedback, and new workflow features.</p>'
            : ''
        }
        <p>If anything looks wrong, reply to this email and we will fix it.</p>
      </div>
    `,
  });

  return {sent: true, skipped: false};
}
