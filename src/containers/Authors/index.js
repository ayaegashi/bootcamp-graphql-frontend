import React, { useState } from 'react'
import Author from '../../components/AuthorComponent/author'
import { LibraryDisplay, HomePage, SearchForm, SearchBar } from '../Home/styles'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ALL_AUTHORS, CREATE_AUTHOR } from '../graphql'
import { Link } from 'react-router-dom'

const Authors = () => {
	const [authorFirst, setAuthorFirst] = useState("")
	const [authorLast, setAuthorLast] = useState("")

  const { data: allAuthorsData, loading: allAuthorsLoading, error: allAuthorsError } = useQuery(ALL_AUTHORS)
  if (allAuthorsError) {
    throw new Error('all authors query failed')
	}
	
	
	const [createAuthor, {error: createAuthorError, loading: createAuthorLoading}] = useMutation(CREATE_AUTHOR, {
        update: (client, {data}) => {
            try {
                const temp = client.readQuery({ query: ALL_AUTHORS })
                temp.allAuthors = [...temp.allAuthors, data.createAuthor]
                client.writeQuery({ query: ALL_AUTHORS, temp })
            } catch (err) {
                throw new Error('update failed')
            }
        },
		variables: {
			inputAuthor: {
                firstName: authorFirst,
			    lastName: authorLast,
            }
		},
	})
	if (createAuthorError) {
		throw new Error('error creating author :(')
	}

  return (
    <HomePage>
		<h1>Authors</h1>
        <Link to='/'>To Library</Link>
		<SearchForm onSubmit={ createAuthor }>
			<p>Input a new author:</p>
			<SearchBar>
			<input           
                type="text"
                placeholder="First Name"
                value={ authorFirst }
                onChange={(e) => setAuthorFirst(e.target.value)}
            />
            <input           
                type="text"
                placeholder="Last Name"
                value={ authorLast }
                onChange={(e) => setAuthorLast(e.target.value)}
            />
			<button type="button" onClick={createAuthor}>Create Author</button>
			</SearchBar>
		</SearchForm>
		
		<LibraryDisplay>
			{allAuthorsLoading || createAuthorLoading ? 'loading...' : allAuthorsData.allAuthors.map(author => (
					<Author author={ author }/>
			))}
		</LibraryDisplay>
		
    </HomePage>
	)
}


export default Authors
