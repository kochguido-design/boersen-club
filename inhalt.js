// Börsen-Club – Lerninhalte. Allgemeines Grundwissen, keine Anlageberatung.
var BC = window.BC || {};
window.BC = BC;

BC.module = [
  { nr: 1, titel: "Unternehmen und Aktien", emoji: "🏭" },
  { nr: 2, titel: "Wie Unternehmen Geld verdienen", emoji: "💶" },
  { nr: 3, titel: "Klug anlegen", emoji: "🧠" }
];

BC.lektionen = [

  // ---------------------------------------------------------------- Modul 1
  { id: "unternehmen", modul: 1, titel: "Was ist ein Unternehmen?", emoji: "🏭", dauer: 8,
    einleitung: "Bevor es um Aktien geht, schauen wir uns an, was hinter einer Firma steckt.",
    karten: [
      { titel: "Firmen sind überall", bild: "🏪",
        text: "Dein Frühstück, dein Handy, dein Busticket: Hinter fast allem, was du benutzt, steckt ein **Unternehmen**. Ein Unternehmen, auch **Firma** genannt, stellt etwas her oder bietet etwas an, um damit Geld zu verdienen.\nDas kann die Bäckerei an der Ecke sein, ein Fahrradladen oder ein Weltkonzern mit Hunderttausenden Beschäftigten. Die Grundidee ist immer gleich: [[Ein Unternehmen bietet etwas an, wofür andere bereit sind zu bezahlen.]]" },
      { titel: "Produkte und Dienstleistungen", bild: "📦",
        text: "Was Firmen anbieten, lässt sich in zwei Gruppen teilen. **Produkte** sind Dinge, die man anfassen kann: Turnschuhe, Schokolade, Spielkonsolen. **Dienstleistungen** sind Arbeiten, die jemand für dich erledigt: ein Haarschnitt, eine Busfahrt, ein Streaming-Abo oder eine Versicherung.\nViele Firmen bieten beides an. Ein Autohaus verkauft Autos (Produkt) und repariert sie in der eigenen Werkstatt (Dienstleistung)." },
      { titel: "Kunden, Mitarbeitende, Lieferanten", bild: "👥",
        text: "Ohne **Kunden** geht nichts. Das sind die Menschen oder Firmen, die etwas kaufen. Kauft niemand, verdient die Firma kein Geld.\nDamit die Firma etwas anbieten kann, braucht sie **Mitarbeitende**. Sie backen, programmieren, verkaufen, liefern aus oder machen die Buchhaltung. Dafür bekommen sie **Lohn** oder **Gehalt**.\nDazu kommen **Lieferanten**: Firmen, die Material liefern. Bei der Bäckerei sind das zum Beispiel die Firmen, die Mehl, Eier und Butter bringen." },
      { titel: "Wem gehört die Firma?", bild: "🔑",
        text: "Jedes Unternehmen hat **Eigentümer**, also Menschen, denen es gehört. Bei einer kleinen Bäckerei ist das oft die Bäckerin selbst. Sie trägt das Risiko: Läuft der Laden schlecht, verliert sie Geld. Läuft er gut, gehört ihr der Gewinn.\nGroße Firmen können Tausenden oder sogar Millionen Menschen gleichzeitig gehören. Wie das geht, erfährst du in der nächsten Lektion. Kleiner Hinweis: [[Es hat mit Aktien zu tun.]]",
        profi: "In Deutschland gibt es verschiedene **Rechtsformen**. Beim **Einzelunternehmen** haftet die Inhaberin mit ihrem ganzen Privatvermögen. Bei einer **GmbH** (Gesellschaft mit beschränkter Haftung) riskieren die Eigentümer nur das Geld, das sie in die Firma gesteckt haben. Bei einer **AG** (Aktiengesellschaft) ist das ähnlich, ihre Anteile heißen aber Aktien und können an der Börse gehandelt werden." },
      { titel: "Klein und groß", bild: "🏙️",
        text: "Die meisten Firmen in Deutschland sind klein: ein Friseursalon, eine Tischlerei, ein Café mit drei Leuten. Andere sind riesig und in vielen Ländern unterwegs. Solche Großunternehmen nennt man oft **Konzerne**.\nIn Hamburg findest du beides: kleine Läden im Viertel und große Unternehmen, etwa Reedereien im Hafen oder die Firma hinter Nivea. Schau mal in deinen Rucksack: Von welchen Firmen stammen die Sachen darin?",
        profi: "Genau genommen ist ein **Konzern** eine Gruppe von Firmen, die gemeinsam von einer Mutterfirma geführt werden. Ein Autokonzern kann zum Beispiel mehrere Automarken besitzen, die jeweils eigene Firmen sind." }
    ],
    ausprobieren: "Such dir drei Dinge aus, die du heute benutzt hast, zum Beispiel Zahnpasta, Bus und Handy. Finde heraus, welches Unternehmen dahintersteckt und ob es ein Produkt oder eine Dienstleistung ist.",
    quiz: [
      { frage: "Was ist eine Dienstleistung?", optionen: ["Eine Arbeit, die jemand für dich erledigt, zum Beispiel ein Haarschnitt", "Ein Gegenstand, den man anfassen kann", "Das Geld, das eine Firma übrig behält"], richtig: 0, erklaerung: "Dienstleistungen sind Arbeiten für andere, etwa Haareschneiden, Busfahren oder Reparieren. Gegenstände zum Anfassen sind Produkte." },
      { frage: "Welches davon ist ein Produkt?", optionen: ["Ein Paar Turnschuhe", "Eine Busfahrt", "Ein Haarschnitt"], richtig: 0, erklaerung: "Turnschuhe kann man anfassen, also sind sie ein Produkt. Busfahrt und Haarschnitt sind Dienstleistungen." },
      { frage: "Wer sind die Kunden eines Unternehmens?", optionen: ["Die Menschen oder Firmen, die bei ihm etwas kaufen", "Die Menschen, die dort arbeiten", "Die Firmen, die Material liefern"], richtig: 0, erklaerung: "Kunden kaufen. Wer dort arbeitet, gehört zu den Mitarbeitenden, und wer Material bringt, ist Lieferant." },
      { frage: "Einer Bäckerin gehört ihr Laden allein. Wer trägt das Risiko, wenn der Laden schlecht läuft?", optionen: ["Die Bäckerin als Eigentümerin", "Die Kunden", "Die Lieferanten"], richtig: 0, erklaerung: "Die Eigentümerin verliert Geld, wenn es schlecht läuft. Dafür gehört ihr auch der Gewinn, wenn es gut läuft." },
      { frage: "Was ist ein Konzern?", optionen: ["Ein sehr großes Unternehmen, oft in vielen Ländern tätig", "Ein kleiner Laden im Viertel", "Ein Konzert für Firmenchefs"], richtig: 0, erklaerung: "Konzerne sind Großunternehmen, die oft aus mehreren Firmen bestehen und in vielen Ländern arbeiten." },
      { frage: "Profi-Frage: Was bedeutet „beschränkte Haftung“ bei einer GmbH?", optionen: ["Die Eigentümer riskieren nur das Geld, das sie in die Firma gesteckt haben", "Die Firma darf nur wenige Kunden haben", "Die Firma muss keine Steuern zahlen"], richtig: 0, erklaerung: "Geht eine GmbH pleite, müssen die Eigentümer nicht mit ihrem Privatvermögen einspringen. Verloren ist aber das Geld, das sie in die Firma gesteckt haben." }
    ]
  },

  { id: "aktie", modul: 1, titel: "Was ist eine Aktie?", emoji: "🍕", dauer: 10,
    einleitung: "Hier erfährst du, wie man mit einer Aktie Miteigentümer einer Firma wird.",
    karten: [
      { titel: "Firmen brauchen Geld", bild: "🌱",
        text: "Ben hat einen gut laufenden Fahrradladen. Er möchte einen zweiten Laden eröffnen, braucht dafür aber 100.000 €. Woher nehmen?\nMöglichkeit 1: Er leiht sich das Geld bei einer Bank. Das ist ein **Kredit**. Ben muss ihn zurückzahlen und zusätzlich **Zinsen** zahlen, egal wie gut der Laden läuft.\nMöglichkeit 2: Er sucht Leute, die ihm Geld geben und dafür **Miteigentümer** werden. Sie bekommen kein festes Geld zurück, sondern einen Anteil an der Firma. Genau so funktionieren Aktien." },
      { titel: "Ein Stück von der Pizza", bild: "🍕",
        text: "Stell dir eine Firma als große Pizza vor. Wird sie in 100 gleich große Stücke geschnitten, ist jedes Stück ein Hundertstel der ganzen Pizza. Eine **Aktie** ist so ein Stück, nur eben von einer Firma.\n[[Wer eine Aktie besitzt, dem gehört ein kleiner Teil des Unternehmens.]]\nGroße Firmen sind in Millionen oder sogar Milliarden Aktien aufgeteilt. Eine einzelne Aktie ist also ein winziges Stück, aber ein echtes." },
      { titel: "Aktiengesellschaft und Aktionäre", bild: "🤝",
        text: "Eine Firma, die in Aktien aufgeteilt ist, heißt **Aktiengesellschaft**, kurz **AG**. Du erkennst sie oft am Namen, zum Beispiel „… AG“.\nWer Aktien besitzt, ist **Aktionärin** oder **Aktionär** und damit Miteigentümer. Du darfst deshalb aber nicht einfach in die Firma spazieren und einen Stuhl mitnehmen. Dir gehört ein Anteil am Ganzen, kein bestimmter Gegenstand. Geht es der Firma gut, profitierst du mit. Geht es ihr schlecht, trifft es dich auch." },
      { titel: "Dividende: ein Teil vom Gewinn", bild: "💶",
        text: "Macht eine AG Gewinn, kann sie einen Teil davon an ihre Aktionäre auszahlen. Diese Zahlung heißt **Dividende**. Es gibt sie meist einmal im Jahr, als Betrag pro Aktie.\nBeispiel: Eine Firma zahlt 2 € Dividende pro Aktie. Oma Rosi hat 10 Aktien, also bekommt sie 20 €.\nAber: [[Eine Dividende ist nicht garantiert.]] Manche Firmen stecken ihren Gewinn lieber in neue Ideen und zahlen nichts aus. Und wer Verlust macht, hat oft nichts zu verteilen." },
      { titel: "Hauptversammlung: mitreden", bild: "🗳️",
        text: "Einmal im Jahr lädt eine AG ihre Aktionäre zur **Hauptversammlung** ein. Dort berichtet der **Vorstand**, also die Chefetage, wie das Jahr gelaufen ist. Die Aktionäre stimmen über wichtige Fragen ab, zum Beispiel darüber, wie viel Dividende ausgezahlt wird.\nMeist bringt jede Aktie eine Stimme. Mit einer Aktie hast du also eine Stimme unter vielen Millionen, aber du darfst mitreden. Wer sehr viele Aktien hat, hat entsprechend mehr Einfluss.",
        profi: "In deutschen AGs gibt es neben dem Vorstand den **Aufsichtsrat**. Er kontrolliert den Vorstand und bestimmt, wer im Vorstand sitzt. Einen Teil des Aufsichtsrats wählt die Hauptversammlung, in großen Firmen wählen auch die Beschäftigten Vertreter hinein." },
      { titel: "Börsengang – und wer nicht an die Börse geht", bild: "🚪",
        text: "Bietet eine Firma ihre Aktien zum ersten Mal öffentlich zum Kauf an, heißt das **Börsengang** (englisch **IPO**). Danach kann jeder ihre Aktien an der Börse kaufen.\nLängst nicht jede Firma ist aber an der Börse. Lego gehört größtenteils einer Familie in Dänemark, Haribo und Ferrero sind ebenfalls Familienunternehmen. Bosch gehört zum größten Teil einer Stiftung. [[Anteile an solchen Firmen kannst du nicht an der Börse kaufen.]]",
        profi: "IPO steht für „Initial Public Offering“, also erstes öffentliches Angebot. Für neu ausgegebene Aktien bekommt die Firma beim Börsengang frisches Geld. Verkaufen dabei bisherige Eigentümer eigene Aktien, geht dieses Geld an sie und nicht an die Firma." }
    ],
    ausprobieren: "Schau dir Verpackungen bei dir zu Hause an. Findest du Firmennamen mit „AG“ am Ende? Notiere drei davon.",
    quiz: [
      { frage: "Was ist eine Aktie?", optionen: ["Ein kleiner Anteil an einem Unternehmen", "Ein Kredit, den man einer Firma gibt", "Ein Gutschein für die Produkte einer Firma"], richtig: 0, erklaerung: "Mit einer Aktie wirst du Miteigentümer, dir gehört ein kleines Stück der Firma." },
      { frage: "Ben leiht sich für seinen Laden Geld bei der Bank. Was muss er tun?", optionen: ["Das Geld zurückzahlen und Zinsen zahlen", "Der Bank einen Teil seines Ladens überschreiben", "Nichts, falls der Laden schlecht läuft"], richtig: 0, erklaerung: "Ein Kredit muss mit Zinsen zurückgezahlt werden, ganz egal, wie gut das Geschäft läuft." },
      { frage: "Was ist eine Dividende?", optionen: ["Ein Teil des Gewinns, den die Firma an die Aktionäre auszahlt", "Eine Gebühr, die Aktionäre jedes Jahr zahlen müssen", "Der Preis einer Aktie an der Börse"], richtig: 0, erklaerung: "Die Dividende ist eine Gewinnbeteiligung. Sie ist aber nicht garantiert." },
      { frage: "Eine Firma zahlt 1,50 € Dividende pro Aktie. Lina hat 8 Aktien. Wie viel Dividende bekommt sie?", zahl: 12, einheit: "€", erklaerung: "8 Aktien × 1,50 € = 12 €." },
      { frage: "Was passiert auf der Hauptversammlung?", optionen: ["Die Aktionäre stimmen über wichtige Fragen ab", "Die Aktien werden neu gedruckt", "Die Kunden bekommen Rabatt"], richtig: 0, erklaerung: "Auf der Hauptversammlung berichtet der Vorstand, und die Aktionäre stimmen zum Beispiel über die Dividende ab." },
      { frage: "Warum kannst du keine Lego-Aktie an der Börse kaufen?", optionen: ["Lego ist nicht an der Börse, die Firma gehört einer Familie und einer Stiftung", "Aktien von Spielzeugfirmen sind verboten", "Lego-Aktien gibt es nur für Erwachsene"], richtig: 0, erklaerung: "Nur Firmen, die an die Börse gegangen sind, haben Aktien, die dort gehandelt werden. Lego gehört Privatleuten." },
      { frage: "Ist eine Dividende garantiert?", optionen: ["Nein, die Firma kann auch weniger oder gar nichts auszahlen", "Ja, jedes Jahr gleich viel", "Ja, das steht im Gesetz"], richtig: 0, erklaerung: "Ob und wie viel ausgezahlt wird, hängt vom Gewinn und von der Entscheidung der Firma und der Hauptversammlung ab." }
    ]
  },

  { id: "boerse", modul: 1, titel: "Die Börse und der Kurs", emoji: "📈", dauer: 10,
    einleitung: "Wo werden Aktien gehandelt, und warum ändert sich ihr Preis ständig?",
    karten: [
      { titel: "Ein Markt für Aktien", bild: "🏛️",
        text: "Auf dem Wochenmarkt treffen sich Leute, die Äpfel verkaufen, und Leute, die Äpfel kaufen wollen. Eine **Börse** ist im Grunde dasselbe, nur für Aktien und andere **Wertpapiere**.\nFrüher riefen sich Händler im Handelssaal, dem **Parkett**, ihre Angebote zu. Heute läuft fast alles elektronisch. In Deutschland ist das wichtigste Handelssystem **Xetra** der Deutschen Börse in Frankfurt am Main. Dort werden Kauf- und Verkaufswünsche in Sekundenbruchteilen zusammengebracht." },
      { titel: "Hamburg war zuerst da", bild: "⚓",
        text: "Die älteste Börse Deutschlands steht nicht in Frankfurt, sondern in Hamburg: Die **Hamburger Börse** wurde 1558 gegründet. Damals trafen sich dort vor allem Kaufleute, um Geschäfte mit Waren und Schiffsladungen abzuschließen. Aktien kamen erst viel später dazu.\nDie Börse hat ihren Sitz bis heute direkt am Hamburger Rathaus. Wenn du das nächste Mal in der Innenstadt bist, kannst du sie dir von außen ansehen." },
      { titel: "Der Kurs", bild: "🏷️",
        text: "Der Preis, zu dem eine Aktie gerade gehandelt wird, heißt **Kurs**. Er steht nicht fest wie ein Preis im Supermarkt, sondern ändert sich während der Handelszeit ständig, manchmal mehrmals pro Sekunde.\nDer Kurs entsteht dort, wo sich Käufer und Verkäufer einig werden. Will jemand für 50 € kaufen und jemand anderes für 50 € verkaufen, kommt ein Geschäft zustande. [[Der Preis des letzten Geschäfts ist der aktuelle Kurs.]]" },
      { titel: "Angebot und Nachfrage", bild: "⚖️",
        text: "Warum steigt oder fällt ein Kurs? Denk an Sammelkarten: Wollen viele eine seltene Karte haben, aber kaum jemand gibt sie her, steigt ihr Preis. Wollen alle ihre Karte loswerden und keiner will sie, sinkt er.\nAn der Börse heißt das **Angebot** (wer verkaufen will) und **Nachfrage** (wer kaufen will). [[Mehr Nachfrage als Angebot: Der Kurs steigt. Mehr Angebot als Nachfrage: Der Kurs fällt.]]\nOb Leute kaufen oder verkaufen wollen, hängt oft von **Nachrichten** ab: neue Produkte, gute oder schlechte Zahlen, Ärger in der Firma." },
      { titel: "Von wem kaufst du eigentlich?", bild: "🔄",
        text: "Wenn du an der Börse eine Aktie kaufst, bekommt das Geld meistens nicht die Firma. Du kaufst die Aktie von einem anderen **Anleger**, also von jemandem, der sie gerade verkaufen möchte. Die Firma hat ihr Geld schon früher bekommen, zum Beispiel beim Börsengang.\nTrotzdem ist der Kurs für die Firma wichtig: Er zeigt, wie viel die Anleger ihr zutrauen. Und ein hoher Kurs hilft, falls sie später neue Aktien ausgeben möchte." },
      { titel: "Handelszeiten und der DAX", bild: "🕘",
        text: "Auf Xetra wird montags bis freitags von 9:00 bis 17:30 Uhr gehandelt. Die großen Börsen in New York öffnen erst am Nachmittag deutscher Zeit, meist um 15:30 Uhr.\nIn den Nachrichten hörst du oft: „Der DAX ist heute gestiegen.“ Der **DAX** ist eine Liste von 40 großen deutschen Börsenunternehmen. Aus ihren Kursen wird ein gemeinsamer Wert berechnet. [[Steigt der DAX, sind die Kurse dieser Firmen im Schnitt gestiegen.]]",
        profi: "Der DAX ist ein **Index**. Firmen mit höherem Börsenwert zählen darin stärker als kleinere. Die Liste wird regelmäßig überprüft: Wer zu klein wird, kann aus dem DAX herausfallen, und eine andere Firma rückt nach." }
    ],
    ausprobieren: "Achte heute in den Nachrichten oder auf einer Nachrichten-App darauf, ob der DAX erwähnt wird. Ist er gestiegen oder gefallen?",
    quiz: [
      { frage: "Was ist eine Börse?", optionen: ["Ein Markt, auf dem Aktien und andere Wertpapiere gehandelt werden", "Eine Bank, die Kredite vergibt", "Ein Geschäft, das alte Münzen verkauft"], richtig: 0, erklaerung: "An der Börse treffen sich Käufer und Verkäufer von Wertpapieren, heute fast nur noch elektronisch." },
      { frage: "Welche Stadt hat die älteste Börse Deutschlands?", optionen: ["Hamburg", "Frankfurt am Main", "Berlin"], richtig: 0, erklaerung: "Die Hamburger Börse wurde 1558 gegründet. Die wichtigste Börse ist heute aber die in Frankfurt." },
      { frage: "Die Hamburger Börse wurde 1558 gegründet. Wie viele Jahre ist das im Jahr 2058 her?", zahl: 500, einheit: "Jahre", erklaerung: "2058 − 1558 = 500 Jahre. Dann feiert die Börse ihren 500. Geburtstag." },
      { frage: "Viele wollen eine Aktie kaufen, aber nur wenige wollen verkaufen. Was passiert meistens mit dem Kurs?", optionen: ["Er steigt", "Er fällt", "Er bleibt immer gleich"], richtig: 0, erklaerung: "Ist die Nachfrage größer als das Angebot, sind Käufer bereit, mehr zu zahlen. Der Kurs steigt." },
      { frage: "Lina kauft an der Börse eine Aktie. Von wem kauft sie sie meistens?", optionen: ["Von einem anderen Anleger, der verkaufen möchte", "Direkt vom Chef der Firma", "Von der Regierung"], richtig: 0, erklaerung: "An der Börse handeln Anleger meist untereinander. Die Firma bekommt von diesem Geschäft nichts." },
      { frage: "Wie viele Firmen sind im DAX?", zahl: 40, einheit: "Firmen", erklaerung: "Der DAX umfasst 40 große deutsche Börsenunternehmen." },
      { frage: "Wie heißt das elektronische Handelssystem der Deutschen Börse in Frankfurt?", optionen: ["Xetra", "Parkett", "DAX"], richtig: 0, erklaerung: "Xetra ist das Handelssystem. Das Parkett war der alte Handelssaal, und der DAX ist ein Index." }
    ]
  },

  { id: "musterdepot", modul: 1, titel: "Dein Musterdepot", emoji: "🎒", dauer: 12,
    einleitung: "Jetzt wird's praktisch: So funktioniert dein eigenes Musterdepot im Börsen-Club.",
    karten: [
      { titel: "Was ist ein Depot?", bild: "🗂️",
        text: "Dein Geld liegt auf einem Konto. Aktien liegen in einem **Depot**, einer Art Konto für Wertpapiere. Darin steht, welche Aktien du besitzt und wie viele davon.\nEchte Depots gibt es bei Banken. Im Börsen-Club hast du ein **Musterdepot**: Es funktioniert wie ein echtes, nur mit Spielgeld und echten Kursen. [[Du kannst üben, ohne echtes Geld zu verlieren.]]" },
      { titel: "Kaufen und verkaufen: die Order", bild: "📝",
        text: "Einen Auftrag zum Kaufen oder Verkaufen nennt man **Order**. Du wählst eine Aktie, gibst an, wie viele Stück du willst, und bestätigst.\nDie Regeln im Börsen-Club:\n• Du startest mit **1.000 € Spielgeld**.\n• Du kaufst immer **ganze Stück**, keine halben Aktien.\n• Jeder Kauf und jeder Verkauf kostet **1 € Gebühr**.\nAuch echte Banken verlangen Gebühren. So merkst du, dass ständiges Hin und Her Geld kostet." },
      { titel: "Echte Kurse, etwas verspätet", bild: "⏱️",
        text: "Im Börsen-Club handelst du mit echten Kursen. Sie kommen allerdings mit etwa 15 bis 20 Minuten **Verzögerung** an. Du siehst also, was vor einer Viertelstunde los war, nicht was in dieser Sekunde passiert.\nDu kannst jederzeit handeln, auch abends oder am Wochenende. [[Es gilt immer der letzte Kurs, den die App kennt.]] Ist die Börse gerade geschlossen, ist das der letzte Kurs vom Handelsschluss." },
      { titel: "Aktien aus aller Welt in Euro", bild: "🌍",
        text: "Im Börsen-Club gibt es auch Aktien aus den USA, aus Japan und aus der Schweiz. Dort wird in Dollar, Yen oder Franken gehandelt. Die App rechnet alles für dich in Euro um.\nDas hat eine Folge: Der Wert einer solchen Aktie in Euro kann sich ändern, obwohl ihr Kurs gleich bleibt. Das passiert, wenn sich der **Wechselkurs** ändert, also wie viel zum Beispiel ein Dollar in Euro wert ist.",
        profi: "Beispiel: Eine US-Aktie kostet 100 Dollar. Ist ein Dollar 0,90 € wert, sind das 90 €. Fällt der Dollar auf 0,80 €, ist dieselbe Aktie nur noch 80 € wert, obwohl sich ihr Dollarkurs nicht bewegt hat. Das nennt man **Währungsrisiko**." },
      { titel: "Einstandspreis und Buchgewinn", bild: "🧾",
        text: "Der **Einstandspreis** ist das, was du beim Kauf bezahlt hast. Mit ihm vergleichst du den aktuellen Kurs.\nBeispiel: Ben kauft eine Aktie für 50 €. Jetzt steht sie bei 60 €. Er hat einen **Buchgewinn** von 10 €, aber nur auf dem Papier. Fällt der Kurs morgen auf 45 €, hat er einen **Buchverlust** von 5 €.\n[[Echt wird ein Gewinn oder Verlust erst, wenn du verkaufst.]] Bis dahin kann sich alles noch ändern.",
        profi: "Viele Banken rechnen die Gebühr in den Einstandspreis ein. Wer 3 Aktien zu je 40 € plus 1 € Gebühr kauft, hat 121 € ausgegeben, also rund 40,33 € pro Stück. Erst über diesem Preis macht er wirklich Gewinn, und beim Verkauf kommt noch einmal eine Gebühr dazu. Im Börsen-Club zeigt dein Depot den Kaufpreis ohne Gebühr, die Gebühren stehen extra unter „Gebühren bezahlt“." },
      { titel: "Fair spielen", bild: "🏅",
        text: "Im Börsen-Club sehen alle die Depots der anderen. Das ist spannend, weil ihr vergleichen und voneinander lernen könnt. Es ist aber kein Wettkampf um jeden Preis.\nBleib fair: Mach dich nicht über Verluste anderer lustig, und gib keine Tipps wie „Kauf das, das steigt sicher!“. Das weiß nämlich niemand. [[Es ist ein Lernspiel: Wer etwas lernt, hat gewonnen.]]\nSobald du diese Lektion abgeschlossen hast, wird der Handel in deinem Musterdepot freigeschaltet. Viel Spaß!" }
    ],
    ausprobieren: "Schau dir in der App drei Firmen an, die du aus deinem Alltag kennst, und notiere ihren Kurs. Rechne aus, wie viele ganze Aktien du von jeder mit 1.000 € kaufen könntest. Gebühr nicht vergessen!",
    quiz: [
      { frage: "Du kaufst 3 Aktien zu je 40 €. Wie viel zahlst du insgesamt, mit Gebühr?", zahl: 121, einheit: "€", erklaerung: "3 × 40 € = 120 €. Dazu kommt 1 € Gebühr: 120 € + 1 € = 121 €." },
      { frage: "Eine Aktie kostet 230 €. Wie viele ganze Stück kannst du mit 1.000 € Spielgeld höchstens kaufen?", zahl: 4, einheit: "Stück", erklaerung: "4 × 230 € = 920 €, plus 1 € Gebühr = 921 €. Das passt. 5 Stück würden 1.150 € kosten, das ist zu viel." },
      { frage: "Ben kauft 5 Aktien zu je 20 € und verkauft sie später alle zu je 24 €. Wie viel Gewinn bleibt ihm nach beiden Gebühren?", zahl: 18, einheit: "€", erklaerung: "Kauf: 5 × 20 € + 1 € = 101 €. Verkauf: 5 × 24 € − 1 € = 119 €. Gewinn: 119 € − 101 € = 18 €." },
      { frage: "Wann wird aus einem Buchgewinn ein echter Gewinn?", optionen: ["Wenn du die Aktie verkaufst", "Sobald der Kurs steigt", "Am Ende jedes Monats"], richtig: 0, erklaerung: "Solange du die Aktie hast, kann der Kurs wieder fallen. Erst beim Verkauf steht fest, was du gewonnen oder verloren hast." },
      { frage: "Wie aktuell sind die Kurse im Börsen-Club?", optionen: ["Sie kommen mit etwa 15 bis 20 Minuten Verzögerung", "Sie sind sekundengenau", "Sie werden nur einmal pro Woche aktualisiert"], richtig: 0, erklaerung: "Die Kurse sind echt, aber etwa eine Viertelstunde alt. Gehandelt wird immer zum letzten bekannten Kurs." },
      { frage: "Eine US-Aktie bleibt bei 100 Dollar, aber der Dollar wird im Vergleich zum Euro weniger wert. Was passiert mit ihrem Wert in Euro?", optionen: ["Er sinkt", "Er steigt", "Er bleibt gleich"], richtig: 0, erklaerung: "Für dieselben 100 Dollar bekommt man nun weniger Euro. Deshalb ist die Aktie in Euro weniger wert." },
      { frage: "Was ist ein Depot?", optionen: ["Eine Art Konto für Aktien und andere Wertpapiere", "Ein Tresor im Keller der Börse", "Eine Liste mit Kaufempfehlungen"], richtig: 0, erklaerung: "Im Depot steht, welche Wertpapiere du besitzt und wie viele davon." }
    ]
  },

  // ---------------------------------------------------------------- Modul 2
  { id: "gewinn", modul: 2, titel: "Umsatz, Kosten, Gewinn rechnen", emoji: "🧮", dauer: 12,
    einleitung: "Hier rechnest du Schritt für Schritt nach, ob eine Firma Geld verdient.",
    karten: [
      { titel: "Umsatz: alles, was reinkommt", bild: "🍋",
        text: "Lina hat auf dem Flohmarkt einen Limonadenstand. An einem sonnigen Samstag verkauft sie 50 Becher zu je 2 €.\nDas Geld, das durch Verkäufe hereinkommt, heißt **Umsatz**. Man rechnet:\n[[Umsatz = Preis × Menge]]\nBei Lina: 2 € × 50 Becher = 100 €. Klingt gut! Aber darf sie jetzt 100 € behalten? Nein, denn sie hatte auch Ausgaben." },
      { titel: "Kosten: feste und veränderliche", bild: "🧾",
        text: "Alles, was Lina ausgeben muss, sind ihre **Kosten**. Es gibt zwei Sorten:\n**Fixkosten** (feste Kosten) bleiben gleich, egal wie viel sie verkauft. Bei Lina sind das 20 € Standgebühr für ihren Platz auf dem Flohmarkt.\n**Variable Kosten** (veränderliche Kosten) steigen mit jedem verkauften Becher: Zitronen, Zucker, Becher. Pro Becher sind das 0,80 €. Bei 50 Bechern: 50 × 0,80 € = 40 €.\nZusammen: 20 € + 40 € = 60 € Kosten." },
      { titel: "Gewinn oder Verlust", bild: "✅",
        text: "Jetzt kommt die wichtigste Rechnung:\n[[Gewinn = Umsatz − Kosten]]\nBei Lina: 100 € − 60 € = 40 € **Gewinn**.\nUnd an einem verregneten Samstag? Sie verkauft nur 15 Becher. Umsatz: 15 × 2 € = 30 €. Kosten: 20 € Standgebühr + 15 × 0,80 € = 32 €. Ergebnis: 30 € − 32 € = −2 €.\nSind die Kosten größer als der Umsatz, macht man **Verlust**." },
      { titel: "Ab wann lohnt es sich?", bild: "🎯",
        text: "Pro Becher bleiben Lina 2 € − 0,80 € = 1,20 € übrig. Damit muss sie zuerst die 20 € Standgebühr wieder hereinholen.\n20 € ÷ 1,20 € ≈ 16,7. Nach 16 Bechern fehlen ihr also noch 80 Cent, ab dem 17. Becher macht sie Gewinn. Diesen Punkt nennt man **Gewinnschwelle**.\nGroße Firmen rechnen genauso, nur mit viel größeren Zahlen. Eine Fabrik hat riesige Fixkosten und muss deshalb sehr viel verkaufen, bevor sie Geld verdient." },
      { titel: "Die Pizzeria rechnet", bild: "🍕",
        text: "Ein größeres Beispiel: Die Pizzeria „Bella“ verkauft in einem Monat 2.000 Pizzen zu je 10 €. Umsatz: 20.000 €.\nFixkosten im Monat: Miete 4.000 €, Löhne 8.000 €, Strom und Versicherung 1.000 €. Zusammen 13.000 €.\nVariable Kosten: Teig, Käse, Tomaten und Karton kosten 2 € pro Pizza, also 2.000 × 2 € = 4.000 €.\nGesamtkosten: 13.000 € + 4.000 € = 17.000 €.\nGewinn: 20.000 € − 17.000 € = [[3.000 €]].",
        profi: "Die **Gewinnspanne** oder **Marge** zeigt, wie viel vom Umsatz als Gewinn übrig bleibt: Gewinn ÷ Umsatz × 100. Bei der Pizzeria: 3.000 € ÷ 20.000 € × 100 = 15 %. Von jedem Euro Umsatz bleiben also 15 Cent. Lina kommt am Sonnentag auf 40 %. Steuern lassen wir hier der Einfachheit halber weg." }
    ],
    ausprobieren: "Denk dir einen eigenen Verkaufsstand aus, zum Beispiel Waffeln auf dem Schulfest. Leg Preis, Fixkosten und Kosten pro Stück fest und rechne aus, ab wie vielen Verkäufen du Gewinn machst.",
    quiz: [
      { frage: "Ben verkauft auf dem Schulfest 30 Waffeln zu je 1,50 €. Wie hoch ist sein Umsatz?", zahl: 45, einheit: "€", erklaerung: "Umsatz = Preis × Menge = 1,50 € × 30 = 45 €." },
      { frage: "Bens Kosten betragen 27 €, sein Umsatz 45 €. Wie viel Gewinn macht er?", zahl: 18, einheit: "€", erklaerung: "Gewinn = Umsatz − Kosten = 45 € − 27 € = 18 €." },
      { frage: "Ein Fahrradladen hat 2.000 € Fixkosten im Monat. Er kauft jedes Fahrrad für 300 € ein und verkauft es für 500 €. Wie viele Fahrräder muss er im Monat verkaufen, um keinen Verlust zu machen?", zahl: 10, einheit: "Fahrräder", erklaerung: "Pro Fahrrad bleiben 500 € − 300 € = 200 € übrig. 2.000 € ÷ 200 € = 10 Fahrräder. Dann sind die Fixkosten genau gedeckt." },
      { frage: "Ein Café hat an einem Tag 150 € Fixkosten und 1 € variable Kosten pro Kuchenstück. Es verkauft 100 Stück zu je 3 €. Wie hoch ist der Gewinn?", zahl: 50, einheit: "€", erklaerung: "Umsatz: 100 × 3 € = 300 €. Kosten: 150 € + 100 × 1 € = 250 €. Gewinn: 300 € − 250 € = 50 €." },
      { frage: "Profi-Frage: Eine Firma macht 200 € Umsatz und 30 € Gewinn. Wie groß ist ihre Gewinnspanne?", zahl: 15, einheit: "%", erklaerung: "30 € ÷ 200 € × 100 = 15 %." },
      { frage: "Welche dieser Kosten sind Fixkosten für eine Pizzeria?", optionen: ["Die Miete für den Laden", "Der Käse für jede Pizza", "Der Karton für jede Pizza"], richtig: 0, erklaerung: "Die Miete bleibt gleich, egal wie viele Pizzen verkauft werden. Käse und Karton braucht man für jede Pizza neu, das sind variable Kosten." },
      { frage: "Was ist Umsatz?", optionen: ["Das Geld, das durch Verkäufe hereinkommt", "Das Geld, das nach Abzug aller Kosten übrig bleibt", "Das Geld, das die Firma bei der Bank leiht"], richtig: 0, erklaerung: "Umsatz ist alles, was durch Verkäufe hereinkommt. Was nach Abzug der Kosten übrig bleibt, ist der Gewinn." }
    ]
  },

  { id: "geschaeftsmodell", modul: 2, titel: "Wie machen Unternehmen Gewinn?", emoji: "🧩", dauer: 10,
    einleitung: "Nicht jede Firma verdient ihr Geld auf dieselbe Art. Hier lernst du die wichtigsten Geschäftsmodelle kennen.",
    karten: [
      { titel: "Was ist ein Geschäftsmodell?", bild: "🧩",
        text: "Ein **Geschäftsmodell** beschreibt, wie eine Firma Geld verdient. Die einfachste Form kennst du schon: etwas herstellen oder einkaufen und teurer verkaufen. So machen es zum Beispiel Bäckereien, Autohersteller oder Sportartikelfirmen.\nEs gibt aber viele andere Wege. Wenn du eine Firma verstehen willst, frag dich immer zuerst: [[Wer bezahlt hier eigentlich, und wofür?]]" },
      { titel: "Abos: jeden Monat ein bisschen", bild: "🔁",
        text: "Bei einem **Abo** (Abonnement) zahlst du regelmäßig, meist jeden Monat, und darfst dafür etwas nutzen: Musik- und Video-Streaming, Handyverträge, Cloud-Speicher oder Software.\nFür die Firma ist das praktisch: Sie weiß ziemlich gut, wie viel Geld nächsten Monat hereinkommt. Deshalb versuchen viele Firmen, ihre Kunden möglichst lange zu halten. Kündigen viele auf einmal, wird es schnell schwierig.",
        profi: "Eine wichtige Kennzahl bei Abo-Firmen ist die **Abwanderungsrate**, englisch **Churn**: Wie viel Prozent der Kunden kündigen pro Monat? Je niedriger sie ist, desto stabiler ist das Geschäft." },
      { titel: "Werbung: Wenn du nichts bezahlst …", bild: "📺",
        text: "Viele Apps, Suchmaschinen und Videoplattformen kosten nichts. Wie verdienen sie Geld? Mit **Werbung**. Andere Firmen bezahlen dafür, dass ihre Anzeigen den Nutzern gezeigt werden.\nJe mehr Menschen eine Plattform nutzen und je länger sie dort bleiben, desto mehr Werbung lässt sich verkaufen. Oft werten solche Plattformen auch aus, was dich interessiert, damit die Werbung besser passt.\n[[Wenn etwas nichts kostet, bezahlst du oft mit deiner Aufmerksamkeit und deinen Daten.]]" },
      { titel: "Marktplätze und Lizenzen", bild: "🏷️",
        text: "Manche Firmen verkaufen gar nicht selbst, sondern bringen Käufer und Verkäufer zusammen, zum Beispiel ein Online-**Marktplatz** oder ein App-Store. Bei jedem Verkauf bekommen sie eine **Provision**, also einen Anteil am Preis.\nAndere verdienen mit **Lizenzen**: Sie erlauben anderen gegen Geld, ihre Figuren, Marken oder Erfindungen zu nutzen. Ist eine Filmfigur auf einer Brotdose zu sehen, hat der Hersteller der Brotdose oft für diese Erlaubnis bezahlt." },
      { titel: "Drei Hebel für mehr Gewinn", bild: "🔧",
        text: "Wie kann eine Firma ihren Gewinn steigern? Es gibt drei Hebel:\n1. **Mehr verkaufen**: neue Kunden, neue Länder, neue Produkte.\n2. **Höhere Preise**: Das klappt nur, wenn die Kunden trotzdem kaufen.\n3. **Kosten senken**: günstiger einkaufen, sparsamer arbeiten.\nAlle drei haben Grenzen. Wer die Preise zu stark erhöht, verliert Kunden. Wer zu viel spart, macht vielleicht die Qualität schlechter." },
      { titel: "Konkurrenz und Marke", bild: "🏆",
        text: "Fast keine Firma ist allein. Andere bieten Ähnliches an, das ist die **Konkurrenz**. Sie sorgt dafür, dass Preise nicht beliebig steigen und Firmen sich anstrengen müssen.\nEin wichtiger Schutz gegen Konkurrenz ist eine starke **Marke**. Viele Menschen kaufen lieber, was sie kennen und mögen, auch wenn es etwas mehr kostet. Kommen Kunden immer wieder, spricht man von **Kundentreue**. [[Eine starke Marke kann sehr wertvoll sein, weil man sie nicht einfach kopieren kann.]]",
        profi: "Fachleute sprechen von einem **Burggraben**: einem Vorteil, der eine Firma vor Konkurrenz schützt, etwa eine bekannte Marke, Patente oder sehr viele Nutzer auf derselben Plattform. Kein Burggraben hält aber für immer." }
    ],
    ausprobieren: "Nimm drei Apps oder Dienste, die du nutzt. Finde heraus: Wer bezahlt dort, du selbst, deine Eltern oder Werbekunden? Welches Geschäftsmodell steckt dahinter?",
    quiz: [
      { frage: "Eine Video-App ist für die Nutzer kostenlos. Womit verdient sie meistens Geld?", optionen: ["Mit Werbung", "Mit Spenden der Nutzer", "Gar nicht, sie ist ein Hobby"], richtig: 0, erklaerung: "Kostenlose Plattformen verdienen meist daran, dass andere Firmen für Werbung bezahlen." },
      { frage: "Was ist ein Abo?", optionen: ["Man zahlt regelmäßig und darf dafür etwas nutzen", "Man zahlt einmal und besitzt das Produkt für immer", "Man bekommt Geld dafür, dass man etwas nutzt"], richtig: 0, erklaerung: "Bei einem Abo zahlst du zum Beispiel jeden Monat und darfst dafür einen Dienst nutzen, solange du nicht kündigst." },
      { frage: "Ein Online-Marktplatz bekommt bei jedem Verkauf einen Anteil am Preis. Wie heißt das?", optionen: ["Provision", "Dividende", "Zinsen"], richtig: 0, erklaerung: "Eine Provision ist ein Anteil am Verkaufspreis für das Vermitteln eines Geschäfts." },
      { frage: "Ein Marktplatz behält 10 % Provision. Jemand verkauft dort ein Spiel für 40 €. Wie viel bekommt der Marktplatz?", zahl: 4, einheit: "€", erklaerung: "10 % von 40 € = 40 € ÷ 10 = 4 €." },
      { frage: "Ein Streaming-Dienst hat 1.000 Kunden, die jeden Monat 10 € zahlen. Wie viel Umsatz macht er in einem Jahr?", zahl: 120000, einheit: "€", erklaerung: "1.000 × 10 € = 10.000 € pro Monat. 10.000 € × 12 Monate = 120.000 €." },
      { frage: "Die Pizzeria kauft ihren Käse günstiger ein, verkauft aber genauso viele Pizzen zum selben Preis. Welchen Hebel nutzt sie?", optionen: ["Kosten senken", "Mehr verkaufen", "Höhere Preise"], richtig: 0, erklaerung: "Menge und Preis bleiben gleich, nur die Kosten sinken. Dadurch steigt der Gewinn." },
      { frage: "Warum ist eine starke Marke für eine Firma wertvoll?", optionen: ["Viele Kunden kaufen immer wieder bei ihr, auch wenn es etwas mehr kostet", "Sie muss dann keine Steuern zahlen", "Sie hat dann nie mehr Konkurrenz"], richtig: 0, erklaerung: "Eine bekannte, beliebte Marke sorgt für treue Kunden. Konkurrenz gibt es trotzdem." }
    ]
  },

  { id: "firmenwert", modul: 2, titel: "Was ist eine Firma wert?", emoji: "⚖️", dauer: 12,
    einleitung: "Wie viel ist eine ganze Firma an der Börse wert, und warum sagt der Kurs allein so wenig?",
    karten: [
      { titel: "Der Börsenwert", bild: "🏷️",
        text: "Was ist eine ganze Firma an der Börse wert? Dafür brauchst du zwei Zahlen: den Kurs und die Anzahl aller Aktien.\n[[Börsenwert = Kurs × Anzahl der Aktien]]\nBeispiel: Die erfundene Fahrradfirma „Speichenwerk AG“ hat 1 Million Aktien, jede kostet 30 €. Börsenwert: 30 € × 1.000.000 = 30 Millionen €. Das ist ungefähr der Preis aller Aktien zusammen. Ein anderes Wort für Börsenwert ist **Marktkapitalisierung**." },
      { titel: "Hoher Kurs heißt nicht große Firma", bild: "🐘",
        text: "Ein häufiger Irrtum: Eine Aktie für 500 € gehört nicht automatisch zu einer größeren Firma als eine Aktie für 20 €.\nFirma A: Kurs 500 €, 1 Million Aktien → Börsenwert 500 Millionen €.\nFirma B: Kurs 20 €, 100 Millionen Aktien → Börsenwert 2 Milliarden €.\nFirma B ist viermal so viel wert, obwohl ihre Aktie viel billiger ist. [[Der Kurs allein sagt nichts darüber, wie groß eine Firma ist.]] Es kommt darauf an, in wie viele Stücke die Pizza geschnitten ist." },
      { titel: "Gewinn pro Aktie", bild: "➗",
        text: "Um Firmen fair zu vergleichen, verteilt man den Gewinn gedanklich auf alle Aktien. Das ergibt den **Gewinn pro Aktie**.\nBeispiel: Die Speichenwerk AG macht in einem Jahr 3 Millionen € Gewinn und hat 1 Million Aktien.\nGewinn pro Aktie: 3.000.000 € ÷ 1.000.000 = 3 €.\nDieser Gewinn gehört rechnerisch den Aktionären, egal ob die Firma ihn als Dividende auszahlt oder ins Wachstum steckt." },
      { titel: "Billig oder teuer?", bild: "🤔",
        text: "Ist eine Aktie für 30 € billig oder teuer? Das erkennt man nicht am Preis allein. Man muss ihn mit dem vergleichen, was die Firma verdient.\nStell dir vor, zwei Läden stehen zum Verkauf. Beide kosten 100.000 €. Der eine macht 10.000 € Gewinn im Jahr, der andere nur 2.000 €. Auf den ersten Blick wirkt der erste günstiger, denn du bekommst mehr Gewinn für dein Geld. Aber vielleicht wächst der zweite in Zukunft viel schneller …",
        profi: "Diese Idee steckt im **KGV**, dem **Kurs-Gewinn-Verhältnis**: Kurs ÷ Gewinn pro Aktie. Bei der Speichenwerk AG: 30 € ÷ 3 € = 10. Man zahlt also das Zehnfache des Jahresgewinns. Ein niedriges KGV heißt nicht automatisch „günstig“: Oft trauen die Anleger der Firma einfach wenig Wachstum zu." },
      { titel: "Es geht um die Zukunft", bild: "🔮",
        text: "Warum zahlen Anleger für manche Firmen sehr viel, obwohl sie heute wenig verdienen? Weil an der Börse vor allem die **Erwartungen** zählen: Was wird die Firma in fünf oder zehn Jahren verdienen?\nGlauben viele, dass eine Firma stark wachsen wird, zahlen sie heute einen hohen Preis. Doch Erwartungen können falsch sein. [[Niemand kennt die Zukunft, auch nicht die Profis.]] Enttäuscht eine Firma die Hoffnungen, kann der Kurs stark fallen." }
    ],
    ausprobieren: "Such dir im Börsen-Club zwei Aktien mit sehr unterschiedlichem Kurs aus. Überlege: Heißt der höhere Kurs, dass die Firma größer ist? Was müsstest du zusätzlich wissen?",
    quiz: [
      { frage: "Eine Firma hat 4 Millionen Aktien, jede kostet 25 €. Wie hoch ist ihr Börsenwert in Millionen Euro?", zahl: 100, einheit: "Mio. €", erklaerung: "25 € × 4 Millionen = 100 Millionen €." },
      { frage: "Aktie X kostet 400 €, Aktie Y kostet 40 €. Was kannst du daraus sicher schließen?", optionen: ["Nichts über die Größe der Firmen, dafür braucht man auch die Anzahl der Aktien", "Firma X ist zehnmal so groß wie Firma Y", "Firma Y macht mehr Gewinn als Firma X"], richtig: 0, erklaerung: "Der Börsenwert hängt vom Kurs und von der Anzahl der Aktien ab. Der Kurs allein verrät die Größe nicht." },
      { frage: "Eine Firma macht 10 Millionen € Gewinn und hat 5 Millionen Aktien. Wie hoch ist der Gewinn pro Aktie?", zahl: 2, einheit: "€", erklaerung: "10.000.000 € ÷ 5.000.000 Aktien = 2 € pro Aktie." },
      { frage: "Profi-Frage: Eine Aktie kostet 40 €, der Gewinn pro Aktie beträgt 2 €. Wie hoch ist das KGV?", zahl: 20, einheit: "", erklaerung: "KGV = Kurs ÷ Gewinn pro Aktie = 40 € ÷ 2 € = 20. Man zahlt also das Zwanzigfache des Jahresgewinns." },
      { frage: "Warum zahlen Anleger manchmal viel für Firmen, die heute wenig verdienen?", optionen: ["Weil sie erwarten, dass die Firma in Zukunft viel mehr verdient", "Weil teure Aktien immer weiter steigen", "Weil die Firma ihnen das Geld zurückgarantiert"], richtig: 0, erklaerung: "An der Börse zählen die Erwartungen an die Zukunft. Diese Erwartungen können sich aber als falsch herausstellen." },
      { frage: "Wie nennt man den Börsenwert auch?", optionen: ["Marktkapitalisierung", "Dividende", "Einstandspreis"], richtig: 0, erklaerung: "Börsenwert und Marktkapitalisierung bedeuten dasselbe: Kurs × Anzahl der Aktien." }
    ]
  },

  { id: "nachrichten", modul: 2, titel: "Nachrichten und Kurse", emoji: "📰", dauer: 10,
    einleitung: "Warum ein Kurs an manchen Tagen plötzlich springt, und warum gute Nachrichten nicht immer steigende Kurse bedeuten.",
    karten: [
      { titel: "Quartalszahlen", bild: "📊",
        text: "Große Börsenfirmen müssen regelmäßig berichten, wie es ihnen geht. Viele tun das alle drei Monate, also einmal pro **Quartal**. Diese **Quartalszahlen** zeigen zum Beispiel Umsatz und Gewinn.\nAn solchen Tagen bewegt sich der Kurs oft besonders stark. Denn jetzt sehen alle schwarz auf weiß, ob die Firma so gut läuft wie gedacht. Viele Firmen sagen dabei auch, was sie für die nächsten Monate erwarten." },
      { titel: "Erwartungen schlagen Ergebnisse", bild: "🎢",
        text: "Eine Firma meldet einen Rekordgewinn, und der Kurs fällt trotzdem. Wie kann das sein?\nVor den Zahlen schätzen Fachleute, was herauskommen wird. Diese **Erwartungen** stecken schon im Kurs. Rechnen alle mit 12 Millionen € Gewinn, und es werden „nur“ 10 Millionen, sind viele Anleger enttäuscht, obwohl 10 Millionen viel Geld sind.\n[[An der Börse zählt nicht nur, ob Zahlen gut sind, sondern ob sie besser oder schlechter sind als erwartet.]]" },
      { titel: "Ereignisse in der Firma", bild: "📣",
        text: "Auch einzelne Nachrichten können Kurse bewegen:\n• Ein neues Produkt kommt gut an oder floppt.\n• Ein **Rückruf**: Die Firma muss fehlerhafte Produkte zurückholen. Das kostet Geld und Vertrauen.\n• Ein neuer Chef, ein großer Auftrag, ein Gerichtsverfahren.\nManchmal sind es nur **Gerüchte**, also unbestätigte Meldungen. Sie können einen Kurs kurz hochtreiben oder fallen lassen. Stellt sich das Gerücht als falsch heraus, dreht sich die Bewegung oft wieder um." },
      { titel: "Die ganze Wirtschaft", bild: "🌐",
        text: "Nicht nur Nachrichten über eine Firma zählen, sondern auch über die ganze **Wirtschaft**. Steigen zum Beispiel die **Zinsen**, werden Kredite teurer, und Sparen auf dem Konto bringt mehr. Dann wirken Aktien auf manche Anleger weniger verlockend.\nIn **Krisen**, etwa bei einer Pandemie, einem Krieg oder einer Finanzkrise, fallen oft viele Kurse gleichzeitig, weil die Menschen unsicher sind. Beruhigt sich die Lage, erholen sich die Kurse oft wieder, aber nicht immer schnell.",
        profi: "Im Euroraum legt die **Europäische Zentralbank** (EZB) in Frankfurt die **Leitzinsen** fest. Sie beeinflussen, wie teuer Kredite und wie attraktiv Sparzinsen sind. Deshalb werden ihre Entscheidungen an der Börse genau beobachtet." },
      { titel: "Ruhig bleiben", bild: "🧘",
        text: "Kurse reagieren oft innerhalb von Minuten auf Nachrichten, manchmal übertrieben stark. Wer jede Schlagzeile sofort mit Kaufen oder Verkaufen beantwortet, kommt meist zu spät und zahlt viele Gebühren.\nBesser: Lies die Nachricht, frag dich, ob sie die Firma auf lange Sicht verändert, und entscheide dann in Ruhe. Und denk dran: [[Was in den Nachrichten steht, wissen Millionen andere auch. Meistens steckt es schon im Kurs.]]" }
    ],
    ausprobieren: "Such dir eine Firma aus dem Börsen-Club aus und schau, ob es diese Woche Nachrichten über sie gab, zum Beispiel in der Zeitung oder auf einer Nachrichtenseite. Wie hat sich der Kurs am selben Tag bewegt?",
    quiz: [
      { frage: "Eine Firma meldet mehr Gewinn als im Vorjahr, aber der Kurs fällt. Was ist eine mögliche Erklärung?", optionen: ["Die Anleger hatten noch mehr erwartet", "Bei guten Nachrichten fallen Kurse immer", "Die Börse hat sich verrechnet"], richtig: 0, erklaerung: "Im Kurs stecken schon die Erwartungen. Liegt das Ergebnis darunter, sind Anleger enttäuscht, auch wenn es eigentlich gut ist." },
      { frage: "Was sind Quartalszahlen?", optionen: ["Berichte über Umsatz, Gewinn und mehr für einen Zeitraum von drei Monaten", "Die Kurse der letzten vier Tage", "Die Anzahl der Aktien einer Firma"], richtig: 0, erklaerung: "Ein Quartal sind drei Monate. Quartalszahlen zeigen, wie es der Firma in dieser Zeit ergangen ist." },
      { frage: "Fachleute erwarten 12 Millionen € Gewinn. Die Firma meldet 10 Millionen €. Um wie viele Millionen Euro liegt sie unter der Erwartung?", zahl: 2, einheit: "Mio. €", erklaerung: "12 Millionen € − 10 Millionen € = 2 Millionen €." },
      { frage: "Was ist ein Rückruf?", optionen: ["Eine Firma holt fehlerhafte Produkte von den Kunden zurück", "Eine Firma kauft eigene Aktien zurück", "Ein Telefonat mit der Börse"], richtig: 0, erklaerung: "Bei einem Rückruf muss eine Firma Produkte zurückholen oder reparieren. Das kostet Geld und kann dem Ruf schaden." },
      { frage: "Was ist ein Gerücht an der Börse?", optionen: ["Eine unbestätigte Meldung, die auch falsch sein kann", "Eine offizielle Mitteilung der Firma", "Eine Gebühr für Börsennachrichten"], richtig: 0, erklaerung: "Gerüchte sind nicht bestätigt. Sie können Kurse bewegen, auch wenn nichts dran ist." },
      { frage: "In einer Krise fallen viele Kurse gleichzeitig. Warum?", optionen: ["Viele Menschen sind unsicher und verkaufen", "Alle Firmen gehen sofort pleite", "Die Börse schließt für immer"], richtig: 0, erklaerung: "Unsicherheit führt dazu, dass viele verkaufen wollen. Das Angebot steigt, die Kurse fallen." },
      { frage: "Warum bringt es meist wenig, nach jeder Schlagzeile sofort zu handeln?", optionen: ["Die Nachricht steckt oft schon im Kurs, und jeder Handel kostet Gebühr", "Weil Nachrichten immer falsch sind", "Weil man nur einmal im Jahr handeln darf"], richtig: 0, erklaerung: "Bis du reagierst, haben viele andere die Nachricht längst gelesen. Dazu kommt bei jedem Handel eine Gebühr." }
    ]
  },

  // ---------------------------------------------------------------- Modul 3
  { id: "risiko", modul: 3, titel: "Risiko und Streuen", emoji: "🛡️", dauer: 12,
    einleitung: "Kurse können fallen, auch stark. Hier lernst du, wie man das Risiko verteilt.",
    karten: [
      { titel: "Kurse können fallen", bild: "📉",
        text: "Bisher klang vieles nach steigenden Kursen. Aber: [[Aktienkurse können auch fallen, manchmal sehr stark.]] Dass eine Aktie in einem Jahr die Hälfte ihres Werts verliert, kommt immer wieder vor, auch bei bekannten Firmen.\nDieses Auf und Ab nennt man **Schwankung**. Die Unsicherheit, ob du am Ende mehr oder weniger Geld hast, heißt **Risiko**. Wer Aktien kauft, muss damit leben können.",
        profi: "Fällt eine Aktie um 50 %, muss sie danach um 100 % steigen, nur um wieder beim Ausgangswert zu sein: Von 100 € auf 50 € sind −50 %, von 50 € zurück auf 100 € sind +100 %. Wie stark ein Kurs schwankt, nennen Fachleute **Volatilität**." },
      { titel: "Wenn eine Firma pleitegeht", bild: "💥",
        text: "Das größte Risiko bei einer einzelnen Aktie ist die **Pleite**, auch **Insolvenz** genannt. Kann eine Firma ihre Rechnungen und Schulden nicht mehr bezahlen, bekommen zuerst die **Gläubiger**, also die, denen sie Geld schuldet, was noch übrig ist. Die Aktionäre stehen ganz hinten in der Reihe.\nMeist heißt das: [[Bei einer Pleite kann die Aktie fast oder ganz wertlos werden.]] Das Geld ist dann weg.",
        profi: "Ein bekanntes Beispiel ist **Wirecard**, ein Zahlungsdienstleister aus der Nähe von München. 2018 wurde die Firma in den DAX aufgenommen. 2020 kam heraus, dass rund 1,9 Milliarden €, die in den Büchern standen, offenbar nie existiert hatten. Wirecard meldete Insolvenz an, die Aktie stürzte fast auf null. Es gilt als einer der größten Betrugsfälle der deutschen Wirtschaftsgeschichte." },
      { titel: "Nicht alle Eier in einen Korb", bild: "🥚",
        text: "Stell dir vor, du trägst alle deine Eier in einem einzigen Korb nach Hause. Stolperst du, sind alle kaputt. Verteilst du sie auf mehrere Körbe, geht schlimmstenfalls ein Teil zu Bruch.\nGenau das ist die Idee beim **Streuen**, Fachwort **Diversifikation**: Du verteilst dein Geld auf viele verschiedene Firmen. Geht es einer davon schlecht, trifft dich das nur zum Teil." },
      { titel: "Ein Rechenbeispiel", bild: "🔢",
        text: "Ben und Lina haben je 10 €.\nBen steckt alles in eine einzige Firma. Lina verteilt ihr Geld: je 2 € auf 5 verschiedene Firmen, darunter auch Bens Firma.\nAusgerechnet Bens Firma geht pleite. Ben hat jetzt 0 €.\nLina verliert nur die 2 € in dieser Firma. Bleiben die anderen vier gleich, hat sie noch 8 €.\n[[Streuen schützt nicht vor jedem Verlust, aber davor, dass eine einzige Firma alles mitreißt.]]" },
      { titel: "Klug streuen", bild: "🗺️",
        text: "Fünf Firmen sind besser als eine. Wenn aber alle fünf Autohersteller sind, kann eine Krise der Autobranche alle gleichzeitig treffen.\nDeshalb hilft es, auf verschiedene **Branchen** zu streuen, also Wirtschaftszweige wie Lebensmittel, Technik, Gesundheit oder Versicherungen, und auf verschiedene Länder. Dann ist es unwahrscheinlicher, dass alles auf einmal fällt. Wie man mit wenig Geld sehr breit streut, lernst du in der nächsten Lektion." }
    ],
    ausprobieren: "Schau dir dein Musterdepot an: Auf wie viele Firmen, Branchen und Länder ist dein Geld verteilt? Überlege, was passieren würde, wenn deine größte Aktie plötzlich die Hälfte verliert.",
    quiz: [
      { frage: "Was bedeutet „nicht alle Eier in einen Korb legen“ an der Börse?", optionen: ["Das Geld auf verschiedene Firmen verteilen", "Nur Aktien von Lebensmittelfirmen kaufen", "Alles Geld in eine einzige Aktie stecken"], richtig: 0, erklaerung: "Wer streut, verteilt das Risiko. Geht eine Firma schief, ist nicht gleich alles verloren." },
      { frage: "Lina verteilt 100 € gleichmäßig auf 5 Firmen. Eine geht pleite, die anderen vier steigen um 10 %. Wie viel Geld hat Lina danach?", zahl: 88, einheit: "€", erklaerung: "Pro Firma 20 €. Die Pleite-Firma: 0 €. Die anderen vier: je 20 € + 2 € = 22 €. 4 × 22 € = 88 €." },
      { frage: "Was passiert bei einer Pleite meistens mit der Aktie?", optionen: ["Sie wird fast oder ganz wertlos", "Sie wird automatisch in Geld zurückgetauscht", "Der Staat zahlt den Kaufpreis zurück"], richtig: 0, erklaerung: "Bei einer Insolvenz bekommen zuerst die Gläubiger Geld. Für die Aktionäre bleibt meist nichts oder fast nichts." },
      { frage: "Ist dein Geld gut gestreut, wenn du Aktien von fünf Autoherstellern hast?", optionen: ["Nur teilweise, denn eine Krise der Autobranche trifft alle fünf", "Ja, fünf Firmen sind immer genug", "Ja, Autos braucht man schließlich immer"], richtig: 0, erklaerung: "Gut streuen heißt auch, verschiedene Branchen und Länder zu mischen." },
      { frage: "Profi-Frage: Eine Aktie fällt von 100 € auf 50 €. Um wie viel Prozent muss sie steigen, damit sie wieder bei 100 € ist?", zahl: 100, einheit: "%", erklaerung: "Von 50 € auf 100 € kommen 50 € dazu. Das ist genauso viel wie der neue Kurs selbst, also +100 %." },
      { frage: "Profi-Frage: Was geschah bei Wirecard im Jahr 2020?", optionen: ["Ein großer Betrug kam heraus, und die Firma ging pleite", "Die Firma wurde zum ersten Mal in den DAX aufgenommen", "Die Firma zahlte eine Rekord-Dividende"], richtig: 0, erklaerung: "Rund 1,9 Milliarden € in den Büchern gab es offenbar gar nicht. Wirecard meldete Insolvenz an, die Aktie wurde fast wertlos." },
      { frage: "Welches Fachwort bedeutet „Streuen“?", optionen: ["Diversifikation", "Dividende", "Insolvenz"], richtig: 0, erklaerung: "Diversifikation heißt, das Geld auf viele verschiedene Anlagen zu verteilen." }
    ]
  },

  { id: "etf", modul: 3, titel: "Fonds, Index und ETF", emoji: "🧺", dauer: 12,
    einleitung: "Wie man mit einem einzigen Kauf an Hunderten von Firmen beteiligt sein kann.",
    karten: [
      { titel: "Ein Index ist eine Liste", bild: "📋",
        text: "Den DAX kennst du schon. Er ist ein **Index**: eine Liste von Aktien, deren Kurse zu einem gemeinsamen Wert zusammengerechnet werden. Im DAX sind 40 große deutsche Firmen.\nEs gibt **Indizes** (so heißt die Mehrzahl) für fast alles: für ein Land, eine Branche oder die ganze Welt. Sehr bekannt ist der **MSCI World**. Er enthält über 1.000 Firmen aus vielen Industrieländern, zum Beispiel aus den USA, Japan, Europa und Kanada. [[Ein Index zeigt, wie es einer ganzen Gruppe von Aktien im Schnitt geht.]]" },
      { titel: "Ein Fonds ist ein Korb", bild: "🧺",
        text: "Bei einem **Fonds** legen viele Anleger ihr Geld zusammen. Mit dem großen Topf kauft der Fonds viele verschiedene Aktien. Jeder Anleger besitzt Anteile am Fonds und damit indirekt ein kleines Stück von allem, was im Korb liegt.\nDas ist praktisch: Mit 1.000 € könntest du kaum selbst Aktien von 50 Firmen kaufen, schon wegen der Gebühren. Mit einem einzigen Fondsanteil geht das." },
      { titel: "ETF: der Index zum Kaufen", bild: "🛒",
        text: "Bei vielen Fonds sucht ein **Fondsmanager** die Aktien aus. Das kostet Geld, und es klappt nicht immer besser als der Markt.\nEin **ETF** macht es einfacher: Er bildet einen Index nach. Ein DAX-ETF kauft einfach die 40 DAX-Firmen im passenden Verhältnis. Niemand muss raten, welche Firma die beste ist. Deshalb sind die **Kosten** meist niedrig.\nEin ETF wird an der Börse gehandelt wie eine Aktie. Er hat einen Kurs und lässt sich jederzeit kaufen und verkaufen.",
        profi: "ETF steht für „Exchange Traded Fund“, auf Deutsch „börsengehandelter Fonds“. Die jährlichen Kosten werden als Prozentsatz angegeben, oft unter der Abkürzung **TER** (Gesamtkostenquote). Bei großen ETFs auf bekannte Indizes liegen sie meist deutlich unter 0,5 % pro Jahr." },
      { titel: "Gestreut, aber nicht ohne Risiko", bild: "⚠️",
        text: "Ein ETF auf einen großen Index ist automatisch breit gestreut. Geht eine Firma darin pleite, ist das nur ein kleiner Teil des Ganzen.\nAber: [[Auch ETFs können fallen.]] Wenn in einer Krise fast alle Aktien sinken, sinkt auch der ETF. Ein ETF schützt vor dem Pech mit einer einzelnen Firma, nicht vor dem Auf und Ab der ganzen Börse.\nUnd nicht jeder ETF ist breit gestreut. Es gibt auch welche, die nur auf eine einzige Branche oder ein kleines Land setzen." },
      { titel: "ETFs im Börsen-Club", bild: "🎒",
        text: "Im Musterdepot gibt es zwei ETFs:\n• einen auf den **MSCI World**: Damit steckt dein Geld in über 1.000 Firmen aus vielen Industrieländern.\n• einen auf den **DAX**: Damit bist du an den 40 großen deutschen Börsenfirmen beteiligt.\nDu kaufst und verkaufst sie wie jede andere Aktie, auch hier mit 1 € Gebühr. Beobachte doch mal, wie sich die ETFs im Vergleich zu einzelnen Aktien entwickeln.",
        profi: "Im MSCI World haben Firmen aus den USA einen sehr großen Anteil, weil dort viele der wertvollsten Börsenfirmen sitzen. „World“ heißt also nicht, dass alle Länder gleich viel zählen. Länder wie China oder Indien sind gar nicht dabei, weil sie als **Schwellenländer** gelten und nicht als Industrieländer." }
    ],
    ausprobieren: "Schau dir in der App die beiden ETFs an. Welche Firmen aus dem Börsen-Club könnten im DAX-ETF stecken? Tipp: Es sind große deutsche Börsenfirmen.",
    quiz: [
      { frage: "Was ist ein Index?", optionen: ["Eine Liste von Aktien, deren Kurse zu einem gemeinsamen Wert zusammengerechnet werden", "Eine einzelne, besonders teure Aktie", "Ein Konto für Wertpapiere"], richtig: 0, erklaerung: "Ein Index wie der DAX zeigt, wie sich eine Gruppe von Aktien im Schnitt entwickelt." },
      { frage: "Was macht ein ETF?", optionen: ["Er bildet einen Index nach, zum Beispiel den DAX", "Er sucht jeden Tag die eine beste Aktie aus", "Er garantiert, dass man kein Geld verliert"], richtig: 0, erklaerung: "Ein ETF kauft die Aktien eines Index im passenden Verhältnis. Eine Garantie gibt es nicht." },
      { frage: "Warum sind ETFs meist günstig?", optionen: ["Niemand muss aufwendig Aktien aussuchen, der ETF folgt einfach dem Index", "Weil der Staat die Kosten übernimmt", "Weil sie keinen Kurs haben"], richtig: 0, erklaerung: "Ein Index ist eine feste Liste. Das Nachbilden ist viel weniger Arbeit als das ständige Auswählen durch einen Fondsmanager." },
      { frage: "Ungefähr wie viele Firmen enthält der MSCI World?", optionen: ["Über 1.000", "Genau 40", "Etwa 10"], richtig: 0, erklaerung: "Der MSCI World umfasst über 1.000 Firmen aus vielen Industrieländern. 40 Firmen hat der DAX." },
      { frage: "Kann ein ETF an Wert verlieren?", optionen: ["Ja, wenn die Aktien darin fallen", "Nein, niemals", "Nur am Wochenende"], richtig: 0, erklaerung: "Ein ETF ist nur so viel wert wie die Aktien darin. Fallen sie, fällt auch der ETF." },
      { frage: "Ein ETF kostet 0,2 % pro Jahr. Wie viel Euro Kosten sind das bei 1.000 € in einem Jahr?", zahl: 2, einheit: "€", erklaerung: "1 % von 1.000 € sind 10 €. 0,2 % sind ein Fünftel davon, also 2 €." },
      { frage: "In welchem der beiden ETFs im Börsen-Club stecken mehr Firmen?", optionen: ["Im MSCI-World-ETF", "Im DAX-ETF", "In beiden gleich viele"], richtig: 0, erklaerung: "Der MSCI-World-ETF enthält über 1.000 Firmen, der DAX-ETF 40." }
    ]
  },

  { id: "zeit", modul: 3, titel: "Zeit und Zinseszins", emoji: "⛄", dauer: 12,
    einleitung: "Warum Geduld an der Börse so wichtig ist, und was ein Schneeball damit zu tun hat.",
    karten: [
      { titel: "Der Schneeball-Effekt", bild: "⛄",
        text: "Rollst du einen kleinen Schneeball durch den Schnee, bleibt immer mehr Schnee an ihm hängen. Je größer er wird, desto schneller wächst er.\nMit Geld kann es ähnlich sein. Bekommst du auf dein Geld einen Ertrag und legst ihn wieder mit an, bringt beim nächsten Mal auch dieser Ertrag etwas ein. Das nennt man **Zinseszins**: Zinsen auf die Zinsen. [[Je länger das Geld Zeit hat, desto stärker wirkt der Zinseszins.]]" },
      { titel: "Rechnen wir mal", bild: "🧮",
        text: "Oma Rosi legt 100 € an. Nehmen wir an, das Geld wächst jedes Jahr um 10 %.\nNach 1 Jahr: 100 € + 10 € = 110 €.\nNach 2 Jahren: 110 € + 11 € = 121 €.\nNach 3 Jahren: 121 € + 12,10 € = 133,10 €.\nIm zweiten Jahr kommen schon 11 € dazu statt 10 €, weil die ersten 10 € mitarbeiten. Aber: [[Die 10 % sind nur ein Rechenbeispiel.]] Aktien bringen nicht jedes Jahr gleich viel, und manche Jahre enden mit Verlust.",
        profi: "Mit der **72er-Regel** schätzt du, wie lange es dauert, bis sich Geld verdoppelt: 72 ÷ Prozent pro Jahr. Bei 10 % sind das etwa 7,2 Jahre, bei 6 % etwa 12 Jahre. Das ist nur eine Faustregel, aber eine erstaunlich gute." },
      { titel: "Langfristig statt kurzfristig", bild: "🐢",
        text: "Kurzfristig, also über Tage oder Wochen, lassen sich Aktienkurse kaum vorhersagen. Sie springen hoch und runter, oft ohne klaren Grund.\nÜber viele Jahre ging es bei breit gestreuten Aktien in der Vergangenheit meistens nach oben, weil Firmen wachsen und Gewinne machen. Aber: [[Was früher war, ist keine Garantie für die Zukunft.]] Es gab auch lange Zeiträume, in denen die Kurse in manchen Ländern nicht gestiegen sind." },
      { titel: "Schwankungen aushalten", bild: "🌊",
        text: "Wer langfristig anlegt, erlebt zwischendurch auch schlechte Zeiten. Es kann passieren, dass ein Depot 20 oder 30 % im Minus ist.\nViele verkaufen dann aus Angst und verpassen die Erholung, falls sie kommt. Deshalb gilt: [[Leg nur Geld an, das du viele Jahre lang nicht brauchst.]] Das Geld für das neue Fahrrad im Sommer gehört nicht in Aktien. Dann musst du in einer schlechten Phase auch nicht verkaufen." },
      { titel: "Und im echten Leben?", bild: "👨‍👩‍👧",
        text: "Der Börsen-Club ist ein Spiel mit Spielgeld. Wenn du später echtes Geld anlegen möchtest, gilt: Unter 18 Jahren geht ein echtes Depot nur zusammen mit deinen Eltern. Sie müssen zustimmen und entscheiden mit.\nDas ist auch gut so. Sprecht gemeinsam darüber, was ihr vorhabt, welche Risiken es gibt und wie lange das Geld liegen bleiben soll. Der Börsen-Club ist ein guter Ort, um vorher zu üben." }
    ],
    ausprobieren: "Rechne mit dem Taschenrechner Jahr für Jahr aus, was aus 100 € nach 5 Jahren würde, wenn sie jedes Jahr um 10 % wachsen. Zur Kontrolle: Es sind etwas mehr als 161 €.",
    quiz: [
      { frage: "100 € wachsen 3 Jahre lang um 10 % pro Jahr. Wie viel Geld ist es am Ende?", zahl: 133.1, einheit: "€", erklaerung: "Jahr 1: 100 € + 10 € = 110 €. Jahr 2: 110 € + 11 € = 121 €. Jahr 3: 121 € + 12,10 € = 133,10 €." },
      { frage: "200 € wachsen 2 Jahre lang um 5 % pro Jahr. Wie viel ist es dann?", zahl: 220.5, einheit: "€", erklaerung: "Jahr 1: 200 € + 10 € = 210 €. Jahr 2: 210 € + 10,50 € = 220,50 €." },
      { frage: "Was ist der Zinseszins?", optionen: ["Man bekommt auch auf früher erhaltene Zinsen wieder Zinsen", "Eine Strafgebühr der Bank", "Der Zins, den man nur im ersten Jahr bekommt"], richtig: 0, erklaerung: "Bleiben die Erträge angelegt, arbeiten sie mit. So wächst das Geld von Jahr zu Jahr schneller." },
      { frage: "Welches Geld sollte man in Aktien anlegen?", optionen: ["Geld, das man viele Jahre lang nicht braucht", "Das Geld für die Klassenfahrt im nächsten Monat", "Geliehenes Geld"], richtig: 0, erklaerung: "Wer das Geld bald braucht, muss vielleicht gerade dann verkaufen, wenn die Kurse niedrig sind." },
      { frage: "Profi-Frage: Wie viele Jahre dauert es nach der 72er-Regel ungefähr, bis sich Geld bei 8 % pro Jahr verdoppelt?", zahl: 9, einheit: "Jahre", erklaerung: "72 ÷ 8 = 9 Jahre." },
      { frage: "Kann eine 13-Jährige allein ein echtes Depot eröffnen?", optionen: ["Nein, unter 18 nur zusammen mit den Eltern", "Ja, ab 10 Jahren", "Ja, wenn sie genug Taschengeld hat"], richtig: 0, erklaerung: "Minderjährige brauchen für ein echtes Depot ihre Eltern, die zustimmen und mitentscheiden." },
      { frage: "Warum ist es riskant, Geld in Aktien anzulegen, das man bald braucht?", optionen: ["Die Kurse können gerade dann gefallen sein, wenn man das Geld braucht", "Aktien kann man nie wieder verkaufen", "Aktien sind nur am Jahresende etwas wert"], richtig: 0, erklaerung: "Kurzfristig schwanken Kurse stark. Wer verkaufen muss, kann dann einen Verlust erleiden." }
    ]
  },

  { id: "gefuehle", modul: 3, titel: "Gefühle an der Börse", emoji: "🎭", dauer: 10,
    einleitung: "An der Börse ist dein größter Gegner manchmal dein eigener Kopf.",
    karten: [
      { titel: "Gier und Angst", bild: "😬",
        text: "Zwei Gefühle spielen an der Börse eine riesige Rolle: **Gier** und **Angst**.\nSteigt eine Aktie, denken viele: „Da muss ich auch rein, bevor es zu spät ist!“ Sie kaufen, wenn der Preis schon hoch ist. Fällt die Aktie, bekommen viele Panik und verkaufen, wenn der Preis schon niedrig ist. Das nennt man **Panikverkauf**.\nGenau so verliert man Geld: [[teuer kaufen, billig verkaufen.]] Gefühle sind normal. Wichtig ist, sie zu bemerken, bevor du handelst." },
      { titel: "Herdentrieb und Hype", bild: "🐑",
        text: "Menschen machen gern, was andere tun. Das nennt man **Herdentrieb**. Reden alle über eine Aktie, wirkt sie automatisch interessant.\nWird eine Aktie plötzlich überall gefeiert und steigt sehr schnell, spricht man von einem **Hype**. Manchmal steckt etwas dahinter, oft aber vor allem Begeisterung. Kippt die Stimmung, kann der Kurs genauso schnell wieder fallen. Wer zuletzt eingestiegen ist, trifft es dann oft am härtesten." },
      { titel: "Geheimtipps und Finfluencer", bild: "📱",
        text: "Im Netz versprechen manche: „Diese Aktie verdoppelt sich garantiert!“ Leute, die online über Geld und Aktien reden, heißen **Finfluencer** (aus „Finanzen“ und „Influencer“).\nManche erklären gut. Andere werden dafür bezahlt, etwas anzupreisen, oder besitzen die Aktie selbst und wollen, dass der Kurs steigt.\n[[Wer „garantiert“, „sicher“ oder „Geheimtipp“ sagt, sollte dich misstrauisch machen.]] Niemand kennt die Zukunft der Kurse.",
        profi: "Eine verbotene Masche heißt **Pump and Dump**: Betrüger kaufen billig Aktien einer kleinen Firma, treiben den Kurs mit Werbung und Gerüchten hoch („pump“) und verkaufen dann an die Neuen („dump“). Zurück bleiben Anleger mit stark gefallenen Aktien." },
      { titel: "Zu viel Handeln kostet", bild: "💸",
        text: "Bei jedem Kauf und Verkauf fällt eine Gebühr an, im Börsen-Club 1 €. Klingt wenig. Wer aber ständig hin und her handelt, merkt es.\nBeispiel: Ben gibt in einem Monat 20 Orders auf. Das sind 20 € Gebühren. Seine Aktien müssen also erst einmal 20 € zulegen, damit er überhaupt bei null ist.\nUntersuchungen deuten immer wieder darauf hin, dass Anleger, die sehr oft handeln, im Schnitt schlechter abschneiden als geduldige." },
      { titel: "Deine eigenen Regeln", bild: "📝",
        text: "Viele erfahrene Anleger schreiben sich Regeln auf, bevor sie handeln. Dann entscheiden sie nicht aus dem Bauch heraus. Das kannst du auch. Zum Beispiel:\n• „Ich kaufe nur Firmen, deren Geschäft ich erklären kann.“\n• „Ich verteile mein Geld auf mehrere Aktien.“\n• „Ich schlafe eine Nacht darüber, bevor ich etwas verkaufe.“\n[[Wer eigene Regeln hat, lässt sich weniger von Gier und Angst treiben.]]" }
    ],
    ausprobieren: "Schreib drei eigene Regeln für dein Musterdepot auf und häng den Zettel dorthin, wo du ihn oft siehst. Schau nach einem Monat nach: Hast du dich daran gehalten?",
    quiz: [
      { frage: "Eine Aktie ist in einer Woche um 40 % gestiegen, und alle reden darüber. Was ist eine vernünftige Reaktion?", optionen: ["In Ruhe prüfen, was hinter der Firma steckt, statt sofort zu kaufen", "Sofort mit allem Geld kaufen, bevor es zu spät ist", "Allen Freunden sagen, dass sie garantiert weiter steigt"], richtig: 0, erklaerung: "Nach einem schnellen Anstieg ist der Preis schon hoch. Wer aus Angst, etwas zu verpassen, kauft, kauft oft teuer." },
      { frage: "Was ist ein Hype?", optionen: ["Große Begeisterung, die einen Kurs schnell hochtreibt", "Ein Gesetz für die Börse", "Eine besonders sichere Aktie"], richtig: 0, erklaerung: "Bei einem Hype steigt der Kurs vor allem wegen der Stimmung. Kippt sie, kann er schnell fallen." },
      { frage: "Ein Video verspricht: „Diese Aktie verdoppelt sich garantiert!“ Was denkst du?", optionen: ["Vorsicht, niemand kann Kursgewinne garantieren", "Super, dann kaufe ich sofort", "Das stimmt bestimmt, sonst dürfte man es nicht sagen"], richtig: 0, erklaerung: "Kurse kann niemand vorhersagen. Wer etwas garantiert, will oft selbst daran verdienen." },
      { frage: "Lina gibt in einem Monat 15 Orders auf. Wie viel Gebühren zahlt sie im Börsen-Club?", zahl: 15, einheit: "€", erklaerung: "Jede Order kostet 1 €: 15 × 1 € = 15 €." },
      { frage: "Was ist der Herdentrieb?", optionen: ["Man macht, was viele andere tun", "Man kauft nur Aktien von Bauernhöfen", "Man handelt nur einmal im Jahr"], richtig: 0, erklaerung: "Menschen orientieren sich gern an anderen. An der Börse kann das zu übertriebenen Bewegungen führen." },
      { frage: "Warum sind Panikverkäufe oft ein Fehler?", optionen: ["Man verkauft, wenn der Kurs schon niedrig ist, und verpasst eine mögliche Erholung", "Verkaufen ist an der Börse verboten", "Man zahlt dann die doppelte Gebühr"], richtig: 0, erklaerung: "Wer aus Angst verkauft, macht einen Buchverlust zu einem echten Verlust und ist nicht mehr dabei, falls der Kurs sich erholt." }
    ]
  },

  { id: "fuehrerschein", modul: 3, titel: "Börsen-Führerschein", emoji: "🎓", dauer: 15,
    abschluss: true, bestehen: 12,
    einleitung: "Zeig, was du gelernt hast: Hier ist die Abschlussprüfung des Börsen-Clubs.",
    karten: [
      { titel: "So geht's", bild: "📝",
        text: "Dich erwarten 15 Fragen aus allen Lektionen, darunter einige Rechenaufgaben. Sie sind etwas kniffliger als in den einzelnen Lektionen. Nimm dir Zeit, rechne in Ruhe und leg dir einen Zettel bereit.\n[[Ab 12 richtigen Antworten hast du bestanden]] und bekommst deinen Börsen-Führerschein. Klappt es noch nicht, schau dir die Lektionen noch einmal an und versuch es dann erneut. Viel Erfolg!" }
    ],
    quiz: [
      { frage: "Was besitzt du, wenn du eine Aktie kaufst?", optionen: ["Einen kleinen Anteil an einem Unternehmen", "Ein Recht auf feste Zinsen", "Einen Gutschein für die Produkte der Firma"], richtig: 0, erklaerung: "Mit einer Aktie wirst du Miteigentümer. Feste Zinsen gibt es bei einem Kredit, nicht bei einer Aktie." },
      { frage: "Eine Firma gibt bei ihrem Börsengang neue Aktien aus. Wer bekommt das Geld für diese neuen Aktien?", optionen: ["Die Firma", "Die Börse in Frankfurt", "Die Firmen im DAX"], richtig: 0, erklaerung: "Beim Börsengang fließt das Geld für neue Aktien an die Firma. Später handeln die Anleger meist untereinander." },
      { frage: "Ein Jahr später kauft Ben eine Aktie dieser Firma an der Börse. Wohin geht sein Geld meistens?", optionen: ["An den Anleger, der ihm die Aktie verkauft", "An die Firma", "An die Hauptversammlung"], richtig: 0, erklaerung: "Im normalen Börsenhandel wechselt die Aktie von einem Anleger zum nächsten. Die Firma bekommt dabei kein Geld." },
      { frage: "Du hast 1.000 € Spielgeld und kaufst 6 Aktien zu je 85 €. Wie viel Spielgeld hast du danach noch?", zahl: 489, einheit: "€", erklaerung: "6 × 85 € = 510 €, plus 1 € Gebühr = 511 €. 1.000 € − 511 € = 489 €." },
      { frage: "Welche Aussage über den Kurs stimmt?", optionen: ["Ein hoher Kurs allein sagt nichts über die Größe der Firma", "Die Aktie mit dem höchsten Kurs gehört immer zur größten Firma", "Der Kurs wird einmal im Jahr von der Firma festgelegt"], richtig: 0, erklaerung: "Für die Größe braucht man den Börsenwert: Kurs × Anzahl der Aktien. Der Kurs entsteht durch Angebot und Nachfrage." },
      { frage: "Eine Pizzeria verkauft in einem Monat 1.500 Pizzen zu je 9 €. Die Fixkosten betragen 8.000 €, die variablen Kosten 3 € pro Pizza. Wie hoch ist der Gewinn?", zahl: 1000, einheit: "€", erklaerung: "Umsatz: 1.500 × 9 € = 13.500 €. Kosten: 8.000 € + 1.500 × 3 € = 12.500 €. Gewinn: 13.500 € − 12.500 € = 1.000 €." },
      { frage: "Eine Firma meldet steigende Gewinne, trotzdem fällt der Kurs. Was ist die wahrscheinlichste Erklärung?", optionen: ["Die Anleger hatten mit noch mehr gerechnet", "Die Börse hat sich verrechnet", "Steigende Gewinne lassen Kurse immer fallen"], richtig: 0, erklaerung: "Im Kurs stecken die Erwartungen. Liegt das Ergebnis darunter, kann der Kurs fallen, obwohl die Zahlen gut sind." },
      { frage: "Eine Videoplattform ist für die Nutzer kostenlos und zeigt Werbung. Wer bezahlt die Plattform hauptsächlich?", optionen: ["Die Firmen, die dort Werbung schalten", "Die Börse", "Niemand, sie arbeitet umsonst"], richtig: 0, erklaerung: "Bei werbefinanzierten Diensten bezahlen die Werbekunden. Die Nutzer bezahlen mit ihrer Aufmerksamkeit." },
      { frage: "Eine Firma hat 50 Millionen Aktien, jede kostet 12 €. Wie hoch ist ihr Börsenwert in Millionen Euro?", zahl: 600, einheit: "Mio. €", erklaerung: "12 € × 50 Millionen = 600 Millionen €." },
      { frage: "Was ist ein ETF?", optionen: ["Ein börsengehandelter Fonds, der einen Index nachbildet", "Eine einzelne Aktie mit besonders hoher Dividende", "Ein Sparbuch mit festen Zinsen"], richtig: 0, erklaerung: "Ein ETF kauft alle Aktien eines Index im passenden Verhältnis und wird an der Börse gehandelt." },
      { frage: "Warum verringert Streuen das Risiko?", optionen: ["Die Pleite einer einzelnen Firma trifft nur einen Teil des Geldes", "Gestreute Aktien können nicht fallen", "Wer streut, zahlt keine Gebühren"], richtig: 0, erklaerung: "Streuen schützt vor dem Totalverlust durch eine einzige Firma, aber nicht davor, dass die ganze Börse fällt." },
      { frage: "500 € wachsen 2 Jahre lang um 10 % pro Jahr. Wie viel Geld ist es dann?", zahl: 605, einheit: "€", erklaerung: "Jahr 1: 500 € + 50 € = 550 €. Jahr 2: 550 € + 55 € = 605 €." },
      { frage: "Lina hat einen Buchgewinn von 30 €. Was bedeutet das?", optionen: ["Ihre Aktien sind mehr wert als beim Kauf, sicher ist der Gewinn aber erst beim Verkauf", "Sie hat 30 € auf ihr Konto überwiesen bekommen", "Sie muss 30 € Gebühr zahlen"], richtig: 0, erklaerung: "Ein Buchgewinn steht nur auf dem Papier. Bis zum Verkauf kann der Kurs wieder fallen." },
      { frage: "Wann wurde die Hamburger Börse gegründet, die älteste Börse Deutschlands?", optionen: ["1558", "1858", "1958"], richtig: 0, erklaerung: "Die Hamburger Börse wurde 1558 gegründet, lange bevor es in Deutschland Aktien zu kaufen gab." },
      { frage: "Jemand schreibt dir: „Geheimtipp! Kauf schnell, der Kurs verdoppelt sich sicher!“ Wie reagierst du am besten?", optionen: ["Misstrauisch sein, denn niemand kann sichere Kursgewinne versprechen", "Schnell kaufen, bevor es andere tun", "Den Tipp ungeprüft an alle Freunde weiterschicken"], richtig: 0, erklaerung: "Versprechen wie „sicher“ oder „garantiert“ sind ein Warnzeichen. Oft will der Absender selbst daran verdienen." }
    ]
  }
];

