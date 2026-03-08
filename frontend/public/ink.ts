type Nullable<T> = T | null;

const TIMING = {
  CLOSE_DELAY: 500,
  SPINE_FADE: 900,
  OVERLAY_FADE: 1300,
  OVERLAY_REMOVE: 1800,
  STAGGER_INTERVAL: 200,
} as const;

const CONTENT_SELECTORS =
  "nav, body > p, .Campaigns, .timeline-c1, footer, .Pathfinders, .schedule-section, .character-page";

function qs<T extends Element = Element>(
  selector: string,
  parent: ParentNode = document,
): Nullable<T> {
  return parent.querySelector(selector) as Nullable<T>;
}

function qsAll<T extends Element = Element>(selector: string): NodeListOf<T> {
  return document.querySelectorAll<T>(selector);
}

function revealContent(elements: NodeListOf<Element>): void {
  elements.forEach((el, i) => {
    const htmlEl = el as HTMLElement;
    setTimeout(() => {
      htmlEl.style.opacity = "1";
      htmlEl.style.transform = "translateY(0)";
    }, i * TIMING.STAGGER_INTERVAL);
  });
}

function initBookClose(
  overlay: HTMLElement,
  bookLeft: Nullable<Element>,
  bookRight: Nullable<Element>,
  bookSpine: Nullable<HTMLElement>,
  elements: NodeListOf<Element>,
): void {
  setTimeout(() => {
    (bookLeft as HTMLElement | null)?.classList.add("closing");
    (bookRight as HTMLElement | null)?.classList.add("closing");
    setTimeout(() => {
      if (bookSpine) bookSpine.style.opacity = "0";
    }, TIMING.SPINE_FADE - TIMING.CLOSE_DELAY);
    setTimeout(() => {
      overlay.classList.add("fade-out");
    }, TIMING.OVERLAY_FADE - TIMING.CLOSE_DELAY);
    setTimeout(() => {
      overlay.remove();
      revealContent(elements);
    }, TIMING.OVERLAY_REMOVE - TIMING.CLOSE_DELAY);
  }, TIMING.CLOSE_DELAY);
}

function initCharacterEntry(
  overlay: HTMLElement,
  elements: NodeListOf<Element>,
): void {
  setTimeout(() => {
    overlay.style.transition = "opacity 0.35s ease";
    overlay.classList.add("fade-out");
    setTimeout(() => {
      overlay.remove();
      revealContent(elements);
    }, 380);
  }, 120);
}

function initDiceOverlay(
  overlay: HTMLElement,
  elements: NodeListOf<Element>,
): void {
  let dismissed = false;
  const diceNumber = document.getElementById(
    "dice-number",
  ) as Nullable<HTMLElement>;
  const d20 = document.getElementById("d20") as Nullable<HTMLElement>;
  const dicePrompt = overlay.querySelector(
    ".dice-prompt",
  ) as Nullable<HTMLElement>;

  function dismiss(): void {
    if (dismissed) return;
    dismissed = true;
    overlay.classList.add("dismissed");
    setTimeout(() => {
      overlay.remove();
      revealContent(elements);
    }, 870);
  }

  function rollDice(): void {
    if (dismissed || !d20) return;
    d20.classList.add("rolling");
    const result = Math.floor(Math.random() * 20) + 1;
    let count = 0;
    const interval = setInterval(() => {
      if (diceNumber)
        diceNumber.textContent = String(Math.floor(Math.random() * 20) + 1);
      count++;
      if (count >= 15) {
        clearInterval(interval);
        if (diceNumber) diceNumber.textContent = String(result);
        if (dicePrompt) dicePrompt.textContent = `You rolled a ${result}!`;
        d20.classList.remove("rolling");
        setTimeout(() => dismiss(), 1200);
      }
    }, 60);
  }

  if (d20) d20.addEventListener("click", () => rollDice());
  overlay.addEventListener("click", (e) => {
    const target = e.target as Node;
    if (d20 && target === d20) return;
    rollDice();
  });
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (!dismissed && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      rollDice();
    }
  });
  setTimeout(() => {
    if (!dismissed && d20 && !d20.classList.contains("rolling")) {
      rollDice();
    }
  }, 3000);
}

