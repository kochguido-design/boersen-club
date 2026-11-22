// Börsen-Club – Server (Google Apps Script, an eine Google-Tabelle gebunden).
// In Apps Script als Datei „Code.gs“ einfügen. Anleitung: Einrichtung.md (liegt nicht im Repo).
// Enthält keine Passwörter oder Namen: Die stehen nur in der Tabelle (Blätter „Einstellungen“ und „Kinder“).
// Läuft auch im Browser (Demo-Modus, skript/demo.js stellt dann SpreadsheetApp & Co. nach).

var BC_VERSION = 1;
var ZONE = "Europe/Berlin";
var KURS_CACHE_SEK = 600;          // Kurse höchstens alle 10 Minuten neu holen
var MAX_STUECK = 10000;
var PIN_VERSUCHE = 5;              // danach 15 Minuten Sperre

var BLAETTER = {
  Einstellungen: ["Einstellung", "Wert", "Erklärung"],
  Kinder: ["Name", "PIN", "Emoji", "Farbe", "Startgeld", "Aktiv", "Seit"],
  Aktien: ["ID", "Name", "Emoji", "Yahoo", "Google", "Land", "Art", "Aktiv", "GF Kurs", "GF Währung", "GF Vortag"],
  Kurse: ["ID", "Kurs €", "Vortag €", "Kurs", "Währung", "Zeit", "Quelle"],
  Handel: ["Zeit", "Kind", "Art", "ID", "Stück", "Kurs €", "Gebühr €", "Betrag €"],
  Lernen: ["Zeit", "Kind", "Lektion", "Sterne", "Von"],
  Verlauf: ["Datum", "Kind", "Depotwert €", "Bargeld €"]
};

var EINSTELLUNGEN = [
  ["Passwort", "", "Familien-Passwort für die App. Groß/klein und Leerzeichen sind egal."],
  ["Startgeld", 1000, "Spielgeld in € für jedes neue Kind (pro Kind im Blatt „Kinder“ änderbar)."],
  ["Gebühr", 1, "Gebühr in € pro Kauf oder Verkauf."],
  ["Handel ab Lektion", "musterdepot", "Handeln geht erst, wenn diese Lektion geschafft ist. Leer = sofort."]
];

