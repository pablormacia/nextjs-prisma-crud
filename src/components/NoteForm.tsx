'use client'
import { useState, useRef, useEffect } from "react"
//import { useRouter } from "next/navigation"
//import { NoteContext } from "@/context/NoteContext"
import { useNotes } from "@/context/NoteContext"

const NoteForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const titleRef = useRef<HTMLInputElement>(null)

  //const {createNote} = useContext(NoteContext)
  const { createNote, selectedNote, setSelectedNote,updateNote } = useNotes()

  //const router = useRouter()

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title)
      setContent(selectedNote.content || "")
    }
  }, [selectedNote])

  return (
    <form onSubmit={async (e) => {
      e.preventDefault()
      if (selectedNote) {
        await updateNote(selectedNote.id, {title,content})
        setSelectedNote(null)
      } else {
        await createNote({
          title,
          content
        })
      }

      setTitle("")
      setContent("")
      titleRef.current?.focus()

      //router.refresh()
    }}>
      <input
        type="text"
        name="title"
        autoFocus
        placeholder="Título"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />
      <textarea
        name="content"
        placeholder="Contenido"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <div className="flex justify-end gap-x-2">
        <button type="submit" 
          className="disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          disabled={!title || !content}
          >  
          {selectedNote? "Actualizar":"Crear"}
        </button>
        {
          selectedNote && <button
            type="button"
            className="px-5 py-2 text-white bg-red-600 hover:bg-red-500 rounded-md"
            onClick={() => {
              setSelectedNote(null)
              setTitle("")
              setContent("")
            }}
          >Cancelar
          </button>
        }

      </div>

    </form>

  )
}

export default NoteForm