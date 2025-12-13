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


 
 
document.addEventListener("DOMContentLoaded", function() {
  // الحصول على اسم الصفحة الحالي
  let currentPage = window.location.pathname.split("/").pop().split("?")[0];
  
  // إذا كانت الصفحة فارغة (root) اعتبرها index.html
  if (currentPage === "" || currentPage === "/") currentPage = "index.html";

  // إضافة class active للرابط المطابق
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    let linkPage = link.getAttribute('href').split("/").pop().split("?")[0];
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

function sendWhatsApp() {
  // WhatsApp number in international format (no + or -)
  const phoneNumber = "201553212342";

  // Get form values
  const parentName = document.getElementById("parentName").value.trim();
  const childName = document.getElementById("childName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const childAge = document.getElementById("childAge").value.trim();
  const serviceType = document.getElementById("serviceType").value.trim();
  const trainer = document.getElementById("trainer").value.trim();

  // Create the WhatsApp message
  let message = `مرحبًا! أود التسجيل بالمعلومات التالية:\n`;
  message += `اسم ولي الأمر: ${parentName}\n`;
  message += `اسم الطفل: ${childName}\n`;
  message += `رقم الهاتف: ${phone}\n`;
  message += `البريد الإلكتروني: ${email}\n`;
  message += `عمر الطفل: ${childAge}\n`;
  message += `نوع الخدمة: ${serviceType}\n`;
  message += `المدرب: ${trainer}\n`;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);

  // Open WhatsApp
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(url, "_blank");
}





