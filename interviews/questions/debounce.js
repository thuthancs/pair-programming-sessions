function debounce(func, wait) {
    let timer;
    let lastArgs;
    let lastContext;
    
    const debounced = function(...args) {
        lastContext = this;
        lastArgs = args;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(lastContext, lastArgs);
        }, wait);
    };
    
    debounced.flush = () => {
        if (timer) {
            clearTimeout(timer);
            func.apply(lastContext, lastArgs);
            timer = null;
        }
    };
    
    debounced.cancel = () => {
        clearTimeout(timer);
        timer = null;
    };
    
    return debounced;
}