import React from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export enum Orientation {
  portrait,
  landspcape,
}

interface IScreenContext {
  orientation: Orientation;
  width: number;
  height: number;
}

const initialState = {
  orientation: Orientation.portrait,
  width: 0,
  height: 0,
};

const ScreenContext = React.createContext<IScreenContext>(initialState);

const parseData = (screen: ScaledSize) => ({
  width: screen.width,
  height: screen.height,
  orientation:
    screen.width < screen.height
      ? Orientation.portrait
      : Orientation.landspcape,
});

export const ScreenContextProvider: React.FunctionComponent = ({
  children,
}) => {
  const [value, setValue] = React.useState(initialState);

  React.useEffect(() => {
    const changeCallback = () => setValue(parseData(Dimensions.get('window')));
    changeCallback();
    Dimensions.addEventListener('change', changeCallback);
    return () => Dimensions.removeEventListener('change', changeCallback);
  }, []);

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
};

export const useScreenContext = () => React.useContext(ScreenContext);
