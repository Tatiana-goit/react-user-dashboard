import { Sidebar } from '../Sidebar/Sidebar'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import styles from './AppLayout.module.scss'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Header />
        <div className={styles.content}>{children}</div>
        <Footer />
      </div>
    </div>
  )
}
