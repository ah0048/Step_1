document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const errorBox = document.getElementById("errorBox");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        errorBox.classList.add("d-none");

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const res = await fetch("http://localhost:5184/api/Auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            console.log("Login response:", data);

            if (!res.ok || data.isSuccess === false) {
                errorBox.innerText = data.errorMessage || "Invalid username or password";
                errorBox.classList.remove("d-none");
                return;
            }

            localStorage.setItem("token", data.data);

            // التحويل
            window.location.href = "Admin.html";

        } catch (err) {
            console.error(err);
            errorBox.innerText = "Server error";
            errorBox.classList.remove("d-none");
        }
    });

});
