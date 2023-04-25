import PropTypes from 'prop-types'
import Button from './button'


const header = ({title, onShow, showAdd}) => { 
  return (
    <header className ='header'>
      <h1>{title}</h1>
      <Button color={showAdd ? "red" : "green"} 
      text={showAdd ? "Close" : "Add"} 
      onClick={onShow}/>

    </header>
  )
}


header.defaultProps = {
  title: "Task Tracker  "
}

header.propTypes = {
  title: PropTypes.string
}
// const headerStyle = {
//   color: 'red', 
//   backgroundColor:'black'
// }
export default header
