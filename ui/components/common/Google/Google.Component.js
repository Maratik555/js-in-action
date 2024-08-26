export function GoogleComponent() {
  const element = document.createElement('img');

  render(element);

  return {element};
}

async function render(element) {
  element.src = 'assets/images/google.png'
}
