import { EletrolitoData, MainContext } from '@/context/MainContext';
import { HStack, Button, Text } from '@chakra-ui/react';
import { useContext } from 'react';

interface GlicoseProps {
  Glicose: EletrolitoData;
  setGlicose: React.Dispatch<React.SetStateAction<EletrolitoData>>;
}

export const Glicose = ({ Glicose, setGlicose }: GlicoseProps) => {
  const nulo = {
    formula: <></>,
    nome: '',
    concentracao: '',
    mEq: 0,
  };
  const { farmacia } = useContext(MainContext);
  return (
    <HStack>
      <Text>Glicose:</Text>
      <HStack wrap="wrap">
        <Button
          size="xs"
          colorScheme={Glicose === farmacia.Glicose25 ? 'green' : 'gray'}
          onClick={() => setGlicose(farmacia.Glicose25)}
        >
          {farmacia.Glicose25.concentracao}
        </Button>
        <Button
          size="xs"
          colorScheme={Glicose === farmacia.Glicose50 ? 'green' : 'gray'}
          onClick={() => setGlicose(farmacia.Glicose50)}
        >
          {farmacia.Glicose50.concentracao}
        </Button>

        <Button size="xs" colorScheme="yellow" onClick={() => setGlicose(nulo)}>
          Remover
        </Button>
      </HStack>
    </HStack>
  );
};
