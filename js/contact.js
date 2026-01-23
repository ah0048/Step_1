document.addEventListener("DOMContentLoaded", () => {
  const packageId = localStorage.getItem("selectedPackageId");
  const packageName = localStorage.getItem("selectedPackageName");

  const packageInput = document.getElementById("packageName");
  if (!packageInput) return;

  if (!packageId || !packageName) {
    Swal.fire("خطأ", "لم يتم اختيار الباقة", "error");
    return;
  }

  packageInput.value = packageName;

  document.getElementById("submitPackage").addEventListener("click", async () => {
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
      const res = await fetch("http://localhost:5184/api/Package/place-order", {
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
