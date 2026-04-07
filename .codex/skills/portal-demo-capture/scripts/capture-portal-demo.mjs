import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { chromium, devices } from "playwright";

const defaults = {
  base: process.env.PORTAL_BASE_URL || "https://portal.autonateai.com",
  email: process.env.PORTAL_DEMO_EMAIL || "demo-student-portal@autonateai.com",
  password: process.env.PORTAL_DEMO_PASSWORD || "DemoPortal!2026Student",
  device: "desktop",
  outputDir: path.resolve(process.cwd(), "static/video/portal-demos"),
  trimStart: 1,
};

const args = parseArgs(process.argv.slice(2));
const config = {
  base: args.base || defaults.base,
  email: args.email || defaults.email,
  password: args.password || defaults.password,
  device: args.device || defaults.device,
  outputDir: args["output-dir"] ? path.resolve(process.cwd(), args["output-dir"]) : defaults.outputDir,
  trimStart: Number(args["trim-start"] ?? defaults.trimStart),
};

const requestedFlows = new Set(
  typeof args.flows === "string"
    ? args.flows
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [],
);

const tempDir = path.join(config.outputDir, "_tmp");

const mobileProfile = {
  ...devices["iPhone 13"],
  colorScheme: "dark",
};

const desktopProfile = {
  viewport: { width: 1440, height: 900 },
  screen: { width: 1440, height: 900 },
  colorScheme: "dark",
  deviceScaleFactor: 1,
  isMobile: false,
  hasTouch: false,
};

const fillPayloads = {
  "daily-time-grid": [
    "calc homework, paper source check, quiz prep, work shift",
    "student, worker",
    "class until 3 PM, work at 6 PM, low energy after lunch",
  ],
  "assignment-sprint-planner": [
    "5-page policy paper on epigenetics and environment",
    "Friday at 5 PM",
  ],
  "reading-capture-matrix": [
    "Epigenetics changes gene expression without changing DNA sequence. DNA methylation, histone marks, and chromatin state shape what gets expressed.",
  ],
  "study-heatmap-board": [
    "cell signaling, epigenetics, chromatin remodeling, transcription factors",
    "3/10, 5/10, 2/10, 6/10",
  ],
  "paper-source-matrix": [
    "How epigenetic regulation shapes adaptation and reconstruction",
    "Need 5 academic sources, one thesis, and clean MLA citations",
  ],
  "day-debrief-lab": [
    "8 to 10 AM deep work was clean, 1 to 3 PM energy crashed, phone distractions spiked after work, tomorrow needs a stronger shutdown and less task switching",
  ],
};

const flowDefinitions = [
  ["lecture", recordLecture],
  ["sheet-copy", recordSheetFlow],
  ["daily-time-grid", (browser) => recordWorkflowPrompt(browser, "daily-time-grid", "daily-time-grid")],
  ["assignment-sprint", (browser) =>
    recordWorkflowPrompt(browser, "assignment-sprint-planner", "assignment-sprint")],
  ["reading-capture", (browser) => recordWorkflowPrompt(browser, "reading-capture-matrix", "reading-capture")],
  ["study-heatmap", (browser) => recordWorkflowPrompt(browser, "study-heatmap-board", "study-heatmap")],
  ["paper-source", (browser) => recordWorkflowPrompt(browser, "paper-source-matrix", "paper-source")],
  ["day-debrief", (browser) => recordWorkflowPrompt(browser, "day-debrief-lab", "day-debrief")],
];

async function main() {
  await ensureDir(config.outputDir);
  await ensureDir(tempDir);

  const browser = await chromium.launch({ headless: true });

  try {
    for (const [name, action] of flowDefinitions) {
      if (requestedFlows.size && !requestedFlows.has(name)) {
        continue;
      }

      try {
        await action(browser);
      } catch (error) {
        console.error(`failed ${name}`);
        console.error(error);
      }
    }
  } finally {
    await browser.close();
  }
}

