import { EletrolitoData, MainContext } from '@/context/MainContext';
import {
  Button,
  HStack,
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

interface PrescricaoTableProps {
  kCl: EletrolitoData;
  naCl: EletrolitoData;
  gluconato: EletrolitoData;
  mgSo4: EletrolitoData;
  glicose: EletrolitoData;
  nEtapas: number;
}

function PrescricaoTable({
  kCl,
  naCl,
  gluconato,
  mgSo4,
  nEtapas,
}: PrescricaoTableProps) {
  const { farmacia, formatFloat, dmdH2OPorDia, dmdEletrolitica } =
    useContext(MainContext);
  const [vasao, setVasao] = useState('gotas/min');

  const getVolumeDeGlicose05 = () => {
    return (
      dmdH2OPorDia -
      (((naCl.mEq != 0 && dmdEletrolitica.na / naCl.mEq / nEtapas) || 0) +
        ((kCl.mEq != 0 && dmdEletrolitica.k / kCl.mEq / nEtapas) || 0) +
        ((gluconato.mEq != 0 && dmdEletrolitica.ca / gluconato.mEq / nEtapas) ||
          0) +
        ((mgSo4.mEq != 0 && dmdEletrolitica.mg / mgSo4.mEq / nEtapas) || 0))
    );
  };
  const getVolumeDeGlicose05PorEtapa = () => {
    return (
      dmdH2OPorDia / nEtapas -
      (((naCl.mEq != 0 && dmdEletrolitica.na / naCl.mEq / nEtapas) || 0) +
        ((kCl.mEq != 0 && dmdEletrolitica.k / kCl.mEq / nEtapas) || 0) +
        ((gluconato.mEq != 0 && dmdEletrolitica.ca / gluconato.mEq / nEtapas) ||
          0) +
        ((mgSo4.mEq != 0 && dmdEletrolitica.mg / mgSo4.mEq / nEtapas) || 0))
    );
  };

  const tableValues = {
    NaCl: formatFloat(dmdEletrolitica.na / naCl.mEq / nEtapas),
    KCl: formatFloat(dmdEletrolitica.k / kCl.mEq / nEtapas),
    Gluconato: formatFloat(dmdEletrolitica.ca / gluconato.mEq / nEtapas),
    MgSO4: formatFloat(dmdEletrolitica.mg / mgSo4.mEq / nEtapas),
  };

  return (
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
            {formatFloat(getVolumeDeGlicose05PorEtapa())} mL{' '}
            <em>
              (
              {formatFloat(
                getVolumeDeGlicose05PorEtapa() * farmacia.Glicose05.mEq,
              )}
              g)
            </em>
            <br />
            <em>
              <Text textColor="red" fontWeight={'light'} fontSize={'sm'}>
                -
                {formatFloat(
                  (dmdEletrolitica.glicose / 1000 -
                    getVolumeDeGlicose05() * farmacia.Glicose05.mEq) /
                    nEtapas,
                )}
                g
              </Text>
            </em>
          </Td>
        </Tr>
        {naCl.mEq != 0 && (
          <Tr>
            <Td>
              {naCl.nome} {naCl.concentracao}
            </Td>
            <Td>
              {tableValues.NaCl} mL{' '}
              <em>
                ({formatFloat(dmdEletrolitica.na / nEtapas)}
                mEq)
              </em>
            </Td>
          </Tr>
        )}
        {kCl.mEq != 0 && (
          <Tr>
            <Td>
              {kCl.formula} {kCl.concentracao}
            </Td>
            <Td>
              {tableValues.KCl} mL{' '}
              <em>
                ({formatFloat(dmdEletrolitica.k / nEtapas)}
                mEq)
              </em>
            </Td>
          </Tr>
        )}
        {gluconato.mEq != 0 && (
          <Tr>
            <Td>
              {gluconato.nome} {gluconato.concentracao}
            </Td>
            <Td>
              {tableValues.Gluconato} mL{' '}
              <em>
                ({formatFloat(dmdEletrolitica.ca / nEtapas)}
                mEq)
              </em>
            </Td>
          </Tr>
        )}
        {mgSo4.mEq != 0 && (
          <Tr>
            <Td>
              {mgSo4.nome} {mgSo4.concentracao}
            </Td>
            <Td>
              {tableValues.MgSO4} mL{' '}
              <em>
                ({formatFloat(dmdEletrolitica.mg / nEtapas)}
                mEq)
              </em>
            </Td>
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
            <Th>{formatFloat((dmdH2OPorDia * 60) / 24 / 60)} microgotas/min</Th>
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
  );
}

export default PrescricaoTable;
