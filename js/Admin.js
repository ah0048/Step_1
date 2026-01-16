// ==========================
// LOGIN
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
            alert(data?.errorMessage || "Login failed");
            console.error("Login error:", data);
            return;
        }

        localStorage.setItem("token", data.data);
        alert("Login successful");
        bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();

    } catch (err) {
        console.error("Network error:", err);
        alert("Network error");
    }
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
    const trainerModal = new bootstrap.Modal(document.getElementById("trainerModal"));

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
                Authorization: `Bearer ${token}`
            }
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
        table.innerHTML = '';

        trainers.forEach(trainer => {
            const row = document.createElement('tr');
            row.innerHTML = `
      <td>${trainer.arabicName}</td>
      <td>${trainer.englishName}</td>
      <td>${trainer.major}</td>
      <td>${trainer.specilization}</td>
      <td>
        <button class="btn btn-sm btn-warning edit-btn">✏️</button>
        <button class="btn btn-sm btn-danger delete-btn">🗑️</button>
      </td>
    `;

            row.querySelector('.edit-btn').onclick = () => editTrainer(trainer.id);
            row.querySelector('.delete-btn').onclick = () => deleteTrainer(trainer.id);

            table.appendChild(row);
        });

        trainersCount.innerText = trainers.length;
    }

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

        if (!imageInput.files.length && !editId) {
            alert("Please select an image");
            return;
        }

        const formData = new FormData();

        formData.append("ArabicName", arabicNameInput.value);
        formData.append("EnglishName", englishNameInput.value);
        formData.append("Major", majorInput.value);
        formData.append("Specilization", specilizationInput.value);

        // الصورة (إجبارية)
        if (imageInput.files.length === 0) {
            alert("Please select a picture");
            return;
        }
        formData.append("Picture", imageInput.files[0]);

        const url = editId
            ? `http://localhost:5184/api/Trainer/update/${editId}`
            : "http://localhost:5184/api/Trainer/add";

        const method = editId ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            const text = await res.text();

            if (!res.ok) {
                console.error("Save trainer error:", text);
                alert("Error saving trainer:\n" + text);
                return;
            }

            trainerModal.hide();
            fetchTrainers();

        } catch (err) {
            console.error("Network error:", err);
            alert("Network error while saving trainer");
        }
    });

    // ==========================
    // EDIT
    // ==========================
    function editTrainer(id) {
        editId = id;
        const t = trainers.find(x => x.id === id);
        nameInput.value = t.name;
        specialtyInput.value = t.specialty;
        ratingInput.value = t.rating ?? "";
        imageInput.value = "";
        trainerModal.show();
    }

    // ==========================
    // DELETE
    // ==========================
    async function deleteTrainer(id) {
        if (!confirm("Delete trainer?")) return;

        const token = getToken();
        if (!token) return;

        try {
            const res = await fetch(`http://localhost:5184/api/Trainer/delete/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

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