function parseArgs(tokens) {
  const parsed = {};

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = tokens[index + 1];

    if (!next || next.startsWith("--")) {
      parsed[key] = true;
      continue;
    }

    parsed[key] = next;
    index += 1;
  }

  return parsed;
}

function getCaptureProfile() {
  return config.device === "desktop" ? desktopProfile : mobileProfile;
}

function getCaptureSize() {
  return config.device === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 };
}

function getOutputName(name) {
  return `${name}-${config.device}`;
}

async function ensureDir(target) {
  await fs.mkdir(target, { recursive: true });
}

async function authenticateContext(context) {
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  await page.goto(`${config.base}/#/login`, { waitUntil: "domcontentloaded" });
  await page.fill('input[name="email"]', config.email);
  await page.fill('input[name="password"]', config.password);
  await page.click('[data-auth-action="login"]');
  await page.waitForFunction(() => !window.location.hash.includes("/login"), null, {
    timeout: 30000,
  });
  await page.waitForTimeout(1500);
  await page.close();
}

async function createRecordedContext(browser) {
  const context = await browser.newContext({
    ...getCaptureProfile(),
    recordVideo: {
      dir: tempDir,
      size: getCaptureSize(),
    },
  });

  const origin = new URL(config.base).origin;
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin });

  return context;
}

async function finalizeVideo(page, context, outputName) {
  const video = page.video();
  await context.close();
  const sourcePath = await video.path();
  const mp4Path = path.join(config.outputDir, `${getOutputName(outputName)}.mp4`);

  spawnSync(
    "ffmpeg",
    [
      "-y",
      "-ss",
      `${config.trimStart}`,
      "-i",
      sourcePath,
      "-an",
      "-vf",
      "fps=15",
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "30",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      mp4Path,
    ],
    { stdio: "inherit" },
  );

  console.log(`saved ${mp4Path}`);
}

async function fillPromptFields(page, slug) {
  const values = fillPayloads[slug] || [];
  const fields = page.locator("[data-copy-field]");
  const count = await fields.count();

  for (let index = 0; index < Math.min(count, values.length); index += 1) {
    await fields.nth(index).fill(values[index]);
    await page.waitForTimeout(350);
  }
}

async function recordLecture(browser) {
  const context = await createRecordedContext(browser);
  await authenticateContext(context);
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  await page.goto(`${config.base}/#/tracks/student`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2600);
  await page.click("[data-voice-toggle]");
  await page.waitForTimeout(1800);
  await page.click('[data-slide-action="next"]');
  await page.waitForTimeout(1400);
  await page.click('[data-slide-action="next"]');
  await page.waitForTimeout(1800);

  await finalizeVideo(page, context, "student-lecture");
}

async function recordWorkflowPrompt(browser, slug, outputName) {
  const context = await createRecordedContext(browser);
  await authenticateContext(context);
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  await page.goto(`${config.base}/#/workflows/${slug}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2400);
  await fillPromptFields(page, slug);
  await page.waitForTimeout(350);
  await page.click("[data-copy-prompt]");
  await page.waitForTimeout(1600);

  await finalizeVideo(page, context, outputName);
}

async function recordSheetFlow(browser) {
  const context = await createRecordedContext(browser);
  await authenticateContext(context);
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  await page.goto(`${config.base}/#/workflows/daily-time-grid`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2200);

  await page.evaluate(() => {
    const details = document.querySelector("details.workflow-sheet-details");
    if (details) {
      details.open = true;
    }
  });
  await page.waitForTimeout(700);

  const copySheetButton = page.locator("details.workflow-sheet-details a.btn.btn-primary").first();
  await copySheetButton.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);

  await page.evaluate(() => {
    const button = [...document.querySelectorAll("a.btn.btn-primary")].find((node) =>
      node.textContent?.includes("Copy this sheet"),
    );
    if (button) {
      button.removeAttribute("target");
    }
  });

  await copySheetButton.click();
  await page.waitForTimeout(3200);

  await finalizeVideo(page, context, "student-sheet-copy");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
