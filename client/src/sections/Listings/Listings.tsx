import React from 'react'
import { useMutation, useQuery } from 'react-apollo';
import { gql } from 'apollo-boost'
import { Listings as ListingsData } from './__generated__/Listings'
import { DeleteListing as DeleteListingData, DeleteListingVariables } from './__generated__/DeleteListing'
import { List, Avatar, Button, Spin } from 'antd'
import './styles/Listings.css'


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

  const listingsList = listings && (
    <List
      itemLayout='horizontal'
      dataSource={listings}
      renderItem={listing => (
        <List.Item
          actions={[
            <Button
              onClick={() => handleDeleteListing(listing.id)}
              type="primary"
            >
              Delete
            </Button>
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={
              <Avatar
                src={listing.image}
                shape="square"
                size={48}
              />
            }
          />
        </List.Item>
      )}
    />
  )

  if (error) {
    return <h2>Something were wrong</h2>
  }

  if (loading) {
    return <h2>Loading ...</h2>
  }

  const deleteListeningError = deleteError && <h4>Delete error</h4>

  return (
    <div className="listings">
      <Spin spinning={deleteLoading}>
        <h2>{title}</h2>
        {listingsList}
        {deleteListeningError}
      </Spin>
    </div>
  )
}
