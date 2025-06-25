/**
 * DEMO: Color Challenge
 * Ví dụ về cách tạo thử thách mới
 * Uncomment code bên dưới để kích hoạt
 */

/*
class ColorChallenge extends BaseChallenge {
    constructor() {
        super('color', 'color-challenge');
    }

    async loadData() {
        this.data = [
            {
                colors: ['red', 'blue', 'red', 'blue'],
                correct: 'red',
                script: 'Con nhìn dãy màu này nhé: đỏ, xanh, đỏ, xanh. Màu tiếp theo sẽ là gì?'
            },
            {
                colors: ['green', 'yellow', 'green', 'yellow'],
                correct: 'green',
                script: 'Xem nào, có màu xanh lá, vàng, xanh lá, vàng. Màu tiếp theo là gì nhỉ?'
            }
        ];
    }

    generateChallenge() {
        if (!this.data.length) return;

        const challenge = this.getCurrentChallenge();
        
        // Hiển thị dãy màu
        this.displayColorSequence(challenge.colors);
        
        // Tạo các lựa chọn
        this.createColorOptions(challenge.correct);
        
        // Cập nhật kịch bản
        this.updateParentScript(challenge.script);
    }

    displayColorSequence(colors) {
        const container = document.getElementById('color-sequence');
        if (!container) return;

        container.innerHTML = '';
        
        colors.forEach((color, index) => {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color;
            colorBox.style.animationDelay = `${index * 0.2}s`;
            colorBox.classList.add('animate-in');
            container.appendChild(colorBox);
        });
    }

    createColorOptions(correctColor) {
        const container = document.getElementById('color-answer-options');
        if (!container) return;

        container.innerHTML = '';
        
        const colors = ['red', 'blue', 'green', 'yellow'];
        const shuffledColors = this.shuffleArray(colors);
        
        shuffledColors.forEach(color => {
            const option = document.createElement('div');
            option.className = 'color-option';
            option.style.backgroundColor = color;
            option.onclick = () => this.selectColorAnswer(option, color, correctColor);
            container.appendChild(option);
        });
    }

    selectColorAnswer(optionElement, selectedColor, correctColor) {
        // Xóa selection cũ
        document.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
        });
        
        // Đánh dấu lựa chọn hiện tại
        optionElement.classList.add('selected');
        
        // Kiểm tra đáp án
        setTimeout(() => {
            this.checkAnswer(optionElement, selectedColor, correctColor);
        }, 500);
    }

    checkAnswer(optionElement, selectedColor, correctColor) {
        const resultDiv = document.getElementById('color-result');
        if (!resultDiv) return;

        if (selectedColor === correctColor) {
            optionElement.classList.remove('selected');
            optionElement.classList.add('correct');
            resultDiv.textContent = '🎉 Tuyệt vời! Bé đã chọn đúng màu!';
            resultDiv.className = 'result success';
            this.createConfetti();
        } else {
            optionElement.classList.remove('selected');
            optionElement.classList.add('wrong');
            resultDiv.textContent = `🤔 Chưa đúng rồi. Màu đúng là ${correctColor}. Thử lại nhé!`;
            resultDiv.className = 'result error';
        }
    }

    clearResult() {
        const resultDiv = document.getElementById('color-result');
        if (resultDiv) {
            resultDiv.textContent = '';
            resultDiv.className = 'result';
        }
        
        document.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
        });
    }

    setupEventListeners() {
        window.generateNewColorChallenge = () => {
            if (window.challengeApp?.getCurrentChallenge() === this) {
                this.generateNewChallenge();
            }
        };
    }
}

// Uncomment để kích hoạt
// window.ColorChallenge = ColorChallenge;
*/

/**
 * HƯỚNG DẪN KÍCH HOẠT THỬ THÁCH MỚI:
 * 
 * 1. Uncomment code ColorChallenge ở trên
 * 
 * 2. Thêm vào config.js:
 *    'color': {
 *        name: 'Thử Thách Màu Sắc',
 *        icon: '🎨',
 *        className: 'ColorChallenge',
 *        description: 'Nhận biết và phân loại màu sắc',
 *        enabled: true
 *    }
 * 
 * 3. Thêm HTML section vào index-new.html:
 *    <section class="challenge-section" id="color-challenge" style="display: none;">
 *        <h2>🎯 Thử Thách Màu Sắc</h2>
 *        <div class="challenge-container">
 *            <div class="color-display">
 *                <div class="color-sequence" id="color-sequence"></div>
 *                <div class="question-mark">?</div>
 *            </div>
 *            <div class="answer-options" id="color-answer-options"></div>
 *            <div class="result" id="color-result"></div>
 *            <button class="new-challenge-btn" onclick="generateNewColorChallenge()">Thử Thách Mới</button>
 *        </div>
 *    </section>
 * 
 * 4. Thêm CSS cho color challenge:
 *    .color-box {
 *        width: 60px;
 *        height: 60px;
 *        border: 3px solid #333;
 *        border-radius: 10px;
 *        margin: 5px;
 *        cursor: pointer;
 *        transition: transform 0.3s ease;
 *    }
 *    
 *    .color-option {
 *        width: 80px;
 *        height: 80px;
 *        border: 3px solid transparent;
 *        border-radius: 15px;
 *        margin: 10px;
 *        cursor: pointer;
 *        transition: all 0.3s ease;
 *    }
 * 
 * 5. Import script vào HTML:
 *    <script src="js/challenges/color-challenge.js"></script>
 */

console.log('📋 Color Challenge Demo loaded. Follow instructions in comments to activate.');
