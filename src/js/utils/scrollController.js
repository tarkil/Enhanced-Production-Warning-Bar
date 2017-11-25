
//See https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

class ScrollController {

    constructor(initEnable = true) {
        this.scrollPreviousConfigForChromeAndFirefox = null;
        this.scrollEnable = initEnable;
    }

    preventDefault(emittedEvent) {
        let event = emittedEvent || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.returnValue = false;
    }

    preventDefaultForScrollKeys(event) {
        if (keys[event.keyCode]) {
            this.preventDefault(event);
            return false;
        }
        return true;
    }

    disableScroll() {
        if (!this.scrollEnable) {
            return;
        }
        if (window.addEventListener) { // older FF
            window.addEventListener('DOMMouseScroll', this.preventDefault, false);
        }
        window.onwheel = this.preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = ScrollController.preventDefault; // older browsers, IE
        window.ontouchmove = this.preventDefault; // mobile
        document.onkeydown = this.preventDefaultForScrollKeys;
        //Disable browser scrollbars
        this.scrollPreviousConfigForChromeAndFirefox = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden'; // firefox, chrome
        document.body.scroll = "no"; // ie only
        this.scrollEnable = false;
        //Scroll page to the top left
        window.scrollTo(0, 0);
    }

    enableScroll() {
        if (this.scrollEnable) {
            return;
        }
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        }
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
        //Enable browser scrollbars
        document.documentElement.style.overflow = this.scrollPreviousConfigForChromeAndFirefox; // firefox, chrome
        document.body.scroll = "yes"; // ie only
        this.scrollEnable = true;
    }
}

export default new ScrollController();