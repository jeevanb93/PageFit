interface Profile {
  name: string
  email: string
  phone?: string
  location?: string
  links: { label: string; url: string }[]
}

interface SkillGroup {
    label: string
    skills: string
}

interface Experience {
    id: number
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    bullets: string[]
}

interface Project {
    id: number
    title: string
    url:string
    bullets: string[]
}

interface Education {
    id: number
    school: string
    degree: string
    location: string
    date: string
}

interface Settings {
    paperSize: 'letter' | 'a4'
}

interface Resume {
    profile: Profile
    skills: SkillGroup[]
    experience: Experience[]
    projects: Project[]
    education: Education[]
    settings: Settings
}

export const defaultResume: Resume = {
    profile: {
        name: 'Jane Doe',
        email: 'jane.doe@email.com',
        phone: '+61 412 345 678',
        location: 'Sydney, NSW',
        links: [
            { label: 'portfolio.com.au', url: 'https://portfolio.com.au' },
            { label: 'github.com/janedoe', url: 'https://github.com/janedoe' },
            { label: 'linkedin.com/in/janedoe', url: 'https://linkedin.com/in/janedoe' },
        ],
    },
    skills: [
        { label: 'Languages', skills: 'TypeScript, Python, Java, SQL' },
        { label: 'Frameworks', skills: 'React, Node.js, FastAPI, Spring Boot' },
        { label: 'Tools', skills: 'Git, Docker, PostgreSQL, AWS, Figma' },
    ],
    experience: [
        {
            id: 1,
            title: 'Software Engineer',
            company: 'Atlassian',
            location: 'Sydney, NSW',
            startDate: 'Feb 2023',
            endDate: '',
            current: true,
            bullets: [
                'Reduced API response time by 40% by introducing query caching and database indexing across 12 endpoints',
                'Led migration of monolithic billing service to microservices, cutting deployment time from 45 min to 8 min',
                'Built internal React dashboard used by 30+ support agents to manage customer accounts and permissions',
                'Improved test coverage from 61% to 89% across three core services, reducing regression bugs by half',
            ],
        },
        {
            id: 2,
            title: 'Software Engineer',
            company: 'Canva',
            location: 'Sydney, NSW',
            startDate: 'Jan 2022',
            endDate: 'Jan 2023',
            current: false,
            bullets: [
                'Shipped five customer-facing features in React and Node.js across two product squads',
                'Wrote integration tests that caught two production bugs before release, saving an estimated 4 hrs of downtime',
                'Collaborated with design team to implement accessible UI components used across the core editor',
                'Reduced bundle size by 22% by auditing and removing unused dependencies across the frontend monorepo',
            ],
        },
        {
            id: 3,
            title: 'Junior Developer',
            company: 'Deloitte Digital',
            location: 'Melbourne, VIC',
            startDate: 'Mar 2020',
            endDate: 'Dec 2021',
            current: false,
            bullets: [
                'Delivered 10+ client web applications using React and Python with average turnaround of 3 weeks per engagement',
                'Automated weekly reporting pipeline with a Python script, saving 3 hrs of manual work per week',
                'Mentored two graduate developers, running fortnightly code review sessions and pair programming exercises',
            ],
        },
        {
            id: 4,
            title: 'Software Development Intern',
            company: 'REA Group',
            location: 'Sydney, NSW',
            startDate: 'Nov 2019',
            endDate: 'Feb 2020',
            current: false,
            bullets: [
                'Built a property comparison feature in React consumed by over 50,000 daily active users post-release',
                'Fixed 14 accessibility issues flagged in an external audit, bringing WCAG 2.1 compliance to AA level',
            ],
        },
    ],
    projects: [
        {
            id: 1,
            title: 'PageFit',
            url: 'github.com/janedoe/pagefit',
            bullets: [
                'Built a local-first resume builder in React and TypeScript with live preview and PDF/DOCX/LaTeX export',
                'Implemented browser autosave via localStorage with debounce to prevent data loss on refresh',
            ],
        },
        {
            id: 2,
            title: 'OpenBudget',
            url: 'openbudget.com.au',
            bullets: [
                'Developed a personal finance tracker with CSV import, category tagging, and monthly trend charts',
                'Reached 200 active users within one month of launch with zero paid marketing',
            ],
        },
        {
            id: 3,
            title: 'AusWeather CLI',
            url: 'github.com/janedoe/ausweather',
            bullets: [
                'Built a terminal weather tool in Python using the Bureau of Meteorology open data API',
                'Packaged and published to PyPI with 300+ downloads in the first month',
            ],
        },
    ],
    education: [
        {
            id: 1,
            school: 'University of New South Wales',
            degree: 'Bachelor of Computer Science',
            location: 'Sydney, NSW',
            date: 'Nov 2021',
        },
        {
            id: 2,
            school: 'TAFE NSW',
            degree: 'Diploma of Information Technology',
            location: 'Sydney, NSW',
            date: 'Nov 2018',
        },
    ],
    settings: { paperSize: 'a4' },
}

export type {Resume, Profile, SkillGroup, Experience, Project, Education, Settings}