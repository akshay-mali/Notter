import React from 'react'

function Navbar({error, handleLogout}) {
    return (
        <header className="header">
            <nav className="nav">
                <h1 className="header__title">Notter</h1>
                <div className="nav-right">
                    <div className="search-box">
                        <i className='bx bx-search bx-sm'></i>
                        <input type="text" placeholder="Search note" />
                    </div>
                    {error && <p> { error } </p>}
                    <button onClick={handleLogout} className="logoutBtn">Logout</button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
