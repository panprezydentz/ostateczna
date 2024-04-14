const ONE_SECOND = 1000;

class Clock {
    constructor() {
        this.clock = null; // interval
        this.currentTime = 0;
        this.limitTime = 0;
        this.$clock = document.querySelector('h1');
    }

    start(time) {
        console.log('start', time);
        this.limitTime = time;
        this.render();
        this.clock = setInterval(() => {
            this.currentTime += ONE_SECOND;
            this.render();

            if (this.isStopped()) {
                this.stop();
            }
        }, ONE_SECOND);
    }

    isStopped() {
        return (this.limitTime - this.currentTime) === 0;
    }

    render() {
        let diff = this.limitTime - this.currentTime;
        console.log('render', diff);
        this.$clock.textContent = Clock.formatTime(diff);
    }

    stop() {
        console.log('stop');
        clearInterval(this.clock);
        this.$clock.classList.add('red-color');
        playAudio('alarm.mp3');
    }

    static parseSeconds(formattedTime) {
        let [minutes, seconds] = formattedTime.split(':').map(Number);
        return (minutes * 60 * ONE_SECOND) + seconds * ONE_SECOND;
    }

    static formatTime(time) {
        let minutes = Math.floor(time / ONE_SECOND / 60);
        let seconds = time / ONE_SECOND % 60;
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        return `${minutes}:${seconds}`
    }
}

function playAudio(src) {
    let audio = new Audio(src);
    audio.load();
    audio.play();
}

function setup() {
    console.log('setup ("%s")', location.hash);
    let clock = new Clock();
    let time = Clock.parseSeconds(location.hash.slice(1) || '10:00');
    clock.start(time);
}

window.onload = setup;