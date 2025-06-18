import { useEffect, useState } from 'react'

function CurrencySelector({ currencyList, onSelect }) {
  const [currentCurrencyCode, setCurrentCurrencyCode] = useState(
    () => currencyList[0]?.code
  )
  useEffect(() => {
    onSelect(currentCurrencyCode)
  }, [currentCurrencyCode, onSelect])

  function onChange(e) {
    setCurrentCurrencyCode(e.target.value)
  }

  return (
    <div>
      <label>
        Поточна валюта
        <select value={currentCurrencyCode} onChange={onChange}>
          <option value="">Вибрати валюту</option>
          {currencyList.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default CurrencySelector
