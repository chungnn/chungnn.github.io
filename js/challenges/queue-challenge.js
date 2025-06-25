/**
 * Queue Challenge Class
 * Thử thách bài toán xếp hàng
 */

class QueueChallenge extends BaseChallenge {
    constructor() {
        super('queue', 'queue-challenge');
    }

    /**
     * Tải dữ liệu thử thách xếp hàng
     */
    async loadData() {
        this.data = [
            {
                type: 'find_position',
                totalPeople: 7,
                before: 2,
                after: 4,
                question: 'Bạn An đứng trong hàng. Phía trước An có 2 người, phía sau An có 4 người. Vậy An đứng thứ mấy trong hàng?',
                correct: 3,
                explanation: 'An đứng thứ 3 (2 người trước + An = vị trí thứ 3)',
                script: 'Con nghe này, bạn An xếp hàng mua kẹo. Trước mặt An có 2 bạn, sau lưng An có 4 bạn. Vậy An đứng thứ mấy trong hàng nhỉ?'
            },
            {
                type: 'count_total',
                totalPeople: 8,
                position: 3,
                before: 2,
                after: 5,
                question: 'Bạn Mai đứng thứ 3 trong hàng. Phía sau Mai có 5 người. Vậy trong hàng có tổng cộng bao nhiêu người?',
                correct: 8,
                explanation: 'Tổng cộng: 2 người trước + Mai + 5 người sau = 8 người',
                script: 'Bạn Mai đứng thứ 3 trong hàng mua bánh. Sau Mai có 5 bạn nữa. Vậy cả hàng có bao nhiêu bạn nhỉ?'
            },
            {
                type: 'count_behind',
                totalPeople: 6,
                position: 4,
                before: 3,
                question: 'Bạn Minh đứng thứ 4 trong hàng có 6 người. Vậy phía sau Minh có bao nhiêu người?',
                correct: 2,
                explanation: 'Phía sau Minh: 6 - 4 = 2 người',
                script: 'Trong hàng có 6 bạn. Bạn Minh đứng thứ 4. Vậy sau Minh có bao nhiêu bạn?'
            },
            {
                type: 'count_before',
                totalPeople: 9,
                position: 5,
                after: 4,
                question: 'Bạn Linh đứng thứ 5 trong hàng có 9 người. Vậy phía trước Linh có bao nhiêu người?',
                correct: 4,
                explanation: 'Phía trước Linh: 5 - 1 = 4 người',
                script: 'Cả hàng có 9 bạn, bạn Linh đứng thứ 5. Vậy trước Linh có bao nhiêu bạn?'
            },
            {
                type: 'find_position_hard',
                totalPeople: 10,
                before: 3,
                after: 6,
                question: 'Bạn Nam đứng trong hàng có 10 người. Phía trước Nam có 3 người, phía sau Nam có 6 người. Nam đứng thứ mấy?',
                correct: 4,
                explanation: 'Nam đứng thứ 4 (3 người trước + Nam = vị trí thứ 4)',
                script: 'Hàng có 10 bạn. Trước Nam có 3 bạn, sau Nam có 6 bạn. Nam đứng thứ mấy?'
            },
            {
                type: 'double_queue',
                totalPeople: 12,
                position1: 4,
                position2: 8,
                question: 'Trong hàng có 12 người. An đứng thứ 4, Mai đứng thứ 8. Giữa An và Mai có bao nhiêu người?',
                correct: 3,
                explanation: 'Giữa vị trí 4 và 8: 8 - 4 - 1 = 3 người',
                script: 'Hàng có 12 bạn. An đứng thứ 4, Mai đứng thứ 8. Giữa An và Mai có bao nhiêu bạn?'
            },
            {
                type: 'moving_position',
                totalPeople: 8,
                oldPosition: 6,
                newPosition: 3,
                question: 'Bạn Hoa đang đứng thứ 6 trong hàng 8 người, rồi Hoa chuyển lên đứng thứ 3. Hoa đã vượt qua bao nhiêu người?',
                correct: 3,
                explanation: 'Từ vị trí 6 về vị trí 3: 6 - 3 = 3 người',
                script: 'Hoa đứng thứ 6, rồi xin phép lên đứng thứ 3. Hoa đã vượt qua bao nhiêu bạn?'
            },
            {
                type: 'count_total_complex',
                position: 5,
                before: 4,
                after: 7,
                question: 'Bạn Tuấn đứng thứ 5. Phía trước có 4 người, phía sau có 7 người. Cả hàng có bao nhiêu người?',
                correct: 12,
                explanation: 'Tổng cộng: 4 + 1 (Tuấn) + 7 = 12 người',
                script: 'Tuấn đứng thứ 5, trước có 4 bạn, sau có 7 bạn. Cả hàng có bao nhiêu bạn?'
            }
        ];
    }

