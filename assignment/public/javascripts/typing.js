class TypingEffect {
    constructor(element, initialText) {
        this.element = element;
        this.initialText = initialText;
        this.text = '';
        this.index = 0;
    }

    start(text) {
        this.text = text;
        this.index = 0;
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), 80);
        }
    }
}

const typingElement = document.getElementById('typing');
const typing = new TypingEffect(typingElement, "Here is Chunyu Lin！");
typing.start(typing.initialText);
