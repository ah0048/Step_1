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
      alert(data.errorMessage || "Login failed");
      return;
    }

    // حفظ التوكن
    localStorage.setItem("token", data.data);
    console.log("Token saved:", data.data);

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
// TRAINERS MANAGEMENT
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    let trainers = [];
    let editId = null;

    const table = document.getElementById('trainersTable');
    const trainersCount = document.getElementById('trainersCount');
    const trainerForm = document.getElementById('trainerForm');
    const trainerModalEl = document.getElementById('trainerModal');
    const trainerModal = new bootstrap.Modal(trainerModalEl);

    const trainerIdInput = document.getElementById('trainerId');
    const nameInput = document.getElementById('name');
    const specialtyInput = document.getElementById('specialty');
    const phoneInput = document.getElementById('phone');
    const ratingInput = document.getElementById('rating');

    // زر فتح إضافة مدرب
    document.getElementById('addTrainerBtn').addEventListener('click', function() {
        editId = null;
        trainerForm.reset();
        trainerIdInput.value = '';
        trainerModal.show();
    });

    // جلب المدربين من API
    function fetchTrainers() {
        const token = getToken();
        if (!token) return console.error("Token is missing! Login first.");

        fetch('http://localhost:5184/api/Trainer/all', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            trainers = data;
            renderTable();
        })
        .catch(err => console.error(err));
    }

    // رسم الجدول
    function renderTable() {
        table.innerHTML = '';
        trainers.forEach(trainer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${trainer.name}</td>
                <td>${trainer.specialty}</td>
                <td>${trainer.phone}</td>
                <td>${trainer.rating ?? '-'}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1 edit-btn">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-btn">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            table.appendChild(row);

            row.querySelector('.edit-btn').addEventListener('click', () => editTrainer(trainer.id));
            row.querySelector('.delete-btn').addEventListener('click', () => deleteTrainer(trainer.id));
        });

        trainersCount.innerText = trainers.length;
    }

    // إضافة / تعديل مدرب
    trainerForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // يمنع الفورم من عمل refresh

        const token = getToken();
        if (!token) return alert("Token missing! Login first.");

        const formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('specialty', specialtyInput.value);
        formData.append('phone', phoneInput.value);
        formData.append('rating', ratingInput.value || 0);

        // ➤ صورة افتراضية فارغة لتجنب 400 Bad Request
        const blob = new Blob(); // ملف فارغ
        formData.append('image', blob, "empty.jpg");

        const url = editId
            ? `http://localhost:5184/api/Trainer/update/${editId}`
            : 'http://localhost:5184/api/Trainer/add';
        const method = editId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}` // لا تضيف Content-Type، Browser يضيفها تلقائي للـ FormData
            },
            body: formData
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            console.log('Trainer saved:', data);
            fetchTrainers(); // إعادة تحميل الجدول فورًا
            trainerModal.hide();
        })
        .catch(err => console.error('Error:', err));
    });

    // تعديل مدرب
    function editTrainer(id) {
        editId = id;
        const trainer = trainers.find(t => t.id === id);
        trainerIdInput.value = trainer.id;
        nameInput.value = trainer.name;
        specialtyInput.value = trainer.specialty;
        phoneInput.value = trainer.phone;
        ratingInput.value = trainer.rating ?? '';
        trainerModal.show();
    }

    // حذف مدرب
    function deleteTrainer(id) {
        if (!confirm('هل تريد الحذف؟')) return;

        const token = getToken();
        if (!token) return alert("Token missing! Login first.");

        fetch(`http://localhost:5184/api/Trainer/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            fetchTrainers();
        })
        .catch(err => console.error('Error:', err));
    }

    // تحميل المدربين عند فتح الصفحة
    fetchTrainers();
});
