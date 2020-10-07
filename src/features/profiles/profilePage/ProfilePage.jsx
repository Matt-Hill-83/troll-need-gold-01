import React from "react"
import { Header, Segment, Grid, Item } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import cx from "classnames"

import { getUserProfile } from "../../../app/firestore/firestoreService"
import { listenToSelectedUserProfile } from "../profileActions"
import CrudMachine from "../../../QuestBuilder/components/CrudMachine/CrudMachine"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay"
import images from "../../../Common/Images/images"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import ProfileContent from "./ProfileContent"
import ProfileHeader from "./ProfileHeader"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"

import css from "./ProfilePage.module.scss"

const treasures = [
  { name: "gold", amount: 1 },
  { name: "cap", amount: 1 },
  { name: "bag", amount: 1 },
  { name: "hog", amount: 1 },
  { name: "log", amount: 1 },
  { name: "bag", amount: 1 },
  { name: "gold", amount: 1 },
  { name: "cap", amount: 1 },
  { name: "bag", amount: 1 },
]

const trophys = [
  { name: "Get a Trophy", amount: 1, image: images.trophys01.trophy01 },
  { name: "Add a Friend", amount: 1, image: images.trophys01.trophy02 },
  { name: "Record a Beat", amount: 1, image: images.trophys01.trophy02 },
  { name: "Write a Rap", amount: 1, image: images.trophys01.trophy02 },
  { name: "Like a line", amount: 1, image: images.trophys01.trophy02 },
  { name: "Like a story", amount: 1, image: images.trophys01.trophy02 },
  {
    name: "Beetle Scout 1st Class",
    amount: 1,
    image: images.trophys01.trophy02,
  },
  {
    name: "Win the Rap Battle at Troll Cave",
    amount: 2,
    image: images.trophys01.trophy02,
  },
  {
    name: "DO NOT GO IN THE CAVE!",
    amount: 5,
    image: images.trophys01.trophy02,
  },
  {
    name: "Ok, fine. Go in the cave.",
    amount: 0,
    image: images.trophys01.trophy02,
  },
  {
    name: "Lose all your gold",
    amount: 1,
    image: images.trophys01.trophy02,
  },
]

const renderItems = ({ items, title, wrapInCard = true }) => {
  const trophys = items.map((item) => {
    const { image } = item
    return (
      <ImageDisplay
        image={image}
        className={css.image}
        item={item}
        showLabel={true}
        amount={item.amount}
        showAmount={true}
      />
    )
  })

  if (!wrapInCard) {
    return (
      <div className={cx(css.imagesContainer, css.column)}>
        <div>{title}</div>
        <div className={css.itemsWrapper}>{trophys}</div>
      </div>
    )
  }

  const boxedItems = (
    <div className={css.card}>
      <Item.Group>
        <Item>
          <Item.Content verticalAlign="top">
            <Header
              as="h5"
              style={{ display: "block", marginBottom: "0.5vh" }}
              content={title}
            />
            <div className={css.imagesContainer}>{trophys}</div>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  )
  return boxedItems
}

export default function ProfilePage({ match }) {
  const dispatch = useDispatch()
  const { selectedUserProfile, currentUserProfile } = useSelector(
    (state) => state.profile
  )
  const { currentUser } = useSelector((state) => state.auth)
  const { loading, error } = useSelector((state) => state.async)
  let profile

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser.uid,
  })

  if (match?.params?.id === currentUser?.uid) {
    profile = currentUserProfile
  } else {
    profile = selectedUserProfile
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content="Loading profile..." />

  const dresses = [images.dresses]
  const selectedDresses =
    Object.keys(images.dresses || {}).map((item) => {
      return { name: item }
    }) || []

  const myDresses = renderItems({
    items: selectedDresses,
    title: "My Dresses",
    wrapInCard: false,
  })

  const myAvatars = renderItems({
    items: selectedDresses,
    title: "My Avatars",
    wrapInCard: false,
  })

  const myVehicles = renderItems({
    items: selectedDresses,
    title: "My Vehicles",
    wrapInCard: false,
  })

  const myTrophys = renderItems({ items: trophys, title: "My Trophies" })
  const myFriends = renderItems({ items: trophys, title: "My Friends" })
  const myTreasures = renderItems({ items: treasures, title: "My Treasures" })

  const avatarStuff1 = (
    <Segment>
      <ProfileHeader
        profile={profile}
        isCurrentUser={currentUser.uid === profile?.id}
      />

      <Grid.Column width={3}>{myAvatars}</Grid.Column>
      <Grid.Column width={3}>{myDresses}</Grid.Column>
      <Grid.Column width={3}>{myVehicles}</Grid.Column>
    </Segment>
  )

  const profileEditor = (
    <Segment>
      <ProfileContent
        profile={profile}
        isCurrentUser={currentUser.uid === profile && profile.id}
      />
    </Segment>
  )

  return (
    <div className={css.main}>
      {/* <Grid celled> */}
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>{avatarStuff1}</Grid.Column>
          <Grid.Column width={6}></Grid.Column>
          <Grid.Column width={4}>{profileEditor}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {false && (
            <Grid.Column width={4}>
              <CrudMachine
                className={css.crudMachine}
                classNameCharPicker={css.classNameCharPicker}
                items={selectedDresses}
                imageSets={dresses}
                // saveItems={this.saveItems}
              />
            </Grid.Column>
          )}
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>{myTrophys}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>{myTreasures}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>{myFriends}</Grid.Column>
          <Grid.Column width={4}>{myTrophys}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
