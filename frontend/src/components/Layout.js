import Navbar from './Navbar.js';
import CompanyList from './CompanyList.js';
import SearchBar from './SearchBar.js';

const Layout = () => {
    return(
        <>
            <Navbar/>
            <SearchBar/>
            <CompanyList/>
        </>
    )
}

export default Layout;