// 斐波那契数列实现

// 迭代实现（推荐：O(n)时间复杂度，O(1)空间复杂度）
function fibonacci(n: number): number {
  if (n <= 0) { return 0; }
  if (n === 1) { return 1; }
  
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}

// 生成器实现（适合按需获取序列）
function* fibonacciGenerator(): Generator<number> {
  let prev = 0;
  let curr = 1;
  yield prev;
  yield curr;
  
  while (true) {
    const next = prev + curr;
    yield next;
    prev = curr;
    curr = next;
  }
}

// 示例用法
(function main() {
  console.log('迭代法 fib(10):', fibonacci(10)); // 55

  const gen = fibonacciGenerator();
  console.log('生成器前10项:');
  for (let i = 0; i < 10; i++) {
    console.log(gen.next().value);
  }
})();
 * 斐波那契数列实现
 */

// 迭代实现（推荐：O(n)时间复杂度，O(1)空间复杂度）
export function fibonacci(n: number): number {
  if (n <= 0) return 0
  if (n === 1) return 1
  
  let prev = 0
  let curr = 1
  for (let i = 2; i <= n; i++) {
    const next = prev + curr
    prev = curr
    curr = next
  }
  return curr
}

// 生成器实现（适合按需获取序列）
export function* fibonacciGenerator(): Generator<number> {
  let prev = 0
  let curr = 1
  yield prev
  yield curr
  
  while (true) {
    const next = prev + curr
    yield next
    prev = curr
    curr = next
  }
}

// 示例用法
console.log('迭代法 fib(10):', fibonacci(10)) // 55

const gen = fibonacciGenerator()
console.log('生成器前10项:')
for (let i = 0; i < 10; i++) {
  console.log(gen.next().value)
}