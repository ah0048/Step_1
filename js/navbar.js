// Navigation Active State Management
document.addEventListener("DOMContentLoaded", () => {
  // Get current page filename
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  
  // Get all navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  
  navLinks.forEach(link => {
    // Get href and extract filename
    const href = link.getAttribute("href");
    
    // Check if this link matches current page
    if (href && (href.includes(currentPage) || (currentPage === "" && href.includes("index.html")))) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
