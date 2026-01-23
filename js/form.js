



// API Configuration
const API_CONFIG = {
  RESERVATION_ADD: 'http://localhost:5184/api/Reservation/add'
};

document.addEventListener("DOMContentLoaded", () => {
  const trainerId = localStorage.getItem("selectedTrainerId");
  const trainerName = localStorage.getItem("selectedTrainerName");

  console.log("TrainerId:", trainerId);
  console.log("TrainerName:", trainerName);

  const trainerInput = document.getElementById("trainerId");
  const submitBtn = document.getElementById("submitReservation");

  if (!trainerInput || !submitBtn) return;

  if (!trainerId || !trainerName) {
    Swal.fire("خطأ", "لم يتم اختيار مدرب", "error");
    return;
  }

  // Set the trainer name in the form
  trainerInput.value = trainerName;

  submitBtn.addEventListener("click", async () => {
   const payload = {
  parentName: document.getElementById("parentName").value.trim(),
  childName: document.getElementById("childName").value.trim(),
  phoneNumber: document.getElementById("phone").value.trim(),
  email: document.getElementById("email").value.trim(),
  childAge: Number(document.getElementById("childAge").value),
  trainerId: Number(trainerId),
  subscriptionPlan: Number(document.getElementById("subscriptionPlan").value),
  subscriptionInterval: Number(document.getElementById("subscriptionInterval").value),
};
console.log({
  parentName: document.getElementById("parentName").value.trim(),
  childName: document.getElementById("childName").value.trim(),
  phoneNumber: document.getElementById("phone").value.trim(),
  email: document.getElementById("email").value.trim(),
  childAge: Number(document.getElementById("childAge").value),
  trainerId: Number(trainerId),
  subscriptionPlan: Number(document.getElementById("subscriptionPlan").value),
  subscriptionInterval: Number(document.getElementById("subscriptionInterval").value),
});



    if (!payload.parentName || !payload.phoneNumber) {
      Swal.fire("تنبيه", "من فضلك أكمل البيانات", "warning");
      return;
    }

    Swal.fire({
      title: "جارٍ إرسال الحجز...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(API_CONFIG.RESERVATION_ADD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || result.isSuccess === false) {
        Swal.fire("خطأ", result.errorMessage || "فشل الحجز", "error");
        return;
      }

      Swal.fire("تم الحجز 🎉", "تم إرسال طلبك بنجاح", "success");

      // Clear storage
      localStorage.removeItem("selectedTrainerId");
      localStorage.removeItem("selectedTrainerName");
    } catch (err) {
      console.error(err);
      Swal.fire("خطأ", "مشكلة في الاتصال بالسيرفر", "error");
    }
  });
});




