import styles from './Input.module.css'

const Textarea = ({spanText,type,name,placeholder, onChange,value}) => {
  return <label className={styles.label}>
  <span>{spanText}</span>
  <textarea type={type} name={name} placeholder={placeholder} onChange={onChange} required value={value}></textarea>
</label>
}

export default Textarea