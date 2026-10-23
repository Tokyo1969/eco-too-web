export const site = {
  name: 'ECO-TOO',
  legalName: 'PORAGLASS sp. z o.o.',
  tagline: 'Systemy ogrzewania foliami na podczerwień',
  url: 'https://eco-too.opole.pl',
  phone: '+48 668 173 872',
  phoneHref: 'tel:+48668173872',
  email: 'biuro@eco-too.opole.pl',
  street: 'ul. Jana Łangowskiego 4A',
  postal: '45-031',
  city: 'Opole',
  hours: 'Pn–Pt 9:00–17:00',
  NIP: '7543364885'
};

export const nav = [
  { href: '/ogrzewanie-podlogowe', label: 'Ogrzewanie podłogowe' },
  { href: '/ogrzewanie-sufitowe-i-scienne', label: 'Sufit i ściany' },
  { href: '/zastosowania', label: 'Zastosowania' },
  { href: '/realizacje', label: 'Realizacje' },
  { href: '/jak-wyglada-realizacja', label: 'Jak pracujemy' },
  { href: '/o-firmie', label: 'O firmie' },
  { href: '/faq', label: 'FAQ' },
];

// Orientacyjne stawki do kalkulatora (zł) – zmień tutaj, jeśli cennik się zmieni.
export const pricing = {
  foilPerM2: 240, // zł za m² folii
  coverage: 0.8, // jaka część powierzchni jest pokryta folią
  controllerPerRoom: 299, // zł za sterownik (1 na pomieszczenie)
};
export const installCost = (m2: number, rooms: number) => m2 * pricing.coverage * pricing.foilPerM2 + rooms * pricing.controllerPerRoom;
export const pln = (n: number) => new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(Math.round(n / 100) * 100) + ' zł';
// Przykład używany w treściach (FAQ, strona kosztów): 100 m², 5 pomieszczeń.
export const exampleCost = installCost(100, 5);

export const cities = [
  'Opolu', 'Kędzierzynie-Koźlu', 'Nysie', 'Brzegu', 'Kluczborku', 'Prudniku',
  'Strzelcach Opolskich', 'Namysłowie', 'Krapkowicach', 'Głubczycach', 'Oleśnie',
];

// Obszar działania – powiaty województwa opolskiego (strona /obszar-dzialania i schema areaServed).
// `projects` – id realizacji z listy `projects` poniżej, wykonanych w danym powiecie.
export const areas = [
  { id: 'opole', name: 'Opole (miasto)', places: ['Opole – wszystkie dzielnice'], projects: [] },
  { id: 'opolski', name: 'Powiat opolski', places: ['Ozimek', 'Dobrzeń Wielki', 'Niemodlin', 'Prószków', 'Komprachcice', 'Tarnów Opolski', 'Chrząstowice', 'Łubniany', 'Turawa', 'Popielów', 'Dąbrowa', 'Murów', 'Tułowice'], projects: ['pustkow', 'dobrzen', 'ochodze', 'drogoszow'] },
  { id: 'kedzierzynsko-kozielski', name: 'Powiat kędzierzyńsko-kozielski', places: ['Kędzierzyn-Koźle', 'Bierawa', 'Cisek', 'Pawłowiczki', 'Polska Cerekiew', 'Reńska Wieś'], projects: [] },
  { id: 'nyski', name: 'Powiat nyski', places: ['Nysa', 'Głuchołazy', 'Otmuchów', 'Paczków', 'Korfantów', 'Łambinowice'], projects: [] },
  { id: 'brzeski', name: 'Powiat brzeski', places: ['Brzeg', 'Grodków', 'Lewin Brzeski', 'Skarbimierz', 'Olszanka', 'Lubsza'], projects: [] },
  { id: 'krapkowicki', name: 'Powiat krapkowicki', places: ['Krapkowice', 'Gogolin', 'Zdzieszowice', 'Strzeleczki', 'Walce'], projects: [] },
  { id: 'strzelecki', name: 'Powiat strzelecki', places: ['Strzelce Opolskie', 'Zawadzkie', 'Kolonowskie', 'Leśnica', 'Ujazd', 'Izbicko', 'Jemielnica'], projects: [] },
  { id: 'kluczborski', name: 'Powiat kluczborski', places: ['Kluczbork', 'Byczyna', 'Wołczyn', 'Lasowice Wielkie'], projects: [] },
  { id: 'namyslowski', name: 'Powiat namysłowski', places: ['Namysłów', 'Domaszowice', 'Pokój', 'Świerczów', 'Wilków'], projects: [] },
  { id: 'oleski', name: 'Powiat oleski', places: ['Olesno', 'Dobrodzień', 'Gorzów Śląski', 'Praszka', 'Radłów', 'Rudniki', 'Zębowice'], projects: [] },
  { id: 'prudnicki', name: 'Powiat prudnicki', places: ['Prudnik', 'Biała', 'Głogówek', 'Lubrza'], projects: [] },
  { id: 'glubczycki', name: 'Powiat głubczycki', places: ['Głubczyce', 'Baborów', 'Kietrz', 'Branice'], projects: [] },
];

