import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(({id, size = 200, backImage = false, isVisible = true}: Props) => {
  const imageLoader =  useSignal(false);

  useTask$(({ track }) => {
    track(() => id);
    imageLoader.value = false;
  });

  const urlBase = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  const imageUrl = backImage ? `${urlBase}back/${id}.png` : `${urlBase}${id}.png`;

  return (
    <div 
      class="flex items-center justify-center"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {
        !imageLoader.value && <span>Cargando...</span>
      }
      <img 
          class={[{
            'hidden': !imageLoader.value,
            'brightness-0': !isVisible,
          }, 'transition-all']}
          src={imageUrl} 
          alt="Pokemon Sprite"
          width={size}
          height={size}
          onLoad$={() => imageLoader.value = true}
      /> 
    </div>
  )
});