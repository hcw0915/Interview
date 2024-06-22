// 實作 react 格式的 debounce

const debounce = (callback, duration = 500) => {
  let timer;
  return (...arg) => {
    timer = setTimeout(() => {
      callback(...arg);
      clearTimeout(timer);
      timer = null;
    }, duration);
  };
};

const ajax = (value) =>
  new Promise((resolve) => {
    setTimeout(() => {
      // 針對 value 做處理 (e.g. header / body / query ...)
      console.log(value);
      resolve();
    }, 1000);
  });

const SearchBox = () => {
  const debouncedAjax = debounce(ajax, 500);

  const handleOnChange = (e) => {
    const value = e.target.value;
    debouncedAjax(value);
  };

  return <input type="search" name="p" onChange={handleOnChange} />;
};
