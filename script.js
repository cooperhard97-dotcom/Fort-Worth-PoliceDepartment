(() => {
  'use strict';

  const RADIO_CODES = [
    { code: '10-1',  meaning: 'Receiving poorly / signal weak', cat: '10-code' },
    { code: '10-2',  meaning: 'Receiving well', cat: '10-code' },
    { code: '10-4',  meaning: 'Acknowledged / understood', cat: '10-code' },
    { code: '10-6',  meaning: 'Busy, stand by unless urgent', cat: '10-code' },
    { code: '10-7',  meaning: 'Out of service', cat: '10-code' },
    { code: '10-7B', meaning: 'Out of service, mechanical trouble', cat: '10-code' },
    { code: '10-8',  meaning: 'In service, available for calls', cat: '10-code' },
    { code: '10-9',  meaning: 'Repeat last transmission', cat: '10-code' },
    { code: '10-12', meaning: 'Visitors or civilians present', cat: '10-code' },
    { code: '10-15', meaning: 'Subject in custody', cat: '10-code' },
    { code: '10-19', meaning: 'Return to station', cat: '10-code' },
    { code: '10-20', meaning: 'Location / advise location', cat: '10-code' },
    { code: '10-21', meaning: 'Telephone this unit', cat: '10-code' },
    { code: '10-22', meaning: 'Disregard last assignment', cat: '10-code' },
    { code: '10-23', meaning: 'Arrived at scene', cat: '10-code' },
    { code: '10-24', meaning: 'Assignment complete', cat: '10-code' },
    { code: '10-27', meaning: 'Request driver license information', cat: '10-code' },
    { code: '10-28', meaning: 'Request vehicle registration information', cat: '10-code' },
    { code: '10-29', meaning: 'Check for wants / warrants', cat: '10-code' },
    { code: '10-31', meaning: 'Crime in progress', cat: '10-code' },
    { code: '10-32', meaning: 'Person with a weapon', cat: '10-code' },
    { code: '10-33', meaning: 'Emergency, all units stand by', cat: '10-code' },
    { code: '10-38', meaning: 'Traffic stop', cat: '10-code' },
    { code: '10-39', meaning: 'Responding with lights and siren', cat: '10-code' },
    { code: '10-41', meaning: 'Beginning tour of duty', cat: '10-code' },
    { code: '10-42', meaning: 'Ending tour of duty', cat: '10-code' },
    { code: '10-46', meaning: 'Assist motorist', cat: '10-code' },
    { code: '10-50', meaning: 'Vehicle collision', cat: '10-code' },
    { code: '10-52', meaning: 'Request EMS / ambulance', cat: '10-code' },
    { code: '10-70', meaning: 'Fire alarm / report of fire', cat: '10-code' },
    { code: '10-76', meaning: 'En route to scene', cat: '10-code' },
    { code: '10-78', meaning: 'Request additional units / backup', cat: '10-code' },
    { code: '10-79', meaning: 'Notify coroner', cat: '10-code' },
    { code: '10-80', meaning: 'Vehicle pursuit in progress', cat: '10-code' },
    { code: '10-97', meaning: 'Arrived at assigned location', cat: '10-code' },
    { code: '10-99', meaning: 'Officer needs urgent assistance', cat: '10-code' },
    { code: 'Signal 0',  meaning: 'Officer down / officer needs help now', cat: 'signal' },
    { code: 'Signal 1',  meaning: 'Meet complainant', cat: 'signal' },
    { code: 'Signal 5',  meaning: 'Escort', cat: 'signal' },
    { code: 'Signal 7',  meaning: 'Deceased person', cat: 'signal' },
    { code: 'Signal 11', meaning: 'Fire', cat: 'signal' },
    { code: 'Signal 20', meaning: 'Robbery in progress', cat: 'signal' },
    { code: 'Signal 25', meaning: 'Domestic disturbance', cat: 'signal' },
    { code: 'Signal 30', meaning: 'Suspicious vehicle', cat: 'signal' },
    { code: 'Signal 33', meaning: 'Riot / large disturbance', cat: 'signal' },
    { code: 'Signal 40', meaning: 'Missing person', cat: 'signal' },
    { code: 'Signal 46', meaning: 'Intoxicated driver', cat: 'signal' },
    { code: 'Signal 63', meaning: 'Prowler', cat: 'signal' },
    { code: 'Code 1', meaning: 'Routine, no lights or siren', cat: 'priority' },
    { code: 'Code 2', meaning: 'Urgent, no lights or siren, expedite', cat: 'priority' },
    { code: 'Code 3', meaning: 'Emergency response, lights and siren', cat: 'priority' },
    { code: 'Code 4', meaning: 'Scene secure, no further assistance needed', cat: 'priority' },
    { code: 'Code 5', meaning: 'Stakeout / surveillance in progress', cat: 'priority' },
    { code: 'Code 6', meaning: 'Out for investigation, avoid the area', cat: 'priority' },
    { code: 'Priority 1', meaning: 'Life-threatening emergency, immediate response', cat: 'priority' },
    { code: 'Priority 2', meaning: 'Urgent, in-progress or recent crime', cat: 'priority' },
    { code: 'Priority 3', meaning: 'Routine call for service', cat: 'priority' },
    { code: 'Priority 4', meaning: 'Non-urgent, can be scheduled', cat: 'priority' },
    { code: 'Status: 10-8',  meaning: 'Unit available for dispatch', cat: 'status' },
    { code: 'Status: 10-7',  meaning: 'Unit unavailable / out of service', cat: 'status' },
    { code: 'Status: 10-6',  meaning: 'Unit busy on assignment', cat: 'status' },
    { code: 'Status: Code 4', meaning: 'Situation stable, scene secure', cat: 'status' },
    { code: 'Status: En Route', meaning: 'Unit traveling to assigned call', cat: 'status' },
    { code: 'Status: On Scene', meaning: 'Unit has arrived and is handling the call', cat: 'status' },
    { code: 'Status: Transporting', meaning: 'Unit transporting a subject or patient', cat: 'status' },
    { code: 'Status: Report', meaning: 'Unit completing paperwork, available if urgent', cat: 'status' },
  ];

  const CATEGORY_LABEL = {
    '10-code': '10 Code',
    'signal': 'Signal',
    'priority': 'Priority',
    'status': 'Status',
  };

  const codeTableBody = document.getElementById('codeTableBody');
  function renderCodes(filter = 'all') {
    codeTableBody.innerHTML = '';
    RADIO_CODES.forEach(row => {
      if (filter !== 'all' && row.cat !== filter) return;
      const tr = document.createElement('tr');
      tr.dataset.cat = row.cat;
      tr.innerHTML = `
        <td>${row.code}</td>
        <td>${row.meaning}</td>
        <td><span class="cat-badge">${CATEGORY_LABEL[row.cat]}</span></td>
      `;
      codeTableBody.appendChild(tr);
    });
  }
  renderCodes();

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderCodes(chip.dataset.filter);
    });
  });

  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const moonIcon = document.getElementById('themeIconMoon');
  const sunIcon = document.getElementById('themeIconSun');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (theme === 'light') {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  }

  let savedTheme = 'dark';
  try {
    savedTheme = localStorage.getItem('fwpd-theme') || 'dark';
  } catch (e) { /* localStorage unavailable */ }
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('fwpd-theme', next); } catch (e) { /* ignore */ }
  });

  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  const searchToggle = document.getElementById('searchToggle');
  const searchClose = document.getElementById('searchClose');
  const searchPanel = document.getElementById('searchPanel');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  function openSearch() {
    searchPanel.classList.add('open');
    searchToggle.setAttribute('aria-expanded', 'true');
    setTimeout(() => searchInput.focus(), 150);
  }
  function closeSearch() {
    searchPanel.classList.remove('open');
    searchToggle.setAttribute('aria-expanded', 'false');
  }
  searchToggle.addEventListener('click', () => {
    searchPanel.classList.contains('open') ? closeSearch() : openSearch();
  });
  searchClose.addEventListener('click', closeSearch);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  function buildIndex() {
    const index = [];

    document.querySelectorAll('[data-searchable="handbook"] .accordion-item, [data-searchable="sop"] .accordion-item').forEach(item => {
      const title = item.querySelector('.acc-title')?.textContent.trim() || '';
      const body = item.querySelector('.acc-body')?.textContent.trim().replace(/\s+/g, ' ') || '';
      const parentSection = item.closest('[data-searchable]').dataset.searchable;
      index.push({
        category: parentSection === 'handbook' ? 'Handbook' : 'SOP',
        title,
        snippet: body.slice(0, 140) + (body.length > 140 ? '…' : ''),
        el: item,
      });
    });

    document.querySelectorAll('[data-searchable="policies"] .policy-card').forEach(card => {
      const title = card.querySelector('h3')?.textContent.trim() || '';
      const body = card.querySelector('p')?.textContent.trim() || '';
      index.push({ category: 'Policy', title, snippet: body, el: card });
    });

    RADIO_CODES.forEach(row => {
      index.push({
        category: 'Radio Code',
        title: row.code,
        snippet: row.meaning,
        el: document.getElementById('codes'),
      });
    });

    return index;
  }
  const searchIndex = buildIndex();

  function highlight(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${escaped})`, 'ig'), '<mark>$1</mark>');
  }

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    if (!q) return;

    const matches = searchIndex.filter(item =>
      item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q)
    ).slice(0, 30);

    if (!matches.length) {
      searchResults.innerHTML = `<div class="search-empty">No matches for "${searchInput.value}".</div>`;
      return;
    }

    matches.forEach(m => {
      const div = document.createElement('div');
      div.className = 'search-result';
      div.innerHTML = `
        <div class="sr-cat">${m.category}</div>
        <div class="sr-title">${highlight(m.title, searchInput.value.trim())}</div>
        <div class="sr-snippet">${highlight(m.snippet, searchInput.value.trim())}</div>
      `;
      div.addEventListener('click', () => {
        closeSearch();
        if (m.el.tagName === 'DETAILS') m.el.open = true;
        m.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        m.el.style.transition = 'box-shadow .4s ease';
        m.el.style.boxShadow = '0 0 0 3px var(--accent-glow)';
        setTimeout(() => { m.el.style.boxShadow = ''; }, 1600);
      });
      searchResults.appendChild(div);
    });
  });

  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const heroBg = document.getElementById('heroBg');
  const navAnchors = document.querySelectorAll('.nav-link');
  const sections = Array.from(navAnchors).map(a => document.querySelector(a.getAttribute('href')));

  let ticking = false;
  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    navbar.classList.toggle('scrolled', scrollY > 40);
    backToTop.classList.toggle('visible', scrollY > 700);

    if (heroBg) {
      const parallax = Math.min(scrollY * 0.28, 160);
      heroBg.style.transform = `translateY(${parallax}px)`;
    }

    let currentIndex = 0;
    sections.forEach((sec, i) => {
      if (sec && sec.getBoundingClientRect().top - 110 <= 0) currentIndex = i;
    });
    navAnchors.forEach((a, i) => a.classList.toggle('active', i === currentIndex));

    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
