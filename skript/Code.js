// Börsen-Club – Server (Google Apps Script, an eine Google-Tabelle gebunden).
// In Apps Script als Datei „Code.gs“ einfügen. Anleitung: Einrichtung.md (liegt nicht im Repo).
// Enthält keine Passwörter oder Namen: Die stehen nur in der Tabelle (Blätter „Einstellungen“ und „Kinder“).
// Läuft auch im Browser (Demo-Modus, skript/demo.js stellt dann SpreadsheetApp & Co. nach).

var BC_VERSION = 3;
var ZONE = "Europe/Berlin";
var KURS_CACHE_SEK = 600;          // Kurse höchstens alle 10 Minuten neu holen
var MAX_STUECK = 10000;
var PIN_VERSUCHE = 5;              // danach 15 Minuten Sperre

var BLAETTER = {
  Einstellungen: ["Einstellung", "Wert", "Erklärung"],
  Kinder: ["Name", "PIN", "Emoji", "Farbe", "Startgeld", "Aktiv", "Seit", "Auffrischen"],
  Aktien: ["ID", "Name", "Emoji", "Yahoo", "Google", "Land", "Art", "Aktiv", "GF Kurs", "GF Währung", "GF Vortag"],
  Kurse: ["ID", "Kurs €", "Vortag €", "Kurs", "Währung", "Zeit", "Quelle"],
  Handel: ["Zeit", "Kind", "Art", "ID", "Stück", "Kurs €", "Gebühr €", "Betrag €"],
  Lernen: ["Zeit", "Kind", "Lektion", "Sterne", "Von", "Bestanden"],
  Verlauf: ["Datum", "Kind", "Depotwert €", "Bargeld €"],
  Antworten: ["Zeit", "Kind", "Quelle", "Lektion", "Frage", "Richtig", "Text"],
  Extras: ["ID", "Kind", "Titel", "Emoji", "Grund", "Inhalt", "Erstellt", "Erledigt", "Sterne", "Von"]
};

var EINSTELLUNGEN = [
  ["Passwort", "", "Familien-Passwort für die App. Groß/klein und Leerzeichen sind egal."],
  ["Startgeld", 1000, "Spielgeld in € für jedes neue Kind (pro Kind im Blatt „Kinder“ änderbar)."],
  ["Gebühr", 1, "Gebühr in € pro Kauf oder Verkauf."],
  ["Handel ab Lektion", "musterdepot", "Handeln geht erst, wenn diese Lektion geschafft ist. Leer = sofort."],
  ["Handel sofort für", "", "Diese Namen dürfen ohne Lektion sofort handeln, mit Komma getrennt (z. B. für Eltern). Leer = niemand."],
  ["Bestehen ab %", 60, "So viel Prozent der Quizfragen muss ein Kind beim ersten Versuch richtig haben, damit die nächste Lektion frei wird."],
  ["Wiederholen ab", 10, "Sind so viele Wiederholungsfragen fällig, wird erst wiederholt, bevor eine neue Lektion frei wird."],
  ["Extras pro Woche", 1, "So viele Zusatzlektionen darf die Wochenauswertung pro Kind und Woche anlegen. 0 = keine."],
  ["Bericht an", "", "E-Mail-Adresse für den Wochenbericht. Leer = an den Besitzer der Tabelle."]
];

var ORDNER_NAME = "Börsen-Club – Auswertung";

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
    if (a === "lernstand") return antwort(lernstand(einst, kind));
    if (a === "antworten") { antwortenSchreiben(kind, "wiederholung", "", d.antworten); return antwort(lernstand(einst, kind)); }
    if (a === "extra") return antwort(extraSpeichern(einst, kind, d));
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
  if (!(Number(e["Bestehen ab %"]) >= 0)) e["Bestehen ab %"] = 60;
  if (!(Number(e["Wiederholen ab"]) >= 1)) e["Wiederholen ab"] = 10;
  if (e["Extras pro Woche"] === "" || e["Extras pro Woche"] == null || !(Number(e["Extras pro Woche"]) >= 0)) e["Extras pro Woche"] = 1;
  return e;
}

function kinderListe() {
  var einst = einstellungen();
  return zeilen("Kinder").filter(function (z) {
    return String(z[0]).trim() && String(z[5]).toLowerCase() !== "nein";
  }).map(function (z) {
    return { name: String(z[0]).trim(), pin: String(z[1]).trim(), emoji: String(z[2] || "🙂"), farbe: String(z[3] || ""),
      startgeld: Number(z[4]) || Number(einst.Startgeld) || 1000, seit: alsText(z[6]).slice(0, 10), auffrischen: Math.round(Number(z[7]) || 0) };
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
    return { zeit: alsText(z[0]), kind: String(z[1]), lektion: String(z[2]), sterne: Number(z[3]) || 0, von: Number(z[4]) || 0, bestanden: String(z[5] || "") };
  });
}

