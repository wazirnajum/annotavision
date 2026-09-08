// =========================================================
// AnotaVision — shared front-end behaviour
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  function openNav() {
    navLinks.classList.add('open');
    navToggle.innerHTML = closeIcon();
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    navLinks.classList.remove('open');
    navToggle.innerHTML = menuIcon();
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    // also collapse any open dropdown when the whole menu closes
    document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });

    // Close the mobile menu when clicking outside of it
    document.addEventListener('click', (e) => {
      if (!navLinks.classList.contains('open')) return;
      if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
      closeNav();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) closeNav();
    });

    // Close the mobile menu automatically if the viewport is resized
    // back up to desktop width (prevents a "stuck open" panel)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980 && navLinks.classList.contains('open')) closeNav();
    });
  }

  /* ---------- Dropdown menus (tap-to-open on mobile, hover on desktop) ---------- */
  document.querySelectorAll('.has-dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        e.stopPropagation();
        const parent = link.parentElement;
        const wasOpen = parent.classList.contains('open');
        document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
        if (!wasOpen) parent.classList.add('open');
      }
    });
  });

  // Close mobile nav when a normal (non-dropdown) link is clicked
  document.querySelectorAll('.nav-links a.nav-link:not(.has-dropdown > .nav-link)').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('open')) closeNav();
    });
  });
  document.querySelectorAll('.dropdown a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('open')) closeNav();
    });
  });

  /* ---------- Highlight current page in nav ---------- */
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a.nav-link, .dropdown a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) {
      a.closest('li') && a.closest('li').classList.add('active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.style.opacity = 1);
  }

  /* ---------- Portfolio filter (portfolio.html) ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  if (filterBtns.length && portfolioCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        portfolioCards.forEach(card => {
          const cats = (card.dataset.category || '').split(' ');
          const show = filter === 'all' || cats.includes(filter);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Simple stat count-up on About section ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countIO.observe(c));
  }

  function animateCount(el) {
    const raw = el.dataset.count;
    const suffixMatch = raw.match(/[^0-9]+$/);
    const suffix = suffixMatch ? suffixMatch[0] : '';
    const target = parseInt(raw, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 30);
  }

  /* ---------- Team member "View Profile" modal ---------- */
  const teamModal = document.getElementById('teamModal');
  if (teamModal) {
    const modalPhoto = document.getElementById('tmPhoto');
    const modalName = document.getElementById('tmName');
    const modalRole = document.getElementById('tmRole');
    const modalBio = document.getElementById('tmBio');
    const modalEmail = document.getElementById('tmEmail');
    const modalLinkedin = document.getElementById('tmLinkedin');
    const modalUpwork = document.getElementById('tmUpwork');
    let lastFocused = null;

    function openTeamModal(btn) {
      const d = btn.dataset;
      modalPhoto.src = d.img || '';
      modalPhoto.alt = d.name || '';
      modalName.textContent = d.name || '';
      modalRole.textContent = d.role || '';
      modalBio.textContent = d.bio || '';

      if (d.email) {
        modalEmail.href = 'mailto:' + d.email;
        modalEmail.style.display = '';
      } else {
        modalEmail.style.display = 'none';
      }
      if (d.linkedin) {
        modalLinkedin.href = d.linkedin;
        modalLinkedin.style.display = '';
      } else {
        modalLinkedin.style.display = 'none';
      }
      if (d.upwork) {
        modalUpwork.href = d.upwork;
        modalUpwork.style.display = '';
      } else {
        modalUpwork.style.display = 'none';
      }

      lastFocused = btn;
      teamModal.classList.add('open');
      teamModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      teamModal.querySelector('.team-modal-close').focus();
    }

    function closeTeamModal() {
      teamModal.classList.remove('open');
      teamModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('.team-view-btn').forEach(btn => {
      btn.addEventListener('click', () => openTeamModal(btn));
    });

    teamModal.querySelectorAll('[data-modal-close]').forEach(el => {
      el.addEventListener('click', closeTeamModal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && teamModal.classList.contains('open')) closeTeamModal();
    });
  }

  /* ---------- Team grid "Show More" (mobile: 4 members, then all) ---------- */
  const teamMoreBtn = document.getElementById('teamMoreBtn');
  if (teamMoreBtn) {
    const teamGrid = document.getElementById('teamGrid') || document.querySelector('.team-grid, .team-page-grid');
    teamMoreBtn.addEventListener('click', () => {
      if (!teamGrid) return;
      const expanded = teamGrid.hasAttribute('data-team-expanded');
      if (expanded) {
        teamGrid.removeAttribute('data-team-expanded');
        teamMoreBtn.firstChild.textContent = 'Show More Team Members';
        teamMoreBtn.setAttribute('aria-expanded', 'false');
        teamGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        teamGrid.setAttribute('data-team-expanded', '');
        teamMoreBtn.firstChild.textContent = 'Show Fewer Team Members';
        teamMoreBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  /* ---------- Project upload dropzone (portfolio.html) ---------- */
  const uploadForm = document.getElementById('projectUploadForm');
  if (uploadForm) {
    const dropzone = document.getElementById('uploadDropzone');
    const fileInput = document.getElementById('upFile');
    const fileListEl = document.getElementById('uploadFileList');
    const dropzoneText = document.getElementById('uploadDropzoneText');
    const successEl = document.getElementById('uploadSuccess');

    // Files staged for "upload" — kept in memory only, nothing is sent
    // anywhere without a backend. Wire this to your server or an email
    // service to actually receive the files.
    let stagedFiles = [];

    function formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function renderFileList() {
      fileListEl.innerHTML = '';
      stagedFiles.forEach((file, i) => {
        const li = document.createElement('li');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = file.name;
        const sizeSpan = document.createElement('span');
        sizeSpan.className = 'file-size';
        sizeSpan.textContent = formatSize(file.size);
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.setAttribute('aria-label', 'Remove ' + file.name);
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => {
          stagedFiles.splice(i, 1);
          renderFileList();
        });
        li.appendChild(nameSpan);
        li.appendChild(sizeSpan);
        li.appendChild(removeBtn);
        fileListEl.appendChild(li);
      });
      dropzoneText.textContent = stagedFiles.length
        ? stagedFiles.length + ' file' + (stagedFiles.length > 1 ? 's' : '') + ' selected — click to add more'
        : 'Drag & drop images, video or documents here, or click to browse';
    }

    function addFiles(fileList) {
      Array.from(fileList).forEach(f => stagedFiles.push(f));
      renderFileList();
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        addFiles(e.target.files);
        fileInput.value = '';
      });
    }

    if (dropzone) {
      ['dragenter', 'dragover'].forEach(evt => {
        dropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          dropzone.classList.add('drag-over');
        });
      });
      ['dragleave', 'drop'].forEach(evt => {
        dropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          dropzone.classList.remove('drag-over');
        });
      });
      dropzone.addEventListener('drop', (e) => {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
          addFiles(e.dataTransfer.files);
        }
      });
    }

    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!uploadForm.checkValidity()) {
        uploadForm.reportValidity();
        return;
      }
      // No backend is wired up yet — this only confirms the details were
      // captured client-side. Connect this to your server/API or an email
      // service (e.g. mailto: fallback below) to actually deliver files.
      successEl.classList.add('show');
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      uploadForm.reset();
      stagedFiles = [];
      renderFileList();
    });
  }

  /* ---------- Contact form (contact.html) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const successEl = document.getElementById('contactSuccess');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      // No backend is wired up yet — wire this to your server/API or a
      // form service to actually deliver messages to wazir@annotyra.com.
      successEl.classList.add('show');
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      contactForm.reset();
    });
  }

  function menuIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  }
  function closeIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
  }

});