BC.firmen = {
  ADS: {
    text: "Adidas ist einer der größten Sportartikelhersteller der Welt. Die Firma stellt Sportschuhe, Sportkleidung und Ausrüstung her, zum Beispiel für Fußball, Laufen und Freizeit.",
    verdient: "Adidas verkauft seine Produkte über Sportgeschäfte, eigene Läden und den eigenen Onlineshop.",
    sitz: "Herzogenaurach, Deutschland",
    wusstest: "Der Name kommt vom Gründer Adolf „Adi“ Dassler. Sein Bruder Rudolf gründete in derselben Kleinstadt die Firma Puma."
  },
  PUM: {
    text: "Puma stellt Sportschuhe, Sportkleidung und Zubehör her, etwa für Fußball, Laufen und Motorsport. Die Marke ist in vielen Ländern bekannt.",
    verdient: "Puma verkauft seine Produkte über Händler, eigene Läden und online.",
    sitz: "Herzogenaurach, Deutschland",
    wusstest: "Puma wurde 1948 von Rudolf Dassler gegründet, dem Bruder des Adidas-Gründers. Beide Firmen sitzen bis heute in Herzogenaurach."
  },
  BEI: {
    text: "Beiersdorf ist ein Hamburger Konzern für Haut- und Körperpflege. Bekannte Marken sind Nivea, Eucerin, Labello und Hansaplast. Zu Beiersdorf gehört auch tesa, bekannt für Klebeband.",
    verdient: "Beiersdorf verkauft Cremes, Pflegeprodukte und Pflaster über Drogerien, Supermärkte und Apotheken. Die Tochter tesa verkauft Klebebänder und Klebelösungen an Privatleute und an die Industrie.",
    sitz: "Hamburg, Deutschland",
    wusstest: "Der Name Nivea kommt vom lateinischen Wort für „schneeweiß“."
  },
  BMW: {
    text: "BMW steht für Bayerische Motoren Werke. Der Konzern baut Autos der Marken BMW, Mini und Rolls-Royce sowie BMW-Motorräder.",
    verdient: "BMW verkauft Autos und Motorräder in aller Welt. Dazu kommt Geld aus Ersatzteilen, Werkstattleistungen und Autofinanzierungen.",
    sitz: "München, Deutschland",
    wusstest: "BMW hat ursprünglich Flugzeugmotoren gebaut, Autos kamen erst später dazu."
  },
  MBG: {
    text: "Die Mercedes-Benz Group baut Autos und Transporter der Marke Mercedes-Benz. Die Marke ist besonders für Autos der gehobenen Klasse bekannt.",
    verdient: "Mercedes-Benz verkauft Autos und Transporter weltweit. Dazu kommt Geld aus Leasing, Finanzierungen und Serviceleistungen.",
    sitz: "Stuttgart, Deutschland",
    wusstest: "Carl Benz meldete 1886 ein Patent für seinen Motorwagen an. 1888 fuhr seine Frau Bertha Benz damit von Mannheim nach Pforzheim, eine der ersten längeren Autofahrten der Geschichte."
  },
  VOW3: {
    text: "Volkswagen ist einer der größten Autokonzerne der Welt. Dazu gehören viele Marken, zum Beispiel VW, Audi, Škoda, Seat, Cupra, Porsche und Lamborghini. Das Kürzel VOW3 steht für die Vorzugsaktie: Sie hat meist kein Stimmrecht auf der Hauptversammlung, dafür gibt es oft etwas mehr Dividende als bei der Stammaktie mit Stimmrecht.",
    verdient: "Volkswagen verkauft Autos, Transporter und Lastwagen. Dazu kommt Geld aus Ersatzteilen, Werkstätten und Autofinanzierungen.",
    sitz: "Wolfsburg, Deutschland",
    wusstest: "Vom VW Käfer wurden weltweit über 21 Millionen Stück gebaut."
  },
  P911: {
    text: "Die Porsche AG baut Sportwagen, zum Beispiel den Porsche 911, den Cayenne und den elektrischen Taycan. Die Firma ging 2022 an die Börse und gehört mehrheitlich zum Volkswagen-Konzern.",
    verdient: "Porsche verkauft teure Sportwagen in vergleichsweise kleiner Stückzahl. Dazu kommt Geld aus Zubehör, Service und Finanzierungen.",
    sitz: "Stuttgart, Deutschland",
    wusstest: "Das Börsenkürzel P911 ist eine Anspielung auf den berühmtesten Porsche, den 911."
  },
  SAP: {
    text: "SAP ist einer der größten Softwarehersteller der Welt. Viele Firmen nutzen SAP-Programme, um zum Beispiel ihre Buchhaltung, ihren Einkauf, ihr Lager oder ihr Personal zu verwalten.",
    verdient: "SAP verdient vor allem mit Software-Abos aus der Cloud, mit Lizenzen und Wartung sowie mit Beratung für Firmenkunden.",
    sitz: "Walldorf, Deutschland",
    wusstest: "SAP wurde 1972 von fünf ehemaligen IBM-Mitarbeitern gegründet."
  },
  SIE: {
    text: "Siemens ist ein großer Technologiekonzern. Die Firma liefert Technik für Fabriken, Gebäude, Stromnetze und Züge, dazu viel Software, mit der Maschinen gesteuert werden.",
    verdient: "Siemens verkauft Maschinen, Steuerungen, Software und Züge vor allem an andere Firmen, Städte und Bahnbetreiber.",
    sitz: "München, Deutschland",
    wusstest: "Werner von Siemens gründete die Firma 1847 in Berlin. Anfangs baute sie Telegrafen, mit denen man Nachrichten über Drähte schicken konnte."
  },
  DTE: {
    text: "Die Deutsche Telekom ist einer der größten Telefon- und Internetanbieter Europas. Bekannt ist sie unter der Marke Telekom mit der Farbe Magenta. In den USA gehört ihr ein großer Teil von T-Mobile US.",
    verdient: "Die Telekom verdient mit Handyverträgen, Internet- und Festnetzanschlüssen und Fernsehangeboten. Ein großer Teil des Geschäfts kommt inzwischen aus den USA.",
    sitz: "Bonn, Deutschland",
    wusstest: "Die Telekom ging 1996 an die Börse. Damals kauften viele Menschen in Deutschland zum ersten Mal überhaupt eine Aktie."
  },
  ALV: {
    text: "Die Allianz ist eine der größten Versicherungsgruppen der Welt. Sie versichert zum Beispiel Autos, Häuser und Gesundheit und bietet Altersvorsorge an. Außerdem verwaltet sie Geld für andere Anleger.",
    verdient: "Kunden zahlen regelmäßig Beiträge für ihre Versicherung. Die Allianz legt dieses Geld an, bis Schäden bezahlt werden müssen. Für das Verwalten von fremdem Geld bekommt sie Gebühren.",
    sitz: "München, Deutschland",
    wusstest: "Das Fußballstadion Allianz Arena in München trägt den Namen der Versicherung."
  },
  DHL: {
    text: "Die DHL Group, früher Deutsche Post DHL, bringt Briefe und Pakete zu ihren Empfängern. Weltweit transportiert sie Expresssendungen und Fracht und betreibt Lager für andere Firmen.",
    verdient: "DHL verdient an Gebühren für Briefe, Pakete, Expresslieferungen und Frachttransporte sowie an Lager- und Logistikdiensten für Onlinehändler und Industrie.",
    sitz: "Bonn, Deutschland",
    wusstest: "Der Name DHL setzt sich aus den Anfangsbuchstaben der drei Gründer Dalsey, Hillblom und Lynn zusammen."
  },
  LHA: {
    text: "Die Lufthansa ist die größte Fluggesellschaft Deutschlands. Zur Gruppe gehören auch Swiss, Austrian Airlines, Brussels Airlines und Eurowings sowie eine Frachtfluglinie und ein Wartungsbetrieb für Flugzeuge.",
    verdient: "Lufthansa verkauft Flugtickets und transportiert Fracht. Die Tochter Lufthansa Technik verdient Geld mit der Wartung und Reparatur von Flugzeugen, auch für andere Fluggesellschaften.",
    sitz: "Köln, Deutschland",
    wusstest: "Lufthansa Technik hat ihren Hauptsitz in Hamburg, direkt am Flughafen."
  },
  ZAL: {
    text: "Zalando ist ein Onlineshop für Mode, Schuhe und Accessoires. Die Firma liefert in viele europäische Länder.",
    verdient: "Zalando verkauft eigene Ware und lässt andere Marken über seine Plattform verkaufen, wofür diese eine Provision zahlen. Dazu kommen Werbung und Logistikdienste für andere Händler.",
    sitz: "Berlin, Deutschland",
    wusstest: "Zalando wurde 2008 in Berlin gegründet und hat anfangs nur Schuhe verkauft."
  },
  HLAG: {
    text: "Hapag-Lloyd ist eine der größten Container-Reedereien der Welt. Ihre Schiffe transportieren Waren in Containern über die Ozeane, zum Beispiel Kleidung, Elektronik oder Lebensmittel.",
    verdient: "Hapag-Lloyd bekommt von Firmen Geld dafür, ihre Container von Hafen zu Hafen zu bringen. Wie viel, hängt stark davon ab, wie viel Platz auf Schiffen gerade gefragt ist.",
    sitz: "Hamburg, Deutschland",
    wusstest: "Die Wurzeln der Firma reichen bis 1847 zurück, als in Hamburg die Reederei HAPAG gegründet wurde."
  },
  FIE: {
    text: "Fielmann ist eine große Optikerkette. In vielen Filialen gibt es Brillen, Sonnenbrillen und Kontaktlinsen, inzwischen auch Hörgeräte.",
    verdient: "Fielmann verkauft Brillen und Hörgeräte in eigenen Filialen und online. Der größte Teil des Geschäfts kommt aus Deutschland, dazu kommen Filialen in Nachbarländern.",
    sitz: "Hamburg, Deutschland",
    wusstest: "Günther Fielmann eröffnete sein erstes Geschäft 1972 in Cuxhaven. Die Firma wird bis heute von der Familie Fielmann geführt."
  },
  AAPL: {
    text: "Apple entwickelt iPhones, Mac-Computer, iPads, die Apple Watch und Kopfhörer. Dazu kommen Dienste wie App Store, iCloud, Apple Music und Apple TV+.",
    verdient: "Den größten Teil verdient Apple mit dem Verkauf von iPhones. Immer wichtiger werden Dienste: Apple bekommt zum Beispiel einen Anteil, wenn im App Store etwas gekauft wird.",
    sitz: "Cupertino, Kalifornien, USA",
    wusstest: "Apple wurde 1976 unter anderem von Steve Jobs und Steve Wozniak gegründet. Ihr erstes Produkt war ein Computer, den Wozniak selbst entworfen hatte."
  },
  MSFT: {
    text: "Microsoft entwickelt Software wie Windows und Office, betreibt mit Azure eine der größten Cloud-Plattformen der Welt und stellt die Spielkonsole Xbox her.",
    verdient: "Microsoft verdient mit Software-Abos für Firmen und Privatleute, mit Rechenleistung und Speicher in der Cloud sowie mit Spielen und Konsolen.",
    sitz: "Redmond, Washington, USA",
    wusstest: "Minecraft gehört zu Microsoft. Die Firma hat das Spiel 2014 gekauft."
  },
  GOOGL: {
    text: "Alphabet ist die Muttergesellschaft von Google. Dazu gehören die Google-Suche, YouTube, das Handy-Betriebssystem Android, Google Maps und eine große Cloud-Sparte.",
    verdient: "Den größten Teil verdient Alphabet mit Werbung, zum Beispiel neben Suchergebnissen und in YouTube-Videos. Dazu kommen Cloud-Dienste, Abos wie YouTube Premium und der Play Store.",
    sitz: "Mountain View, Kalifornien, USA",
    wusstest: "Der Name Google ist angelehnt an „Googol“, eine Zahl mit einer Eins und hundert Nullen."
  },
  AMZN: {
    text: "Amazon betreibt einen der größten Onlineshops der Welt. Dazu gehören das Abo Prime mit Video-Streaming, die Sprachassistentin Alexa und mit AWS eine riesige Cloud-Sparte.",
    verdient: "Amazon verkauft Waren selbst und bekommt Gebühren von anderen Händlern auf dem Marktplatz. Dazu kommen Prime-Abos, Werbung und vor allem die Cloud-Dienste von AWS.",
    sitz: "Seattle, Washington, USA",
    wusstest: "Amazon hat in den 1990er-Jahren als Online-Buchhandlung angefangen."
  },
  NVDA: {
    text: "Nvidia entwickelt Computerchips, vor allem Grafikchips. Sie stecken in Grafikkarten für Videospiele und in großen Rechenzentren, in denen künstliche Intelligenz trainiert wird.",
    verdient: "Nvidia verkauft Chips und ganze Rechensysteme, vor allem an Betreiber von Rechenzentren, und Grafikkarten für Gaming-PCs. Die Chips selbst lässt Nvidia von anderen Firmen fertigen.",
    sitz: "Santa Clara, Kalifornien, USA",
    wusstest: "Grafikchips wurden ursprünglich erfunden, damit Videospiele flüssig laufen. Weil sie sehr viele Rechnungen gleichzeitig schaffen, eignen sie sich auch gut für künstliche Intelligenz."
  },
  TSLA: {
    text: "Tesla baut Elektroautos. Außerdem stellt die Firma große Batteriespeicher für Strom und Solaranlagen her.",
    verdient: "Tesla verdient vor allem mit dem Verkauf von Elektroautos. Dazu kommen Batteriespeicher, Software-Funktionen für die Autos und das Laden an eigenen Ladesäulen.",
    sitz: "Austin, Texas, USA",
    wusstest: "Die Firma ist nach dem Erfinder Nikola Tesla benannt. In Grünheide bei Berlin hat Tesla eine eigene Autofabrik."
  },
  NFLX: {
    text: "Netflix ist ein Streamingdienst für Serien und Filme. Viele Inhalte produziert Netflix selbst.",
    verdient: "Netflix verdient fast alles mit monatlichen Abos. In manchen Abos wird zusätzlich Werbung gezeigt, dafür sind sie günstiger.",
    sitz: "Los Gatos, Kalifornien, USA",
    wusstest: "Netflix hat früher DVDs per Post verliehen, bevor es mit dem Streaming begann."
  },
  DIS: {
    text: "Disney ist ein Unterhaltungskonzern. Dazu gehören die Filmstudios Disney, Pixar und Marvel, die Star-Wars-Filme, der Streamingdienst Disney+ sowie Freizeitparks und Kreuzfahrtschiffe.",
    verdient: "Disney verdient mit Freizeitparks und Hotels, Kinofilmen, Streaming-Abos und Fernsehsendern. Dazu kommen Lizenzen: Andere Firmen zahlen, um Disney-Figuren auf ihre Produkte zu drucken.",
    sitz: "Burbank, Kalifornien, USA",
    wusstest: "Micky Maus hatte 1928 im Zeichentrickfilm „Steamboat Willie“ einen ihrer ersten Auftritte."
  },
  KO: {
    text: "Coca-Cola ist einer der größten Getränkehersteller der Welt. Neben Coca-Cola gehören zum Beispiel Fanta und Sprite zu den Marken.",
    verdient: "Coca-Cola verkauft vor allem Sirup und Konzentrate an Abfüllfirmen. Diese machen daraus die fertigen Getränke und liefern sie an Geschäfte und Restaurants.",
    sitz: "Atlanta, Georgia, USA",
    wusstest: "Coca-Cola wurde 1886 von dem Apotheker John Pemberton in Atlanta erfunden."
  },
  MCD: {
    text: "McDonald's ist eine der größten Schnellrestaurant-Ketten der Welt. Es gibt Restaurants in sehr vielen Ländern.",
    verdient: "Die meisten Restaurants werden von selbstständigen Unternehmern geführt, den Franchisenehmern. Sie zahlen McDonald's Miete und Gebühren, die vom Umsatz abhängen.",
    sitz: "Chicago, Illinois, USA",
    wusstest: "Das erste McDonald's-Restaurant eröffneten die Brüder Richard und Maurice McDonald 1940 in Kalifornien."
  },
  NKE: {
    text: "Nike ist einer der größten Sportartikelhersteller der Welt. Die Firma entwirft Sportschuhe, Kleidung und Ausrüstung. Zu Nike gehören auch die Marken Jordan und Converse.",
    verdient: "Nike verkauft seine Produkte über Sportgeschäfte, eigene Läden und online. Hergestellt werden sie meist von Partnerfabriken.",
    sitz: "Beaverton, Oregon, USA",
    wusstest: "Der Name stammt von Nike, der griechischen Göttin des Sieges."
  },
  MAT: {
    text: "Mattel ist ein großer Spielzeughersteller. Bekannte Marken sind Barbie, Hot Wheels, Fisher-Price und das Kartenspiel UNO.",
    verdient: "Mattel verkauft Spielzeug vor allem über Spielwarenläden, Kaufhäuser und Onlineshops. Dazu kommen Lizenzen, etwa für Filme oder Kleidung mit Mattel-Figuren.",
    sitz: "El Segundo, Kalifornien, USA",
    wusstest: "Die Barbie-Puppe kam 1959 auf den Markt."
  },
  HAS: {
    text: "Hasbro ist ein großer Spielzeug- und Spielehersteller. Zu den Marken gehören Monopoly, Nerf, Play-Doh, Transformers und My Little Pony sowie das Kartenspiel Magic: The Gathering.",
    verdient: "Hasbro verkauft Spielzeug und Brettspiele über Händler. Dazu kommen Sammelkarten, digitale Spiele und Lizenzen für Filme und Fanartikel.",
    sitz: "USA (Pawtucket, Rhode Island, Umzug nach Boston angekündigt)",
    wusstest: "Der Name Hasbro kommt von „Hassenfeld Brothers“, den Brüdern, die die Firma gegründet haben."
  },
  RBLX: {
    text: "Roblox ist eine Online-Plattform, auf der Nutzer Spiele spielen und selbst bauen können. Die meisten Spiele dort stammen nicht von der Firma, sondern von der Community.",
    verdient: "Roblox verkauft die virtuelle Währung Robux, mit der Spieler zum Beispiel Kleidung für ihren Avatar oder Extras in Spielen kaufen. Ein Teil davon geht an die Leute, die die Spiele entwickelt haben.",
    sitz: "San Mateo, Kalifornien, USA",
    wusstest: "Manche Spiele auf Roblox wurden von Jugendlichen entwickelt, die damit echtes Geld verdienen."
  },
  SPOT: {
    text: "Spotify ist ein Streamingdienst für Musik, Podcasts und Hörbücher und in sehr vielen Ländern verfügbar.",
    verdient: "Spotify verdient vor allem mit Premium-Abos. In der kostenlosen Version wird Werbung gezeigt. Einen großen Teil der Einnahmen zahlt Spotify an Plattenfirmen und Musiker weiter.",
    sitz: "Stockholm, Schweden (rechtlicher Sitz: Luxemburg)",
    wusstest: "Spotify wurde 2006 in Schweden gegründet."
  },
  RACE: {
    text: "Ferrari baut Sportwagen und ist mit einem eigenen Team in der Formel 1 vertreten. Das springende Pferd im Logo ist weltberühmt.",
    verdient: "Ferrari verkauft teure Sportwagen in bewusst kleiner Stückzahl. Dazu kommen Sponsoring und Einnahmen aus der Formel 1 sowie Lizenzen für Fanartikel.",
    sitz: "Maranello, Italien",
    wusstest: "Ferrari ist das einzige Team, das seit der ersten Saison 1950 in jeder Formel-1-Saison dabei war."
  },
  NESN: {
    text: "Nestlé ist einer der größten Lebensmittelkonzerne der Welt. Zu den Marken gehören zum Beispiel Nescafé, Nespresso, KitKat, Maggi, Thomy und das Tierfutter Purina.",
    verdient: "Nestlé verkauft Lebensmittel, Getränke, Babynahrung und Tierfutter, vor allem über Supermärkte, in sehr vielen Ländern.",
    sitz: "Vevey, Schweiz",
    wusstest: "Gründer Henri Nestlé war Apotheker und entwickelte im 19. Jahrhundert eine Säuglingsnahrung, das sogenannte Kindermehl."
  },
  NTDO: {
    text: "Nintendo entwickelt Spielkonsolen wie die Switch und Spiele wie Super Mario, Zelda und Animal Crossing. Außerdem ist Nintendo an der Firma hinter Pokémon beteiligt.",
    verdient: "Nintendo verkauft Konsolen und vor allem Spiele, die es selbst entwickelt. Dazu kommen Lizenzen, etwa für Filme, Freizeitpark-Bereiche und Fanartikel.",
    sitz: "Kyoto, Japan",
    wusstest: "Nintendo wurde 1889 gegründet und stellte zuerst Spielkarten her."
  },
  SONY: {
    text: "Sony ist ein japanischer Technik- und Unterhaltungskonzern. Dazu gehören die PlayStation, Musik- und Filmfirmen sowie Fernseher, Kameras und Kopfhörer. Sony stellt auch Bildsensoren her, die in vielen Handykameras stecken.",
    verdient: "Sony verdient mit Spielen, Konsolen und dem PlayStation-Abo, mit Musik und Filmen, mit Bildsensoren für andere Hersteller und mit Elektronikgeräten.",
    sitz: "Tokio, Japan",
    wusstest: "1979 brachte Sony den Walkman heraus, einen der ersten tragbaren Musikspieler für unterwegs."
  },
  EUNL: {
    etf: true,
    text: "Der „iShares Core MSCI World“ ist ein ETF, der den Index MSCI World nachbildet. Mit einem Anteil bist du auf einen Schlag an sehr vielen großen und mittelgroßen Firmen aus Industrieländern beteiligt.",
    verdient: "Drin stecken über 1.000 Firmen aus vielen Industrieländern, zum Beispiel aus den USA, Japan, Großbritannien, Kanada, Frankreich, der Schweiz und Deutschland. Die USA haben den mit Abstand größten Anteil, mehr als die Hälfte. Schwellenländer wie China oder Indien sind nicht dabei.",
    sitz: "Irland (Fonds), Anbieter: iShares von BlackRock",
    wusstest: "Die Kosten des ETFs werden nicht extra abgebucht, sondern laufend aus dem Fonds entnommen. Du merkst sie nur daran, dass der ETF ein kleines bisschen hinter dem Index zurückbleibt."
  },
  EXS1: {
    etf: true,
    text: "Der „iShares Core DAX“ ist ein ETF, der den DAX nachbildet. Mit einem Anteil bist du an allen Firmen des deutschen Leitindex beteiligt.",
    verdient: "Drin stecken die 40 großen deutschen Börsenfirmen aus dem DAX, zum Beispiel Autohersteller, Versicherungen, Software- und Industriefirmen. Firmen mit höherem Börsenwert haben ein größeres Gewicht.",
    sitz: "Deutschland (Fonds), Anbieter: iShares von BlackRock",
    wusstest: "Den DAX gibt es seit 1988. Anfangs waren 30 Firmen darin, seit 2021 sind es 40."
  }
};
