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





// ==========================
// LOGIN FUNCTIONALITY
// ==========================
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");

loginBtn.onclick = () => {
  new bootstrap.Modal(document.getElementById("loginModal")).show();
};

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5184/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok || !data.isSuccess) {
      alert(data.errorMessage || "Login failed");
      return;
    }

    // Save token for future requests
    localStorage.setItem("token", data.data.token);

    alert("Login successful!");
    bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();

  } catch (err) {
    console.error(err);
    alert("Network error during login");
  }
});

// ==========================
// HELPER TO GET TOKEN
// ==========================
function getToken() {
  return localStorage.getItem("token");
}

// ==========================
// DELETE TRAINER
// ==========================
async function deleteTrainer(id) {
  if (!confirm("Are you sure you want to delete this trainer?")) return;

  const token = getToken();
  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5184/api/trainers/all/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Delete failed");

    document.querySelector(`[data-id='${id}']`).remove();
    alert("Trainer deleted successfully!");

  } catch (err) {
    console.error(err);
    alert("Error deleting trainer");
  }
}

// ==========================
// EDIT TRAINER
// ==========================
async function editTrainer(id) {
  const token = getToken();
  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5184/api/trainers/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch trainer data");

    const trainer = await res.json();

    const newArabicName = prompt("Enter Arabic Name:", trainer.arabicName);
    if (newArabicName === null) return;
    const newEnglishName = prompt("Enter English Name:", trainer.englishName);
    if (newEnglishName === null) return;
    const newSpecialties = prompt(
      "Enter specialties (comma separated):",
      trainer.specialties.join(", ")
    );
    if (newSpecialties === null) return;

    const updateRes = await fetch(`http://localhost:5184/api/trainers/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        arabicName: newArabicName,
        englishName: newEnglishName,
        specialties: newSpecialties.split(",").map(s => s.trim())
      })
    });

    const result = await updateRes.json();

    if (!updateRes.ok || result.isSuccess === false) {
      console.error(result);
      alert(result.errorMessage || "Update failed");
      return;
    }

    const card = document.querySelector(`[data-id='${id}']`);
    card.querySelector(".ar-name").textContent = newArabicName;
    card.querySelector(".en-name").textContent = newEnglishName;
    card.querySelector(".counselor-specialty").textContent = newSpecialties;

    alert("Trainer updated successfully!");

  } catch (err) {
    console.error(err);
    alert("Error updating trainer");
  }
}

// ==========================
// ADD TRAINER
// ==========================
const form = document.getElementById("addTrainerForm");
const container = document.getElementById("counselors-container");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = getToken();
  if (!token) {
    alert("Please login first");
    return;
  }

  const formData = new FormData(form);

  // Debug: check FormData
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    const res = await fetch("http://localhost:5184/api/trainer/add", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });

    const result = await res.json();

    if (!res.ok || result.isSuccess === false) {
      console.error(result);
      alert(result.errorMessage || "Failed to add trainer");
      return;
    }

    const savedTrainer = result.data;

    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-3");
    card.dataset.id = savedTrainer.id;

    card.innerHTML = `
      <div class="card">
        <img src="${savedTrainer.imageUrl}" alt="${savedTrainer.arabicName}" class="card-img-top" style="height:200px; object-fit:cover;">
        <div class="card-body">
          <h5 class="ar-name">${savedTrainer.arabicName}</h5>
          <h6 class="en-name text-muted">${savedTrainer.englishName}</h6>
          <p>Major: ${savedTrainer.major}</p>
          <p>Specialization: ${savedTrainer.specialization}</p>
          <button class="btn btn-warning btn-sm" onclick="editTrainer(${savedTrainer.id})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTrainer(${savedTrainer.id})">Delete</button>
        </div>
      </div>
    `;

    container.appendChild(card);

    bootstrap.Modal.getInstance(document.getElementById('addTrainerModal')).hide();
    form.reset();

    alert("Trainer added successfully!");

  } catch (err) {
    console.error(err);
    alert("Network error while adding trainer");
  }
});


//-------------------------
