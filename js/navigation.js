(function () {
  const ids = ["beranda", "tugas", "matakuliah", "materi"];
  const desktopOn = ["text-primary", "font-bold", "border-primary"];
  const desktopOff = ["text-gray-600", "font-medium", "border-transparent"];
  const mobileOn = ["bg-pink-50", "text-primary", "font-bold", "border-primary"];
  const mobileOff = ["text-gray-600", "font-medium", "border-transparent"];

  window.showSection = function (id) {
    if (!ids.includes(id)) id = "beranda";
    document.querySelectorAll(".page-section").forEach((s) => {
      const on = s.id === id;
      s.classList.toggle("hidden", !on);
      if (on) { s.classList.remove("page-transition"); void s.offsetWidth; s.classList.add("page-transition"); }
    });
    document.querySelectorAll(".nav-link").forEach((a) => {
      const mobile = !!a.closest("#mobile-menu");
      const active = a.getAttribute("href") === "#" + id;
      const on = mobile ? mobileOn : desktopOn, off = mobile ? mobileOff : desktopOff;
      a.classList.remove(...on, ...off);
      a.classList.add(...(active ? on : off));
    });
    document.getElementById("mobile-menu").classList.add("hidden");
    window.scrollTo({ top: 0 });
  };

  window.addEventListener("hashchange", () => showSection(location.hash.slice(1)));
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mobile-menu-btn").addEventListener("click", () =>
      document.getElementById("mobile-menu").classList.toggle("hidden"));
    showSection(location.hash.slice(1));
  });
})();
