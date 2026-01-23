# API Configuration Documentation

## Overview
تم جمع جميع API endpoints وتنظيمها في ملفات مركزية لسهولة الصيانة والتحديث.

## Files Created

### 1. `.env` - متغيرات البيئة
ملف يحتوي على جميع URLs الـ API مع الإمكانية لتغييرها حسب البيئة (development/production)

### 2. `js/config.js` - ملف الإعدادات المركزي
يحتوي على جميع API endpoints مع fallback قيم افتراضية.

## API Endpoints

### Authentication
- **Login**: `POST /api/Auth/login`
- **Register**: `POST /api/Auth/register`

### Trainers
- **Get All**: `GET /api/Trainer/all`
- **Add**: `POST /api/Trainer/add`
- **Edit**: `PUT /api/Trainer/edit`
- **Delete**: `DELETE /api/Trainer/delete/{id}`
- **Rate**: `POST /api/Trainer/rate`

### Packages
- **Get All**: `GET /api/Package/all`
- **Add**: `POST /api/Package/add`
- **Edit**: `PUT /api/Package/edit`
- **Delete**: `DELETE /api/Package/delete/{id}`
- **Place Order**: `POST /api/Package/place-order`

### Reservations
- **Add**: `POST /api/Reservation/add`

### Dashboard
- **Get Stats**: `GET /api/Dashboard`

## Updated Files

✅ `js/Admin.js` - Dashboard والمدربين والحقائب
✅ `js/login.js` - تسجيل الدخول
✅ `js/script.js` - عرض المدربين والتقييم
✅ `js/form.js` - نموذج الحجز
✅ `js/store.js` - عرض الحقائب
✅ `js/contact.js` - نموذج الطلب

## Changes Made

### 1. API URLs to Config Objects
```javascript
// Before
const res = await fetch("http://localhost:5184/api/Trainer/all", {...});

// After
const res = await fetch(API_CONFIG.TRAINER_ALL, {...});
```

### 2. Alert to SweetAlert
```javascript
// Before
if (!confirm("هل تريد الحذف؟")) return;
errorBox.innerText = "Server error";

// After
const result = await Swal.fire({
  title: "تأكيد الحذف",
  icon: "warning",
  showCancelButton: true
});

Swal.fire("خطأ", "Server error", "error");
```

## How to Use

### Change API Base URL
**Option 1: In `.env` file**
```
VITE_API_BASE_URL=https://api.production.com/api
```

**Option 2: In each file's API_CONFIG**
```javascript
const API_CONFIG = {
  TRAINER_ALL: 'https://api.production.com/api/Trainer/all',
  // ... rest of endpoints
};
```

## Benefits

✅ **Centralized Management** - جميع APIs في مكان واحد
✅ **Easy Maintenance** - تغيير API سهل جداً
✅ **Consistent Alerts** - جميع الرسائل تستخدم SweetAlert
✅ **Environment Support** - دعم متغيرات البيئة المختلفة
✅ **Better UX** - رسائل أجمل وأفضل
