const OPTIONS = {
  theme: ['default', 'rust', 'rose', 'moss', 'sky'],
  align: ['center', 'left', 'right'],
};

function cycle(key) {
  const list = OPTIONS[key];
  const root = document.documentElement;
  const current = root.dataset[key] || list[0];
  const next = list[(list.indexOf(current) + 1) % list.length];

  if (next === list[0]) {
    delete root.dataset[key];
  } else {
    root.dataset[key] = next;
  }

  try {
    if (next === list[0]) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, next);
    }
  } catch (e) { 
      console.error(e);
   }
}

document.querySelectorAll('[data-cycle]').forEach((button) => {
  button.addEventListener('click', () => cycle(button.dataset.cycle));
});
