/**
 * Configuration file for challenges
 * Cấu hình cho việc thêm thử thách mới
 */

const ChallengeConfig = {
    // Cấu hình các loại thử thách
    types: {
        'pattern': {
            name: 'Thử Thách Hình Dạng',
            icon: '🔺',
            className: 'PatternChallenge',
            description: 'Nhận biết quy luật và hoàn thành dãy hình'
        },
        'math': {
            name: 'Thử Thách Tính Toán',
            icon: '🔢',
            className: 'MathChallenge',
            description: 'Thực hiện phép tính cơ bản'
        },
        'queue': {
            name: 'Thử Thách Xếp Hàng',
            icon: '👥',
            className: 'QueueChallenge',
            description: 'Bài toán logic về xếp hàng và vị trí'
        },
        // Dễ dàng thêm thử thách mới
        'memory': {
            name: 'Thử Thách Trí Nhớ',
            icon: '🧠',
            className: 'MemoryChallenge',
            description: 'Ghi nhớ và tái tạo trình tự',
            enabled: false // Chưa implement
        },
        'color': {
            name: 'Thử Thách Màu Sắc',
            icon: '🎨',
            className: 'ColorChallenge',
            description: 'Nhận biết và phân loại màu sắc',
            enabled: false // Chưa implement
        },
        'word': {
            name: 'Thử Thách Từ Vựng',
            icon: '📝',
            className: 'WordChallenge',
            description: 'Học từ vựng và chính tả',
            enabled: false // Chưa implement
        }
    },

    // Cấu hình độ khó
    difficulty: {
        'easy': {
            name: 'Dễ',
            icon: '😊',
            ageRange: '3-5 tuổi'
        },
        'medium': {
            name: 'Trung bình',
            icon: '🤔',
            ageRange: '5-7 tuổi'
        },
        'hard': {
            name: 'Khó',
            icon: '🤯',
            ageRange: '7-10 tuổi'
        }
    },

    // Cấu hình animation
    animations: {
        enabled: true,
        duration: {
            short: 300,
            medium: 500,
            long: 1000
        },
        easing: 'ease-in-out'
    },

    // Cấu hình âm thanh (để mở rộng sau)
    sound: {
        enabled: false,
        volume: 0.5,
        effects: {
            success: 'sounds/success.mp3',
            error: 'sounds/error.mp3',
            click: 'sounds/click.mp3'
        }
    },

    // Cấu hình ngôn ngữ
    language: {
        current: 'vi',
        supported: ['vi', 'en'],
        fallback: 'vi'
    },

    // Hàm helper để lấy thử thách đã kích hoạt
    getEnabledChallenges() {
        const enabled = {};
        for (const [key, config] of Object.entries(this.types)) {
            if (config.enabled !== false) {
                enabled[key] = config;
            }
        }
        return enabled;
    },

    // Hàm helper để kiểm tra thử thách có sẵn
    isChallengeAvailable(type) {
        return this.types[type] && this.types[type].enabled !== false;
    },

    // Hàm helper để lấy class name
    getChallengeClass(type) {
        return this.types[type]?.className || null;
    }
};

// Export cho các module khác
if (typeof window !== 'undefined') {
    window.ChallengeConfig = ChallengeConfig;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChallengeConfig;
}
