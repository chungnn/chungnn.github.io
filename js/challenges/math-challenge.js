/**
 * Math Challenge Class
 * Thử thách tính toán cơ bản
 */

class MathChallenge extends BaseChallenge {
    constructor() {
        super('math', 'math-challenge');
    }

    /**
     * Tải dữ liệu thử thách tính toán
     */
    async loadData() {
        this.data = [
            {
                numbers: [2, 3],
                operator: '+',
                correct: 5,
                script: 'Con ơi, 2 cộng 3 bằng bao nhiêu nhỉ? Hãy tính trong đầu và chọn đáp án đúng!'
            },
            {
                numbers: [5, 2],
                operator: '-',
                correct: 3,
                script: 'Bé thử tính xem, 5 trừ 2 bằng bao nhiêu? Hãy suy nghĩ kỹ nhé!'
            },
            {
                numbers: [3, 2],
                operator: '×',
                correct: 6,
                script: 'Con có 3 nhóm, mỗi nhóm có 2 cái. Tổng cộng có bao nhiêu cái nhỉ?'
            },
            {
                numbers: [8, 2],
                operator: '÷',
                correct: 4,
                script: 'Có 8 cái kẹo chia đều cho 2 bạn. Mỗi bạn được bao nhiêu cái kẹo?'
            },
            {
                numbers: [4, 4],
                operator: '+',
                correct: 8,
                script: 'Con có 4 cái bút, bố cho thêm 4 cái nữa. Tổng cộng con có bao nhiêu cái bút?'
            },
            {
                numbers: [10, 3],
                operator: '-',
                correct: 7,
                script: 'Con có 10 cái kẹo, con ăn mất 3 cái. Còn lại bao nhiêu cái kẹo?'
            },
            {
                numbers: [2, 4],
                operator: '×',
                correct: 8,
                script: 'Trong mỗi hộp có 2 cái bánh. Con có 4 hộp. Tổng cộng có bao nhiêu cái bánh?'
            },
            {
                numbers: [6, 3],
                operator: '÷',
                correct: 2,
                script: 'Có 6 quả táo chia đều cho 3 bạn. Mỗi bạn được bao nhiêu quả táo?'
            },
            {
                numbers: [7, 2],
                operator: '+',
                correct: 9,
                script: 'Con đếm được 7 con chim trên cây, rồi bay đến thêm 2 con nữa. Tổng cộng có bao nhiêu con chim?'
            },
            {
                numbers: [9, 4],
                operator: '-',
                correct: 5,
                script: 'Hôm qua con có 9 cái bóng, hôm nay con tặng bạn 4 cái. Con còn lại bao nhiêu cái bóng?'
            }
        ];
    }

    /**
     * Thiết lập event listeners
     */
    setupEventListeners() {
        // Thêm global function để HTML có thể gọi
        window.generateNewMathChallenge = () => {
            if (window.challengeApp?.getCurrentChallenge() === this) {
                this.generateNewChallenge();
            }
        };
    }

    /**
     * Tạo thử thách tính toán
     */
    generateChallenge() {
        if (!this.data.length) return;

        const challenge = this.getCurrentChallenge();
        
        // Hiển thị phép tính
        this.displayMathProblem(challenge);
        
        // Tạo các lựa chọn
        this.createMathAnswerOptions(challenge.correct);
        
        // Cập nhật kịch bản cho bố mẹ
        this.updateParentScript(challenge.script);
    }

    /**
     * Hiển thị phép tính
     */
    displayMathProblem(challenge) {
        const container = document.getElementById('math-sequence');
        if (!container) return;

        container.innerHTML = '';
        
        // Số đầu tiên
        const num1 = document.createElement('div');
        num1.className = 'math-number';
        num1.textContent = challenge.numbers[0];
        num1.style.animationDelay = '0s';
        container.appendChild(num1);
        
        // Toán tử
        const operator = document.createElement('div');
        operator.className = 'math-operator';
        operator.textContent = challenge.operator;
        operator.style.animationDelay = '0.3s';
        container.appendChild(operator);
        
        // Số thứ hai
        const num2 = document.createElement('div');
        num2.className = 'math-number';
        num2.textContent = challenge.numbers[1];
        num2.style.animationDelay = '0.6s';
        container.appendChild(num2);
        
        // Dấu bằng
        const equals = document.createElement('div');
        equals.className = 'math-operator';
        equals.textContent = '=';
        equals.style.animationDelay = '0.9s';
        container.appendChild(equals);
    }

    /**
     * Tạo các lựa chọn đáp án cho thử thách tính toán
     */
    createMathAnswerOptions(correctAnswer) {
        const container = document.getElementById('math-answer-options');
        if (!container) return;

        container.innerHTML = '';
        
        // Tạo các đáp án sai
        const wrongAnswers = [];
        for (let i = 0; i < 3; i++) {
            let wrongAnswer;
            do {
                // Tạo đáp án sai trong khoảng hợp lý
                wrongAnswer = correctAnswer + Math.floor(Math.random() * 11) - 5;
            } while (wrongAnswer === correctAnswer || wrongAnswer < 0 || wrongAnswers.includes(wrongAnswer));
            wrongAnswers.push(wrongAnswer);
        }
        
        // Trộn tất cả đáp án
        const allAnswers = [correctAnswer, ...wrongAnswers];
        const shuffledAnswers = this.shuffleArray(allAnswers);
        
        shuffledAnswers.forEach(answer => {
            const option = document.createElement('div');
            option.className = 'math-answer-option';
            option.textContent = answer;
            option.onclick = () => this.selectMathAnswer(option, answer, correctAnswer);
            container.appendChild(option);
        });
    }

    /**
     * Xử lý khi chọn đáp án toán
     */
    selectMathAnswer(optionElement, selectedAnswer, correctAnswer) {
        // Xóa selection cũ
        document.querySelectorAll('.math-answer-option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
        });
        
        // Đánh dấu lựa chọn hiện tại
        optionElement.classList.add('selected');
        
        // Kiểm tra đáp án sau một chút delay
        setTimeout(() => {
            this.checkAnswer(optionElement, selectedAnswer, correctAnswer);
        }, 500);
    }

    /**
     * Kiểm tra đáp án toán
     */
    checkAnswer(optionElement, selectedAnswer, correctAnswer) {
        const resultDiv = document.getElementById('math-result');
        if (!resultDiv) return;

        if (selectedAnswer === correctAnswer) {
            optionElement.classList.remove('selected');
            optionElement.classList.add('correct');
            resultDiv.textContent = '🎉 Tuyệt vời! Bé tính đúng rồi!';
            resultDiv.className = 'result success';
            
            // Hiệu ứng pháo hoa
            this.createConfetti();
        } else {
            optionElement.classList.remove('selected');
            optionElement.classList.add('wrong');
            
            // Hiển thị đáp án đúng
            document.querySelectorAll('.math-answer-option').forEach(opt => {
                if (parseInt(opt.textContent) === correctAnswer) {
                    opt.classList.add('correct');
                }
            });
            
            resultDiv.textContent = `🤔 Chưa đúng rồi. Đáp án đúng là ${correctAnswer}. Hãy thử lại nhé!`;
            resultDiv.className = 'result error';
        }
    }

    /**
     * Xóa kết quả toán
     */
    clearResult() {
        const resultDiv = document.getElementById('math-result');
        if (resultDiv) {
            resultDiv.textContent = '';
            resultDiv.className = 'result';
        }
        
        document.querySelectorAll('.math-answer-option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
        });
    }
}

// Export class
window.MathChallenge = MathChallenge;
