import { MainContext } from '@/context/MainContext';
import {
  Heading,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Card } from '../Card';

export const DemandaEletrolitica = () => {
  const { formatFloat, dmdEletrolitica } = useContext(MainContext);

  return (
    <Card maxW="3xl" mx="auto" w="100%">
      <Heading as="h2" mb={6}>
        Demanda Eletrolítica
      </Heading>
      <strong>Em 24 horas:</strong>
      <StatGroup textAlign="center">
        <Stat px={4} m={2} rounded={{ md: 'lg' }} shadow="base">
          <StatLabel>Na+</StatLabel>
          <StatNumber>{formatFloat(dmdEletrolitica.na)}</StatNumber>
          <StatHelpText>mEq/dia</StatHelpText>
        </Stat>
        <Stat px={4} m={2} rounded={{ md: 'lg' }} shadow="base">
          <StatLabel>Cl-</StatLabel>
          <StatNumber>{formatFloat(dmdEletrolitica.cl)}</StatNumber>
          <StatHelpText>mEq/dia</StatHelpText>
        </Stat>
        <Stat px={4} m={2} rounded={{ md: 'lg' }} shadow="base">
          <StatLabel>K+</StatLabel>
          <StatNumber>{formatFloat(dmdEletrolitica.k)}</StatNumber>
          <StatHelpText>mEq/dia</StatHelpText>
        </Stat>
        <Stat px={4} m={2} rounded={{ md: 'lg' }} shadow="base">
          <StatLabel>Ca2+</StatLabel>
          <StatNumber>{formatFloat(dmdEletrolitica.ca)}</StatNumber>
          <StatHelpText>mEq/dia</StatHelpText>
        </Stat>
        <Stat px={4} m={2} rounded={{ md: 'lg' }} shadow="base">
          <StatLabel>Mg2+</StatLabel>
          <StatNumber>{formatFloat(dmdEletrolitica.mg)}</StatNumber>
          <StatHelpText>mEq/dia</StatHelpText>
        </Stat>
      </StatGroup>
    </Card>
  );
};
