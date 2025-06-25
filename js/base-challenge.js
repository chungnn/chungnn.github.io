/**
 * Base Challenge Class
 * Lớp cơ sở cho tất cả các loại thử thách
 */

class BaseChallenge {
    constructor(type, containerId) {
        this.type = type;
        this.containerId = containerId;
        this.currentIndex = 0;
        this.data = [];
        this.isVisible = false;
    }

    /**
     * Khởi tạo thử thách
     */
    async init() {
        await this.loadData();
        this.setupEventListeners();
        console.log(`✅ ${this.type} challenge initialized`);
    }

    /**
     * Tải dữ liệu thử thách - override trong subclass
     */
    async loadData() {
        throw new Error('loadData() must be implemented in subclass');
    }

    /**
     * Thiết lập event listeners
     */
    setupEventListeners() {
        // Override trong subclass nếu cần
    }

    /**
     * Hiển thị thử thách
     */
    show() {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.style.display = 'block';
            this.isVisible = true;
            this.generateChallenge();
        }
    }

    /**
     * Ẩn thử thách
     */
    hide() {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.style.display = 'none';
            this.isVisible = false;
        }
    }

    /**
     * Tạo thử thách mới
     */
    generateNewChallenge() {
        this.currentIndex = (this.currentIndex + 1) % this.data.length;
        this.generateChallenge();
        this.clearResult();
    }

    /**
     * Tạo thử thách - override trong subclass
     */
    generateChallenge() {
        throw new Error('generateChallenge() must be implemented in subclass');
    }

    /**
     * Xóa kết quả - override trong subclass
     */
    clearResult() {
        throw new Error('clearResult() must be implemented in subclass');
    }

    /**
     * Kiểm tra đáp án - override trong subclass
     */
    checkAnswer(selectedAnswer, correctAnswer) {
        throw new Error('checkAnswer() must be implemented in subclass');
    }

    /**
     * Cập nhật kịch bản cho bố mẹ
     */
    updateParentScript(script) {
        const scriptElement = document.getElementById('parent-script');
        if (scriptElement) {
            scriptElement.textContent = script;
        }
    }

    /**
     * Tạo hiệu ứng pháo hoa
     */
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                confetti.style.animation = 'fall 3s linear forwards';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 100);
        }
    }

    /**
     * Trộn mảng
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Lấy thử thách hiện tại
     */
    getCurrentChallenge() {
        return this.data[this.currentIndex];
    }
}

// Export class
window.BaseChallenge = BaseChallenge;
