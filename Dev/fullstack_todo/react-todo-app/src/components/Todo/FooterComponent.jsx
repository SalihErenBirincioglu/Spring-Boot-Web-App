import { AuthContext } from '../Security/AuthContext'
import { useContext } from 'react'

function FooterComponent() {
    const authContext=useContext(AuthContext);

    console.log(authContext.number)
    return (
        <footer className="footer">
            <div className="container"> 
                My Footer
            </div>       
        </footer>
    )
}

export default FooterComponent