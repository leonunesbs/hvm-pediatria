import { DemandaEletrolitica } from '@/components/DemandaEletrolitica';
import { DemandaHidrica } from '@/components/DemandaHidrica';
import KiloInputCard from '@/components/KiloInputCard';
import { Prescricao } from '@/components/Prescricao';
import { Center, SimpleGrid, Stack } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>HVM Pediatria</title>
      </Head>
      <Stack minH="100vh" py={10} px={2}>
        <KiloInputCard />
        <Center>
          <SimpleGrid columns={[1, 1, 2]} spacing={10} maxW="7xl">
            <Stack spacing={6}>
              <DemandaHidrica />
              <DemandaEletrolitica />
            </Stack>
            <Prescricao />
          </SimpleGrid>
        </Center>
      </Stack>
    </>
  );
}