function runPageTurnExit(href: string): void {
  const isDark = document.documentElement.classList.contains("dark");
  const backBg = isDark ? "#0f0b14" : "#e8dcc8";
  const backLine = isDark ? "rgba(201,184,232,0.04)" : "rgba(90,60,8,0.06)";
  const makeLinedBg = (base: string, line: string) =>
    `repeating-linear-gradient(to bottom, transparent, transparent 21px,\n ${line} 21px, ${line} 22px), ${base}`;

  document.body.style.pointerEvents = "none";
  window.scrollTo(0, 0);

  const behind = document.createElement("div");
  Object.assign(behind.style, {
    position: "fixed",
    inset: "0",
    zIndex: "9998",
    background: makeLinedBg(backBg, backLine),
    pointerEvents: "none",
  } as Partial<CSSStyleDeclaration>);
  document.body.appendChild(behind);

  const snapshot = Array.from(document.body.children).filter(
    (c) => c !== behind,
  );
  const page = document.createElement("div");
  Object.assign(page.style, {
    position: "fixed",
    inset: "0",
    zIndex: "9999",
    overflow: "hidden",
    backfaceVisibility: "hidden",
    transformOrigin: "left center",
    transformStyle: "preserve-3d",
    transition: "transform 0.85s cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    transform: "perspective(2200px) rotateY(0deg)",
    pointerEvents: "none",
  } as Partial<CSSStyleDeclaration>);

  snapshot.forEach((child) => page.appendChild(child));
  document.body.appendChild(page);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      page.style.transform = "perspective(2200px) rotateY(-180deg)";
      setTimeout(() => {
        window.location.href = href;
      }, 880);
    }),
  );
}

function initDepartureLinks(): void {
  document.querySelectorAll(".pathfinder-card a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href) return;
      e.preventDefault();
      runPageTurnExit(href);
    });
  });
}

function initBookOverlay(): void {
  const elements = qsAll(CONTENT_SELECTORS);
  elements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    htmlEl.style.opacity = "0";
    htmlEl.style.transform = "translateY(20px)";
    htmlEl.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  const diceOverlay = document.getElementById(
    "dice-overlay",
  ) as Nullable<HTMLElement>;
  if (diceOverlay) {
    initDiceOverlay(diceOverlay, elements);
    return;
  }

  const swipeOverlay = document.getElementById(
    "swipe-overlay",
  ) as Nullable<HTMLElement>;
  if (swipeOverlay) {
    initDiceOverlay(swipeOverlay, elements);
    return;
  }

  const overlay = document.getElementById(
    "book-overlay",
  ) as Nullable<HTMLElement>;
  if (!overlay) {
    requestAnimationFrame(() => revealContent(elements));
    return;
  }

  const bookLeft = qs(".book-left", overlay);
  const bookRight = qs(".book-right", overlay);
  const bookSpine = qs<HTMLElement>(".book-spine", overlay);

  if (document.querySelector(".character-page")) {
    initCharacterEntry(overlay, elements);
  } else {
    initBookClose(overlay, bookLeft, bookRight, bookSpine, elements);
  }
}

function initToggleTab(tabId: string, targetSelector: string): void {
  const tab = document.getElementById(tabId);
  const target = qs(targetSelector);

  if (!tab || !target) return;

  // Remove all existing listeners by cloning
  const newTab = tab.cloneNode(true) as HTMLElement;
  tab.parentNode?.replaceChild(newTab, tab);

  // Add single fresh listener
  newTab.addEventListener("click", () => {
    target.classList.toggle("open");
    newTab.classList.toggle("open");
  });
}

function initDarkMode(): void {
  const html = document.documentElement;

  // Function to apply theme based on system preference
  const applySystemTheme = () => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (prefersDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("lore-dark", String(prefersDark));
  };

  const storedPreference = localStorage.getItem("lore-dark-override");

  if (storedPreference !== null) {
    const isDark = storedPreference === "true";
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  } else {
    applySystemTheme();
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    if (localStorage.getItem("lore-dark-override") === null) {
      if (e.matches) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
      localStorage.setItem("lore-dark", String(e.matches));
    }
  });
}

