import './Skeleton.scss'

const Skeleton = () => {
  return (
    <>
      {Array.from({length: 48 }, () => (
        <div className="skeleton"/>
      ))}
    </>
  )
}

export default Skeleton