    /**
     * Thiết lập event listeners
     */
    setupEventListeners() {
        // Thêm global function để HTML có thể gọi
        window.generateNewQueueChallenge = () => {
            if (window.challengeApp?.getCurrentChallenge() === this) {
                this.generateNewChallenge();
            }
        };
    }

    /**
     * Tạo thử thách xếp hàng
     */
    generateChallenge() {
        if (!this.data.length) return;

        const challenge = this.getCurrentChallenge();
        
        // Hiển thị hình ảnh hàng người
        this.displayQueue(challenge);
        
        // Hiển thị câu hỏi
        this.displayQuestion(challenge);
        
        // Tạo các lựa chọn
        this.createQueueAnswerOptions(challenge.correct);
        
        // Cập nhật kịch bản cho bố mẹ
        this.updateParentScript(challenge.script);
    }

    /**
     * Hiển thị hình ảnh hàng người
     */
    displayQueue(challenge) {
        const container = document.getElementById('queue-visualization');
        if (!container) return;

        container.innerHTML = '';
        
        // Tạo tiêu đề
        const title = document.createElement('div');
        title.className = 'queue-title';
        title.textContent = '👥 Hàng Xếp Hàng';
        container.appendChild(title);

        // Tạo hàng người
        const queueLine = document.createElement('div');
        queueLine.className = 'queue-line';
        
        const totalPeople = challenge.totalPeople || this.calculateTotal(challenge);
        const specialPosition = challenge.position || challenge.position1 || (challenge.before ? challenge.before + 1 : null);
        
        for (let i = 1; i <= totalPeople; i++) {
            const person = document.createElement('div');
            person.className = 'queue-person';
            
            if (i === specialPosition) {
                person.classList.add('special-person');
                person.innerHTML = '🙋‍♀️';
                person.title = 'Đây là người được nhắc đến trong câu hỏi';
            } else if (i === challenge.position2) {
                person.classList.add('special-person-2');
                person.innerHTML = '🙋‍♂️';
                person.title = 'Đây là người thứ 2 được nhắc đến';
            } else {
                person.innerHTML = '🧑‍🤝‍🧑';
            }
            
            // Thêm số thứ tự
            const position = document.createElement('div');
            position.className = 'position-number';
            position.textContent = i;
            person.appendChild(position);
            
            person.style.animationDelay = `${i * 0.1}s`;
            person.classList.add('animate-in');
            queueLine.appendChild(person);
        }
        
        container.appendChild(queueLine);
    }

    /**
     * Hiển thị câu hỏi
     */
    displayQuestion(challenge) {
        const container = document.getElementById('queue-question');
        if (!container) return;

        container.innerHTML = '';
        
        const questionBox = document.createElement('div');
        questionBox.className = 'question-box';
        questionBox.innerHTML = `
            <h3>❓ Câu Hỏi</h3>
            <p>${challenge.question}</p>
        `;
        
        container.appendChild(questionBox);
    }

    /**
     * Tính tổng số người (helper function)
     */
    calculateTotal(challenge) {
        if (challenge.totalPeople) return challenge.totalPeople;
        if (challenge.before !== undefined && challenge.after !== undefined) {
            return challenge.before + 1 + challenge.after;
        }
        return 10; // default
    }

