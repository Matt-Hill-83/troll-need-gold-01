import React from "react"
import { Header, Segment, Image, Grid, Item } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import _get from "lodash.get"
import cx from "classnames"

import { getUserProfile } from "../../../app/firestore/firestoreService"
import { listenToSelectedUserProfile } from "../profileActions"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import ProfileContent from "./ProfileContent"
import ProfileHeader from "./ProfileHeader"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import images from "../../../Common/Images/images"

import css from "./ProfilePage.module.scss"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay"
import CrudMachine from "../../../QuestBuilder/components/CrudMachine/CrudMachine"

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

  if (_get(match, "params.id") === _get(currentUser, "uid")) {
    profile = currentUserProfile
  } else {
    profile = selectedUserProfile
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content="Loading profile..." />

  const treasure = [
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
      amount: 1,
      image: images.trophys01.trophy02,
    },
    {
      name: "Don't go in the cave!",
      amount: 1,
      image: images.trophys01.trophy02,
    },
    {
      name: "Ok, fine. Go in the cave.",
      amount: 1,
      image: images.trophys01.trophy02,
    },
    {
      name: "Lose all your gold",
      amount: 1,
      image: images.trophys01.trophy02,
    },
  ]

  const renderedTreasure = treasure.map((item) => {
    return (
      <ImageDisplay
        className={css.image}
        item={item}
        showLabel={true}
        amount={item.amount}
        showAmount={true}
      />
    )
  })
  const renderedTrophys = trophys.map((item) => {
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

  const content01 = (
    <>
      <Segment>
        <ProfileHeader
          profile={profile}
          isCurrentUser={currentUser.uid === profile?.id}
        />
        <ProfileContent
          profile={profile}
          isCurrentUser={currentUser.uid === profile && profile.id}
        />
      </Segment>
    </>
  )

  const myTreasure = (
    <div className={css.card}>
      <Item.Group>
        <Item>
          <Item.Content verticalAlign="top">
            <Header
              as="h5"
              style={{ display: "block", marginBottom: 10 }}
              content={"My Treasure"}
            />
            <div className={css.imagesContainer}>{renderedTreasure}</div>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  )
  const myTrophies = (
    <div className={css.card}>
      <Item.Group>
        <Item>
          <Item.Content verticalAlign="top">
            <Header
              as="h5"
              style={{ display: "block", marginBottom: 10 }}
              content={"My Trophies"}
            />
            <div className={css.imagesContainer}>{renderedTrophys}</div>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  )

  const locations =
    Object.keys(images.dresses || {})
      .slice(0, 4)
      .map((item) => {
        return { name: item }
      }) || []

  const dresses = [images.dresses]

  return (
    <div className={css.main}>
      {/* <Grid celled> */}
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>{content01}</Grid.Column>
          <Grid.Column width={8}></Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <CrudMachine
              className={css.crudMachine}
              classNameCharPicker={css.classNameCharPicker}
              items={locations}
              imageSets={dresses}
              // saveItems={this.saveItems}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>{myTreasure}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>{myTrophies}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>{myTreasure}</Grid.Column>
          <Grid.Column width={3}>{myTreasure}</Grid.Column>
          <Grid.Column width={4}>{myTrophies}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
