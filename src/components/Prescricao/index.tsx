import { MainContext } from '@/context/MainContext';
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Card } from '../Card';

export const Prescricao: React.FunctionComponent<any> = () => {
  const { farmacia, formatFloat, dmdH2OPorDia, dmdEletrolitica } =
    useContext(MainContext);
  const [KCl, setKCl] = useState(farmacia.KCl10);
  const [NaCl, setNaCl] = useState(farmacia.NaCl10);
  const [nEtapas, setNEtapas] = useState(4);

  const [vasao, setVasao] = useState('gotas/min');
  return (
    <Card maxW="3xl" mx="auto" w="100%">
      <Heading as="h2" mb={6}>
        Prescrição
      </Heading>
      <Divider my={4} />
      <Stack mb={4}>
        <FormControl>
          <FormLabel>Etapas</FormLabel>
          <Slider
            defaultValue={4}
            min={1}
            max={6}
            step={1}
            onChange={(v) => setNEtapas(v)}
            mb={10}
          >
            <SliderMark value={1} mt={4} fontSize="sm">
              1
            </SliderMark>
            <SliderMark value={2} mt={4} ml="-1.5" fontSize="sm">
              2
            </SliderMark>
            <SliderMark value={3} mt={4} ml="-1.5" fontSize="sm">
              3
            </SliderMark>
            <SliderMark value={4} mt={4} ml="-1" fontSize="sm">
              4
            </SliderMark>
            <SliderMark value={5} mt={4} ml="-1" fontSize="sm">
              5
            </SliderMark>
            <SliderMark value={6} mt={4} ml="-1" fontSize="sm">
              6
            </SliderMark>
            <SliderTrack bg="green.100">
              <SliderFilledTrack bg="green.500" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </FormControl>
        <HStack>
          <Text>Cloreto de sódio:</Text>
          <HStack>
            <Button
              size="xs"
              colorScheme={NaCl === farmacia.NaCl09 ? 'green' : 'gray'}
              onClick={() => setNaCl(farmacia.NaCl09)}
            >
              NaCl 0,9%
            </Button>
            <Button
              size="xs"
              colorScheme={NaCl === farmacia.NaCl10 ? 'green' : 'gray'}
              onClick={() => setNaCl(farmacia.NaCl10)}
            >
              NaCl 10%
            </Button>
            <Button
              size="xs"
              colorScheme={NaCl === farmacia.NaCl20 ? 'green' : 'gray'}
              onClick={() => setNaCl(farmacia.NaCl20)}
            >
              NaCl 20%
            </Button>
          </HStack>
        </HStack>
        <HStack>
          <Text>Cloreto de potássio:</Text>
          <HStack>
            <Button
              size="xs"
              colorScheme={KCl === farmacia.KCl10 ? 'green' : 'gray'}
              onClick={() => setKCl(farmacia.KCl10)}
            >
              KCl 10%
            </Button>
            <Button
              size="xs"
              colorScheme={KCl === farmacia.KCl19 ? 'green' : 'gray'}
              onClick={() => setKCl(farmacia.KCl19)}
            >
              KCl 19.1%
            </Button>
          </HStack>
        </HStack>
        <Divider my={4} />

        <Table variant="simple">
          <TableCaption>Uso exclusivamente acadêmico</TableCaption>
          <Thead>
            <Tr>
              <Th colSpan={2}>HVM p/ 24h em {nEtapas} etapas</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>SG 5%</Td>
              <Td>
                {formatFloat(
                  (dmdH2OPorDia -
                    (dmdEletrolitica.na / NaCl.mEq / nEtapas +
                      dmdEletrolitica.k / KCl.mEq / nEtapas)) /
                    nEtapas,
                )}{' '}
                mL
              </Td>
            </Tr>
            <Tr>
              <Td>
                {NaCl.formula} {NaCl.concentracao}
              </Td>
              <Td>{formatFloat(dmdEletrolitica.na / NaCl.mEq / nEtapas)} mL</Td>
            </Tr>
            <Tr>
              <Td>
                {KCl.formula} {KCl.concentracao}
              </Td>
              <Td>{formatFloat(dmdEletrolitica.k / KCl.mEq / nEtapas)} mL</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>VT {formatFloat(dmdH2OPorDia / nEtapas)} mL - EV</Th>
              {vasao === 'gotas/min' && (
                <Th>{formatFloat((dmdH2OPorDia * 20) / 24 / 60)} gotas/min</Th>
              )}
              {vasao === 'microgotas/min' && (
                <Th>
                  {formatFloat((dmdH2OPorDia * 60) / 24 / 60)} microgotas/min
                </Th>
              )}
              {vasao === 'mL/hora' && (
                <Th>{formatFloat(dmdH2OPorDia / 24)} mL/hora</Th>
              )}
            </Tr>
            <Tr>
              <Th>
                <HStack>
                  <Button
                    size="xs"
                    colorScheme={vasao === 'gotas/min' ? 'green' : 'gray'}
                    onClick={() => setVasao('gotas/min')}
                  >
                    gotas/min
                  </Button>
                  <Button
                    size="xs"
                    colorScheme={vasao === 'microgotas/min' ? 'green' : 'gray'}
                    onClick={() => setVasao('microgotas/min')}
                  >
                    microgotas/min
                  </Button>
                  <Button
                    size="xs"
                    colorScheme={vasao === 'mL/hora' ? 'green' : 'gray'}
                    onClick={() => setVasao('mL/hora')}
                  >
                    mL/hora
                  </Button>
                </HStack>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </Stack>
    </Card>
  );
};
