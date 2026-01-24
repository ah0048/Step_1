const API_BASE_URL = 'https://step-1-academy.runasp.net/api';
document.addEventListener("DOMContentLoaded", () => {
  // API Configuration
  const API_CONFIG = {
    TRAINER_ALL: `${API_BASE_URL}/Trainer/all`,
    TRAINER_RATE: `${API_BASE_URL}/Trainer/rate`
  };

  const grid = document.querySelector(".counselors-grid");
  let trainers = [];

  // =============================
  // Fetch Trainers
  // =============================
  async function fetchTrainers() {
    try {
      const res = await fetch(API_CONFIG.TRAINER_ALL);
      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      trainers = data.data ?? data;

      renderTrainers();
    } catch (err) {
      console.error(err);
    }
  }

  // =============================
  // Render Trainers (Same Structure)
  // =============================
  function renderTrainers() {
    grid.innerHTML = "";

    trainers.forEach(trainer => {
      const card = document.createElement("div");
      card.className = "counselor-card";
      card.dataset.id = trainer.id;

      // Display average rating with stars
      const avgRating = trainer.averageRating ?? 0;
      const stars = "★".repeat(Math.round(avgRating)) + "☆".repeat(5 - Math.round(avgRating));
      const ratingDisplay = avgRating > 0 ? `
        <div class="counselor-rating">
          <span style="font-size: 1.1rem; margin-right: 5px;">⭐</span>
          <span>${avgRating.toFixed(1)}</span>
        </div>
      ` : '';

      card.innerHTML = `
        ${ratingDisplay}
        <img src="${trainer.pictureUrl || './Images/default.jpg'}"
             alt="${trainer.arabicName}"
             class="counselor-img">

        <h3 class="counselor-name ar-name">${trainer.arabicName}</h3>
        <h3 class="counselor-name en-name">${trainer.englishName}</h3>

        <p class="counselor-specialty">${trainer.major}</p>
        <p class="counselor-specialty">${trainer.specilization}</p>

        <div style="text-align: center; margin: 12px 0;">
          <div style="font-size: 1.2rem; color: #ffc107; letter-spacing: 2px; margin-bottom: 6px;">
            ${stars}
          </div>
          <div style="font-size: 1rem; font-weight: 600; color: #ffc107;">
            ${avgRating > 0 ? `${avgRating.toFixed(1)} / 5.0` : 'بدون تقييمات'}
          </div>
        </div>

        <div class="number-rating" data-id="${trainer.id}">
          <div class="num" data-rate="1">1</div>
          <div class="num" data-rate="2">2</div>
          <div class="num" data-rate="3">3</div>
          <div class="num" data-rate="4">4</div>
          <div class="num" data-rate="5">5</div>
        </div>

       <button class="trainer-book-btn" 
      data-id="${trainer.id}" 
      data-name="${trainer.arabicName}">
      <i class="bi bi-calendar-check"></i> احجز معي
    </button>
      `;

      grid.appendChild(card);
    });
  }

document.addEventListener("click", (e) => {
  if (e.target.closest(".trainer-book-btn")) {
    const btn = e.target.closest(".trainer-book-btn");
    const trainerId = btn.dataset.id;
    const trainerName = btn.dataset.name;
    console.log('ass',e.target.dataset.id, e.target.dataset.name);
    console.log("TrainerId:", trainerId, "TrainerName:", trainerName); // ✅ debug

    localStorage.setItem("selectedTrainerId", trainerId);
    localStorage.setItem("selectedTrainerName", trainerName);

    window.location.href = "form.html";
  }
});


  // =============================
  // Rating Click (Color + API)
  // =============================
 document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("num")) return;

  const rate = Number(e.target.dataset.rate);
  const ratingBox = e.target.closest(".number-rating");
  const trainerId = Number(ratingBox.dataset.id);

  if (!trainerId) {
    console.error("TrainerId is undefined");
    return;
  }

  ratingBox.querySelectorAll(".num")
    .forEach(n => n.classList.remove("active"));

  e.target.classList.add("active");

  try {
    const res = await fetch(API_CONFIG.TRAINER_RATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trainerId,
        rating: rate
      })
    });

    if (!res.ok) throw new Error("Rate failed");
    
    // Refresh trainers data after successful rating
    setTimeout(() => {
      fetchTrainers();
    }, 500);

  } catch (err) {
    console.error("Rating failed", err);
  }
});

  // =============================
  // Auto-refresh trainers every 10 seconds for live rating updates
  // =============================
  setInterval(() => {
    fetchTrainers();
  }, 10000);

  fetchTrainers();
});

window.makeAppiontment = function() {
  window.location.href = "form.html?trainer=specialist";
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("package-btn")) {
    const packageId = e.target.dataset.id;
    const packageName = e.target.dataset.name;

    if (!packageId || !packageName) {
      Swal.fire("خطأ", "لم يتم اختيار الباقة بشكل صحيح", "error");
      return;
    }

    // حفظ البيانات مؤقتًا
    localStorage.setItem("selectedPackageId", packageId);
    localStorage.setItem("selectedPackageName", packageName);

    // الانتقال لصفحة contact
    window.location.href = "contact.html";
  }
});
