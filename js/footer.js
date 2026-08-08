document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('site-footer-placeholder');
  if (!placeholder) return;

  placeholder.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand">
            <svg class="brand-logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="lgFoot" x1="0" y1="0" x2="48" y2="48"><stop offset="0" stop-color="#5b4bf0"/><stop offset="1" stop-color="#c65cf0"/></linearGradient></defs>
              <rect width="48" height="48" rx="12" fill="#10132049"/>
              <path d="M9 34 L20 12 L24 20 L14 34 Z" fill="url(#lgFoot)"/>
              <path d="M39 12 L28 34 L24 26 L34 12 Z" fill="url(#lgFoot)"/>
            </svg>
            <span class="brand-name">AnotaVision</span>
          </a>
          <p>High-quality, accurate and scalable data annotation services to power AI, ML and computer vision solutions.</p>
          <div class="footer-socials">
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.5 8h4V23h-4V8zM8.5 8h3.8v2h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.66 1.8-2.66 3.65V23h-4V8z"/></svg></a>
            <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 4.9c-.8.4-1.7.6-2.6.8a4.5 4.5 0 002-2.5c-.9.5-1.9.9-3 1.1a4.5 4.5 0 00-7.6 4.1A12.8 12.8 0 011.6 3.6a4.5 4.5 0 001.4 6 4.5 4.5 0 01-2-.6v.1c0 2.2 1.6 4 3.7 4.4a4.5 4.5 0 01-2 .1 4.5 4.5 0 004.2 3.1A9 9 0 010 19.6a12.8 12.8 0 006.9 2c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.4 2.3-2.3z"/></svg></a>
            <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z"/></svg></a>
            <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.6-.5-5.3c-.3-1-1-1.8-2-2C18.9 4.2 12 4.2 12 4.2s-6.9 0-8.5.5c-1 .2-1.7 1-2 2C1 8.4 1 12 1 12s0 3.6.5 5.3c.3 1 1 1.7 2 2 1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5c1-.3 1.7-1 2-2 .5-1.7.5-5.3.5-5.3zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg></a>
          </div>
        </div>

        <div class="footer-col">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="team.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="services.html#image-annotation">Image Annotation</a></li>
            <li><a href="services.html#video-annotation">Video Annotation</a></li>
            <li><a href="services.html#text-annotation">Text Annotation</a></li>
            <li><a href="services.html#audio-annotation">Audio Annotation</a></li>
            <li><a href="services.html#custom-annotation">Custom Annotation</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Resources</h5>
          <ul>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
            <li><a href="privacy-policy.html#terms">Terms of Service</a></li>
            <li><a href="contact.html">FAQ</a></li>
            <li><a href="portfolio.html">Case Studies</a></li>
            <li><a href="contact.html">Get in Touch</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} AnotaVision. All rights reserved.</span>
        <span>
          <a href="privacy-policy.html">Privacy Policy</a>
          <a href="privacy-policy.html#terms">Terms of Service</a>
        </span>
      </div>
    </div>
  `;
});