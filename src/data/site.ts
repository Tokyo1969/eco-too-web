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
  NIP: '7543364885',
  // Profile zewnętrzne (schema sameAs) – Profil Firmy w Google itp.
  profiles: ['https://g.page/r/CSFZU1C-7r-bEAE', 'https://share.google/YhT0HJHEbacnmLddK', 'https://share.google/Y86ONCaOI87801QKh'],
  reviewUrl: 'https://g.page/r/CSFZU1C-7r-bEAE/review',
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
  { id: 'opole', name: 'Opole (miasto)', places: ['Opole – wszystkie dzielnice'], projects: ['kosnego', 'samborska', 'kosmetyczny'] },
  { id: 'opolski', name: 'Powiat opolski', places: ['Ozimek', 'Stare Budkowice', 'Dobrzeń Wielki', 'Niemodlin', 'Prószków', 'Komprachcice', 'Tarnów Opolski', 'Chrząstowice', 'Łubniany', 'Turawa', 'Popielów', 'Dąbrowa', 'Murów', 'Tułowice'], projects: ['kosorowice', 'budkowice', 'pustkow', 'dobrzen', 'ochodze', 'drogoszow'] },
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
  'budkowice-1': { slug: 'budkowice-1', alt: 'Folia grzewcza na podłodze pokoju z oknem, Stare Budkowice', w: 1280, h: 960 },
  'budkowice-2': { slug: 'budkowice-2', alt: 'Folia grzewcza w wykuszu z oknami, Stare Budkowice', w: 963, h: 1280 },
  'budkowice-3': { slug: 'budkowice-3', alt: 'Folia grzewcza ułożona w przedpokoju, Stare Budkowice', w: 960, h: 1148 },
  'budkowice-4': { slug: 'budkowice-4', alt: 'Folia grzewcza w korytarzu, Stare Budkowice', w: 963, h: 1280 },
  'budkowice-5': { slug: 'budkowice-5', alt: 'Folia grzewcza w pokoju przy oknie z przewodami zasilającymi, Stare Budkowice', w: 2448, h: 2208 },
  'budkowice-6': { slug: 'budkowice-6', alt: 'Pasy folii grzewczej na ścianie przed zabudową płytą GK, Stare Budkowice', w: 1940, h: 2576 },
  'budkowice-7': { slug: 'budkowice-7', alt: 'Folia grzewcza na ścianie pod płytę gipsowo-kartonową, Stare Budkowice', w: 2576, h: 1976 },
  'kosorowice-1': { slug: 'kosorowice-1', alt: 'Folia grzewcza na ścianie pod płytę gipsowo-kartonową w pokoju, Kosorowice', w: 1400, h: 1050 },
  'kosorowice-2': { slug: 'kosorowice-2', alt: 'Folia grzewcza na suficie w łazience, Kosorowice', w: 1200, h: 900 },
  'kosorowice-3': { slug: 'kosorowice-3', alt: 'Dwa pasy folii grzewczej na ścianie obok płyty GK, Kosorowice', w: 1200, h: 1325 },
  'kosorowice-4': { slug: 'kosorowice-4', alt: 'Pasy folii grzewczej na ścianie przed zabudową, Kosorowice', w: 1200, h: 1325 },
  'kosnego-1': { slug: 'kosnego-1', alt: 'Folia grzewcza na podłodze poddasza pod panelami winylowymi, Opole', w: 1932, h: 2576 },
  'kosnego-2': { slug: 'kosnego-2', alt: 'Montaż folii grzewczej i układanie paneli winylowych na poddaszu, Opole', w: 1200, h: 1600 },
  'kosnego-3': { slug: 'kosnego-3', alt: 'Pokój na poddaszu z ułożoną podłogą z paneli winylowych na folii grzewczej, Opole', w: 1600, h: 1200 },
  'kosnego-4': { slug: 'kosnego-4', alt: 'Poddasze z panelami winylowymi ułożonymi na folii grzewczej, Opole', w: 1600, h: 1200 },
  'kosnego-5': { slug: 'kosnego-5', alt: 'Pasy folii grzewczej na podłodze przed ułożeniem paneli, Opole', w: 1600, h: 1200 },
  'kosnego-6': { slug: 'kosnego-6', alt: 'Folia grzewcza na podłodze poddasza, w połowie przykryta panelami, Opole', w: 1200, h: 1600 },
  'samborska-1': { slug: 'samborska-1', alt: 'Folia grzewcza na podłodze pokoju przed ułożeniem paneli, Opole', w: 2576, h: 1932 },
  'samborska-2': { slug: 'samborska-2', alt: 'Pasy folii grzewczej na podłodze pokoju i korytarza, Opole', w: 1932, h: 2576 },
  'samborska-3': { slug: 'samborska-3', alt: 'Folia grzewcza ułożona na podłodze obok już położonych paneli, Opole', w: 2576, h: 1932 },
  'kosmetyczny-1': { slug: 'kosmetyczny-1', alt: 'Pasy folii grzewczej przy ułożonych panelach, salon kosmetyczny w Opolu', w: 600, h: 600 },
  'kosmetyczny-2': { slug: 'kosmetyczny-2', alt: 'Podkład termoizolacyjny rozłożony na kafelkach w salonie kosmetycznym, Opole', w: 600, h: 600 },
  'kosmetyczny-3': { slug: 'kosmetyczny-3', alt: 'Pasy folii grzewczej na podkładzie w salonie kosmetycznym, Opole', w: 600, h: 600 },
  'kosmetyczny-4': { slug: 'kosmetyczny-4', alt: 'Folia grzewcza na podłodze w salonie kosmetycznym przed ułożeniem paneli, Opole', w: 600, h: 600 },
  'kosmetyczny-5': { slug: 'kosmetyczny-5', alt: 'Układanie paneli na folii grzewczej w salonie kosmetycznym, Opole', w: 1275, h: 957 },
  'kosmetyczny-6': { slug: 'kosmetyczny-6', alt: 'Gabinet salonu kosmetycznego z panelami ułożonymi na folii grzewczej, Opole', w: 1275, h: 957 },
  'folia-1m': { slug: 'folia-1m', alt: 'Rolka folii grzewczej o szerokości 1 m', w: 2500, h: 2500 },
  'folia-05m': { slug: 'folia-05m', alt: 'Rolka folii grzewczej o szerokości 0,5 m', w: 2500, h: 2500 },
  'zestaw': { slug: 'zestaw', alt: 'Zestaw folii grzewczej z przewodami, złączkami i termostatem', w: 1280, h: 1280 },
  'salon-zachod': { slug: 'salon-zachod', alt: 'Salon w ciepłym świetle zachodzącego słońca', w: 743, h: 773 },
  'salon-wieczor': { slug: 'salon-wieczor', alt: 'Salon z drewnianą podłogą ogrzewaną folią grzewczą', w: 1122, h: 700 },
  'sypialnia': { slug: 'sypialnia', alt: 'Przytulna sypialnia z drewnianą podłogą w ciepłym świetle', w: 1122, h: 640 },
  'folia-rolka': { slug: 'folia-rolka', alt: 'Rolka folii grzewczej na podczerwień na drewnianej podłodze', w: 1122, h: 670 },
};

