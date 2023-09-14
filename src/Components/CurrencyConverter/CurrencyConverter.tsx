import { useEffect, useState } from 'react';
import { FormControl, Input, InputLabel, Button } from '@mui/material';
import language from '../../Data/Language';
import SelectionComponent from '../SelectionComponent/SelectionComponent';
import useCurrencyConverter from '../../Hooks/useCurrencyConverter';
import { motion } from 'framer-motion'
import './CurrencyConverter.css';

export default function CurrencyConverter() {
  const [baseCurrency, setBaseCurrency] = useState<string>('');
  const [targetCurrency, setTargetCurrency] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const { exchangeRates, currencyCodes } = useCurrencyConverter(baseCurrency); //fetch data

  const handleConvert = () => {
    if (!baseCurrency || !targetCurrency) {
      return;
    }
    else {
      calculateConversion();
    }
  };

  const calculateConversion = () => {
    const rate = exchangeRates[targetCurrency];
    const convertedAmount = parseFloat((amount * rate).toFixed(2));
    setConvertedAmount(convertedAmount);
    setIsResultVisible(true);
  };


  useEffect(() => {
    setIsResultVisible(false);
  }, [baseCurrency, targetCurrency, amount]);

  return (
    <div className="CurrencyConverter">
      <h3 className="CurrencyConverter_Header">Currency Converter</h3>
      <div className="formContent">
        <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
          <InputLabel sx={{ color: 'white', fontSize: '16px' }}>Amount</InputLabel>
          <Input
            inputProps={{ sx: { color: 'white' } }}
            style={{ borderColor: '#fff' }}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          />
        </FormControl>

        <SelectionComponent
          id="select-from-currency"
          label="From"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          currencyCodes={currencyCodes}
          language={language}
        />

        <SelectionComponent
          id="select-to-currency"
          label="To"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          currencyCodes={currencyCodes}
          language={language}
        />

        <Button className="convertBtn" onClick={handleConvert} variant="contained">
          Convert
        </Button>
        {isResultVisible && (
          <motion.div
            className='results'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.1 }} 
          >
            <span>
              {amount} {baseCurrency} is approximately {convertedAmount} {targetCurrency}
            </span>
            <span className='rate'>Rate: {exchangeRates[targetCurrency].toFixed(2)}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