// Usługi – schema Service / OfferCatalog i llms.txt.
export const services = [
  { path: '/ogrzewanie-podlogowe', name: 'Ogrzewanie podłogowe folią grzewczą', desc: 'Folia grzewcza na podczerwień pod panelami, winylem i deskami warstwowymi; maty grzewcze pod płytkami.' },
  { path: '/ogrzewanie-sufitowe-i-scienne', name: 'Ogrzewanie sufitowe i ścienne na podczerwień', desc: 'Folia grzewcza w suficie lub ścianie jako ogrzewanie podstawowe albo uzupełniające.' },
  { path: '/ogrzewanie-alternatywne', name: 'Alternatywne ogrzewanie domu', desc: 'Ogrzewanie elektryczne bez kotłowni, komina i opału – również w połączeniu z fotowoltaiką.' },
];

export type Photo = { slug: string; alt: string; w: number; h: number };
export const photos: Record<string, Photo> = {
  'ochodze-1': { slug: 'ochodze-1', alt: 'Folia grzewcza ECO-TOO rozłożona na podłodze w pokoju, Ochodze', w: 1200, h: 553 },
  'ochodze-2': { slug: 'ochodze-2', alt: 'Montaż folii grzewczej na podłożu przed ułożeniem podłogi, Ochodze', w: 1200, h: 553 },
  'ochodze-3': { slug: 'ochodze-3', alt: 'Folia grzewcza z oznaczeniem ECO-TOO, Ochodze', w: 1200, h: 553 },
  'ochodze-4': { slug: 'ochodze-4', alt: 'Pasy folii grzewczej w pomieszczeniu, Ochodze', w: 1200, h: 553 },
  'ochodze-5': { slug: 'ochodze-5', alt: 'Instalacja ogrzewania na podczerwień w trakcie prac, Ochodze', w: 1200, h: 553 },
  'ochodze-6': { slug: 'ochodze-6', alt: 'Folia grzewcza ułożona przy ścianie, Ochodze', w: 724, h: 553 },
  'ochodze-7': { slug: 'ochodze-7', alt: 'Wnętrze z ułożoną folią grzewczą pod zabudową, Ochodze', w: 3264, h: 1504 },
  'ochodze-8': { slug: 'ochodze-8', alt: 'Podłoże przygotowane pod folię grzewczą, Ochodze', w: 3264, h: 1504 },
  'ochodze-9': { slug: 'ochodze-9', alt: 'Folia grzewcza na całej powierzchni pomieszczenia, Ochodze', w: 4032, h: 1860 },
  'ochodze-10': { slug: 'ochodze-10', alt: 'Folia grzewcza z listwami przyłączeniowymi, Ochodze', w: 3264, h: 1504 },
  'drogoszow-1': { slug: 'drogoszow-1', alt: 'Folia grzewcza w salonie z ceglaną ścianą, Drogoszów', w: 1600, h: 1200 },
  'drogoszow-2': { slug: 'drogoszow-2', alt: 'Folia grzewcza i drewniana podłoga w trakcie montażu, Drogoszów', w: 1067, h: 1600 },
  'drogoszow-3': { slug: 'drogoszow-3', alt: 'Folia grzewcza w korytarzu, Drogoszów', w: 1200, h: 1600 },
  'drogoszow-4': { slug: 'drogoszow-4', alt: 'Ogrzewanie podłogowe na podczerwień w trakcie montażu, Drogoszów', w: 1205, h: 1600 },
  'drogoszow-5': { slug: 'drogoszow-5', alt: 'Folia grzewcza w pokoju z oknem, Drogoszów', w: 1067, h: 1600 },
  'drogoszow-6': { slug: 'drogoszow-6', alt: 'Ułożona folia grzewcza w pomieszczeniu z ceglaną ścianą, Drogoszów', w: 1600, h: 1291 },
  'dobrzen-1': { slug: 'dobrzen-1', alt: 'Folia grzewcza ułożona pod grzejnikiem w pokoju, Dobrzeń Wielki', w: 2518, h: 1504 },
  'dobrzen-2': { slug: 'dobrzen-2', alt: 'Pasy folii grzewczej na podłożu, Dobrzeń Wielki', w: 2132, h: 1504 },
  'dobrzen-3': { slug: 'dobrzen-3', alt: 'Folia grzewcza w pomieszczeniu z oknem, Dobrzeń Wielki', w: 1504, h: 2400 },
  'dobrzen-4': { slug: 'dobrzen-4', alt: 'Montaż folii grzewczej, Dobrzeń Wielki', w: 3264, h: 1504 },
  'dobrzen-5': { slug: 'dobrzen-5', alt: 'Folia grzewcza i izolacja podłoża, Dobrzeń Wielki', w: 3264, h: 1504 },
  'pustkow-1': { slug: 'pustkow-1', alt: 'Folia grzewcza w pomieszczeniu z ceglanym kominem, Pustków', w: 1280, h: 960 },
  'pustkow-2': { slug: 'pustkow-2', alt: 'Folia grzewcza ułożona w pokoju przed wykończeniem podłogi, Pustków', w: 1280, h: 960 },
  'pustkow-3': { slug: 'pustkow-3', alt: 'Folia grzewcza w salonie z ceglaną ścianą i oknem tarasowym, Pustków', w: 1280, h: 960 },
  'pustkow-4': { slug: 'pustkow-4', alt: 'Pasy folii grzewczej w dużym pokoju z oknem, Pustków', w: 1280, h: 960 },
  'pustkow-5': { slug: 'pustkow-5', alt: 'Folia grzewcza w otwartej przestrzeni dziennej z kominem, Pustków', w: 1280, h: 960 },
  'pustkow-6': { slug: 'pustkow-6', alt: 'Mata grzewcza pod płytki w łazience, Pustków', w: 960, h: 1280 },
  'pustkow-7': { slug: 'pustkow-7', alt: 'Mata grzewcza pod płytki w przedpokoju, Pustków', w: 960, h: 1280 },
  'folia-1m': { slug: 'folia-1m', alt: 'Rolka folii grzewczej o szerokości 1 m', w: 2500, h: 2500 },
  'folia-05m': { slug: 'folia-05m', alt: 'Rolka folii grzewczej o szerokości 0,5 m', w: 2500, h: 2500 },
  'zestaw': { slug: 'zestaw', alt: 'Zestaw folii grzewczej z przewodami, złączkami i termostatem', w: 1280, h: 1280 },
};

