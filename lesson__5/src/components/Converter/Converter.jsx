import CurrencySelector from './CurrencySelector'
import { currencyList } from '../../data/Converter'
import { useEffect, useState } from 'react'
import { getCurrentDateForRequest } from './utils/utils'

function Converter() {
  const [currencyCode, setCurrencyCode] = useState('USD')
  const [amount, setAmount] = useState(0)
  const [rate, setRate] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currencyCode}&date=${getCurrentDateForRequest()}&json`
    async function fetchData(url) {
      try {
        setIsLoading(true)
        setError(null)
        const res = await fetch(url)
        const data = await res.json()
        setRate(data[0]?.rate)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData(url)
  }, [currencyCode])

  function onSelect(currencyCode) {
    setCurrencyCode(currencyCode)
  }

  const grn = rate * amount

  let content
  if (isLoading) content = <div>Loading...</div>
  else if (error) content = <div>Error</div>
  else content = <div>Сума у гривнях: {grn}</div>

  return (
    <>
      <CurrencySelector currencyList={currencyList} onSelect={onSelect} />
      <div>
        <label>
          Сума
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      {content}
    </>
  )
}

export default Converter
