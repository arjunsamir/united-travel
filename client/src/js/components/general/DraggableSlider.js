export default class DraggableSlider {

    constructor(options, container) {

        // Define Active Class
        this.activeClass = options.activeClass;

        // Define Slider
        this.slider = $(container).children(options.selector);
        this.sliderElem = this.slider.nodes();

        // Define State Variables
        this.isDragging = false;
        this.startX = undefined;
        this.scrollLeft = undefined;

    }

    init() {

        this.slider.on('mousedown', e => this.startDrag(e.pageX));
        this.slider.on('mouseleave mouseup', () => this.endDrag());
        this.slider.on('mousemove', e => this.dragging(e));

    }

    startDrag(x) {

        this.isDragging = true;
        
        this.slider.addClass(this.activeClass);
        this.startX = x - this.sliderElem.offsetLeft;
        this.scrollLeft = this.sliderElem.scrollLeft;

    }


    endDrag() {

        this.isDragging = false;
        this.slider.removeClass(this.activeClass);

    }


    dragging(e) {

        if (!this.isDragging) return;
        e.preventDefault();

        const x = e.pageX - this.sliderElem.offsetLeft;
        const walk = (x - this.startX) * 3; // Speeds Scroll Rate
        this.sliderElem.scrollLeft = this.scrollLeft - walk;

    }


}