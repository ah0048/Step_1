
// إعداد معالجات الأحداث
function setupEventListeners() {
  // معالجات التنقل
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
     
      const section = link.getAttribute('data-section');
      showSection(`#${section}`);
    });
  });

 

  // معالجات النماذج
  const registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', handleRegistrationForm);
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }

  // معالج تغيير اللغة
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
     
      const lang = btn.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
}

// نظام الترجمة
const translations = {
  ar: {
    'start-journey': 'ابدأ رحلتك الآن',
    'invest': 'استثمر ',
    'future': 'عقل',
    'your-child': 'طفلك',
    'hero-desc1': 'رؤيتنا :الارتقاء بجيل سوي قادر علي نهضة المجتمع',
    'hero-desc2': 'رسالتنا : ىالوصول بالعلم لكل معلم ومربي اينما كان ونكون للطفل من يستثمره',
    'start-now': 'ابدأ رحلتك الآن',
    'explore': 'اكتشف المزيد',
    'about-us': 'من نحن؟',
    'about-desc-1': ' اكاديمية step 1 التعليمية للاستشارة والتدريب ، هي اكاديمية تهدف الي تقديم خدمات تعليمية تربوية للمعلمين وأولياء الامور ونعتمد علي منهجية منتسوري في التعليم والتريبة وتأسيس الطفل  فذلك يجعلنا نساعد الطفل علي الاكتشاف والتعلم السريع. حيث تعمد الأكاديمية علي اقسام رئيسية(كورسات، ورش عمل- استشارات - جلسات -حصص تأسيس بنهج منتسوري - حلقات قرآن)',
    'families': ' +15 معلم متخصص في مجال الطفل',
    'specialists': ' اخصائيين واستشاريين لحل مشاكل الطفل',
    'rating': ' حقائب تعليمية صنعت خصيصا لطفلك',
    'featured': 'محتوى مميز',
    'popular': ' الافضل ',
    'featured-1-title': ' اشتراك نصف سنوي ',
    'featured-1.1-title': ' جلسة واحدة ',
    'featured-1-desc': ' سعر الجلسة : 130 EGP',
    'featured-1.1-desc': '  سعر الاشتراك نصف السنوي : 6240 EGP ',
    'featured-2-title': 'اشتراك ربع سنوي',
    'featured-2.2-title': ' 24 جلسة ',
    'featured-2-desc': 'سعر الجلسة : 162.5 EGP',
    'featured-2.2-desc': ' سعر الاشتراك ربع السنوي : 3900 EGP',
    'featured-3-title': ' اشتراك شهري',
    'featured-3.3-title': '  8 جلسات ',
    'featured-3-desc': '  سعر الجلسة : 200 EGP',
    'featured-3.3-desc': ' سعر الاشتراك الشهري : 1600 EGP',
    'cta-title': 'ابدأ رحلة التميز مع طفلك اليوم',
    'cta-desc': 'انضم إلى العائلات التي وضعت ثقتها في برامجنا المبتكرة لأطفالهم',
    'contact-us': 'تواصل مع مستشار',
    'choose-counselor': 'اختر مدربك المثالى',
    'counselor-subtitle': 'فريق من الخبراء والمدربين والمتخصصين في مشاكل الأطفال للتدخل',
    'book-now': 'احجز موعد',
    'store': 'المتجر',
    'store-subtitle': 'اكتر البرامج المناسب لحالتك واستثمر في مستقبلك',
    'limited': 'خصم محدود',
    'new': 'الأكثر شيوعاً',
    'product-1': 'جلسات التنمية الذهنية',
    'product-1-desc': 'جلسات أسبوعية لتنمية القدرات الذهنية للطفل',
    'product-2': 'دورة المهارات الاجتماعية',
    'product-2-desc': 'دورة تفاعلية لتطوير المهارات الاجتماعية لدى الطفل',
    'product-3': 'برنامج الاستشارة الشهرية',
    'product-3-desc': 'برنامج متكامل من الاستشارات مع أفضل المتخصصين',
    'product-4': 'باقة التميز الشاملة',
    'product-4-desc': 'باقة شاملة تجمع كل البرامج التدريبية',
    'product-5': 'دورة الابداع والخيال',
    'product-5-desc': 'تنمية الجوانب الابداعية لدى طفلك عن طريق العمل',
    'product-6': 'برنامج بناء الثقة',
    'product-6-desc': 'برامج متميز لبناء ثقة طفلك بذاته',
    'add-basket': '🛒 أضف للسلة',
    'footer-desc': 'ليبقي الأثر 💪🧠',
    'quick-links': 'روابط سريعة',
    'home': 'الرئيسية',
    'counselors': 'المدربين',
    'store-link': 'المتجر',
    'contact': 'تواصل معنا',
    'rights': 'جميع الحقوق محفوظة',
    'registration-title': 'ابدأ رحلتك معنا',
    'registration-subtitle': 'سجل بياناتك واحجز موعدك مع أفضل المتخصصين',
    'parent-name': 'اسم ولي الأمر',
    'child-name': 'اسم الطفل',
    'phone': 'رقم الهاتف',
    'email': 'البريد الإلكتروني',
    'child-age': 'عمر الطفل',
    'service-type': 'نوع الخدمة المطلوبة',
    'select-service': 'اختر الخدمة',
    'consultation': 'استشارة',
    'training': 'تدريب',
    'assessment': 'تقييم',
    'therapy': 'علاج',
    'preferred-date': 'التاريخ المفضل',
    'additional-info': 'معلومات إضافية',
    'submit-booking': 'احجز موعدك الآن',
    'contact-title': 'تواصل معنا',
    'contact-subtitle': 'نحن هنا للإجابة على استفساراتك ومساعدتك في رحلة طفلك',
    'your-name': 'اسمك',
    'subject': 'الموضوع',
    'select-subject': 'اختر الموضوع',
    'general-inquiry': 'استفسار عام',
    'services-info': 'معلومات عن الخدمات',
    'pricing': 'الأسعار',
    'suggestion': 'اقتراح',
    'complaint': 'شكوى',
    'message': 'الرسالة',
    'send-message': 'إرسال الرسالة',
    'email-us': 'راسلنا',
    'call-us': 'اتصل بنا',
    'visit-us': 'زرنا',
    'address': 'الرياض، المملكة العربية السعودية'
  },
  en: {
    'start-journey': 'Start Your Journey Now',
    'invest': 'Invest in',
    'future': 'Future',
    'your-child': 'Your Child',
    'hero-desc': 'With Step 1, we offer innovative educational programs tailored for children, and comprehensive care programs to support growth under one umbrella that combines rehabilitation and training services for your child',
    'start-now': 'Start Your Journey Now',
    'explore': 'Explore More',
    'about-us': 'About Us',
    'about-desc-1': 'Step 1 is an innovative platform in the field of child care, offering medical, educational consultations, and simple medical procedures, in addition to experimental therapeutic studies and statistics that help better understand the needs of each child. We believe that every child deserves a strong and comfortable start on their journey to a bright future.',
    'about-desc-2': 'We provide specialized consultations in nutrition and health, and simple medical procedures such as home examinations and periodic follow-ups with home and physical examinations.',
    'families': 'Satisfied Families',
    'specialists': 'Specialists',
    'rating': 'User Rating',
    'featured': 'Featured Content',
    'popular': 'Most Popular',
    'featured-1-title': 'What is the Right Step?',
    'featured-1-desc': 'The first and most important basics is self-awareness',
    'featured-2-title': 'Essential Skills for Children',
    'featured-2-desc': 'The most important basic skills your child needs on their growth journey',
    'featured-3-title': 'Book a Monthly Consultation',
    'featured-3-desc': 'Benefit from our monthly offers and follow-up with our best specialists',
    'cta-title': 'Start Your Child\'s Excellence Journey Today',
    'cta-desc': 'Join families who have placed their trust in our innovative programs for their children',
    'contact-us': 'Contact a Consultant',
    'choose-counselor': 'Choose Your Ideal Trainer',
    'counselor-subtitle': 'A team of experts, trainers and specialists in children\'s problems for intervention',
    'book-now': 'Book Now',
    'store': 'Store',
    'store-subtitle': 'Choose the most suitable programs for your case and invest in your future',
    'limited': 'Limited Discount',
    'new': 'Most Popular',
    'product-1': 'Mental Development Sessions',
    'product-1-desc': 'Weekly sessions for developing children\'s mental abilities',
    'product-2': 'Social Skills Course',
    'product-2-desc': 'An interactive course to develop children\'s social skills',
    'product-3': 'Monthly Consultation Program',
    'product-3-desc': 'A comprehensive program of consultations with the best specialists',
    'product-4': 'Comprehensive Excellence Package',
    'product-4-desc': 'A comprehensive package that includes all training programs',
    'product-5': 'Creativity and Imagination Course',
    'product-5-desc': 'Developing your child\'s creative aspects through work',
    'product-6': 'Confidence Building Program',
    'product-6-desc': 'Distinctive programs to build your child\'s self-confidence',
    'add-basket': '🛒 Add to Cart',
    'footer-desc': 'Invest in your child\'s future with our specialized and innovative programs',
    'quick-links': 'Quick Links',
    'home': 'Home',
    'counselors': 'Trainers',
    'store-link': 'Store',
    'contact': 'Contact Us',
    'rights': 'All Rights Reserved',
    'registration-title': 'Start Your Journey With Us',
    'registration-subtitle': 'Register your information and book an appointment with our best specialists',
    'parent-name': 'Parent Name',
    'child-name': 'Child Name',
    'phone': 'Phone Number',
    'email': 'Email Address',
    'child-age': 'Child Age',
    'service-type': 'Required Service Type',
    'select-service': 'Select Service',
    'consultation': 'Consultation',
    'training': 'Training',
    'assessment': 'Assessment',
    'therapy': 'Therapy',
    'preferred-date': 'Preferred Date',
    'additional-info': 'Additional Information',
    'submit-booking': 'Book Your Appointment Now',
    'contact-title': 'Contact Us',
    'contact-subtitle': 'We are here to answer your inquiries and help you in your child\'s journey',
    'your-name': 'Your Name',
    'subject': 'Subject',
    'select-subject': 'Select Subject',
    'general-inquiry': 'General Inquiry',
    'services-info': 'Services Information',
    'pricing': 'Pricing',
    'suggestion': 'Suggestion',
    'complaint': 'Complaint',
    'message': 'Message',
    'send-message': 'Send Message',
    'email-us': 'Email Us',
    'call-us': 'Call Us',
    'visit-us': 'Visit Us',
    'address': 'Riyadh, Saudi Arabia'
  },
  fr: {
    'start-journey': 'Commencez Votre Voyage Maintenant',
    'invest': 'Investissez dans',
    'future': 'Avenir',
    'your-child': 'Votre Enfant',
    'hero-desc': 'Avec Step 1, nous proposons des programmes éducatifs innovants adaptés aux enfants et des programmes de soins complets pour soutenir la croissance sous un même toit qui combine services de réhabilitation et de formation pour votre enfant',
    'start-now': 'Commencez Maintenant',
    'explore': 'Explorer Plus',
    'about-us': 'À Propos de Nous',
    'about-desc-1': 'Step 1 est une plateforme innovante dans le domaine de la garde d\'enfants, offrant des consultations médicales, éducatives et des procédures médicales simples, ainsi que des études thérapeutiques expérimentales et des statistiques qui aident à mieux comprendre les besoins de chaque enfant. Nous croyons que chaque enfant mérite un départ solide et confortable dans son voyage vers un avenir brillant.',
    'about-desc-2': 'Nous proposons des consultations spécialisées en nutrition et santé, et des procédures médicales simples telles que des examens à domicile et des suivis périodiques avec examens à domicile et physiques.',
    'families': 'Familles Satisfaites',
    'specialists': 'Spécialistes',
    'rating': 'Évaluation des Utilisateurs',
    'featured': 'Contenu en Vedette',
    'popular': 'Plus Populaire',
    'featured-1-title': 'Quel est le Bon Pas?',
    'featured-1-desc': 'Le premier et le plus important fondement est la conscience de soi',
    'featured-2-title': 'Compétences Essentielles pour Enfants',
    'featured-2-desc': 'Les compétences de base les plus importantes dont votre enfant a besoin dans son parcours de croissance',
    'featured-3-title': 'Réservez une Consultation Mensuelle',
    'featured-3-desc': 'Profitez de nos offres mensuelles et du suivi avec nos meilleurs spécialistes',
    'cta-title': 'Commencez le Voyage d\'Excellence de Votre Enfant Aujourd\'hui',
    'cta-desc': 'Rejoignez les familles qui ont fait confiance à nos programmes innovants pour leurs enfants',
    'contact-us': 'Contactez un Consultant',
    'choose-counselor': 'Choisissez Votre Formateur Idéal',
    'counselor-subtitle': 'Une équipe d\'experts, de formateurs et de spécialistes des problèmes d\'enfants pour l\'intervention',
    'book-now': 'Réserver Maintenant',
    'store': 'Boutique',
    'store-subtitle': 'Choisissez les programmes les plus adaptés à votre cas et investissez dans votre avenir',
    'limited': 'Réduction Limitée',
    'new': 'Plus Populaire',
    'product-1': 'Séances de Développement Mental',
    'product-1-desc': 'Séances hebdomadaires pour développer les capacités mentales des enfants',
    'product-2': 'Cours de Compétences Sociales',
    'product-2-desc': 'Un cours interactif pour développer les compétences sociales des enfants',
    'product-3': 'Programme de Consultation Mensuelle',
    'product-3-desc': 'Un programme complet de consultations avec les meilleurs spécialistes',
    'product-4': 'Forfait Excellence Complet',
    'product-4-desc': 'Un forfait complet qui comprend tous les programmes de formation',
    'product-5': 'Cours de Créativité et Imagination',
    'product-5-desc': 'Développer les aspects créatifs de votre enfant par le travail',
    'product-6': 'Programme de Développement de la Confiance',
    'product-6-desc': 'Programmes distinctifs pour renforcer la confiance en soi de votre enfant',
    'add-basket': '🛒 Ajouter au Panier',
    'footer-desc': 'Investissez dans l\'avenir de votre enfant avec nos programmes spécialisés et innovants',
    'quick-links': 'Liens Rapides',
    'home': 'Accueil',
    'counselors': 'Formateurs',
    'store-link': 'Boutique',
    'contact': 'Contactez-nous',
    'rights': 'Tous Droits Réservés',
    'registration-title': 'Commencez Votre Voyage Avec Nous',
    'registration-subtitle': 'Enregistrez vos informations et réservez un rendez-vous avec nos meilleurs spécialistes',
    'parent-name': 'Nom du Parent',
    'child-name': 'Nom de l\'Enfant',
    'phone': 'Numéro de Téléphone',
    'email': 'Adresse Email',
    'child-age': 'Âge de l\'Enfant',
    'service-type': 'Type de Service Requis',
    'select-service': 'Sélectionner le Service',
    'consultation': 'Consultation',
    'training': 'Formation',
    'assessment': 'Évaluation',
    'therapy': 'Thérapie',
    'preferred-date': 'Date Préférée',
    'additional-info': 'Informations Supplémentaires',
    'submit-booking': 'Réservez Votre Rendez-vous Maintenant',
    'contact-title': 'Contactez-nous',
    'contact-subtitle': 'Nous sommes là pour répondre à vos questions et vous aider dans le voyage de votre enfant',
    'your-name': 'Votre Nom',
    'subject': 'Sujet',
    'select-subject': 'Sélectionner le Sujet',
    'general-inquiry': 'Demande Générale',
    'services-info': 'Informations sur les Services',
    'pricing': 'Tarification',
    'suggestion': 'Suggestion',
    'complaint': 'Plainte',
    'message': 'Message',
    'send-message': 'Envoyer le Message',
    'email-us': 'Écrivez-nous',
    'call-us': 'Appelez-nous',
    'visit-us': 'Visitez-nous',
    'address': 'Riyad, Arabie Saoudite'
  }
};

