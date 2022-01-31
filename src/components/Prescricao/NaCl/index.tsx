import { EletrolitoData, MainContext } from '@/context/MainContext';
import { Button, HStack, Text } from '@chakra-ui/react';
import { useContext } from 'react';

interface NaClProps {
  NaCl: EletrolitoData;
  setNaCl: React.Dispatch<React.SetStateAction<EletrolitoData>>;
}

export const CloretoSodio = ({ NaCl, setNaCl }: NaClProps) => {
  const nulo = {
    formula: <></>,
    nome: '',
    concentracao: '',
    mEq: 0,
  };
  const { farmacia } = useContext(MainContext);
  return (
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
        <Button size="xs" colorScheme="yellow" onClick={() => setNaCl(nulo)}>
          Remover
        </Button>
      </HStack>
    </HStack>
  );
};
