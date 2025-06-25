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
            console.log('🚀 Starting Challenge App initialization...');
            
            // Hiển thị ngày hiện tại
            this.displayCurrentDate();

            // Đăng ký các thử thách
            await this.registerChallenges();
            console.log(`📦 Registered ${this.challenges.size} challenges:`, Array.from(this.challenges.keys()));

            // Khởi tạo menu (buttons đã có sẵn trong HTML)
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
        // Lấy danh sách thử thách từ config
        const enabledChallenges = window.ChallengeConfig ? 
            window.ChallengeConfig.getEnabledChallenges() : 
            {
                'pattern': { className: 'PatternChallenge' },
                'math': { className: 'MathChallenge' },
                'queue': { className: 'QueueChallenge' }
            };

        // Đăng ký từng thử thách
        for (const [type, config] of Object.entries(enabledChallenges)) {
            const className = config.className;
            if (window[className]) {
                this.challenges.set(type, new window[className]());
                console.log(`✅ Registered ${type} challenge`);
            } else {
                console.warn(`⚠️ Challenge class ${className} not found for type ${type}`);
            }
        }

        // Khởi tạo tất cả thử thách
        for (const [type, challenge] of this.challenges) {
            try {
                await challenge.init();
            } catch (error) {
                console.error(`❌ Failed to initialize ${type} challenge:`, error);
            }
        }
    }

    /**
     * Khởi tạo menu
     */
    initializeMenu() {
        // Menu buttons đã có onclick handlers trong HTML
        // Chỉ cần đảm bảo app instance có thể truy cập được
        console.log('📋 Menu initialized - buttons ready in HTML');
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
            
            // Kiểm tra onclick attribute để xác định loại challenge
            const onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes(`'${activeType}'`)) {
                btn.classList.add('active');
            }
        });
        console.log(`🎯 Menu state updated - active: ${activeType}`);
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
