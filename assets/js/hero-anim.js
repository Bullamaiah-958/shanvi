document.addEventListener('DOMContentLoaded', function() {
  // Fade-up on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.tp-fade-anim').forEach(el => observer.observe(el));

  // Node hover glow
  document.querySelectorAll('.node-icon').forEach(node => {
    node.addEventListener('mouseenter', () => node.classList.add('is-hover'));
    node.addEventListener('mouseleave', () => node.classList.remove('is-hover'));
  });

  // gentle staggered entrance for automation nodes
  const automation = document.querySelector('.automation-flow');
  if (automation) {
    const steps = automation.querySelectorAll('.step');
    steps.forEach((s, i) => {
      s.style.transition = 'transform 0.6s cubic-bezier(.2,.9,.2,1), opacity 0.6s ease';
      s.style.transitionDelay = (i * 80) + 'ms';
      requestAnimationFrame(() => { s.style.opacity = 1; s.style.transform = 'translateY(0)'; });
    });
  }
});
