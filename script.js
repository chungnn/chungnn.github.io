// Dữ liệu các thử thách
const challenges = [
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
    }
];

// Dữ liệu các thử thách tính toán
const mathChallenges = [
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
    }
];

let currentChallenge = 0;
let currentMathChallenge = 0;
let currentChallengeType = 'pattern'; // 'pattern' hoặc 'math'
let selectedAnswer = null;

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentDate();
    switchChallenge('pattern'); // Bắt đầu với thử thách hình dạng
});

// Hiển thị ngày hiện tại
function displayCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('current-date').textContent = now.toLocaleDateString('vi-VN', options);
}

// Tạo thử thách mới
function generateNewChallenge() {
    if (currentChallengeType === 'pattern') {
        currentChallenge = (currentChallenge + 1) % challenges.length;
    } else {
        currentMathChallenge = (currentMathChallenge + 1) % mathChallenges.length;
    }
    generateChallenge();
    clearResult();
}

// Hiển thị thử thách
function generateChallenge() {
    let challenge;
    if (currentChallengeType === 'pattern') {
        challenge = challenges[currentChallenge];
    } else {
        challenge = mathChallenges[currentMathChallenge];
    }
    
    // Hiển thị dãy hình
    displayPattern(challenge.pattern || challenge.numbers);
    
    // Tạo các lựa chọn
    createAnswerOptions(challenge.correct);
    
    // Cập nhật kịch bản cho bố mẹ
    updateParentScript(challenge.script);
    
    selectedAnswer = null;
}

// Hiển thị dãy hình
function displayPattern(pattern) {
    const container = document.getElementById('shape-sequence');
    container.innerHTML = '';
    
    pattern.forEach((shapeType, index) => {
        const shape = createShape(shapeType);
        shape.style.animationDelay = `${index * 0.2}s`;
        shape.classList.add('animate-in');
        container.appendChild(shape);
    });
}

// Tạo hình dạng
function createShape(type) {
    const shape = document.createElement('div');
    shape.className = `shape ${type}`;
    
    if (type === 'triangle') {
        // Tạo tam giác đặc biệt
        shape.innerHTML = '';
    }
    
    return shape;
}

// Tạo các lựa chọn đáp án
function createAnswerOptions(correctAnswer) {
    const container = document.getElementById('answer-options');
    container.innerHTML = '';
    
    // Tạo danh sách các hình có thể có
    const allShapes = ['circle', 'square', 'triangle'];
    
    // Trộn để tạo thứ tự ngẫu nhiên
    const shuffledShapes = shuffleArray([...allShapes]);
    
    shuffledShapes.forEach(shapeType => {
        const option = document.createElement('div');
        option.className = 'option';
        option.onclick = () => selectAnswer(option, shapeType, correctAnswer);
        
        const shape = createShape(shapeType);
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

// Trộn mảng
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Xử lý khi chọn đáp án
function selectAnswer(optionElement, selectedShape, correctAnswer) {
    // Xóa selection cũ
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'wrong');
    });
    
    // Đánh dấu lựa chọn hiện tại
    optionElement.classList.add('selected');
    selectedAnswer = selectedShape;
    
    // Kiểm tra đáp án sau một chút delay
    setTimeout(() => {
        checkAnswer(optionElement, selectedShape, correctAnswer);
    }, 500);
}

// Kiểm tra đáp án
function checkAnswer(optionElement, selectedShape, correctAnswer) {
    const resultDiv = document.getElementById('result');
    
    if (selectedShape === correctAnswer) {
        optionElement.classList.remove('selected');
        optionElement.classList.add('correct');
        resultDiv.textContent = '🎉 Tuyệt vời! Bé đã tìm ra đáp án đúng!';
        resultDiv.className = 'result success';
        
        // Hiệu ứng pháo hoa
        createConfetti();
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

// Xóa kết quả
function clearResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = '';
    resultDiv.className = 'result';
    
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'wrong');
    });
}

// Cập nhật kịch bản cho bố mẹ
function updateParentScript(script) {
    document.getElementById('parent-script').textContent = script;
}

// Tạo hiệu ứng pháo hoa khi đúng
function createConfetti() {
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

// CSS cho hiệu ứng rơi
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes animate-in {
        0% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
    
    .animate-in {
        animation: animate-in 0.5s ease forwards;
    }
`;
document.head.appendChild(style);

// Chuyển đổi giữa các loại thử thách
function switchChallenge(type) {
    currentChallengeType = type;
    
    // Cập nhật trạng thái menu
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (type === 'pattern') {
        document.querySelector('[onclick="switchChallenge(\'pattern\')"]').classList.add('active');
        document.getElementById('pattern-challenge').style.display = 'block';
        document.getElementById('math-challenge').style.display = 'none';
        generateChallenge();
    } else if (type === 'math') {
        document.querySelector('[onclick="switchChallenge(\'math\')"]').classList.add('active');
        document.getElementById('pattern-challenge').style.display = 'none';
        document.getElementById('math-challenge').style.display = 'block';
        generateMathChallenge();
    }
}

// Tạo thử thách tính toán mới
function generateNewMathChallenge() {
    currentMathChallenge = (currentMathChallenge + 1) % mathChallenges.length;
    generateMathChallenge();
    clearMathResult();
}

// Hiển thị thử thách tính toán
function generateMathChallenge() {
    const challenge = mathChallenges[currentMathChallenge];
    
    // Hiển thị phép tính
    displayMathProblem(challenge);
    
    // Tạo các lựa chọn
    createMathAnswerOptions(challenge.correct);
    
    // Cập nhật kịch bản cho bố mẹ
    updateParentScript(challenge.script);
}

// Hiển thị phép tính
function displayMathProblem(challenge) {
    const container = document.getElementById('math-sequence');
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

// Tạo các lựa chọn đáp án cho thử thách tính toán
function createMathAnswerOptions(correctAnswer) {
    const container = document.getElementById('math-answer-options');
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
    const shuffledAnswers = shuffleArray([...allAnswers]);
    
    shuffledAnswers.forEach(answer => {
        const option = document.createElement('div');
        option.className = 'math-answer-option';
        option.textContent = answer;
        option.onclick = () => selectMathAnswer(option, answer, correctAnswer);
        container.appendChild(option);
    });
}

// Xử lý khi chọn đáp án toán
function selectMathAnswer(optionElement, selectedAnswer, correctAnswer) {
    // Xóa selection cũ
    document.querySelectorAll('.math-answer-option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'wrong');
    });
    
    // Đánh dấu lựa chọn hiện tại
    optionElement.classList.add('selected');
    
    // Kiểm tra đáp án sau một chút delay
    setTimeout(() => {
        checkMathAnswer(optionElement, selectedAnswer, correctAnswer);
    }, 500);
}

// Kiểm tra đáp án toán
function checkMathAnswer(optionElement, selectedAnswer, correctAnswer) {
    const resultDiv = document.getElementById('math-result');
    
    if (selectedAnswer === correctAnswer) {
        optionElement.classList.remove('selected');
        optionElement.classList.add('correct');
        resultDiv.textContent = '🎉 Tuyệt vời! Bé tính đúng rồi!';
        resultDiv.className = 'result success';
        
        // Hiệu ứng pháo hoa
        createConfetti();
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

// Xóa kết quả toán
function clearMathResult() {
    const resultDiv = document.getElementById('math-result');
    resultDiv.textContent = '';
    resultDiv.className = 'result';
    
    document.querySelectorAll('.math-answer-option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'wrong');
    });
}
