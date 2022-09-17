import { useAppContext } from '../context/appContext'
import RecStatItem from './RecStatItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

const RecStatsContainer = () => {
  const { recStats } = useAppContext()

  const defaultStats = [
    {
      title: 'Remote Jobs',
      count: recStats.remote || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Internships',
      count: recStats.internship || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <RecStatItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default RecStatsContainer
