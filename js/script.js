/**
 * Rintis Studio — Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Toggle ---
  const menuBtn = document.querySelector('.menu');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('open', !isExpanded);
      menuBtn.textContent = isExpanded ? 'Menu +' : 'Tutup −';
    });

    // Close menu when a navigation item is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = 'Menu +';
      });
    });
  }

  // --- Projects Modal / Dialog Data ---
  const projects = [
    {
      title: 'Ruang Tumbuh',
      description:
        'Konsep landing page untuk bisnis tanaman. Warna hijau lembut dan tata letak yang lapang membawa karakter alami ke layar, dengan fokus pada pengenalan produk dan ajakan menghubungi bisnis.',
      features: [
        'Pembuka yang memperkenalkan karakter brand',
        'Bagian koleksi pilihan dan informasi perawatan',
        'Ajakan menghubungi bisnis yang mudah ditemukan',
      ],
      service: 'Landing page',
    },
    {
      title: 'Forma Living',
      description:
        'Konsep company profile untuk studio interior atau furnitur. Tipografi editorial dan warna hangat memberi ruang bagi produk dan cerita brand untuk tampil sebagai fokus utama.',
      features: [
        'Profil dan pendekatan desain studio',
        'Galeri koleksi atau proyek dengan deskripsi',
        'Halaman layanan serta informasi kontak',
      ],
      service: 'Website bisnis / company profile',
    },
  ];

  const dialog = document.querySelector('#project-dialog');
  const dialogTitle = document.querySelector('#project-title');
  const dialogDesc = document.querySelector('#project-description');
  const dialogFeatures = document.querySelector('#project-features');
  const dialogClose = document.querySelector('.close');
  const projectContactBtn = document.querySelector('#project-contact');

  // Open modal on click of project trigger buttons/links
  document.querySelectorAll('[data-project]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectIndex = Number(trigger.dataset.project);
      const project = projects[projectIndex];

      if (!project || !dialog) return;

      dialogTitle.textContent = project.title;
      dialogDesc.textContent = project.description;

      const featureItems = project.features.map((featureText) => {
        const li = document.createElement('li');
        li.textContent = featureText;
        return li;
      });
      dialogFeatures.replaceChildren(...featureItems);
      dialog.dataset.service = project.service;

      dialog.showModal();
    });
  });

  // Close modal with close button
  if (dialogClose && dialog) {
    dialogClose.addEventListener('click', () => dialog.close());
  }

  // Close modal when clicking outside dialog window (backdrop)
  if (dialog) {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
          rect.top <= e.clientY &&
          e.clientY <= rect.bottom &&
          rect.left <= e.clientX &&
          e.clientX <= rect.right;

        if (!isInDialog) {
          dialog.close();
        }
      }
    });
  }

  // Close dialog when clicking the action CTA inside dialog
  if (projectContactBtn && dialog) {
    projectContactBtn.addEventListener('click', () => {
      dialog.close();
    });
  }

  // --- Project Brief Form Submission ---
  const briefForm = document.querySelector('#brief-form');
  const formStatus = document.querySelector('#form-status');

  if (briefForm) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!briefForm.reportValidity()) return;

      const formData = new FormData(briefForm);
      const nama = formData.get('nama');
      const bisnis = formData.get('bisnis') || 'Belum diisi';
      const ide = formData.get('ide');

      const content = [
        'BRIEF PROJECT WEBSITE',
        '=====================',
        'Ditujukan Kepada: ZORS CRAFT (zorscraft.id)',
        'Founder / Developer: Muhamad Raykram Y.S (Raykram)',
        'Kontak Email: mail@raykramx.me',
        'Website: https://zorscraft.id',
        '---------------------',
        `Nama Klien: ${nama}`,
        `Bisnis: ${bisnis}`,
        '',
        'Gambaran Project:',
        ide,
        '',
        'Dokumen ini disusun secara lokal. Silakan kirimkan ke mail@raykramx.me.',
      ].join('\n');

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');

      downloadLink.href = url;
      downloadLink.download = `brief-${nama.replace(/\s+/g, '-').toLowerCase() || 'project'}.txt`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);

      if (formStatus) {
        formStatus.textContent =
          'Brief siap diunduh. Silakan kirimkan file ini ke mail@raykramx.me untuk diskusi proyek lebih lanjut.';
      }
    });
  }
});
