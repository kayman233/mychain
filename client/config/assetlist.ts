export const assetlist = {
  $schema: '../../assetlist.schema.json',
  chain_name: 'gmrollup',
  assets: [
    {
      description: '',
      denom_units: [
        {
          denom: 'ustake',
          exponent: 0,
        },
        {
          denom: 'stake',
          exponent: 6,
        },
      ],
      // "base": "ustake", // is this correct instead of `stake`?
      base: 'stake',
      name: 'GM rollup',
      display: 'stake',
      symbol: 'STAKE',
      logo_URIs: {
        svg: 'https://raw.githubusercontent.com/jcstein/gm-portal/b030ce3fe548d188fbacb6b932d7e51dc7afd65e/frontend/public/gm.svg',
      },
    },
  ],
};
