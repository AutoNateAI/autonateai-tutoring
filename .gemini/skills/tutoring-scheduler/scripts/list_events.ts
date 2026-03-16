import { google } from 'googleapis';
import path from 'path';

const KEY_PATH = '/home/nate/autonateai-workspace/remotion-ai-engine/service-account-key.json';

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  console.log('Attempting to list events from primary calendar...');
  
  try {
    const res = await calendar.events.list({
      calendarId: 'Autonate.ai@gmail.com',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log('Access confirmed: Connected to calendar (0 upcoming events found).');
    } else {
      console.log('Access confirmed: Connected to calendar. Found events:');
      events.forEach((event) => {
        console.log(`${event.start?.dateTime || event.start?.date} - ${event.summary}`);
      });
    }
  } catch (error) {
    console.error('Error connecting to calendar:', error);
  }
}

main().catch(console.error);
