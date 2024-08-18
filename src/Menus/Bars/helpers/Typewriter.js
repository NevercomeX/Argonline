export function TypewriterEffect(text, delay = 100, pauseDuration = 1000) {
  let index = 0;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      process.stdout.write(text[index]);
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setTimeout(resolve, pauseDuration); // Pausa después de completar el texto
      }
    }, delay);
  });
}
