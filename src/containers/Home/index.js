import React, { useState } from 'react'
import Book from '../../components/BookComponent/book'
import { LibraryDisplay, HomePage, SearchForm, SearchBar } from './styles'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { ALL_BOOKS, SEARCH_BOOKS } from '../graphql'
import { Link } from 'react-router-dom'

const Home = () => {
	const [searchTerm, setSearchTerm] = useState("")

  const { data: allBooksData, loading: allBooksLoading, error: allBooksError } = useQuery(ALL_BOOKS)
  if (allBooksError) {
    throw new Error('all books query failed')
	}

	const [searchBooks, {error: searchBooksError, loading: searchBooksLoading, called: searchBooksCalled, data: searchBooksData}] = useLazyQuery(SEARCH_BOOKS, {
		variables: {
			searchedBook: searchTerm
		}
	})
	if (searchBooksError) {
		console.log(searchBooksError)
	}
	

  return (
    <HomePage>
		<h1>Library</h1>
		<Link to='/authors'>To Authors</Link>
		<SearchForm onSubmit={ searchBooks }>
			<p>Search for a book by title:</p>
			<SearchBar>
			<input           
          type="text"
          placeholder="Book Title"
          value={ searchTerm }
          onChange={(e) => setSearchTerm(e.target.value)}
      />
			<button type="button" onClick={searchBooks}>Search</button>
			</SearchBar>
		</SearchForm>

		
		{!searchBooksCalled || !searchBooksData ? 
			<LibraryDisplay>
				{allBooksLoading ? 'loading...' : allBooksData.allBooks.map(book => (
						<Book book={ book }/>
				))}
			</LibraryDisplay>
		: 
			<LibraryDisplay>
				{allBooksLoading ? 'loading...' : searchBooksData.searchBooks.map(book => (
						<Book book={ book }/>
				))}
			</LibraryDisplay>
		}
		
    </HomePage>
	)
}


export default Home
