import React from 'react'
import './NotFound.scss'
import { Button } from '@/utils/Button/Button'

export default function NotFound() {
  return (
    <div className='not-found'>
      
      <div className="visuals">
        <div className="visual visual--top-left"></div>
        <div className="visual visual--top-right"></div>
        <div className="visual visual--bottom-left"></div>
        <div className="visual visual--bottom-right"></div>
      </div>

      <div className="content">
        <h1>404</h1>
        <p>Сторінка не знайдена</p>

        <Button 
          text="Повернутися на головну"
          href="/"
          fullWidth
        />
      </div>
    </div>
  )
}
