import { useEffect, useState } from "react"
import { defaultResume, type Resume } from "../types/resume"


function useResume() {

    // 1. Initialize state from localStorage or defaultResume
    const saved = localStorage.getItem('pagefit_resume')
    const initial = saved ? JSON.parse(saved) : defaultResume
    const [resume, setResume] = useState<Resume>(initial)

    // 2. Autosave whenever resume changes
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('pagefit_resume', JSON.stringify(resume))
        }, 500)
        return () => clearTimeout(timer)
    }, [resume])

    // 3. Return the things components will need
    return {
        resume,
        updateResume: setResume,
        reset: () => setResume(defaultResume)
    }
}

export default useResume