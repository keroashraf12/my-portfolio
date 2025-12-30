document.addEventListener('DOMContentLoaded', () => {
    
    AOS.init({
        duration: 800,
        offset: 50,
        once: true
    });

    const spotlights = document.querySelectorAll('.spotlight');
    document.addEventListener('mousemove', (e) => {
        spotlights.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(3, 7, 18, 0.9)';
            nav.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        } else {
            nav.style.background = 'rgba(3, 7, 18, 0.7)';
            nav.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
        }
    });

    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const projectBtns = document.querySelectorAll('.open-modal');
    const mTitle = document.getElementById('modal-title');
    const mDesc = document.getElementById('modal-desc');
    const mGithub = document.getElementById('modal-github');
    const mMainImg = document.getElementById('modal-main-img');
    const mGallery = document.getElementById('modal-gallery-grid');
    const mTags = document.getElementById('modal-tags');
 
    projectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            const github = btn.getAttribute('data-github');
            const mainImg = btn.getAttribute('data-image-main');
            const imagesRaw = btn.getAttribute('data-images');
            const tagsRaw = btn.getAttribute('data-tags');

            const images = imagesRaw ? imagesRaw.split(',') : [];
            const tags = tagsRaw ? tagsRaw.split(',') : [];

            mTitle.textContent = title;
            mDesc.textContent = desc;
            mGithub.href = github;
            mMainImg.src = mainImg;
            mTags.innerHTML = '';
            tags.forEach(tag => {
                const span = document.createElement('span');
                span.textContent = tag.trim();
                span.style.cssText = "font-size: 0.75rem; color: var(--secondary); background: rgba(16, 185, 129, 0.1); padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(16,185,129,0.2);";
                mTags.appendChild(span);
            });

            mGallery.innerHTML = '';
            const allImages = [mainImg, ...images]; 
            const uniqueImages = [...new Set(allImages)];

            uniqueImages.forEach(imgSrc => {
                if(imgSrc && imgSrc.trim() !== "") {
                    const img = document.createElement('img');
                    img.src = imgSrc.trim();
                    img.alt = "Project Screenshot";
                    
                    img.onclick = function() {
                        mMainImg.src = this.src;
                        document.querySelectorAll('.gallery-grid img').forEach(i => i.style.opacity = '0.6');
                        this.style.opacity = '1';
                    };
                    mGallery.appendChild(img);
                }
            });

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);

            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    };

    if(modalClose) modalClose.addEventListener('click', closeModal);

    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

});
