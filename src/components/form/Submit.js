import styles from './Submit.module.css'

const Submit = ({value,disabled}) => {
  return <input type="submit" value={value} className={styles.submit} disabled={disabled}/>
}

export default Submit