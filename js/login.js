import Swal from 'sweetalert2';
document.addEventListener("DOMContentLoaded", () => {
    // API Configuration
    const API_CONFIG = {
        AUTH_LOGIN: `${import.meta.env.VITE_API_BASE_URL}/Auth/login`
    };

    const form = document.getElementById("loginForm");
    const errorBox = document.getElementById("errorBox");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        errorBox.classList.add("d-none");

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const res = await fetch(API_CONFIG.AUTH_LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            console.log("Login response:", data);

            if (!res.ok || data.isSuccess === false) {
                Swal.fire("خطأ", data.errorMessage || "Invalid username or password", "error");
                return;
            }

            localStorage.setItem("token", data.data);
            Swal.fire("تم بنجاح ✅", "تم تسجيل الدخول بنجاح!", "success").then(() => {
                window.location.href = "Admin.html";
            });

        } catch (err) {
            console.error(err);
            Swal.fire("خطأ", "Server error", "error");
        }
    });

});
