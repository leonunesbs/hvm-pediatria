import { EletrolitoData, MainContext } from '@/context/MainContext';
import { Button, HStack, Text } from '@chakra-ui/react';
import { useContext } from 'react';

interface SulfatoMagnesioProps {
  MgSo4: EletrolitoData;
  setMgSo4: React.Dispatch<React.SetStateAction<EletrolitoData>>;
}

function SulfatoMagnesio({ MgSo4, setMgSo4 }: SulfatoMagnesioProps) {
  const nulo = {
    formula: <></>,
    nome: '',
    concentracao: '',
    mEq: 0,
  };
  const { farmacia } = useContext(MainContext);
  return (
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
        <Button size="xs" colorScheme="yellow" onClick={() => setMgSo4(nulo)}>
          Remover
        </Button>
      </HStack>
    </HStack>
  );
}

export default SulfatoMagnesio;
