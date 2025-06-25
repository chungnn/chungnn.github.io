# 🧠 Challenge App - Developer Guide

## 📁 Cấu Trúc Dự Án

```
📦 chungnn.github.io/
├── 📄 index-new.html          # File HTML chính (version mới)
├── 📄 styles.css              # File CSS chính (import tất cả)
├── 📄 index.html              # File HTML cũ (giữ lại để backup)
├── 📄 script.js               # File JS cũ (giữ lại để backup)
├── 📄 style.css               # File CSS cũ (giữ lại để backup)
│
├── 📁 js/                     # JavaScript modules
│   ├── 📄 app.js              # Main application controller
│   ├── 📄 base-challenge.js   # Base class cho tất cả thử thách
│   ├── 📄 template-manager.js # Quản lý HTML templates
│   ├── 📄 config.js           # Configuration và settings
│   │
│   └── 📁 challenges/         # Các loại thử thách
│       ├── 📄 pattern-challenge.js  # Thử thách hình dạng
│       ├── 📄 math-challenge.js     # Thử thách tính toán
│       └── 📄 [future-challenges]   # Thử thách tương lai
│
├── 📁 css/                    # Stylesheets
│   ├── 📄 base.css            # Base styles và layout
│   ├── 📄 menu.css            # Menu styles
│   ├── 📄 pattern-challenge.css # Pattern challenge styles
│   └── 📄 math-challenge.css    # Math challenge styles
│
└── 📁 templates/              # HTML templates (để mở rộng)
    └── 📄 [template-files]    # Template files cho components
```

## 🚀 Cách Thêm Thử Thách Mới

### Bước 1: Cập nhật Config

Trong `js/config.js`, thêm thử thách mới:

```javascript
'memory': {
    name: 'Thử Thách Trí Nhớ',
    icon: '🧠',
    className: 'MemoryChallenge',
    description: 'Ghi nhớ và tái tạo trình tự',
    enabled: true // Bật thử thách
}
```

### Bước 2: Tạo Class Thử Thách

Tạo file `js/challenges/memory-challenge.js`:

```javascript
class MemoryChallenge extends BaseChallenge {
    constructor() {
        super('memory', 'memory-challenge');
    }

    async loadData() {
        this.data = [
            // Dữ liệu thử thách
        ];
    }

    generateChallenge() {
        // Logic tạo thử thách
    }

    checkAnswer(selectedAnswer, correctAnswer) {
        // Logic kiểm tra đáp án
    }

    clearResult() {
        // Logic xóa kết quả
    }
}

window.MemoryChallenge = MemoryChallenge;
```

### Bước 3: Thêm CSS Styles

Tạo file `css/memory-challenge.css` với styles riêng.

### Bước 4: Thêm HTML Section

Trong `index-new.html`, thêm section cho thử thách mới:

```html
<section class="challenge-section" id="memory-challenge" style="display: none;">
    <h2>🎯 Thử Thách Trí Nhớ</h2>
    <div class="challenge-container">
        <!-- Nội dung thử thách -->
    </div>
</section>
```

### Bước 5: Import Scripts và Styles

Thêm vào `index-new.html`:

```html
<!-- CSS -->
<link rel="stylesheet" href="css/memory-challenge.css">

<!-- JavaScript -->
<script src="js/challenges/memory-challenge.js"></script>
```

## 🔧 Architecture Overview

### 1. **BaseChallenge Class**
- Lớp cơ sở cho tất cả thử thách
- Cung cấp methods chung: `init()`, `show()`, `hide()`, etc.
- Xử lý logic chung như confetti, shuffle array

### 2. **ChallengeApp Class**
- Controller chính của ứng dụng
- Quản lý lifecycle của tất cả thử thách
- Xử lý chuyển đổi giữa các thử thách

### 3. **Individual Challenge Classes**
- Extend từ `BaseChallenge`
- Implement logic riêng cho từng loại thử thách
- Override các methods cần thiết

### 4. **TemplateManager Class**
- Quản lý HTML templates
- Render động các components
- Hỗ trợ placeholder replacement

## 🎨 CSS Architecture

### 1. **base.css** - Core styles
- Reset CSS
- Layout containers
- Typography
- Base animations

### 2. **menu.css** - Menu component
- Menu section styles
- Button states và animations
- Responsive menu

### 3. **[challenge].css** - Challenge-specific styles
- Styles riêng cho từng loại thử thách
- Challenge-specific animations
- Responsive design

## 📱 Responsive Design

Tất cả components được thiết kế responsive với breakpoints:
- Desktop: > 768px
- Tablet: 481px - 768px  
- Mobile: ≤ 480px

## 🔄 State Management

- App state được quản lý trong `ChallengeApp` class
- Mỗi challenge quản lý state riêng
- Config được centralize trong `config.js`

## 🧪 Testing Strategy

### Manual Testing Checklist:
- [ ] Menu switching hoạt động
- [ ] Tất cả thử thách load đúng
- [ ] Animations chạy mượt
- [ ] Responsive trên mobile
- [ ] Kiểm tra đáp án đúng/sai
- [ ] Parent script cập nhật đúng

## 🚀 Deployment

1. Test thoroughly với `index-new.html`
2. Khi stable, rename:
   - `index.html` → `index-old.html` (backup)
   - `index-new.html` → `index.html`
3. Update CSS imports nếu cần
4. Deploy to GitHub Pages

## 💡 Best Practices

### 1. **Code Organization**
- Mỗi challenge = 1 file JavaScript riêng
- CSS được chia theo component
- Config tập trung trong 1 file

### 2. **Performance**
- Lazy load challenges nếu cần
- Optimize animations
- Minimize DOM manipulations

### 3. **Accessibility**
- Semantic HTML
- Keyboard navigation
- Screen reader support

### 4. **Maintainability**
- Clear class inheritance
- Consistent naming conventions
- Comprehensive comments

## 🔮 Future Enhancements

- [ ] Sound effects system
- [ ] Progress tracking
- [ ] Difficulty levels
- [ ] Multi-language support
- [ ] Parent dashboard
- [ ] Achievement system
- [ ] Offline support (PWA)

## 🐛 Troubleshooting

### Common Issues:

1. **Challenge không hiển thị**
   - Kiểm tra `enabled: true` trong config
   - Verify class name trong config
   - Check import script trong HTML

2. **CSS không apply**
   - Kiểm tra import order trong `styles.css`
   - Verify CSS selector specificity
   - Check for typos trong class names

3. **JavaScript errors**
   - Check browser console
   - Verify all dependencies loaded
   - Check class inheritance

## 📞 Support

Nếu có vấn đề khi phát triển, check:
1. Browser console cho errors
2. Network tab cho failed requests
3. File paths và naming conventions
4. Config settings
