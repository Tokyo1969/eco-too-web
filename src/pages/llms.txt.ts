// /llms.txt – zwięzły opis firmy dla modeli AI (https://llmstxt.org), generowany z src/data/site.ts
import { site, nav, areas, services, projects, faq, projectUrl, articles, articleUrl } from '../data/site';

export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const text = `# ${site.name}

> ${site.name} (Opole) projektuje i montuje ogrzewanie na podczerwień – folie grzewcze podłogowe, sufitowe i ścienne oraz maty grzewcze – w Opolu i całym województwie opolskim. Alternatywne ogrzewanie elektryczne bez kotłowni, komina i opału, z szybkim montażem na sucho.

## Dane firmy
- Nazwa: ${site.name} (marka spółki ${site.legalName})
- Adres: ${site.street}, ${site.postal} ${site.city}
- Telefon: ${site.phone}
- E-mail: ${site.email}
- Godziny: ${site.hours}
- NIP: ${site.NIP}
- Profil Firmy w Google: ${site.mapsUrl}
- Gwarancja: 30 lat na folię grzewczą, 2 lata na sterowniki oraz pozostałe urządzenia i materiały montażowe
- Obszar działania: Opole i województwo opolskie (${areas.filter((a) => a.id !== 'opole').map((a) => a.name.replace('Powiat ', 'powiat ')).join(', ')})

## Usługi
${services.map((s) => `- [${s.name}](${u(s.path)}): ${s.desc}`).join('\n')}

## Strony
- [Strona główna](${site.url}/)
${nav.map((n) => `- [${n.label}](${u(n.href)})`).join('\n')}
- [Koszty ogrzewania elektrycznego](${u('/koszty-ogrzewania-elektrycznego')})
- [Kalkulator kosztów](${u('/kalkulator')})
- [Obszar działania](${u('/obszar-dzialania')})
- [Kontakt i wycena](${u('/kontakt')})

## Poradnik
${articles.map((a) => `- [${a.title}](${u(articleUrl(a.slug))}): ${a.lead}`).join('\n')}

## Realizacje
${projects.map((p) => `- [${p.place}](${u(projectUrl(p.id))}): ${p.type}. ${p.note}`).join('\n')}

## Najczęstsze pytania
${faq.map(([q, a]) => `### ${q}\n${a}`).join('\n\n')}
`;
  return new Response(text, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
