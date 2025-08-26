
// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navMenu.classList.toggle('show');
  });
}

// Current year in footer
const y = document.getElementById('year');
if (y) y.textContent = String(new Date().getFullYear());

// Simple intersection reveal (progressive enhancement)
const revealEls = document.querySelectorAll('.card, .step, .ph, .review');
const io = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('reveal'));
}, { threshold: .1 }) : null;
revealEls.forEach(el => io && io.observe(el));

// Form -> mailto with encoded body, clipboard fallback
const form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    // Basic validation
    if (!data.name || !data.phone || !data.service) {
      alert('Please fill name, phone, and service.');
      return;
    }
    const subject = encodeURIComponent('Quote request — ' + (data.service || 'Tree Service'));
    const body = encodeURIComponent(
`Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || '-'}
Address: ${data.address || '-'}
Service: ${data.service}
Preferred date: ${data.date || '-'}

Details:
${data.details || '-'} 
`);
    const mailto = `mailto:DukeAndSonsTreeTrimming@gmail.com?subject=${subject}&body=${body}`;
    // Try opening the user's mail client
    window.location.href = mailto;

    // Also copy a plain-text message to clipboard as fallback
    const plain = `Quote request\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || '-'}\nAddress: ${data.address || '-'}\nService: ${data.service}\nPreferred date: ${data.date || '-'}\n\nDetails:\n${data.details || '-'}\n`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(plain).catch(() => {});
    }
    alert('Your email app should open now. If not, we copied the request so you can paste it into an email to DukeAndSonsTreeTrimming@gmail.com.');
    form.reset();
  });
}

// Tiny, private "analytics" (demo) — just counts local visits
try {
  const k = 'duke_site_views';
  const n = Number(localStorage.getItem(k) || 0) + 1;
  localStorage.setItem(k, String(n));
} catch(_){}