// ID, Name, Emoji, Yahoo-Kürzel, GOOGLEFINANCE-Kürzel, Land, Art
var AKTIEN_START = [
  ["ADS", "Adidas", "👟", "ADS.DE", "ETR:ADS", "Deutschland", "Aktie"],
  ["PUM", "Puma", "🐆", "PUM.DE", "ETR:PUM", "Deutschland", "Aktie"],
  ["BEI", "Beiersdorf (Nivea)", "🧴", "BEI.DE", "ETR:BEI", "Deutschland", "Aktie"],
  ["BMW", "BMW", "🚗", "BMW.DE", "ETR:BMW", "Deutschland", "Aktie"],
  ["MBG", "Mercedes-Benz", "⭐", "MBG.DE", "ETR:MBG", "Deutschland", "Aktie"],
  ["VOW3", "Volkswagen", "🚙", "VOW3.DE", "ETR:VOW3", "Deutschland", "Aktie"],
  ["P911", "Porsche", "🏎️", "P911.DE", "ETR:P911", "Deutschland", "Aktie"],
  ["SAP", "SAP", "💻", "SAP.DE", "ETR:SAP", "Deutschland", "Aktie"],
  ["SIE", "Siemens", "⚙️", "SIE.DE", "ETR:SIE", "Deutschland", "Aktie"],
  ["DTE", "Deutsche Telekom", "📱", "DTE.DE", "ETR:DTE", "Deutschland", "Aktie"],
  ["ALV", "Allianz", "🛡️", "ALV.DE", "ETR:ALV", "Deutschland", "Aktie"],
  ["DHL", "DHL Group", "📦", "DHL.DE", "ETR:DHL", "Deutschland", "Aktie"],
  ["LHA", "Lufthansa", "✈️", "LHA.DE", "ETR:LHA", "Deutschland", "Aktie"],
  ["ZAL", "Zalando", "🛍️", "ZAL.DE", "ETR:ZAL", "Deutschland", "Aktie"],
  ["HLAG", "Hapag-Lloyd", "🚢", "HLAG.DE", "ETR:HLAG", "Deutschland", "Aktie"],
  ["FIE", "Fielmann", "👓", "FIE.DE", "ETR:FIE", "Deutschland", "Aktie"],
  ["AAPL", "Apple", "🍎", "AAPL", "NASDAQ:AAPL", "USA", "Aktie"],
  ["MSFT", "Microsoft", "🪟", "MSFT", "NASDAQ:MSFT", "USA", "Aktie"],
  ["GOOGL", "Alphabet (Google)", "🔍", "GOOGL", "NASDAQ:GOOGL", "USA", "Aktie"],
  ["AMZN", "Amazon", "🛒", "AMZN", "NASDAQ:AMZN", "USA", "Aktie"],
  ["NVDA", "Nvidia", "🧠", "NVDA", "NASDAQ:NVDA", "USA", "Aktie"],
  ["TSLA", "Tesla", "⚡", "TSLA", "NASDAQ:TSLA", "USA", "Aktie"],
  ["NFLX", "Netflix", "🎬", "NFLX", "NASDAQ:NFLX", "USA", "Aktie"],
  ["DIS", "Disney", "🏰", "DIS", "NYSE:DIS", "USA", "Aktie"],
  ["KO", "Coca-Cola", "🥤", "KO", "NYSE:KO", "USA", "Aktie"],
  ["MCD", "McDonald's", "🍟", "MCD", "NYSE:MCD", "USA", "Aktie"],
  ["NKE", "Nike", "🏀", "NKE", "NYSE:NKE", "USA", "Aktie"],
  ["MAT", "Mattel (Barbie)", "🧸", "MAT", "NASDAQ:MAT", "USA", "Aktie"],
  ["HAS", "Hasbro (Monopoly)", "🎲", "HAS", "NASDAQ:HAS", "USA", "Aktie"],
  ["RBLX", "Roblox", "🧱", "RBLX", "NYSE:RBLX", "USA", "Aktie"],
  ["SPOT", "Spotify", "🎧", "SPOT", "NYSE:SPOT", "Schweden", "Aktie"],
  ["RACE", "Ferrari", "🐎", "RACE", "NYSE:RACE", "Italien", "Aktie"],
  ["NESN", "Nestlé", "🍫", "NESN.SW", "SWX:NESN", "Schweiz", "Aktie"],
  ["NTDO", "Nintendo", "🍄", "7974.T", "TYO:7974", "Japan", "Aktie"],
  ["SONY", "Sony", "🎮", "6758.T", "TYO:6758", "Japan", "Aktie"],
  ["EUNL", "ETF MSCI World", "🌍", "EUNL.DE", "ETR:EUNL", "Welt", "ETF"],
  ["EXS1", "ETF DAX", "🇩🇪", "EXS1.DE", "ETR:EXS1", "Deutschland", "ETF"]
];

var DEVISEN = { USD: "EURUSD=X", JPY: "EURJPY=X", CHF: "EURCHF=X", GBP: "EURGBP=X", DKK: "EURDKK=X", SEK: "EURSEK=X" };

// ---------- Web-App ----------

function doGet() {
  return antwort({ ok: true, info: "Börsen-Club-Server läuft", version: BC_VERSION });
}

