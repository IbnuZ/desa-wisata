// Memastikan semua elemen HTML sudah dimuat sebelum menjalankan script
document.addEventListener("DOMContentLoaded", () => {
  // Daftarkan plugin ScrollTrigger GSAP
  // Ini PENTING agar ScrollTrigger dapat digunakan!
  gsap.registerPlugin(ScrollTrigger);

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector(".navbar");
  const logo = document.querySelector(".navbar .logo");
  // Ambil semua link navigasi baik desktop maupun mobile untuk perubahan warna saat scroll
  const allNavLinks = document.querySelectorAll(
    ".navbar .nav-link, .nav-links-mobile .nav-link-mobile"
  );
  const hamburgerSpans = document.querySelectorAll(".hamburger span");

  window.addEventListener("scroll", () => {
    // Jika halaman di-scroll lebih dari 50px dari atas
    if (window.scrollY > 50) {
      // Ubah warna latar belakang navbar dan shadow
      navbar.classList.remove("bg-white", "shadow-md");
      navbar.classList.add("bg-primary", "shadow-xl");

      // Ubah warna logo
      if (logo) {
        // Pastikan elemen logo ada
        logo.classList.remove("text-primary");
        logo.classList.add("text-white");
      }

      // Ubah warna teks semua link navigasi
      allNavLinks.forEach((link) => {
        link.classList.remove("text-text-dark", "hover:text-primary"); // Hapus class default
        link.classList.add("text-white", "hover:text-secondary"); // Tambah class baru
      });

      // Ubah warna hamburger icon (langsung melalui style untuk override CSS)
      hamburgerSpans.forEach((span) => {
        span.style.backgroundColor = "white";
      });
    } else {
      // Kembalikan navbar ke kondisi awal
      navbar.classList.remove("bg-primary", "shadow-xl");
      navbar.classList.add("bg-white", "shadow-md");

      // Kembalikan warna logo
      if (logo) {
        logo.classList.remove("text-white");
        logo.classList.add("text-primary");
      }

      // Kembalikan warna teks semua link navigasi
      allNavLinks.forEach((link) => {
        link.classList.remove("text-white", "hover:text-secondary"); // Hapus class saat di-scroll
        link.classList.add("text-text-dark", "hover:text-primary"); // Tambah class default
      });

      // Kembalikan warna hamburger icon ke default
      hamburgerSpans.forEach((span) => {
        span.style.backgroundColor = ""; // Kosongkan untuk kembali ke nilai CSS
      });
    }
  });

  // --- Hamburger Menu Toggle (Mobile) ---
  const hamburger = document.querySelector(".hamburger");
  const navLinksMobile = document.querySelector(".nav-links-mobile");

  // Pastikan elemen hamburger dan navLinksMobile ada sebelum menambahkan event listener
  if (hamburger && navLinksMobile) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active"); // Mengaktifkan animasi 'X' pada hamburger
      navLinksMobile.classList.toggle("-translate-y-full"); // Sembunyikan menu
      navLinksMobile.classList.toggle("translate-y-0"); // Tampilkan menu
    });

    // Menutup menu mobile saat salah satu link diklik
    document
      .querySelectorAll(".nav-links-mobile .nav-link-mobile")
      .forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          navLinksMobile.classList.remove("translate-y-0");
          navLinksMobile.classList.add("-translate-y-full");
        });
      });
  }

  // --- GSAP Animations ---
  gsap.from(".hero-content h1", {
    y: -50,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
  });
  gsap.from(".hero-content p", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    delay: 0.5,
    ease: "power3.out",
  });

  // -- PERBAIKAN UNTUK BUTTON HERO --
  // Atur kondisi awal button ke tidak terlihat dan skala kecil
  gsap.set(".hero-content .btn", { opacity: 0, scale: 0.5 });

  // Animasikan button ke kondisi akhir yang terlihat
  gsap.to(".hero-content .btn", {
    opacity: 1,
    scale: 1,
    duration: 1,
    delay: 1,
    ease: "back.out(1.7)",
  });

  // 2. About Section Animation (animasi saat di-scroll ke dalam viewport)
  gsap.from(".about-content", {
    x: -100, // Mulai dari 100px di kiri
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".about-section", // Saat elemen ini masuk viewport
      start: "top 70%", // Animasi mulai saat bagian atas section mencapai 70% dari viewport
      toggleActions: "play none none reverse", // Play saat masuk, reverse saat keluar
    },
  });
  gsap.from(".about-image img", {
    x: 100, // Mulai dari 100px di kanan
    opacity: 0,
    duration: 1,
    delay: 0.3, // Sedikit tunda agar berurutan dengan konten teks
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  // 3. Gallery Section Animation (staggered effect untuk setiap gambar)
  gsap.from(".gallery-grid img", {
    y: 50, // Mulai dari 50px di bawah
    opacity: 0,
    duration: 0.8,
    stagger: 0.2, // Setiap gambar muncul dengan jeda 0.2 detik
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".gallery-section",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  // 4. Advantages Section Animation (pop-up effect untuk setiap item)
  gsap.from(".advantage-item", {
    scale: 0.8, // Mulai dari skala 0.8
    opacity: 0,
    duration: 0.7,
    stagger: 0.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".advantages-section",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  // 5. Destinations Section Animation (slide up effect untuk setiap kartu)
 // 5. Destinations Section Animation (slide up effect untuk setiap kartu)
 gsap.set(".destination-card", { opacity: 0, y: 80 });

 gsap.to(".destination-card", { // Gunakan gsap.to untuk mengontrol state akhir
     opacity: 1,
     y: 0,
     duration: 0.8,
     stagger: 0.2,
     ease: "power2.out",
     scrollTrigger: {
         trigger: ".destinations-section",
         start: "top 70%",
         // Mengatur toggleActions agar animasi diputar saat masuk, dibalik saat keluar
         toggleActions: "play reverse play reverse", // <-- ini akan membuat card muncul dan menghilang lagi
     },
 });

 gsap.from(".info-desa-section .info-card", {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
      trigger: ".info-desa-section",
      start: "top 70%",
      toggleActions: "play reverse play reverse", // Menggunakan play reverse play reverse agar lebih dinamis
      // markers: true // Hapus ini jika sudah berfungsi
  }
});

 

 // --- Pop-up Detail Destinasi ---
 const detailButtons = document.querySelectorAll('.btn-detail');
 const detailModal = document.getElementById('detailModal');
 const closeModalBtn = document.getElementById('closeModalBtn');
 const modalImage = document.getElementById('modalImage');
 const modalTitle = document.getElementById('modalTitle');
 const modalDescription = document.getElementById('modalDescription');
 const modalLocation = document.getElementById('modalLocation');
 const modalFacilities = document.getElementById('modalFacilities');
 const modalActivities = document.getElementById('modalActivities');

 const destinationsData = {
  // PERHATIKAN: ID BERUBAH DARI "curug-malela" MENJADI "curug-cibareubeuy"
  "curug-cibareubeuy": {
      image: "img/destinations/curug-cibareubeuy.jpg", // Menggunakan gambar yang sudah ada, Anda bisa mengganti ini
      title: "Curug Cibareubeuy",
      description: "Curug Cibareubeuy adalah air terjun bertingkat yang menakjubkan dengan kolam-kolam alami di setiap tingkatannya, sempurna untuk berendam dan menikmati kesegaran alam. Terletak di tengah lanskap yang masih alami, tempat ini menawarkan ketenangan dan keindahan yang luar biasa. Jalur menuju curug juga merupakan pengalaman trekking yang menyenangkan, melewati perkebunan dan hutan kecil.",
      location: "Jl. Cibeusi, Nagrak, Kec. Ciater, Kabupaten Subang, Jawa Barat",
      facilities: ["Area Parkir", "Toilet Umum", "Warung Makanan Sederhana"],
      activities: "Berendam, trekking, fotografi alam, menikmati suasana tenang.",
  },
  // PERHATIKAN: ID BERUBAH DARI "kebun-teh" MENJADI "saung-lahang"
  "saung-lahang": {
      image: "img/destinations/saung-lahang.png", // Gambar saung lahang
      title: "Saung Lahang",
      description: "Rasakan pengalaman unik mencicipi 'lahang' (nira aren) segar langsung dari sadapan pohon aren di Saung Lahang. Saung tradisional ini menawarkan suasana pedesaan yang otentik, di mana Anda bisa bersantai sambil menikmati minuman manis alami dan hidangan ringan khas desa. Ini adalah tempat sempurna untuk mengenal lebih dekat proses pembuatan gula aren dan budaya lokal.",
      location: "Jl. Cibeusi, Nagrak, Kec. Ciater, Kabupaten Subang, Jawa Barat",
      facilities: ["Area Duduk Santai", "Warung Minuman Tradisional", "Spot Foto Unik"],
      activities: "Mencicipi lahang segar, bersantai, belajar tentang pohon aren, interaksi budaya.",
  },
  // PERHATIKAN: ID BERUBAH DARI "terasering-sawah" MENJADI "curug-ciangin"
  "curug-ciangin": {
      image: "img/destinations/curug-ciangin.jpg", // Gambar curug ciangin
      title: "Curug Ciangin",
      description: "Curug Ciangin adalah permata tersembunyi dengan air terjun yang mengalir deras di tengah tebing batu. Dikelilingi pepohonan rindang dan udara pegunungan yang sejuk, tempat ini cocok untuk menenangkan diri dan menikmati keindahan alam. Kolam di bawah curug mengundang untuk direndam, sementara suara gemericik air memberikan relaksasi. Akses menuju curug membutuhkan sedikit usaha, namun pemandangan yang disajikan sepadan.",
      location: "Jl. Cibeusi, Nagrak, Kec. Ciater, Kabupaten Subang, Jawa Barat",
      facilities: ["Area Parkir Terdekat", "Jalur Trekking Sederhana"],
      activities: "Menikmati air terjun, fotografi, relaksasi di alam terbuka, trekking.",
  }
};

 function showModal(id) {
     // PERBAIKAN DI SINI: Langsung akses destinationsData[id]
     const destination = destinationsData[id];
     
     if (destination) { // Pastikan destinasi ditemukan
         modalImage.src = destination.image;
         modalTitle.textContent = destination.title;
         modalDescription.textContent = destination.description;
         modalLocation.innerHTML = `<i class="fas fa-map-marker-alt mr-2 text-primary"></i> ${destination.location}`;

         if (destination.facilities && destination.facilities.length > 0) {
             modalFacilities.style.display = 'block';
             const ulElement = modalFacilities.querySelector('ul');
             ulElement.innerHTML = '';
             destination.facilities.forEach(item => {
                 const li = document.createElement('li');
                 li.textContent = item;
                 ulElement.appendChild(li);
             });
         } else {
             modalFacilities.style.display = 'none';
         }

         if (destination.activities) {
             modalActivities.style.display = 'block';
             modalActivities.querySelector('p').textContent = destination.activities;
         } else {
             modalActivities.style.display = 'none';
         }

         gsap.to(detailModal, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
         gsap.fromTo(detailModal.querySelector('.modal-content'),
             { y: 50, scale: 0.95, opacity: 0 },
             { y: 0, scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
         );

         document.body.style.overflow = 'hidden';
     } else {
         console.error("Destinasi dengan ID '" + id + "' tidak ditemukan.");
     }
 }

 function hideModal() {
     gsap.to(detailModal.querySelector('.modal-content'),
         { y: 50, scale: 0.95, opacity: 0, duration: 0.3, ease: 'power2.in' }
     );
     gsap.to(detailModal, { opacity: 0, pointerEvents: 'none', duration: 0.3, delay: 0.1 });

     document.body.style.overflow = '';
 }

 detailButtons.forEach(button => {
     button.addEventListener('click', (e) => {
         e.preventDefault();
         const destinationId = button.dataset.destinationId;
         showModal(destinationId);
     });
 });

 closeModalBtn.addEventListener('click', hideModal);

 detailModal.addEventListener('click', (e) => {
     if (e.target === detailModal) {
         hideModal();
     }
 });
});
