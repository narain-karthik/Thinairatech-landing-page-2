/**
 * Thinairatech - Interactive Cartoon Engine
 * Pure Vanilla JavaScript (Zero external dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initEyeTracking();
  initVehicleInteractions();
  initHeroInteractions();
  initGentleNatureBreeze();
});

/* ==========================================================================
   1. Eye Tracking (Sprout pupils watch cursor movement)
   ========================================================================== */
function initEyeTracking() {
  const sprout = document.getElementById('agri-character');
  if (!sprout) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  window.addEventListener('mousemove', (e) => {
    const rect = sprout.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height * 0.45;

    const deltaX = e.clientX - eyeCenterX;
    const deltaY = e.clientY - eyeCenterY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance > 0) {
      const maxDistance = 260;
      const factor = Math.min(distance / maxDistance, 1);
      const normX = (deltaX / distance) * factor;
      const normY = (deltaY / distance) * factor;

      document.documentElement.style.setProperty('--pupil-x', normX.toFixed(2));
      document.documentElement.style.setProperty('--pupil-y', normY.toFixed(2));
    }
  });

  window.addEventListener('mouseleave', () => {
    document.documentElement.style.setProperty('--pupil-x', '0');
    document.documentElement.style.setProperty('--pupil-y', '0');
  });
}

/* ==========================================================================
   2. Main Characters (Agri-Sprout & Cyber-Shield) Interactions
   ========================================================================== */
function initHeroInteractions() {
  const heroes = [
    { el: document.getElementById('agri-character'), type: 'agri' },
    { el: document.getElementById('cyber-character'), type: 'cyber' }
  ];

  heroes.forEach(({ el, type }) => {
    if (!el) return;

    function triggerReaction() {
      el.classList.remove('boing-jump');
      void el.offsetWidth; // Force CSS reflow
      el.classList.add('boing-jump');

      // Spawn colorful cartoon burst
      spawnParticleBurst(el, type);
    }

    el.addEventListener('click', triggerReaction);

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerReaction();
      }
    });

    el.addEventListener('animationend', (e) => {
      if (e.animationName === 'boingAction') {
        el.classList.remove('boing-jump');
      }
    });
  });
}

/* ==========================================================================
   3. Travel Vehicles (Train, Car, Bike, Plane) Click Interactions
   ========================================================================== */
function initVehicleInteractions() {
  const vehicles = [
    document.getElementById('traveler-plane'),
    document.getElementById('cartoon-train'),
    document.getElementById('cartoon-car'),
    document.getElementById('cartoon-bike')
  ];

  vehicles.forEach(vehicle => {
    if (!vehicle) return;

    vehicle.addEventListener('click', () => {
      // Funny bouncy hop
      vehicle.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
      vehicle.style.transform = `${vehicle.style.transform || ''} translateY(-16px) scale(1.15)`;

      setTimeout(() => {
        vehicle.style.transform = '';
      }, 250);

      spawnParticleBurst(vehicle, 'travel');
    });
  });
}

/* ==========================================================================
   4. Colorful Particle Sparkle Bursts (Lively Color Lines)
   ========================================================================== */
function spawnParticleBurst(element, theme) {
  const rect = element.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height * 0.4;

  let colors;
  if (theme === 'agri') {
    colors = ['#22c55e', '#facc15', '#f43f5e', '#38bdf8', '#ea580c'];
  } else if (theme === 'cyber') {
    colors = ['#06b6d4', '#8b5cf6', '#3b82f6', '#facc15', '#22c55e'];
  } else {
    // Travel colors
    colors = ['#ef4444', '#f59e0b', '#3b82f6', '#06b6d4', '#10b981'];
  }

  const particleCount = 6;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    const color = colors[i % colors.length];

    const angle = (Math.PI * 2 * (i / particleCount)) + (Math.random() - 0.5);
    const speed = Math.random() * 50 + 35;
    const destX = Math.cos(angle) * speed;
    const destY = Math.sin(angle) * speed - 15;

    Object.assign(p.style, {
      position: 'fixed',
      left: `${originX}px`,
      top: `${originY}px`,
      width: '10px',
      height: '10px',
      backgroundColor: color,
      borderRadius: i % 2 === 0 ? '50%' : '2px',
      boxShadow: `0 0 8px ${color}`,
      pointerEvents: 'none',
      zIndex: '99',
      transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease',
      transform: 'translate(-50%, -50%) scale(0.5)'
    });

    document.body.appendChild(p);

    requestAnimationFrame(() => {
      p.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${Math.random() * 360}deg) scale(1.1)`;
      p.style.opacity = '0';
    });

    setTimeout(() => {
      p.remove();
    }, 650);
  }
}

/* ==========================================================================
   5. Gentle Multi-colored Ambient Breeze
   ========================================================================== */
function initGentleNatureBreeze() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const driftColors = ['#86efac', '#67e8f9', '#fef08a', '#fbcfe8'];

  function spawnDriftingParticle() {
    const particle = document.createElement('div');
    const startY = Math.random() * (window.innerHeight * 0.65);
    const size = Math.random() * 7 + 6;
    const duration = Math.random() * 10 + 14;

    const chosenColor = driftColors[Math.floor(Math.random() * driftColors.length)];

    Object.assign(particle.style, {
      position: 'fixed',
      left: '-20px',
      top: `${startY}px`,
      width: `${size}px`,
      height: `${size * 1.3}px`,
      backgroundColor: chosenColor,
      borderRadius: '50% 0 50% 0',
      opacity: '0.45',
      pointerEvents: 'none',
      zIndex: '2',
      transition: `transform ${duration}s linear, top ${duration}s ease-in-out`
    });

    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      const endY = startY + (Math.random() - 0.5) * 120;
      particle.style.transform = `translateX(${window.innerWidth + 60}px) rotate(${Math.random() * 720}deg)`;
      particle.style.top = `${endY}px`;
    });

    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  setInterval(spawnDriftingParticle, 4000);
  spawnDriftingParticle();
}
