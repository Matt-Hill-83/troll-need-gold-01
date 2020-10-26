import React from "react"
import { Header, Segment, Grid, Item, Button } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import cx from "classnames"

import {
  getUserProfile,
  updateUserProfile,
} from "../../../app/firestore/firestoreService"
import { listenToSelectedUserProfile } from "../profileActions"
import CrudMachine from "../../../QuestBuilder/components/CrudMachine/CrudMachine"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay"
import images from "../../../Common/Images/images"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import ProfileContent from "./ProfileContent"
import ProfileHeader from "./ProfileHeader"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
// import useUpdateProfileWidget from "../../../oldProject/components/TopLevel/useUpdateProfileWidget"

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
  if (!items[0]) {
    return null
  }

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
    shouldExecute: match?.params?.id !== currentUser?.uid,
  })

  if (match?.params?.id === currentUser?.uid) {
    profile = currentUserProfile
  } else {
    profile = selectedUserProfile
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content="Loading profile..." />

  const categories = Object.keys(profile?.myStuff)

  const newThing = categories.map((key) => {
    const selectedItems = profile?.myStuff?.[key] || []

    const items = renderItems({
      items: selectedItems,
      title: `My ${key}`,
      wrapInCard: false,
    })

    return <Grid.Column width={3}>{items}</Grid.Column>
  })

  const selectedDresses = profile?.myStuff?.dresses || []

  const myTrophys = renderItems({ items: trophys, title: "My Trophies" })
  const myFriends = renderItems({ items: trophys, title: "My Friends" })
  const myTreasures = renderItems({ items: treasures, title: "My Treasures" })

  const avatarStuff1 = (
    <Segment>
      <ProfileHeader
        profile={profile}
        isCurrentUser={currentUser.uid === profile?.id}
      />
      {newThing}
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

  const updateProfile = async () => {
    console.log("profile", profile) // zzz
    const myStuff = {
      dresses: [{ name: "dress02" }],
      avatars: [{ name: "fiona01" }],
      vehicles: [{ name: "helicopter01" }],
    }
    const dupProfile = { ...profile }
    dupProfile.myStuff = myStuff
    await updateUserProfile(dupProfile)
  }

  const dresses = [images.dresses]

  return (
    <div className={css.main}>
      <Button className={css.updateButton} onClick={updateProfile}>
        update
      </Button>
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
          My Recordings
          <Grid.Column width={4}>{myTrophys}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
