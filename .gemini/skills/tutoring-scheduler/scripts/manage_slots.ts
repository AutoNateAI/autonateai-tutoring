import { google } from 'googleapis';
import path from 'path';

const KEY_PATH = '/home/nate/autonateai-workspace/remotion-ai-engine/service-account-key.json';
const CALENDAR_ID = 'Autonate.ai@gmail.com';

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  const slots = [
    {
      summary: '🔥 Recursion Rescue (Tutoring)',
      description: '1:1 Intensive session for CIS 163. Fixing base cases and mental models. $50/hr.',
      start: '2026-03-15T18:00:00', // Sunday
      end: '2026-03-15T22:00:00',
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=SU'],
    },
    {
      summary: '📊 Algorithm Masterclass (Group)',
      description: 'Group problem-solving for CIS 263. Big O, Trees, and Graphs. $25/student.',
      start: '2026-03-19T18:00:00', // Thursday
      end: '2026-03-19T19:30:00',
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=TH'],
    },
    {
      summary: '🛠️ Pew Professional Debugging',
      description: 'Grad-level support for Applied CS/Cybersecurity. Systems and Architecture. $75/hr.',
      start: '2026-03-16T20:30:00', // Monday
      end: '2026-03-16T22:00:00',
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=MO'],
    }
  ];

  for (const slot of slots) {
    console.log(`Creating slot: ${slot.summary}...`);
    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: slot.summary,
        description: slot.description,
        start: { dateTime: slot.start, timeZone: 'America/Detroit' },
        end: { dateTime: slot.end, timeZone: 'America/Detroit' },
        recurrence: slot.recurrence,
      },
    });
  }

  console.log('All tutoring slots have been scheduled!');
}

main().catch(console.error);
