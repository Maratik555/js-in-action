import {playAgain} from '../../../core/state-manager.js';

export function WinComponent() {
  const element = document.createElement('div');

  render(element);

  return {element};
}

async function render(element) {
  const titleElement = document.createElement('h1');
  titleElement.append('YOU WIN')

  element.append(titleElement);

  const button = document.createElement('button');
  button.append('PLAY AGAIN')
  button.addEventListener('click', () => {
    playAgain()
  })
  element.append(button)
}
