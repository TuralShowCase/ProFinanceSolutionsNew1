export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  heroDescription: string;
  overview: string;
  highlights: string[];
  iconName: string;
  features: ServiceFeature[];
  targets: string[];
  process: ServiceStep[];
  relatedSlugs: string[];
}

// Canonical ordered list of all AZ service slugs — single source of truth
export const AZ_SLUGS = [
  'ucotun-diaqnostikasi-ve-berpasi',
  'muhasibat-konsaltinqi',
  'vergi-konsaltinqi',
  'maliyye-ve-idareetme-konsaltinqi',
  'emeliyyat-ve-reqemsal-konsaltinq',
  'hr-ve-kadrlar-konsaltinqi',
  'telim-ve-inkisaf',
  'auditor-xidmetleri',
] as const;

export type AzSlug = typeof AZ_SLUGS[number];

// Localized slug map: azSlug → { en, ru }
export const serviceSlugMap: Record<string, { en: string; ru: string }> = {
  'ucotun-diaqnostikasi-ve-berpasi':  { en: 'accounting-diagnostics',      ru: 'diagnostika-ucheta' },
  'muhasibat-konsaltinqi':            { en: 'accounting-consulting',        ru: 'buhgalterskiy-konsalting' },
  'vergi-konsaltinqi':                { en: 'tax-consulting',               ru: 'nalogoviy-konsalting' },
  'maliyye-ve-idareetme-konsaltinqi': { en: 'financial-management-consulting', ru: 'finansoviy-konsalting' },
  'emeliyyat-ve-reqemsal-konsaltinq': { en: 'digital-operations-consulting', ru: 'tsifrovoy-konsalting' },
  'hr-ve-kadrlar-konsaltinqi':        { en: 'hr-consulting',                ru: 'hr-konsalting' },
  'telim-ve-inkisaf':                 { en: 'training-development',         ru: 'obuchenie-razvitie' },
  'auditor-xidmetleri':               { en: 'audit-services',               ru: 'audit-uslugi' },
};

// Reverse lookup: localized slug → az slug (canonical ID)
export function azSlugFromLocalized(localizedSlug: string, locale: string): string | undefined {
  if (locale === 'az') return localizedSlug;
  return Object.entries(serviceSlugMap).find(
    ([, map]) => map[locale as 'en' | 'ru'] === localizedSlug
  )?.[0];
}

// Get localized slug from az slug
export function localizedSlug(azSlug: string, locale: string): string {
  if (locale === 'az') return azSlug;
  return serviceSlugMap[azSlug]?.[locale as 'en' | 'ru'] ?? azSlug;
}

