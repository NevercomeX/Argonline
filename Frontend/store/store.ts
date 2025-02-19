// store.ts
import { createStore, Store } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// 1. Define la interfaz del estado
export interface AppState {
  contador: number;
}

// 2. Estado inicial
const initialState: AppState = {
  contador: 0,
};

// 3. Define el tipo para las acciones
type Action =
  | { type: 'INCREMENTAR' }
  | { type: 'DECREMENTAR' }
  // La acción HYDRATE se usa para fusionar el estado del servidor y del cliente
  | { type: typeof HYDRATE; payload: AppState };

// 4. Crea el reducer
const reducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case HYDRATE:
      // Combina el estado del servidor con el estado actual del cliente
      return { ...state, ...action.payload };
    case 'INCREMENTAR':
      return { ...state, contador: state.contador + 1 };
    case 'DECREMENTAR':
      return { ...state, contador: state.contador - 1 };
    default:
      return state;
  }
};

// 5. Función para crear el store
const makeStore = (): Store<AppState> => createStore(reducer);

// 6. Crea el wrapper para Next.js
export const wrapper = createWrapper<Store<AppState>>(makeStore, { debug: true });
