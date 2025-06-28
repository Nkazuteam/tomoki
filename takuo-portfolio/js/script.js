// ナビゲーションの動作
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// スクロール時のナビゲーション背景
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 数学記号のランダム生成と動き
function createMathSymbol() {
    const symbols = ['∫', '∑', 'π', '∞', '√', '∂', '∇', 'Δ', 'θ', 'λ'];
    const symbolsContainer = document.querySelector('.math-symbols');
    
    if (symbolsContainer) {
        const symbol = document.createElement('span');
        symbol.className = 'floating-symbol';
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.left = Math.random() * 100 + '%';
        symbol.style.animationDuration = (Math.random() * 10 + 10) + 's';
        symbol.style.fontSize = (Math.random() * 2 + 2) + 'rem';
        symbol.style.animationDelay = Math.random() * 5 + 's';
        
        symbolsContainer.appendChild(symbol);
        
        // 要素が画面外に出たら削除
        setTimeout(() => {
            symbol.remove();
        }, 20000);
    }
}

// 定期的に新しい記号を生成
setInterval(createMathSymbol, 3000);

// アニメーション on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.querySelectorAll('.course-card, .material-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// フォーム送信処理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // ここで実際の送信処理を行う（現在はアラート表示のみ）
        alert('お問い合わせありがとうございます。\n後日返信させていただきます。');
        
        // フォームをリセット
        contactForm.reset();
    });
}

// タイピングアニメーション
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ページ読み込み時のアニメーション
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'fadeInUp 1s ease';
        }, 300);
    }
});

// 数値カウントアップアニメーション
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current + '+';
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// 統計数値のアニメーション
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = entry.target;
            const value = parseInt(target.textContent);
            
            if (!isNaN(value)) {
                animateValue(target, 0, value, 2000);
                target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// パララックス効果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// アニメーション用のCSS追加
const style = document.createElement('style');
style.textContent = `
    .floating-symbol {
        position: absolute;
        color: rgba(255,255,255,0.1);
        animation: float linear infinite;
        font-family: 'Times New Roman', serif;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);