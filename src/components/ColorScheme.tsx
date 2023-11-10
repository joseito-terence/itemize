import {
  makeImageFromView,
  Image,
  Canvas,
  vec,
  ImageShader,
  Circle,
  dist,
} from '@shopify/react-native-skia';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  useColorScheme as useRnColorScheme,
} from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setTransitionState, toggleTheme } from '../redux/themeSlice';

type TColorSchemeContext = {
  toggle: (x: number, y: number) => void;
};

const ColorSchemeContext = createContext<TColorSchemeContext>({
  toggle: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const useColorScheme = () => useContext(ColorSchemeContext);

const { width, height } = Dimensions.get('window');
const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];

const wait = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

const ColorSchemeProvider = ({ children }: Props) => {
  const ref = useRef(null);
  const r = useSharedValue(0);
  const circle = useSharedValue({ x: 0, y: 0, r: 0 });
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme);
  const scheme = useRnColorScheme();

  useEffect(() => {
    if (theme.isDark !== (scheme === 'dark')) {
      dispatch(toggleTheme());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheme]);

  const toggle = useCallback(
    async (x: number, y: number) => {
      if (theme.active) {
        return;
      }

      const maxRadius = Math.max(
        ...corners.map(corner => dist(corner, { x, y })),
      );
      circle.value = { x, y, r: maxRadius };

      const _overlay1 = await makeImageFromView(ref);
      dispatch(
        setTransitionState({
          overlay1: _overlay1,
          overlay2: null,
          active: true,
        }),
      );

      await wait(1);
      dispatch(toggleTheme());

      await wait(60);
      const _overlay2 = await makeImageFromView(ref);
      dispatch(
        setTransitionState({
          overlay1: _overlay1,
          overlay2: _overlay2,
          active: true,
        }),
      );

      await wait(1);
      const duration = 550;
      r.value = withTiming(maxRadius, { duration });

      await wait(duration);
      dispatch(
        setTransitionState({
          overlay1: null,
          overlay2: null,
          active: false,
        }),
      );
      r.value = 0;
    },
    [circle, dispatch, r, theme.active],
  );

  return (
    <View className="flex-1">
      <View className="flex-1" ref={ref} collapsable={false}>
        <ColorSchemeContext.Provider value={{ toggle }}>
          {children}
        </ColorSchemeContext.Provider>
      </View>

      {theme.overlay1 && (
        <Canvas style={StyleSheet.absoluteFill} pointerEvents={'none'}>
          <Image
            image={theme.overlay1}
            x={0}
            y={0}
            width={width}
            height={height}
          />
          {theme.overlay2 && (
            <Circle c={circle} r={r} color={'cyan'}>
              <ImageShader
                image={theme.overlay2}
                x={0}
                y={0}
                width={width}
                height={height}
                fit="cover"
              />
            </Circle>
          )}
        </Canvas>
      )}
    </View>
  );
};

export default ColorSchemeProvider;
