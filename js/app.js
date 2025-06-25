/**
 * Main Application Controller
 * Quản lý toàn bộ ứng dụng và điều phối giữa các thử thách
 */

class ChallengeApp {
    constructor() {
        this.challenges = new Map();
        this.currentChallengeType = 'pattern';
        this.initialized = false;
    }

    /**
     * Khởi tạo ứng dụng
     */
    async init() {
        if (this.initialized) return;

        try {
            // Hiển thị ngày hiện tại
            this.displayCurrentDate();

            // Khởi tạo template manager
            this.templateManager = new TemplateManager();

            // Đăng ký các thử thách
            await this.registerChallenges();

            // Tạo menu động
            this.templateManager.generateMenuButtons(this.challenges);

            // Khởi tạo menu
            this.initializeMenu();

            // Bắt đầu với thử thách mặc định
            this.switchChallenge('pattern');

            this.initialized = true;
            console.log('✅ Challenge App initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Challenge App:', error);
        }
    }

    /**
     * Đăng ký các loại thử thách
     */
    async registerChallenges() {
        // Đăng ký thử thách hình dạng
        if (window.PatternChallenge) {
            this.challenges.set('pattern', new PatternChallenge());
        }

        // Đăng ký thử thách tính toán
        if (window.MathChallenge) {
            this.challenges.set('math', new MathChallenge());
        }

        // Khởi tạo tất cả thử thách
        for (const [type, challenge] of this.challenges) {
            await challenge.init();
        }
    }

    /**
     * Khởi tạo menu
     */
    initializeMenu() {
        const menuButtons = document.querySelectorAll('.menu-btn');
        menuButtons.forEach(btn => {
            const challengeType = btn.getAttribute('onclick')?.match(/switchChallenge\('(\w+)'\)/)?.[1];
            if (challengeType) {
                btn.onclick = () => this.switchChallenge(challengeType);
            }
        });
    }

    /**
     * Chuyển đổi giữa các loại thử thách
     */
    switchChallenge(type) {
        if (!this.challenges.has(type)) {
            console.warn(`Challenge type "${type}" not found`);
            return;
        }

        // Ẩn tất cả thử thách
        this.challenges.forEach((challenge, challengeType) => {
            challenge.hide();
        });

        // Cập nhật trạng thái menu
        this.updateMenuState(type);

        // Hiển thị thử thách được chọn
        const selectedChallenge = this.challenges.get(type);
        selectedChallenge.show();

        this.currentChallengeType = type;
    }

    /**
     * Cập nhật trạng thái menu
     */
    updateMenuState(activeType) {
        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.classList.remove('active');
            const challengeType = btn.getAttribute('onclick')?.match(/switchChallenge\('(\w+)'\)/)?.[1];
            if (challengeType === activeType) {
                btn.classList.add('active');
            }
        });
    }

    /**
     * Hiển thị ngày hiện tại
     */
    displayCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('vi-VN', options);
        }
    }

    /**
     * Lấy thử thách hiện tại
     */
    getCurrentChallenge() {
        return this.challenges.get(this.currentChallengeType);
    }
}

// Khởi tạo ứng dụng khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', async () => {
    window.challengeApp = new ChallengeApp();
    await window.challengeApp.init();
});

// Export cho các module khác sử dụng
window.ChallengeApp = ChallengeApp;
