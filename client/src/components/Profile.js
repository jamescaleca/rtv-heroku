import React, { useContext, useEffect } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
import { UserContext } from '../context/UserProvider.js'
import '../css/styles.css'

export default function Profile() {
    const {
        user: { username },
            token,
            addIssue,
            issues,
            getUserIssues,
            deleteIssue,
            editIssue
    } = useContext(UserContext)

    useEffect(() => {
        getUserIssues()
    }, [])
    
    return (
        <div className='profile'>
            <div id='profile-page-title'>
                <h1>Welcome @{username}!</h1>
            </div>
            
            <div id='add-issue-txt'>
                <h3>Add an Issue</h3>
            </div>
            <IssueForm />

            <div id='your-issues-txt'>
                <h3>Your Issues</h3>
            </div>
            <IssueList 
                issues={issues}
                deleteIssue={deleteIssue}
                editIssue={editIssue}
                token={token}
                username={username}
            />
        </div>
    )
}