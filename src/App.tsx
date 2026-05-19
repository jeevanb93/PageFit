import useResume from './hooks/useResume'
import EditorLayout from './components/editor/EditorLayout'
import styles from './App.module.css'

function App() {
  const {resume, updateResume} = useResume()
  
  function handleSetName() {
      updateResume({
      ...resume,
      profile: {
        ...resume.profile,
        name: 'John Doe',
        email: 'john.doe@example.com'
      }
    })
  }

  return (
    <div className={styles.layout}>
      <div className={styles.editorPanel}>
        { /* LEFT PANEL - EDITOR */ }
        <EditorLayout resume={resume} updateResume={updateResume} />
      </div>

      <div className={styles.previewPanel}>
        { /* RIGHT PANEL - PREVIEW */ }
        <p> Preview goes here</p>
      </div>
    </div>
  )
}

export default App
