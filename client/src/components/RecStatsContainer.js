import { useAppContext } from '../context/appContext'
import RecStatItem from './RecStatItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

const RecStatsContainer = () => {
  const { recStats, jobs } = useAppContext()
  
  const Internships = jobs.filter((job) => job.jobType === "internship");
  const Remote = jobs.filter((job) => job.jobType === "remote");

  const defaultStats = [
    {
      title: 'Remote Jobs',
      count: recStats.remote || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
      jobData: Remote
    },
    {
      title: 'Internships',
      count: recStats.internship || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
      jobData: Internships
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
