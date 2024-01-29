"use client";

import React from "react";
import Link from "next/link";
import {
  Container,
  Nav,
  // NavDropdown,
  Navbar,
} from "react-bootstrap";
// import { usePathname } from 'next/navigation';

// import faviconImage from './public/favicon.png';

export default function NavBar() {
  // const pathname = usePathname();

  return (
    <Navbar
      bg="primary"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        {/* <Image src='./public/favicon.png' alt='{panda}' /> */}
        <Navbar.Brand as={Link} href="/">
          AWS Manager 0.0.1
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            {/* <Nav.Link as={Link} href='/static' active={pathname === '/static'}>
              Static
            </Nav.Link>
            <Nav.Link
              as={Link}
              href='/dynamic'
              active={pathname === '/dynamic'}
            >
              Dynamic
            </Nav.Link>
            <Nav.Link as={Link} href='/isr' active={pathname === '/isr'}>
              Isr
            </Nav.Link>
            <NavDropdown title='Topics' id='topics-dropdown'>
              <NavDropdown.Item as={Link} href='/topics/health'>
                Health
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href='/topics/fitness'>
                Fitness
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href='/topics/coding'>
                Coding
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} href='/search' active={pathname === '/search'}>
              Search
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
