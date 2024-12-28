import React from 'react'
import styles from '../Styles/searchbartxn.module.css'
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
