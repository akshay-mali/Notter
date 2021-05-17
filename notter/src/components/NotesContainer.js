import React from 'react'
import useFirestore from '../hooks/useFirebase'
import Note from './Note'

// const notes = [
//     {
//         id: 1,
//         imageURL: 'https://images.pexels.com/photos/4095545/pexels-photo-4095545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//         title: 'Time is running out',
//         paragraph: "I think the biggest reason that time is running out is because you don't know who you are, and don't seem to even be working on that problem diligently.",
//         list: [
//             {
//                 id: 1,
//                 task: 'Get up at 6am',
//                 done: true
//             },
//             {
//                 id: 2,
//                 task: 'Work on Notter App',
//                 done: false
//             },
//             {
//                 id: 3,
//                 task: 'Do UI design practice',
//                 done: false
//             },
//         ]
//     },
//     {
//         id: 2,
//         imageURL: '',
//         title: 'Trip todo list',
//         paragraph: "",
//         list: [
//             {
//                 id: 1,
//                 task: 'Pack your clothes',
//                 done: false
//             },
//             {
//                 id: 2,
//                 task: 'Book hotel rooms',
//                 done: true
//             },
//             {
//                 id: 3,
//                 task: 'Phone, Laptop, Charger, etc',
//                 done: false
//             },
//             {
//                 id: 4,
//                 task: 'Take out money from bank',
//                 done: true
//             },
//             {
//                 id: 5,
//                 task: 'Wash car before trip',
//                 done: false
//             },
//         ]
//     },
//     {
//         id: 3,
//         imageURL: 'https://images.pexels.com/photos/2676642/pexels-photo-2676642.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//         title: 'Rome',
//         paragraph: "Rome is the capital city and a special comune of Italy, as well as the capital of the Lazio region. The city has been a major human settlement for almost three millennia. With 2,860,009 residents in 1,285 km², it is also the country's most populated comune.",
//         list: []
//     },
//     {
//         id: 4,
//         imageURL: '',
//         title: 'LP Assignment 3',
//         paragraph: "This is the last assignment on optimization which will have two parts (in a group of two),Seperate programs to be done for both parts. Assume input to be in 3-address form.:Part-I: Create basic blocks from code that is in 3-address form. Do local optimizations. Create a control flow graph. Find out if there is any unreachable code. Find out natural loops. Find out Dominator blocks.",
//         list: []
//     },
//     {
//         id: 5,
//         imageURL: 'https://images.pexels.com/photos/827518/pexels-photo-827518.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//         title: '',
//         paragraph: "",
//         list: []
//     },

// ]

function NotesContainer({ handleEditNoteOnClick }) {
    const { notes } = useFirestore('notes');

    return (
        <>
            <div className="container">
                {
                    notes &&
                    notes.map((note, index) => {
                        return(
                            <Note note={note} key={note.id.toString()} handleEditNoteOnClick={handleEditNoteOnClick} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default NotesContainer
