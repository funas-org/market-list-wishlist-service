const itemsCategoriesDict = {
  FEIRA: 'Feira',
  CARNES: 'Carnes',
  LIMPEZA: 'Limpeza/Higiene',
  OUTROS: 'Outros',
};

export type ItemsCategories = keyof typeof itemsCategoriesDict;

export default {
  itemsCategoriesDict,
};
