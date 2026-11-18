/* Portal Akademik - Navigation */
function navigateToSection(sectionHash) {
  const targetId = (sectionHash || "#beranda").replace("#", "");
  const sections = document.querySelectorAll(".page-section");
  const targetEl = document.getElementById(targetId);
  if (!targetEl) return;

  sections.forEach((sec) => {
    if (sec.id === targetId) {
      sec.classList.remove("hidden");
    } else {
      sec.classList.add("hidden");
    }
  });

  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) mobileMenu.classList.add("hidden");

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === "#" + targetId) {
      link.classList.add("text-primary", "font-bold");
      link.classList.remove("text-gray-600");
    } else {
      link.classList.remove("text-primary", "font-bold");
      link.classList.add("text-gray-600");
    }
  });

  if (window.location.hash !== "#" + targetId) {
    history.replaceState(null, "", "#" + targetId);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash || "#beranda";
  navigateToSection(hash);

  document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      const href = link.getAttribute("href");
      if (href && href.length > 1 && document.getElementById(href.replace("#", ""))) {
        e.preventDefault();
        navigateToSection(href);
      }
    }
  });
});
```[cite: 16, 17]

Klik **Commit changes**.

---

### 2. Pastikan Tombol "Lihat Tugas" di `index.html` Memanggil Fungsi dengan Benar
Buka file **`index.html`** utama $\rightarrow$ klik ikon pensil (Edit) $\rightarrow$ pastikan bagian tombol "Lihat Tugas" pada *Hero Section* menggunakan kode onclick langsung seperti ini:

```html
<button
  type="button"
  onclick="navigateToSection('#tugas')"
  id="btnHeroLihatTugas"
  class="bg-primary hover:bg-pink-600 active:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-pink-200 transition duration-200 flex items-center gap-2 cursor-pointer"
>
  Lihat Tugas <i class="fas fa-arrow-right pointer-events-none"></i>
</button>
