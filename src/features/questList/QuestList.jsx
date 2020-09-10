import _get from "lodash.get"
import React from "react"
import QuestListItem from "./QuestListItem"
import InfiniteScroll from "react-infinite-scroller"
import cx from "classnames"

import useUpdateProfileWidget from "../../oldProject/components/TopLevel/useUpdateProfileWidget"
import QuestProgressUtils from "../../oldProject/Utils/QuestProgressUtils"

import css from "./QuestList.module.scss"

export default function QuestList({
  worlds,
  getNextEvents,
  loading,
  moreEvents,
  className,
}) {
  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()
  const completedQuests = _get(profile, "userStatus.completedQuests")

  const {
    earnedGold,
    allGoldInQuests,
  } = QuestProgressUtils.getTotalGoldInAllQuests({ worlds, completedQuests })

  const tableHeader = (
    <div className={cx(css.tableHeader)}>
      <div className={cx(css.tableCell, css.name)}>Name</div>
      <div
        className={cx(css.tableCell, css.gold)}
      >{`Gold (${earnedGold} out of ${allGoldInQuests})`}</div>
      <div className={cx(css.tableCell, css.status)}>Completed</div>
    </div>
  )
  console.log("worlds---QL", worlds) // zzz
  return (
    <div className={className}>
      {tableHeader}
      {worlds.map((event) => (
        <QuestListItem event={event} key={event.id} />
      ))}
    </div>
  )
  // return (
  //   <>
  //     {worlds.length !== 0 && (
  //       <InfiniteScroll
  //         pageStart={0}
  //         loadMore={getNextEvents}
  //         hasMore={!loading && moreEvents}
  //         initialLoad={false}
  //       >
  //         {tableHeader}
  //         {worlds.map((event) => (
  //           <QuestListItem event={event} key={event.id} />
  //         ))}
  //       </InfiniteScroll>
  //     )}
  //   </>
  // )
}
