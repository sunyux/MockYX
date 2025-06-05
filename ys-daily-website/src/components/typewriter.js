// typewriter.js
class Typewriter {
    constructor(elementId, text, speed = 100) {
        this.element = document.getElementById(elementId);
        this.textSpan = this.element.querySelector('.text');
        this.cursor = this.element.querySelector('.cursor');
        this.fullText = text;
        this.currentText = "";
        this.currentIndex = 0;
        this.isTyping = false;
        this.isComplete = false;
        this.typingSpeed = speed;
        this.typingInterval = null;
        
        this.init();
    }
    
    init() {
        // Add click event listener
        this.element.addEventListener('click', () => this.handleClick());
        
        // Start typing automatically
        setTimeout(() => this.start(), 500);
    }
    
    typeCharacter() {
        if (this.currentIndex < this.fullText.length) {
            this.currentText += this.fullText[this.currentIndex];
            this.textSpan.textContent = this.currentText;
            this.currentIndex++;
        } else {
            this.complete();
        }
    }
    
    start() {
        if (!this.isTyping && !this.isComplete) {
            this.isTyping = true;
            this.typingInterval = setInterval(() => this.typeCharacter(), this.typingSpeed);
        }
    }
    
    complete() {
        // Show full text immediately
        this.currentText = this.fullText;
        this.currentIndex = this.fullText.length;
        this.textSpan.textContent = this.currentText;
        
        // Stop typing animation
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
        }
        
        this.isTyping = false;
        this.isComplete = true;
        
        // Hide cursor after completion
        setTimeout(() => {
            this.cursor.classList.add('hidden');
        }, 1000);
    }
    
    handleClick() {
        if (this.isTyping && !this.isComplete) {
            this.complete();
        }
    }
    
    reset() {
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
        }
        
        this.currentText = "";
        this.currentIndex = 0;
        this.isTyping = false;
        this.isComplete = false;
        this.textSpan.textContent = "";
        this.cursor.classList.remove('hidden');
    }
}

// Usage example:
// const typewriter = new Typewriter('typewriter', 'Creative Designer & Developer crafting beautiful digital experiences');