    /**
     * Tạo các lựa chọn đáp án
     */
    createQueueAnswerOptions(correctAnswer) {
        const container = document.getElementById('queue-answer-options');
        if (!container) return;

        container.innerHTML = '';
        
        // Tạo các đáp án sai hợp lý
        const wrongAnswers = [];
        const ranges = [
            correctAnswer - 2,
            correctAnswer - 1,
            correctAnswer + 1,
            correctAnswer + 2
        ].filter(num => num > 0 && num <= 20); // Giới hạn trong khoảng hợp lý
        
        // Chọn 3 đáp án sai
        while (wrongAnswers.length < 3 && ranges.length > 0) {
            const randomIndex = Math.floor(Math.random() * ranges.length);
            const wrongAnswer = ranges[randomIndex];
            if (wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer)) {
                wrongAnswers.push(wrongAnswer);
            }
            ranges.splice(randomIndex, 1);
        }
        
        // Đảm bảo có đủ 3 đáp án sai
        while (wrongAnswers.length < 3) {
            const randomWrong = Math.max(1, correctAnswer + Math.floor(Math.random() * 5) - 2);
            if (randomWrong !== correctAnswer && !wrongAnswers.includes(randomWrong)) {
                wrongAnswers.push(randomWrong);
            }
        }
        
        // Trộn tất cả đáp án
        const allAnswers = [correctAnswer, ...wrongAnswers.slice(0, 3)];
        const shuffledAnswers = this.shuffleArray(allAnswers);
        
        shuffledAnswers.forEach(answer => {
            const option = document.createElement('div');
            option.className = 'queue-answer-option';
            option.textContent = answer;
            option.onclick = () => this.selectQueueAnswer(option, answer, correctAnswer);
            container.appendChild(option);
        });
    }

    /**
     * Xử lý khi chọn đáp án
     */
    selectQueueAnswer(optionElement, selectedAnswer, correctAnswer) {
        // Xóa selection cũ
        document.querySelectorAll('.queue-answer-option').forEach(opt => {
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
     * Kiểm tra đáp án
     */
    checkAnswer(optionElement, selectedAnswer, correctAnswer) {
        const resultDiv = document.getElementById('queue-result');
        if (!resultDiv) return;

        const challenge = this.getCurrentChallenge();

        if (selectedAnswer === correctAnswer) {
            optionElement.classList.remove('selected');
            optionElement.classList.add('correct');
            resultDiv.innerHTML = `
                <div class="success-message">
                    🎉 Tuyệt vời! Bé đã tính đúng rồi!
                    <div class="explanation">
                        💡 <strong>Giải thích:</strong> ${challenge.explanation}
                    </div>
                </div>
            `;
            resultDiv.className = 'result success';
            
            // Hiệu ứng pháo hoa
            this.createConfetti();
        } else {
            optionElement.classList.remove('selected');
            optionElement.classList.add('wrong');
            
            // Hiển thị đáp án đúng
            document.querySelectorAll('.queue-answer-option').forEach(opt => {
                if (parseInt(opt.textContent) === correctAnswer) {
                    opt.classList.add('correct');
                }
            });
            
            resultDiv.innerHTML = `
                <div class="error-message">
                    🤔 Chưa đúng rồi. Đáp án đúng là <strong>${correctAnswer}</strong>
                    <div class="explanation">
                        💡 <strong>Giải thích:</strong> ${challenge.explanation}
                    </div>
                    <div class="encourage">Hãy đọc kỹ đề bài và thử lại nhé! 💪</div>
                </div>
            `;
            resultDiv.className = 'result error';
        }
    }

    /**
     * Xóa kết quả
     */
    clearResult() {
        const resultDiv = document.getElementById('queue-result');
        if (resultDiv) {
            resultDiv.textContent = '';
            resultDiv.className = 'result';
        }
        
        document.querySelectorAll('.queue-answer-option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
        });
    }
}

// Export class
window.QueueChallenge = QueueChallenge;
