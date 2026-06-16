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
    name: "Uçotun Diaqnostikası və Bərpası",
    tagline: "Maliyyə sağlamlığının ilk addımı",
    heroDescription: "Bakıda mühasibat uçotunun diaqnostikası və bərpası: xətalar aşkarlanır, sənədlər MHBS standartlarına uyğunlaşdırılır, audita hazırlıq təmin edilir.",
    overview: "Çox vaxt şirkətlər aylarca, hətta illərca yanlış aparılmış uçotla fəaliyyət göstərir — bunu nə müdiriyyət, nə də mühasib fərq edir. Diaqnostika xidmətimiz bu gizli riskləri üzə çıxarır. Biz şirkətinizin maliyyə tarixini sənəddən sənədə, qeyddən qeydə araşdırır, bütün uyğunsuzluqları siyahıya alır və Azərbaycan Respublikasının Mühasibat Uçotu haqqında Qanuna və MHBS standartlarına tam uyğun şəkildə bərpa planı hazırlayırıq. 1C, SAP və digər geniş yayılmış uçot proqramları ilə işləyirik. Proses şirkətin ölçüsündən asılı olaraq 5–15 iş günü çəkir və cari fəaliyyətinizi pozmir. Nəticədə şirkətiniz audita hazır, rəhbərliyə şəffaf və gələcək xətalardan qorunmuş bir maliyyə sisteminə sahib olur.",
    highlights: [
      "Uçot sisteminizin tam sağlamlıq yoxlaması aparılır",
      "Xətalar aradan qaldırılır, sənədlər standartlara uyğunlaşdırılır",
      "Şirkətiniz audita tam hazır vəziyyətə gətirilir",
    ],
    iconName: "ScanSearch",
    features: [
      { title: "Tam uçot yoxlaması", description: "Mövcud uçot sisteminin bütün aspektlərinin hərtərəfli analizi aparılır." },
      { title: "Xəta aşkarlanması", description: "Maliyyə qeydlərindəki uyğunsuzluqlar və xətalar dəqiqliklə müəyyənləşdirilir." },
      { title: "Standartlaşdırma", description: "Uçot prosesləri MHBS və Azərbaycan qanunvericiliyinə uyğun yenidən qurulur; 1C, SAP və digər proqramlarla tam uyğunluq təmin edilir." },
      { title: "Hesabat bərpası", description: "Keçmiş dövrün maliyyə hesabatları düzgün formada bərpa edilir." },
      { title: "Tövsiyə paketi", description: "Gələcəkdə eyni xətaların qarşısını almaq üçün detallı tövsiyə sənədi hazırlanır." },
      { title: "Audita hazırlıq", description: "Şirkətinizin xarici audit yoxlamasına tam hazır vəziyyətə gətirilməsi." },
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
    name: "Mühasibat Konsaltinqi",
    tagline: "Rəqəmlər arxasında etibarlı dəstək",
    heroDescription: "Bakıda mühasibat konsaltinqi: IFRS standartlarına uyğun uçot sistemi qurulur, gündəlik əməliyyatlar qeydə alınır, aylıq hesabatlar hazırlanır.",
    overview: "Mühasibat yalnız rəqəmlərin qeydə alınması deyil — bu, biznesinizin maliyyə tarixinin dürüst şəkildə sənədləşdirilməsidir. Düzgün aparılmayan mühasibat qərarları yanlışlaşdırır, vergi riskləri yaradır və banklar ilə münasibətləri çətinləşdirir. Biz Azərbaycan Respublikasının Mühasibat Uçotu haqqında Qanununa və MHBS standartlarına tam uyğun şəkildə şirkətinizin mühasibat sistemini qurur, gündəlik əməliyyatları qeydə alır, Balans hesabatı, Mənfəət/zərər hesabatı, Kapitalın dəyişməsi haqqında hesabat və Pul vəsaitlərinin hərəkəti haqqında hesabat daxil olmaqla bütün maliyyə hesabatlarını hazırlayırıq. 1C, SAP, QuickBooks, Xero kimi geniş yayılmış proqramlarla işləyirik — mövcud sistemə uyğunlaşırıq. Tam autsorsing formatında da, mövcud mühasibin yanında məsləhətçi kimi də işləyirik: hər iki halda daxili mühasib saxlamaqla müqayisədə xərci əhəmiyyətli dərəcədə azaldır. Siz isə yalnız biznesinizin inkişafına fokuslanırsınız.",
    highlights: [
      "Gündəlik maliyyə əməliyyatlarınız peşəkar şəkildə qeydə alınır",
      "Aylıq, rüblük və illik hesabatlar vaxtında hazırlanır",
      "IFRS standartlarına tam uyğun uçot sistemi qurulur",
    ],
    iconName: "Calculator",
    features: [
      { title: "Maliyyə hesabatları", description: "Aylıq, rüblük və illik maliyyə hesabatlarının peşəkar şəkildə hazırlanması." },
      { title: "Mühasibat siyasəti", description: "Şirkətinizin strukturuna uyğun mühasibat siyasətinin hazırlanması və tətbiqi." },
      { title: "Gündəlik uçot dəstəyi", description: "Əməliyyatların cari olaraq qeydə alınması: 1C, SAP, QuickBooks, Xero və digər sistemlərdə uçot idarə edilir. Mövcud proqrama tam uyğunlaşırıq." },
      { title: "IFRS standartları", description: "Beynəlxalq maliyyə hesabatlılığı standartlarına (MHBS/IFRS) uyğun uçotun aparılması — Balans hesabatı, Mənfəət/zərər hesabatı, Pul vəsaitlərinin hərəkəti haqqında hesabat daxil. MHBS-ə keçid 3–6 ay ərzində həyata keçirilir." },
      { title: "Vergi uçotu", description: "Vergi öhdəliklərinin düzgün uçotu və vaxtında hesablanması." },
      { title: "Dövri hesabatlar", description: "Statistika orqanlarına, banklara və tərəfdaşlara hesabatların hazırlanması." },
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
    name: "Vergi Konsaltinqi",
    tagline: "Qanuni optimizasiya, maksimum qənaət",
    heroDescription: "Bakıda vergi konsaltinqi: ƏDV, mənfəət vergisi bəyannamələri, qanuni optimallaşdırma, yoxlamaya hazırlıq — Vergi Məcəlləsinə tam uyğunluq.",
    overview: "Vergi öhdəlikləri hər şirkətin ən ciddi maliyyə riskidir. Yanlış hesablamalar, vaxtında verilməmiş bəyannamələr və Azərbaycan Respublikasının Vergi Məcəlləsindəki dəyişikliklərin izlənməməsi böyük cərimələrə və hüquqi problemlərə yol aça bilər. Biz ƏDV, mənfəət vergisi, gəlir vergisi, əmlak vergisi, torpaq vergisi, aksiz vergisi, sosial sığorta, tibbi sığorta və işsizlik sığortası üzrə bütün bəyannamələri dövlət elektron vergi sistemi vasitəsilə son tarixdən ən az 5–7 iş günü əvvəl hazırlayırıq. ƏDV geri qaytarılması, elektron qaimə-faktura idarəetməsi və Statistika Komitəsi hesabatları da xidmət paketinə daxildir. Eyni zamanda, çox şirkət qanuni optimizasiya imkanlarından xəbərsiz olaraq həddindən artıq vergi ödəyir — biz bu imkanları şirkətinizin profilinə uyğun tətbiq edərək vergi yükünüzü qanuni çərçivədə minimuma endiririk. Vergi yoxlaması zamanı nümayəndəmiz yanınızda olur — siz bu prosesi heç vaxt tək keçmirsiniz.",
    highlights: [
      "Vergi yükü qanuni yollarla optimallaşdırılır",
      "Bəyannamələr vaxtında və düzgün hazırlanır",
      "Vergi yoxlamalarına tam hazır olursunuz",
    ],
    iconName: "FileText",
    features: [
      { title: "Vergi planlaması", description: "Qanuni çərçivədə vergi yükünün minimuma endirilməsi üçün strategiyaların hazırlanması: ƏDV optimizasiyası, mənfəət vergisi üzrə xərc tanınması, güzəşt mexanizmlərinin tətbiqi daxil olmaqla." },
      { title: "Bəyannamə hazırlığı", description: "ƏDV, mənfəət vergisi, gəlir vergisi, əmlak vergisi, sosial və tibbi sığorta bəyannamələri son tarixdən 5–7 iş günü əvvəl dövlət elektron sistemi vasitəsilə təqdim edilir." },
      { title: "Yoxlamaya hazırlıq", description: "Vergi orqanlarının yoxlamalarına şirkəti tam hazır vəziyyətə gətirmək." },
      { title: "Risk analizi", description: "Cari vergi vəziyyətinin analizi, mövcud risklərin müəyyənləşdirilməsi." },
      { title: "Qanunvericilik izlənməsi", description: "Vergi qanunvericiliyindəki dəyişikliklərin izlənib biznesinizə tətbiq edilməsi." },
      { title: "Mübahisə həlli", description: "Vergi orqanları ilə yaranan mübahisə və problemlərin həllində peşəkar dəstək." },
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
    name: "Maliyyə və İdarəetmə Konsaltinqi",
    tagline: "Strategiyadan nəticəyə doğru",
    heroDescription: "Bakıda maliyyə konsaltinqi: büdcə planlaması, KPI sistemləri, maliyyə modelləri — büdcə kənarlaşmalarını 30–50% azaldır, CFO səviyyəli idarəetmə.",
    overview: "Böyüyən hər şirkət bir nöqtəyə çatır: intuitiv qərarlar artıq kifayət etmir, rəqəmlərə əsaslanan idarəetmə sisteminə ehtiyac yaranır. Bu xidmət şirkətinizin maliyyə idarəçiliyini peşəkar əsaslara qoyur. Biz Excel, Google Sheets, Power BI kimi platformalarda dinamik büdcə modelləri qurur, KPI sistemlərini tətbiq edir, investisiya analizi üçün NPV, IRR və geri ödəmə müddəti hesablayırıq. Müştərilərimiz büdcə kənarlaşmalarını orta hesabla 30–50% azaldır, qərar qəbul sürəti əhəmiyyətli dərəcədə artır. Maliyyə idarəçiliyi üçün tam ştat CFO saxlamağa ehtiyac yoxdur — biz eyni ekspertizanı daha çevik və sərfəli formatda təqdim edirik. Rəhbərliyə hər zaman dəqiq, vaxtında və etibarlı maliyyə məlumatı hazır olur.",
    highlights: [
      "Büdcə və maliyyə proqnozları peşəkar şəkildə hazırlanır",
      "KPI sistemi ilə performans ölçülür və izlənilir",
      "Strateji qərarlara dəstək verən maliyyə modelləri qurulur",
    ],
    iconName: "BarChart3",
    features: [
      { title: "Büdcə planlaması", description: "Şirkətin illik büdcəsinin hazırlanması, xərc və gəlirlərin proqnozlaşdırılması." },
      { title: "Maliyyə modelləşdirməsi", description: "Müxtəlif ssenarilərin maliyyə modellərinin qurulması və analizi." },
      { title: "KPI sistemləri", description: "Biznesin maliyyə göstəricilərinin ölçülməsi üçün KPI sistemlərinin qurulması." },
      { title: "Korporativ strategiya", description: "Uzunmüddətli maliyyə strategiyasının işlənib hazırlanması." },
      { title: "İnvestisiya analizi", description: "Potensial investisiyaların gəlirlilik və risk analizinin aparılması: NPV, IRR, geri ödəmə müddəti hesablanır, ssenarilər üzrə müqayisəli model qurulur." },
      { title: "Rəhbərlik hesabatları", description: "Operativ qərar qəbulu üçün idarəetmə hesabatlarının hazırlanması: Excel, Power BI və Google Sheets dashboard formatında, şirkətin rəhbərliyinə uyğun fərdiləşdirilir." },
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
    name: "Əməliyyat və Rəqəmsal Konsaltinq",
    tagline: "Biznesinizi rəqəmsallaşdırırıq",
    heroDescription: "Bakıda ERP tətbiqi: 1C, Odoo, SAP, Microsoft Dynamics sistemlərinin seçimi, tətbiqi, işçi təlimi — investisiya 6–18 ayda özünü ödəyir.",
    overview: "Rəqabət üstünlüyü artıq yalnız məhsula deyil, proseslərin sürət və effektivliyinə bağlıdır. Əl ilə aparılan proseslər vaxt itirir, xəta yaradır və böyüməni əngəlləyir. Biz şirkətinizin mövcud iş axınlarını araşdırır, darboğazları müəyyənləşdirir və 1C, Odoo, SAP Business One, Microsoft Dynamics kimi sistemlər arasından şirkətin ölçüsünə, sektoruna və büdcəsinə ən uyğun həlli seçib tətbiq edirik. Uçot, anbar, CRM, HR, istehsal — bütün modullar vahid sistemdə birləşdirilir. Dəyişiklik idarəçiliyi yanaşması ilə işçilərin adaptasiyası təmin edilir: keçid dövrü şirkətin normal fəaliyyətini pozmur. Biz hər sistemi müstəqil qiymətləndirir, müştəriyə ən sərfəli həlli tövsiyə edirik — bizi tək bir proqrama bağlı deyilik. Əksər hallarda investisiya 6–18 ay ərzində özünü ödəyir; hər layihənin planlaşdırma mərhələsindən ROI hesablaması aparılır.",
    highlights: [
      "Əl ilə görülən işlər avtomatlaşdırılır, vaxt qənaət edilir",
      "ERP sistemi şirkətə uyğun seçilir və tətbiq edilir",
      "Bütün proseslər izlənə bilən rəqəmsal formata keçirilir",
    ],
    iconName: "Monitor",
    features: [
      { title: "Proses avtomatlaşdırması", description: "Əl ilə aparılan proseslərin avtomatik sistemlərə keçirilməsi." },
      { title: "ERP tətbiqi", description: "Müəssisə resurs planlaması sistemlərinin seçilməsi və tətbiq edilməsi: 1C, Odoo, SAP Business One, Microsoft Dynamics — şirkətin ehtiyacına uyğun sistem müstəqil qiymətləndirilərək tövsiyə edilir." },
      { title: "Rəqəmsal iş axınları", description: "Biznes proseslərinin rəqəmsal mühitdə optimallaşdırılması." },
      { title: "Sistem inteqrasiyası", description: "Mövcud proqram təminatlarının API bağlantısı ilə inteqrasiyası və sinxronizasiyası — mühasibat, anbar, bank və HR sistemlərinin vahid məlumat axınına qoşulması." },
      { title: "Proses optimizasiyası", description: "İş axınlarında darboğazların müəyyənləşdirilməsi və aradan qaldırılması." },
      { title: "Kadr təlimi", description: "Yeni sistemlər üzrə işçilərin öyrədilməsi və adaptasiyası." },
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
    name: "HR və Kadrlar üzrə Konsaltinq",
    tagline: "İnsanı mərkəzə qoyuruq",
    heroDescription: "Bakıda HR konsaltinqi: Əmək Məcəlləsinə uyğun kadr sənədləşməsi, motivasiya sistemləri, DƏMK yoxlamalarına hazırlıq — işçi sayından asılı olmayaraq.",
    overview: "İnsanlar hər şirkətin ən dəyərli resursu və eyni zamanda ən böyük hüquqi riskidir. Azərbaycan Respublikasının Əmək Məcəlləsinə uyğunsuzluq, düzgün qurulmamış HR prosesləri və zəif motivasiya sistemi şirkətin həm maliyyəsinə, həm də reputasiyasına ciddi ziyan vura bilər. Dövlət Əmək Müfəttişliyi (DƏMK) yoxlamaları zamanı hər qanun pozuntusu üçün ciddi maliyyə sanksiyaları tətbiq edilir. Biz şirkətinizin HR sistemini başdan sona quraraq əmək müqavilələri, vəzifə təsvirləri, daxili iş qaydaları və kadr siyasəti sənədlərini hazırlayır, işçi məmnuniyyətini artıran motivasiya mexanizmləri tətbiq edir, DSMF (Dövlət Sosial Müdafiə Fondu) öhdəliklərini tam uyğun formada idarə edirik. HR auditi 3–7 iş günü ərzində tamamlanır — nəticədə şirkətiniz həm qanunvericiliyə uyğun, həm DƏMK yoxlamasına hazır vəziyyətdə olur.",
    highlights: [
      "Əmək münasibətləri qanunvericiliyə tam uyğun qurulur",
      "İşçi motivasiyası və məhsuldarlığı artırılır",
      "HR prosesləri sistemli və ölçülə bilən formata salınır",
    ],
    iconName: "Users",
    features: [
      { title: "Əmək münasibətləri", description: "Əmək Məcəlləsi və DƏMK tələblərinə tam uyğun əmək müqavilələri, vəzifə təsvirləri, daxili iş qaydaları və kadr siyasəti sənədlərinin hazırlanması." },
      { title: "Əmək haqqı siyasəti", description: "Bazar standartlarına uyğun ədalətli əmək haqqı sisteminin hazırlanması." },
      { title: "HR prosesləri", description: "İşə qəbul, adaptasiya, qiymətləndirmə proseslərinin sistemli qurulması." },
      { title: "Motivasiya sistemləri", description: "İşçi məmnuniyyəti və məhsuldarlığı artıran motivasiya mexanizmlərinin tətbiqi." },
      { title: "Kadr sənədləşməsi", description: "Bütün HR sənədlərinin Əmək Məcəlləsi tələblərinə uyğun hazırlanması: əmək müqavilələri, əmrlər, xidmət vərəqələri, DSMF hesabatları daxil olmaqla." },
      { title: "Əmək mübahisələri", description: "Əmək münasibətlərindən yaranan mübahisələrin qanuni həlli." },
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
    name: "Təlim və İnkişaf",
    tagline: "Bilik gücə çevrilir",
    heroDescription: "Bakıda maliyyə və mühasibat təlimi: ACCA, CFA hazırlığı, korporativ qrup proqramları, fərdi kurslar — sertifikatlı, praktiki ssenarilərə əsaslı.",
    overview: "Düzgün kadr investisiyası şirkətin ən sərfəli xərcidir. Maliyyə və uçot sahəsindəki bilikli komanda xərcləri azaldır, riskləri minimuma endirir və daha sürətli qərarlar qəbul edir. Proqramlarımız nəzəri biliyə deyil, real iş ssenarilərinə əsaslanır: mühasibat, vergi, MHBS/IFRS, maliyyə idarəçiliyi mövzuları praktiki tapşırıqlarla möhkəmləndirilir. ACCA DipIFR, CPA, CFA kimi beynəlxalq sertifikasiyalara hazırlıq proqramları da mövcuddur. Hər proqram üç formatda təqdim edilir: fərdi (4–12 həftə), qrup (2–8 həftə) və intensiv seminar (1–3 gün). Şirkətin maliyyə, mühasibat və ya HR komandasına xüsusi hazırlanmış korporativ proqram ProFinance Solutions-un əsas üstünlüyüdür — şirkətin real iş prosesləri, proqramları və komanda dinamikası üzərindən öyrənilir. Proqramı uğurla tamamlayanlara rəsmi sertifikat verilir.",
    highlights: [
      "Proqram hər iştirakçının bilik səviyyəsinə uyğun hazırlanır",
      "Real iş ssenarilərinə əsaslanan praktiki öyrənmə",
      "Proqramı tamamlayanlara rəsmi sertifikat verilir",
    ],
    iconName: "GraduationCap",
    features: [
      { title: "Fərdi təlimlər", description: "Şəxsi ehtiyaclara uyğun hazırlanmış fərdi öyrənmə proqramları." },
      { title: "Qrup proqramları", description: "Şirkət komandası üçün xüsusi hazırlanmış qrup təlim proqramları." },
      { title: "Sertifikasiya", description: "ACCA DipIFR, CPA, CFA, Peşəkar Mühasib kimi beynəlxalq sertifikasiya imtahanlarına hazırlıq proqramları — keçən imtahanlarda uğurlu nəticə məqsədi ilə qurulmuş kurikulum." },
      { title: "Praktiki tapşırıqlar", description: "Real biznes ssenarilərini əhatə edən praktik tapşırıq və təhlillər." },
      { title: "Onlayn modullar", description: "Öz tempinizlə keçə biləcəyiniz onlayn öyrənmə modulları — şəxsi öyrənmə paneli ilə modul tamamlanması, test nəticələri və ümumi proqres real vaxtda izlənilir." },
      { title: "Sertifikat", description: "Proqramı uğurla tamamlayanlara rəsmi sertifikat verilir." },
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
        answer: "ProFinance Solutions tərəfindən verilən sertifikat peşəkar tamamlanma sertifikatıdır. Beynəlxalq sertifikasiyalar (ACCA, CPA, CFA) üçün hazırlıq proqramları da mövcuddur — bu proqramlarda uğurla imtahan verənlər müvafiq beynəlxalq orqanların sertifikatlarını alır.",
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
    name: "Auditor Xidmətləri",
    tagline: "Müstəqil baxış, dəqiq nəticə",
    heroDescription: "Bakıda audit xidmətləri: ISA standartlarına uyğun daxili, xarici audit, IFRS hesabatı — investorlar və banklar üçün etibarlı, müstəqil audit hesabatı.",
    overview: "Audit yalnız qanuni öhdəlik deyil — şirkətin maliyyə sağlamlığının ən obyektiv ölçüsüdür. Azərbaycanda açıq səhmdar cəmiyyətlər, banklar, sığorta şirkətləri, xarici investisiyalı müəssisələr və bir sıra dövlət şirkətləri üçün audit qanunən məcburidir. Müstəqil auditor baxışı idarəetmədəki zəif nöqtələri, gizli riskləri və itirilmiş imkanları aşkara çıxarır. Biz şirkətinizin maliyyə hesabatlarını Beynəlxalq Audit Standartlarına (ISA) və MHBS/IFRS-ə uyğun yoxlayır, bütün riskləri qiymətləndirir, rəhbərliyə əməli tövsiyələr təqdim edirik. Proses 2–6 həftə ərzində tamamlanır; şirkətin normal iş fəaliyyəti minimuma qədər pozulur. Nəticədə şirkət investor danışıqlarında, bank kredit cəlbetməsində və dövlət tenderlərinə iştirakda əhəmiyyətli üstünlük əldə edir.",
    highlights: [
      "Maliyyə hesabatları beynəlxalq standartlara görə yoxlanılır",
      "Gizli risklər və zəif nöqtələr aşkara çıxarılır",
      "İnvestorlar və banklar üçün etibarlı audit hesabatı hazırlanır",
    ],
    iconName: "ShieldCheck",
    features: [
      { title: "Daxili audit", description: "Şirkətin daxili nəzarət sisteminin effektivliyinin müstəqil qiymətləndirilməsi." },
      { title: "Xarici audit", description: "Maliyyə hesabatlarının müstəqil auditor tərəfindən ISA (Beynəlxalq Audit Standartları) əsasında hərtərəfli yoxlanılması — investorlar, banklar və tərəfdaşlar üçün etibarlılığın təsdiqi." },
      { title: "IFRS hesabatı", description: "Beynəlxalq maliyyə hesabatlılığı standartlarına (MHBS/IFRS) uyğun hesabatların hazırlanması — ilk keçid auditindən başlayaraq illik IFRS hesabatlarına qədər tam dəstək." },
      { title: "Risk qiymətləndirilməsi", description: "Biznes risklərinin müəyyənləşdirilməsi və idarə edilməsi üçün tövsiyələr." },
      { title: "Uyğunluq auditi", description: "Qanunvericilik tələblərinə uyğunluğun hərtərəfli yoxlanılması." },
      { title: "Audit hesabatı", description: "Detallı audit hesabatı və idarəetmə məktubunun hazırlanması." },
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
