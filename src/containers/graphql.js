import gql from 'graphql-tag'

export const ALL_AUTHORS = gql `
    query allAuthors {
        allAuthors {
        firstName
        lastName
        books {
            title
        }
        }
    }
`

export const ALL_BOOKS = gql `
    query allBooks {
        allBooks {
        title
        language
        author {
            firstName
            lastName
        }
        publisher {
            company
        }
        }
    }
`

export const CREATE_AUTHOR = gql `
    mutation createAuthor ($inputAuthor: AddAuthorInput!) {
        createAuthor (input: $inputAuthor) {
        firstName
        lastName
        }
    }
`

export const SEARCH_BOOKS = gql `
    query searchBooks ($searchedBook: String!) {
        searchBooks (input: $searchedBook) {
        title
        language
        bestseller
        author {
            firstName
            lastName
        }
        publisher {
            company
        }
        }
    }
`