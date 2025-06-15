export const SERVICES = [
  {
    id: 'topping-up',
    nameEn: 'Topping Up',
    nameAr: 'زيادة الرصيد',
    descriptionEn: 'Reporting a payment to Rwafi Finance team so they can top up your account.',
    descriptionAr: 'ابلاغ فريق حسابات روافي بعملية دفع حتي يقوموا بتحديث الحسابات و زيادة الرصيد',
    icon: 'wallet',
    gradient: 'from-green-400 to-green-600',
    category: 'financial'
  },
  {
    id: 'transfer',
    nameEn: 'Transfer Request',
    nameAr: 'طلب تحويل',
    descriptionEn: 'Balance refund or transfer between accounts.',
    descriptionAr: 'استرداد او تحويل الرصيد بين الحسابات',
    icon: 'transfer',
    gradient: 'from-blue-400 to-blue-600',
    category: 'financial'
  },
  {
    id: 'complaint',
    nameEn: 'Complaint',
    nameAr: 'تقديم شكوى',
    descriptionEn: 'Report a complaint to Rwafi Management team.',
    descriptionAr: 'تقديم شكوي للفريق الاداري لروافي الأحلام',
    icon: 'message',
    gradient: 'from-red-400 to-red-600',
    category: 'support'
  },
  {
    id: 'government',
    nameEn: 'Government Affairs',
    nameAr: 'الخدمات الحكومية',
    descriptionEn: 'Request government affair service.',
    descriptionAr: 'طلب خدمات حكومية كتجديد الأقامة و الخروج و العودة',
    icon: 'building',
    gradient: 'from-purple-400 to-purple-600',
    category: 'government'
  }
];

export const POPULAR_TAGS = [
  'المحاكم',
  'التوثيق', 
  'السجل التجاري',
  'رخصة',
  'مركباتي',
  'التموين',
  'التأمين الاجتماعي'
];

export const NAVIGATION_LINKS = [
  { href: '#government-directory', label: 'دليل الجهات الحكومية', labelEn: 'Government Directory' },
  { href: '#browse-services', label: 'تصفح الخدمات', labelEn: 'Browse Services' }
];

export const MORE_DROPDOWN_ITEMS = [
  { href: '#about', label: 'من نحن', labelEn: 'About Us' },
  { href: '#contact', label: 'اتصل بنا', labelEn: 'Contact Us' },
  { href: '#support', label: 'الدعم الفني', labelEn: 'Technical Support' }
];

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px'
};

export const COLORS = {
  primary: '#1e40af',
  secondary: '#3b82f6',
  accent: '#06b6d4'
};
