import React from 'react'
import styles from '../Styles/searchbar.module.css'
function Searchbar({ value, onChange }) {
  return (
 
      <input placeholder="Search" 
      
      value={value}
      onChange={onChange
      }
      className={styles["search-input"]}></input>
  
  )
}

export default Searchbar;
