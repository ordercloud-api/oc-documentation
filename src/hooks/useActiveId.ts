import { useEffect, useState } from 'react'

const useActiveId = itemIds => {
  const [activeId, setActiveId] = useState(``)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.firstElementChild.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )
    itemIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      observer.observe(el.parentElement)
    })
    return () => {
      itemIds.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        observer.unobserve(el)
      })
    }
  }, [itemIds])
  return activeId
}

export default useActiveId
