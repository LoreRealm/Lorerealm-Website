var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TIMING = {
    CLOSE_DELAY: 500,
    SPINE_FADE: 900,
    OVERLAY_FADE: 1300,
    OVERLAY_REMOVE: 1800,
    STAGGER_INTERVAL: 200
};
var CONTENT_SELECTORS = "nav, body > p, .Campaigns, .timeline-c1, footer, .Pathfinders, .schedule-section, .character-page";
function qs(selector, parent) {
    if (parent === void 0) { parent = document; }
    return parent.querySelector(selector);
}
function qsAll(selector) {
    return document.querySelectorAll(selector);
}
function revealContent(elements) {
    elements.forEach(function (el, i) {
        var htmlEl = el;
        setTimeout(function () {
            htmlEl.style.opacity = "1";
            htmlEl.style.transform = "translateY(0)";
        }, i * TIMING.STAGGER_INTERVAL);
    });
}
function initBookClose(overlay, bookLeft, bookRight, bookSpine, elements) {
    setTimeout(function () {
        bookLeft === null || bookLeft === void 0 ? void 0 : bookLeft.classList.add("closing");
        bookRight === null || bookRight === void 0 ? void 0 : bookRight.classList.add("closing");
        setTimeout(function () {
            if (bookSpine)
                bookSpine.style.opacity = "0";
        }, TIMING.SPINE_FADE - TIMING.CLOSE_DELAY);
        setTimeout(function () {
            overlay.classList.add("fade-out");
        }, TIMING.OVERLAY_FADE - TIMING.CLOSE_DELAY);
        setTimeout(function () {
            overlay.remove();
            revealContent(elements);
        }, TIMING.OVERLAY_REMOVE - TIMING.CLOSE_DELAY);
    }, TIMING.CLOSE_DELAY);
}
function initCharacterEntry(overlay, elements) {
    setTimeout(function () {
        overlay.style.transition = "opacity 0.35s ease";
        overlay.classList.add("fade-out");
        setTimeout(function () {
            overlay.remove();
            revealContent(elements);
        }, 380);
    }, 120);
}
function initDiceOverlay(overlay, elements) {
    var dismissed = false;
    var diceNumber = document.getElementById("dice-number");
    var d20 = document.getElementById("d20");
    var dicePrompt = overlay.querySelector(".dice-prompt");
    function dismiss() {
        if (dismissed)
            return;
        dismissed = true;
        overlay.classList.add("dismissed");
        setTimeout(function () {
            overlay.remove();
            revealContent(elements);
        }, 870);
    }
    function rollDice() {
        if (dismissed || !d20)
            return;
        d20.classList.add("rolling");
        var result = Math.floor(Math.random() * 20) + 1;
        var count = 0;
        var interval = setInterval(function () {
            if (diceNumber)
                diceNumber.textContent = String(Math.floor(Math.random() * 20) + 1);
            count++;
            if (count >= 15) {
                clearInterval(interval);
                if (diceNumber)
                    diceNumber.textContent = String(result);
                if (dicePrompt)
                    dicePrompt.textContent = "You rolled a ".concat(result, "!");
                d20.classList.remove("rolling");
                setTimeout(function () { return dismiss(); }, 1200);
            }
        }, 60);
    }
    if (d20)
        d20.addEventListener("click", function () { return rollDice(); });
    overlay.addEventListener("click", function (e) {
        var target = e.target;
        if (d20 && target === d20)
            return;
        rollDice();
    });
    document.addEventListener("keydown", function (e) {
        if (!dismissed && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            rollDice();
        }
    });
    setTimeout(function () {
        if (!dismissed && d20 && !d20.classList.contains("rolling")) {
            rollDice();
        }
    }, 3000);
}
function runPageTurnExit(href) {
    var isDark = document.documentElement.classList.contains("dark");
    var backBg = isDark ? "#0f0b14" : "#e8dcc8";
    var backLine = isDark ? "rgba(201,184,232,0.04)" : "rgba(90,60,8,0.06)";
    var makeLinedBg = function (base, line) {
        return "repeating-linear-gradient(to bottom, transparent, transparent 21px,\n ".concat(line, " 21px, ").concat(line, " 22px), ").concat(base);
    };
    document.body.style.pointerEvents = "none";
    window.scrollTo(0, 0);
    var behind = document.createElement("div");
    Object.assign(behind.style, {
        position: "fixed",
        inset: "0",
        zIndex: "9998",
        background: makeLinedBg(backBg, backLine),
        pointerEvents: "none"
    });
    document.body.appendChild(behind);
    var snapshot = Array.from(document.body.children).filter(function (c) { return c !== behind; });
    var page = document.createElement("div");
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
        pointerEvents: "none"
    });
    snapshot.forEach(function (child) { return page.appendChild(child); });
    document.body.appendChild(page);
    requestAnimationFrame(function () {
        return requestAnimationFrame(function () {
            page.style.transform = "perspective(2200px) rotateY(-180deg)";
            setTimeout(function () {
                window.location.href = href;
            }, 880);
        });
    });
}
function initDepartureLinks() {
    document.querySelectorAll(".pathfinder-card a").forEach(function (link) {
        link.addEventListener("click", function (e) {
            var href = link.getAttribute("href");
            if (!href)
                return;
            e.preventDefault();
            runPageTurnExit(href);
        });
    });
}
function initBookOverlay() {
    var elements = qsAll(CONTENT_SELECTORS);
    elements.forEach(function (el) {
        var htmlEl = el;
        htmlEl.style.opacity = "0";
        htmlEl.style.transform = "translateY(20px)";
        htmlEl.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    var diceOverlay = document.getElementById("dice-overlay");
    if (diceOverlay) {
        initDiceOverlay(diceOverlay, elements);
        return;
    }
    var swipeOverlay = document.getElementById("swipe-overlay");
    if (swipeOverlay) {
        initDiceOverlay(swipeOverlay, elements);
        return;
    }
    var overlay = document.getElementById("book-overlay");
    if (!overlay) {
        requestAnimationFrame(function () { return revealContent(elements); });
        return;
    }
    var bookLeft = qs(".book-left", overlay);
    var bookRight = qs(".book-right", overlay);
    var bookSpine = qs(".book-spine", overlay);
    if (document.querySelector(".character-page")) {
        initCharacterEntry(overlay, elements);
    }
    else {
        initBookClose(overlay, bookLeft, bookRight, bookSpine, elements);
    }
}
function initToggleTab(tabId, targetSelector) {
    var _a;
    var tab = document.getElementById(tabId);
    var target = qs(targetSelector);
    if (!tab || !target)
        return;
    // Remove all existing listeners by cloning
    var newTab = tab.cloneNode(true);
    (_a = tab.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newTab, tab);
    // Add single fresh listener
    newTab.addEventListener("click", function () {
        target.classList.toggle("open");
        newTab.classList.toggle("open");
    });
}
function initDarkMode() {
    var html = document.documentElement;
    // Function to apply theme based on system preference
    var applySystemTheme = function () {
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
            html.classList.add("dark");
        }
        else {
            html.classList.remove("dark");
        }
        localStorage.setItem("lore-dark", String(prefersDark));
    };
    var storedPreference = localStorage.getItem("lore-dark-override");
    if (storedPreference !== null) {
        var isDark = storedPreference === "true";
        if (isDark) {
            html.classList.add("dark");
        }
        else {
            html.classList.remove("dark");
        }
    }
    else {
        applySystemTheme();
    }
    var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", function (e) {
        if (localStorage.getItem("lore-dark-override") === null) {
            if (e.matches) {
                html.classList.add("dark");
            }
            else {
                html.classList.remove("dark");
            }
            localStorage.setItem("lore-dark", String(e.matches));
        }
    });
}
function initRolling() {
    var activeToast = null;
    var toastTimeout = null;
    function fireRoll(name, modifier) {
        var dieRoll = Math.floor(Math.random() * 20) + 1;
        var total = dieRoll + modifier;
        if (activeToast) {
            activeToast.remove();
            activeToast = null;
        }
        if (toastTimeout) {
            clearTimeout(toastTimeout);
            toastTimeout = null;
        }
        var modStr = modifier > 0
            ? "<span class=\"roll-op\">+</span><span class=\"roll-mod\">".concat(modifier, "</span>")
            : modifier < 0
                ? "<span class=\"roll-op\">\u2212</span><span class=\"roll-mod\">".concat(Math.abs(modifier), "</span>")
                : "";
        var toast = document.createElement("div");
        toast.className = "roll-toast";
        toast.innerHTML = "\n      <div class=\"roll-toast-label\">".concat(name, " Check</div>\n      <div class=\"roll-toast-breakdown\">\n        <span class=\"roll-die\">\u2014</span>\n        ").concat(modStr, "\n        <span class=\"roll-eq\">=</span>\n        <span class=\"roll-total\">\u2014</span>\n      </div>");
        document.body.appendChild(toast);
        activeToast = toast;
        var dieEl = toast.querySelector(".roll-die");
        var totEl = toast.querySelector(".roll-total");
        var count = 0;
        var interval = setInterval(function () {
            dieEl.textContent = String(Math.floor(Math.random() * 20) + 1);
            count++;
            if (count >= 12) {
                clearInterval(interval);
                dieEl.textContent = String(dieRoll);
                totEl.textContent = String(total);
                toast.classList.add("settled");
                if (dieRoll === 20)
                    toast.classList.add("crit");
                if (dieRoll === 1)
                    toast.classList.add("fumble");
            }
        }, 55);
        toastTimeout = setTimeout(function () {
            toast.classList.add("dismissing");
            setTimeout(function () {
                toast.remove();
                if (activeToast === toast)
                    activeToast = null;
            }, 400);
        }, 2800);
    }
    var statsSheet = qs(".sheet-stats");
    if (statsSheet) {
        statsSheet.querySelectorAll("dl > div").forEach(function (div) {
            div.classList.add("rollable");
            div.addEventListener("click", function () {
                var _a, _b, _c, _d;
                var dt = div.querySelector("dt");
                var dd = div.querySelector("dd");
                if (!dt || !dd)
                    return;
                fireRoll((_b = (_a = dt.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "", parseInt((_d = (_c = dd.textContent) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "0", 10) || 0);
            });
        });
    }
    var skillsSheet = qs(".sheet-skills");
    if (skillsSheet) {
        skillsSheet.querySelectorAll("dl > dt").forEach(function (dt) {
            var dd = dt.nextElementSibling;
            if (!dd)
                return;
            dt.classList.add("rollable");
            dd.classList.add("rollable");
            var handler = function () {
                var _a, _b, _c, _d;
                return fireRoll((_b = (_a = dt.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "", parseInt((_d = (_c = dd.textContent) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "0", 10) || 0);
            };
            dt.addEventListener("click", handler);
            dd.addEventListener("click", handler);
        });
    }
    var SAVES = new Set(["Fortitude", "Reflex", "Will"]);
    var defSection = qs(".sheet-defensive .def-section");
    if (defSection) {
        defSection.querySelectorAll("dl > div").forEach(function (div) {
            var _a, _b;
            var dt = div.querySelector("dt");
            var dd = div.querySelector("dd");
            if (!dt || !dd)
                return;
            var name = (_b = (_a = dt.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
            if (!SAVES.has(name))
                return;
            div.classList.add("rollable");
            div.addEventListener("click", function () { var _a, _b; return fireRoll(name, parseInt((_b = (_a = dd.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "0", 10) || 0); });
        });
    }
}
function initHeroPoints() {
    var icons = document.querySelectorAll(".hero-point-icon");
    console.log("✅ initHeroPoints called - found", icons.length, "hero points");
    icons.forEach(function (icon, index) {
        var _a;
        // Remove old listeners by cloning
        var newIcon = icon.cloneNode(true);
        (_a = icon.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newIcon, icon);
        function toggle() {
            console.log("Hero point", index, "clicked!");
            var spent = newIcon.classList.toggle("spent");
            newIcon.setAttribute("aria-pressed", String(spent));
        }
        newIcon.addEventListener("click", toggle);
        newIcon.addEventListener("keydown", function (e) {
            var ke = e;
            if (ke.key === "Enter" || ke.key === " ") {
                e.preventDefault();
                toggle();
            }
        });
    });
    console.log("✅ Hero points initialized");
}
var ICAL_URL = "https://calendar.google.com/calendar/ical/lorerealm.calendar%40gmail.com/public/basic.ics";
var CAL_PROXIES = [
    "https://api.codetabs.com/v1/proxy?quest=",
    "https://proxy.cors.sh/",
    "https://corsproxy.io/?url=",
];
var CAL_MONTHS = [
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
];
var CAL_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var CAL_DAY_MAP = {
    SU: 0,
    MO: 1,
    TU: 2,
    WE: 3,
    TH: 4,
    FR: 5,
    SA: 6
};
var calYear = 0;
var calMonth = 0;
var calEvents = [];
function calUnfold(text) {
    return text.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
}
function tzOffsetDate(y, mo, d, h, mi, sc, tzid) {
    var candidate = new Date(Date.UTC(y, mo, d, h, mi, sc));
    var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: tzid,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    })
        .formatToParts(candidate)
        .reduce(function (acc, p) {
        acc[p.type] = p.value;
        return acc;
    }, {});
    var tzAsUtc = Date.UTC(+parts["year"], +parts["month"] - 1, +parts["day"], +parts["hour"] % 24, +parts["minute"], +parts["second"]);
    return new Date(candidate.getTime() + (Date.UTC(y, mo, d, h, mi, sc) - tzAsUtc));
}
function parseICal(text) {
    var events = [];
    var lines = calUnfold(text).split(/\r?\n/);
    var current = null;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line === "BEGIN:VEVENT") {
            current = {};
        }
        else if (line === "END:VEVENT" && current) {
            events.push(current);
            current = null;
        }
        else if (current) {
            var idx = line.indexOf(":");
            if (idx === -1)
                continue;
            var keyPart = line.substring(0, idx);
            var baseKey = keyPart.split(";")[0];
            current[baseKey] = line.substring(idx + 1);
            var tzidMatch = keyPart.match(/TZID=([^;]+)/);
            if (tzidMatch && (baseKey === "DTSTART" || baseKey === "DTEND")) {
                current[baseKey + "_TZID"] = tzidMatch[1];
            }
        }
    }
    return events;
}
function parseICalDate(str, tzid) {
    if (!str)
        return null;
    var s = str.trim();
    var y = parseInt(s.substring(0, 4));
    var mo = parseInt(s.substring(4, 6)) - 1;
    var d = parseInt(s.substring(6, 8));
    if (s.length === 8)
        return new Date(y, mo, d);
    var h = parseInt(s.substring(9, 11));
    var mi = parseInt(s.substring(11, 13));
    var sc = parseInt(s.substring(13, 15)) || 0;
    if (s.endsWith("Z"))
        return new Date(Date.UTC(y, mo, d, h, mi, sc));
    if (tzid) {
        try {
            return tzOffsetDate(y, mo, d, h, mi, sc, tzid);
        }
        catch (_a) {
            /* fall through */
        }
    }
    return new Date(y, mo, d, h, mi, sc);
}
function makeCalEvent(raw, start, duration) {
    return {
        SUMMARY: raw["SUMMARY"],
        DTSTART: raw["DTSTART"],
        DTEND: raw["DTEND"],
        RRULE: raw["RRULE"],
        _start: new Date(start),
        _end: new Date(start.getTime() + duration)
    };
}
function expandCalEvents(rawEvents, rangeStart, rangeEnd) {
    var results = [];
    for (var _i = 0, rawEvents_1 = rawEvents; _i < rawEvents_1.length; _i++) {
        var raw = rawEvents_1[_i];
        var start = parseICalDate(raw["DTSTART"], raw["DTSTART_TZID"]);
        if (!start)
            continue;
        var end = parseICalDate(raw["DTEND"], raw["DTEND_TZID"]);
        var duration = end ? end.getTime() - start.getTime() : 3600000;
        if (raw["RRULE"]) {
            results.push.apply(results, expandRRule(raw, start, duration, rangeStart, rangeEnd));
        }
        else if (start >= rangeStart && start <= rangeEnd) {
            results.push(makeCalEvent(raw, start, duration));
        }
    }
    return results.sort(function (a, b) { return a._start.getTime() - b._start.getTime(); });
}
function expandRRule(raw, dtStart, duration, rangeStart, rangeEnd) {
    var rules = {};
    (raw["RRULE"] || "").split(";").forEach(function (part) {
        var eq = part.indexOf("=");
        if (eq !== -1)
            rules[part.substring(0, eq)] = part.substring(eq + 1);
    });
    var freq = rules["FREQ"] || "";
    var maxCount = rules["COUNT"] ? parseInt(rules["COUNT"]) : 260;
    var until = rules["UNTIL"] ? parseICalDate(rules["UNTIL"]) : null;
    var interval = rules["INTERVAL"] ? parseInt(rules["INTERVAL"]) : 1;
    var byDay = rules["BYDAY"]
        ? rules["BYDAY"]
            .split(",")
            .map(function (d) { return CAL_DAY_MAP[d.replace(/[+\-\d]/g, "")] || 0; })
        : null;
    var results = [];
    var count = 0;
    var push = function (d) {
        results.push(makeCalEvent(raw, d, duration));
        count++;
    };
    if (freq === "WEEKLY" && byDay) {
        var cursor = new Date(dtStart);
        cursor.setDate(cursor.getDate() - cursor.getDay());
        while (cursor <= rangeEnd && count < maxCount) {
            for (var _i = 0, _a = __spreadArray([], byDay, true).sort(function (a, b) { return a - b; }); _i < _a.length; _i++) {
                var dow = _a[_i];
                var cand = new Date(cursor);
                cand.setDate(cursor.getDate() + dow);
                cand.setHours(dtStart.getHours(), dtStart.getMinutes(), dtStart.getSeconds(), 0);
                if (cand < dtStart || cand > rangeEnd || count >= maxCount)
                    continue;
                if (until && cand > until)
                    continue;
                if (cand >= rangeStart)
                    push(cand);
            }
            cursor.setDate(cursor.getDate() + 7 * interval);
        }
    }
    else if (freq === "WEEKLY") {
        var cursor = new Date(dtStart);
        while (cursor <= rangeEnd && count < maxCount) {
            if (until && cursor > until)
                break;
            if (cursor >= rangeStart)
                push(cursor);
            cursor.setDate(cursor.getDate() + 7 * interval);
        }
    }
    else if (freq === "DAILY") {
        var cursor = new Date(dtStart);
        while (cursor <= rangeEnd && count < maxCount) {
            if (until && cursor > until)
                break;
            if (cursor >= rangeStart)
                push(cursor);
            cursor.setDate(cursor.getDate() + interval);
        }
    }
    return results;
}
function escHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
function renderCalendar() {
    var label = document.getElementById("cal-month-label");
    var grid = document.getElementById("calendar-grid");
    if (!label || !grid)
        return;
    label.textContent = "".concat(CAL_MONTHS[calMonth], " ").concat(calYear);
    var firstDay = new Date(calYear, calMonth, 1).getDay();
    var daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    var today = new Date();
    var mStart = new Date(calYear, calMonth, 1);
    var mEnd = new Date(calYear, calMonth + 1, 0, 23, 59, 59);
    var byDay = {};
    calEvents
        .filter(function (ev) { return ev._start >= mStart && ev._start <= mEnd; })
        .forEach(function (ev) {
        var d = ev._start.getDate();
        if (!byDay[d])
            byDay[d] = [];
        byDay[d].push(ev);
    });
    var htmlParts = [];
    htmlParts.push("<div class=\"cal-day-headers\">");
    CAL_DAYS.forEach(function (d) {
        htmlParts.push("<div class=\"cal-day-header\">".concat(d, "</div>"));
    });
    htmlParts.push("</div><div class=\"cal-cells\">");
    for (var i = 0; i < firstDay; i++)
        htmlParts.push("<div class=\"cal-cell cal-cell--empty\"></div>");
    for (var d = 1; d <= daysInMonth; d++) {
        var isToday = today.getFullYear() === calYear &&
            today.getMonth() === calMonth &&
            today.getDate() === d;
        var evs = byDay[d] || [];
        var cls = "cal-cell" +
            (isToday ? " cal-cell--today" : "") +
            (evs.length ? " cal-cell--has-events" : "");
        htmlParts.push("<div class=\"".concat(cls, "\"><span class=\"cal-day-num\">").concat(d, "</span>"));
        if (evs.length) {
            htmlParts.push("<div class=\"cal-event-pills\">");
            evs.slice(0, 2).forEach(function (ev) {
                var name = escHtml(ev.SUMMARY || "Stream");
                htmlParts.push("<div class=\"cal-event-pill\" title=\"".concat(name, "\"><span class=\"cal-event-name\">").concat(name, "</span></div>"));
            });
            if (evs.length > 2)
                htmlParts.push("<div class=\"cal-event-more\">+".concat(evs.length - 2, " more</div>"));
            htmlParts.push("</div>");
        }
        htmlParts.push("</div>");
    }
    htmlParts.push("</div>");
    grid.innerHTML = htmlParts.join("");
}
function renderUpcoming() {
    var container = document.getElementById("upcoming-events");
    if (!container)
        return;
    var now = new Date();
    var future = calEvents.filter(function (ev) { return ev._start >= now; }).slice(0, 8);
    if (!future.length) {
        container.innerHTML = "<p class=\"cal-empty\">No upcoming streams scheduled \u2014 check back soon!</p>";
        return;
    }
    var htmlParts = [];
    htmlParts.push("<h6 class=\"upcoming-heading\">Upcoming Streams</h6><div class=\"upcoming-list\">");
    future.forEach(function (ev) {
        var timeStr = ev._start.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short"
        });
        var name = escHtml(ev.SUMMARY || "Stream");
        htmlParts.push("<div class=\"upcoming-event\">\n      <div class=\"upcoming-date-block\">\n        <span class=\"upcoming-weekday\">".concat(ev._start.toLocaleDateString([], { weekday: "short" }), "</span>\n        <span class=\"upcoming-day\">").concat(ev._start.getDate(), "</span>\n        <span class=\"upcoming-month\">").concat(ev._start.toLocaleDateString([], { month: "short" }), "</span>\n      </div>\n      <div class=\"upcoming-details\">\n        <div class=\"upcoming-name\">").concat(name, "</div>\n        <div class=\"upcoming-time\">").concat(timeStr, "</div>\n      </div>\n    </div>"));
    });
    htmlParts.push("</div>");
    container.innerHTML = htmlParts.join("");
}
// 1. Safe Environment Variable Handling
// This prevents the "process is not defined" crash in the browser
var getApiBase = function () {
    if (typeof process !== "undefined" &&
        process.env &&
        process.env.REACT_APP_API_URL) {
        return process.env.REACT_APP_API_URL;
    }
    // Fallback to your production Render URL
    return "https://lorerealm-website.onrender.com";
};
var API_BASE = getApiBase();
function fetchCalendar() {
    return __awaiter(this, void 0, void 0, function () {
        var grid, res, text, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    grid = document.getElementById("calendar-grid");
                    if (!grid)
                        return [2 /*return*/];
                    grid.innerHTML = "<div class=\"cal-loading\">Consulting the stars\u2026</div>";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(API_BASE, "/api/streams"), {
                            method: "GET",
                            headers: {
                                Accept: "text/calendar, text/plain"
                            }
                        })];
                case 2:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.text()];
                case 3:
                    text = _a.sent();
                    if (!text.includes("BEGIN:VCALENDAR")) {
                        throw new Error("Invalid iCal data received from backend");
                    }
                    calEvents = expandCalEvents(parseICal(text), new Date(calYear - 1, 0, 1), new Date(calYear + 2, 0, 1));
                    renderCalendar();
                    renderUpcoming();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error("Backend calendar fetch failed:", err_1);
                    grid.innerHTML = "<div class=\"cal-error\">The stars are silent. (Check backend connection)</div>";
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function initCalendar() {
    var _a, _b;
    if (!document.getElementById("calendar-grid"))
        return;
    var now = new Date();
    calYear = now.getFullYear();
    calMonth = now.getMonth();
    (_a = document.getElementById("cal-prev")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        if (--calMonth < 0) {
            calMonth = 11;
            calYear--;
        }
        renderCalendar();
    });
    (_b = document.getElementById("cal-next")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        if (++calMonth > 11) {
            calMonth = 0;
            calYear++;
        }
        renderCalendar();
    });
    void fetchCalendar();
}
window.initDarkMode = initDarkMode;
window.initToggleTab = initToggleTab;
window.initCalendar = initCalendar;
window.initDepartureLinks = initDepartureLinks;
window.initHeroPoints = initHeroPoints;
window.initRolling = initRolling;
window.reinitLoreRealm = function () {
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
window.addEventListener("load", function () {
    var diceOverlaySeen = sessionStorage.getItem("lore-dice-seen");
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
