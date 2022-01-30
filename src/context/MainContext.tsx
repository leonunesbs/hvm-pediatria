import { createContext, useCallback, useMemo, useState } from 'react';

type Eletrolitos = {
  k: number;
  na: number;
  cl: number;
  ca: number;
  mg: number;
};

type FarmaciaType = {
  formula: JSX.Element;
  nome: string;
  concentracao: string;
  mEq: number;
};

interface Farmacia {
  KCl10: FarmaciaType;
  KCl19: FarmaciaType;
  NaCl09: FarmaciaType;
  NaCl10: FarmaciaType;
  NaCl20: FarmaciaType;
  Gluconato10: FarmaciaType;
  MgSo410: FarmaciaType;
}
interface MainContextProps {
  formatFloat: (value: number) => string;
  categoriasPonderais: number[][];
  farmacia: Farmacia;
  dmdH2OPorHora: number;
  setDmdH2OPorHora: (value: number) => void;
  dmdH2OPorDia: number;
  setDmdH2OPorDia: (value: number) => void;
  dmdEletrolitica: Eletrolitos;
  setDmdEletrolitica: (value: Eletrolitos) => void;
  setDemandaHidrica: (categoria: any, kilos: any) => void;
  setDemandaEletrolitica: (categoria: any, kilos: any) => void;
}

interface MainProviderProps {
  children: React.ReactNode;
}

export const MainContext = createContext({} as MainContextProps);

export function MainProvider({ children }: MainProviderProps) {
  const [dmdH2OPorHora, setDmdH2OPorHora] = useState(0);
  const [dmdH2OPorDia, setDmdH2OPorDia] = useState(0);
  const [dmdEletrolitica, setDmdEletrolitica] = useState<Eletrolitos>({
    k: 0,
    na: 0,
    cl: 0,
    ca: 0,
    mg: 0,
  });

  const formatFloat = (number: number) => {
    return number.toFixed(1).replace('.', ',');
  };

  const categoriasPonderais = useMemo(
    () => [
      [0, 1.0],
      [1.0, 2.0],
      [2.0, 3.5],
      [3.5, 10],
      [10.0, 20.0],
      [20.0, 80.0],
    ],
    [],
  );
  const farmacia = useMemo<Farmacia>(() => {
    return {
      KCl10: {
        formula: <p>KCl</p>,
        nome: 'Cloreto de potássio',
        concentracao: '10%',
        mEq: 1.3,
      },
      KCl19: {
        formula: <p>KCl</p>,
        nome: 'Cloreto de potássio',
        concentracao: '19.1%',
        mEq: 2.6,
      },
      NaCl09: {
        formula: <p>NaCl</p>,
        nome: 'Cloreto de sodio',
        concentracao: '0,9%',
        mEq: 0.154,
      },
      NaCl10: {
        formula: <p>NaCl</p>,
        nome: 'Cloreto de sodio',
        concentracao: '10%',
        mEq: 1.7,
      },
      NaCl20: {
        formula: <p>NaCl</p>,
        nome: 'Cloreto de sodio',
        concentracao: '20%',
        mEq: 3.4,
      },
      Gluconato10: {
        formula: (
          <span>
            C<sub>12</sub>H<sub>22</sub>CaO<sub>14</sub>
          </span>
        ),
        nome: 'Gluconato de cácio',
        concentracao: '10%',
        mEq: 0.46,
      },
      MgSo410: {
        formula: (
          <span>
            MgSo<sub>4</sub>
          </span>
        ),
        nome: 'Sulfato de magnésio',
        concentracao: '10%',
        mEq: 0.81,
      },
    };
  }, []);

  const setDemandaHidrica = useCallback(
    (categoria, kilos): void => {
      if (categoria) {
        const demanda = [
          () => {
            setDmdH2OPorHora((kilos * 150) / 24);
            setDmdH2OPorDia(kilos * 150);
          },
          () => {
            setDmdH2OPorHora((kilos * 150) / 24);
            setDmdH2OPorDia(kilos * 150);
          },
          () => {
            setDmdH2OPorHora((kilos * 150) / 24);
            setDmdH2OPorDia(kilos * 150);
          },
          () => {
            setDmdH2OPorHora(kilos * 4);
            setDmdH2OPorDia(kilos * 100);
          },
          () => {
            setDmdH2OPorHora(40 + 2 * (kilos - 10));
            setDmdH2OPorDia(1000 + 50 * (kilos - 10));
          },
          () => {
            setDmdH2OPorHora(60 + 1 * (kilos - 20));
            setDmdH2OPorDia(
              1500 + 20 * (kilos - 20) > 2400 ? 2400 : 1500 + 20 * (kilos - 20),
            );
          },
        ];

        return demanda[categoriasPonderais.indexOf(categoria)]();
      }
    },
    [categoriasPonderais],
  );

  const setDemandaEletrolitica = useCallback(
    (categoria, kilos): void => {
      const calcularDemandaHidricaPorCategoria = (kilos: number) => [
        kilos * 150,
        kilos * 150,
        kilos * 150,
        kilos * 100,
        1000 + 50 * (kilos - 10),
        1500 + 20 * (kilos - 20) > 2400 ? 2400 : 1500 + 20 * (kilos - 20),
      ];

      const demanda = [
        () => {
          setDmdEletrolitica({
            k:
              0 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            na:
              0 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            cl:
              0 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            ca:
              2 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            mg:
              0.3 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
          });
        },
        () => {
          setDmdEletrolitica({
            k:
              0 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            na:
              0 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            cl:
              0 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            ca:
              3 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            mg:
              0.4 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
          });
        },
        () => {
          setDmdEletrolitica({
            k:
              1 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            na:
              2 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            cl:
              2 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            ca:
              4 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            mg:
              0.5 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
          });
        },
        () => {
          setDmdEletrolitica({
            k:
              1 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            na:
              2 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            cl:
              2 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            ca:
              4 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            mg:
              0.5 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
          });
        },
        () => {
          setDmdEletrolitica({
            k:
              2 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            na:
              3 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            cl:
              3 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            ca:
              3 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            mg:
              0.5 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
          });
        },
        () => {
          setDmdEletrolitica({
            k:
              2 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            na:
              3 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            cl:
              3 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            ca:
              3 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
            mg:
              0.5 *
              (calcularDemandaHidricaPorCategoria(kilos)[
                categoriasPonderais.indexOf(categoria)
              ] /
                100),
          });
        },
      ];
      return demanda[categoriasPonderais.indexOf(categoria)]();
    },
    [categoriasPonderais],
  );

  return (
    <MainContext.Provider
      value={{
        formatFloat,
        categoriasPonderais,
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
