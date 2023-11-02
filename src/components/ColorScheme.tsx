import {
  makeImageFromView,
  Image,
  Canvas,
  vec,
  ImageShader,
  Circle,
  dist,
} from '@shopify/react-native-skia';
import type { SkImage } from '@shopify/react-native-skia';
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { Appearance, Dimensions, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSharedValue, withTiming } from 'react-native-reanimated';

type TColorSchemeContext = {
  toggle: (x: number, y: number) => void;
  active: boolean;
};

const ColorSchemeContext = createContext<TColorSchemeContext>({
  toggle: () => {},
  active: false,
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
  const theme = useTheme();
  const [overlay1, setOverlay1] = useState<SkImage | null>(null);
  const [overlay2, setOverlay2] = useState<SkImage | null>(null);
  const r = useSharedValue(0);
  const circle = useSharedValue({ x: 0, y: 0, r: 0 });
  const [active, setActive] = useState(false);

  const toggle = useCallback(
    async (x: number, y: number) => {
      const maxRadius = Math.max(
        ...corners.map(corner => dist(corner, { x, y })),
      );
      circle.value = { x, y, r: maxRadius };

      const _overlay1 = await makeImageFromView(ref);
      setOverlay1(_overlay1);
      setActive(true);

      await wait(1);
      Appearance.setColorScheme(theme.dark ? 'light' : 'dark');

      await wait(700);
      const _overlay2 = await makeImageFromView(ref);
      setOverlay2(_overlay2);

      await wait(1);
      const duration = 550;
      r.value = withTiming(maxRadius, { duration });

      await wait(duration);
      setOverlay1(null);
      setOverlay2(null);
      setActive(false);
      r.value = 0;
    },
    [circle, theme.dark, r],
  );

  return (
    <View className="flex-1">
      <View className="flex-1" ref={ref} collapsable={false}>
        <ColorSchemeContext.Provider value={{ toggle, active }}>
          {children}
        </ColorSchemeContext.Provider>
      </View>

      {overlay1 && (
        <Canvas style={StyleSheet.absoluteFill} pointerEvents={'none'}>
          <Image image={overlay1} x={0} y={0} width={width} height={height} />
          {overlay2 && (
            <Circle c={circle} r={r} color={'cyan'}>
              <ImageShader
                image={overlay2}
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
