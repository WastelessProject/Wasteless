import React, {Component} from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';
import {useMsal} from "@azure/msal-react";


const LoginMenu = () => {
    const {accounts, instance} = useMsal();
    return <>
        {accounts.length > 0 &&
            <>
                <button className="btn btn-primary ms-4" onClick={() => instance.logout()}>Kirjaudu ulos</button>
                <p className="m-0" key ={accounts[0].homeAccountId}>{accounts[0].name}</p>
            </>
        }
    </>
}

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Hävikki</NavbarBrand>
                        <NavbarBrand tag={Link} to="/report">Raportti</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed}
                                  navbar>
                            <LoginMenu/>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
