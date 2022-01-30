import { MainContext } from '@/context/MainContext';
import {
  Box,
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
import { useContext, useEffect, useState } from 'react';
import { Card } from '../Card';

export const Prescricao: React.FunctionComponent<any> = () => {
  const nulo = {
    formula: <></>,
    nome: '',
    concentracao: '',
    mEq: 0,
  };
  const { farmacia, formatFloat, dmdH2OPorDia, dmdEletrolitica } =
    useContext(MainContext);
  const [KCl, setKCl] = useState(nulo);
  const [NaCl, setNaCl] = useState(nulo);
  const [Gluconato, setGluconato] = useState(nulo);
  const [MgSo4, setMgSo4] = useState(nulo);
  const [nEtapas, setNEtapas] = useState(4);

  useEffect(() => {
    nEtapas > 4 && setNEtapas(6);
  }, [nEtapas]);

  const [vasao, setVasao] = useState('gotas/min');

  const getVolumeDeGlicose05 = () => {
    return (
      dmdH2OPorDia / nEtapas -
      (((NaCl.mEq != 0 && dmdEletrolitica.na / NaCl.mEq / nEtapas) || 0) +
        ((KCl.mEq != 0 && dmdEletrolitica.k / KCl.mEq / nEtapas) || 0) +
        ((Gluconato.mEq != 0 && dmdEletrolitica.ca / Gluconato.mEq / nEtapas) ||
          0) +
        ((MgSo4.mEq != 0 && dmdEletrolitica.mg / MgSo4.mEq / nEtapas) || 0))
    );
  };

  const getNaClTV = () => {
    return formatFloat(dmdEletrolitica.na / NaCl.mEq / nEtapas);
  };
  const getKClTV = () => {
    return formatFloat(dmdEletrolitica.k / KCl.mEq / nEtapas);
  };
  const getGluconatoTV = () => {
    return formatFloat(dmdEletrolitica.ca / Gluconato.mEq / nEtapas);
  };
  const getMagnesioTV = () => {
    return formatFloat(dmdEletrolitica.mg / MgSo4.mEq / nEtapas);
  };

  return (
    <Card maxW="3xl" mx="auto" w="100%">
      <Heading as="h2">Prescrição</Heading>
      <Divider mb={4} />
      <Stack mb={4}>
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
        <HStack>
          <Text>Cloreto de sódio:</Text>
          <HStack wrap="wrap">
            <Button
              size="xs"
              colorScheme={NaCl === farmacia.NaCl09 ? 'green' : 'gray'}
              onClick={() => setNaCl(farmacia.NaCl09)}
            >
              {farmacia.NaCl09.concentracao}
            </Button>
            <Button
              size="xs"
              colorScheme={NaCl === farmacia.NaCl10 ? 'green' : 'gray'}
              onClick={() => setNaCl(farmacia.NaCl10)}
            >
              {farmacia.NaCl10.concentracao}
            </Button>
            <Button
              size="xs"
              colorScheme={NaCl === farmacia.NaCl20 ? 'green' : 'gray'}
              onClick={() => setNaCl(farmacia.NaCl20)}
            >
              {farmacia.NaCl20.concentracao}
            </Button>
            <Button
              size="xs"
              colorScheme="yellow"
              onClick={() => setNaCl(nulo)}
            >
              Remover
            </Button>
          </HStack>
        </HStack>
        <HStack wrap="wrap">
          <Text>Cloreto de potássio:</Text>
          <HStack>
            <Button
              size="xs"
              colorScheme={KCl === farmacia.KCl10 ? 'green' : 'gray'}
              onClick={() => setKCl(farmacia.KCl10)}
            >
              {farmacia.KCl10.concentracao}
            </Button>
            <Button
              size="xs"
              colorScheme={KCl === farmacia.KCl19 ? 'green' : 'gray'}
              onClick={() => setKCl(farmacia.KCl19)}
            >
              {farmacia.KCl19.concentracao}
            </Button>
            <Button size="xs" colorScheme="yellow" onClick={() => setKCl(nulo)}>
              Remover
            </Button>
          </HStack>
        </HStack>
        <HStack wrap="wrap">
          <Text>Gluconato de cálcio:</Text>
          <HStack>
            <Button
              size="xs"
              colorScheme={
                Gluconato === farmacia.Gluconato10 ? 'green' : 'gray'
              }
              onClick={() => setGluconato(farmacia.Gluconato10)}
            >
              {farmacia.Gluconato10.concentracao}
            </Button>
            <Button
              size="xs"
              colorScheme="yellow"
              onClick={() => setGluconato(nulo)}
            >
              Remover
            </Button>
          </HStack>
        </HStack>
        <HStack wrap="wrap">
          <Text>Sulfato de magnésio:</Text>
          <HStack>
            <Button
              size="xs"
              colorScheme={MgSo4 === farmacia.MgSo410 ? 'green' : 'gray'}
              onClick={() => setMgSo4(farmacia.MgSo410)}
            >
              {farmacia.MgSo410.concentracao}
            </Button>
            <Button
              size="xs"
              colorScheme="yellow"
              onClick={() => setMgSo4(nulo)}
            >
              Remover
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
                {formatFloat(getVolumeDeGlicose05())} mL (
                {formatFloat(getVolumeDeGlicose05() * farmacia.Glicose05.mEq)}{' '}
                g)
              </Td>
            </Tr>
            {NaCl.mEq != 0 && (
              <Tr>
                <Td>
                  {NaCl.nome} {NaCl.concentracao}
                </Td>
                <Td>{getNaClTV()} mL</Td>
              </Tr>
            )}
            {KCl.mEq != 0 && (
              <Tr>
                <Td>
                  {KCl.formula} {KCl.concentracao}
                </Td>
                <Td>{getKClTV()} mL</Td>
              </Tr>
            )}
            {Gluconato.mEq != 0 && (
              <Tr>
                <Td>
                  {Gluconato.nome} {Gluconato.concentracao}
                </Td>
                <Td>{getGluconatoTV()} mL</Td>
              </Tr>
            )}
            {MgSo4.mEq != 0 && (
              <Tr>
                <Td>
                  {MgSo4.nome} {MgSo4.concentracao}
                </Td>
                <Td>{getMagnesioTV()} mL</Td>
              </Tr>
            )}
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
              <Th colSpan={2}>
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
