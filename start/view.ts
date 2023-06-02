import View from '@ioc:Adonis/Core/View'
const range = (start: number, size: number) => {
  return [...Array(size).keys()].map((i) => i + start)
}
View.global('range', range)
View.global('isFirst', (pageIndex) => pageIndex === 1)
View.global('isLast', (pageIndex, lastPage) => pageIndex === lastPage)
View.global('dottedPaginationRange', (currentPage: number, lastPage: number) => {
  const DELTA = 2
  const current = currentPage
  const left = current - DELTA
  const right = current + DELTA + 1
  const paginationRange = range(1, lastPage).map((pageIndex) => {
    const shouldDisplay =
      pageIndex === 1 || pageIndex === lastPage || (pageIndex >= left && pageIndex < right)
    return shouldDisplay ? pageIndex : '...'
  })
  return Array.from(new Set(paginationRange))
})
