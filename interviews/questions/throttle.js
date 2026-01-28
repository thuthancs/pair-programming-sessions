export default function throttle(func, wait) {
    let shouldThrottle = false;

    return function(...args) {
        const context = this;

        if (shouldThrottle) {
            return;
        }

        func.apply(context, args); // execute immediately
        shouldThrottle = true;

        setTimeout(() => {
            shouldThrottle = false;
        }, wait)
    }
}