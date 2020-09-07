import React from "react"
import QuestListItem from "./QuestListItem"
import InfiniteScroll from "react-infinite-scroller"
import cx from "classnames"

import css from "./QuestList.module.scss"

export default function QuestList({
  events,
  getNextEvents,
  loading,
  moreEvents,
}) {
  const tableHeader = (
    <div className={cx(css.tableHeader)}>
      <div className={cx(css.tableCell, css.name)}>Name</div>
      <div className={cx(css.tableCell, css.gold)}>Gold</div>
      <div className={cx(css.tableCell, css.status)}>Completed</div>
    </div>
  )

  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
        >
          {tableHeader}
          {events.map((event) => (
            <QuestListItem event={event} key={event.id} />
          ))}
        </InfiniteScroll>
      )}
    </>
  )
}
