/* Portal Akademik - Fatihatul Ikrimah
   Data tersimpan di localStorage browser. */
(function () {
  const K = {
    users: "portalAkademik.v3.users",
    session: "portalAkademik.session",
    data: "portalAkademik.v3.data",
  };
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const uid = () => Math.random().toString(36).slice(2, 9);
  const read = (k, d) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch (e) {
      return d;
    }
  };
  const write = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  };

  /* ---------- Data contoh ---------- */
  const dayOffset = (n) => {
    const d = new Date();
    d.setDate(d.getDate() + n);
    d.setHours(0, 0, 0, 0);
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  };

  function seed() {
    const courses = [
      {
        id: "imk",
        name: "Interaksi Manusia & Komputer",
        kelas: "TI25D",
        dosen: "Muhamad Imam",
        nidn: "0412068907",
        sks: 3,
        hari: "Senin",
        jam: "11:30 - 13:00",
        ruang: "D 403",
        peserta: 30,
      },
      {
        id: "adpl",
        name: "Analisis dan Design PL",
        kelas: "TI24D",
        dosen: "Dian Novianti",
        nidn: "0421117105",
        sks: 3,
        hari: "Senin",
        jam: "13:00 - 15:30",
        ruang: "D 406",
        peserta: 29,
      },
      {
        id: "pbp",
        name: "Pemrograman Berbasis Platform",
        kelas: "TI24D",
        dosen: "Sugiyanto",
        nidn: "0404067905",
        sks: 3,
        hari: "Senin",
        jam: "10:00 - 12:30",
        ruang: "D 406",
        peserta: 29,
      },
      {
        id: "tti",
        name: "Tata Tulis Ilmiah (Metodologi Penelitian)",
        kelas: "TI24D",
        dosen: "Harry Gunawan",
        nidn: "0408118304",
        sks: 2,
        hari: "Selasa",
        jam: "09:10 - 11:40",
        ruang: "D 406",
        peserta: 30,
      },
      {
        id: "mpti",
        name: "Manajemen Proyek Teknologi Informasi",
        kelas: "TI24D",
        dosen: "Gunadi Dwi Hantoro",
        nidn: "715775065113011",
        sks: 3,
        hari: "Senin",
        jam: "07:30 - 10:00",
        ruang: "D 406",
        peserta: 29,
      },
      {
        id: "aik4",
        name: "AIK 4 (Islam dan Ilmu Pengetahuan)",
        kelas: "TI24D",
        dosen: "Masdum Mustaqwa",
        nidn: "0242761662131163",
        sks: 2,
        hari: "Kamis",
        jam: "10:00 - 11:40",
        ruang: "D 405",
        peserta: 26,
      },
      {
        id: "aicp",
        name: "AI Computing Platform",
        kelas: "24K2B",
        dosen: "Freddy Wicaksono",
        nidn: "0402057307",
        sks: 3,
        hari: "Rabu",
        jam: "18:00 - 22:00",
        ruang: "C 303",
        peserta: 31,
      },
      {
        id: "arvr",
        name: "Teknologi AR/VR",
        kelas: "24K2B",
        dosen: "Muhamad Imam",
        nidn: "0412068907",
        sks: 3,
        hari: "Selasa",
        jam: "13:00 - 15:30",
        ruang: "D 406",
        peserta: 31,
      },
    ];
    const t = (courseId, title, desc, d, done) => ({
      id: uid(),
      courseId,
      title,
      desc,
      due: dayOffset(d),
      done: !!done,
    });
    const tasks = [
      t(
        "adpl",
        "Studi Kasus & Identifikasi Kebutuhan Sistem",
        "Pilih satu studi kasus (misalnya sistem perpustakaan) lalu identifikasi stakeholder, masalah, dan kebutuhan awal dalam 2 halaman.",
        -1,
        true,
      ),
      t(
        "adpl",
        "Diagram Use Case Sistem Perpustakaan",
        "Buat use case diagram lengkap dengan aktor, use case, dan relasi include/extend. Kumpulkan dalam format PDF.",
        2,
      ),
      t(
        "adpl",
        "Use Case Specification",
        "Tulis spesifikasi untuk minimal 5 use case: aktor, pra-kondisi, alur utama, alur alternatif, dan pasca-kondisi.",
        5,
      ),
      t(
        "adpl",
        "Activity Diagram Proses Peminjaman Buku",
        "Gambarkan alur peminjaman dan pengembalian buku memakai activity diagram dengan swimlane.",
        8,
      ),
      t(
        "adpl",
        "Class Diagram",
        "Rancang class diagram beserta atribut, method, dan relasi antarkelas berdasarkan hasil use case.",
        11,
      ),
      t(
        "adpl",
        "Sequence Diagram",
        "Buat sequence diagram untuk 3 skenario utama, misalnya login, peminjaman, dan pengembalian buku.",
        14,
      ),
      t(
        "adpl",
        "Perancangan Antarmuka & Basis Data (ERD)",
        "Rancang mockup minimal 5 layar dan ERD beserta kamus datanya.",
        18,
      ),
      t(
        "adpl",
        "Dokumen SRS Lengkap & Presentasi Akhir",
        "Gabungkan semua artefak menjadi dokumen SRS/SDD final dan siapkan presentasi 10 menit.",
        24,
      ),
      t(
        "imk",
        "Evaluasi Heuristik Aplikasi Mobile",
        "Evaluasi satu aplikasi mobile memakai 10 heuristik Nielsen. Sertakan tangkapan layar dan rekomendasi perbaikan.",
        5,
      ),
      t(
        "imk",
        "Prototype Low-Fidelity di Figma",
        "Rancang wireframe minimal 5 layar untuk aplikasi pilihan kelompok, lengkap dengan alur navigasi.",
        12,
      ),
      t(
        "pbp",
        "Aplikasi Web Todo dengan Framework",
        "Bangun aplikasi todo sederhana (tambah, ubah, hapus) memakai framework pilihan. Upload ke GitHub.",
        4,
      ),
      t(
        "pbp",
        "Integrasi API Eksternal",
        "Hubungkan aplikasi dengan satu API publik, tampilkan datanya, dan tangani error dengan baik.",
        11,
      ),
      t(
        "tti",
        "Latar Belakang & Rumusan Masalah Proposal",
        "Tulis latar belakang, rumusan masalah, dan tujuan penelitian maksimal 3 halaman.",
        2,
      ),
      t(
        "tti",
        "Resume 3 Jurnal Ilmiah",
        "Cari 3 jurnal terakreditasi Sinta yang relevan dengan topik, lalu ringkas metode dan hasilnya.",
        9,
      ),
      t(
        "mpti",
        "Project Charter & WBS",
        "Susun project charter dan Work Breakdown Structure untuk proyek sistem informasi kampus.",
        7,
      ),
      t(
        "mpti",
        "Jadwal Proyek (Gantt Chart)",
        "Buat Gantt chart lengkap dengan durasi, dependensi, dan milestone.",
        14,
      ),
      t(
        "aik4",
        "Resume Integrasi Islam dan Sains",
        "Buat resume 2 halaman tentang hubungan wahyu dan ilmu pengetahuan dari materi pertemuan 1-2.",
        5,
      ),
      t(
        "aik4",
        "Makalah Etika Teknologi dalam Islam",
        "Bahas etika penggunaan teknologi informasi menurut perspektif Islam, minimal 5 referensi.",
        13,
      ),
      t(
        "aicp",
        "Setup Lingkungan GPU & Jupyter",
        "Siapkan Python, Jupyter, dan library AI (PyTorch/TensorFlow). Kirim tangkapan layar hasil instalasi.",
        3,
        true,
      ),
      t(
        "aicp",
        "Training Model Klasifikasi Gambar",
        "Latih model klasifikasi gambar sederhana pada dataset publik dan laporkan akurasinya.",
        12,
      ),
      t(
        "arvr",
        "Aplikasi AR Sederhana dengan Unity",
        "Buat aplikasi AR yang menampilkan objek 3D di atas bidang datar memakai AR Foundation.",
        8,
      ),
      t(
        "arvr",
        "Laporan Perbandingan Perangkat VR",
        "Bandingkan minimal 3 headset VR dari sisi spesifikasi, harga, dan kasus penggunaan.",
        15,
      ),
    ];
    const m = (courseId, pertemuan, title, desc) => ({
      id: uid(),
      courseId,
      pertemuan,
      title,
      desc,
      link: "",
    });
    const materi = [
      m(
        "adpl",
        1,
        "Pengantar Analisis dan Desain Perangkat Lunak",
        "SDLC, peran analis sistem, dan perbedaan analisis dengan desain.",
      ),
      m(
        "adpl",
        2,
        "Pemodelan dengan UML",
        "Use case, activity, class, dan sequence diagram beserta notasinya.",
      ),
      m(
        "imk",
        1,
        "Prinsip Dasar Interaksi Manusia & Komputer",
        "Konsep usability, user experience, dan sejarah singkat IMK.",
      ),
      m(
        "imk",
        2,
        "10 Heuristik Nielsen",
        "Sepuluh prinsip evaluasi antarmuka beserta contoh pelanggarannya.",
      ),
      m(
        "pbp",
        1,
        "Konsep Platform & Framework",
        "Perbedaan platform web, mobile, dan desktop serta pemilihan framework.",
      ),
      m(
        "pbp",
        2,
        "Arsitektur MVC",
        "Pemisahan model, view, dan controller dalam aplikasi web.",
      ),
      m(
        "tti",
        1,
        "Dasar Penulisan Ilmiah",
        "Struktur karya tulis ilmiah, kaidah bahasa, dan etika kutipan.",
      ),
      m(
        "tti",
        2,
        "Metode Penelitian Kuantitatif & Kualitatif",
        "Perbedaan pendekatan, instrumen, dan teknik analisis data.",
      ),
      m(
        "mpti",
        1,
        "Siklus Hidup Proyek TI",
        "Fase inisiasi, perencanaan, eksekusi, pemantauan, dan penutupan proyek.",
      ),
      m(
        "mpti",
        2,
        "Manajemen Ruang Lingkup & Waktu",
        "Penyusunan WBS, estimasi durasi, dan penjadwalan proyek.",
      ),
      m(
        "aik4",
        1,
        "Islam dan Ilmu Pengetahuan",
        "Pandangan Islam tentang ilmu dan hubungan antara akal dan wahyu.",
      ),
      m(
        "aik4",
        2,
        "Etika dan Tanggung Jawab Ilmuwan",
        "Nilai amanah dan tanggung jawab dalam pengembangan teknologi.",
      ),
      m(
        "aicp",
        1,
        "Pengenalan Platform Komputasi AI",
        "Ekosistem GPU, cloud, dan framework untuk pengembangan AI.",
      ),
      m(
        "aicp",
        2,
        "Pipeline Machine Learning",
        "Dari pengumpulan data, pelatihan, evaluasi, hingga deployment model.",
      ),
      m(
        "arvr",
        1,
        "Dasar Teknologi AR dan VR",
        "Perbedaan AR, VR, dan MR serta komponen perangkat kerasnya.",
      ),
      m(
        "arvr",
        2,
        "Pengembangan AR dengan Unity",
        "Tracking, plane detection, dan penempatan objek 3D.",
      ),
    ];
    return { courses, tasks, materi };
  }

  let db = read(K.data, null);
  if (
    !db ||
    !Array.isArray(db.courses) ||
    !Array.isArray(db.tasks) ||
    !Array.isArray(db.materi) ||
    !db.courses.length
  ) {
    db = seed();
    save();
  }
  function save() {
    write(K.data, db);
  }
  const course = (id) => db.courses.find((c) => c.id === id);
  const courseName = (id) => (course(id) ? course(id).name : "-");

  /* ---------- Modal ---------- */
  function openOv(el) {
    el.classList.remove("hidden");
    el.classList.add("flex");
    requestAnimationFrame(() => {
      el.classList.remove("opacity-0");
      el.classList.add("opacity-100");
      const box = el.firstElementChild;
      if (box) {
        box.classList.remove("scale-95");
        box.classList.add("scale-100");
      }
    });
  }
  window.closeOv = function (el) {
    el.classList.remove("opacity-100");
    el.classList.add("opacity-0");
    const box = el.firstElementChild;
    if (box) {
      box.classList.remove("scale-100");
      box.classList.add("scale-95");
    }
    setTimeout(() => {
      el.classList.add("hidden");
      el.classList.remove("flex");
    }, 300);
  };
  function showModal(title, body) {
    $("modalTitle").textContent = title;
    $("modalBody").textContent = body;
    openOv($("customModal"));
  }
  window.closeModal = () => window.closeOv($("customModal"));
  function confirmDel(title, body, fn) {
    $("confirmTitle").textContent = title;
    $("confirmBody").textContent = body;
    $("confirmOk").onclick = () => {
      window.closeOv($("confirmModal"));
      fn();
    };
    openOv($("confirmModal"));
  }

  /* ---------- Form generik ---------- */
  function openForm(title, fields, onSubmit) {
    const html = fields
      .map((f) => {
        const v = f.value ?? "";
        let input;
        if (f.type === "textarea")
          input = `<textarea name="${f.name}" rows="3" class="field" ${f.required ? "required" : ""}>${esc(v)}</textarea>`;
        else if (f.type === "select")
          input = `<select name="${f.name}" class="field">${f.options.map((o) => `<option value="${esc(o.value)}" ${String(o.value) === String(v) ? "selected" : ""}>${esc(o.label)}</option>`).join("")}</select>`;
        else
          input = `<input name="${f.name}" type="${f.type || "text"}" value="${esc(v)}" class="field" ${f.required ? "required" : ""} ${f.min != null ? `min="${f.min}"` : ""}>`;
        return `<div><label class="label">${esc(f.label)}</label>${input}</div>`;
      })
      .join("");
    $("formBox").innerHTML =
      `<h3 class="text-xl font-bold text-gray-900 mb-4">${esc(title)}</h3>
      <form id="genForm" class="space-y-3" novalidate>${html}
      <p id="formErr" class="text-sm text-red-500 hidden"></p>
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" onclick="closeOv(formModal)" class="bg-white border border-gray-200 text-gray-700 font-medium py-2 px-5 rounded-lg hover:bg-gray-50 transition">Batal</button>
        <button type="submit" class="bg-primary hover:bg-pink-600 text-white font-medium py-2 px-5 rounded-lg transition shadow-md">Simpan</button>
      </div></form>`;
    $("genForm").onsubmit = (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      const missing = fields.find(
        (f) => f.required && !String(data[f.name] || "").trim(),
      );
      if (missing) {
        const er = $("formErr");
        er.textContent = `"${missing.label}" wajib diisi.`;
        er.classList.remove("hidden");
        return;
      }
      onSubmit(data);
      window.closeOv($("formModal"));
    };
    openOv($("formModal"));
  }
  const courseOptions = () =>
    db.courses.map((c) => ({ value: c.id, label: c.name + " " + c.kelas }));

  /* ---------- Tanggal ---------- */
  const today0 = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };
  const daysLeft = (iso) =>
    Math.round((new Date(iso + "T00:00:00") - today0()) / 86400000);
  const fmtDate = (iso) =>
    new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  function dueInfo(task) {
    if (task.done)
      return { text: "Selesai", cls: "bg-green-100 text-green-600" };
    const n = daysLeft(task.due);
    if (n < 0)
      return { text: `Terlambat ${-n} hari`, cls: "bg-red-100 text-red-600" };
    if (n === 0) return { text: "Hari ini!", cls: "bg-red-100 text-red-600" };
    if (n <= 3)
      return { text: `${n} hari lagi`, cls: "bg-amber-100 text-amber-600" };
    return { text: `${n} hari lagi`, cls: "bg-pink-100 text-primary" };
  }

  /* ---------- Tugas ---------- */
  function renderTasks() {
    const list = [...db.tasks].sort(
      (a, b) => a.done - b.done || a.due.localeCompare(b.due),
    );
    const done = db.tasks.filter((x) => x.done).length;
    $("taskSummary").textContent =
      `${db.tasks.length} tugas | ${done} selesai | ${db.tasks.length - done} belum selesai`;
    $("taskList").innerHTML = list.length
      ? list
          .map((x) => {
            const di = dueInfo(x);
            return `<div class="card p-5 flex flex-col ${x.done ? "opacity-70" : ""}">
        <div class="flex justify-between items-start gap-2 mb-2">
          <span class="badge bg-fuchsia-100 text-fuchsia-600">${esc(courseName(x.courseId))}</span>
          <span class="badge ${di.cls}">${di.text}</span></div>
        <h3 class="font-bold text-gray-900 mb-1 ${x.done ? "line-through" : ""}">${esc(x.title)}</h3>
        <p class="text-sm text-gray-600 flex-grow mb-3">${esc(x.desc)}</p>
        <p class="text-xs text-gray-500 mb-3"><i class="far fa-calendar-alt mr-1"></i>Tenggat: ${fmtDate(x.due)}</p>
        <div class="flex justify-between items-center">
          <button onclick="toggleTask('${x.id}')" class="text-sm font-semibold ${x.done ? "text-gray-500" : "text-primary"} hover:underline">
            <i class="fas ${x.done ? "fa-undo" : "fa-check-circle"} mr-1"></i>${x.done ? "Tandai belum" : "Tandai selesai"}</button>
          <div class="flex gap-2"><button class="icon-btn" title="Ubah" onclick="editTask('${x.id}')"><i class="fas fa-pen"></i></button>
          <button class="icon-btn danger" title="Hapus" onclick="delTask('${x.id}')"><i class="fas fa-trash"></i></button></div>
        </div></div>`;
          })
          .join("")
      : `<p class="col-span-full text-center text-gray-500">Belum ada tugas.</p>`;
    renderDue();
  }
  function renderDue() {
    const soon = db.tasks
      .filter((x) => !x.done && daysLeft(x.due) <= 3)
      .sort((a, b) => a.due.localeCompare(b.due));
    $("dueBanner").innerHTML = soon
      .map((x) => {
        const n = daysLeft(x.due),
          late = n < 0;
        return `<div class="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${late ? "bg-red-50 border-red-200 text-red-700" : "bg-amber-50 border-amber-200 text-amber-700"}">
        <i class="fas fa-bell"></i><span><strong>${esc(x.title)}</strong> (${esc(courseName(x.courseId))}) - ${late ? `terlambat ${-n} hari` : n === 0 ? "tenggat hari ini" : `${n} hari lagi`}</span></div>`;
      })
      .join("");
  }
  const taskFields = (x = {}) => [
    { name: "title", label: "Judul tugas", value: x.title, required: true },
    {
      name: "courseId",
      label: "Mata kuliah",
      type: "select",
      options: courseOptions(),
      value: x.courseId,
    },
    { name: "desc", label: "Deskripsi", type: "textarea", value: x.desc },
    {
      name: "due",
      label: "Tenggat",
      type: "date",
      value: x.due || dayOffset(7),
      required: true,
    },
  ];
  window.openTaskForm = () =>
    openForm("Tambah Tugas", taskFields(), (d) => {
      db.tasks.push({ id: uid(), done: false, ...d });
      save();
      renderTasks();
    });
  window.editTask = (id) => {
    const x = db.tasks.find((t) => t.id === id);
    openForm("Ubah Tugas", taskFields(x), (d) => {
      Object.assign(x, d);
      save();
      renderTasks();
    });
  };
  window.toggleTask = (id) => {
    const x = db.tasks.find((t) => t.id === id);
    x.done = !x.done;
    save();
    renderTasks();
  };
  window.delTask = (id) => {
    const x = db.tasks.find((t) => t.id === id);
    confirmDel("Hapus tugas?", `Tugas "${x.title}" akan dihapus.`, () => {
      db.tasks = db.tasks.filter((t) => t.id !== id);
      save();
      renderTasks();
    });
  };

  /* ---------- Mata kuliah ---------- */
  function renderCourses() {
    $("courseList").innerHTML = db.courses.length
      ? db.courses
          .map((c) => {
            const nt = db.tasks.filter((t) => t.courseId === c.id).length;
            const nm = db.materi.filter((m) => m.courseId === c.id).length;
            return `<div class="card p-6">
        <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div><span class="badge bg-pink-100 text-primary mb-2">${esc(c.kelas)} | ${esc(c.sks)} SKS</span>
            <h3 class="text-xl font-bold text-gray-900">${esc(c.name)}</h3>
            <p class="text-sm text-gray-600 mt-1"><i class="fas fa-user-tie mr-1 text-primary"></i>${esc(c.dosen)} <span class="text-gray-400">(${esc(c.nidn)})</span></p></div>
          <div class="flex gap-2"><button class="icon-btn" title="Ubah" onclick="editCourse('${c.id}')"><i class="fas fa-pen"></i></button>
          <button class="icon-btn danger" title="Hapus" onclick="delCourse('${c.id}')"><i class="fas fa-trash"></i></button></div></div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5 text-sm">
          <div><p class="text-gray-400 text-xs">Hari</p><p class="font-semibold">${esc(c.hari)}</p></div>
          <div><p class="text-gray-400 text-xs">Jam</p><p class="font-semibold">${esc(c.jam)}</p></div>
          <div><p class="text-gray-400 text-xs">Ruang</p><p class="font-semibold">${esc(c.ruang)}</p></div>
          <div><p class="text-gray-400 text-xs">Peserta</p><p class="font-semibold">${esc(c.peserta)} mahasiswa</p></div>
          <div><p class="text-gray-400 text-xs">Tugas / Materi</p><p class="font-semibold">${nt} / ${nm}</p></div>
        </div></div>`;
          })
          .join("")
      : `<p class="text-center text-gray-500">Belum ada mata kuliah.</p>`;
  }
  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map(
    (h) => ({ value: h, label: h }),
  );
  const courseFields = (c = {}) => [
    { name: "name", label: "Nama mata kuliah", value: c.name, required: true },
    { name: "kelas", label: "Kelas", value: c.kelas, required: true },
    { name: "dosen", label: "Dosen pengampu", value: c.dosen, required: true },
    { name: "nidn", label: "NIDN", value: c.nidn },
    { name: "sks", label: "SKS", type: "number", min: 1, value: c.sks ?? 3 },
    {
      name: "hari",
      label: "Hari",
      type: "select",
      options: hari,
      value: c.hari,
    },
    { name: "jam", label: "Jam (contoh: 07:30 - 10:00)", value: c.jam },
    { name: "ruang", label: "Ruang", value: c.ruang },
    {
      name: "peserta",
      label: "Jumlah peserta",
      type: "number",
      min: 0,
      value: c.peserta ?? 30,
    },
  ];
  window.openCourseForm = () =>
    openForm("Tambah Mata Kuliah", courseFields(), (d) => {
      db.courses.push({ id: uid(), ...d });
      save();
      renderAll();
    });
  window.editCourse = (id) => {
    const c = course(id);
    openForm("Ubah Mata Kuliah", courseFields(c), (d) => {
      Object.assign(c, d);
      save();
      renderAll();
    });
  };
  window.delCourse = (id) => {
    const c = course(id);
    confirmDel(
      "Hapus mata kuliah?",
      `"${c.name}" beserta tugas dan materinya akan dihapus.`,
      () => {
        db.courses = db.courses.filter((x) => x.id !== id);
        db.tasks = db.tasks.filter((x) => x.courseId !== id);
        db.materi = db.materi.filter((x) => x.courseId !== id);
        save();
        renderAll();
      },
    );
  };

  /* ---------- Materi ---------- */
  function renderMateri() {
    const sel = $("materiFilter"),
      cur = sel.value || "all";
    sel.innerHTML =
      `<option value="all">Semua mata kuliah</option>` +
      db.courses
        .map(
          (c) =>
            `<option value="${c.id}">${esc(c.name)} ${esc(c.kelas)}</option>`,
        )
        .join("");
    sel.value = db.courses.some((c) => c.id === cur) ? cur : "all";
    const list = db.materi
      .filter((m) => sel.value === "all" || m.courseId === sel.value)
      .sort(
        (a, b) =>
          courseName(a.courseId).localeCompare(courseName(b.courseId)) ||
          a.pertemuan - b.pertemuan,
      );
    $("materiSummary").textContent = `${list.length} materi`;
    $("materiList").innerHTML = list.length
      ? list
          .map(
            (m) => `<div class="card p-5 flex flex-col">
      <div class="flex justify-between items-start gap-2 mb-2"><span class="badge bg-fuchsia-100 text-fuchsia-600">${esc(courseName(m.courseId))}</span>
        <span class="badge bg-pink-100 text-primary">Pertemuan ${esc(m.pertemuan)}</span></div>
      <h3 class="font-bold text-gray-900 mb-1">${esc(m.title)}</h3>
      <p class="text-sm text-gray-600 flex-grow mb-3">${esc(m.desc)}</p>
      <div class="flex justify-between items-center">
        ${m.link ? `<a href="${esc(m.link)}" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-primary hover:underline"><i class="fas fa-external-link-alt mr-1"></i>Buka tautan</a>` : `<span></span>`}
        <div class="flex gap-2"><button class="icon-btn" title="Ubah" onclick="editMateri('${m.id}')"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" title="Hapus" onclick="delMateri('${m.id}')"><i class="fas fa-trash"></i></button></div></div></div>`,
          )
          .join("")
      : `<p class="col-span-full text-center text-gray-500">Belum ada materi.</p>`;
  }
  window.renderMateri = renderMateri;
  const materiFields = (m = {}) => [
    { name: "title", label: "Judul materi", value: m.title, required: true },
    {
      name: "courseId",
      label: "Mata kuliah",
      type: "select",
      options: courseOptions(),
      value: m.courseId,
    },
    {
      name: "pertemuan",
      label: "Pertemuan ke-",
      type: "number",
      min: 1,
      value: m.pertemuan ?? 1,
    },
    { name: "desc", label: "Ringkasan", type: "textarea", value: m.desc },
    { name: "link", label: "Tautan (opsional)", value: m.link },
  ];
  window.openMateriForm = () =>
    openForm("Tambah Materi", materiFields(), (d) => {
      db.materi.push({ id: uid(), ...d });
      save();
      renderMateri();
      renderCourses();
    });
  window.editMateri = (id) => {
    const m = db.materi.find((x) => x.id === id);
    openForm("Ubah Materi", materiFields(m), (d) => {
      Object.assign(m, d);
      save();
      renderMateri();
      renderCourses();
    });
  };
  window.delMateri = (id) => {
    const m = db.materi.find((x) => x.id === id);
    confirmDel("Hapus materi?", `Materi "${m.title}" akan dihapus.`, () => {
      db.materi = db.materi.filter((x) => x.id !== id);
      save();
      renderMateri();
      renderCourses();
    });
  };

  function renderAll() {
    renderTasks();
    renderCourses();
    renderMateri();
  }

  /* ---------- Login / Daftar ---------- */
  async function hash(s) {
    try {
      const b = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(s),
      );
      return Array.from(new Uint8Array(b))
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
    } catch (e) {
      return s;
    }
  }
  let mode = "login";
  function renderAuth(msg) {
    const reg = mode === "register";
    $("authTitle").textContent = reg ? "Daftar" : "Masuk";
    $("authSub").textContent = reg
      ? "Buat akun untuk menyimpan tugasmu."
      : "Masuk ke Portal Akademik.";

    $("authForm").innerHTML =
      `${reg ? `<div><label class="label">Nama lengkap</label><input id="aName" class="field" autocomplete="name"></div>` : ""}
      <div><label class="label">Username</label><input id="aUser" class="field" autocomplete="username"></div>
      <div>
        <label class="label">Kata sandi</label>
        <div class="relative">
          <input id="aPass" type="password" class="field pr-10" autocomplete="${reg ? "new-password" : "current-password"}">
          <button type="button" id="togglePass" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary focus:outline-none transition">
            <i class="fas fa-eye" id="eyeIcon"></i>
          </button>
        </div>
      </div>
      <p id="aErr" class="text-sm text-red-500 ${msg ? "" : "hidden"}">${esc(msg || "")}</p>
      <button type="submit" class="w-full bg-primary hover:bg-pink-600 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-pink-200 transition">${reg ? "Daftar" : "Masuk"}</button>
      ${reg ? "" : `<p class="text-xs text-gray-500 text-center">Akun contoh: <b>fatihatul</b> / <b>123456</b></p>`}`;

    $("authLinks").innerHTML = reg
      ? `Sudah punya akun? <a href="#" id="swAuth" class="text-primary font-semibold">Masuk</a>`
      : `Belum punya akun? <a href="#" id="swAuth" class="text-primary font-semibold">Daftar</a>`;

    $("swAuth").onclick = (e) => {
      e.preventDefault();
      mode = reg ? "login" : "register";
      renderAuth();
    };

    // Script to toggle password visibility
    if ($("togglePass")) {
      $("togglePass").onclick = () => {
        const pwd = $("aPass");
        const icon = $("eyeIcon");
        if (pwd.type === "password") {
          pwd.type = "text";
          icon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
          pwd.type = "password";
          icon.classList.replace("fa-eye-slash", "fa-eye");
        }
      };
    }
  }
  async function submitAuth(e) {
    e.preventDefault();
    const users = read(K.users, []);
    const username = $("aUser").value.trim().toLowerCase(),
      pass = $("aPass").value;
    if (!username || !pass)
      return renderAuth("Username dan kata sandi wajib diisi.");
    const h = await hash(pass);
    if (mode === "register") {
      const name = $("aName").value.trim();
      if (!name) return renderAuth("Nama lengkap wajib diisi.");
      if (pass.length < 6) return renderAuth("Kata sandi minimal 6 karakter.");
      if (users.some((u) => u.username === username))
        return renderAuth("Username sudah dipakai.");
      users.push({ username, name, pass: h });
      write(K.users, users);
      startSession({ username, name });
    } else {
      const u = users.find((x) => x.username === username && x.pass === h);
      if (!u) return renderAuth("Username atau kata sandi salah.");
      startSession(u);
    }
  }
  function startSession(u) {
    try {
      sessionStorage.setItem(
        K.session,
        JSON.stringify({ username: u.username, name: u.name }),
      );
    } catch (e) {}
    document.documentElement.classList.add("authed");
    showUser(u);
    renderAll();
    const urgent = db.tasks.filter(
      (x) => !x.done && daysLeft(x.due) <= 3,
    ).length;
    if (urgent)
      showModal(
        "Pengingat tenggat",
        `Ada ${urgent} tugas yang tenggatnya dalam 3 hari atau sudah lewat. Cek di menu Daftar Tugas.`,
      );
  }
  function showUser(u) {
    $("navUser").textContent = u.name;
    $("navUserM").textContent = u.name;
  }
  window.logout = function () {
    try {
      sessionStorage.removeItem(K.session);
    } catch (e) {}
    document.documentElement.classList.remove("authed");
    mode = "login";
    renderAuth();
    location.hash = "#beranda";
  };

  document.addEventListener("DOMContentLoaded", async () => {
    if (!read(K.users, []).length)
      write(K.users, [
        {
          username: "fatihatul",
          name: "Fatihatul Ikrimah",
          pass: await hash("123456"),
        },
      ]);
    $("authForm").addEventListener("submit", submitAuth);
    renderAuth();
    renderAll();
    let s = null;
    try {
      s = JSON.parse(sessionStorage.getItem(K.session));
    } catch (e) {}
    if (s && s.name) {
      document.documentElement.classList.add("authed");
      showUser(s);
    } else {
      try {
        sessionStorage.removeItem(K.session);
      } catch (e) {}
      document.documentElement.classList.remove("authed");
    }
  });
})();
