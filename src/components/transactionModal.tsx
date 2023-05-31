import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type TransactionBaseProps = {
  status: string;
  retry?: () => Promise<void>;
}
type Step = {
  skip?: boolean;
  stepElement: (props: TransactionBaseProps) => JSX.Element;
  action?: () => Promise<void>;
}
type TransactionProps = Step & {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}
const Transaction = ({ step, stepElement, setStep, action }: TransactionProps) => {
  const [transactionState, setTransactionState] = useState<'PENDING' | 'SUCCESS' | 'FAILED' | null>(null)

  const triggerAction = async () => {
    try {
      setTransactionState('PENDING')
      await action!()

      setTransactionState('SUCCESS')
      setStep((prevStep) => prevStep + 1)
    } catch (error: any) {
      setTransactionState('FAILED')
      console.error(error);
    }
  }

  useEffect(() => {
    if (action) triggerAction()
  }, [step])

  return stepElement({ retry: triggerAction, status })
}

type TransactionModalProps = { steps: Step[]; }
const TransactionModal = ({ steps }: TransactionModalProps) => {
  const [step, setStep] = useState<number>(0)

  return <Transaction step={step} setStep={setStep} {...steps[step]} />
}

export default TransactionModal
