import React from 'react'
import style from '../styles/Home.module.css'

function Footer() {
    const date = new Date()
    const year = date.getFullYear()
  return (
    <footer className={style.footer}>
        <div className={style.footerDiv}> Copyright &copy; {year} </div>
    </footer>
  )
}

export default Footer