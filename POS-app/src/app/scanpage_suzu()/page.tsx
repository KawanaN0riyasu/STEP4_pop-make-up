'use client'
import React, { useState } from 'react'
import Reader from './Reader'

export default function App() {
  const [codes, setCodes] = useState<string[]>([])
  const handleBackToTop = () => {
    setCodes([]);
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, width: '100%' }}>
        <Reader
          onReadCode={(result) =>
            setCodes((codes) => Array.from(new Set([...codes, result.getText()])))
          }
        />
      </div>
      <div style={{ width: '100%' }}>
        <textarea
          style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
          value={codes.join('\n')}
        />
        <button style={{ width: '100%' }} onClick={handleBackToTop}>
          戻る
        </button>
      </div>
    </div>
  )
}