document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // TOKEN
  // ==========================
  function getToken() {
    return localStorage.getItem("token");
  }

  // ==========================
  // ==========================
  // LOGIN MODAL / ADD ADMIN
  // ==========================
  const loginBtn = document.getElementById("loginBtn");
  const loginForm = document.getElementById("loginForm");
  const loginModalEl = document.getElementById("loginModal");
  const loginModal = new bootstrap.Modal(loginModalEl);

  loginBtn.addEventListener("click", () => {
    loginForm.reset();
    loginModal.show();
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      Swal.fire("خطأ", "You must be logged in as Admin", "error");
      return;
    }

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      Swal.fire("خطأ", "Username and password are required", "error");
      return;
    }

    Swal.fire({
      title: "جار الإضافة...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch("http://localhost:5184/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || data.isSuccess === false) {
        Swal.fire("خطأ", data.errorMessage || "Failed to add admin", "error");
        return;
      }

      Swal.fire("تم بنجاح ✅", "تم إضافة Admin بنجاح!", "success");
      loginModal.hide();
    } catch (err) {
      console.error(err);
      Swal.fire("خطأ", "Server error", "error");
    }
  });

  // ==========================
  // TRAINERS
  // ==========================
  let trainers = [];
  let editTrainerId = null;

  const trainerTable = document.getElementById("trainersTable");
  const trainersCount = document.getElementById("trainersCount");
  const trainerForm = document.getElementById("trainerForm");
  const trainerModal = new bootstrap.Modal(
    document.getElementById("trainerModal")
  );

  const arabicNameInput = document.getElementById("arabicName");
  const englishNameInput = document.getElementById("englishName");
  const majorInput = document.getElementById("major");
  const specilizationInput = document.getElementById("specilization");
  const trainerImageInput = document.getElementById("image");

  document.getElementById("addTrainerBtn").addEventListener("click", () => {
    editTrainerId = null;
    trainerForm.reset();
    trainerModal.show();
  });

  async function fetchTrainers() {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5184/api/Trainer/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const data = await res.json();
      trainers = data.data ?? data;
      renderTrainerTable();
    } catch (err) {
      console.error(err);
      Swal.fire("خطأ", "Failed to load trainers", "error");
    }
  }

  function renderTrainerTable() {
    trainerTable.innerHTML = "";
    trainers.forEach((t) => {
      const rating = t.averageRating ?? 0;
      const stars = "★".repeat(Math.round(rating));

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${t.arabicName}</td>
        <td>${t.englishName}</td>
        <td>${t.major}</td>
        <td><span style="margin-right:5px;">${rating}</span>
        <span class="stars" style="color: gold;">${stars}</span></td>
        <td>
          <button class="btn btn-sm btn-warning edit-btn">✏️</button>
          <button class="btn btn-sm btn-danger delete-btn">🗑️</button>
        </td>
      `;
      row.querySelector(".edit-btn").onclick = () => editTrainer(t.id);
      row.querySelector(".delete-btn").onclick = () => deleteTrainer(t.id);

      trainerTable.appendChild(row);
    });

    trainersCount.innerText = trainers.length;
  }

  trainerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) return Swal.fire("خطأ", "الرجاء تسجيل الدخول أولاً", "error");

    if (!editTrainerId && trainerImageInput.files.length === 0) {
      return Swal.fire("خطأ", "الرجاء اختيار صورة", "error");
    }

    const formData = new FormData();
    if (editTrainerId) formData.append("TrainerId", editTrainerId);

    formData.append("ArabicName", arabicNameInput.value.trim());
    formData.append("EnglishName", englishNameInput.value.trim());
    formData.append("Major", majorInput.value.trim());
    formData.append("Specilization", specilizationInput.value.trim());
    if (trainerImageInput.files.length > 0)
      formData.append("Picture", trainerImageInput.files[0]);

    const url = editTrainerId
      ? "http://localhost:5184/api/Trainer/edit"
      : "http://localhost:5184/api/Trainer/add";
    const method = editTrainerId ? "PUT" : "POST";

    Swal.fire({
      title: editTrainerId ? "جار تعديل المدرب..." : "جار إضافة المدرب...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || result.isSuccess === false) {
        Swal.fire("خطأ", result.errorMessage || "حدث خطأ", "error");
        return;
      }

      Swal.fire(
        "تم بنجاح ✅",
        editTrainerId ? "تم تعديل المدرب بنجاح!" : "تم إضافة المدرب بنجاح!",
        "success"
      );

      trainerModal.hide();
      trainerForm.reset();
      fetchTrainers();
    } catch (err) {
      console.error(err);
      Swal.fire("خطأ", "حدث خطأ في الاتصال بالخادم", "error");
    }
  });

  function editTrainer(id) {
    editTrainerId = id;
    const t = trainers.find((tr) => tr.id === id);
    if (!t) return Swal.fire("خطأ", "Trainer not found", "error");

    arabicNameInput.value = t.arabicName ?? "";
    englishNameInput.value = t.englishName ?? "";
    majorInput.value = t.major ?? "";
    specilizationInput.value = t.specilization ?? "";
    trainerImageInput.value = "";

    trainerModal._element.querySelector(".modal-title").innerText =
      "تعديل مدرب";
    trainerModal.show();
  }

  async function deleteTrainer(id) {
    if (!confirm("هل تريد حذف هذا المدرب؟")) return;

    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5184/api/Trainer/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(await res.text());
      fetchTrainers();
    } catch (err) {
      console.error(err);
      Swal.fire("خطأ", "حدث خطأ أثناء الحذف", "error");
    }
  }

  fetchTrainers();

  // ==========================
  // PACKAGES
  // ==========================
  let packages = [];
  let editPackageId = null;

  const packageTable = document.getElementById("PackageTable");
  const packageForm = document.getElementById("PackageForm");
  const addPackageBtn = document.getElementById("addPackageBtn");
  const packageModal = new bootstrap.Modal(document.getElementById("PackageModal"));

  const packageIdInput = document.getElementById("PackageId");
  const packageNameInput = document.getElementById("Packagename");
  const descriptionInput = document.getElementById("Description");
  const priceInput = document.getElementById("Price");
  const packageImageInput = document.getElementById("Picture");

  addPackageBtn.addEventListener("click", () => {
    editPackageId = null;
    packageForm.reset();
    packageModal.show();
  });

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
      renderPackageTable();
    } catch (err) {
      console.error(err);
      Swal.fire("خطأ", "فشل تحميل الحقائب", "error");
    }
  }

  function renderPackageTable() {
    packageTable.innerHTML = "";

    packages.forEach((pkg) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pkg.title}</td>
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

  packageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) return Swal.fire("خطأ", "الرجاء تسجيل الدخول أولاً", "error");

    if (!editPackageId && packageImageInput.files.length === 0) {
      return Swal.fire("خطأ", "الرجاء اختيار صورة", "error");
    }

    const formData = new FormData();
    if (editPackageId) formData.append("packageId", editPackageId);

    formData.append("title", packageNameInput.value.trim());
    formData.append("description", descriptionInput.value.trim());
    formData.append("price", priceInput.value.trim());

    if (packageImageInput.files.length > 0) formData.append("picture", packageImageInput.files[0]);

    const url = editPackageId
      ? `http://localhost:5184/api/Package/edit`
      : `http://localhost:5184/api/Package/add`;
    const method = editPackageId ? "PUT" : "POST";

    Swal.fire({
      title: editPackageId ? "جار تعديل الحقيبة..." : "جار إضافة الحقيبة...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || result.isSuccess === false) {
        Swal.fire("خطأ", result.errorMessage || "حدث خطأ", "error");
        return;
      }

      Swal.fire(
        "تم بنجاح ✅",
        editPackageId ? "تم تعديل الحقيبة بنجاح!" : "تم إضافة الحقيبة بنجاح!",
        "success"
      );

      packageModal.hide();
      packageForm.reset();
      fetchPackages();
    } catch (err) {
      console.error(err);
      Swal.fire("خطأ", "حدث خطأ في الاتصال بالخادم", "error");
    }
  });

  function editPackage(id) {
    editPackageId = id;
    const pkg = packages.find((p) => p.id == id);
    if (!pkg) return Swal.fire("خطأ", "Package not found", "error");

    packageIdInput.value = pkg.id;
    packageNameInput.value = pkg.title;
    descriptionInput.value = pkg.description;
    priceInput.value = pkg.price;
    packageImageInput.value = "";

    packageModal.show();
  }

  async function deletePackage(id) {
  const result = await Swal.fire({
  title: "تأكيد الحذف",
  text: "هل أنت متأكد؟ لا يمكن التراجع!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "نعم، احذف",
  cancelButtonText: "إلغاء",
});

if (!result.isConfirmed) return;


    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5184/api/Package/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());

      fetchPackages();
    } catch (err) {
      console.error(err);
      Swal.fire("خطأ", "حدث خطأ أثناء الحذف", "error");
    }
  }

  fetchPackages();
});