function doPost(e) {
  var d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return antwort({ ok: false, fehler: "Anfrage nicht lesbar" }); }
  try {
    var einst = einstellungen();
    if (!einst.Passwort) return antwort({ ok: false, fehler: "Im Blatt „Einstellungen“ ist noch kein Passwort eingetragen." });
    if (norm(d.passwort) !== norm(einst.Passwort)) return antwort({ ok: false, fehler: "passwort", text: "Das Familien-Passwort stimmt nicht." });
    var a = d.aktion;
    if (a === "anmelden") return antwort({ ok: true, kinder: kinderListe().map(function (k) { return { name: k.name, emoji: k.emoji, farbe: k.farbe }; }) });
    if (a === "stand") return antwort(stand(einst));
    if (a === "verlauf") return antwort(kursVerlauf(String(d.id || ""), String(d.zeitraum || "1mo")));
    // ab hier nur mit PIN
    var kind = pinPruefen(d.kind, d.pin);
    if (a === "pin") return antwort({ ok: true });
    if (a === "handeln") return antwort(handeln(einst, kind, d));
    if (a === "lektion") return antwort(lektionSpeichern(einst, kind, d));
    return antwort({ ok: false, fehler: "Unbekannte Aktion" });
  } catch (err) {
    return antwort({ ok: false, fehler: err && err.nutzer ? "nutzer" : "server", pin: !!(err && err.pin), text: err && err.nutzer ? err.message : "Server-Fehler: " + (err && err.message ? err.message : err) });
  }
}

function antwort(objekt) {
  return ContentService.createTextOutput(JSON.stringify(objekt)).setMimeType(ContentService.MimeType.JSON);
}

function nutzerFehler(text) { var e = new Error(text); e.nutzer = true; return e; }
function norm(s) { return String(s == null ? "" : s).toLowerCase().replace(/\s+/g, ""); }
function runden(x) { return Math.round(x * 100) / 100; }
function jetzt() { return Utilities.formatDate(new Date(), ZONE, "yyyy-MM-dd HH:mm:ss"); }
function heute() { return Utilities.formatDate(new Date(), ZONE, "yyyy-MM-dd"); }
function alsText(v) {
  if (v instanceof Date) return Utilities.formatDate(v, ZONE, "yyyy-MM-dd HH:mm:ss");
  return String(v == null ? "" : v);
}

// ---------- Tabelle ----------

function tabelle() {
  var id = PropertiesService.getScriptProperties().getProperty("TABELLE");
  if (id) return SpreadsheetApp.openById(id);
  return SpreadsheetApp.getActiveSpreadsheet();
}

function blatt(name) {
  var t = tabelle();
  var b = t.getSheetByName(name);
  if (!b) {
    b = t.insertSheet(name);
    b.getRange(1, 1, 1, BLAETTER[name].length).setValues([BLAETTER[name]]);
    b.setFrozenRows(1);
  }
  return b;
}

function zeilen(name) {
  var b = blatt(name);
  if (b.getLastRow() < 2) return [];
  return b.getRange(2, 1, b.getLastRow() - 1, BLAETTER[name].length).getValues();
}

function einstellungen() {
  var e = {};
  zeilen("Einstellungen").forEach(function (z) { if (z[0]) e[String(z[0])] = z[1]; });
  if (e.Startgeld === "" || e.Startgeld == null) e.Startgeld = 1000;
  if (e["Gebühr"] === "" || e["Gebühr"] == null) e["Gebühr"] = 1;
  if (e["Handel ab Lektion"] == null) e["Handel ab Lektion"] = "musterdepot";
  return e;
}

function kinderListe() {
  var einst = einstellungen();
  return zeilen("Kinder").filter(function (z) {
    return String(z[0]).trim() && String(z[5]).toLowerCase() !== "nein";
  }).map(function (z) {
    return { name: String(z[0]).trim(), pin: String(z[1]).trim(), emoji: String(z[2] || "🙂"), farbe: String(z[3] || ""),
      startgeld: Number(z[4]) || Number(einst.Startgeld) || 1000, seit: alsText(z[6]).slice(0, 10) };
  });
}

