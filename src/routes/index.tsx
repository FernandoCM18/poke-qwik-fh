import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {

  const pokemonId = useSignal(1);
  const showBackImage = useSignal(false);
  const isPokemonVisible = useSignal(true);

  const changePokemonId = $((value: number) => {
    const sumatory = pokemonId.value + value;
    if ( sumatory <= 0 ) return;
    pokemonId.value = sumatory;
  });

  const changeBackImage = $(() => {
    showBackImage.value = !showBackImage.value;
  });

  const changeVisibility = $(() => {
    isPokemonVisible.value = !isPokemonVisible.value;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>
      <PokemonImage id={pokemonId.value} size={100} backImage={showBackImage.value} isVisible={isPokemonVisible.value} />
      <div class="mt-2 space-x-2">
        <button class="btn btn-primary" onClick$={() => changePokemonId(-1)}>Anterior</button>
        <button class="btn btn-primary" onClick$={() => changePokemonId(+1)}>Siguiente</button>
        <button class="btn btn-primary" onClick$={() => changeBackImage()}>Voltear</button>
        <button class="btn btn-primary" onClick$={() => changeVisibility()}>Revelar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Esta es mi primera app con Qwik',
    },
  ],
};
