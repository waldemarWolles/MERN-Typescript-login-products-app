import { ReactNode } from 'react'

type Props = {
  className?: string
  children: ReactNode
}

const MainLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <div>
      {/* <Header /> */} Header
      <main className={className}>{children}</main>
    </div>
  )
}

export default MainLayout
