class Home extends React.Component {
    render() {
        return (
            <div className="main">
                <header className="header-content header">
                    <div className="logo-content">
                        <img src={logo} alt="" />
                        <div>
                            <span className="address-text">ADDRESS</span> <br />
                            <span className="address-text address-book">BOOK</span>
                        </div>
                    </div>
                </header>
                <div className="main-content">
                    <div className="header-content">
                        <div className="contact-detail-text">
                            Person Details
                        </div>
                        <Link to="/add" className="add-button flex-row-center"><img src={addIcon} alt="" />Add Person</Link>
                    </div>
                    <div className="table-main">
                        <Display contactArray={this.state.contactArray} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;