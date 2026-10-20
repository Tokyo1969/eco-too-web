export const site = {
  name: 'ECO-TOO',
  tagline: 'Systemy ogrzewania na podczerwień',
  url: 'https://eco-too.opole.pl',
  phone: '+48 668 173 872',
  phoneHref: 'tel:+48668173872',
  email: 'biuro@eco-too.opole.pl',
  street: 'ul. Jana Łangowskiego 4A',
  postal: '45-031',
  city: 'Opole',
  hours: 'Pn–Pt 9:00–17:00',
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
  controllerPerRoom: 280, // zł za sterownik (1 na pomieszczenie)
};

export const cities = [
  'Opolu', 'Kędzierzynie-Koźlu', 'Nysie', 'Brzegu', 'Kluczborku', 'Prudniku',
  'Strzelcach Opolskich', 'Namysłowie', 'Krapkowicach', 'Głubczycach', 'Oleśnie',
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
  'folia-1m': { slug: 'folia-1m', alt: 'Rolka folii grzewczej o szerokości 1 m', w: 2500, h: 2500 },
  'folia-05m': { slug: 'folia-05m', alt: 'Rolka folii grzewczej o szerokości 0,5 m', w: 2500, h: 2500 },
  'zestaw': { slug: 'zestaw', alt: 'Zestaw folii grzewczej z przewodami, złączkami i termostatem', w: 1280, h: 1280 },
};

export const projects = [
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
  ['Ile trwa montaż?', 'Czas realizacji zależy od powierzchni, liczby pomieszczeń, przygotowania podłoża i zakresu prac elektrycznych. Termin określamy po zapoznaniu się z inwestycją.'],
  ['Jak przygotować podłoże?', 'Podłoże powinno spełniać wymagania danego systemu — zazwyczaj musi być równe, suche, stabilne i odpowiednio przygotowane. Szczegółowe zalecenia przekazujemy przed rozpoczęciem prac.'],
  ['Czy udzielacie gwarancji?', 'Tak, gwarancja obejmuje zakres wskazany w umowie oraz dokumentach producenta. Szczegółowe warunki przekazujemy w ofercie.'],
] as const;
