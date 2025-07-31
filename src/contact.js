// Creative and interactive contact page enhancements
document.addEventListener('DOMContentLoaded', function () {
    // Animate the contact form on load
    const form = document.querySelector('form');
    if (form) {
        form.classList.add('transition', 'duration-700', 'opacity-0', 'translate-y-8');
        setTimeout(() => {
            form.classList.remove('opacity-0', 'translate-y-8');
            form.classList.add('opacity-100', 'translate-y-0');
        }, 200);
    }

    // Add floating labels to inputs
    const inputs = document.querySelectorAll('form input, form textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.previousElementSibling?.classList.add('text-blue-700', 'font-bold');
        });
        input.addEventListener('blur', function () {
            if (!this.value) {
                this.previousElementSibling?.classList.remove('text-blue-700', 'font-bold');
            }
        });
    });

    // Fun emoji feedback on submit
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending <span class="animate-spin">🚀</span>';
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
                showSuccessMessage();
            }, 1800);
        });
    }

    // Show a creative success message
    function showSuccessMessage() {
        let msg = document.getElementById('contact-success');
        if (!msg) {
            msg = document.createElement('div');
            msg.id = 'contact-success';
            msg.className = 'fixed top-8 right-8 bg-green-100 border-l-4 border-green-500 text-green-900 px-6 py-4 rounded shadow-lg flex items-center gap-3 z-50 animate-bounce-in';
            msg.innerHTML = `
                <span class="text-2xl">✅</span>
                <span class="font-semibold">Thank you! Your message has been sent.</span>
            `;
            document.body.appendChild(msg);
            setTimeout(() => {
                msg.classList.add('opacity-0');
                setTimeout(() => msg.remove(), 600);
            }, 2500);
        }
    }

    // Add a little animation for the contact info section if present
    const contactInfo = document.getElementById('contact-info');
    if (contactInfo) {
        contactInfo.classList.add('transition', 'duration-700', 'scale-95', 'opacity-0');
        setTimeout(() => {
            contactInfo.classList.remove('scale-95', 'opacity-0');
            contactInfo.classList.add('scale-100', 'opacity-100');
        }, 400);
    }

    // Add a fun interactive background effect (bubbles)
    createBubbles();

    function createBubbles() {
        const bubbleContainer = document.createElement('div');
        bubbleContainer.style.position = 'fixed';
        bubbleContainer.style.left = 0;
        bubbleContainer.style.top = 0;
        bubbleContainer.style.width = '100vw';
        bubbleContainer.style.height = '100vh';
        bubbleContainer.style.pointerEvents = 'none';
        bubbleContainer.style.zIndex = 1;
        document.body.appendChild(bubbleContainer);

        for (let i = 0; i < 18; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            const size = Math.random() * 40 + 20;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.position = 'absolute';
            bubble.style.left = `${Math.random() * 100}vw`;
            bubble.style.top = `${Math.random() * 100}vh`;
            bubble.style.background = 'rgba(59,130,246,0.15)';
            bubble.style.borderRadius = '50%';
            bubble.style.zIndex = 1;
            bubble.style.animation = `bubbleFloat ${4 + Math.random() * 6}s infinite ease-in-out`;
            bubbleContainer.appendChild(bubble);
        }

        // Add keyframes for bubble animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes bubbleFloat {
                0% { transform: translateY(0) scale(1);}
                50% { transform: translateY(-40px) scale(1.1);}
                100% { transform: