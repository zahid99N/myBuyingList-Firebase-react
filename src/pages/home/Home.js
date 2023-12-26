import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
// import useFixeUid from '../../hooks/useFixeUid'

// styles
import styles from './Home.module.css'

// components
import TransactionForm from './TransactionForm'
import TransactionLIst from './TransactionLIst'

export default function Home() {
  // const res =useFixeUid()
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'transactions',
    ["uid", "==", user.uid],
    ["createdAt","desc"]
  )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionLIst transactions ={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  )
}