let currentLang = 'ar';

function switchLanguage(lang) {
  console.log('Switching language to:', lang);
  currentLang = lang;

  // تحديث الأزرار النشطة
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // تحديث اتجاه النص
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  // ترجمة النصوص
  translatePage();

  // حفظ اللغة المختارة
  localStorage.setItem('step1_language', lang);
}

function translatePage() {
  console.log('Translating page to:', currentLang);
  const elements = document.querySelectorAll('[data-translate]');
  console.log('Found elements to translate:', elements.length);

  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[currentLang] && translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
      console.log(`Translated ${key}: ${translations[currentLang][key]}`);
    } else {
      console.warn(`Translation missing for key: ${key} in language: ${currentLang}`);
    }
  });

  // تحديث عنوان الصفحة
  if (currentLang === 'ar') {
    document.title = 'Step 1 - استثمر في مستقبل طفلك';
  } else if (currentLang === 'en') {
    document.title = 'Step 1 - Invest in Your Child\'s Future';
  } else if (currentLang === 'fr') {
    document.title = 'Step 1 - Investissez dans l\'Avenir de Votre Enfant';
  }
}

// تهيئة التطبيق
function initializeApp() {
  console.log('Initializing Step 1 Platform...');

  // تحميل اللغة المحفوظة
  const savedLang = localStorage.getItem('step1_language') || 'ar';
  currentLang = savedLang;

  // تحديث الأزرار النشطة
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`[data-lang="${currentLang}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // تحديث اتجاه النص
  document.documentElement.setAttribute('lang', currentLang);
  document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

  // إعداد معالجات الأحداث
  setupEventListeners();

  // تحميل البيانات الأولية
  loadCounselors();
  loadStore();

  // ترجمة الصفحة
  translatePage();

  // إضافة رابط لوحة التحكم في الفوتر
  addAdminLink();

  console.log('Step 1 Platform initialized successfully!');
}



// بدء التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeApp);

// تصدير الدوال للاستخدام العام
window.showSection = showSection;
window.addToCart = addToCart;
window.openAdminPanel = openAdminPanel;
window.handleRegistrationForm = handleRegistrationForm;
window.handleContactForm = handleContactForm;