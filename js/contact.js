const API_BASE_URL = 'https://step-1-academy.runasp.net/api';
document.addEventListener("DOMContentLoaded", () => {
  // API Configuration
  const API_CONFIG = {
    PACKAGE_PLACE_ORDER: `${API_BASE_URL}/Package/place-order`
  };

  const packageId = localStorage.getItem("selectedPackageId");
  const packageName = localStorage.getItem("selectedPackageName");

  const packageInput = document.getElementById("packageName");
  const submitBtn = document.getElementById("submitPackage");
  
  if (!packageInput || !submitBtn) return;

  // إذا لم يتم اختيار باقة، فقط فعّل الزر عند ملء البيانات
  if (!packageId || !packageName) {
    packageInput.placeholder = "لم يتم اختيار باقة - اختر من المتجر أولاً";
    submitBtn.disabled = true;
    submitBtn.title = "الرجاء اختيار باقة من المتجر أولاً";
    return;
  }

  packageInput.value = packageName;
  submitBtn.disabled = false;

  document.getElementById("submitPackage").addEventListener("click", async () => {
    // التحقق مرة أخرى من اختيار الباقة
    if (!packageId || !packageName) {
      Swal.fire("تنبيه", "الرجاء اختيار باقة من المتجر أولاً", "warning");
      return;
    }

    const payload = {
      parentName: document.getElementById("userName").value.trim(),
      childName: document.getElementById("childName").value.trim(),
      phoneNumber: document.getElementById("userPhone").value.trim(),
      email: document.getElementById("userEmail").value.trim(),
      packageId: Number(packageId)
    };

    if (!payload.parentName || !payload.childName || !payload.phoneNumber || !payload.email) {
      Swal.fire("تنبيه", "من فضلك أكمل جميع البيانات", "warning");
      return;
    }

    Swal.fire({
      title: "جارٍ إرسال الطلب...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(API_CONFIG.PACKAGE_PLACE_ORDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok || result.isSuccess === false) {
        Swal.fire("خطأ", result.errorMessage || "فشل إرسال الطلب", "error");
        return;
      }

      Swal.fire("تم الإرسال 🎉", "تم إرسال طلبك بنجاح", "success");
      localStorage.removeItem("selectedPackageId");
      localStorage.removeItem("selectedPackageName");
      document.getElementById("packageForm").reset();
    } catch (err) {
      console.error(err);
      Swal.fire("خطأ", "مشكلة في الاتصال بالسيرفر", "error");
    }
  });
});
