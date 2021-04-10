import React from 'react'
import { useMutation, useQuery } from 'react-apollo';
import { gql } from 'apollo-boost'
import { Listings as ListingsData } from './__generated__/Listings'
import { DeleteListing as DeleteListingData, DeleteListingVariables } from './__generated__/DeleteListing'
import { List, Avatar, Button, Spin, Alert } from 'antd';
import './styles/Listings.css'
import { ListingsSkeleton } from './components';


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
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} />
      </div>
    )
  }

  const deleteListeningError = deleteError && (
    <Alert
      type="error"
      message="Uh oh! Something went wrong"
      className="listings__alert"
    />
  )

  return (
    <div className="listings">
      <Spin spinning={deleteLoading}>
        {deleteListeningError}

        <h2>{title}</h2>
        {listingsList}
      </Spin>
    </div>
  )
}
