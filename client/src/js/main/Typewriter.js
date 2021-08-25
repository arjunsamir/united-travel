const parseWords = (raw) => JSON.parse(raw.replaceAll("``", '"'));

export default class Typewriter {

    constructor(selector, container, props = {}) {

        const { element, period, words } = props;

        this.element = element ? $(element) : $(container).children(selector);
        this.words = words || parseWords(this.element.data('words'));


        this.period = period|| this.element.data('period', 'int') || 2000;

        this.loopNum = 0;
        this.text = '';

        this.timeout = null;

        this.allowTicks = true;
        
    }

    init() {
        this.tick();
        this.isDeleting = false;

        return this;
    }

    tick() {

        if (!this.allowTicks) return;

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

        this.timeout = setTimeout(() => this.tick(), delta);

    }

    destroy() {
        clearTimeout(this.timeout);
        this.allowTicks = false;
    }

}