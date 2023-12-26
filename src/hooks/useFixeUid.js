import { useCollection } from '../hooks/useCollection'
import { useFirestore } from './useFirestore'


export default function useFixeUid() {
    const { updateDocument, response } = useFirestore('transactions')
    
    const { documents } = useCollection('transactions')
    console.log(documents)
    if (documents?.length) {
        for (const doc of documents) {
            if (doc.uid.uid) {
                updateDocument({ ...doc, uid: doc.uid.uid })
                
            }
        }
    }
    
    
  return {documents}
}
