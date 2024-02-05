import {useParams,Link} from 'react-router-dom'

function WelcomeComponent() {

    const {username} = useParams();
    return (
        <div className="WelcomeComponent">
           <h1>Welcome to my website {username}</h1>
           <div>
           Manage your todos - <Link to="/todos">Go here</Link>
           </div>
        </div>
    )
}

export default WelcomeComponent