function pinGleich(a, b) {
  a = String(a == null ? "" : a).trim(); b = String(b == null ? "" : b).trim();
  if (!a || !b) return false;
  return a === b || (/^\d+$/.test(a) && /^\d+$/.test(b) && Number(a) === Number(b)); // 0123 in der Tabelle als 123
}

function pinPruefen(name, pin) {
  var kind = null;
  kinderListe().forEach(function (k) { if (k.name === name) kind = k; });
  if (!kind) throw nutzerFehler("Dieses Kind gibt es nicht im Club.");
  var cache = CacheService.getScriptCache();
  var schluessel = "pinfehl_" + kind.name;
  var fehl = Number(cache.get(schluessel) || 0);
  if (fehl >= PIN_VERSUCHE) throw nutzerFehler("Zu viele falsche PINs. Warte 15 Minuten.");
  if (!kind.pin || !pinGleich(pin, kind.pin)) {
    cache.put(schluessel, String(fehl + 1), 900);
    var e = nutzerFehler("Die PIN stimmt nicht.");
    e.pin = true;
    throw e;
  }
  cache.remove(schluessel);
  return kind;
}

// ---------- Kurse ----------

function aktienListe() {
  return zeilen("Aktien").filter(function (z) { return String(z[0]).trim() && String(z[7]).toLowerCase() !== "nein"; })
    .map(function (z) {
      return { id: String(z[0]).trim(), name: String(z[1]), emoji: String(z[2] || ""), yahoo: String(z[3] || ""), google: String(z[4] || ""),
        land: String(z[5] || ""), art: String(z[6] || "Aktie"), gfKurs: z[8], gfWaehrung: z[9], gfVortag: z[10] };
    });
}

function yahooHolen(symbole, zeitraum, intervall) {
  var anfragen = symbole.map(function (s) {
    return { url: "https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(s) + "?range=" + zeitraum + "&interval=" + intervall,
      muteHttpExceptions: true, headers: { "User-Agent": "Mozilla/5.0" } };
  });
  var ergebnis = {};
  var antworten;
  try { antworten = UrlFetchApp.fetchAll(anfragen); } catch (e) { return ergebnis; }
  antworten.forEach(function (r, i) {
    try {
      if (r.getResponseCode() !== 200) return;
      var d = JSON.parse(r.getContentText()).chart.result[0];
      ergebnis[symbole[i]] = d;
    } catch (e) { }
  });
  return ergebnis;
}

