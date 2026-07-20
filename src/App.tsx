import useResume from './hooks/useResume'
import EditorLayout from './components/editor/EditorLayout'
import ResumePreview from './components/preview/ResumePreview'
import styles from './App.module.css'

function App() {
  const { resume, updateResume } = useResume()

  return (
    <div className={styles.layout}>

      <div className={styles.editorPanel}>
        <EditorLayout resume={resume} updateResume={updateResume} />
      </div>

      <div className={styles.previewPanel}>
        <ResumePreview resume={resume} />
      </div>

    </div>
  )
}

export default App
