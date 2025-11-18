// Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form submission with email integration
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const business = document.getElementById('business').value;
                const businessType = document.getElementById('business-type').value;
                const message = document.getElementById('message').value;
                
                // Prepare email content
                const subject = `New CaawiyeBot Trial Request from ${name}`;
                const body = `
Name: ${name}
Email: ${email}
Business: ${business}
Business Type: ${businessType}
Message: ${message}

This is a new free trial request from the CaawiyeBot landing page.
                `;
                
                // Create mailto link (in a real application, you would use a server-side solution)
                const mailtoLink = `mailto:youremail@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success message
                successMessage.style.display = 'block';
                
                // Reset form after a delay
                setTimeout(() => {
                    this.reset();
                    successMessage.style.display = 'none';
                }, 5000);
            });
        }

        // Add scroll effect to navbar
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
                navbar.style.background = 'rgba(255, 255, 255, 0.97)';
            }
        });

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.step, .feature-card, .pricing-card, .benefit, .demo-card, .testimonial-card');
            
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(el);
            });
        });

        // Testimonial auto-scroll
        let testimonialIndex = 0;
        const testimonialCards = document.querySelector('.testimonial-cards');

        function scrollTestimonials() {
            if (testimonialCards) {
                testimonialIndex++;
                if (testimonialIndex >= testimonialCards.children.length) {
                    testimonialIndex = 0;
                }
                
                testimonialCards.scrollTo({
                    left: testimonialCards.children[testimonialIndex].offsetLeft - testimonialCards.offsetLeft,
                    behavior: 'smooth'
                });
                
                setTimeout(scrollTestimonials, 5000);
            }
        }

        // Start auto-scroll after page load
        window.addEventListener('load', () => {
            setTimeout(scrollTestimonials, 5000);
        });