function initRolling(): void {
  let activeToast: Nullable<HTMLElement> = null;
  let toastTimeout: Nullable<ReturnType<typeof setTimeout>> = null;

  function fireRoll(name: string, modifier: number): void {
    const dieRoll = Math.floor(Math.random() * 20) + 1;
    const total = dieRoll + modifier;

    if (activeToast) {
      activeToast.remove();
      activeToast = null;
    }
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      toastTimeout = null;
    }

    const modStr =
      modifier > 0
        ? `<span class="roll-op">+</span><span class="roll-mod">${modifier}</span>`
        : modifier < 0
          ? `<span class="roll-op">−</span><span class="roll-mod">${Math.abs(modifier)}</span>`
          : "";

    const toast = document.createElement("div");
    toast.className = "roll-toast";
    toast.innerHTML = `
      <div class="roll-toast-label">${name} Check</div>
      <div class="roll-toast-breakdown">
        <span class="roll-die">—</span>
        ${modStr}
        <span class="roll-eq">=</span>
        <span class="roll-total">—</span>
      </div>`;
    document.body.appendChild(toast);
    activeToast = toast;

    const dieEl = toast.querySelector<HTMLElement>(".roll-die")!;
    const totEl = toast.querySelector<HTMLElement>(".roll-total")!;
    let count = 0;
    const interval = setInterval(() => {
      dieEl.textContent = String(Math.floor(Math.random() * 20) + 1);
      count++;
      if (count >= 12) {
        clearInterval(interval);
        dieEl.textContent = String(dieRoll);
        totEl.textContent = String(total);
        toast.classList.add("settled");
        if (dieRoll === 20) toast.classList.add("crit");
        if (dieRoll === 1) toast.classList.add("fumble");
      }
    }, 55);

    toastTimeout = setTimeout(() => {
      toast.classList.add("dismissing");
      setTimeout(() => {
        toast.remove();
        if (activeToast === toast) activeToast = null;
      }, 400);
    }, 2800);
  }

  const statsSheet = qs<HTMLElement>(".sheet-stats");
  if (statsSheet) {
    statsSheet.querySelectorAll<HTMLDivElement>("dl > div").forEach((div) => {
      div.classList.add("rollable");
      div.addEventListener("click", () => {
        const dt = div.querySelector("dt");
        const dd = div.querySelector("dd");
        if (!dt || !dd) return;
        fireRoll(
          dt.textContent?.trim() ?? "",
          parseInt(dd.textContent?.trim() ?? "0", 10) || 0,
        );
      });
    });
  }

  const skillsSheet = qs<HTMLElement>(".sheet-skills");
  if (skillsSheet) {
    skillsSheet.querySelectorAll<HTMLElement>("dl > dt").forEach((dt) => {
      const dd = dt.nextElementSibling as HTMLElement | null;
      if (!dd) return;
      dt.classList.add("rollable");
      dd.classList.add("rollable");
      const handler = () =>
        fireRoll(
          dt.textContent?.trim() ?? "",
          parseInt(dd.textContent?.trim() ?? "0", 10) || 0,
        );
      dt.addEventListener("click", handler);
      dd.addEventListener("click", handler);
    });
  }

  const SAVES = new Set(["Fortitude", "Reflex", "Will"]);
  const defSection = qs<HTMLElement>(".sheet-defensive .def-section");
  if (defSection) {
    defSection.querySelectorAll<HTMLDivElement>("dl > div").forEach((div) => {
      const dt = div.querySelector("dt");
      const dd = div.querySelector("dd");
      if (!dt || !dd) return;
      const name = dt.textContent?.trim() ?? "";
      if (!SAVES.has(name)) return;
      div.classList.add("rollable");
      div.addEventListener("click", () =>
        fireRoll(name, parseInt(dd.textContent?.trim() ?? "0", 10) || 0),
      );
    });
  }
}

