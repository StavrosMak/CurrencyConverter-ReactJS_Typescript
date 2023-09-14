import { useEffect, useState } from 'react';
import language from '../Data/Language';

interface ExchangeRates {
  [key: string]: number;
}

const API_KEY = process.env.REACT_APP_API_KEY;;
const API_URL = 'https://api.apilayer.com/fixer/latest';

function useCurrencyConverter(baseCurrency: string) {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [currencyCodes, setCurrencyCodes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}?base=${baseCurrency}`, {
          headers: { 'apikey': API_KEY || '', },
        });
        const data = await response.json();

        if (data.success) {
          setExchangeRates(data.rates);
          const filteredCodes = Object.keys(data.rates).filter((code: string) =>
            language.some((option) => option.code.split(' ')[1] === code)
          );
          setCurrencyCodes(filteredCodes);
        } else {
          console.error('API error:', data.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [baseCurrency]);

  return { exchangeRates, currencyCodes };
}

export default useCurrencyConverter;
