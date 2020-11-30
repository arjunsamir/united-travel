export default class Typewriter {

    constructor(selector) {

        this.element = $(selector);
        this.words = this.element.data('words', 'json');
        this.period = this.element.data('period', 'int') || 2000;

        this.loopNum = 0;
        this.text = '';

        this.tick();
        this.isDeleting = false;
        
    }

    tick() {

        const i = this.loopNum % this.words.length;
        const fullText = this.words[i];

        if (this.isDeleting) this.text = fullText.substring(0, this.text.length - 1);
        else this.text = fullText.substring(0, this.text.length + 1);

        this.element.html(`<span class="wrap">${this.text}</span>`);

        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) delta /= 2;

        if (!this.isDeleting && this.text === fullText) {
            delta = this.period;
            this.isDeleting = true;
        }

        else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);

    }

}