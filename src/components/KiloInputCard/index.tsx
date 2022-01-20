import { MainContext } from '@/context/MainContext';
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { useCallback, useContext } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { Card } from '../Card';

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

function KiloInputCard() {
  const { categorias, setDemandaHidrica, setDemandaEletrolitica } =
    useContext(MainContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

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

  return (
    <Card maxW="xl" mx="auto" textAlign="center" mb={4}>
      <Heading as="h1">Hidratação venosa de manutenção</Heading>
      <Text as="em" fontSize="lg">
        Holiday&amp;Segar
      </Text>
      <Divider my={4} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex align="flex-end">
          <FormControl>
            <FormLabel textAlign="center">Insira o peso (kg):</FormLabel>
            <Input
              type="number"
              step={0.1}
              focusBorderColor="green.500"
              autoFocus
              {...register('kilos')}
            />
            {errors?.kilos && (
              <Text textAlign="center" color="red">
                {errors.kilos.message}
              </Text>
            )}
          </FormControl>
          <Button type="submit" colorScheme="green" ml={2}>
            Calcular
          </Button>
        </Flex>
      </form>
    </Card>
  );
}

export default KiloInputCard;
