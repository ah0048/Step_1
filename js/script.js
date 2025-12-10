 const nums = document.querySelectorAll(".number-rating .num");

  nums.forEach(num => {
    num.addEventListener("click", () => {

      // لو هو الرقم اللي مضغوط قبل كدا → يشيله
      if (num.classList.contains("active")) {
        num.classList.remove("active");
        return;
      }

      // إزالة التحديد من كل الأرقام
      nums.forEach(n => n.classList.remove("active"));

      // تحديد الرقم الجديد
      num.classList.add("active");
    });
  });

