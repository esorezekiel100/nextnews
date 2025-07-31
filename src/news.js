// Enhance main and aside styling and add page-specific tweaks
document.addEventListener('DOMContentLoaded', function () {
    // Style <main> for all pages
    const main = document.querySelector('main');
    if (main) {
        main.classList.add(
            'bg-gradient-to-br', 'from-gray-50', 'to-blue-50',
            'rounded-xl', 'shadow-2xl', 'p-6', 'mb-8', 'mt-6'
        );
    }

    // Style <header> and make search responsive
    const header = document.querySelector('header');
    if (header) {
        header.classList.add(
            'bg-blue-900', 'text-white', 'p-6', 'flex', 'flex-col', 'md:flex-row',
            'justify-between', 'items-center', 'shadow-lg', 'border-b-4', 'border-blue-700'
        );
        // Style logo/title
        const logo = header.querySelector('.font-bold, .font-extrabold, .text-3xl, .text-4xl');
        if (logo) {
            logo.classList.add('text-4xl', 'font-extrabold', 'tracking-wide', 'drop-shadow-lg', 'flex', 'items-center', 'gap-3');
        }
        // Style search input and button
        const searchWrapper = header.querySelector('.flex.space-x-4');
        if (searchWrapper) {
            searchWrapper.classList.add('w-full', 'md:w-auto', 'mt-4', 'md:mt-0');
        }
        const input = header.querySelector('input[type="text"]');
        if (input) {
            input.classList.add(
                'p-2', 'rounded', 'text-black', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-400',
                'transition', 'w-full', 'md:w-64', 'max-w-xs'
            );
        }
        const button = header.querySelector('button');
        if (button) {
            button.classList.add('bg-blue-700', 'p-2', 'rounded', 'hover:bg-blue-400', 'font-semibold', 'transition', 'w-full', 'md:w-auto');
        }
    }

    // Add a large video slideshow to main if not present
    if (main && !document.getElementById('main-video-slideshow')) {
        const videos = [
            // News/Featured
            {
            src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            title: "Rick Astley - Never Gonna Give You Up"
            },
            {
            src: "https://www.youtube.com/embed/ScMzIvxBSi4",
            title: "Relaxing Nature Video"
            },
            {
            src: "https://www.youtube.com/embed/5qap5aO4i9A",
            title: "Lofi Hip Hop Radio"
            },
            // Entertainment
            {
            src: "https://www.youtube.com/embed/JGwWNGJdvx8",
            title: "Ed Sheeran - Shape of You [Official Video]"
            },
            {
            src: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
            title: "Mark Ronson - Uptown Funk ft. Bruno Mars"
            },
            {
            src: "https://www.youtube.com/embed/tVj0ZTS4WF4",
            title: "Katy Perry - Roar (Official)"
            }
        ];
        const slideshow = document.createElement('div');
        slideshow.id = 'main-video-slideshow';
        slideshow.className = 'w-full max-w-3xl mx-auto mb-8 relative rounded-xl overflow-hidden shadow-lg bg-black';

        slideshow.innerHTML = `
            <div id="video-slide-container" class="relative w-full h-72 md:h-96">
                ${videos.map((v, i) => `
                    <iframe
                        src="${v.src}"
                        title="${v.title}"
                        class="video-slide absolute top-0 left-0 w-full h-full rounded-xl transition-opacity duration-700 ${i === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        data-index="${i}"
                    ></iframe>
                `).join('')}
                <button id="video-prev" class="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-700 bg-opacity-80 text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-blue-500 z-20">&larr;</button>
                <button id="video-next" class="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 bg-opacity-80 text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-blue-500 z-20">&rarr;</button>
            </div>
            <div class="flex justify-center gap-2 mt-2">
                ${videos.map((_, i) => `<span class="video-dot w-3 h-3 rounded-full bg-blue-300 inline-block cursor-pointer ${i === 0 ? 'bg-blue-700' : ''}" data-index="${i}"></span>`).join('')}
            </div>
        `;
        main.prepend(slideshow);

        // Slideshow JS
        let current = 0;
        const slides = slideshow.querySelectorAll('.video-slide');
        const dots = slideshow.querySelectorAll('.video-dot');
        function showSlide(idx) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('opacity-100', i === idx);
                slide.classList.toggle('z-10', i === idx);
                slide.classList.toggle('opacity-0', i !== idx);
                slide.classList.toggle('z-0', i !== idx);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-blue-700', i === idx);
                dot.classList.toggle('bg-blue-300', i !== idx);
            });
            current = idx;
        }
        slideshow.querySelector('#video-prev').onclick = () => showSlide((current - 1 + slides.length) % slides.length);
        slideshow.querySelector('#video-next').onclick = () => showSlide((current + 1) % slides.length);
        dots.forEach(dot => {
            dot.onclick = () => showSlide(Number(dot.dataset.index));
        });
    }

    // Add a welcome/info banner just above the slideshow videos
    if (main && !document.getElementById('main-info-banner')) {
        const infoBanner = document.createElement('div');
        infoBanner.id = 'main-info-banner';
        infoBanner.className = 'mb-6 p-4 rounded-lg bg-blue-100 border-l-4 border-blue-400 flex items-center gap-4 shadow';
        infoBanner.innerHTML = `
            <svg class="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"/>
            </svg>
            <span class="text-blue-900 font-medium">
                Welcome to News 24x7! Stay updated with the latest articles, features, and multimedia content. Explore trending topics and enjoy a modern, interactive news experience.
            </span>
        `;
        // Insert the banner just before the slideshow
        const slideshow = document.getElementById('main-video-slideshow');
        if (slideshow) {
            slideshow.insertAdjacentElement('beforebegin', infoBanner);
        } else {
            main.prepend(infoBanner);
        }
    }

    // Add a subtle hover effect to all article cards inside main
    if (main) {
        const cards = main.querySelectorAll('.shadow, .bg-white, .bg-gray-50');
        cards.forEach(card => {
            card.classList.add(
                'transition', 'duration-300', 'hover:scale-[1.02]', 'hover:shadow-blue-200'
            );
        });
    }

    // Add a border and padding to all images in main
    if (main) {
        const imgs = main.querySelectorAll('img');
        imgs.forEach(img => {
            img.classList.add('border', 'border-blue-100', 'p-1', 'bg-white');
        });
    }

    // Add a "Back to Top" button at the bottom of main
    if (main && !document.getElementById('main-back-to-top')) {
        const backToTop = document.createElement('button');
        backToTop.id = 'main-back-to-top';
        backToTop.innerHTML = '↑ Back to Top';
        backToTop.className = 'fixed bottom-24 right-8 bg-blue-700 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-500 transition z-50';
        backToTop.style.display = 'none';
        document.body.appendChild(backToTop);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Style <aside> for all pages
    const aside = document.querySelector('aside');
    if (aside) {
        aside.classList.add(
            'rounded-xl', 'shadow-xl', 'bg-gradient-to-b', 'from-blue-50', 'to-white', 'border', 'border-blue-100'
        );
        // Style menu headers
        aside.querySelectorAll('h2').forEach(h2 => {
            h2.classList.add('text-blue-900', 'tracking-wide', 'mb-2', 'shadow', 'bg-blue-100', 'border-l-4', 'border-blue-400');
        });
        // Style menu links
        aside.querySelectorAll('a').forEach(a => {
            a.classList.add('transition', 'duration-200', 'hover:bg-blue-200', 'hover:text-blue-900');
        });
        // Style images in aside
        aside.querySelectorAll('img').forEach(img => {
            img.classList.add('border', 'border-blue-200', 'rounded', 'shadow', 'mb-2');
        });
        // Add padding and spacing to post blocks
        aside.querySelectorAll('.mb-4').forEach(div => {
            div.classList.add('p-2', 'bg-white', 'rounded', 'shadow-sm');
        });
    }

    // Add articles section below the video slideshow in main
    if (main && !document.getElementById('main-articles-section')) {
        const articlesSection = document.createElement('section');
        articlesSection.id = 'main-articles-section';
        articlesSection.className = 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10';

        // Example articles (with web images)
        const articles = [
            {
                img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
                title: 'Exploring the Swiss Alps: A Journey Through Nature',
                date: 'June 10, 2025',
                desc: 'Discover the breathtaking beauty of the Swiss Alps, from snow-capped peaks to lush green valleys. Our travel team shares their favorite routes and hidden gems.'
            },
            {
                img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
                title: 'The Rise of AI in Everyday Life',
                date: 'June 8, 2025',
                desc: 'Artificial Intelligence is transforming how we live and work. Explore the latest trends, innovations, and ethical debates shaping our future.'
            },
            {
                img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
                title: 'Healthy Living: Tips from Top Nutritionists',
                date: 'June 5, 2025',
                desc: 'Leading nutritionists share their best advice for a balanced diet, staying active, and maintaining mental wellness in a busy world.'
            },
            {
                img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
                title: 'Music That Moves the World',
                date: 'June 2, 2025',
                desc: 'From classical to contemporary, discover how music continues to inspire, unite, and energize people across the globe.'
            }
        ];

        articlesSection.innerHTML = articles.map(article => `
            <article class="bg-white rounded-xl shadow-md p-5 flex flex-col hover:shadow-blue-200 transition duration-300">
                <img src="${article.img}" alt="${article.title}" class="w-full h-48 object-cover rounded mb-4 border border-blue-100 bg-white">
                <h2 class="text-2xl font-bold text-blue-900 mb-2">${article.title}</h2>
                <span class="text-gray-500 text-sm mb-2">${article.date}</span>
                <p class="text-gray-700 mb-4">${article.desc}</p>
                <a href="#" class="text-blue-700 font-semibold hover:underline mt-auto">Read More &rarr;</a>
            </article>
        `).join('');

        // Insert after the video slideshow
        const slideshow = document.getElementById('main-video-slideshow');
        if (slideshow) {
            slideshow.insertAdjacentElement('afterend', articlesSection);
        } else {
            main.appendChild(articlesSection);
        }
    }

    // Add at least 3 sport news to aside with online images
    if (aside && document.getElementById('latestPosts')) {
        const sportNews = [
            { 
            img: 'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&w=400&q=80',
            title: 'Champions League Final: Dramatic Finish',
            date: 'JUN 1, 2025'
            },
            {
            img: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&w=400&q=80',
            title: 'Olympics 2025: New Records Set',
            date: 'JUN 5, 2025'
            },
            {
            img: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&w=400&q=80',
            title: 'NBA Finals: Historic Game 7',
            date: 'JUN 10, 2025'
            }
        ];
        const latestPostsDiv = document.getElementById('latestPosts');
        sportNews.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'mb-4';
            postDiv.innerHTML = `
                <img src="${post.img}" alt="Sport News" class="w-full h-40 object-cover rounded">
                <p class="mt-2">${post.title}</p>
                <span class="text-gray-500 text-sm">${post.date}</span>
            `;
            latestPostsDiv.appendChild(postDiv);
        });
    }

    // Style <footer> to be creative and beautiful
    const footer = document.querySelector('footer');
    if (footer) {
        footer.classList.add(
            'bg-gradient-to-r', 'from-blue-900', 'to-blue-500', 'text-white', 'py-8', 'px-4',
            'flex', 'flex-col', 'md:flex-row', 'justify-between', 'items-center', 'mt-10', 'shadow-inner', 'relative'
        );

        // Add a decorative SVG wave at the top of the footer
        if (!document.getElementById('footer-wave')) {
            const wave = document.createElement('div');
            wave.id = 'footer-wave';
            wave.innerHTML = `
                <svg class="absolute top-0 left-0 w-full" height="40" viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="z-index:1;">
                  <path d="M0,40 C480,0 960,80 1440,40 L1440,0 L0,0 Z" fill="#2563eb" fill-opacity="0.7"/>
                </svg>
            `;
            wave.style.width = '100%';
            wave.style.position = 'absolute';
            wave.style.top = '-40px';
            wave.style.left = '0';
            wave.style.zIndex = '2';
            footer.prepend(wave);
        }

        // Add creative content if not already present
        if (!footer.querySelector('.footer-content')) {
            const content = document.createElement('div');
            content.className = 'footer-content w-full flex flex-col md:flex-row justify-between items-center z-10';
            content.innerHTML = `
                <div class="flex items-center gap-3 mb-4 md:mb-0">
                    <img src="./assets/img/icon/fb.jpeg" alt="Logo" class="w-10 h-10 rounded-full border-2 border-white shadow-md">
                    <span class="font-extrabold text-2xl tracking-wider drop-shadow">NEWS 24x7</span>
                </div>
                <div class="flex gap-6 mb-4 md:mb-0">
                    <a href="https://facebook.com" target="_blank" class="hover:text-blue-300 transition"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12"></path></svg></a>
                    <a href="https://twitter.com" target="_blank" class="hover:text-blue-300 transition"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.19 1.64 4.15c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62a4.28 4.28 0 0 1-1.94-.54v.05c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.38-.02-.57A8.72 8.72 0 0 0 24 4.59a8.51 8.51 0 0 1-2.54.7z"></path></svg></a>
                    <a href="https://instagram.com" target="_blank" class="hover:text-blue-300 transition"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41a4.92 4.92 0 0 1 1.77 1.01 4.92 4.92 0 0 1 1.01 1.77c.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43a4.92 4.92 0 0 1-1.01 1.77 4.92 4.92 0 0 1-1.77 1.01c-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41a4.92 4.92 0 0 1-1.77-1.01 4.92 4.92 0 0 1-1.01-1.77c-.17-.46-.354-1.26-.41-2.43C2.212 15.634 2.2 15.25 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43a4.92 4.92 0 0 1 1.01-1.77 4.92 4.92 0 0 1 1.77-1.01c.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07c-1.276.058-2.15.25-2.91.53a6.92 6.92 0 0 0-2.5 1.64A6.92 6.92 0 0 0 .6 4.142c-.28.76-.472 1.634-.53 2.91C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.276.25 2.15.53 2.91a6.92 6.92 0 0 0 1.64 2.5 6.92 6.92 0 0 0 2.5 1.64c.76.28 1.634.472 2.91.53C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.276-.058 2.15-.25 2.91-.53a6.92 6.92 0 0 0 2.5-1.64 6.92 6.92 0 0 0 1.64-2.5c.28-.76.472-1.634.53-2.91.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.276-.25-2.15-.53-2.91a6.92 6.92 0 0 0-1.64-2.5A6.92 6.92 0 0 0 19.858.6c-.76-.28-1.634-.472-2.91-.53C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg></a>
                </div>
                <div class="text-center md:text-right text-blue-100 text-sm mt-4 md:mt-0">
                    &copy; ${new Date().getFullYear()} News 24x7. All rights reserved.<br>
                    <span class="italic">Made with <span class="text-pink-400">♥</span> for news lovers.</span>
                </div>
            `;
            footer.innerHTML = '';
            footer.appendChild(content);
        }
    }

    // Style <nav> with a modern glassmorphism effect and animated underline
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.add(
            'backdrop-blur-md', 'bg-white', 'bg-opacity-30', 'shadow-xl', 'p-4',
            'flex', 'justify-around', 'fixed', 'bottom-0', 'w-full', 'z-30', 'rounded-t-2xl', 'border-t', 'border-blue-200'
        );
        // Style nav links
        nav.querySelectorAll('a').forEach(link => {
            link.classList.add(
                'relative', 'text-white', 'font-bold', 'px-4', 'py-2', 'rounded-xl', 'transition-all', 'duration-300',
                'hover:bg-blue-100', 'hover:text-blue-800', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-400'
            );
            // Animated underline effect
            if (!link.querySelector('.nav-underline')) {
                const underline = document.createElement('span');
                underline.className = 'nav-underline absolute left-1/2 -translate-x-1/2 bottom-1 h-1 w-0 bg-blue-600 rounded transition-all duration-300';
                link.appendChild(underline);
                link.addEventListener('mouseenter', () => {
                    underline.style.width = '70%';
                });
                link.addEventListener('mouseleave', () => {
                    underline.style.width = '0';
                });
            }
        });

        // Add floating up effect on scroll up, hide on scroll down
        let lastScroll = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScroll) {
                nav.classList.add('translate-y-24', 'opacity-60');
            } else {
                nav.classList.remove('translate-y-24', 'opacity-60');
            }
            lastScroll = window.scrollY;
        });
    }

});