export const projects = [
  { id: 'pustkow', place: 'Pustków k. Ozimka', type: 'Dom ekologiczny, ok. 80 m²', note: 'Dom ekologiczny o powierzchni ok. 80 m² w Pustkowie pod Ozimkiem. W pomieszczeniach mieszkalnych zastosowano folię grzewczą na podczerwień, a pod płytkami maty grzewcze.',
    facts: ['Powierzchnia: ok. 80 m²', '6 stref grzewczych: 4 folie grzewcze i 2 maty grzewcze pod płytkami', 'Sterowanie: ręczne lub zdalnie w aplikacji, z dowolnego miejsca (wymaga dostępu do internetu)', 'Szacowany roczny koszt ogrzewania: ok. 3,5–5 tys. zł (to szacunek dla tego budynku, rzeczywiste koszty zależą m.in. od izolacji, temperatury, sposobu użytkowania i taryfy energii)'],
    photos: ['pustkow-5','pustkow-1','pustkow-3','pustkow-4','pustkow-2','pustkow-6','pustkow-7'] },
  { id: 'drogoszow', place: 'Drogoszów', type: 'Dom jednorodzinny', note: 'Folia grzewcza pod podłogą w pomieszczeniach z ceglaną ścianą.', photos: ['drogoszow-1','drogoszow-2','drogoszow-3','drogoszow-4','drogoszow-5','drogoszow-6'] },
  { id: 'ochodze', place: 'Ochodze', type: 'Dom jednorodzinny', note: 'Montaż folii na przygotowanym podłożu, kolejne etapy prac.', photos: ['ochodze-1','ochodze-2','ochodze-3','ochodze-4','ochodze-5','ochodze-6','ochodze-7','ochodze-8','ochodze-9','ochodze-10'] },
  { id: 'dobrzen', place: 'Dobrzeń Wielki', type: 'Dom jednorodzinny', note: 'Instalacja folii w pokojach z istniejącą zabudową i grzejnikami.', photos: ['dobrzen-1','dobrzen-2','dobrzen-3','dobrzen-4','dobrzen-5'] },
];

export const faq = [
  ['Czy folia grzewcza może ogrzewać cały dom?', 'Tak, jeśli system zostanie prawidłowo zaprojektowany, a parametry energetyczne budynku pozwalają pokryć jego zapotrzebowanie na ciepło. Przed podjęciem decyzji należy uwzględnić między innymi izolację, powierzchnię, straty ciepła oraz dostępną moc elektryczną.'],
  ['Ile kosztuje ogrzewanie folią grzewczą?', 'Koszt inwestycji zależy od powierzchni, mocy i rodzaju systemu, liczby stref, wybranego sterowania oraz warunków montażowych. Dokładną ofertę przygotowujemy po poznaniu parametrów inwestycji.'],
  ['Jakie będą koszty użytkowania?', 'Zużycie energii zależy przede wszystkim od zapotrzebowania cieplnego budynku, ustawionej temperatury, sposobu użytkowania pomieszczeń, jakości izolacji i taryfy energii. Dlatego nie podajemy jednej wartości odpowiedniej dla wszystkich obiektów.'],
  ['Czy folię można zamontować podczas remontu?', 'W wielu przypadkach tak. Najpierw należy sprawdzić stan i konstrukcję podłoża, dostępne miejsce, rodzaj podłogi oraz instalację elektryczną.'],
  ['Czy systemem można sterować przez telefon?', 'Tak, jeśli zastosowane zostaną kompatybilne regulatory z odpowiednią funkcją komunikacji. Zakres zdalnego sterowania zależy od wybranego modelu urządzenia.'],
  ['Czy folia grzewcza współpracuje z fotowoltaiką?', 'Tak. Folia jest odbiornikiem energii elektrycznej, dlatego może korzystać również z energii wytworzonej przez instalację fotowoltaiczną. Rzeczywisty poziom wykorzystania własnej produkcji zależy między innymi od pory roku, parametrów instalacji i profilu zużycia energii.'],
  ['Czy instalacja wymaga przeglądów?', 'System nie ma elementów mechanicznych typowych dla kotłów lub pomp obiegowych. Instalację elektryczną należy jednak użytkować i kontrolować zgodnie z obowiązującymi zasadami, dokumentacją oraz zaleceniami wykonawcy i producenta.'],
  ['Czy można ustawić inną temperaturę w każdym pokoju?', 'Tak. Odpowiedni podział na strefy i zastosowanie osobnych regulatorów pozwalają sterować temperaturą w poszczególnych pomieszczeniach.'],
  ['Czy na ogrzewanej podłodze można ustawiać meble?', 'Układ folii powinien uwzględniać stałą zabudowę i elementy ograniczające oddawanie ciepła. Rozmieszczenie ciężkich mebli bez odpowiedniego prześwitu należy skonsultować z wykonawcą.'],
  ['Ile trwa montaż?', 'Montaż folii jest pracą „na sucho” – nie ma rur, wylewek do wysychania, kotłowni ani komina. Pod panelami podłogę można układać zaraz po ułożeniu i podłączeniu folii. Dokładny czas zależy od powierzchni, liczby pomieszczeń, przygotowania podłoża i zakresu prac elektrycznych – termin podajemy po zapoznaniu się z inwestycją.'],
  ['Czy ogrzewanie folią grzewczą jest tanie?', `Folia jest jednym z tańszych w instalacji systemów ogrzewania: nie wymaga kotła, kotłowni, komina, rur ani serwisu urządzeń mechanicznych. Według naszego kalkulatora orientacyjny koszt instalacji dla 100 m² i 5 pomieszczeń to ok. ${pln(exampleCost)} ze sterownikami. Koszt użytkowania zależy od ocieplenia budynku i ceny prądu – najniższy jest w dobrze ocieplonych domach, z fotowoltaiką lub korzystną taryfą.`],
  ['Ile kosztuje ogrzewanie domu folią w skali roku?', 'Dla przykładu: w naszej realizacji w Pustkowie (dom ekologiczny ok. 80 m², 6 stref) szacowany roczny koszt ogrzewania to ok. 3,5–5 tys. zł. To szacunek dla tego budynku – rzeczywisty koszt zależy od izolacji, ustawionej temperatury, sposobu użytkowania i taryfy energii.'],
  ['Czy folia grzewcza to dobre ogrzewanie alternatywne?', 'Tak, zwłaszcza w dobrze ocieplonych domach, mieszkaniach, domkach letniskowych i przy remontach, gdzie nie ma miejsca na kotłownię lub nie opłaca się budowa instalacji wodnej. Folia zamienia prąd w ciepło bez spalania, więc dobrze współpracuje z fotowoltaiką. W słabo ocieplonych budynkach o dużym zapotrzebowaniu na ciepło warto porównać ją z pompą ciepła – doradzimy, co będzie korzystniejsze.'],
  ['Gdzie montujecie folie grzewcze?', 'W Opolu i całym województwie opolskim – m.in. w powiatach opolskim, kędzierzyńsko-kozielskim, nyskim, brzeskim, krapkowickim, strzeleckim, kluczborskim, namysłowskim, oleskim, prudnickim i głubczyckim. Pełna lista na stronie „Obszar działania”.'],
  ['Jak przygotować podłoże?', 'Podłoże powinno spełniać wymagania danego systemu — zazwyczaj musi być równe, suche, stabilne i odpowiednio przygotowane. Szczegółowe zalecenia przekazujemy przed rozpoczęciem prac.'],
  ['Czy udzielacie gwarancji?', 'Tak, gwarancja obejmuje zakres wskazany w umowie oraz dokumentach producenta. Szczegółowe warunki przekazujemy w ofercie.'],
] as const;
