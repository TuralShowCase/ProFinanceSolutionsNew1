export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
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
  faqs: FAQItem[];
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
    faqs: [
      {
        question: "Diaqnostika neçə müddətdə tamamlanır?",
        answer: "Şirkətin ölçüsündən və mövcud sənədləşmə vəziyyətindən asılı olaraq diaqnostika prosesi 5–15 iş günü çəkir. Kiçik müəssisələr üçün daha sürətli, çoxillik uçot problemi olan şirkətlər üçün daha geniş zaman çərçivəsi nəzərdə tutulur. Başlamadan əvvəl dəqiq müddət sizinlə razılaşdırılır.",
      },
      {
        question: "Diaqnostika üçün hansı sənədlər tələb olunur?",
        answer: "İlkin mərhələdə gündəlik jurnal, mühasibat balansı, bank çıxarışları, illik hesabatlar (mövcuddursa) və vergi bəyannamələri tələb olunur. Tam sənəd siyahısı şirkətinizin fəaliyyət növünə uyğun olaraq ilkin görüşdə müəyyənləşdirilir.",
      },
      {
        question: "Diaqnostikadan sonra bərpa mütləq lazımdırmı?",
        answer: "Xeyr. Diaqnostika nəticəsindən asılı olaraq qərarı siz verirsiniz. Bəzi müştərilər yalnız hesabat alaraq özləri hərəkət edir, bəziləri isə tam bərpa xidmətinə keçir. Biz hər iki seçimə tam hazırıq.",
      },
      {
        question: "İllər boyu yanlış aparılmış uçotu bərpa etmək mümkündürmü?",
        answer: "Bəli. Biz çoxillik uçot bərpasını uğurla həyata keçirmişik. Proses sistematik yanaşma tələb edir: əvvəlcə keçmiş dövrlərin analizi, sonra ardıcıl düzəliş mərhələləri. Əksər hallarda 1–3 ay ərzində tam bərpa mümkündür.",
      },
      {
        question: "Bərpa prosesi zamanı şirkətin fəaliyyəti dayanırmı?",
        answer: "Xeyr. Bərpa prosesi şirkətinizin cari fəaliyyəti ilə paralel aparılır. Biz sənəd mübadiləsini rəqəmsal mühitdə həyata keçiririk və normal iş ritminizi minimuma qədər pozmağa çalışırıq.",
      },
      {
        question: "Xidmətin qiyməti necə müəyyənləşdirilir?",
        answer: "Qiymət şirkətin həcmi, mövcud uçot sənədlərinin vəziyyəti və bərpa üçün tələb olunan iş həcminə əsasən fərdiləşdirilir. Diaqnostika ilə bərpanı ayrı-ayrılıqda da sifariş etmək mümkündür. İlkin konsultasiya pulsuzdur — bu görüşdə vəziyyət qiymətləndirilir və dəqiq qiymət əvvəlcədən razılaşdırılır.",
      },
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
    faqs: [
      {
        question: "Öz mühasibimlə paralel olaraq xidmətinizdən istifadə edə bilərəm?",
        answer: "Bəli. Biz ya mövcud mühasibinizin yanında məsləhətçi rolu oynayaraq sistemin inkişafını dəstəkləyirik, ya da mühasibliyi tam olaraq üzərimizə götürürük. Hər iki format mümkündür — mövcud komandanıza hörmət edirik.",
      },
      {
        question: "Hansı mühasibat proqramları ilə işləyirsiniz?",
        answer: "1C, SAP, QuickBooks, Xero, Microsoft Dynamics kimi geniş yayılmış sistemlərlə işləyirik. Şirkətiniz artıq bir sistem istifadə edirsə, ona uyğunlaşırıq. Hər hansı sistem yoxdursa, ehtiyacınıza ən uyğun həll tövsiyə edirik.",
      },
      {
        question: "Aylıq hesabatlar necə çatdırılır?",
        answer: "Hesabatlar PDF, Excel və ya istifadə etdiyiniz sistemin öz formatında hazırlanır. E-poçt, birgə buld mühiti (Google Drive, SharePoint) və ya xüsusi müştəri portalı vasitəsilə çatdırılır. Format və tezlik müqavilə zamanı razılaşdırılır.",
      },
      {
        question: "IFRS standartlarına keçid mürəkkəbdirmi?",
        answer: "Ciddi, lakin idarə oluna bilən bir prosesdir. Biz keçidi addım-addım həyata keçiririk: əvvəlcə mövcud sistemin analizi, sonra uyğunlaşdırma planı, ardından paralel uçot dövrü. Proses adətən 3–6 ay çəkir.",
      },
      {
        question: "Xidmət hansı ölçülü şirkətlərə uyğundur?",
        answer: "Startup-lardan iri holdinqlərə qədər hər ölçüdə şirkətə xidmət göstəririk. Xidmətin həcmi və formatı şirkətin əməliyyat miqyasına uyğun olaraq fərdiləşdirilir — siz yalnız lazım olan dəstəyi alırsınız.",
      },
      {
        question: "Xidmətin qiyməti necə müəyyənləşdirilir?",
        answer: "Qiymət şirkətin əməliyyat həcminə, aylıq əməliyyat sayına və tələb olunan hesabat növlərinə əsasən fərdiləşdirilir. Xidmət aylıq abunə formatında da, layihə əsasında da təqdim edilir — hər iki variant mümkündür. İlkin konsultasiya pulsuzdur: bu görüşdə ehtiyaclar müəyyənləşdirilir, uyğun format və dəqiq qiymət razılaşdırılır.",
      },
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
      { title: "Qanunvericilik dəyişiklikləri üzrə məsləhət", description: "Vergi Məcəlləsindəki hər dəyişiklik izlənilir, biznesinizə təsiri barədə proaktiv məlumat verilir." },
    ],
    targets: ["İstehsal müəssisələri", "Ticarət şirkətləri", "Xidmət sektoru", "Xarici investorlar"],
    process: [
      { step: "01", title: "Vergi auditi", description: "Mövcud vergi vəziyyəti tam analiz edilir, risklər müəyyənləşdirilir." },
      { step: "02", title: "Strategiya", description: "Qanuni vergi optimallaşdırma strategiyası hazırlanır." },
      { step: "03", title: "Tətbiq", description: "Strategiya həyata keçirilir, bəyannamələr hazırlanır." },
      { step: "04", title: "Monitorinq", description: "Vergi öhdəliklərinin yerinə yetirilməsi daim izlənilir." },
    ],
    faqs: [
      {
        question: "Vergi yükünü qanuni yollarla azaltmaq mümkündürmü?",
        answer: "Bəli, bu tamamilə mümkündür və tövsiyə edilir. Azərbaycan vergi qanunvericiliyi müxtəlif güzəştlər, azadolmalar və optimallaşdırma imkanları nəzərdə tutur. Biz şirkətinizin fəaliyyət növünə uyğun ən əlverişli vergi rejimini, xərc tanınması qaydalarını və güzəşt mexanizmlərini tətbiq edirik.",
      },
      {
        question: "Vergi bəyannamələrini son günə saxlamaq risklidirmi?",
        answer: "Həddindən artıq riskldir. Son günə qalan bəyannamələr tələsik hazırlanır, xətalara daha meyllidir. Biz bütün vergi öhdəliklərini son tarixdən ən az 5–7 iş günü əvvəl hazır edir, yoxlayır və təqdim edirik — bu yanaşma həm dəqiqliyi artırır, həm də cərimə riskini sıfıra endirir.",
      },
      {
        question: "Vergi yoxlaması zamanı yanımda olursunuzmu?",
        answer: "Bəli. Vergi orqanlarının yoxlaması zamanı nümayəndəmiz şirkətinizin yanında olur: sənədlər hazırlanır, suallara cavab verilir, hüquqi mövqe müdafiə edilir. Müştərilərimiz heç vaxt yoxlama prosesini tək keçmir.",
      },
      {
        question: "Keçmiş illər üzrə vergi borclarım varsa, həll etmək mümkündürmü?",
        answer: "Bəli. Keçmiş vergi öhdəliklərinin analizi, mübahisəli məbləğlərin hesablanması, vergi orqanları ilə razılaşma prosesinin idarə edilməsi — bunların hamısını həll edə bilirik. Erkən müdaxilə həmişə daha az ziyan deməkdir; problemi uzatmaq isə cərimə faizlərini artırır.",
      },
      {
        question: "Vergi qanunvericiliyindəki dəyişiklikləri izləyirsinizmi?",
        answer: "Bəli, bu bizim əsas öhdəliklərimizdən biridir. Vergi Məcəlləsindəki hər dəyişiklik izlənilir, müştərilərimiz proaktiv şəkildə məlumatlandırılır. Lazım olduqda vergi strategiyası yenilənir ki, siz həmişə qanunvericiliyə tam uyğun olasınız.",
      },
      {
        question: "Vergi konsaltinq xidmətinin qiyməti necə hesablanır?",
        answer: "Qiymət xidmət həcminə görə fərqlənir: bir dəfəlik vergi auditi, davamlı aylıq dəstək paketi və ya yoxlamaya hazırlıq ayrı-ayrı qiymətləndirilir. Şirkətin dövriyyəsi, üzərinə düşən vergi növlərinin sayı və bəyannamə tezliyi əsas amillərdir. İlkin konsultasiya pulsuzdur — bu görüşdə vəziyyət qiymətləndirilir və dəqiq qiymət razılaşdırılır.",
      },
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
    faqs: [
      {
        question: "KPI sistemi qurmaq nə qədər vaxt aparır?",
        answer: "Şirkətin ölçüsündən, struktur mürəkkəbliyindən və mövcud məlumat bazasından asılı olaraq 4–10 həftə çəkir. Bu müddət ərzində maliyyə KPI-ları müəyyənləşdirilir, ölçmə metodologiyası hazırlanır, hesabat şablonları yaradılır və komanda üçün istifadə sənədləşməsi tamamlanır.",
      },
      {
        question: "Maliyyə modelləri hansı formatlarda hazırlanır?",
        answer: "Excel, Google Sheets, Power BI və ya şirkətin istifadə etdiyi digər platformalarda hazırlanır. Modellər dinamik — ssenarilər üzrə dəyişənlərlə — qurulur ki, siz gələcəkdə müstəqil olaraq yeniləyə biləsiniz. Hər modelin üzərinə ətraflı istifadə bələdçisi verilir.",
      },
      {
        question: "Büdcə planlaması üçün ilk görüşə nə hazırlamalıyam?",
        answer: "Keçmiş 12–24 ayın gəlir-xərc məlumatları, şirkətin strateji hədəfləri, əsas xərc kateqoriyaları üzrə məlumat və investisiya planları (varsa) hazırlasanız, ilk görüş çox səmərəli keçər. Sıfırdan başlayırsanız narahat olmayın — biz hər iki halda işləyə bilirik.",
      },
      {
        question: "Maliyyə idarəçiliyi konsaltinqinin real faydası nədir?",
        answer: "Real nəticələr arasında büdcə kənarlaşmalarının 30–50% azalması, qərar qəbul sürətinin artması, investor danışıqları üçün güclü maliyyə sənədi və nağd pul axını idarəçiliyinin yaxşılaşması sayıla bilər. Çox vaxt ilk 90 gün ərzində investisiya geri qazanılmağa başlayır.",
      },
      {
        question: "Bu xidmət yalnız iri şirkətlər üçündürmü?",
        answer: "Xeyr. Maliyyə idarəçiliyi sistemi olmayan orta ölçülü şirkətlər bu xidmətdən ən çox faydalananlardır. Sürətlə böyüyən biznes üçün intuitiv qərarlardan rəqəmlərə əsaslanan idarəetməyə keçmək — böyüməni davamlı etməyin yeganə yoludur.",
      },
      {
        question: "Xidmətin qiyməti necə müəyyənləşdirilir?",
        answer: "Qiymət layihənin həcminə görə dəyişir: bir dəfəlik büdcə modelinin hazırlanması, KPI sisteminin qurulması və ya davamlı maliyyə idarəçiliyi dəstəyi ayrı-ayrı qiymətləndirilir. Əksər müştərilər ilk 90 gün ərzində investisiyanı geri qazandığını bildirir. İlkin konsultasiya pulsuzdur — bu görüşdə layihə həcmi və dəqiq qiymət razılaşdırılır.",
      },
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
    faqs: [
      {
        question: "Hansı ERP sistemlərini tövsiyə edirsiniz?",
        answer: "Tövsiyəmiz həmişə şirkətin ölçüsünə, sektora, büdcəyə və texniki imkanlara görə fərqlənir. Kiçik bizneslər üçün 1C, Odoo; orta müəssisələr üçün Microsoft Dynamics, SAP Business One; iri şirkətlər üçün SAP ERP, Oracle tipik seçimlərdir. Xüsusi tövsiyə üçün ilkin analiz aparılır.",
      },
      {
        question: "Mövcud proqramlarımı saxlaya bilərəm?",
        answer: "Mümkün olan hallarda — bəli. Biz mövcud sistemlərə hörmət edirik. Lakin bəzən sistemlər inteqrasiya üçün uyğun olmur. Bu zaman tam dəyişiklik yerinə yalnız inteqrasiya nöqtələrinin (API bağlantısı) yaradılmasını tövsiyə edə bilərik. Hər qərar sənədlə əsaslandırılır.",
      },
      {
        question: "Rəqəmsal transformasiya işçiləri çaşdırmırmı?",
        answer: "Düzgün idarə edildiyi zaman — xeyr. Biz dəyişiklik idarəçiliyi (change management) yanaşması ilə işləyirik: işçilər prosesə erkən cəlb edilir, təlim proqramları tədricən tətbiq olunur, keçid dövrü üçün paralel işləmə rejimi saxlanılır. Adaptasiya dəstəyi xidmət paketinə daxildir.",
      },
      {
        question: "Avtomatlaşdırma investisiyası özünü nə zaman ödəyir?",
        answer: "Əksər hallarda 6–18 ay ərzində. ROI hesablanması hər layihənin planlaşdırma mərhələsindən aparılır ki, investisiyanın nə vaxt geri qayıdacağını dəqiq biləsiniz. Bürokrasiyaya xərclənən saatlar, xəta düzəltmə xərcləri və itirilən imkanlar — hamısı modelə daxil edilir.",
      },
      {
        question: "Layihə başa çatdıqdan sonra texniki dəstək verirsinizsə?",
        answer: "Bəli. Sistemin canlıya keçməsindən sonra dəstək dövrü başlayır: işçilərin sualları cavablandırılır, kritik xətalar həll edilir, sistem tənzimlənir. Uzunmüddətli texniki dəstək müqavilələri ayrıca razılaşdırıla bilər.",
      },
      {
        question: "ERP tətbiqi layihəsinin qiyməti necə müəyyənləşdirilir?",
        answer: "Qiymət seçilən sistemə, şirkətin ölçüsünə, mövcud infrastruktura, tətbiq müddətinə və lazım olan modullara görə dəyişir. Layihə başlamadan ROI hesablaması aparılır ki, investisiyanın nə vaxt geri qayıdacağını dəqiq biləsiniz. Mövcud sistemin qiymətləndirilməsi konsultasiyası pulsuzdur.",
      },
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
    faqs: [
      {
        question: "HR auditi nə qədər vaxt aparır?",
        answer: "Şirkətin işçi sayından asılı olaraq 3–7 iş günü çəkir. Audit zamanı mövcud əmək müqavilələri, kadr sənədləşməsi, əmək haqqı hesablamaları, işə qəbul prosedurları və qanunvericiliyə uyğunluq yoxlanılır. Nəticə ətraflı hesabat şəklində təqdim edilir.",
      },
      {
        question: "Kiçik şirkətlər üçün HR xidməti niyə vacibdir?",
        answer: "Kiçik şirkətlər çox vaxt HR sistemsiz böyüyür — müqavilələr qeyri-rəsmidir, əmək qanunvericiliyi nəzərə alınmır, motivasiya sistemi mövcud deyil. Böyüməyə başlayan kimi bu boşluqlar hüquqi problemlərə çevrilir. Erkən qurulan düzgün HR sistemi sonradan böyük xərclərin qarşısını alır.",
      },
      {
        question: "Əmək qanunvericiliyindəki dəyişiklikləri izləyirsinizmi?",
        answer: "Bəli, bu əsas öhdəliklərimizdən biridir. Azərbaycan Əmək Məcəlləsindəki hər dəyişiklik izlənilir, müştərilərimiz proaktiv olaraq məlumatlandırılır. Lazım olduqda müqavilələr, siyasətlər və prosedurlar yenilənir.",
      },
      {
        question: "Mövcud işçiylə yaşanan mübahisəni həll etməyə kömək edirsinizmi?",
        answer: "Bəli. Əmək münasibətlərindən yaranan mübahisələrdə hüquqi çərçivənin analizi, danışıqlar üçün arqumentasiya hazırlığı, sənəd bütünlüyünün yoxlanılması və zəruri hallarda mediasiyaya yönləndirilmə xidmətlərini göstəririk. Çox vaxt məhkəməyə getmədən məsələ həll olunur.",
      },
      {
        question: "Əmək haqqı siyasəti necə hazırlanır?",
        answer: "Bazar araşdırması ilə başlayırıq: sektorda rəqabətli əmək haqqı səviyyələri, vəzifə bandları müəyyənləşdirilir. Ardından şirkətin büdcəsi, performans meyarları və inkişaf yolu nəzərə alınaraq ədalətli, motivasiyaedici əmək haqqı strukturu hazırlanır.",
      },
      {
        question: "HR konsaltinq xidmətinin qiyməti necə müəyyənləşdirilir?",
        answer: "Qiymət şirkətin işçi sayına, mövcud HR sisteminin vəziyyətinə və tələb olunan xidmətlərin həcminə əsasən müəyyənləşdirilir. HR auditi, tam HR sisteminin qurulması və davamlı aylıq dəstək paketi ayrı-ayrı qiymətləndirilir. İlkin konsultasiya pulsuzdur — bu görüşdə ehtiyaclar qiymətləndirilir və dəqiq qiymət razılaşdırılır.",
      },
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
      { title: "Mühasibatlıq və kadr mütəxəssislərinin təlimi", description: "Mühasibatlıq, vergi və HR sahəsində ixtisaslaşmış proqramlar — uğurla tamamlayanlara rəsmi sertifikat verilir." },
    ],
    targets: ["Maliyyəçilər", "Mühasiblər", "Şirkət rəhbərləri", "Karyerasını inkişaf etdirmək istəyənlər"],
    process: [
      { step: "01", title: "Ehtiyac analizi", description: "Bilik səviyyəniz və öyrənmə məqsədləriniz müəyyənləşdirilir." },
      { step: "02", title: "Proqram hazırlığı", description: "Sizin üçün xüsusi öyrənmə proqramı hazırlanır." },
      { step: "03", title: "Təlim prosesi", description: "Praktiki yönümlü, interaktiv təlimlər keçirilir." },
      { step: "04", title: "Qiymətləndirmə", description: "Biliklərin mənimsənilməsi yoxlanılır, sertifikat verilir." },
    ],
    faqs: [
      {
        question: "Bilik səviyyəm yetərsizdirsə, iştirak edə bilərəm?",
        answer: "Bəli, əlbəttə. Proqramlar başlanğıc, orta və inkişaf etmiş səviyyə üçün ayrıca hazırlanır. İlkin ehtiyac analizindən sonra tam olaraq sizin bilik səviyyənizdən başlayan proqram formalaşdırılır. Heç kim özü üçün uyğun olmayan mövzularla vaxtını itirmir.",
      },
      {
        question: "Qrup proqramı şirkətin öz komandası üçün keçirilə bilərmi?",
        answer: "Bəli, bu ən populyar formatlardan biridir. Şirkətin mühasibat, maliyyə və ya HR komandasına xüsusi hazırlanmış korporativ təlim proqramı təqdim edirik. Mövzu, müddət və format şirkətin ehtiyacına uyğun müzakirə edilir.",
      },
      {
        question: "Sertifikat beynəlxalq səviyyədə keçərlidirmi?",
        answer: "ProFinance Solutions tərəfindən verilən sertifikat peşəkar tamamlanma sertifikatıdır. Beynəlxalq sertifikatlara hazırlıq proqramları da mövcuddur — bu proqramlarda uğurla imtahan verənlər müvafiq beynəlxalq təşkilatların sertifikatlarını alır.",
      },
      {
        question: "Onlayn formatda öyrənmə proqresi necə izlənilir?",
        answer: "Hər iştirakçı üçün şəxsi öyrənmə paneli yaradılır. Modul tamamlanması, test nəticələri, vaxtında çatdırılma faizi real vaxtda izlənilir. Müəllim hər modul sonunda fərdi rəy bildirir. Qrup proqramlarında ümumi proqres şirkətə hesabat şəklində göndərilir.",
      },
      {
        question: "Təlim nə qədər müddət davam edir?",
        answer: "Formatdan asılı olaraq fərqlənir. Fərdi proqramlar 4–12 həftə, qrup proqramları 2–8 həftə, intensiv seminarlar isə 1–3 gün çərçivəsində keçirilir. Müddət iştirakçının öyrənmə hədəflərinə və şirkətin cədvəlinə uyğun razılaşdırılır.",
      },
      {
        question: "Təlim proqramının qiyməti necə müəyyənləşdirilir?",
        answer: "Qiymət proqramın formatına (fərdi, qrup, korporativ), müddətinə, mövzu həcminə və iştirakçı sayına görə dəyişir. Korporativ proqramlar şirkətin komanda ölçüsünə, cədvəlinə və öyrənmə hədəflərinə uyğun fərdiləşdirilir. İlkin ehtiyac analizi görüşü pulsuzdur — bu görüşdə proqram məzmunu, format və qiymət birlikdə razılaşdırılır.",
      },
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
    faqs: [
      {
        question: "Daxili audit ilə xarici audit arasındakı fərq nədir?",
        answer: "Daxili audit şirkətin öz daxili proseslərinin, nəzarət mexanizmlərinin və idarəetmə effektivliyinin qiymətləndirilməsidir — davamlı proses kimi aparılır. Xarici audit isə maliyyə hesabatlarının müstəqil üçüncü tərəf tərəfindən yoxlanılmasıdır: investorlar, banklar və tərəfdaşlar üçün etibarlılığı təsdiqləyir.",
      },
      {
        question: "Audit hesabatı nə qədər müddətdə hazır olur?",
        answer: "Şirkətin ölçüsü, sənədlərin vəziyyəti və audit əhatəsindən asılı olaraq 2–6 həftə çəkir. Kiçik müəssisələr üçün daha sürətli, mürəkkəb mühasibat strukturu olan şirkətlər üçün daha geniş zaman çərçivəsi nəzərdə tutulur. Başlamadan əvvəl dəqiq cədvəl razılaşdırılır.",
      },
      {
        question: "IFRS-ə keçid üçün audit məcburidirmi?",
        answer: "Qanunən məcburi olan şirkətlər üçün — bəli (xüsusən maliyyə qurumları, səhmdar cəmiyyətlər). Digər şirkətlər üçün IFRS-ə keçid auditsiz həyata keçirilə bilər, lakin audit keçidin düzgünlüyünü təsdiqləyir. Biz hər iki variantda — audit ilə və auditsiz — IFRS keçid dəstəyi göstəririk.",
      },
      {
        question: "Audit prosesi şirkətin işini pozurmu?",
        answer: "Minimal. Audit prosesini iş ritminizi pozmayacaq şəkildə planlaşdırırıq: sənəd sorğuları e-poçt vasitəsilə göndərilir, görüşlər sizin cədvələ uyğun planlaşdırılır, əsas iş vaxtlarında bilavasitə müdaxilə minimuma endirilir. Müştərilərimizin böyük əksəriyyəti audit zamanı normal fəaliyyətini tam davam etdirib.",
      },
      {
        question: "Audit yalnız qanuni öhdəlik kimi mi baxılmalıdır?",
        answer: "Xeyr — bu yanaşma şirkəti real dəyərdən məhrum edir. Müstəqil auditor baxışı idarəetmədəki zəif nöqtələri, gizli riskləri və itirilmiş imkanları aşkara çıxarır. Auditdən sonra şirkətlər investorlarla danışıqlarda, bank kreditlərini cəlb etməkdə və idarəetmə keyfiyyətini artırmaqda əhəmiyyətli üstünlük əldə edir.",
      },
      {
        question: "Audit xidmətinin qiyməti necə müəyyənləşdirilir?",
        answer: "Qiymət audit növünə (daxili/xarici/IFRS keçid), şirkətin ölçüsünə, maliyyə əməliyyatlarının mürəkkəbliyinə və audit əhatəsinə görə müəyyənləşdirilir. IFRS keçid auditi ilə illik hesabat auditi ayrı-ayrı qiymətləndirilir. Başlamadan əvvəl dəqiq qiymət, cədvəl və audit əhatəsi razılaşdırılır — ilkin görüş pulsuzdur.",
      },
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
