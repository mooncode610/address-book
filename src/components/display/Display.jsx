import './display.scss'
import { Link } from 'react-router-dom'
const Display = (props) => {
    return (
        <table id="display" className="table">
        <tbody>
            <tr key={-1}>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>ZipCode</th>
                <th>Phone Number</th>
                <th></th>
            </tr>
            {
                props.contactArray && props.contactArray.map((contact, index) => (
                    <tr key={index}>
                        <td>{contact.name}</td>
                        <td>{contact.address}</td>
                        <td>{contact.city}</td>
                        <td>{contact.state}</td>
                        <td>{contact.zip}</td>
                        <td>{contact.phoneNumber}</td>
                        <td>
                            <img onClick={() => remove(contact.id)} alt="delete" src={deleteIcon} />
                            <Link to={`/update/${contact.id}`} > 
                                <img src={editIcon} alt="edit" /> 
                            </Link>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    );
}
export default Display;