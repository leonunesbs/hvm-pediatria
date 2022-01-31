import { EletrolitoData, MainContext } from '@/context/MainContext';
import { HStack, Button, Text } from '@chakra-ui/react';
import { useContext } from 'react';

interface GluconatoCalcioProps {
  Gluconato: EletrolitoData;
  setGluconato: React.Dispatch<React.SetStateAction<EletrolitoData>>;
}

export const GluconatoCalcio = ({
  Gluconato,
  setGluconato,
}: GluconatoCalcioProps) => {
  const nulo = {
    formula: <></>,
    nome: '',
    concentracao: '',
    mEq: 0,
  };
  const { farmacia } = useContext(MainContext);
  return (
    <HStack wrap="wrap">
      <Text>Gluconato de cálcio:</Text>
      <HStack>
        <Button
          size="xs"
          colorScheme={Gluconato === farmacia.Gluconato10 ? 'green' : 'gray'}
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
  );
};
