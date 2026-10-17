// The first entry in each list is the default look.
// Theme colors live at the top of style.css.
const OPTIONS = {
  theme: ['muslin', 'indigo', 'madder', 'tweed'],
  align: ['center', 'left', 'right'],
};

function getOption(key) {
  const value = document.documentElement.dataset[key];
  return OPTIONS[key].includes(value) ? value : OPTIONS[key][0];
}

function setOption(key, value) {
  const root = document.documentElement;
  const isDefault = value === OPTIONS[key][0];

  if (isDefault) {
    delete root.dataset[key];
  } else {
    root.dataset[key] = value;
  }

  try {
    if (isDefault) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  } catch (e) {
    console.error(e);
  }

  updateControls();
}

function cycle(key) {
  const list = OPTIONS[key];
  setOption(key, list[(list.indexOf(getOption(key)) + 1) % list.length]);
}

function updateControls() {
  const theme = getOption('theme');
  document.querySelectorAll('.swatch').forEach((swatch) => {
    swatch.setAttribute('aria-pressed', swatch.dataset.swatch === theme);
  });
  document.querySelectorAll('[data-swatch-name]').forEach((el) => {
    el.textContent = theme;
  });
  document.querySelectorAll('[data-cycle="align"]').forEach((button) => {
    button.textContent = `align: ${getOption('align')}`;
  });
}

// Color swatches: one button per theme.
document.querySelectorAll('[data-swatches]').forEach((group) => {
  OPTIONS.theme.forEach((name) => {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = 'swatch';
    swatch.dataset.swatch = name;
    swatch.dataset.theme = name; // gives the swatch that theme's colors
    swatch.title = name;
    swatch.setAttribute('aria-label', name);
    swatch.addEventListener('click', () => setOption('theme', name));
    group.appendChild(swatch);
  });
});

document.querySelectorAll('[data-cycle]').forEach((button) => {
  button.addEventListener('click', () => cycle(button.dataset.cycle));
});

// Work page: show a project's image while its link is hovered or focused.
const preview = document.querySelector('[data-preview-panel]');
if (preview) {
  const img = preview.querySelector('img');
  document.querySelectorAll('[data-preview]').forEach((link) => {
    const show = () => {
      img.src = link.dataset.preview;
      preview.hidden = false;
    };
    const hide = () => {
      preview.hidden = true;
    };
    link.addEventListener('mouseenter', show);
    link.addEventListener('focus', show);
    link.addEventListener('mouseleave', hide);
    link.addEventListener('blur', hide);
  });
}

updateControls();
