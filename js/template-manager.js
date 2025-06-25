/**
 * HTML Template Manager
 * Quản lý các template HTML để tái sử dụng
 */

class TemplateManager {
    constructor() {
        this.templates = new Map();
        this.loadTemplates();
    }

    /**
     * Tải các template
     */
    loadTemplates() {
        // Template cho menu
        this.templates.set('menu', `
            <section class="menu-section">
                <h2>🎮 Chọn Loại Thử Thách</h2>
                <div class="menu-buttons" id="menu-buttons">
                    <!-- Các nút menu sẽ được tạo động -->
                </div>
            </section>
        `);

        // Template cho challenge section
        this.templates.set('challenge-section', `
            <section class="challenge-section" id="{{id}}" style="display: none;">
                <h2>{{title}}</h2>
                <div class="challenge-container">
                    {{content}}
                    <div class="result" id="{{resultId}}"></div>
                    <button class="new-challenge-btn" onclick="{{newChallengeFunction}}">Thử Thách Mới</button>
                </div>
            </section>
        `);

        // Template cho pattern challenge content
        this.templates.set('pattern-content', `
            <div class="pattern-display">
                <div class="shape-sequence" id="shape-sequence">
                    <!-- Các hình sẽ được tạo bằng JavaScript -->
                </div>
                <div class="question-mark">?</div>
            </div>
            <div class="answer-options" id="answer-options">
                <!-- Các lựa chọn sẽ được tạo bằng JavaScript -->
            </div>
        `);

        // Template cho math challenge content
        this.templates.set('math-content', `
            <div class="math-display">
                <div class="math-sequence" id="math-sequence">
                    <!-- Các phép tính sẽ được tạo bằng JavaScript -->
                </div>
                <div class="question-mark">?</div>
            </div>
            <div class="answer-options" id="math-answer-options">
                <!-- Các lựa chọn sẽ được tạo bằng JavaScript -->
            </div>
        `);

        // Template cho parent section
        this.templates.set('parent-section', `
            <section class="parent-section">
                <h3>📋 Kịch Bản Cho Bố Mẹ</h3>
                <div class="script-box">
                    <p><strong>Hướng dẫn:</strong></p>
                    <p id="parent-script">
                        Chọn một thử thách để bắt đầu!
                    </p>
                    <div class="tips">
                        <p><strong>💡 Mẹo:</strong></p>
                        <ul id="tips-list">
                            <li>Khuyến khích bé quan sát kỹ trước khi chọn</li>
                            <li>Nếu bé chọn sai, hãy giải thích quy luật một cách đơn giản</li>
                            <li>Khen ngợi khi bé tìm ra đáp án đúng</li>
                            <li>Với thử thách tính toán: có thể dùng đồ vật cụ thể để minh họa</li>
                            <li>Với thử thách hình dạng: giúp bé nhận biết quy luật lặp lại</li>
                        </ul>
                    </div>
                </div>
            </section>
        `);

        // Template cho menu button
        this.templates.set('menu-button', `
            <button class="menu-btn {{activeClass}}" onclick="challengeApp.switchChallenge('{{type}}')">
                {{icon}} {{title}}
            </button>
        `);
    }

    /**
     * Lấy template
     */
    getTemplate(name) {
        return this.templates.get(name) || '';
    }

    /**
     * Render template với data
     */
    render(templateName, data = {}) {
        let template = this.getTemplate(templateName);
        
        // Thay thế các placeholder
        for (const [key, value] of Object.entries(data)) {
            const placeholder = new RegExp(`{{${key}}}`, 'g');
            template = template.replace(placeholder, value);
        }
        
        return template;
    }

    /**
     * Tạo menu buttons động
     */
    generateMenuButtons(challenges) {
        const menuContainer = document.getElementById('menu-buttons');
        if (!menuContainer) return;

        // Sử dụng config nếu có, fallback về hardcode
        const challengeConfigs = window.ChallengeConfig ? 
            window.ChallengeConfig.getEnabledChallenges() : 
            {
                'pattern': { name: 'Thử Thách Hình Dạng', icon: '🔺' },
                'math': { name: 'Thử Thách Tính Toán', icon: '🔢' },
                'queue': { name: 'Thử Thách Xếp Hàng', icon: '👥' }
            };

        let buttonsHTML = '';
        let isFirst = true;

        for (const [type, challenge] of challenges) {
            const config = challengeConfigs[type];
            if (config) {
                buttonsHTML += this.render('menu-button', {
                    type: type,
                    icon: config.icon,
                    title: config.name,
                    activeClass: isFirst ? 'active' : ''
                });
                isFirst = false;
            }
        }

        menuContainer.innerHTML = buttonsHTML;
        console.log(`📋 Generated ${challenges.size} menu buttons`);
    }
}

// Export class
window.TemplateManager = TemplateManager;
