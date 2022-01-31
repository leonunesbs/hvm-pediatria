import {
  Box,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { SetStateAction } from 'react';

interface EtapasSliderProps {
  setNEtapas: (value: SetStateAction<number>) => void;
}

export const EtapasSlider = ({ setNEtapas }: EtapasSliderProps) => {
  return (
    <FormControl>
      <FormLabel>Etapas</FormLabel>
      <Slider
        defaultValue={4}
        min={1}
        max={5}
        step={1}
        onChange={(v) => setNEtapas(v)}
        mb={16}
        textAlign="center"
        fontSize="xs"
      >
        <SliderMark value={1} mt={4} ml="-5">
          <Box>
            <Text>1</Text>
            <Text>24/24h</Text>
          </Box>
        </SliderMark>
        <SliderMark value={2} mt={4} ml="-5">
          <Box>
            <Text>2</Text>
            <Text>12/12h</Text>
          </Box>
        </SliderMark>
        <SliderMark value={3} mt={4} ml="-3.5">
          <Box>
            <Text>3</Text>
            <Text>8/8h</Text>
          </Box>
        </SliderMark>
        <SliderMark value={4} mt={4} ml="-3.5">
          <Box>
            <Text>4</Text>
            <Text>6/6h</Text>
          </Box>
        </SliderMark>
        <SliderMark value={5} mt={4} ml="-3.5">
          <Box>
            <Text>6</Text>
            <Text>4/4h</Text>
          </Box>
        </SliderMark>
        <SliderTrack bg="green.100">
          <SliderFilledTrack bg="green.500" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
    </FormControl>
  );
};
