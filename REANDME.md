# install

npm install react-message-intl --save

# example

```jsx
import React, { useEffect, useState } from 'react'
import intl from './util/intl'
import en_US from './lang/en_US'
import zh_CN from './lang/zh_CN'
import './App.css'

// app locale data
const locales = {
  en: en_US,
  zh: zh_CN,
}
const currentLocale = localStorage.getItem('locale') || 'zh'

function App() {
  const [initDone, setInitDone] = useState(false)

  useEffect(() => {
    loadLocales()
  }, [])

  function loadLocales() {
    intl
      .init({
        currentLocale: currentLocale,
        locales,
      })
      .then(() => {
        setInitDone(true)
      })
  }

  function handleClick(data) {
    localStorage.setItem('locale', data)
    intl.onChangeLanguage(data)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          text.
          {initDone && <span>{intl.get('home')}</span>}
        </p>
        <button onClick={() => handleClick('zh')}>中</button>
        <button onClick={() => handleClick('en')}>英</button>
      </header>
    </div>
  )
}

export default App
```
