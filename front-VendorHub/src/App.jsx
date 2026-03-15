import { RouterProvider } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { router } from './router/router'

function App() {
  return (
     <>
      <RouterProvider router={router} />
      <Toaster 
      position="top-center"
      toastOptions={{
        duration: 4000,
        className: 'cursor-pointer', 
    
      }} 
      containerStyle={{}}
      containerClassName="toaster-container"
      children={(t) => (
        <div onClick={() => toast.dismiss(t.id)}>
        </div>
      )}
    />
    </>
  )
}

export default App
