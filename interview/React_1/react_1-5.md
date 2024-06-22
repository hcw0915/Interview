## 說明關於計數器 this.setState({ count: prev.count + 1 }) \* 3 的狀況與修正

- 這是一個加法的計數器目標應該是希望點擊一次 可以+3, 只是會遇到不預期問題.
- 因為 snapshot 緣故 在點擊 handleAddCount 的當下 state = {count: 0},
- 要改善需要改使用 previous State 去獲取更新值
- `this.setState( prev => ({ count: prev.count + 1 }))`
  \*/
