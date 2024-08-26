import {getGooglePosition, getPlayerPosition, subscribe, unsubscribe} from '../../../../core/state-manager.js';
import {GoogleComponent} from '../../common/Google/Google.component.js';
import {PlayerComponent} from '../../common/Player/Player.component.js';
import {EVENTS} from '../../../../core/constants.js';

export function CellComponent(x, y) {
  const element = document.createElement('td');
  const localState = { renderVersion: 0 };

  let observer = e => {
    if ([EVENTS.GOOGLE_JUMPED, EVENTS.PLAYER1_MOVED, EVENTS.PLAYER2_MOVED].every(name => name !== e.name)) return;

    if (e.payload.oldPosition.x === x && e.payload.oldPosition.y === y) {
      render(element, x, y, localState)
    }
    if (e.payload.newPosition.x === x && e.payload.newPosition.y === y) {
      render(element, x, y, localState)
    }
  };

  subscribe(observer);

  render(element, x, y, localState);

  return {
    element, cleanup: () => {
      unsubscribe(observer)
    }
  };
}

async function render(element, x, y, localState) {
  localState.renderVersion++;
  const currentRenderVersion = localState.renderVersion;

  element.innerHTML = '';

  const googlePosition = await getGooglePosition();
  const player1Position = await getPlayerPosition(1);
  const player2Position = await getPlayerPosition(2);

  if (currentRenderVersion < localState.renderVersion) return;

  if (googlePosition.x === x && googlePosition.y === y) {
    element.append(GoogleComponent().element)
  }
  if (player1Position.x === x && player1Position.y === y) {
    element.append(PlayerComponent(1).element)
  }
  if (player2Position.x === x && player2Position.y === y) {
    element.append(PlayerComponent(2).element)
  }
}
