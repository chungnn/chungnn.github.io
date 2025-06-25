/**
 * Pattern Challenge Class
 * Thử thách nhận biết quy luật hình dạng
 */

class PatternChallenge extends BaseChallenge {
    constructor() {
        super('pattern', 'pattern-challenge');
        this.selectedAnswer = null;
    }

    /**
     * Tải dữ liệu thử thách hình dạng
     */
    async loadData() {
        this.data = [
            {
                pattern: ['circle', 'square', 'circle', 'square'],
                correct: 'circle',
                script: 'Con nhìn này, một hình tròn rồi đến một hình vuông. Cứ lặp đi lặp lại như vậy. Theo con, hình tiếp theo là gì nhỉ?'
            },
            {
                pattern: ['square', 'square', 'circle', 'square', 'square'],
                correct: 'circle',
                script: 'Con xem, có hai hình vuông rồi một hình tròn, rồi lại hai hình vuông. Vậy hình tiếp theo sẽ là gì?'
            },
            {
                pattern: ['circle', 'triangle', 'circle', 'triangle'],
                correct: 'circle',
                script: 'Bé nhìn thấy không, hình tròn và hình tam giác cứ xen kẽ nhau. Hình tiếp theo sẽ là gì nhỉ?'
            },
            {
                pattern: ['triangle', 'circle', 'square', 'triangle', 'circle'],
                correct: 'square',
                script: 'Có ba hình khác nhau: tam giác, tròn, vuông, rồi lại tam giác, tròn. Theo con thì hình tiếp theo là gì?'
            },
            {
                pattern: ['square', 'circle', 'circle', 'square', 'circle'],
                correct: 'circle',
                script: 'Con thấy quy luật gì trong dãy hình này không? Một hình vuông, hai hình tròn, rồi một hình vuông, một hình tròn...'
            },
            {
                pattern: ['triangle', 'triangle', 'square', 'triangle', 'triangle'],
                correct: 'square',
                script: 'Con xem, có hai hình tam giác rồi một hình vuông, rồi lại hai hình tam giác. Hình tiếp theo là gì nhỉ?'
            },
            {
                pattern: ['circle', 'square', 'triangle', 'circle', 'square'],
                correct: 'triangle',
                script: 'Ba hình khác nhau theo thứ tự: tròn, vuông, tam giác. Rồi lại tròn, vuông. Hình tiếp theo sẽ là gì?'
            }
        ];
    }

    /**
     * Thiết lập event listeners
     */
    setupEventListeners() {
        // Thêm global function để HTML có thể gọi
        window.generateNewChallenge = () => {
            if (window.challengeApp?.getCurrentChallenge() === this) {
                this.generateNewChallenge();
            }
        };
    }

    /**
     * Tạo thử thách hình dạng
     */
    generateChallenge() {
        if (!this.data.length) return;

        const challenge = this.getCurrentChallenge();
        
        // Hiển thị dãy hình
        this.displayPattern(challenge.pattern);
        
        // Tạo các lựa chọn
        this.createAnswerOptions(challenge.correct);
        
        // Cập nhật kịch bản cho bố mẹ
        this.updateParentScript(challenge.script);
        
        this.selectedAnswer = null;
    }

    /**
     * Hiển thị dãy hình
     */
    displayPattern(pattern) {
        const container = document.getElementById('shape-sequence');
        if (!container) return;

        container.innerHTML = '';
        
        pattern.forEach((shapeType, index) => {
            const shape = this.createShape(shapeType);
            shape.style.animationDelay = `${index * 0.2}s`;
            shape.classList.add('animate-in');
            container.appendChild(shape);
        });
    }

    /**
     * Tạo hình dạng
     */
    createShape(type) {
        const shape = document.createElement('div');
        shape.className = `shape ${type}`;
        
        if (type === 'triangle') {
            shape.innerHTML = '';
        }
        
        return shape;
    }

    /**
     * Tạo các lựa chọn đáp án
     */
    createAnswerOptions(correctAnswer) {
        const container = document.getElementById('answer-options');
        if (!container) return;

        container.innerHTML = '';
        
        // Tạo danh sách các hình có thể có
        const allShapes = ['circle', 'square', 'triangle'];
        
        // Trộn để tạo thứ tự ngẫu nhiên
        const shuffledShapes = this.shuffleArray(allShapes);
        
        shuffledShapes.forEach(shapeType => {
            const option = document.createElement('div');
            option.className = 'option';
            option.onclick = () => this.selectAnswer(option, shapeType, correctAnswer);
            
            const shape = this.createShape(shapeType);
            shape.style.width = '50px';
            shape.style.height = '50px';
            if (shapeType === 'triangle') {
                shape.style.borderLeftWidth = '25px';
                shape.style.borderRightWidth = '25px';
                shape.style.borderBottomWidth = '43px';
            }
            
            option.appendChild(shape);
            container.appendChild(option);
        });
    }

    /**
     * Xử lý khi chọn đáp án
     */
    selectAnswer(optionElement, selectedShape, correctAnswer) {
        // Xóa selection cũ
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
        });
        
        // Đánh dấu lựa chọn hiện tại
        optionElement.classList.add('selected');
        this.selectedAnswer = selectedShape;
        
        // Kiểm tra đáp án sau một chút delay
        setTimeout(() => {
            this.checkAnswer(optionElement, selectedShape, correctAnswer);
        }, 500);
    }

    /**
     * Kiểm tra đáp án
     */
    checkAnswer(optionElement, selectedShape, correctAnswer) {
        const resultDiv = document.getElementById('result');
        if (!resultDiv) return;

        if (selectedShape === correctAnswer) {
            optionElement.classList.remove('selected');
            optionElement.classList.add('correct');
            resultDiv.textContent = '🎉 Tuyệt vời! Bé đã tìm ra đáp án đúng!';
            resultDiv.className = 'result success';
            
            // Hiệu ứng pháo hoa
            this.createConfetti();
        } else {
            optionElement.classList.remove('selected');
            optionElement.classList.add('wrong');
            
            // Hiển thị đáp án đúng
            document.querySelectorAll('.option').forEach(opt => {
                const shape = opt.querySelector('.shape');
                if (shape && shape.classList.contains(correctAnswer)) {
                    opt.classList.add('correct');
                }
            });
            
            resultDiv.textContent = '🤔 Chưa đúng rồi. Hãy thử quan sát kỹ hơn nhé!';
            resultDiv.className = 'result error';
        }
    }

    /**
     * Xóa kết quả
     */
    clearResult() {
        const resultDiv = document.getElementById('result');
        if (resultDiv) {
            resultDiv.textContent = '';
            resultDiv.className = 'result';
        }
        
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
        });
    }
}

// Export class
window.PatternChallenge = PatternChallenge;
