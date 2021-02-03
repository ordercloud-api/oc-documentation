import { useEffect, useState } from 'react'

const useActiveId = itemIds => {
  const [activeId, setActiveId] = useState(``)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )
    itemIds.forEach(id => {
      observer.observe(document.getElementById(id))
    })
    return () => {
      itemIds.forEach(id => {
        observer.unobserve(document.getElementById(id))
      })
    }
  }, [itemIds])
  return activeId
}

export default useActiveId