// Liefert { id: {kurs, vortag, original, waehrung, zeit, quelle} } in Euro.
function kurse() {
  var cache = CacheService.getScriptCache();
  var gecacht = cache.get("kurse");
  if (gecacht) return JSON.parse(gecacht);

  var liste = aktienListe();
  var alt = {};
  zeilen("Kurse").forEach(function (z) {
    alt[String(z[0])] = { kurs: Number(z[1]), vortag: Number(z[2]), original: Number(z[3]), waehrung: String(z[4]), zeit: alsText(z[5]), quelle: String(z[6]) };
  });

  var symbole = liste.map(function (a) { return a.yahoo; }).filter(function (s) { return s; });
  var waehrungen = {};
  Object.keys(DEVISEN).forEach(function (w) { symbole.push(DEVISEN[w]); });
  var y = yahooHolen(symbole, "1d", "1d");
  Object.keys(DEVISEN).forEach(function (w) {
    var d = y[DEVISEN[w]];
    if (d && d.meta && d.meta.regularMarketPrice) waehrungen[w] = d.meta.regularMarketPrice;
  });
  waehrungen.EUR = 1;
  var gfDevisen = gfDevisenLesen();
  Object.keys(gfDevisen).forEach(function (w) { if (!waehrungen[w]) waehrungen[w] = gfDevisen[w]; });

  var neu = {};
  liste.forEach(function (a) {
    var d = y[a.yahoo];
    var k = null;
    if (d && d.meta && d.meta.regularMarketPrice) {
      var w = d.meta.currency;
      var faktor = w === "GBp" ? 100 * waehrungen.GBP : waehrungen[w];
      if (faktor) {
        k = { original: d.meta.regularMarketPrice, waehrung: w, kurs: d.meta.regularMarketPrice / faktor,
          vortag: (d.meta.chartPreviousClose || d.meta.previousClose || d.meta.regularMarketPrice) / faktor,
          zeit: Utilities.formatDate(new Date(d.meta.regularMarketTime * 1000), ZONE, "yyyy-MM-dd HH:mm"), quelle: "Yahoo" };
      }
    }
    if (!k && typeof a.gfKurs === "number" && a.gfKurs > 0) {
      var f2 = waehrungen[String(a.gfWaehrung)] || (String(a.gfWaehrung) === "EUR" ? 1 : 0);
      if (f2) k = { original: a.gfKurs, waehrung: String(a.gfWaehrung), kurs: a.gfKurs / f2, vortag: (Number(a.gfVortag) || a.gfKurs) / f2,
        zeit: Utilities.formatDate(new Date(), ZONE, "yyyy-MM-dd HH:mm"), quelle: "Google" };
    }
    if (!k && alt[a.id] && alt[a.id].kurs > 0) { k = alt[a.id]; k.quelle = "alt"; }
    if (k) {
      k.kurs = Math.round(k.kurs * 1000) / 1000;
      k.vortag = Math.round(k.vortag * 1000) / 1000;
      neu[a.id] = k;
    }
  });

  // letzten guten Stand sichern
  var b = blatt("Kurse");
  var werte = Object.keys(neu).map(function (id) { var k = neu[id]; return [id, k.kurs, k.vortag, k.original, k.waehrung, k.zeit, k.quelle]; });
  if (b.getLastRow() > 1) b.getRange(2, 1, b.getLastRow() - 1, 7).clearContent();
  if (werte.length) b.getRange(2, 1, werte.length, 7).setValues(werte);

  cache.put("kurse", JSON.stringify(neu), KURS_CACHE_SEK);
  return neu;
}

function gfDevisenLesen() {
  var t = tabelle().getSheetByName("Devisen");
  var e = {};
  if (!t || t.getLastRow() < 2) return e;
  t.getRange(2, 1, t.getLastRow() - 1, 2).getValues().forEach(function (z) {
    if (z[0] && typeof z[1] === "number" && z[1] > 0) e[String(z[0])] = z[1];
  });
  return e;
}

function kursVerlauf(id, zeitraum) {
  var erlaubt = { "5d": "30m", "1mo": "1d", "6mo": "1d", "1y": "1d", "5y": "1wk" };
  if (!erlaubt[zeitraum]) zeitraum = "1mo";
  var cache = CacheService.getScriptCache();
  var sch = "verlauf_" + id + "_" + zeitraum;
  var g = cache.get(sch);
  if (g) return JSON.parse(g);
  var aktie = null;
  aktienListe().forEach(function (a) { if (a.id === id) aktie = a; });
  if (!aktie) return { ok: false, text: "Unbekannte Aktie" };
  var y = yahooHolen([aktie.yahoo], zeitraum, erlaubt[zeitraum])[aktie.yahoo];
  if (!y || !y.timestamp) return { ok: false, text: "Kein Kursverlauf verfügbar" };
  var k = kurse()[id];
  var faktor = k && k.original ? k.original / k.kurs : 1; // mit heutigem Wechselkurs umgerechnet
  var schluss = y.indicators.quote[0].close;
  var punkte = [];
  y.timestamp.forEach(function (t, i) {
    if (schluss[i] != null) punkte.push([t, Math.round(schluss[i] / faktor * 100) / 100]);
  });
  var r = { ok: true, id: id, zeitraum: zeitraum, punkte: punkte };
  cache.put(sch, JSON.stringify(r), 3600);
  return r;
}

// ---------- Depots ----------

