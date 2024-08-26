import {ResultPanelComponent} from './resultPanel/ResultPanel.component.js';
import {SettingsComponent} from './settings/Settings.component.js';
import {GridComponent} from './grid/Grid.component.js';
import {LoseComponent} from './Lose/Lose.component.js';
import {getGameStatus, subscribe} from '../../core/state-manager.js';
import {GAME_STATUSES} from '../../core/constants.js';
import {StartComponent} from './Start/Start.component.js';
import {WinComponent} from './Win/Win.component.js';
import {AudioComponent} from './Audio/Audio.component.js';

export function AppComponent() {
  const localState = {prevGameStatus: null, cleanupFunc: []};
  const element = document.createElement('div');

  const audioComponent = AudioComponent();


  subscribe(() => render(element, localState));

  render(element, localState);

  return {element}
}

async function render(element, localState) {

  const gameStatus = await getGameStatus();
  if(localState.prevGameStatus === gameStatus) return;
  localState.prevGameStatus = gameStatus;

  localState.cleanupFunc.forEach(cleanup => cleanup());

  localState.cleanupFunc = [];

  element.innerHTML = '';
  switch (gameStatus) {
    case GAME_STATUSES.SETTINGS: {
      const settingsComponent = SettingsComponent();
      const startComponent = StartComponent();
      element.append(settingsComponent.element, startComponent.element);
      break;
    }
    case GAME_STATUSES.IN_PROGRESS:
      const settingsComponent = SettingsComponent();
      const resultComponent = ResultPanelComponent();
      localState.cleanupFunc.push(resultComponent.cleanup);
      const gridComponent = GridComponent();
      localState.cleanupFunc.push(gridComponent.cleanup);
      element.append(resultComponent.element, gridComponent.element, settingsComponent.element);
      break;
    case GAME_STATUSES.LOSE:
      const loseComponent = LoseComponent();
      element.append(loseComponent.element);
      break;
    case GAME_STATUSES.WIN:
      const winComponent = WinComponent();
      element.append(winComponent.element);
      break;
    default:
      throw new Error('Invalid game status');
  }
}