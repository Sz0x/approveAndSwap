import { useState } from 'react'
import './App.css'
import useApproveAndSwap from './hooks/approveAndSwap'
import TransactionModal from './components/transactionModal'

function App() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const approveAndSwapSteps = useApproveAndSwap()

  return (
    <div>
      <dialog open={showModal}>
        <TransactionModal steps={approveAndSwapSteps} />
      </dialog> 

      <button onClick={() => setShowModal(!showModal)}>Show approve and swap flow</button>

      <button onClick={() => approveAndSwap()}>approve and swap</button>
    </div>
  )
}

export default App
