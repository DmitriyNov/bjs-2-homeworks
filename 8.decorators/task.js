function cachingDecoratorNew(func) {
  let cache = [];
  return (...args) => {
    const hash = args.join(",");
    if(cache.some((item) => {
      return item.hash === hash;
    })) {
      let index = cache.findIndex((item) => {
        return item.hash === hash;
      });

      console.log("Из кэша: " + cache[index].value);
      return "Из кэша: " + cache[index].value;
    }
    const result = func(...args);
    if (cache.length >= 5) {
      cache.shift();
    }
    cache.push({hash: hash, value: result});
    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  }
}


function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  function wraper(...args) {
    wraper.allCount += 1;
    if(timeoutId) {
      clearTimeout(timeoutId);
    }
    if(timeoutId === null) {
      timeoutId = setTimeout(() => {
        wraper.count += 1;
        return func(...args);
      }, 0);
    }
    timeoutId = setTimeout(() => {
      wraper.count += 1;
      return func(...args);
    }, delay);
  }
  wraper.count = 0;
  wraper.allCount = 0;
  return wraper;
}