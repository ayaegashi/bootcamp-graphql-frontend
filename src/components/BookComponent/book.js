import React from 'react'
import {BookDiv, Line} from './styles'

const Book = ({ book }) => {
    return (
        <BookDiv>
            <Line><b>Title:</b> {book.title}</Line>
            <Line><b>Author:</b> {book.author.firstName} {book.author.firstName}</Line>
            <Line><b>Language:</b> {book.language}</Line>
            <Line><b>Publisher:</b> {book.publisher.company}</Line>
        </BookDiv>
    )
}

export default Book