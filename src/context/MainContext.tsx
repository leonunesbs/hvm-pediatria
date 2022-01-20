import { createContext, useCallback, useMemo, useState } from 'react';

interface MainContextProps {
  formatFloat: (value: number) => string;
  categorias: number[][];
  farmacia: any;
  dmdH2OPorHora: number;
  setDmdH2OPorHora: (value: number) => void;
  dmdH2OPorDia: number;
  setDmdH2OPorDia: (value: number) => void;
  dmdEletrolitica: {
    k: number;
    na: number;
    cl: number;
  };
  setDmdEletrolitica: (value: { k: number; na: number; cl: number }) => void;
  setDemandaHidrica: (categoria: any, data: any) => void;
  setDemandaEletrolitica: (categoria: any, data: any) => void;
}

interface MainProviderProps {
  children: React.ReactNode;
}

export const MainContext = createContext({} as MainContextProps);

export function MainProvider({ children }: MainProviderProps) {
  const [dmdH2OPorHora, setDmdH2OPorHora] = useState(0);
  const [dmdH2OPorDia, setDmdH2OPorDia] = useState(0);
  const [dmdEletrolitica, setDmdEletrolitica] = useState({
    k: 0,
    na: 0,
    cl: 0,
  });

  const formatFloat = (number: number) => {
    return number.toFixed(1).replace('.', ',');
  };

  const categorias = useMemo(
    () => [
      [3.5, 10],
      [10, 20],
      [20, 80],
    ],
    [],
  );
  const farmacia = useMemo(() => {
    return {
      KCl10: {
        formula: 'KCl',
        nome: 'Cloreto de potássio',
        concentracao: '10%',
        mEq: 1.3,
      },
      KCl19: {
        formula: 'KCl',
        nome: 'Cloreto de potássio',
        concentracao: '19.1%',
        mEq: 2.6,
      },
      NaCl09: {
        formula: 'NaCl',
        nome: 'Cloreto de sodio',
        concentracao: '0,9%',
        mEq: 0.154,
      },
      NaCl10: {
        formula: 'NaCl',
        nome: 'Cloreto de sodio',
        concentracao: '10%',
        mEq: 1.7,
      },
      NaCl20: {
        formula: 'NaCl',
        nome: 'Cloreto de sodio',
        concentracao: '20%',
        mEq: 3.4,
      },
      Gluconato: {
        formula: (
          <span>
            C<sub>12</sub>H<sub>22</sub>CaO<sub>14</sub>
          </span>
        ),
        nome: 'Gluconato de cácio',
        concentracao: '10%',
        mEq: 0.46,
      },
    };
  }, []);

  const setDemandaHidrica = useCallback(
    (categoria, data): void => {
      if (categoria) {
        switch (categorias.indexOf(categoria)) {
          case 0:
            setDmdH2OPorHora(data.kilos * 4);
            setDmdH2OPorDia(data.kilos * 100);
            break;
          case 1:
            setDmdH2OPorHora(40 + 2 * (data.kilos - 10));
            setDmdH2OPorDia(1000 + 50 * (data.kilos - 10));
            break;
          case 2:
            setDmdH2OPorHora(60 + 1 * (data.kilos - 20));
            setDmdH2OPorDia(
              1500 + 20 * (data.kilos - 20) > 2400
                ? 2400
                : 1500 + 20 * (data.kilos - 20),
            );
            break;
        }
      }
    },
    [categorias],
  );

  const setDemandaEletrolitica = useCallback(
    (categoria, data): void => {
      const calcularDemandaHidricaPorCategoria = (kilos: number) => [
        kilos * 100,
        1000 + 50 * (kilos - 10),
        1500 + 20 * (kilos - 20) > 2400 ? 2400 : 1500 + 20 * (kilos - 20),
      ];

      if (categoria) {
        switch (categorias.indexOf(categoria)) {
          case 0:
            setDmdEletrolitica({
              k: 1 * (calcularDemandaHidricaPorCategoria(data.kilos)[0] / 100),
              na: 2 * (calcularDemandaHidricaPorCategoria(data.kilos)[0] / 100),
              cl: 2 * (calcularDemandaHidricaPorCategoria(data.kilos)[0] / 100),
            });
            break;
          case 1:
            setDmdEletrolitica({
              k:
                1.5 * (calcularDemandaHidricaPorCategoria(data.kilos)[1] / 100),
              na:
                2.5 * (calcularDemandaHidricaPorCategoria(data.kilos)[1] / 100),
              cl:
                2.5 * (calcularDemandaHidricaPorCategoria(data.kilos)[1] / 100),
            });
            break;
          case 2:
            setDmdEletrolitica({
              k: 2 * (calcularDemandaHidricaPorCategoria(data.kilos)[2] / 100),
              na: 3 * (calcularDemandaHidricaPorCategoria(data.kilos)[2] / 100),
              cl: 3 * (calcularDemandaHidricaPorCategoria(data.kilos)[2] / 100),
            });
            break;
        }
      }
    },
    [categorias],
  );

  return (
    <MainContext.Provider
      value={{
        formatFloat,
        categorias,
        farmacia,
        dmdH2OPorDia,
        dmdEletrolitica,
        dmdH2OPorHora,
        setDmdH2OPorDia,
        setDmdEletrolitica,
        setDmdH2OPorHora,
        setDemandaHidrica,
        setDemandaEletrolitica,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
