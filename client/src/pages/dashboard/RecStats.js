import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { RecStatsContainer, Loading, RecChartsContainer } from '../../components'

const RecStats = () => {
  const { showRecStats, isLoading, recMonthlyApplications } = useAppContext()

  useEffect(() => {
    showRecStats()
  }, [])
  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
      <RecStatsContainer />
      {recMonthlyApplications.length > 0 && <RecChartsContainer />}
    </>
  )
}

export default RecStats
