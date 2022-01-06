import React from "react";

import {Navbar, Button, NavbarBrand, NavbarToggler, Collapse, Nav, 
	NavItem, NavLink} from "reactstrap";
	
function Header({logout}) {
	return (
		<header className="mb-5">
			<div>
				<Navbar color="light" expand="md" light>
					<NavbarBrand href="/home">
						Process Memory
					</NavbarBrand>

					<NavbarToggler onClick={function noRefCheck() { }} />
					<Collapse navbar>
						<Nav className="me-auto" navbar>

							<NavItem>
								<NavLink href="/about">
									Giới thiệu
								</NavLink>
							</NavItem>
							
							<NavItem>
								<NavLink href="/home">
									Hướng dẫn sử dụng
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="/dashboard">
									Quản lí thời gian biểu
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="/contact">
									Liên hệ
								</NavLink>
							</NavItem>
						</Nav>

						<Button color="danger" onClick={() => logout()}>
							Đăng xuất
						</Button>
					</Collapse>
				</Navbar>
			</div>
		</header>
	);
}

export default Header;