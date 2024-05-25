import countries from "world-countries";

const countriesFormat = countries.map((item) => ({
  value: item.cca2,
  label: item.name.common,
  latLang: item.latlng,
  region: item.region,
  flag: item.flag,
}));

export const useCountries = () => {
  const getAllCountry = () => countriesFormat;
  const getCountryByValues = (value: string) => {
    return countriesFormat.find((item) => item.value === value);
  };

  return {
    getAllCountry,
    getCountryByValues,
  };
};
