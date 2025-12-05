const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// إعدادات الأمان
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// خدمة الملفات الثابتة
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// إنشاء مجلد الرفع إذا لم يكن موجوداً
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// إنشاء مجلد قاعدة البيانات
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// قاعدة بيانات بسيطة في الذاكرة
let counselors = [
  {
    id: 1,
    name: 'د. ليلى عمر',
    specialty: 'اختصاصية نفسية للأطفال',
    description: 'متخصصة في علم النفس وتعديل السلوك',
    image_url: '/Asmaa Mohamed Abd El- salam.jpg',
    rating: 4.9,
    sessions_count: 80,
    price_per_session: 200,
    tags: ['علم النفس', 'تعديل السلوك', 'التطور النفسي'],
    is_active: true
  },
  {
    id: 2,
    name: 'أ. محمد حسين',
    specialty: 'مدرب لتنمية المهارات',
    description: 'متخصص في تنمية المهارات والتواصل',
    image_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    sessions_count: 60,
    price_per_session: 180,
    tags: ['التوحد', 'تنمية المهارات', 'التواصل'],
    is_active: true
  },
  {
    id: 3,
    name: 'د. سارة أحمد',
    specialty: 'متخصصة في التوحد السلوكي',
    description: 'خبيرة في علاج التوحد والسلوك',
    image_url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    sessions_count: 90,
    price_per_session: 220,
    tags: ['السلوك السلوكي', 'التوحد السلوكي', 'تعديم الذات'],
    is_active: true
  }
];

let bookings = [];
let contacts = [];

// مسارات API

// الحصول على المدربين
app.get('/api/counselors', (req, res) => {
  res.json({
    success: true,
    data: counselors.filter(c => c.is_active)
  });
});

// إرسال طلب حجز
app.post('/api/bookings', (req, res) => {
  const booking = {
    id: bookings.length + 1,
    ...req.body,
    status: 'pending',
    created_at: new Date().toISOString()
  };
  bookings.push(booking);
  
  res.json({
    success: true,
    message: 'تم إرسال طلب الحجز بنجاح',
    data: { id: booking.id }
  });
});

// إرسال رسالة تواصل
app.post('/api/contacts', (req, res) => {
  const contact = {
    id: contacts.length + 1,
    ...req.body,
    status: 'unread',
    created_at: new Date().toISOString()
  };
  contacts.push(contact);
  
  res.json({
    success: true,
    message: 'تم إرسال رسالتك بنجاح',
    data: { id: contact.id }
  });
});

// مسار الصحة
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Step 1 Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// مسار الجذر
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Step 1 Backend API',
    endpoints: {
      health: '/api/health',
      counselors: '/api/counselors',
      bookings: '/api/bookings',
      contacts: '/api/contacts'
    }
  });
});

// بدء الخادم
app.listen(PORT, () => {
  console.log(`🚀 Step 1 Backend Server is running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📁 Upload Directory: ${uploadDir}`);
});

module.exports = app;
