import React from 'react'
import {AuthorDiv, Line} from './styles'

const Author = ({author}) => {
    return (
        <AuthorDiv>
            <Line><b>Name:</b> {author.firstName} {author.lastName}</Line>
            <Line><b>Books:</b></Line>
            {author.book === undefined ? <Line>No books yet!</Line> : author.books.map(book => (
                <Line>{ book.title }</Line>
            ))}
        </AuthorDiv>
    )
}

export default Author