function initHeroPoints(): void {
  const icons = document.querySelectorAll(".hero-point-icon");
  console.log("✅ initHeroPoints called - found", icons.length, "hero points");

  icons.forEach((icon, index) => {
    // Remove old listeners by cloning
    const newIcon = icon.cloneNode(true) as HTMLElement;
    icon.parentNode?.replaceChild(newIcon, icon);

    function toggle() {
      console.log("Hero point", index, "clicked!");
      const spent = newIcon.classList.toggle("spent");
      newIcon.setAttribute("aria-pressed", String(spent));
    }

    newIcon.addEventListener("click", toggle);
    newIcon.addEventListener("keydown", (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key === "Enter" || ke.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  console.log("✅ Hero points initialized");
}
const ICAL_URL =
  "https://calendar.google.com/calendar/ical/lorerealm.calendar%40gmail.com/public/basic.ics";
const CAL_PROXIES = [
  "https://api.codetabs.com/v1/proxy?quest=",
  "https://proxy.cors.sh/",
  "https://corsproxy.io/?url=",
];
const CAL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const CAL_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const CAL_DAY_MAP: Record<string, number> = {
  SU: 0,
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FR: 5,
  SA: 6,
};

interface CalEvent {
  SUMMARY?: string;
  DTSTART?: string;
  DTEND?: string;
  RRULE?: string;
  _start: Date;
  _end: Date;
}

let calYear = 0;
let calMonth = 0;
let calEvents: CalEvent[] = [];

function calUnfold(text: string): string {
  return text.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
}
function tzOffsetDate(
  y: number,
  mo: number,
  d: number,
  h: number,
  mi: number,
  sc: number,
  tzid: string,
): Date {
  const candidate = new Date(Date.UTC(y, mo, d, h, mi, sc));
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tzid,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .formatToParts(candidate)
    .reduce<Record<string, string>>((acc, p) => {
      acc[p.type] = p.value;
      return acc;
    }, {});
  const tzAsUtc = Date.UTC(
    +parts["year"],
    +parts["month"] - 1,
    +parts["day"],
    +parts["hour"] % 24,
    +parts["minute"],
    +parts["second"],
  );
  return new Date(
    candidate.getTime() + (Date.UTC(y, mo, d, h, mi, sc) - tzAsUtc),
  );
}

function parseICal(text: string): Record<string, string>[] {
  const events: Record<string, string>[] = [];
  const lines = calUnfold(text).split(/\r?\n/);
  let current: Record<string, string> | null = null;
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      current = {};
    } else if (line === "END:VEVENT" && current) {
      events.push(current);
      current = null;
    } else if (current) {
      const idx = line.indexOf(":");
      if (idx === -1) continue;
      const keyPart = line.substring(0, idx);
      const baseKey = keyPart.split(";")[0];
      current[baseKey] = line.substring(idx + 1);
      const tzidMatch = keyPart.match(/TZID=([^;]+)/);
      if (tzidMatch && (baseKey === "DTSTART" || baseKey === "DTEND")) {
        current[baseKey + "_TZID"] = tzidMatch[1];
      }
    }
  }
  return events;
}

function parseICalDate(str: string | undefined, tzid?: string): Date | null {
  if (!str) return null;
  const s = str.trim();
  const y = parseInt(s.substring(0, 4));
  const mo = parseInt(s.substring(4, 6)) - 1;
  const d = parseInt(s.substring(6, 8));
  if (s.length === 8) return new Date(y, mo, d);
  const h = parseInt(s.substring(9, 11));
  const mi = parseInt(s.substring(11, 13));
  const sc = parseInt(s.substring(13, 15)) || 0;
  if (s.endsWith("Z")) return new Date(Date.UTC(y, mo, d, h, mi, sc));
  if (tzid) {
    try {
      return tzOffsetDate(y, mo, d, h, mi, sc, tzid);
    } catch {
      /* fall through */
    }
  }
  return new Date(y, mo, d, h, mi, sc);
}

function makeCalEvent(
  raw: Record<string, string>,
  start: Date,
  duration: number,
): CalEvent {
  return {
    SUMMARY: raw["SUMMARY"],
    DTSTART: raw["DTSTART"],
    DTEND: raw["DTEND"],
    RRULE: raw["RRULE"],
    _start: new Date(start),
    _end: new Date(start.getTime() + duration),
  };
}

function expandCalEvents(
  rawEvents: Record<string, string>[],
  rangeStart: Date,
  rangeEnd: Date,
): CalEvent[] {
  const results: CalEvent[] = [];
  for (const raw of rawEvents) {
    const start = parseICalDate(raw["DTSTART"], raw["DTSTART_TZID"]);
    if (!start) continue;
    const end = parseICalDate(raw["DTEND"], raw["DTEND_TZID"]);

    const duration = end ? end.getTime() - start.getTime() : 3600000;
    if (raw["RRULE"]) {
      results.push(...expandRRule(raw, start, duration, rangeStart, rangeEnd));
    } else if (start >= rangeStart && start <= rangeEnd) {
      results.push(makeCalEvent(raw, start, duration));
    }
  }
  return results.sort((a, b) => a._start.getTime() - b._start.getTime());
}

function expandRRule(
  raw: Record<string, string>,
  dtStart: Date,
  duration: number,
  rangeStart: Date,
  rangeEnd: Date,
): CalEvent[] {
  const rules: Record<string, string> = {};
  (raw["RRULE"] || "").split(";").forEach((part) => {
    const eq = part.indexOf("=");
    if (eq !== -1) rules[part.substring(0, eq)] = part.substring(eq + 1);
  });

  const freq = rules["FREQ"] || "";
  const maxCount = rules["COUNT"] ? parseInt(rules["COUNT"]) : 260;
  const until = rules["UNTIL"] ? parseICalDate(rules["UNTIL"]) : null;
  const interval = rules["INTERVAL"] ? parseInt(rules["INTERVAL"]) : 1;
  const byDay = rules["BYDAY"]
    ? rules["BYDAY"]
        .split(",")
        .map((d) => CAL_DAY_MAP[d.replace(/[+\-\d]/g, "")] || 0)
    : null;

  const results: CalEvent[] = [];
  let count = 0;

  const push = (d: Date): void => {
    results.push(makeCalEvent(raw, d, duration));
    count++;
  };

  if (freq === "WEEKLY" && byDay) {
    const cursor = new Date(dtStart);
    cursor.setDate(cursor.getDate() - cursor.getDay());
    while (cursor <= rangeEnd && count < maxCount) {
      for (const dow of [...byDay].sort((a, b) => a - b)) {
        const cand = new Date(cursor);
        cand.setDate(cursor.getDate() + dow);
        cand.setHours(
          dtStart.getHours(),
          dtStart.getMinutes(),
          dtStart.getSeconds(),
          0,
        );
        if (cand < dtStart || cand > rangeEnd || count >= maxCount) continue;
        if (until && cand > until) continue;
        if (cand >= rangeStart) push(cand);
      }
      cursor.setDate(cursor.getDate() + 7 * interval);
    }
  } else if (freq === "WEEKLY") {
    const cursor = new Date(dtStart);
    while (cursor <= rangeEnd && count < maxCount) {
      if (until && cursor > until) break;
      if (cursor >= rangeStart) push(cursor);
      cursor.setDate(cursor.getDate() + 7 * interval);
    }
  } else if (freq === "DAILY") {
    const cursor = new Date(dtStart);
    while (cursor <= rangeEnd && count < maxCount) {
      if (until && cursor > until) break;
      if (cursor >= rangeStart) push(cursor);
      cursor.setDate(cursor.getDate() + interval);
    }
  }

  return results;
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderCalendar(): void {
  const label = document.getElementById(
    "cal-month-label",
  ) as HTMLElement | null;
  const grid = document.getElementById("calendar-grid") as HTMLElement | null;
  if (!label || !grid) return;

  label.textContent = `${CAL_MONTHS[calMonth]} ${calYear}`;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();
  const mStart = new Date(calYear, calMonth, 1);
  const mEnd = new Date(calYear, calMonth + 1, 0, 23, 59, 59);

  const byDay: Record<number, CalEvent[]> = {};
  calEvents
    .filter((ev) => ev._start >= mStart && ev._start <= mEnd)
    .forEach((ev) => {
      const d = ev._start.getDate();
      if (!byDay[d]) byDay[d] = [];
      byDay[d].push(ev);
    });

  const htmlParts: string[] = [];
  htmlParts.push(`<div class="cal-day-headers">`);
  CAL_DAYS.forEach((d) => {
    htmlParts.push(`<div class="cal-day-header">${d}</div>`);
  });
  htmlParts.push(`</div><div class="cal-cells">`);

  for (let i = 0; i < firstDay; i++)
    htmlParts.push(`<div class="cal-cell cal-cell--empty"></div>`);

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday =
      today.getFullYear() === calYear &&
      today.getMonth() === calMonth &&
      today.getDate() === d;
    const evs: CalEvent[] = byDay[d] || [];
    const cls =
      "cal-cell" +
      (isToday ? " cal-cell--today" : "") +
      (evs.length ? " cal-cell--has-events" : "");

    htmlParts.push(`<div class="${cls}"><span class="cal-day-num">${d}</span>`);
    if (evs.length) {
      htmlParts.push(`<div class="cal-event-pills">`);
      evs.slice(0, 2).forEach((ev) => {
        const name = escHtml(ev.SUMMARY || "Stream");
        htmlParts.push(
          `<div class="cal-event-pill" title="${name}"><span class="cal-event-name">${name}</span></div>`,
        );
      });
      if (evs.length > 2)
        htmlParts.push(
          `<div class="cal-event-more">+${evs.length - 2} more</div>`,
        );
      htmlParts.push(`</div>`);
    }
    htmlParts.push(`</div>`);
  }
  htmlParts.push(`</div>`);
  grid.innerHTML = htmlParts.join("");
}

function renderUpcoming(): void {
  const container = document.getElementById(
    "upcoming-events",
  ) as HTMLElement | null;
  if (!container) return;

  const now = new Date();
  const future = calEvents.filter((ev) => ev._start >= now).slice(0, 8);

  if (!future.length) {
    container.innerHTML = `<p class="cal-empty">No upcoming streams scheduled \u2014 check back soon!</p>`;
    return;
  }

  const htmlParts: string[] = [];
  htmlParts.push(
    `<h6 class="upcoming-heading">Upcoming Streams</h6><div class="upcoming-list">`,
  );

  future.forEach((ev) => {
    const timeStr = ev._start.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
    const name = escHtml(ev.SUMMARY || "Stream");
    htmlParts.push(`<div class="upcoming-event">
      <div class="upcoming-date-block">
        <span class="upcoming-weekday">${ev._start.toLocaleDateString([], { weekday: "short" })}</span>
        <span class="upcoming-day">${ev._start.getDate()}</span>
        <span class="upcoming-month">${ev._start.toLocaleDateString([], { month: "short" })}</span>
      </div>
      <div class="upcoming-details">
        <div class="upcoming-name">${name}</div>
        <div class="upcoming-time">${timeStr}</div>
      </div>
    </div>`);
  });

  htmlParts.push(`</div>`);
  container.innerHTML = htmlParts.join("");
}

// 1. Safe Environment Variable Handling
// This prevents the "process is not defined" crash in the browser
const getApiBase = (): string => {
  if (
    typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_URL
  ) {
    return process.env.REACT_APP_API_URL;
  }
  // Fallback to your production Render URL
  return "https://lorerealm-website.onrender.com";
};

const API_BASE = getApiBase();

async function fetchCalendar(): Promise<void> {
  const grid = document.getElementById("calendar-grid");
  if (!grid) return;

  grid.innerHTML = `<div class="cal-loading">Consulting the stars…</div>`;

  try {
    const res = await fetch(`${API_BASE}/api/streams`, {
      method: "GET",
      headers: {
        Accept: "text/calendar, text/plain",
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const text = await res.text();

    if (!text.includes("BEGIN:VCALENDAR")) {
      throw new Error("Invalid iCal data received from backend");
    }

    calEvents = expandCalEvents(
      parseICal(text),
      new Date(calYear - 1, 0, 1),
      new Date(calYear + 2, 0, 1),
    );

    renderCalendar();
    renderUpcoming();
  } catch (err) {
    console.error("Backend calendar fetch failed:", err);
    grid.innerHTML = `<div class="cal-error">The stars are silent.</div>`;
  }
}

function initCalendar(): void {
  if (!document.getElementById("calendar-grid")) return;

  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth();

  (
    document.getElementById("cal-prev") as HTMLButtonElement | null
  )?.addEventListener("click", () => {
    if (--calMonth < 0) {
      calMonth = 11;
      calYear--;
    }
    renderCalendar();
  });

  (
    document.getElementById("cal-next") as HTMLButtonElement | null
  )?.addEventListener("click", () => {
    if (++calMonth > 11) {
      calMonth = 0;
      calYear++;
    }
    renderCalendar();
  });

  void fetchCalendar();
}

(window as any).initDarkMode = initDarkMode;
(window as any).initToggleTab = initToggleTab;
(window as any).initCalendar = initCalendar;
(window as any).initDepartureLinks = initDepartureLinks;
(window as any).initHeroPoints = initHeroPoints;
(window as any).initRolling = initRolling;

(window as any).reinitLoreRealm = function (): void {
  initDarkMode();
  initToggleTab("timeline-tab", ".timeline-tree");
  initToggleTab("pathfinders-tab", ".pathfinders-grid");
  initToggleTab("backstory-tab", ".backstory-body");
  initToggleTab("schedule-tab", ".schedule-body");
  initCalendar();
  initDepartureLinks();
  initHeroPoints();
  initRolling();
};

window.addEventListener("load", () => {
  const diceOverlaySeen = sessionStorage.getItem("lore-dice-seen");

  if (!diceOverlaySeen) {
    initBookOverlay();
    sessionStorage.setItem("lore-dice-seen", "true");
  }

  initDepartureLinks();
  initToggleTab("timeline-tab", ".timeline-tree");
  initToggleTab("pathfinders-tab", ".pathfinders-grid");
  initToggleTab("backstory-tab", ".backstory-body");
  initDarkMode();
  initHeroPoints();
  initRolling();
  initCalendar();
  initToggleTab("schedule-tab", ".schedule-body");
});
