import React from "react"
import { Header, Segment, Image, Grid, Item } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import _get from "lodash.get"

import { getUserProfile } from "../../../app/firestore/firestoreService"
import { listenToSelectedUserProfile } from "../profileActions"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import ProfileContent from "./ProfileContent"
import ProfileHeader from "./ProfileHeader"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import images from "../../../Common/Images/images"

import css from "./ProfilePage.module.scss"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay"

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
  ]

  const trophys = [
    { name: "gold", amount: 1 },
    { name: "cap", amount: 1 },
    { name: "bag", amount: 1 },
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

  return (
    <div className={css.main}>
      <Grid>
        <Grid.Column width={8}>
          <ProfileHeader
            profile={profile}
            isCurrentUser={currentUser.uid === profile && profile.id}
          />
          <ProfileContent
            profile={profile}
            isCurrentUser={currentUser.uid === profile && profile.id}
          />
        </Grid.Column>
        <Grid.Column width={8}>
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
        </Grid.Column>
      </Grid>
    </div>
  )
}
