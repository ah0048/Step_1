document.addEventListener("DOMContentLoaded", () => {
  // API Configuration
  const API_CONFIG = {
    TRAINER_ALL: 'http://localhost:5184/api/Trainer/all',
    TRAINER_RATE: 'http://localhost:5184/api/Trainer/rate'
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

        <div style="text-align: center; margin: 12px 0; font-size: 1.2rem; color: #ffc107; letter-spacing: 2px;">
          ${stars}
        </div>

        <div class="number-rating" data-id="${trainer.id}">
          <div class="num" data-rate="1">1</div>
          <div class="num" data-rate="2">2</div>
          <div class="num" data-rate="3">3</div>
          <div class="num" data-rate="4">4</div>
          <div class="num" data-rate="5">5</div>
        </div>

       <button class="btn btn-sm btn-primary book-btn" 
      data-id="${trainer.id}" 
      data-name="${trainer.arabicName}">
      احجز
    </button>
      `;

      grid.appendChild(card);
    });
  }

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("book-btn")) {
    const trainerId = e.target.dataset.id;
    const trainerName = e.target.dataset.name;
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

  } catch (err) {
    console.error("Rating failed", err);
  }
});

  fetchTrainers();
});


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
