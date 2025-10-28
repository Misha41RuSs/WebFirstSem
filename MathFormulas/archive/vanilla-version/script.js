// JavaScript версия (скомпилированная из TypeScript)

class MathFormulaPage {
    constructor() {
        this.themeButton = document.getElementById('toggleTheme');
        this.cards = [];
        this.isDarkTheme = true;
        this.init();
    }

    init() {
        this.loadTheme();
        this.setupEventListeners();
        this.collectCards();
        this.animateCards();
    }

    setupEventListeners() {
        if (this.themeButton) {
            this.themeButton.addEventListener('click', () => this.toggleTheme());
        }

        document.querySelectorAll('.formula-card').forEach((card) => {
            card.addEventListener('click', () => this.highlightCard(card));
        });
    }

    collectCards() {
        document.querySelectorAll('.formula-card').forEach((element) => {
            const category = element.getAttribute('data-category') || 'general';
            this.cards.push({
                element: element,
                category: category
            });
        });
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        const body = document.body;
        
        if (this.isDarkTheme) {
            body.classList.remove('light-theme');
        } else {
            body.classList.add('light-theme');
        }
        
        this.saveTheme();
    }

    saveTheme() {
        localStorage.setItem('mathTheme', this.isDarkTheme ? 'dark' : 'light');
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('mathTheme');
        if (savedTheme === 'light') {
            this.isDarkTheme = false;
            document.body.classList.add('light-theme');
        }
    }

    highlightCard(card) {
        document.querySelectorAll('.formula-card').forEach((c) => {
            c.classList.remove('active');
        });
        
        card.classList.add('active');
        
        const formula = card.querySelector('.formula');
        if (formula) {
            const text = formula.textContent || '';
            this.copyToClipboard(text);
        }
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Формула скопирована!');
            });
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #3b82f6, #f59e0b);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    animateCards() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });

        this.cards.forEach(card => {
            observer.observe(card.element);
        });
    }

    getStatistics() {
        const stats = {
            total: this.cards.length,
            byCategory: {}
        };

        this.cards.forEach(card => {
            if (!stats.byCategory[card.category]) {
                stats.byCategory[card.category] = 0;
            }
            stats.byCategory[card.category]++;
        });

        return stats;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const page = new MathFormulaPage();
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .formula-card.active {
            border-color: #f59e0b !important;
            box-shadow: 0 0 30px rgba(245, 158, 11, 0.5) !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Статистика формул:', page.getStatistics());
});

