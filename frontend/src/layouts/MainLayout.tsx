import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  )
}

export default MainLayout