function depotsBerechnen(kinder, handel, kurs) {
  var depots = {};
  kinder.forEach(function (k) {
    depots[k.name] = { name: k.name, emoji: k.emoji, farbe: k.farbe, startgeld: k.startgeld, seit: k.seit,
      bargeld: k.startgeld, positionen: {}, gebuehren: 0, realisiert: 0, anzahlHandel: 0 };
  });
  handel.forEach(function (h) {
    var d = depots[h.kind];
    if (!d) return;
    var p = d.positionen[h.id] || (d.positionen[h.id] = { id: h.id, stueck: 0, kosten: 0 });
    d.gebuehren += h.gebuehr;
    d.anzahlHandel++;
    if (h.art === "Kauf") {
      d.bargeld -= h.stueck * h.kurs + h.gebuehr;
      p.stueck += h.stueck;
      p.kosten += h.stueck * h.kurs;
    } else {
      var schnitt = p.stueck ? p.kosten / p.stueck : 0;
      d.bargeld += h.stueck * h.kurs - h.gebuehr;
      d.realisiert += (h.kurs - schnitt) * h.stueck;
      p.kosten -= schnitt * h.stueck;
      p.stueck -= h.stueck;
    }
  });
  Object.keys(depots).forEach(function (n) {
    var d = depots[n];
    var liste = [];
    var wert = 0;
    Object.keys(d.positionen).forEach(function (id) {
      var p = d.positionen[id];
      if (p.stueck <= 0) return;
      var aktuell = kurs[id] ? kurs[id].kurs : p.kosten / p.stueck;
      var w = p.stueck * aktuell;
      wert += w;
      liste.push({ id: id, stueck: p.stueck, einstand: runden(p.kosten / p.stueck), kurs: aktuell, wert: runden(w),
        plus: runden(w - p.kosten), plusProzent: p.kosten ? Math.round((w / p.kosten - 1) * 1000) / 10 : 0 });
    });
    liste.sort(function (a, b) { return b.wert - a.wert; });
    d.positionen = liste;
    d.bargeld = runden(d.bargeld);
    d.aktienwert = runden(wert);
    d.wert = runden(d.bargeld + wert);
    d.plus = runden(d.wert - d.startgeld);
    d.plusProzent = Math.round((d.wert / d.startgeld - 1) * 1000) / 10;
    d.gebuehren = runden(d.gebuehren);
    d.realisiert = runden(d.realisiert);
  });
  return depots;
}

function handelListe() {
  return zeilen("Handel").filter(function (z) { return z[1]; }).map(function (z) {
    return { zeit: alsText(z[0]), kind: String(z[1]), art: String(z[2]), id: String(z[3]), stueck: Number(z[4]), kurs: Number(z[5]), gebuehr: Number(z[6]), betrag: Number(z[7]) };
  });
}

function lernListe() {
  return zeilen("Lernen").filter(function (z) { return z[1]; }).map(function (z) {
    return { zeit: alsText(z[0]), kind: String(z[1]), lektion: String(z[2]), sterne: Number(z[3]) || 0, von: Number(z[4]) || 0 };
  });
}

