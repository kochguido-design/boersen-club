// Börsen-Club – Demo-Modus: stellt die Google-Dienste im Browser nach, damit skript/Code.js
// ohne Google-Tabelle läuft (zum Ausprobieren und Testen). Kurse sind ausgedacht und schwanken zufällig.
// Demo-Kinder: Lina (PIN 1111), Ben (2222), Mila (3333). Passwort: demo
(function () {
  var SPEICHER = "bc-demo-v1";
  var daten = null;
  try { daten = JSON.parse(localStorage.getItem(SPEICHER) || "null"); } catch (e) { daten = null; }
  var neuAngelegt = !daten;
  if (!daten) daten = { blaetter: {}, reihenfolge: [] };
  function sichern() { try { localStorage.setItem(SPEICHER, JSON.stringify(daten)); } catch (e) { } }

  function Range(blattName, r, c, nr, nc) { this.b = blattName; this.r = r; this.c = c; this.nr = nr; this.nc = nc; }
  Range.prototype.zeilen = function () { return daten.blaetter[this.b]; };
  Range.prototype.getValues = function () {
    var z = this.zeilen(), aus = [];
    for (var i = 0; i < this.nr; i++) {
      var reihe = z[this.r - 1 + i] || [], zeile = [];
      for (var j = 0; j < this.nc; j++) {
        var v = reihe[this.c - 1 + j];
        if (typeof v === "string" && v.charAt(0) === "=") v = "";
        zeile.push(v == null ? "" : v);
      }
      aus.push(zeile);
    }
    return aus;
  };
  Range.prototype.setValues = function (werte) {
    var z = this.zeilen();
    for (var i = 0; i < werte.length; i++) {
      var idx = this.r - 1 + i;
      while (z.length <= idx) z.push([]);
      for (var j = 0; j < werte[i].length; j++) z[idx][this.c - 1 + j] = werte[i][j];
    }
    sichern();
    return this;
  };
  Range.prototype.setFormulas = Range.prototype.setValues;
  Range.prototype.setValue = function (v) { return this.setValues([[v]]); };
  Range.prototype.clearContent = function () {
    var z = this.zeilen();
    for (var i = 0; i < this.nr; i++) { var reihe = z[this.r - 1 + i]; if (reihe) for (var j = 0; j < this.nc; j++) reihe[this.c - 1 + j] = ""; }
    // leere Zeilen am Ende abschneiden
    while (z.length && z[z.length - 1].every(function (v) { return v === "" || v == null; })) z.pop();
    sichern();
    return this;
  };

  function Sheet(name) { this.name = name; }
  Sheet.prototype.getName = function () { return this.name; };
  Sheet.prototype.getLastRow = function () { return daten.blaetter[this.name].length; };
  Sheet.prototype.getRange = function (r, c, nr, nc) { return new Range(this.name, r, c, nr || 1, nc || 1); };
  Sheet.prototype.appendRow = function (reihe) { daten.blaetter[this.name].push(reihe.slice()); sichern(); return this; };
  Sheet.prototype.setFrozenRows = function () { return this; };

  var Tabelle = {
    getId: function () { return "demo"; },
    getSheetByName: function (n) { return daten.blaetter[n] ? new Sheet(n) : null; },
    insertSheet: function (n) { daten.blaetter[n] = []; daten.reihenfolge.push(n); sichern(); return new Sheet(n); }
  };
  window.SpreadsheetApp = { getActiveSpreadsheet: function () { return Tabelle; }, openById: function () { return Tabelle; } };
  var props = {};
  window.PropertiesService = { getScriptProperties: function () { return { getProperty: function (k) { return k === "TABELLE" ? null : (props[k] || null); }, setProperty: function (k, v) { props[k] = String(v); } }; } };

  // Drive und Mail nur im Speicher (für Tests von wochenExport und wochenBericht in der Konsole)
  var drive = { dateien: [] };
  function Iter(liste) { var i = 0; return { hasNext: function () { return i < liste.length; }, next: function () { return liste[i++]; } }; }
  function Datei(n, inhalt) { this.n = n; this.inhalt = inhalt; this.id = "f" + Math.random().toString(36).slice(2, 9); this.d = new Date(); this.weg = false; }
  Datei.prototype.getName = function () { return this.n; };
  Datei.prototype.getId = function () { return this.id; };
  Datei.prototype.getDateCreated = function () { return this.d; };
  Datei.prototype.setTrashed = function (t) { this.weg = !!t; return this; };
  Datei.prototype.getBlob = function () { var t = this.inhalt; return { getDataAsString: function () { return t; } }; };
  function aktiv() { return drive.dateien.filter(function (f) { return !f.weg; }); }
  var Ordner = { getId: function () { return "ordner-demo"; }, getName: function () { return "Börsen-Club – Auswertung"; },
    createFile: function (n, inhalt) { var f = new Datei(n, inhalt); drive.dateien.push(f); return f; },
    getFilesByName: function (n) { return Iter(aktiv().filter(function (f) { return f.n === n; })); },
    getFiles: function () { return Iter(aktiv()); } };
  window.DriveApp = { getFolderById: function () { return Ordner; }, getFoldersByName: function () { return Iter([Ordner]); }, createFolder: function () { return Ordner; } };
  window.MailApp = { sendEmail: function (m) { window.BC_DEMO_MAIL = m; console.log("Demo-Mail an " + m.to + ": " + m.subject); } };
  window.Session = { getEffectiveUser: function () { return { getEmail: function () { return "demo@example.org"; } }; } };
  window.BC_DEMO_DRIVE = drive;

  var cacheDaten = {};
  window.CacheService = { getScriptCache: function () {
    return {
      get: function (k) { var e = cacheDaten[k]; return e && e.bis > Date.now() ? e.v : null; },
      put: function (k, v, sek) { cacheDaten[k] = { v: v, bis: Date.now() + (sek || 600) * 1000 }; },
      remove: function (k) { delete cacheDaten[k]; }
    };
  } };
  window.LockService = { getScriptLock: function () { return { waitLock: function () { }, releaseLock: function () { } }; } };
  window.ContentService = { MimeType: { JSON: "json" }, createTextOutput: function (s) { return { setMimeType: function () { return this; }, getContent: function () { return s; } }; } };
  window.Logger = { log: function (x) { console.log(x); } };
  window.ScriptApp = { getProjectTriggers: function () { return []; } };

  function zwei(n) { return (n < 10 ? "0" : "") + n; }
  window.Utilities = { formatDate: function (d, zone, f) {
    return f.replace("yyyy", d.getFullYear()).replace("MM", zwei(d.getMonth() + 1)).replace("dd", zwei(d.getDate()))
      .replace("HH", zwei(d.getHours())).replace("mm", zwei(d.getMinutes())).replace("ss", zwei(d.getSeconds()));
  } };

  // ausgedachte Grundkurse (ungefähr, in Landeswährung)
  var BASIS = { "ADS.DE": 165, "PUM.DE": 23, "BEI.DE": 79, "BMW.DE": 53, "MBG.DE": 38, "VOW3.DE": 63, "P911.DE": 43, "SAP.DE": 184, "SIE.DE": 255,
    "DTE.DE": 26, "ALV.DE": 452, "DHL.DE": 57, "LHA.DE": 8.7, "ZAL.DE": 28, "HLAG.DE": 121, "FIE.DE": 42.5, AAPL: 343, MSFT: 485, GOOGL: 265,
    AMZN: 247, NVDA: 126, TSLA: 346, NFLX: 57, DIS: 118, KO: 97, MCD: 273, NKE: 33, MAT: 13.7, HAS: 112, RBLX: 47, SPOT: 577, RACE: 392,
    "NESN.SW": 85.5, "7974.T": 8832, "6758.T": 4312, "EUNL.DE": 122.7, "EXS1.DE": 204, "EURUSD=X": 1.0975, "EURJPY=X": 170.2, "EURCHF=X": 0.93,
    "EURGBP=X": 0.86, "EURDKK=X": 7.46, "EURSEK=X": 11.1 };
  function waehrung(s) { return /\.DE$/.test(s) ? "EUR" : /\.SW$/.test(s) ? "CHF" : /\.T$/.test(s) ? "JPY" : /=X$/.test(s) ? s.slice(3, 6) : "USD"; }
  function zufall(s, n) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; var x = Math.sin(h + n * 12.9898) * 43758.5453; return x - Math.floor(x); }
  function kursZu(s, t) { // t in Sekunden; schwankt langsam, alle 10 Minuten ein neuer Wert
    var b = BASIS[s] || 100;
    if (/=X$/.test(s)) return b;
    var schritt = Math.floor(t / 600);
    return b * (1 + 0.06 * Math.sin(schritt / 500 + zufall(s, 1) * 6) + 0.015 * (zufall(s, schritt) - 0.5));
  }
  window.UrlFetchApp = { fetchAll: function (anfragen) {
    return anfragen.map(function (a) {
      var m = a.url.match(/chart\/([^?]+)\?range=([^&]+)&interval=([^&]+)/);
      var s = decodeURIComponent(m[1]), zr = m[2];
      var t = Math.floor(Date.now() / 1000);
      var tage = { "5d": 5, "1mo": 30, "6mo": 180, "1y": 365, "5y": 1825, "1d": 1 }[zr] || 30;
      var schritte = zr === "5y" ? 7 : zr === "5d" ? 0.25 : 1;
      var ts = [], close = [];
      for (var d = tage; d >= 0; d -= schritte) {
        var tt = t - Math.round(d * 86400);
        ts.push(tt);
        close.push(Math.round(kursZu(s, tt) * 100) / 100 * (1 - d / 3650 * 0.4 * (zufall(s, 2) - 0.3)));
      }
      var body = { chart: { result: [{ meta: { regularMarketPrice: Math.round(kursZu(s, t) * 100) / 100, chartPreviousClose: Math.round(kursZu(s, t - 86400) * 100) / 100,
        currency: waehrung(s), regularMarketTime: t }, timestamp: ts, indicators: { quote: [{ close: close }] } }] } };
      return { getResponseCode: function () { return 200; }, getContentText: function () { return JSON.stringify(body); } };
    });
  } };

  window.BC_DEMO_EINRICHTEN = function () {
    if (!neuAngelegt) return;
    einrichten();
    var e = daten.blaetter.Einstellungen;
    e[1][1] = "demo";
    daten.blaetter.Kinder = [daten.blaetter.Kinder[0],
      ["Lina", "1111", "🦊", "#f97316", "", "ja", "2026-11-01"],
      ["Ben", "2222", "🐻", "#2563eb", "", "ja", "2026-11-01"],
      ["Mila", "3333", "🐼", "#16a34a", "", "ja", "2026-11-01"]];
    // Lern-Versuche mit einzelnen Antworten (gleiche Schlüssel wie in index.html)
    function hash(t) { var h = 5381; t = String(t); for (var i = 0; i < t.length; i++) h = ((h * 33) ^ t.charCodeAt(i)) >>> 0; return h.toString(36); }
    function vorTagen(n) { return Utilities.formatDate(new Date(Date.now() - n * 864e5), "", "yyyy-MM-dd"); }
    function versuch(kind, lid, tage, falsch) {
      var l = null; (window.BC ? window.BC.lektionen : []).forEach(function (x) { if (x.id === lid) l = x; });
      if (!l) return;
      var zeit = vorTagen(tage) + " 17:00:00", richtig = 0;
      l.quiz.forEach(function (f, i) {
        var ok = falsch.indexOf(i) < 0; if (ok) richtig++;
        daten.blaetter.Antworten.push([zeit, kind, "lektion", lid, lid + "#" + hash(f.frage), ok ? "ja" : "nein", f.frage.slice(0, 120)]);
      });
      daten.blaetter.Lernen.push([zeit, kind, lid, richtig, l.quiz.length, richtig >= Math.ceil(0.6 * l.quiz.length - 1e-9) ? "ja" : "nein"]);
    }
    ["wirtschaft", "unternehmen", "aktie", "boersengang", "boerse", "musterdepot"].forEach(function (l, i) { versuch("Ben", l, 12 - i, [2]); });
    versuch("Mila", "wirtschaft", 11, [0, 3, 4, 5]);
    versuch("Mila", "wirtschaft", 10, [0, 3]);
    versuch("Mila", "unternehmen", 10, [1, 3, 5]);
    versuch("Mila", "unternehmen", 9, [1]);
    versuch("Mila", "aktie", 2, [0, 1, 2, 3]);
    versuch("Mila", "aktie", 1, [0, 2]);
    versuch("Mila", "boersengang", 1, [1, 4]);
    daten.blaetter.Extras.push(["xdemo1", "Mila", "Was gehört dir mit einer Aktie?", "🧩", "Bei Fragen zu Anteilen und Eigentum war Mila noch unsicher.",
      JSON.stringify({ einleitung: "Eine kurze Zusatzrunde zu einer wichtigen Frage: Was hast du eigentlich, wenn du eine Aktie besitzt?",
        karten: [{ titel: "Ein kleines Stück der Firma", bild: "🍕", text: "Eine Firma ist wie eine Pizza, die in sehr viele Stücke geteilt ist. Jede **Aktie** ist ein Stück.\nWer eine Aktie hat, ist **Miteigentümer**. Bei 1 Million Aktien gehört dir mit einer Aktie ein Millionstel der Firma." },
          { titel: "Was du davon hast", bild: "🎁", text: "Als Aktionär darfst du auf der **Hauptversammlung** mit abstimmen und bekommst einen Teil vom Gewinn, wenn die Firma eine **Dividende** zahlt.\n[[Ein Stuhl aus der Firma gehört dir aber nicht.]] Dir gehört ein Anteil am Ganzen." }],
        quiz: [{ frage: "Eine Firma hat 1.000 Aktien. Du hast 10 davon. Wie viel Prozent der Firma gehören dir?", zahl: 1, einheit: "%", erklaerung: "10 von 1.000 sind 1 %." },
          { frage: "Was bekommst du als Aktionär, wenn die Firma eine Dividende zahlt?", optionen: ["Einen Teil vom Gewinn", "Einen Rabatt im Laden", "Einen Arbeitsplatz"], richtig: 0, erklaerung: "Die Dividende ist der Teil vom Gewinn, der an die Aktionäre ausgezahlt wird." },
          { frage: "Darfst du als Aktionär einen Stuhl aus der Firma mit nach Hause nehmen?", optionen: ["Nein, dir gehört ein Anteil am Ganzen, kein einzelnes Ding", "Ja, einen pro Aktie", "Nur mit Erlaubnis der Hauptversammlung"], richtig: 0, erklaerung: "Die Firma gehört allen Aktionären zusammen. Einzelne Dinge darf niemand einfach mitnehmen." }] }),
      vorTagen(0) + " 08:00:00", "", "", ""]);
    daten.blaetter.Handel.push(["2026-11-14 10:00:00", "Ben", "Kauf", "NTDO", 4, 49.8, 1, 199.2]);
    daten.blaetter.Handel.push(["2026-11-14 10:05:00", "Ben", "Kauf", "EUNL", 3, 120.1, 1, 360.3]);
    var heute = new Date();
    for (var i = 14; i >= 1; i--) {
      var d = new Date(heute.getTime() - i * 864e5), tag = Utilities.formatDate(d, "", "yyyy-MM-dd");
      daten.blaetter.Verlauf.push([tag, "Lina", 1000, 1000]);
      daten.blaetter.Verlauf.push([tag, "Ben", i > 8 ? 1000 : Math.round((998 + 12 * Math.sin(i)) * 100) / 100, 438.5]);
      daten.blaetter.Verlauf.push([tag, "Mila", 1000, 1000]);
    }
    sichern();
  };
  window.BC_DEMO_ZURUECK = function () { try { localStorage.removeItem(SPEICHER); } catch (e) { } };
})();
