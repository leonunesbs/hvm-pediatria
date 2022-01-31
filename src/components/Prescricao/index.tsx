import { Divider, Heading, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Card } from '../Card';
import { CloretoPotassio } from './CloretoPotassio';
import { EtapasSlider } from './EtapasSlider';
import { Glicose } from './Glicose';
import { GluconatoCalcio } from './GluconatoCalcio';
import { CloretoSodio } from './NaCl';
import PrescricaoTable from './PrescricaoTable';
import SulfatoMagnesio from './SulfatoMagnesio';

export const Prescricao: React.FunctionComponent<any> = () => {
  const nulo = {
    formula: <></>,
    nome: '',
    concentracao: '',
    mEq: 0,
  };

  const [kCl, setKCl] = useState(nulo);
  const [naCl, setNaCl] = useState(nulo);
  const [gluconato, setGluconato] = useState(nulo);
  const [glicose, setGlicose] = useState(nulo);
  const [mgSo4, setMgSo4] = useState(nulo);
  const [nEtapas, setNEtapas] = useState(4);

  useEffect(() => {
    nEtapas > 4 && setNEtapas(6);
  }, [nEtapas]);

  return (
    <Card maxW="3xl" mx="auto" w="100%">
      <Heading as="h2">Prescrição</Heading>
      <Divider mb={4} />
      <Stack mb={4}>
        <EtapasSlider setNEtapas={setNEtapas} />
        {/* <Glicose Glicose={glicose} setGlicose={setGlicose} /> */}
        <CloretoSodio NaCl={naCl} setNaCl={setNaCl} />
        <CloretoPotassio KCl={kCl} setKCl={setKCl} />
        <GluconatoCalcio Gluconato={gluconato} setGluconato={setGluconato} />
        <SulfatoMagnesio MgSo4={mgSo4} setMgSo4={setMgSo4} />
        <Divider my={4} />
        <PrescricaoTable
          gluconato={gluconato}
          glicose={glicose}
          kCl={kCl}
          mgSo4={mgSo4}
          naCl={naCl}
          nEtapas={nEtapas}
        />
      </Stack>
    </Card>
  );
};
