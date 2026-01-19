document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginForm = document.getElementById("loginForm");

  const modalEl = document.getElementById("loginModal");
  const modal = new bootstrap.Modal(modalEl);

  // فتح المودال
  loginBtn.addEventListener("click", () => {
    loginForm.reset();
    modal.show();
  });

  // إضافة Admin
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as Admin");
      return;
    }

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5184/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      console.log("Add admin response:", data);

      if (!res.ok || data.isSuccess === false) {
        alert(data.errorMessage || "Failed to add admin");
        return;
      }

      alert("Admin added successfully ✅");
      modal.hide();
    } catch (err) {
      console.error("Network error:", err);
      alert("Server error");
    }
  });
});

// ==========================
// TOKEN
// ==========================
function getToken() {
  return localStorage.getItem("token");
}

// ==========================
// TRAINERS
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  let trainers = [];
  let editId = null;

  const table = document.getElementById("trainersTable");
  const trainersCount = document.getElementById("trainersCount");
  const trainerForm = document.getElementById("trainerForm");
  const trainerModal = new bootstrap.Modal(
    document.getElementById("trainerModal")
  );

  const arabicNameInput = document.getElementById("arabicName");
  const englishNameInput = document.getElementById("englishName");
  const majorInput = document.getElementById("major");
  const specilizationInput = document.getElementById("specilization");
  const imageInput = document.getElementById("image");

  // ==========================
  // ADD MODAL
  // ==========================
  document.getElementById("addTrainerBtn").addEventListener("click", () => {
    editId = null;
    trainerForm.reset();
    trainerModal.show();
  });

  // ==========================
  // FETCH TRAINERS
  // ==========================
  async function fetchTrainers() {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5184/api/Trainer/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();

      console.log("API response:", data);

      // لو الـ API بيرجع isSuccess
      trainers = data.data ?? data;

      renderTable();
    } catch (err) {
      console.error("Fetch trainers error:", err);
      alert("Failed to load trainers");
    }
  }

  // ==========================
  // RENDER TABLE
  // ==========================
  function renderTable() {
    table.innerHTML = "";

    trainers.forEach((trainer) => {
      const rating = trainer.averageRating ?? 0;
      const stars = "★".repeat(Math.round(rating));

      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${trainer.arabicName}</td>
      <td>${trainer.englishName}</td>
      <td>${trainer.major}</td>
      <td>
        <span style="margin-right:5px;">${rating}</span>
        <span class="stars" style="color: gold;">${stars}</span>
      </td>
      <td>
        <button class="btn btn-sm btn-warning edit-btn">✏️</button>
        <button class="btn btn-sm btn-danger delete-btn">🗑️</button>
      </td>
    `;

      row.querySelector(".edit-btn").onclick = () => editTrainer(trainer.id);
      row.querySelector(".delete-btn").onclick = () =>
        deleteTrainer(trainer.id);

      table.appendChild(row);
    });

    trainersCount.innerText = trainers.length;
  }

  window.addEventListener("storage", (e) => {
    if (e.key === "refreshTrainers") {
      fetchTrainers(); // يعيد تحميل الجدول
    }
  });
  // ==========================
  // ADD / UPDATE TRAINER
  // ==========================
  trainerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      alert("Please login first");
      return;
    }

    if (!editId && imageInput.files.length === 0) {
      alert("Please select a picture");
      return;
    }

    const formData = new FormData();

    if (editId) formData.append("TrainerId", editId);
    console.log("Submitting trainer data:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    formData.append("ArabicName", arabicNameInput.value.trim());
    formData.append("EnglishName", englishNameInput.value.trim());
    formData.append("Major", majorInput.value.trim());
    formData.append("Specilization", specilizationInput.value.trim());

    if (imageInput.files.length > 0) {
      formData.append("Picture", imageInput.files[0]);
    }

    const url = editId
      ? "http://localhost:5184/api/Trainer/edit" // ← endpoint الجديد
      : "http://localhost:5184/api/Trainer/add";

    const method = editId ? "PUT" : "POST";

    try {
      console.log("Submitting trainer data:", [...formData]);

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      let resultText = await res.text();
      console.log("Raw response text:", resultText);

      let result;
      try {
        result = JSON.parse(resultText);
      } catch {
        result = resultText;
      }

      if (!res.ok) {
        console.error("Save trainer error:", result);
        alert(
          "Error saving trainer:\n" +
            (result.errorMessage || JSON.stringify(result))
        );
        return;
      }

      alert("Trainer saved successfully!");
      trainerModal.hide();
      fetchTrainers();
    } catch (err) {
      console.error("Network error while saving trainer:", err);
      alert("Network error while saving trainer");
    }
  });

  // ==========================
  // EDIT
  // ==========================
  // عند تعديل مدرب
  function editTrainer(id) {
    editId = id;
    console.log("Edit ID set to:", editId);
    const t = trainers.find((tr) => tr.id === id);
    if (!t) {
      alert("Trainer not found!");
      return;
    }

    arabicNameInput.value = t.arabicName ?? "";
    englishNameInput.value = t.englishName ?? "";
    majorInput.value = t.major ?? "";
    specilizationInput.value = t.specilization ?? "";

    // الصورة مش إجبارية في التعديل
    imageInput.value = "";

    trainerModal._element.querySelector(".modal-title").innerText =
      "تعديل مدرب";
    trainerModal.show();

    console.log("Editing trainer:", t);
  }

  // ==========================
  // DELETE
  // ==========================
  async function deleteTrainer(id) {
    if (!confirm("Delete trainer?")) return;

    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:5184/api/Trainer/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Delete error:", text);
        alert(text);
        return;
      }

      fetchTrainers();
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error while deleting");
    }
  }

  fetchTrainers();
});


document.addEventListener("DOMContentLoaded", () => {
  // العناصر
  const packageTable = document.getElementById("PackageTable");
  const packageForm = document.getElementById("PackageForm");
  const addPackageBtn = document.getElementById("addPackageBtn");
  const packageModalEl = document.getElementById("PackageModal");
  const packageModal = new bootstrap.Modal(packageModalEl);

  const packageIdInput = document.getElementById("PackageId");
  const packageNameInput = document.getElementById("Packagename");
  const descriptionInput = document.getElementById("Description");
  const priceInput = document.getElementById("Price");
  const imageInput = document.getElementById("Picture");

  let packages = [];
  let editId = null;

  // ==========================
  // TOKEN
  // ==========================
  function getToken() {
    return localStorage.getItem("token");
  }

  // ==========================
  // فتح الفورم للإضافة
  // ==========================
  addPackageBtn.addEventListener("click", () => {
    editId = null;
    packageForm.reset();
    packageModal.show();
  });

  // ==========================
  // جلب الحقائب من API
  // ==========================
  async function fetchPackages() {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5184/api/Package/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch packages");

      const data = await res.json();
      packages = data.data ?? data;

      renderPackages();
    } catch (err) {
      console.error(err);
      alert("Error fetching packages");
    }
  }

  // ==========================
  // عرض الحقائب في الجدول
  // ==========================
  function renderPackages() {
    packageTable.innerHTML = "";

    packages.forEach((pkg) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pkg.packageName}</td>
        <td>${pkg.description}</td>
        <td>${pkg.price}</td>
        <td>
          <button class="btn btn-sm btn-warning edit-btn">✏️</button>
          <button class="btn btn-sm btn-danger delete-btn">🗑️</button>
        </td>
      `;

      row.querySelector(".edit-btn").onclick = () => editPackage(pkg.id);
      row.querySelector(".delete-btn").onclick = () => deletePackage(pkg.id);

      packageTable.appendChild(row);
    });
  }

  // ==========================
  // إضافة / تعديل حقيبة
  // ==========================
  packageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      alert("Please login first");
      return;
    }

    const formData = new FormData();
    if (editId) formData.append("packageId", editId);

    formData.append("packageName", packageNameInput.value.trim());
    formData.append("description", descriptionInput.value.trim());
    formData.append("price", priceInput.value.trim());

    // الصورة إلزامية عند الإضافة
    if (!editId && imageInput.files.length === 0) {
      alert("Please select an image");
      return;
    }

    if (imageInput.files.length > 0) {
      formData.append("picture", imageInput.files[0]);
    }

    const url = editId
      ? "http://localhost:5184/api/Package/edit"
      : "http://localhost:5184/api/Package/add";
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      packageModal.hide();
      packageForm.reset();
      fetchPackages();
    } catch (err) {
      console.error(err);
      alert("Error saving package");
    }
  });

  // ==========================
  // تعديل الحقيبة
  // ==========================
  function editPackage(id) {
    editId = id;
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;

    packageIdInput.value = pkg.id;
    packageNameInput.value = pkg.packageName;
    descriptionInput.value = pkg.description;
    priceInput.value = pkg.price;

    imageInput.value = ""; // الصورة اختيارية عند التعديل
    packageModal.show();
  }

  // ==========================
  // حذف الحقيبة
  // ==========================
  async function deletePackage(id) {
    if (!confirm("Are you sure you want to delete this package?")) return;

    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5184/api/Package/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      fetchPackages();
    } catch (err) {
      console.error(err);
      alert("Error deleting package");
    }
  }

  fetchPackages();
});


