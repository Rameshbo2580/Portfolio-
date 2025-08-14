// document.querySelectorAll('.progress').forEach(bar => {
//   const percent = bar.dataset.percent;
//   bar.style.width = percent + '%';
//   const span = bar.querySelector('span');
//   let count = 0;
//   const interval = setInterval(() => {
//     if(count > percent) clearInterval(interval);
//     span.textContent = count + '%';
//     count++;
//   }, 15);
// });

// // Animate circular technical skills
// document.querySelectorAll('.circular-progress').forEach(item => {
//   const circle = item.querySelector('.circle');
//   const number = item.querySelector('.number');
//   const percent = item.dataset.percent;
//   const color = item.dataset.color;
//   let current = 0;
//   const interval = setInterval(() => {
//     if(current > percent) clearInterval(interval);
//     number.textContent = current + '%';
//     const angle = (current / 100) * 360;
//     circle.style.background = `conic-gradient(${color} ${angle}deg, #e0e0e0 0deg)`;
//     current++;
//   }, 15);
// });