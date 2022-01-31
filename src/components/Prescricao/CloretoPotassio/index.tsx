import { HStack, Button, Text } from '@chakra-ui/react';
import { EletrolitoData, MainContext } from '@/context/MainContext';
import { useContext } from 'react';

interface CloretoPotassioProps {
  KCl: EletrolitoData;
  setKCl: React.Dispatch<React.SetStateAction<EletrolitoData>>;
}

export const CloretoPotassio = ({ KCl, setKCl }: CloretoPotassioProps) => {
  const nulo = {
    formula: <></>,
    nome: '',
    concentracao: '',
    mEq: 0,
  };
  const { farmacia } = useContext(MainContext);
  return (
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
  );
};
