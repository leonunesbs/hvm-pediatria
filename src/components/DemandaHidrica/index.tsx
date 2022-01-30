import { MainContext } from '@/context/MainContext';
import {
  Divider,
  Heading,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Card } from '../Card';

export const DemandaHidrica = () => {
  const { dmdH2OPorHora, dmdH2OPorDia, formatFloat } = useContext(MainContext);
  return (
    <Card maxW="3xl" mx="auto" w="100%">
      <Heading as="h2" mb={6}>
        Demanda Hídrica
      </Heading>
      <strong>Em 1 hora:</strong>
      <StatGroup>
        <Stat px={4} m={2} rounded={{ md: 'lg' }} shadow="base">
          <StatNumber>{formatFloat((dmdH2OPorHora * 20) / 60)}</StatNumber>
          <StatHelpText>gotas/min</StatHelpText>
        </Stat>
        <Stat px={4} m={2} rounded={{ md: 'lg' }} shadow="base">
          <StatNumber>{formatFloat((dmdH2OPorHora * 60) / 60)}</StatNumber>
          <StatHelpText>microgotas/min</StatHelpText>
        </Stat>
        <Stat px={4} m={2} rounded={{ md: 'lg' }} shadow="base">
          <StatNumber>{formatFloat(dmdH2OPorHora)}</StatNumber>
          <StatHelpText>mL/hora</StatHelpText>
        </Stat>
      </StatGroup>
      <Divider my={4} />
      <strong>Em 24 horas:</strong>

      <StatGroup>
        <Stat px={4} m={2} rounded={{ md: 'lg' }} shadow="base">
          <StatLabel>Total 24h</StatLabel>
          <StatNumber>{formatFloat(dmdH2OPorDia)}</StatNumber>
          <StatHelpText>mL/dia</StatHelpText>
        </Stat>
        <Stat px={4} m={2} rounded={{ md: 'lg' }} shadow="base">
          <StatLabel>Total por hora</StatLabel>
          <StatNumber>{formatFloat(dmdH2OPorDia / 24)}</StatNumber>
          <StatHelpText>mL/hora</StatHelpText>
        </Stat>
      </StatGroup>
    </Card>
  );
};
