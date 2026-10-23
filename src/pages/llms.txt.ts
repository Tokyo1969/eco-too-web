// /llms.txt – zwięzły opis firmy dla modeli AI (https://llmstxt.org), generowany z src/data/site.ts
import { site, nav, areas, services, projects, faq } from '../data/site';

export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const text = `# ${site.name}

> ${site.name} (Opole) projektuje i montuje ogrzewanie na podczerwień – folie grzewcze podłogowe, sufitowe i ścienne oraz maty grzewcze – w Opolu i całym województwie opolskim. Alternatywne ogrzewanie elektryczne bez kotłowni, komina i opału, z szybkim montażem na sucho.

## Dane firmy
- Nazwa: ${site.name} (marka ${site.legalName})
- Adres: ${site.street}, ${site.postal} ${site.city}
- Telefon: ${site.phone}
- E-mail: ${site.email}
- Godziny: ${site.hours}
- NIP: ${site.NIP}
- Profil Firmy w Google: ${site.profiles[0]}
- Obszar działania: Opole i województwo opolskie (${areas.filter((a) => a.id !== 'opole').map((a) => a.name.replace('Powiat ', 'powiat ')).join(', ')})

## Usługi
${services.map((s) => `- [${s.name}](${u(s.path)}): ${s.desc}`).join('\n')}

## Strony
- [Strona główna](${site.url}/)
${nav.map((n) => `- [${n.label}](${u(n.href)})`).join('\n')}
- [Tanie ogrzewanie domu – koszty](${u('/tanie-ogrzewanie-domu')})
- [Kalkulator kosztów](${u('/kalkulator')})
- [Obszar działania](${u('/obszar-dzialania')})
- [Kontakt i wycena](${u('/kontakt')})

## Realizacje
${projects.map((p) => `- ${p.place}: ${p.type}. ${p.note}`).join('\n')}

## Najczęstsze pytania
${faq.map(([q, a]) => `### ${q}\n${a}`).join('\n\n')}
`;
  return new Response(text, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
