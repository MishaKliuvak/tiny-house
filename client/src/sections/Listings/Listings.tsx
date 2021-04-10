import React from 'react'
import { useMutation, useQuery } from 'react-apollo';
import { gql } from 'apollo-boost'
import { Listings as ListingsData } from './__generated__/Listings'
import { DeleteListing as DeleteListingData, DeleteListingVariables } from './__generated__/DeleteListing';

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBaths
      numOfBeds
      rating
    }
  }
`

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`

interface Props {
  title: string
}

export const Listings = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS)
  const [deleteListing, { loading: deleteLoading, error: deleteError }] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING)

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } })

    refetch()
  }

  const listings = data ? data.listings : null

  const listingsList = (
    <ul>
      {
        listings?.map(listing => (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => handleDeleteListing(listing.id)}>Delete</button>
          </li>
        ))
      }
    </ul>
  )

  if (error) {
    return <h2>Something were wrong</h2>
  }

  if (loading) {
    return <h2>Loading ...</h2>
  }

  const deleteListeningLoading = deleteLoading && <h4>Deletion in progress</h4>
  const deleteListeningError = deleteError && <h4>Delete error</h4>

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {deleteListeningLoading}
      {deleteListeningError}
    </div>
  )
}