function stand(einst) {
  var kinder = kinderListe();
  var kurs = kurse();
  var handel = handelListe();
  var depots = depotsBerechnen(kinder, handel, kurs);
  var lernen = lernListe();
  var ab = String(einst["Handel ab Lektion"] || "");
  var sofort = {};
  String(einst["Handel sofort für"] || "").split(",").forEach(function (n) { n = n.trim().toLowerCase(); if (n) sofort[n] = true; });
  kinder.forEach(function (k) {
    var d = depots[k.name];
    d.lektionen = {};
    lernen.forEach(function (l) {
      if (l.kind !== k.name) return;
      var alt = d.lektionen[l.lektion];
      if (!alt) alt = d.lektionen[l.lektion] = { sterne: l.sterne, von: l.von, zeit: l.zeit.slice(0, 10), bestanden: false, versuche: 0 };
      else if (l.sterne > alt.sterne) { alt.sterne = l.sterne; alt.von = l.von; alt.zeit = l.zeit.slice(0, 10); }
      alt.versuche++;
      if (versuchBestanden(einst, l)) alt.bestanden = true;
    });
    d.sterne = 0;
    Object.keys(d.lektionen).forEach(function (id) { d.sterne += d.lektionen[id].sterne; });
    d.handelFrei = !ab || !!sofort[k.name.toLowerCase()] || !!(d.lektionen[ab] && d.lektionen[ab].bestanden);
  });
  var aktien = aktienListe().map(function (a) {
    var k = kurs[a.id] || {};
    return { id: a.id, name: a.name, emoji: a.emoji, land: a.land, art: a.art, kurs: k.kurs || null, vortag: k.vortag || null,
      original: k.original || null, waehrung: k.waehrung || "", zeit: k.zeit || "", quelle: k.quelle || "" };
  });
  var grenze = Utilities.formatDate(new Date(Date.now() - 400 * 864e5), ZONE, "yyyy-MM-dd");
  var verlauf = zeilen("Verlauf").filter(function (z) { return z[1] && alsText(z[0]).slice(0, 10) >= grenze; })
    .map(function (z) { return [alsText(z[0]).slice(0, 10), String(z[1]), Number(z[2])]; });
  return { ok: true, zeit: jetzt(), gebuehr: Number(einst["Gebühr"]), handelAb: ab, version: BC_VERSION,
    bestehenProzent: Number(einst["Bestehen ab %"]), wiederholenAb: Number(einst["Wiederholen ab"]),
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

// Mindestzahl Sterne für eine normale Lektion (z. B. 60 % von 6 Fragen = 4)
function sterneNoetig(einst, von) { return Math.ceil(Number(einst["Bestehen ab %"]) / 100 * von - 1e-9); }
function versuchBestanden(einst, l) {
  if (l.bestanden === "ja") return true;
  if (l.bestanden === "nein") return false;
  return l.von > 0 && l.sterne >= sterneNoetig(einst, l.von); // alte Zeilen ohne Spalte „Bestanden“
}

function lektionSpeichern(einst, kind, d) {
  var id = sauber(d.lektion, 40);
  if (!id) throw nutzerFehler("Lektion fehlt.");
  var sterne = Math.max(0, Math.min(50, Math.round(Number(d.sterne) || 0)));
  var von = Math.max(0, Math.min(50, Math.round(Number(d.von) || 0)));
  var best = d.bestanden === true ? "ja" : d.bestanden === false ? "nein" : (von > 0 && sterne >= sterneNoetig(einst, von) ? "ja" : "nein");
  blatt("Lernen").appendRow([jetzt(), kind.name, id, sterne, von, best]);
  antwortenSchreiben(kind, "lektion", id, d.antworten);
  var st = stand(einst);
  st.lernstand = lernstand(einst, kind);
  return st;
}

// ---------- Antworten, Wiederholung und Extras ----------
// Jede Quizantwort (nur der erste Versuch) landet im Blatt „Antworten“. Daraus rechnet der Server die
// Wiederholung wie ein Karteikasten: falsch → morgen wieder, danach richtig → in 3 Tagen, nochmal richtig → sitzt.
// Fragen, die lange nicht dran waren, kommen zum „Auffrischen“ (je Kind einstellbar, Spalte „Auffrischen“ im Blatt „Kinder“).

function sauber(s, n) { return String(s == null ? "" : s).replace(/[^a-z0-9\-#:_]/gi, "").slice(0, n); }
function alsZelle(t) { t = String(t == null ? "" : t).replace(/\s+/g, " ").trim(); return /^[=+\-@]/.test(t) ? "'" + t : t; }
function tagPlus(tag, n) {
  var t = String(tag).split("-");
  return new Date(Date.UTC(Number(t[0]), Number(t[1]) - 1, Number(t[2]) + n)).toISOString().slice(0, 10);
}

function antwortenSchreiben(kind, quelle, lektion, liste) {
  if (!liste || !liste.length) return;
  var erlaubt = { lektion: 1, wiederholung: 1, auffrischen: 1, extra: 1 };
  var zeit = jetzt();
  var reihen = liste.slice(0, 80).map(function (a) {
    a = a || {};
    return [zeit, kind.name, erlaubt[a.quelle] ? a.quelle : quelle, sauber(a.l || lektion, 50), sauber(a.k, 80), a.r ? "ja" : "nein", alsZelle(String(a.t || "").slice(0, 140))];
  }).filter(function (z) { return z[4]; });
  if (!reihen.length) return;
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var b = blatt("Antworten");
    b.getRange(b.getLastRow() + 1, 1, reihen.length, 7).setValues(reihen);
  } finally {
    lock.releaseLock();
  }
}

function antwortListe() {
  return zeilen("Antworten").filter(function (z) { return z[1] && z[4]; }).map(function (z) {
    return { zeit: alsText(z[0]), kind: String(z[1]), quelle: String(z[2]), lektion: String(z[3]), frage: String(z[4]), richtig: String(z[5]) === "ja", text: String(z[6] || "") };
  });
}

// Karteikasten je Frage. stufe -1 = immer gewusst, 0 = falsch (morgen wieder), 1 = einmal danach richtig (in 3 Tagen), 2 = sitzt wieder
function kastenBerechnen(antworten) {
  var box = {};
  antworten.forEach(function (a) {
    var tag = a.zeit.slice(0, 10), b = box[a.frage];
    if (!b) b = box[a.frage] = { stufe: -1, lektion: a.lektion, text: a.text, gefragt: 0, falsch: 0, zuletzt: tag, faellig: "" };
    b.gefragt++; b.zuletzt = tag; b.lektion = a.lektion;
    if (a.text) b.text = a.text;
    if (!a.richtig) { b.falsch++; b.stufe = 0; b.faellig = tagPlus(tag, 1); }
    else if (b.stufe === 0) { b.stufe = 1; b.faellig = tagPlus(tag, 3); }
    else if (b.stufe === 1) { b.stufe = 2; b.faellig = ""; }
  });
  return box;
}

function quote(liste) {
  if (!liste.length) return null;
  var r = 0;
  liste.forEach(function (x) { if (x.richtig) r++; });
  return Math.round(r / liste.length * 100);
}

// Wie viele alte Fragen pro Tag zum Auffrischen kommen: Wert aus dem Blatt „Kinder“, sonst nach Erfolgsquote
function auffrischenAnzahl(kind, antworten) {
  if (kind.auffrischen >= 1 && kind.auffrischen <= 8) return kind.auffrischen;
  var grenze = tagPlus(heute(), -30);
  var neu = antworten.filter(function (a) { return a.quelle !== "auffrischen" && a.zeit.slice(0, 10) >= grenze; });
  if (neu.length < 10) return 2;
  return quote(neu) < 70 ? 4 : 2;
}

function lernstand(einst, kind) {
  var tag = heute(), alt = tagPlus(tag, -7);
  var antworten = antwortListe().filter(function (a) { return a.kind === kind.name; });
  var box = kastenBerechnen(antworten);
  var wdh = [], kandidaten = [], heuteAufgefrischt = false;
  antworten.forEach(function (a) { if (a.quelle === "auffrischen" && a.zeit.slice(0, 10) === tag) heuteAufgefrischt = true; });
  Object.keys(box).forEach(function (k) {
    var b = box[k];
    if (b.stufe === 0 || b.stufe === 1) wdh.push({ k: k, l: b.lektion, f: b.faellig, s: b.stufe });
    else if (b.zuletzt <= alt) kandidaten.push({ k: k, z: b.zuletzt });
  });
  wdh.sort(function (a, b) { return a.f < b.f ? -1 : a.f > b.f ? 1 : a.k < b.k ? -1 : 1; });
  kandidaten.sort(function (a, b) { return a.z < b.z ? -1 : a.z > b.z ? 1 : a.k < b.k ? -1 : 1; });
  var n = auffrischenAnzahl(kind, antworten);
  return { ok: true, heute: tag, wdh: wdh, auffrischenAnzahl: n,
    auffrischen: heuteAufgefrischt ? [] : kandidaten.slice(0, n + 8).map(function (x) { return x.k; }),
    extras: extrasListe().filter(function (x) { return x.kind === kind.name; }).map(function (x) {
      var inhalt = {};
      try { inhalt = JSON.parse(x.inhalt); } catch (e) { inhalt = {}; }
      return { id: x.id, titel: x.titel, emoji: x.emoji, grund: x.grund, erstellt: x.erstellt.slice(0, 10), erledigt: x.erledigt.slice(0, 10), sterne: x.sterne, von: x.von,
        einleitung: inhalt.einleitung || "", karten: inhalt.karten || [], quiz: inhalt.quiz || [] };
    }).filter(function (x) { return x.quiz.length; }) };
}

function extrasListe() {
  return zeilen("Extras").filter(function (z) { return z[0] && z[1]; }).map(function (z) {
    return { id: String(z[0]), kind: String(z[1]), titel: String(z[2]), emoji: String(z[3] || "✨"), grund: String(z[4] || ""), inhalt: String(z[5] || "{}"),
      erstellt: alsText(z[6]), erledigt: alsText(z[7]), sterne: Number(z[8]) || 0, von: Number(z[9]) || 0 };
  });
}

function extraSpeichern(einst, kind, d) {
  var id = sauber(d.id, 30);
  var sterne = Math.max(0, Math.min(50, Math.round(Number(d.sterne) || 0)));
  var von = Math.max(0, Math.min(50, Math.round(Number(d.von) || 0)));
  var b = blatt("Extras"), z = zeilen("Extras");
  for (var i = 0; i < z.length; i++) {
    if (String(z[i][0]) === id && String(z[i][1]) === kind.name) {
      if (!z[i][7]) b.getRange(i + 2, 8).setValue(jetzt());
      if (sterne >= (Number(z[i][8]) || 0)) b.getRange(i + 2, 9, 1, 2).setValues([[sterne, von]]);
      break;
    }
  }
  antwortenSchreiben(kind, "extra", "extra-" + id, d.antworten);
  return lernstand(einst, kind);
}

// ---------- Wochenauswertung ----------
// Sonntag ab 16 Uhr: wochenExport legt alle Lerndaten als JSON in den Drive-Ordner „Börsen-Club – Auswertung“.
// Danach liest eine Claude-Routine die Datei und legt „Boersen-Club_Auswertung_<datum>.json“ daneben
// (Einschätzung je Kind, höchstens ein Extra pro Kind, Vorschläge). Sonntag ab 20 Uhr übernimmt wochenBericht
// die Extras und schickt den Bericht per Mail an Guido (Einstellung „Bericht an“, sonst Besitzer der Tabelle).

function auswertungsOrdner() {
  var p = PropertiesService.getScriptProperties(), id = p.getProperty("ORDNER");
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) { } }
  var it = DriveApp.getFoldersByName(ORDNER_NAME);
  var o = it.hasNext() ? it.next() : DriveApp.createFolder(ORDNER_NAME);
  p.setProperty("ORDNER", o.getId());
  return o;
}

function kinderStatistik(einst) {
  var st = stand(einst);
  var alle = antwortListe(), extras = extrasListe(), lernen = lernListe(), handel = handelListe();
  var tag = heute(), vor7 = tagPlus(tag, -6), vor14 = tagPlus(tag, -13);
  var kinder = {};
  kinderListe().forEach(function (k) { kinder[k.name] = k; });
  return st.depots.map(function (d) {
    var a = alle.filter(function (x) { return x.kind === d.name; });
    var box = kastenBerechnen(a);
    function seit(liste, grenze) { return liste.filter(function (x) { return x.zeit.slice(0, 10) >= grenze; }); }
    function von(q) { return a.filter(function (x) { return x.quelle === q; }); }
    var a7 = seit(a, vor7), lekt = von("lektion"), aufr = von("auffrischen"), wdh = von("wiederholung");
    var h = handel.filter(function (x) { return x.kind === d.name; });
    var l = lernen.filter(function (x) { return x.kind === d.name; });
    var tage = {}, letzte = "";
    a7.concat(seit(h, vor7)).concat(seit(l, vor7)).forEach(function (x) { tage[x.zeit.slice(0, 10)] = 1; });
    a.concat(h).concat(l).forEach(function (x) { if (x.zeit > letzte) letzte = x.zeit; });
    var offen = 0, faellig = 0, schwach = [];
    Object.keys(box).forEach(function (k) {
      var b = box[k];
      if (b.stufe === 0 || b.stufe === 1) { offen++; if (b.faellig <= tag) faellig++; }
      if (b.falsch) schwach.push({ frage: k, lektion: b.lektion, text: b.text, gefragt: b.gefragt, falsch: b.falsch, stufe: b.stufe, zuletzt: b.zuletzt });
    });
    schwach.sort(function (x, y) { return (y.stufe === 0 || y.stufe === 1 ? 1 : 0) - (x.stufe === 0 || x.stufe === 1 ? 1 : 0) || y.falsch - x.falsch; });
    var bestanden = 0;
    Object.keys(d.lektionen).forEach(function (id) { if (d.lektionen[id].bestanden) bestanden++; });
    var k = kinder[d.name] || {};
    return { name: d.name, seit: d.seit, auffrischenEinstellung: k.auffrischen || 0, auffrischenProTag: auffrischenAnzahl(k.name ? k : { auffrischen: 0 }, a),
      lektionenBestanden: bestanden, lektionen: d.lektionen,
      quoteLektionenGesamt: quote(lekt), quoteLektionenWoche: quote(seit(lekt, vor7)),
      quoteWiederholungWoche: quote(seit(wdh, vor7)), quoteAuffrischenGesamt: quote(aufr), quoteAuffrischenWoche: quote(seit(aufr, vor7)), quoteExtras: quote(von("extra")),
      antwortenWoche: a7.length, antwortenGesamt: a.length, aktiveTageWoche: Object.keys(tage).length, letzteAktivitaet: letzte,
      wiederholungOffen: offen, wiederholungFaellig: faellig,
      versuche: l.map(function (x) { return { zeit: x.zeit, lektion: x.lektion, sterne: x.sterne, von: x.von, bestanden: versuchBestanden(einst, x) }; }),
      schwacheFragen: schwach.slice(0, 40),
      antwortenLetzte14Tage: seit(a, vor14).map(function (x) { return { zeit: x.zeit, quelle: x.quelle, lektion: x.lektion, frage: x.frage, richtig: x.richtig, text: x.text }; }),
      extras: extras.filter(function (x) { return x.kind === d.name; }).map(function (x) { return { id: x.id, titel: x.titel, grund: x.grund, erstellt: x.erstellt, erledigt: x.erledigt, sterne: x.sterne, von: x.von }; }),
      depot: { wert: d.wert, plusProzent: d.plusProzent, bargeld: d.bargeld, positionen: d.positionen.length, handelGesamt: d.anzahlHandel, handelWoche: seit(h, vor7).length } };
  });
}

function wochenDaten() {
  var einst = einstellungen();
  return { art: "Börsen-Club Wochendaten", erstellt: jetzt(), bis: heute(), von: tagPlus(heute(), -6),
    einstellungen: { bestehenProzent: Number(einst["Bestehen ab %"]), wiederholenAb: Number(einst["Wiederholen ab"]), extrasProWoche: Number(einst["Extras pro Woche"]) },
    kinder: kinderStatistik(einst) };
}

function wochenExport() {
  var daten = wochenDaten();
  var name = "Boersen-Club_Wochendaten_" + heute() + ".json";
  var o = auswertungsOrdner();
  var alt = o.getFilesByName(name);
  while (alt.hasNext()) alt.next().setTrashed(true);
  o.createFile(name, JSON.stringify(daten, null, 1), "application/json");
  return name;
}

// Neueste Auswertung der letzten 2 Tage aus dem Ordner lesen
function auswertungLesen(tag) {
  var dateien = auswertungsOrdner().getFiles(), beste = null, vorne = "Boersen-Club_Auswertung_", grenze = tagPlus(tag, -2);
  while (dateien.hasNext()) {
    var f = dateien.next(), n = f.getName();
    if (n.indexOf(vorne) !== 0 || n.slice(vorne.length, vorne.length + 10) < grenze) continue;
    if (!beste || f.getDateCreated() > beste.getDateCreated()) beste = f;
  }
  if (!beste) return null;
  var text = beste.getBlob().getDataAsString("UTF-8");
  var a = text.indexOf("{"), b = text.lastIndexOf("}");
  try { return { id: beste.getId(), name: beste.getName(), daten: JSON.parse(text.slice(a, b + 1)) }; }
  catch (e) { return { id: beste.getId(), name: beste.getName(), daten: {}, fehler: "Die Auswertungsdatei ist kein gültiges JSON." }; }
}

function kurz(s, n) { return String(s == null ? "" : s).slice(0, n); }

// Prüft ein Extra von der Routine. Liefert den bereinigten Inhalt oder einen Fehlertext.
function extraPruefen(x) {
  if (!x || typeof x !== "object") return "kein Objekt";
  if (!x.titel || String(x.titel).length < 3) return "Titel fehlt";
  if (!(x.karten instanceof Array) || x.karten.length < 1 || x.karten.length > 8) return "1 bis 8 Karten nötig";
  if (!(x.quiz instanceof Array) || x.quiz.length < 3 || x.quiz.length > 12) return "3 bis 12 Quizfragen nötig";
  var karten = [], quiz = [], fehler = "";
  x.karten.forEach(function (k) {
    if (!k || !k.titel || !k.text) { fehler = "Karte ohne Titel oder Text"; return; }
    var neu = { titel: kurz(k.titel, 80), bild: kurz(k.bild || "💡", 8), text: kurz(k.text, 2500) };
    if (k.profi) neu.profi = kurz(k.profi, 1500);
    karten.push(neu);
  });
  x.quiz.forEach(function (f) {
    if (!f || !f.frage) { fehler = "Frage ohne Text"; return; }
    var neu = { frage: kurz(f.frage, 400), erklaerung: kurz(f.erklaerung || "", 800) };
    if (f.optionen instanceof Array) {
      var r = Number(f.richtig || 0);
      if (f.optionen.length < 2 || f.optionen.length > 5 || !(r >= 0 && r < f.optionen.length) || Math.floor(r) !== r) { fehler = "Antworten oder „richtig“ ungültig"; return; }
      neu.optionen = f.optionen.map(function (o) { return kurz(o, 200); });
      neu.richtig = r;
    } else if (typeof f.zahl === "number" && isFinite(f.zahl)) {
      neu.zahl = f.zahl;
      if (f.einheit) neu.einheit = kurz(f.einheit, 12);
    } else { fehler = "Frage ohne Antworten und ohne Zahl"; return; }
    quiz.push(neu);
  });
  if (fehler) return fehler;
  return { einleitung: kurz(x.einleitung || "", 600), karten: karten, quiz: quiz };
}

// Extras und Auffrisch-Anzahl aus der Auswertung übernehmen (jede Datei nur einmal)
function auswertungUebernehmen(einst, aus) {
  var p = PropertiesService.getScriptProperties(), schl = "IMPORT_" + aus.id, schon = p.getProperty(schl);
  if (schon) { try { return JSON.parse(schon); } catch (e) { } }
  var erg = { extras: [], tempo: [], fehler: [] };
  if (aus.fehler) erg.fehler.push(aus.fehler);
  var kinder = kinderListe(), namen = {};
  kinder.forEach(function (k) { namen[k.name] = k; });
  var max = Number(einst["Extras pro Woche"]);
  var grenze = tagPlus(heute(), -6), proKind = {};
  extrasListe().forEach(function (x) { if (x.erstellt.slice(0, 10) >= grenze) proKind[x.kind] = (proKind[x.kind] || 0) + 1; });
  var stempel = Utilities.formatDate(new Date(), ZONE, "yyyyMMddHHmm");
  (aus.daten.extras instanceof Array ? aus.daten.extras : []).forEach(function (x, i) {
    var kind = x && x.kind;
    if (!namen[kind]) { erg.fehler.push("Extra „" + kurz(x && x.titel, 60) + "“ für unbekanntes Kind übersprungen."); return; }
    if ((proKind[kind] || 0) >= max) { erg.fehler.push(kind + ": schon " + max + " Extra diese Woche, „" + kurz(x.titel, 60) + "“ übersprungen."); return; }
    var inhalt = extraPruefen(x);
    if (typeof inhalt === "string") { erg.fehler.push(kind + ": Extra „" + kurz(x.titel, 60) + "“ übersprungen (" + inhalt + ")."); return; }
    proKind[kind] = (proKind[kind] || 0) + 1;
    blatt("Extras").appendRow(["x" + stempel + i, kind, alsZelle(kurz(x.titel, 80)), kurz(x.emoji || "✨", 8), alsZelle(kurz(x.grund || "", 300)), JSON.stringify(inhalt), jetzt(), "", "", ""]);
    erg.extras.push({ kind: kind, titel: kurz(x.titel, 80), grund: kurz(x.grund || "", 300), fragen: inhalt.quiz.length });
  });
  var kb = blatt("Kinder"), kz = zeilen("Kinder");
  (aus.daten.kinder instanceof Array ? aus.daten.kinder : []).forEach(function (k) {
    var n = Math.round(Number(k && k.auffrischen));
    if (!k || !namen[k.name] || !(n >= 1 && n <= 8) || n === namen[k.name].auffrischen) return;
    for (var i = 0; i < kz.length; i++) if (String(kz[i][0]).trim() === k.name) { kb.getRange(i + 2, 8).setValue(n); break; }
    erg.tempo.push(k.name + ": " + (namen[k.name].auffrischen || "automatisch") + " → " + n + " Auffrisch-Fragen pro Tag");
  });
  p.setProperty(schl, JSON.stringify(erg).slice(0, 8000));
  return erg;
}

function html(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function absaetze(s) { return String(s || "").split(/\n+/).filter(function (x) { return x.trim(); }).map(function (x) { return "<p style=\"margin:0 0 8px\">" + html(x).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>") + "</p>"; }).join(""); }
function datumDe(tag) { var t = String(tag).slice(0, 10).split("-"); return t.length === 3 ? Number(t[2]) + "." + Number(t[1]) + "." + t[0] : ""; }
function prozentText(x) { return x == null ? "–" : x + " %"; }

function berichtHtml(stat, aus, imp, tag) {
  var a = (aus && aus.daten) || {}, ampel = { gruen: "🟢", gelb: "🟡", rot: "🔴" };
  var td = 'style="padding:6px 8px;border-bottom:1px solid #e5e7eb;text-align:left;vertical-align:top"';
  var h = '<div style="font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:760px;color:#111827;font-size:14px;line-height:1.45">' +
    '<h2 style="margin:0 0 4px">📈 Börsen-Club – Wochenbericht</h2><p style="margin:0 0 16px;color:#6b7280">Woche vom ' + datumDe(tagPlus(tag, -6)) + " bis " + datumDe(tag) + "</p>";
  if (a.einschaetzung) h += '<div style="background:#eff6ff;border-radius:10px;padding:12px 14px;margin-bottom:16px"><b>🧭 Claudes Einschätzung</b>' + absaetze(a.einschaetzung) + "</div>";
  else h += '<p style="background:#fef3c7;border-radius:10px;padding:10px 14px">Die Auswertung von Claude ist diesmal nicht angekommen' + (aus && aus.fehler ? " (" + html(aus.fehler) + ")" : "") + ". Unten stehen die Zahlen aus der Tabelle.</p>";
  h += '<table style="border-collapse:collapse;width:100%;font-size:13px"><tr style="background:#f3f4f6"><th ' + td + ">Kind</th><th " + td + ">Lektionen geschafft</th><th " + td +
    ">1. Versuch richtig (gesamt / Woche)</th><th " + td + ">Aktive Tage</th><th " + td + ">Antworten Woche</th><th " + td + ">Wiederholung offen (fällig)</th><th " + td + ">Auffrischen richtig</th><th " + td + ">Depot</th></tr>";
  stat.forEach(function (k) {
    h += "<tr><td " + td + "><b>" + html(k.name) + "</b><br><span style=\"color:#6b7280\">zuletzt " + (k.letzteAktivitaet ? datumDe(k.letzteAktivitaet) : "noch nie") + "</span></td><td " + td + ">" + k.lektionenBestanden +
      "</td><td " + td + ">" + prozentText(k.quoteLektionenGesamt) + " / " + prozentText(k.quoteLektionenWoche) + "</td><td " + td + ">" + k.aktiveTageWoche + " von 7</td><td " + td + ">" + k.antwortenWoche +
      "</td><td " + td + ">" + k.wiederholungOffen + " (" + k.wiederholungFaellig + ")</td><td " + td + ">" + prozentText(k.quoteAuffrischenWoche) + "</td><td " + td + ">" +
      (k.depot.plusProzent > 0 ? "+" : "") + String(k.depot.plusProzent).replace(".", ",") + " %<br><span style=\"color:#6b7280\">" + k.depot.handelWoche + " Orders</span></td></tr>";
  });
  h += "</table>";
  (a.kinder instanceof Array ? a.kinder : []).forEach(function (k) {
    if (!k || !k.name) return;
    h += '<h3 style="margin:18px 0 6px">' + (ampel[k.ampel] || "⚪") + " " + html(k.name) + "</h3>";
    [["stand", "Wo steht " + k.name], ["staerken", "Stärken"], ["schwaechen", "Lücken"], ["tempo", "Tempo"], ["naechsteSchritte", "Was als Nächstes"]].forEach(function (f) {
      if (k[f[0]]) h += '<p style="margin:0 0 6px"><b>' + html(f[1]) + ":</b> " + html(k[f[0]]) + "</p>";
    });
  });
  if (imp.extras.length || imp.tempo.length || imp.fehler.length) {
    h += '<h3 style="margin:18px 0 6px">✨ Automatisch angepasst</h3><ul style="margin:0;padding-left:20px">';
    imp.extras.forEach(function (x) { h += "<li><b>" + html(x.kind) + "</b> bekommt das Extra „" + html(x.titel) + "“ (" + x.fragen + " Fragen)" + (x.grund ? ": " + html(x.grund) : "") + "</li>"; });
    imp.tempo.forEach(function (x) { h += "<li>" + html(x) + "</li>"; });
    imp.fehler.forEach(function (x) { h += '<li style="color:#b45309">' + html(x) + "</li>"; });
    h += "</ul>";
  }
  var vor = a.inhaltsVorschlaege instanceof Array ? a.inhaltsVorschlaege : [];
  if (vor.length) {
    h += '<h3 style="margin:18px 0 6px">📝 Vorschläge für die Lektionen</h3><ol style="margin:0;padding-left:20px">' + vor.map(function (v) { return "<li>" + html(v) + "</li>"; }).join("") + "</ol>" +
      '<p style="color:#6b7280">Umgesetzt wird nur, was du freigibst. Sag in Claude zum Beispiel: „Börsen-Club: setz Vorschlag 2 um“.</p>';
  }
  h += '<p style="color:#9ca3af;font-size:12px;margin-top:20px">Automatisch erstellt vom Börsen-Club-Skript in deiner Google-Tabelle. 1. Versuch = Anteil der Quizfragen, die beim ersten Versuch richtig waren. Wiederholung: falsch beantwortete Fragen kommen wieder, bis sie zweimal hintereinander sitzen.</p></div>';
  return h;
}

function wochenBericht() {
  var einst = einstellungen(), tag = heute();
  if (!zeilen("Antworten").length && !zeilen("Lernen").length && !zeilen("Handel").length) return "Noch keine Aktivität im Club, kein Bericht.";
  var aus = auswertungLesen(tag);
  var imp = aus ? auswertungUebernehmen(einst, aus) : { extras: [], tempo: [], fehler: [] };
  var stat = kinderStatistik(einst);
  var an = String(einst["Bericht an"] || "").trim() || Session.getEffectiveUser().getEmail();
  MailApp.sendEmail({ to: an, subject: "Börsen-Club: Wochenbericht bis " + datumDe(tag), htmlBody: berichtHtml(stat, aus, imp, tag), name: "Börsen-Club" });
  return "Wochenbericht verschickt.";
}

function wochenSteuerungEinrichten() {
  ScriptApp.getProjectTriggers().forEach(function (tr) {
    var f = tr.getHandlerFunction();
    if (f === "wochenExport" || f === "wochenBericht") ScriptApp.deleteTrigger(tr);
  });
  ScriptApp.newTrigger("wochenExport").timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(16).inTimezone(ZONE).create();
  ScriptApp.newTrigger("wochenBericht").timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(20).inTimezone(ZONE).create();
  var o = auswertungsOrdner();
  var text = "Sonntags 16 Uhr Export, 20 Uhr Bericht. Ordner: " + o.getName() + " (" + o.getId() + ")";
  Logger.log(text);
  return text;
}

// ---------- Einrichten und Zeitsteuerung (im Apps-Script-Editor ausführen) ----------

function einrichten() {
  var t = SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty("TABELLE", t.getId());
  Object.keys(BLAETTER).forEach(function (n) {
    var b = blatt(n), kopf = b.getRange(1, 1, 1, BLAETTER[n].length).getValues()[0];
    if (String(kopf[BLAETTER[n].length - 1]) !== BLAETTER[n][BLAETTER[n].length - 1]) b.getRange(1, 1, 1, BLAETTER[n].length).setValues([BLAETTER[n]]); // neue Spalten
  });
  var e = blatt("Einstellungen");
  if (e.getLastRow() < 2) e.getRange(2, 1, EINSTELLUNGEN.length, 3).setValues(EINSTELLUNGEN);
  else {
    var da = {};
    zeilen("Einstellungen").forEach(function (z) { da[String(z[0])] = true; });
    EINSTELLUNGEN.forEach(function (z) { if (!da[z[0]]) e.appendRow(z); }); // neue Einstellungen ergänzen
  }
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
