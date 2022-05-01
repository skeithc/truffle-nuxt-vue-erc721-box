const BASE_SEED = 1234;

const COLORS = [
  '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF',
  '#000000', '#FFFFFF',
]

function pseudoRandom(offset = 0) {
  return Math.abs(Math.floor(Math.sin(BASE_SEED + offset) * 10000));
}

function generateImage(innerColor, outerColor, backgroundColor) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
    <rect width="100%" height="100%" fill="${backgroundColor}"/>
    <circle cx="250" cy="250" r="100" fill="${outerColor}" />
    <circle cx="250" cy="250" r="70" fill="${innerColor}" />
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

function generateTokenMetadata(tokenId) {
  const randomOffset = tokenId * 1234;
  const innerColor = COLORS[pseudoRandom(randomOffset) % COLORS.length];
  const outerColor = COLORS[pseudoRandom(randomOffset * randomOffset) % COLORS.length];
  const backgroundColor = COLORS[pseudoRandom(randomOffset * randomOffset + randomOffset) % COLORS.length];

  return {
    name: `Magic Token ${tokenId}`,
    description: 'Magical tokens from beyond the realms of the mortal.',
    image: generateImage(innerColor, outerColor, backgroundColor),
    attributes: [
      { trait_type: 'Inner Color', value: innerColor },
      { trait_type: 'Outer Color', value: outerColor },
      { trait_type: 'Background Color', value: backgroundColor },
    ]
  }
}

export default defineEventHandler(
  event => {
    const { tokenId } = event.context.params;
    return generateTokenMetadata(tokenId);
  }
)
