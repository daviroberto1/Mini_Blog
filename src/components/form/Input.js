import styles from './Input.module.css'
const Input = ({spanText,type,name,placeholder, onChange,value}) => {

  return <label className={styles.label}>
    <span>{spanText}</span>
    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required/>
  </label>
}

export default Input