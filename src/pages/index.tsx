import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  kilos: number;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.kilos ? values : {},
    errors: !values.kilos
      ? {
          kilos: {
            type: 'required',
            message: 'Insira um número',
          },
        }
      : {},
  };
};

export default function Home() {
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

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const [nEtapas] = useState(4);
  const [dmdH2OPorHora, setDmdH2OPorHora] = useState(0);
  const [dmdH2OPorDia, setDmdH2OPorDia] = useState(0);
  const [dmdEletrolitica, setDmdEletrolitica] = useState({
    k: 0,
    na: 0,
    cl: 0,
  });

  const calcularDemandaHidricaPorCategoria = useCallback(
    (kilos: number) => [
      kilos * 100,
      1000 + 50 * (kilos - 10),
      1500 + 20 * (kilos - 20) > 2400 ? 2400 : 1500 + 20 * (kilos - 20),
    ],
    [],
  );

  const floatFormat = (number: number) => {
    return number.toFixed(1).replace('.', ',');
  };

  const setDemandaEletrolitica = useCallback(
    (categoria, data): void => {
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
    [calcularDemandaHidricaPorCategoria, categorias],
  );

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

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      if (data.kilos < 3.5 || data.kilos > 80) {
        setError('kilos', {
          type: 'min',
          message: 'Insira um número entre 3.5 e 80',
        });
        return;
      }

      const peso = data.kilos;
      const categoria = categorias.find(
        ([min, max]) => peso >= min && peso <= max,
      );

      setDemandaHidrica(categoria, data);
      setDemandaEletrolitica(categoria, data);
    },
    [categorias, setDemandaEletrolitica, setDemandaHidrica, setError],
  );

  const Prescricao = () => {
    const [KCl, setKCl] = useState(farmacia.KCl10);
    const [NaCl, setNaCl] = useState(farmacia.NaCl10);
    return (
      <>
        <p>
          SG 5% -{' '}
          {floatFormat(
            (dmdH2OPorDia -
              (dmdEletrolitica.na / NaCl.mEq + dmdEletrolitica.k / KCl.mEq)) /
              4,
          )}{' '}
          mL
        </p>
        <li style={{ display: 'flex' }}>
          <p>
            {NaCl.formula} {NaCl.concentracao} - {floatFormat(NaCl.mEq)} mEq/mL
            - {floatFormat(dmdEletrolitica.na / NaCl.mEq / nEtapas)} mL
          </p>
          <div>
            <input
              type="radio"
              id="NaCl10%"
              name="NaCl"
              defaultChecked
              onClick={() => setNaCl(farmacia.NaCl10)}
            />
            <label htmlFor="NaCl10%">
              <Image
                src="/NaCl10.png"
                alt="nacl10"
                width="55px"
                height="55px"
              />
            </label>
            <input
              type="radio"
              id="NaCl20%"
              name="NaCl"
              onClick={() => setNaCl(farmacia.NaCl20)}
            />
            <label htmlFor="NaCl20%">
              <Image
                src="/NaCl20.png"
                alt="nacl10"
                width="55px"
                height="55px"
              />
            </label>
          </div>
        </li>
        <li style={{ display: 'flex' }}>
          <p>
            {KCl.formula} {KCl.concentracao} - {floatFormat(KCl.mEq)} mEq/mL -{' '}
            {floatFormat(dmdEletrolitica.k / KCl.mEq / nEtapas)} mL
          </p>
          <div>
            <input
              type="radio"
              id="KCl10%"
              name="KCl"
              defaultChecked
              onClick={() => setKCl(farmacia.KCl10)}
            />
            <label htmlFor="KCl10%">
              <Image src="/KCl10.png" alt="kcl10" width="55px" height="55px" />
            </label>
            <input
              type="radio"
              id="KCl19%"
              name="KCl"
              onClick={() => setKCl(farmacia.KCl19)}
            />
            <label htmlFor="KCl19%">
              <Image src="/KCl19.png" alt="kcl19" width="55px" height="55px" />
            </label>
          </div>
        </li>
      </>
    );
  };

  return (
    <div>
      <Head>
        <title>HVM Pediatria</title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Insira o peso (kg):
          <input type="number" step={0.1} {...register('kilos')} />
          {errors?.kilos && <p>{errors.kilos.message}</p>}
        </label>
        <button type="submit">Calcular</button>
      </form>

      <h2>Demanda Hídrica</h2>
      <p>Para 1 hora:</p>
      <ul>
        <li>{dmdH2OPorHora} mL/hora</li>
        <li>{((dmdH2OPorHora * 20) / 60).toFixed(0)} gotas/min</li>
        <li>{((dmdH2OPorHora * 60) / 60).toFixed(0)} microgotas/min</li>
      </ul>
      <p>
        Para 24 horas: {dmdH2OPorDia}mL/dia a{' '}
        {(dmdH2OPorDia / 24).toFixed(1).replace('.', ',')}
        mL/hora
      </p>
      <ul>
        <li>{(dmdH2OPorDia / 24).toFixed(1).replace('.', ',')} mL/hora</li>
        <li>{dmdH2OPorDia} mL/dia</li>
      </ul>
      <h2>Demanda Eletrolítica</h2>
      <ul>
        <li>Na+: {floatFormat(dmdEletrolitica.na)} mEq/dia</li>
        <li>Cl-: {floatFormat(dmdEletrolitica.cl)} mEq/dia</li>
        <li>K+: {floatFormat(dmdEletrolitica.k)} mEq/dia</li>
      </ul>
      <h2>Prescrição</h2>
      <p>
        HVM p/ 24h em <b>{nEtapas} etapas</b>
      </p>
      <ul>
        <Prescricao />
        <li>
          <p>VT {floatFormat(dmdH2OPorDia / nEtapas)} mL - EV</p>
          <ul>
            <li>{floatFormat((dmdH2OPorDia * 20) / 24 / 60)} gotas/min</li>
            <li>{floatFormat((dmdH2OPorDia * 60) / 24 / 60)} microgotas/min</li>
            <li>{floatFormat(dmdH2OPorDia / 24)} mL/hora</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
