/* ---------- Thème clair / sombre ---------- */
const root = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const knobIcon = document.getElementById('knobIcon');

function applyTheme(theme){
  root.setAttribute('data-bs-theme', theme);
  knobIcon.className = theme === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
}
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(prefersDark ? 'dark' : 'light');

toggleBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-bs-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ---------- Navbar au scroll ---------- */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- Compétences ---------- */
const skills = [
  ["Flutter","bi-phone"], ["React Native","bi-phone-vibrate"], ["Next.js","bi-window-stack"],
  ["TypeScript","bi-code-slash"], ["Node.js","bi-diagram-3"], ["Supabase","bi-database"],
  ["Firebase","bi-fire"], ["PostgreSQL","bi-server"], ["Docker","bi-box-seam"],
  ["Python","bi-braces"], ["Java","bi-cup-hot"], ["Cybersécurité","bi-shield-lock"]
];
document.getElementById('skills-wrap').innerHTML = skills.map(([name,icon]) =>
  `<span class="skill-pill"><i class="bi ${icon}"></i>${name}</span>`
).join('');

/* ---------- Projets ---------- */
const projects = [
  { name:"APAD Environnement", desc:"Association pour les actions durables. Formation environnementale, accompagnement de projets durables et EIE.", tags:["Web","Environnement"], link:"https://apadsite.com/", label:"Voir le projet" },
  { name:"ValidateMe.app", desc:"Application web pour la validation et la vérification de données. Projet en cours de développement.", tags:["Fullstack","Web"], link:"https://valideme.app", label:"Voir le projet" },
  { name:"Sqilco.com", desc:"Développement front-end pour le site Sqilco — expérience sur le développement web moderne.", tags:["Frontend","Web"], link:"https://sqilco.com", label:"Voir le projet" },
  { name:"Orbit Post", desc:"Réseau social conçu et développé en solo. 165 utilisateurs actifs à ce jour.", tags:["React Native","Expo"], link:"http://orbitpost.vercel.app/", label:"Voir le projet", maintenance:true },
  { name:"Logiciel d'Optimisation", desc:"Logiciel d'optimisation de machines industrielles. Projet en cours.", tags:["Desktop"], soon:true },
  { name:"NextCom S.A", desc:"Site web pour NextCom S.A. — application moderne, interface élégante et performante.", tags:["Fullstack","Web"], link:"https://nextcom-r7pv.vercel.app/", label:"Voir le projet" },
  { name:"Scrapping Telegram Stickers", desc:"Algorithme de scrapping pour télécharger automatiquement les autocollants Telegram.", tags:["Python"], link:"https://github.com/ralph123dev/scrapping", label:"Voir sur GitHub" }
];
document.getElementById('projects-grid').innerHTML = projects.map(p => `
  <div class="col-md-6 col-lg-4 reveal">
    <div class="card-soft h-100 p-4 d-flex flex-column">
      <h3 class="h5 font-display mb-2">${p.name}</h3>
      <p class="text-muted-2 small flex-grow-1">${p.desc}</p>
      <div class="d-flex flex-wrap gap-2 mb-3">${p.tags.map(t=>`<span class="proj-tag">${t}</span>`).join('')}</div>
      ${p.soon
        ? `<span class="text-muted-2 small fw-semibold">Bientôt disponible</span>`
        : p.maintenance
          ? `<div class="d-flex gap-3">
               <a href="${p.link}" target="_blank" class="proj-link">${p.label} <i class="bi bi-arrow-right"></i></a>
               <a href="#" class="proj-link" data-bs-toggle="modal" data-bs-target="#modalMaintenance">App <i class="bi bi-arrow-right"></i></a>
             </div>`
          : `<a href="${p.link}" target="_blank" class="proj-link">${p.label} <i class="bi bi-arrow-right"></i></a>`
      }
    </div>
  </div>
`).join('');
document.querySelectorAll('#projects-grid .reveal').forEach(el => io.observe(el));

/* ---------- Formulaire ---------- */
document.getElementById('formProjet').addEventListener('submit', async function(e){
  e.preventDefault();
  const form = this;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton ? submitButton.textContent : '';

  // Disable button
  if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Envoi...'; }

  try {
    const formData = new FormData(form);
    const resp = await fetch('https://formspree.io/f/mpzgqwpy', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (resp.ok) {
      bootstrap.Modal.getOrCreateInstance(document.getElementById('modalProjet')).hide();
      setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(document.getElementById('modalSucces')).show();
        form.reset();
      }, 300);
    } else {
      const errorData = await resp.json().catch(()=>null);
      console.error('Formspree error', errorData);
      alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    }
  } catch (err) {
    console.error('Submission error', err);
    alert('Impossible d\'envoyer le formulaire pour le moment.');
  } finally {
    if (submitButton) { submitButton.disabled = false; submitButton.textContent = originalText; }
  }
});