function stand(einst) {
  var kinder = kinderListe();
  var kurs = kurse();
  var handel = handelListe();
  var depots = depotsBerechnen(kinder, handel, kurs);
  var lernen = lernListe();
  var ab = String(einst["Handel ab Lektion"] || "");
  kinder.forEach(function (k) {
    var d = depots[k.name];
    d.lektionen = {};
    lernen.forEach(function (l) {
      if (l.kind !== k.name) return;
      var alt = d.lektionen[l.lektion];
      if (!alt || l.sterne > alt.sterne) d.lektionen[l.lektion] = { sterne: l.sterne, von: l.von, zeit: l.zeit.slice(0, 10) };
    });
    d.sterne = 0;
    Object.keys(d.lektionen).forEach(function (id) { d.sterne += d.lektionen[id].sterne; });
    d.handelFrei = !ab || !!d.lektionen[ab];
  });
  var aktien = aktienListe().map(function (a) {
    var k = kurs[a.id] || {};
    return { id: a.id, name: a.name, emoji: a.emoji, land: a.land, art: a.art, kurs: k.kurs || null, vortag: k.vortag || null,
      original: k.original || null, waehrung: k.waehrung || "", zeit: k.zeit || "", quelle: k.quelle || "" };
  });
  var grenze = Utilities.formatDate(new Date(Date.now() - 400 * 864e5), ZONE, "yyyy-MM-dd");
  var verlauf = zeilen("Verlauf").filter(function (z) { return z[1] && alsText(z[0]).slice(0, 10) >= grenze; })
    .map(function (z) { return [alsText(z[0]).slice(0, 10), String(z[1]), Number(z[2])]; });
  return { ok: true, zeit: jetzt(), gebuehr: Number(einst["Gebühr"]), handelAb: ab,
    depots: kinder.map(function (k) { return depots[k.name]; }), aktien: aktien,
    handel: handel.slice(-60).reverse(), verlauf: verlauf };
}

function handeln(einst, kind, d) {
  var art = d.art === "verkauf" ? "Verkauf" : d.art === "kauf" ? "Kauf" : null;
  if (!art) throw nutzerFehler("Kauf oder Verkauf?");
  var stueck = Number(d.stueck);
  if (!(stueck >= 1) || Math.floor(stueck) !== stueck || stueck > MAX_STUECK) throw nutzerFehler("Bitte eine ganze Stückzahl ab 1 eingeben.");
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var st = stand(einst);
    var depot = null;
    st.depots.forEach(function (x) { if (x.name === kind.name) depot = x; });
    if (!depot.handelFrei) throw nutzerFehler("Handeln geht erst, wenn du die Lektion „Dein Musterdepot“ geschafft hast.");
    var aktie = null;
    st.aktien.forEach(function (a) { if (a.id === d.id) aktie = a; });
    if (!aktie) throw nutzerFehler("Diese Aktie gibt es im Club nicht.");
    if (!aktie.kurs) throw nutzerFehler("Für " + aktie.name + " gibt es gerade keinen Kurs. Versuch es später nochmal.");
    var gebuehr = Number(einst["Gebühr"]) || 0;
    var betrag = runden(stueck * aktie.kurs);
    if (art === "Kauf") {
      if (betrag + gebuehr > depot.bargeld + 0.001) throw nutzerFehler("Dafür reicht dein Bargeld nicht: " + euro(betrag + gebuehr) + " nötig, du hast " + euro(depot.bargeld) + ".");
    } else {
      var hat = 0;
      depot.positionen.forEach(function (p) { if (p.id === aktie.id) hat = p.stueck; });
      if (stueck > hat) throw nutzerFehler("Du hast nur " + hat + " Stück von " + aktie.name + ".");
    }
    blatt("Handel").appendRow([jetzt(), kind.name, art, aktie.id, stueck, aktie.kurs, gebuehr, betrag]);
    var neu = stand(einst);
    neu.erledigt = { art: art, id: aktie.id, name: aktie.name, stueck: stueck, kurs: aktie.kurs, betrag: betrag, gebuehr: gebuehr };
    return neu;
  } finally {
    lock.releaseLock();
  }
}

function euro(x) { return (Math.round(x * 100) / 100).toFixed(2).replace(".", ",") + " €"; }

function lektionSpeichern(einst, kind, d) {
  var id = String(d.lektion || "").replace(/[^a-z0-9\-]/gi, "").slice(0, 40);
  if (!id) throw nutzerFehler("Lektion fehlt.");
  var sterne = Math.max(0, Math.min(50, Math.round(Number(d.sterne) || 0)));
  var von = Math.max(0, Math.min(50, Math.round(Number(d.von) || 0)));
  blatt("Lernen").appendRow([jetzt(), kind.name, id, sterne, von]);
  return stand(einst);
}

