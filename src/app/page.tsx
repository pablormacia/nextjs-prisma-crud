'use client'
import NoteForm from '@/components/NoteForm'
import NoteCard from '@/components/NoteCard'
import {useEffect } from 'react'
import { useNotes } from '@/context/NoteContext'

/* async function loadNotes() {
  const res = await fetch("http://localhost:3000/api/notes")
  const data = await res.json()
  return data
}
 */
function HomePage() {
  //const notes = await loadNotes()
  const {notes,loadNotes} = useNotes()
  console.log(notes)
  useEffect(()=>{
    loadNotes()
  },[])
  return (
    <div className='flex items-center justify-center h-screen'>
      <div>
        <NoteForm />
        {notes.map(note => (
          <NoteCard note={note} key={note.id} />
        ))}
      </div>
    </div>
  )
}

export default HomePage