export const servicesData: ServiceData[] = [
  {
    slug: "ucotun-diaqnostikasi-ve-berpasi",
    index: "01",
    name: "Uçotun diaqnostikası və bərpası",
    tagline: "Maliyyə sağlamlığının ilk addımı",
    heroDescription: "Şirkətinizin mühasibat və vergi uçotunun kompleks yoxlanılması və bərpası üzrə peşəkar dəstək.",
    overview: "Şirkətinizin mühasibat və vergi uçotunun kompleks yoxlanılması və bərpası üzrə peşəkar dəstək.",
    highlights: [
      "Uçotunuzun real vəziyyəti barədə tam aydınlıq",
      "Aşkarlanmış və düzəldilmiş keçmiş dövr səhvləri",
      "Doğruluğu təsdiqlənmiş maliyyə hesabatları",
      "Tam bərpa olunmuş uçot məlumatları",
      "Gələcək üçün aydın uçot siyasəti yol xəritəsi",
    ],
    iconName: "ScanSearch",
    features: [
      { title: "Uçotun düzgün aparılmasının yoxlanılması", description: "Mövcud uçot sisteminin bütün aspektlərinin hərtərəfli analizi aparılır; 1C və digər geniş yayılmış uçot proqramları ilə tam uyğunluq təmin edilir." },
      { title: "Əvvəlki dövrlərə aid səhvlərin müəyyən edilməsi", description: "Keçmiş dövrlərin maliyyə qeydlərindəki uyğunsuzluqlar və xətalar dəqiqliklə aşkarlanıb siyahıya alınır." },
      { title: "Maliyyə hesabatlarının doğruluğunun yoxlanılması", description: "Hesabatların şirkətin real maliyyə vəziyyətini əks etdirməsi yoxlanılır, kənarlaşmalar sənədləşdirilir." },
      { title: "Uçot məlumatlarının bərpası", description: "Çatışmayan və ya səhv aparılmış uçot məlumatları düzgün formada bərpa edilir." },
      { title: "Uçot siyasəti üzrə tövsiyələrin hazırlanması", description: "Eyni xətaların gələcəkdə təkrarlanmaması üçün şirkətinizə uyğun detallı tövsiyə sənədi təqdim edilir." },
    ],
    targets: ["Yeni qurulan şirkətlər", "Uçotu pozulmuş bizneslər", "Audita hazırlananlar", "Sahibkar dəyişikliyi olan müəssisələr"],
    process: [
      { step: "01", title: "Müraciət və brifing", description: "Şirkətiniz haqqında ilkin məlumat toplanır, problem sahələri müzakirə edilir." },
      { step: "02", title: "Sənəd analizi", description: "Mövcud uçot sənədləri, hesabatlar və sistem ətraflı yoxlanılır." },
      { step: "03", title: "Tam diaqnostika", description: "Hər bir uçot elementi dəqiqliklə yoxlanılır, xətalar siyahıya alınır." },
      { step: "04", title: "Bərpa və hesabat", description: "Xətalar düzəldilir, tam diaqnostika hesabatı və tövsiyə paketi təqdim edilir." },
    ],
    relatedSlugs: ["muhasibat-konsaltinqi", "auditor-xidmetleri", "vergi-konsaltinqi"],
  },
  {
    slug: "muhasibat-konsaltinqi",
    index: "02",
    name: "Mühasibat konsaltinqi",
    tagline: "Rəqəmlər arxasında etibarlı dəstək",
    heroDescription: "Şirkətin mühasibat uçotunun tam təşkili və peşəkar müşayiəti.",
    overview: "Şirkətin mühasibat uçotunun tam təşkili və peşəkar müşayiəti.",
    highlights: [
      "Qeydiyyatdan uçota qədər hazır şirkət infrastrukturu",
      "Sıfırdan qurulmuş işlək uçot sistemi",
      "Daxili mühasibə ehtiyac olmadan tam uçot dəstəyi",
      "Avtomatlaşdırılmış, əl əməyindən azad uçot prosesləri",
      "Banklar və investorlar üçün hazır maliyyə hesabatları",
    ],
    iconName: "Calculator",
    features: [
      { title: "Yeni şirkətlərin qeydiyyatı və uçot üzrə dəstək", description: "Şirkətin qeydiyyatından ilk işlək uçot sisteminə qədər bütün mərhələlərdə müşayiət." },
      { title: "Mühasibat uçotu sisteminin qurulması və tətbiqi", description: "Şirkətinizin strukturuna uyğun uçot sistemi və mühasibat siyasəti hazırlanır və tətbiq edilir." },
      { title: "Mühasibatlıq xidmətlərinin autsorsinqi", description: "Gündəlik əməliyyatların qeydə alınması və mühasibatlığın tam idarə edilməsi komandamıza həvalə olunur." },
      { title: "Uçotun avtomatlaşdırılması", description: "1C və bulud həlləri əsasında uçot prosesləri avtomatlaşdırılır — mövcud proqramınıza tam uyğunlaşırıq." },
      { title: "Maliyyə hesabatlarının hazırlanması", description: "Xarici istifadəçilər — banklar, investorlar və tərəfdaşlar üçün aylıq, rüblük və illik hesabatlar hazırlanır." },
    ],
    targets: ["Kiçik və orta bizneslər", "Startaplar", "Beynəlxalq şirkət filialları", "Sahibkarlar"],
    process: [
      { step: "01", title: "Biznes analizi", description: "Şirkətinizin fəaliyyəti, əməliyyat həcmi və mövcud uçot sistemi öyrənilir." },
      { step: "02", title: "Sistem qurulması", description: "Sizin üçün ən uyğun mühasibat sistemi və siyasəti hazırlanır." },
      { step: "03", title: "Cari xidmət", description: "Gündəlik əməliyyatlar qeydə alınır, aylıq hesabatlar hazırlanır." },
      { step: "04", title: "Hesabat və analiz", description: "Maliyyə nəticələri şərh edilir, qərar qəbuluna dəstək verilir." },
    ],
    relatedSlugs: ["ucotun-diaqnostikasi-ve-berpasi", "vergi-konsaltinqi", "maliyye-ve-idareetme-konsaltinqi"],
  },
  {
    slug: "vergi-konsaltinqi",
    index: "03",
    name: "Vergi konsaltinqi",
    tagline: "Qanuni optimizasiya, maksimum qənaət",
    heroDescription: "Vergi qanunvericiliyi üzrə şirkətinizə peşəkar dəstək.",
    overview: "Vergi qanunvericiliyi üzrə şirkətinizə peşəkar dəstək.",
    highlights: [
      "Biznesinizə uyğun hazır vergi strategiyası",
      "Qanuni yolla azaldılmış vergi yükü",
      "Proqnozlaşdırıla bilən vergi öhdəlikləri",
      "Vaxtında təqdim edilən səhvsiz bəyannamələr",
      "Qanunvericilik dəyişikliklərindən daim xəbərdarlıq",
    ],
    iconName: "FileText",
    features: [
      { title: "Vergi strategiyasının hazırlanması", description: "Fəaliyyət növünüzə uyğun ən əlverişli vergi rejimi seçilir, uzunmüddətli vergi strategiyası qurulur." },
      { title: "Vergi yükünün optimallaşdırılması", description: "Qanuni çərçivədə ƏDV optimizasiyası, xərc tanınması və güzəşt mexanizmləri tətbiq edilərək vergi yükü minimuma endirilir." },
      { title: "Vergi planlaşdırılması", description: "Vergi öhdəlikləri əvvəlcədən proqnozlaşdırılır — gözlənilməz məbləğlər və cərimə riskləri istisna edilir." },
      { title: "Vergi hesabatlarının hazırlanması", description: "Bəyannamələr son tarixdən 5–7 iş günü əvvəl hazırlanıb dövlət elektron sistemi vasitəsilə təqdim edilir." },
      { title: "Vergi qanunvericiliyi dəyişiklikləri üzrə məsləhət", description: "Vergi Məcəlləsindəki hər dəyişiklik izlənilir, biznesinizə təsiri barədə proaktiv məlumat verilir." },
    ],
    targets: ["İstehsal müəssisələri", "Ticarət şirkətləri", "Xidmət sektoru", "Xarici investorlar"],
    process: [
      { step: "01", title: "Vergi auditi", description: "Mövcud vergi vəziyyəti tam analiz edilir, risklər müəyyənləşdirilir." },
      { step: "02", title: "Strategiya", description: "Qanuni vergi optimallaşdırma strategiyası hazırlanır." },
      { step: "03", title: "Tətbiq", description: "Strategiya həyata keçirilir, bəyannamələr hazırlanır." },
      { step: "04", title: "Monitorinq", description: "Vergi öhdəliklərinin yerinə yetirilməsi daim izlənilir." },
    ],
    relatedSlugs: ["muhasibat-konsaltinqi", "auditor-xidmetleri", "maliyye-ve-idareetme-konsaltinqi"],
  },
  {
    slug: "maliyye-ve-idareetme-konsaltinqi",
    index: "04",
    name: "Maliyyə və idarəetmə konsaltinqi",
    tagline: "Strategiyadan nəticəyə doğru",
    heroDescription: "Şirkətinizin maliyyə idarəetmə sisteminin inkişafı üçün peşəkar dəstək.",
    overview: "Şirkətinizin maliyyə idarəetmə sisteminin inkişafı üçün peşəkar dəstək.",
    highlights: [
      "Maliyyə vəziyyətinizin tam diaqnostik mənzərəsi",
      "Rəqəmlərə əsaslanan idarəetmə sistemi",
      "Ssenarilər üzrə hazır maliyyə modelləri",
      "Aydın büdcə və maliyyə planı",
      "Rəhbərlik üçün operativ dashboard hesabatları",
    ],
    iconName: "BarChart3",
    features: [
      { title: "Biznesin maliyyə diaqnostikası", description: "Şirkətin maliyyə vəziyyəti hərtərəfli təhlil edilir, güclü və zəif tərəflər müəyyənləşdirilir." },
      { title: "İdarəetmə uçotunun qurulması və tətbiqi", description: "Rəhbərliyin qərar qəbulu üçün idarəetmə uçotu sistemi və KPI göstəriciləri qurulur." },
      { title: "Maliyyə modellərinin hazırlanması", description: "Müxtəlif ssenarilər üzrə dinamik maliyyə modelləri qurulur — NPV, IRR və geri ödəmə müddəti hesablanmaqla." },
      { title: "Maliyyə planlaşdırılması", description: "İllik büdcə hazırlanır, gəlir və xərclər proqnozlaşdırılır, kənarlaşmalara nəzarət mexanizmi qurulur." },
      { title: "İdarəetmə hesabatlarının hazırlanması", description: "Daxili istifadəçilər üçün Excel, Power BI və Google Sheets dashboard formatında operativ hesabatlar hazırlanır." },
    ],
    targets: ["Orta və iri müəssisələr", "Holdinqlər", "İnvestisiya cəlb edən şirkətlər", "Sürətlə böyüyən bizneslər"],
    process: [
      { step: "01", title: "Vəziyyət analizi", description: "Mövcud maliyyə vəziyyəti, proseslər və məqsədlər öyrənilir." },
      { step: "02", title: "Model qurulması", description: "Maliyyə modelləri və büdcə çərçivəsi hazırlanır." },
      { step: "03", title: "Strategiya", description: "Məqsədlərə uyğun maliyyə strategiyası formalaşdırılır." },
      { step: "04", title: "Tətbiq və nəzarət", description: "Strategiya tətbiq edilir, nəticələr sistemli izlənilir." },
    ],
    relatedSlugs: ["vergi-konsaltinqi", "muhasibat-konsaltinqi", "auditor-xidmetleri"],
  },
  {
    slug: "emeliyyat-ve-reqemsal-konsaltinq",
    index: "05",
    name: "Əməliyyat və rəqəmsal konsaltinq",
    tagline: "Biznesinizi rəqəmsallaşdırırıq",
    heroDescription: "Biznesinizin səmərəliliyini artırmaq üçün proseslərin optimallaşdırılması və müasir texnologiyaların tətbiqi üzrə peşəkar dəstək.",
    overview: "Biznesinizin səmərəliliyini artırmaq üçün proseslərin optimallaşdırılması və müasir texnologiyaların tətbiqi üzrə peşəkar dəstək.",
    highlights: [
      "Şəffaf və xəritələnmiş biznes prosesləri",
      "Sənədləşdirilmiş standart iş prosedurları",
      "İşlək ERP/CRM sistemi və öyrədilmiş komanda",
      "Əl əməyindən azad edilmiş avtomatik proseslər",
      "Azaldılmış əməliyyat xərcləri, ölçülə bilən qənaət",
    ],
    iconName: "Monitor",
    features: [
      { title: "Biznes proseslərinin modelləşdirilməsi", description: "Mövcud iş prosesləri xəritələnir, darboğazlar və təkrarlanan əməliyyatlar aşkar edilir." },
      { title: "Standart əməliyyat prosedurlarının hazırlanması", description: "Hər proses üçün aydın prosedur sənədləri hazırlanır — işlər ayrı-ayrı şəxslərdən deyil, sistemdən asılı olur." },
      { title: "ERP və CRM sistemlərinin tətbiqi", description: "Şirkətin ehtiyacına uyğun sistem müstəqil qiymətləndirilərək seçilir; tətbiq, məlumat köçürülməsi və API inteqrasiyası həyata keçirilir." },
      { title: "Proseslərin avtomatlaşdırılması", description: "Əl ilə aparılan əməliyyatlar avtomatik sistemlərə keçirilir, işçilər yeni sistemlər üzrə öyrədilir." },
      { title: "Əməliyyat xərclərinin optimallaşdırılması", description: "Səmərəsiz xərc mənbələri müəyyənləşdirilir, ROI hesablaması ilə optimallaşdırma planı təqdim edilir." },
    ],
    targets: ["İstehsal şirkətləri", "Ticarət müəssisələri", "Xidmət şirkətləri", "Rəqəmsal transformasiya istəyənlər"],
    process: [
      { step: "01", title: "Proses xəritəsi", description: "Mövcud iş prosesləri xəritəsi çıxarılır, problemlər aşkar edilir." },
      { step: "02", title: "Həll dizaynı", description: "Optimal rəqəmsal həll seçilir və layihə planı hazırlanır." },
      { step: "03", title: "Tətbiq", description: "Sistem qurulur, məlumatlar köçürülür, testlər aparılır." },
      { step: "04", title: "Dəstək", description: "İşçilər öyrədilir, davamlı texniki dəstək təmin edilir." },
    ],
    relatedSlugs: ["muhasibat-konsaltinqi", "hr-ve-kadrlar-konsaltinqi", "maliyye-ve-idareetme-konsaltinqi"],
  },
  {
    slug: "hr-ve-kadrlar-konsaltinqi",
    index: "06",
    name: "HR və kadr konsaltinqi",
    tagline: "İnsanı mərkəzə qoyuruq",
    heroDescription: "Şirkətinizin kadr sisteminin qurulması və peşəkar dəstəyi.",
    overview: "Şirkətinizin kadr sisteminin qurulması və peşəkar dəstəyi.",
    highlights: [
      "Qanunvericiliyə tam uyğun kadr sənədləşməsi",
      "Dəqiq və vaxtında hesablanan əmək haqqı",
      "Şirkətinizə uyğun işlək HR siyasətləri",
      "Düzgün seçilmiş və adaptasiya olunmuş komanda",
      "Əmək mübahisələrindən qorunmuş biznes",
    ],
    iconName: "Users",
    features: [
      { title: "Kadr uçotunun aparılması", description: "Əmək müqavilələri, əmrlər, xidmət vərəqələri və DSMF hesabatları daxil olmaqla bütün kadr sənədləşməsi Əmək Məcəlləsi tələblərinə uyğun aparılır." },
      { title: "Əmək haqqının hesablanması", description: "Əmək haqqı, məzuniyyət və sosial sığorta hesablamaları dəqiq və vaxtında yerinə yetirilir." },
      { title: "HR siyasətlərinin hazırlanması", description: "Daxili iş qaydaları, vəzifə təsvirləri və motivasiya mexanizmləri şirkətinizin strukturuna uyğun hazırlanır." },
      { title: "Personalın seçimi və işə qəbulu", description: "İşə qəbul, adaptasiya və qiymətləndirmə prosesləri sistemli şəkildə qurulur." },
      { title: "Əmək qanunvericiliyinə uyğun müşayiət", description: "Əmək Məcəlləsindəki dəyişikliklər izlənilir, mübahisələrin qanuni həllində peşəkar dəstək göstərilir." },
    ],
    targets: ["Böyüyən şirkətlər", "Çoxlu işçisi olan müəssisələr", "Xarici şirkət filialları", "HR departamenti qurmaq istəyənlər"],
    process: [
      { step: "01", title: "HR auditi", description: "Mövcud HR prosesləri, sənədlər və sistemlər yoxlanılır." },
      { step: "02", title: "Sistem dizaynı", description: "Şirkətin ehtiyacına uyğun HR sistemi layihələndirilir." },
      { step: "03", title: "Tətbiq", description: "Sənədlər hazırlanır, proseslər tətbiq edilir." },
      { step: "04", title: "Davamlı dəstək", description: "Əmək qanunvericiliyindəki dəyişikliklər izlənilir, sistem yenilənir." },
    ],
    relatedSlugs: ["telim-ve-inkisaf", "emeliyyat-ve-reqemsal-konsaltinq", "muhasibat-konsaltinqi"],
  },
  {
    slug: "telim-ve-inkisaf",
    index: "07",
    name: "Təlim və inkişaf",
    tagline: "Bilik gücə çevrilir",
    heroDescription: "Əməkdaşların bacarıqlarını və idarəetmə səriştəsini artırmaq üzrə peşəkar dəstək.",
    overview: "Əməkdaşların bacarıqlarını və idarəetmə səriştəsini artırmaq üzrə peşəkar dəstək.",
    highlights: [
      "Komandanızın real bilik səviyyəsinin mənzərəsi",
      "Ehtiyaclarınıza uyğun hazırlanmış təlim proqramı",
      "Praktiki bacarıqlar qazanmış əməkdaşlar",
      "Sertifikatlı mühasibatlıq və kadr mütəxəssisləri",
    ],
    iconName: "GraduationCap",
    features: [
      { title: "Əməkdaşların qiymətləndirilməsi", description: "Komandanın bilik səviyyəsi və inkişaf ehtiyacları obyektiv metodlarla müəyyənləşdirilir." },
      { title: "Təlim proqramlarının hazırlanması", description: "Ehtiyac analizinə əsasən fərdi və qrup formatında xüsusi öyrənmə proqramları hazırlanır." },
      { title: "Peşəkar treninqlərin təşkili", description: "Real biznes ssenarilərinə əsaslanan praktiki, interaktiv treninqlər keçirilir — onlayn modullar və şəxsi öyrənmə paneli daxil olmaqla." },
      { title: "Mühasibatlıq və kadr sahəsində mütəxəssislərinin təlimi", description: "Mühasibatlıq, vergi və HR sahəsində ixtisaslaşmış proqramlar — uğurla tamamlayanlara rəsmi sertifikat verilir." },
    ],
    targets: ["Maliyyəçilər", "Mühasiblər", "Şirkət rəhbərləri", "Karyerasını inkişaf etdirmək istəyənlər"],
    process: [
      { step: "01", title: "Ehtiyac analizi", description: "Bilik səviyyəniz və öyrənmə məqsədləriniz müəyyənləşdirilir." },
      { step: "02", title: "Proqram hazırlığı", description: "Sizin üçün xüsusi öyrənmə proqramı hazırlanır." },
      { step: "03", title: "Təlim prosesi", description: "Praktiki yönümlü, interaktiv təlimlər keçirilir." },
      { step: "04", title: "Qiymətləndirmə", description: "Biliklərin mənimsənilməsi yoxlanılır, sertifikat verilir." },
    ],
    relatedSlugs: ["hr-ve-kadrlar-konsaltinqi", "muhasibat-konsaltinqi", "vergi-konsaltinqi"],
  },
  {
    slug: "auditor-xidmetleri",
    index: "08",
    name: "Auditor xidmətləri",
    tagline: "Müstəqil baxış, dəqiq nəticə",
    heroDescription: "Şirkətinizin maliyyə və əməliyyat proseslərinin müstəqil qiymətləndirilməsi üzrə peşəkar dəstək.",
    overview: "Şirkətinizin maliyyə və əməliyyat proseslərinin müstəqil qiymətləndirilməsi üzrə peşəkar dəstək.",
    highlights: [
      "Proseslərinizə müstəqil və obyektiv baxış",
      "Qanunvericiliyə uyğunluğun təsdiqi",
      "Gücləndirilmiş daxili nəzarət sistemi",
      "Aşkarlanmış risklər və aydın tədbirlər planı",
    ],
    iconName: "ShieldCheck",
    features: [
      { title: "Daxili audit", description: "Şirkətin daxili proseslərinin və idarəetmə effektivliyinin ISA (Beynəlxalq Audit Standartları) əsasında müstəqil qiymətləndirilməsi." },
      { title: "Uyğunluq (compliance) auditi", description: "Qanunvericilik tələblərinə uyğunluğun hərtərəfli yoxlanılması, aşkar edilən boşluqların sənədləşdirilməsi." },
      { title: "Daxili nəzarət sisteminin təhlili", description: "Nəzarət mexanizmlərinin effektivliyi qiymətləndirilir, zəif nöqtələr üzrə tövsiyələr verilir." },
      { title: "Maliyyə və əməliyyat risklərinin müəyyən edilməsi", description: "Biznes riskləri identifikasiya edilir; detallı audit hesabatı və idarəetmə məktubu təqdim edilir." },
    ],
    targets: ["Orta və iri müəssisələr", "Bank və maliyyə qurumları", "Dövlət müəssisələri", "Xarici investorlar"],
    process: [
      { step: "01", title: "Planlaşdırma", description: "Audit əhatəsi müəyyənləşdirilir, riskli sahələr identifikasiya edilir." },
      { step: "02", title: "Sənəd toplanması", description: "Maliyyə sənədləri, hesabatlar və daxili proseslər analiz edilir." },
      { step: "03", title: "Sahə işi", description: "Yoxlama prosedurları həyata keçirilir, sübutlar toplanır." },
      { step: "04", title: "Hesabat", description: "Audit hesabatı hazırlanır, rəhbərliyə təqdim edilir." },
    ],
    relatedSlugs: ["ucotun-diaqnostikasi-ve-berpasi", "vergi-konsaltinqi", "maliyye-ve-idareetme-konsaltinqi"],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find(s => s.slug === slug);
}

// Resolve service by a potentially localized slug
export function getServiceByLocalizedSlug(slug: string, locale: string): ServiceData | undefined {
  const az = azSlugFromLocalized(slug, locale);
  if (!az) return undefined;
  return servicesData.find(s => s.slug === az);
}