// ---------- Einrichten und Zeitsteuerung (im Apps-Script-Editor ausführen) ----------

function einrichten() {
  var t = SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty("TABELLE", t.getId());
  Object.keys(BLAETTER).forEach(function (n) { blatt(n); });
  var e = blatt("Einstellungen");
  if (e.getLastRow() < 2) e.getRange(2, 1, EINSTELLUNGEN.length, 3).setValues(EINSTELLUNGEN);
  var k = blatt("Kinder");
  if (k.getLastRow() < 2) {
    k.getRange(2, 1, 1, 7).setValues([["Name hier eintragen", "1234", "🙂", "", "", "ja", heute()]]);
  }
  var a = blatt("Aktien");
  if (a.getLastRow() < 2) {
    a.getRange(2, 1, AKTIEN_START.length, 7).setValues(AKTIEN_START);
    a.getRange(2, 8, AKTIEN_START.length, 1).setValues(AKTIEN_START.map(function () { return ["ja"]; }));
    var formeln = AKTIEN_START.map(function (z, i) {
      var r = i + 2;
      return ['=IFERROR(GOOGLEFINANCE(E' + r + ',"price"),"")', '=IFERROR(GOOGLEFINANCE(E' + r + ',"currency"),"")', '=IFERROR(GOOGLEFINANCE(E' + r + ',"closeyest"),"")'];
    });
    a.getRange(2, 9, formeln.length, 3).setFormulas(formeln);
  }
  var dv = t.getSheetByName("Devisen");
  if (!dv) {
    dv = t.insertSheet("Devisen");
    dv.getRange(1, 1, 1, 2).setValues([["Währung", "1 € ="]]);
    var ws = ["USD", "JPY", "CHF", "GBP", "DKK", "SEK"];
    dv.getRange(2, 1, ws.length, 2).setFormulas(ws.map(function (w) { return ['="' + w + '"', '=IFERROR(GOOGLEFINANCE("CURRENCY:EUR' + w + '"),"")']; }));
  }
  return "Eingerichtet";
}

function zeitsteuerungEinrichten() {
  ScriptApp.getProjectTriggers().forEach(function (tr) {
    if (tr.getHandlerFunction() === "tagesabschluss") ScriptApp.deleteTrigger(tr);
  });
  ScriptApp.newTrigger("tagesabschluss").timeBased().atHour(23).everyDays(1).inTimezone(ZONE).create();
  return "Täglich um 23 Uhr wird der Depotwert aller Kinder gespeichert.";
}

// Speichert einmal am Tag den Depotwert jedes Kindes (für die Club-Kurve).
function tagesabschluss() {
  CacheService.getScriptCache().remove("kurse");
  var einst = einstellungen();
  var st = stand(einst);
  var tag = heute();
  var schon = {};
  zeilen("Verlauf").forEach(function (z) { if (alsText(z[0]).slice(0, 10) === tag) schon[String(z[1])] = true; });
  var b = blatt("Verlauf");
  st.depots.forEach(function (d) {
    if (!schon[d.name]) b.appendRow([tag, d.name, d.wert, d.bargeld]);
  });
}

// Zeigt im Protokoll, für welche Aktien es gerade keinen Kurs gibt.
function kursePruefen() {
  CacheService.getScriptCache().remove("kurse");
  var k = kurse();
  var fehlt = [];
  var quellen = {};
  aktienListe().forEach(function (a) {
    if (!k[a.id]) fehlt.push(a.id + " (" + a.yahoo + ")");
    else quellen[k[a.id].quelle] = (quellen[k[a.id].quelle] || 0) + 1;
  });
  var text = "Kurse: " + JSON.stringify(quellen) + (fehlt.length ? " – ohne Kurs: " + fehlt.join(", ") : " – alle da");
  Logger.log(text);
  return text;
}
