import './App.css'
import './index.css'
import AppRoutes from './routes/Routes'
import WhatsappButton from './components/common/WhatsappButton'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AppRoutes />
      <WhatsappButton />
    </div>
  )
}

export default App
