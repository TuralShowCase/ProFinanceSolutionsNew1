import { test } from '@playwright/test';



const CYRILLIC = /[Ѐ-ӿ]/;
const AZERI_ONLY = /[əƏ]/;

const ENGLISH_UI = /\b(Home|About|Services|Contact|Read more|Learn more|Submit|Send|Close|Menu|Search|Designed by|Get in Touch|Practice Areas|All rights reserved)\b/;

const ALLOWED = [
  'ProFinance', 'Solutions', 'PLH', 'WhatsApp', 'Kronex', 'Instagram',
  'Facebook', 'LinkedIn', 'AZ', 'EN', 'RU', 'Baku', 'Bakı', 'Integral',
  'Cafe City', 'Dekoriko', 'Conco', 'BIMD', 'City Park', 'Shusha Qala',
  'La Quzu', 'info@profinance.az', 'Express', 'Service', 'Telecom',
  'Beyond Compare', 'HR', 'IT', 'ERP', 'SAP', 'MS', 'Excel',
];

const PAGES = [
  { locale: 'az', paths: ['/', '/about', '/services/ucotun-diaqnostikasi-ve-berpasi'] },
  { locale: 'en', paths: ['/en', '/en/about', '/en/services/accounting-diagnostics'] },
  { locale: 'ru', paths: ['/ru', '/ru/o-nas', '/ru/services/diagnostika-ucheta'] },
];


function withoutAllowed(text: string): string {
  let out = text;
  for (const term of ALLOWED) out = out.split(term).join(' ');
  return out;
}

for (const { locale, paths } of PAGES) {
  for (const path of paths) {
    test(`language purity — ${locale} ${path}`, async ({ page }) => {
      test.skip(test.info().project.name !== 'desktop', 'language check: desktop only');

      await page.goto(path, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1500);

      const text = await page.locator('body').innerText();
      const cleaned = withoutAllowed(text);
      const lines = cleaned.split('\n').map((l) => l.trim()).filter(Boolean);

      const problems: string[] = [];

      for (const line of lines) {
        if (locale === 'en') {
          if (CYRILLIC.test(line)) problems.push(`Cyrillic on EN page: "${line.slice(0, 80)}"`);
          if (AZERI_ONLY.test(line)) problems.push(`Azerbaijani on EN page: "${line.slice(0, 80)}"`);
        }
        if (locale === 'ru') {
          if (AZERI_ONLY.test(line)) problems.push(`Azerbaijani on RU page: "${line.slice(0, 80)}"`);
          if (ENGLISH_UI.test(line)) problems.push(`English UI on RU page: "${line.slice(0, 80)}"`);
        }
        if (locale === 'az') {
          if (CYRILLIC.test(line)) problems.push(`Cyrillic on AZ page: "${line.slice(0, 80)}"`);
          if (ENGLISH_UI.test(line)) problems.push(`English UI on AZ page: "${line.slice(0, 80)}"`);
        }
      }

      const htmlLang = await page.getAttribute('html', 'lang');
      const langOk = htmlLang === locale;

      console.log(
        `${(locale + ' ' + path).padEnd(46)} html[lang]=${String(htmlLang).padEnd(4)}${langOk ? '' : ' <-- YANLIS'}  sorun=${problems.length}`,
      );
      for (const p of [...new Set(problems)]) console.log('      ' + p);
    });
  }
}