export const projects = [
  { id: 'samborska', place: 'Opole, ul. Samborska', type: 'Dwa pokoje i korytarz, 2022', note: 'Folia grzewcza na podłodze w dwóch pokojach i na korytarzu w Opolu (ul. Samborska), wykonana w 2022 roku, wraz z ułożeniem paneli podłogowych.',
    facts: ['Montaż: folia na podłodze w dwóch pokojach i na korytarzu, pod panelami (panele ułożone w pokojach i na korytarzu)', 'Zastosowana folia: moc 140 W/m²', '3 strefy grzewcze: 2 pokoje i korytarz', 'Sterowanie: ręczne lub przez WiFi', 'Czas montażu folii: ok. 8 godzin', 'Szacowany roczny koszt ogrzewania: ok. 2,5–3,5 tys. zł, zależnie od warunków (to szacunek dla tych pomieszczeń, rzeczywiste koszty zależą m.in. od izolacji, temperatury, sposobu użytkowania i taryfy energii)'],
    photos: ['samborska-3','samborska-1','samborska-2'] },
  { id: 'kosnego', place: 'Opole, ul. Kośnego', type: 'Adaptowane poddasze, ok. 18 m²', note: 'Folia grzewcza na podłodze zaadaptowanego poddasza w Opolu (ul. Kośnego), wraz z ułożeniem paneli winylowych w pokoju i w WC.',
    facts: ['Powierzchnia: ok. 18 m² (pokój + WC)', 'Montaż: folia na podłodze, pod panelami winylowymi (panele ułożone w pokoju i w WC)', 'Zastosowana folia: moc 140 W/m²', '2 strefy grzewcze: pokój i WC', 'Sterowanie: ręczne lub przez WiFi', 'Czas montażu folii: ok. 4 godziny', 'Szacowany roczny koszt ogrzewania: ok. 800–1000 zł (to szacunek dla tego pomieszczenia, rzeczywiste koszty zależą m.in. od izolacji, temperatury, sposobu użytkowania i taryfy energii)'],
    photos: ['kosnego-3','kosnego-4','kosnego-1','kosnego-2','kosnego-5','kosnego-6'] },
  { id: 'kosorowice', place: 'Kosorowice', type: 'Dom parterowy, ok. 80 m² (część mieszkalna), 2024', note: 'Dom parterowy o powierzchni ok. 80 m² (część mieszkalna) w Kosorowicach (gm. Tarnów Opolski), wykonany w 2024 roku. Folię grzewczą zamontowano na ścianach w dwóch pokojach, salonie i przedpokoju, pod płytą gipsowo-kartonową, oraz na suficie w łazience.',
    facts: ['Powierzchnia: ok. 80 m² (część mieszkalna)', 'Montaż: folia na ścianach w dwóch pokojach, salonie i przedpokoju (pod płytą GK) oraz na suficie w łazience', 'Zastosowana folia: moc 240 W/m², temperatura grzania 54°C – o wyższych parametrach, bo do dyspozycji było niewiele powierzchni grzejnej', 'Dzięki wyższej temperaturze grzania folia ogrzewa dom mimo małej powierzchni grzejnej', '5 stref grzewczych', 'Sterowanie: ręczne lub przez WiFi', 'Szacowany roczny koszt ogrzewania: ok. 4–5,5 tys. zł, zależnie od warunków atmosferycznych (to szacunek dla tego budynku, rzeczywiste koszty zależą m.in. od izolacji, temperatury, sposobu użytkowania i taryfy energii)', 'Inwestor skorzystał z programu „Czyste Powietrze”, likwidując stary piec na węgiel'],
    photos: ['kosorowice-1','kosorowice-3','kosorowice-2','kosorowice-4'] },
  { id: 'budkowice', place: 'Stare Budkowice', type: 'Dom, ok. 180 m²', note: 'Dom o powierzchni ok. 180 m² w Starych Budkowicach (gm. Murów). W pomieszczeniach mieszkalnych zastosowano folię grzewczą na podczerwień.',
    facts: ['Powierzchnia: ok. 180 m²', '13 stref grzewczych, w tym 4 strefy z folią o temperaturze grzania 54°C na ścianach, pod płytą gipsowo-kartonową', 'Sterowanie: ręczne lub zdalnie w aplikacji, z dowolnego miejsca (wymaga dostępu do internetu)', 'Szacowany roczny koszt ogrzewania: ok. 6–9 tys. zł (to szacunek dla tego budynku, rzeczywiste koszty zależą m.in. od izolacji, temperatury, sposobu użytkowania i taryfy energii)'],
    photos: ['budkowice-1','budkowice-2','budkowice-5','budkowice-3','budkowice-4','budkowice-7','budkowice-6'] },
  { id: 'pustkow', place: 'Pustków k. Ozimka', type: 'Dom ekologiczny, ok. 80 m²', note: 'Dom ekologiczny o powierzchni ok. 80 m² w Pustkowie pod Ozimkiem. W pomieszczeniach mieszkalnych zastosowano folię grzewczą na podczerwień, a pod płytkami maty grzewcze.',
    facts: ['Powierzchnia: ok. 80 m²', '6 stref grzewczych: 4 folie grzewcze i 2 maty grzewcze pod płytkami', 'Sterowanie: ręczne lub zdalnie w aplikacji, z dowolnego miejsca (wymaga dostępu do internetu)', 'Szacowany roczny koszt ogrzewania: ok. 3,5–5 tys. zł (to szacunek dla tego budynku, rzeczywiste koszty zależą m.in. od izolacji, temperatury, sposobu użytkowania i taryfy energii)'],
    photos: ['pustkow-5','pustkow-1','pustkow-3','pustkow-4','pustkow-2','pustkow-6','pustkow-7'] },
  { id: 'drogoszow', place: 'Drogoszów', type: 'Dom, ok. 65 m², prawie 100-letni', note: 'Prawie 100-letni dom o powierzchni ok. 65 m² w Drogoszowie, po gruntownym remoncie, wymianie okien i ociepleniu. Folię grzewczą zamontowano pod deską barlinecką, a w łazience na suficie.',
    facts: ['Powierzchnia: ok. 65 m²', 'Budynek prawie 100-letni, po gruntownym remoncie, wymianie okien i ociepleniu', 'Zastosowana folia: moc 140 W/m² pod deską barlinecką, a w łazience na suficie folia o mocy 240 W/m²', '6 stref grzewczych: sypialnia, biuro, salon, kuchnia, łazienka i przedpokój', 'Sterowanie: ręczne lub przez WiFi', 'Czas montażu folii: ok. 10 godzin', 'Szacowany roczny koszt ogrzewania: ok. 3,5–5 tys. zł (to szacunek dla tego budynku, rzeczywiste koszty zależą m.in. od izolacji, temperatury, sposobu użytkowania i taryfy energii)'],
    photos: ['drogoszow-1','drogoszow-2','drogoszow-3','drogoszow-4','drogoszow-5','drogoszow-6'] },
  { id: 'ochodze', place: 'Ochodze', type: 'Poddasze po remoncie, ok. 58 m²', note: 'Poddasze o powierzchni ok. 58 m² w dawnej stodole w Ochodzem, po gruntownym remoncie, wymianie okien i ociepleniu. Folię grzewczą zamontowano pod panelami, razem z ich ułożeniem.',
    facts: ['Powierzchnia: ok. 58 m²', 'Budynek: dawna stodoła po gruntownym remoncie, wymianie okien i ociepleniu', 'Zastosowana folia: moc 140 W/m² pod panelami, montaż wraz z ułożeniem paneli', '3 strefy grzewcze: sypialnia, salon i korytarz', 'Sterowanie: ręczne lub przez WiFi', 'Czas montażu: ok. 7 godzin (folia paroizolacyjna, podkłady termoizolacyjne, folia grzewcza i sterowniki, rozruch oraz kontrola grzania wszystkich stref)', 'Szacowany roczny koszt ogrzewania: ok. 2–3,5 tys. zł (to szacunek dla tych pomieszczeń, rzeczywiste koszty zależą m.in. od izolacji, temperatury, sposobu użytkowania i taryfy energii)'],
    photos: ['ochodze-1','ochodze-2','ochodze-3','ochodze-4','ochodze-5','ochodze-6','ochodze-7','ochodze-8','ochodze-9','ochodze-10'] },
  { id: 'dobrzen', place: 'Dobrzeń Wielki', type: 'Parter domu jednorodzinnego, ok. 42 m²', note: 'Parter domu jednorodzinnego o powierzchni ok. 42 m² w Dobrzeniu Wielkim, ogrzewany folią grzewczą na podczerwień.',
    facts: ['Powierzchnia: ok. 42 m² (parter)', 'Zastosowana folia: moc 140 W/m²', '2 strefy grzewcze: sypialnia i salon', 'Sterowanie: ręczne lub przez WiFi', 'Czas montażu: ok. 5 godzin (folia paroizolacyjna, podkłady termoizolacyjne, folia grzewcza i sterowniki, rozruch oraz kontrola grzania wszystkich stref)', 'Szacowany roczny koszt ogrzewania: ok. 2–3,5 tys. zł (to szacunek dla tego budynku, rzeczywiste koszty zależą m.in. od izolacji, temperatury, sposobu użytkowania i taryfy energii)'],
    photos: ['dobrzen-1','dobrzen-2','dobrzen-3','dobrzen-4','dobrzen-5'] },
  { id: 'kosmetyczny', place: 'Opole, salon kosmetyczny', type: 'Salon kosmetyczny, ok. 24 m², 2019', note: 'Salon kosmetyczny w Opolu o powierzchni ok. 24 m², wykonany w 2019 roku – jedna z naszych pierwszych realizacji. Folię grzewczą zamontowano pod panelami, bezpośrednio na zastanych kafelkach, razem z ułożeniem paneli.',
    facts: ['Powierzchnia: ok. 24 m²', 'Zastosowana folia: moc 140 W/m² pod panelami, montaż wraz z panelami', 'Instalacja wykonana bezpośrednio na zastanych kafelkach', '1 strefa grzewcza', 'Sterowanie: ręczne lub przez WiFi', 'Czas montażu: ok. 4 godziny (folia paroizolacyjna, podkłady termoizolacyjne, folia grzewcza i sterownik, rozruch oraz kontrola grzania)', 'Szacowany roczny koszt ogrzewania: ok. 1–1,3 tys. zł (to szacunek dla tego lokalu, rzeczywiste koszty zależą m.in. od izolacji, temperatury, sposobu użytkowania i taryfy energii)'],
    photos: ['kosmetyczny-6','kosmetyczny-5','kosmetyczny-3','kosmetyczny-4','kosmetyczny-2','kosmetyczny-1'] },
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
  ['Czy ogrzewanie folią grzewczą się opłaca?', `Folia jest jednym z tańszych w instalacji systemów ogrzewania: nie wymaga kotła, kotłowni, komina, rur ani serwisu urządzeń mechanicznych. Według naszego kalkulatora orientacyjny koszt instalacji dla 100 m² i 5 pomieszczeń to ok. ${pln(exampleCost)} ze sterownikami. Koszt użytkowania zależy od ocieplenia budynku i ceny prądu – najniższy jest w dobrze ocieplonych domach, z fotowoltaiką lub korzystną taryfą.`],
  ['Ile kosztuje ogrzewanie domu folią w skali roku?', 'Dla przykładu: w naszej realizacji w Pustkowie (dom ekologiczny ok. 80 m², 6 stref) szacowany roczny koszt ogrzewania to ok. 3,5–5 tys. zł. To szacunek dla tego budynku – rzeczywisty koszt zależy od izolacji, ustawionej temperatury, sposobu użytkowania i taryfy energii.'],
  ['Czy folia grzewcza to dobre ogrzewanie alternatywne?', 'Tak, zwłaszcza w dobrze ocieplonych domach, mieszkaniach, domkach letniskowych i przy remontach, gdzie nie ma miejsca na kotłownię lub nie opłaca się budowa instalacji wodnej. Folia zamienia prąd w ciepło bez spalania, więc dobrze współpracuje z fotowoltaiką. W słabo ocieplonych budynkach o dużym zapotrzebowaniu na ciepło warto porównać ją z pompą ciepła – doradzimy, co będzie korzystniejsze.'],
  ['Gdzie montujecie folie grzewcze?', 'W Opolu i całym województwie opolskim – m.in. w powiatach opolskim, kędzierzyńsko-kozielskim, nyskim, brzeskim, krapkowickim, strzeleckim, kluczborskim, namysłowskim, oleskim, prudnickim i głubczyckim. Pełna lista na stronie „Obszar działania”.'],
  ['Czy folię grzewczą można położyć pod panele i pod płytki?', 'Folię grzewczą na podczerwień stosujemy pod panelami laminowanymi i winylowymi oraz deskami warstwowymi – po sprawdzeniu zaleceń producenta podłogi i dopuszczalnej temperatury jej pracy. Pod płytki ceramiczne stosujemy maty grzewcze, czyli kompletny system z przewodem grzejnym zatopionym w kleju (jak w naszej realizacji w Pustkowie). Każdy taki projekt oceniamy indywidualnie.'],
  ['Czym różni się folia grzewcza od maty grzewczej?', 'Folia grzewcza to cienki element grzejny na podczerwień, układany na sucho na izolacji, pod panelami lub deskami. Mata grzewcza to przewód grzejny na siatce, który zatapia się w kleju do płytek. Oba rozwiązania działają na prąd i mogą pracować w jednym domu, każde w innych pomieszczeniach.'],
  ['Ile prądu zużywa folia grzewcza?', 'Zużycie zależy od zapotrzebowania budynku na ciepło, ocieplenia, ustawionej temperatury i sposobu użytkowania. Termostat włącza folię tylko wtedy, gdy temperatura spada poniżej ustawionej wartości, więc nie pracuje ona z pełną mocą przez cały czas. W uproszczeniu: koszt = energia potrzebna do ogrzania budynku (kWh) × cena prądu. Orientacyjne koszty znajdziesz na stronie „Koszty ogrzewania elektrycznego”.'],
  ['Czy ogrzewanie domu prądem ma sens?', 'W dobrze ocieplonych domach, nowych budynkach, mieszkaniach i domach z fotowoltaiką – często tak, bo montaż jest szybki, bez kotłowni i serwisu. W słabo ocieplonych budynkach o dużym zapotrzebowaniu na ciepło warto porównać folię z pompą ciepła. Na podstawie danych o budynku pomożemy oszacować zapotrzebowanie na energię i dobrać odpowiednią moc instalacji.'],
  ['Czy folią można ogrzewać domek letniskowy lub biuro?', 'Tak. W domku letniskowym programowalne lub zdalne sterowanie pozwala utrzymywać temperaturę minimalną i ogrzać wnętrze przed przyjazdem. W biurach i lokalach usługowych podział na strefy pozwala dopasować temperaturę do godzin pracy i sposobu wykorzystania pomieszczeń.'],
  ['Jak wygląda montaż folii grzewczej krok po kroku?', 'Najpierw analizujemy budynek i dobieramy system. Potem przygotowujemy podłoże i izolację, rozkładamy pasy folii zgodnie z projektem, wykonujemy przyłączenia i zabezpieczenie styków, montujemy czujniki temperatury i termostaty, wykonujemy pomiary i uruchamiamy instalację. Na końcu można układać podłogę, a użytkownik dostaje instruktaż obsługi.'],
  [`Kto montuje folie grzewcze w Opolu i województwie opolskim?`, `${site.name} z siedzibą w Opolu (${site.street}). Projektujemy i montujemy ogrzewanie na podczerwień w całym województwie opolskim – realizacje wykonaliśmy m.in. w Opolu, Pustkowie, Starych Budkowicach, Kosorowicach, Drogoszowie, Ochodzem i Dobrzeniu Wielkim. Kontakt: ${site.phone}, ${site.email}.`],
  ['Jak przygotować podłoże?', 'Podłoże powinno spełniać wymagania danego systemu — zazwyczaj musi być równe, suche, stabilne i odpowiednio przygotowane. Szczegółowe zalecenia przekazujemy przed rozpoczęciem prac.'],
  ['Czy udzielacie gwarancji?', 'Tak, gwarancja obejmuje zakres wskazany w umowie oraz dokumentach producenta. Szczegółowe warunki przekazujemy w ofercie.'],
] as const;
