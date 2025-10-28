// TypeScript для математической страницы

interface FormulaCard {
    element: HTMLElement;
    category: string;
}

class MathFormulaPage {
    private themeButton: HTMLButtonElement | null;
    private cards: FormulaCard[];
    private isDarkTheme: boolean;

    constructor() {
        this.themeButton = document.getElementById('toggleTheme') as HTMLButtonElement;
        this.cards = [];
        this.isDarkTheme = true;
        this.init();
    }

    private init(): void {
        this.loadTheme();
        this.setupEventListeners();
        this.collectCards();
        this.animateCards();
    }

    private setupEventListeners(): void {
        if (this.themeButton) {
            this.themeButton.addEventListener('click', () => this.toggleTheme());
        }

        // Добавляем обработчики для карточек
        document.querySelectorAll('.formula-card').forEach((card) => {
            card.addEventListener('click', () => this.highlightCard(card as HTMLElement));
        });
    }

    private collectCards(): void {
        document.querySelectorAll('.formula-card').forEach((element) => {
            const category = element.getAttribute('data-category') || 'general';
            this.cards.push({
                element: element as HTMLElement,
                category: category
            });
        });
    }

    private toggleTheme(): void {
        this.isDarkTheme = !this.isDarkTheme;
        const body = document.body;
        
        if (this.isDarkTheme) {
            body.classList.remove('light-theme');
        } else {
            body.classList.add('light-theme');
        }
        
        this.saveTheme();
    }

    private saveTheme(): void {
        localStorage.setItem('mathTheme', this.isDarkTheme ? 'dark' : 'light');
    }

    private loadTheme(): void {
        const savedTheme = localStorage.getItem('mathTheme');
        if (savedTheme === 'light') {
            this.isDarkTheme = false;
            document.body.classList.add('light-theme');
        }
    }

    private highlightCard(card: HTMLElement): void {
        // Убираем подсветку со всех карточек
        document.querySelectorAll('.formula-card').forEach((c) => {
            c.classList.remove('active');
        });
        
        // Добавляем подсветку текущей карточке
        card.classList.add('active');
        
        // Копируем формулу в буфер обмена
        const formula = card.querySelector('.formula');
        if (formula) {
            const text = formula.textContent || '';
            this.copyToClipboard(text);
        }
    }

    private copyToClipboard(text: string): void {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Формула скопирована!');
            });
        }
    }

    private showNotification(message: string): void {
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

    private animateCards(): void {
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

    public getStatistics(): { total: number; byCategory: Record<string, number> } {
        const stats = {
            total: this.cards.length,
            byCategory: {} as Record<string, number>
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const page = new MathFormulaPage();
    
    // Добавляем анимации для стилей
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
    
    // Выводим статистику в консоль
    console.log('Статистика формул:', page.getStatistics());
});

