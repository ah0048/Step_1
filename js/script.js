document.addEventListener("DOMContentLoaded", () => {

  const grid = document.querySelector(".counselors-grid");
  let trainers = [];

  // =============================
  // Fetch Trainers
  // =============================
  async function fetchTrainers() {
    try {
      const res = await fetch("http://localhost:5184/api/Trainer/all");
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

      card.innerHTML = `
        <img src="${trainer.pictureUrl || './Images/default.jpg'}"
             alt="${trainer.arabicName}"
             class="counselor-img">

        <h3 class="counselor-name ar-name">${trainer.arabicName}</h3>
        <h3 class="counselor-name en-name">${trainer.englishName}</h3>

        <p class="counselor-specialty">${trainer.major}</p>
        <p class="counselor-specialty">${trainer.specilization}</p>

        <div class="number-rating" data-id="${trainer.id}">
          <div class="num" data-rate="1">1</div>
          <div class="num" data-rate="2">2</div>
          <div class="num" data-rate="3">3</div>
          <div class="num" data-rate="4">4</div>
          <div class="num" data-rate="5">5</div>
        </div>

        <button class="btn btn-counselor btn-primary">احجز موعد</button>
      `;

      grid.appendChild(card);
    });
  }

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
    const res = await fetch("http://localhost:5184/api/Trainer/rate", {
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
