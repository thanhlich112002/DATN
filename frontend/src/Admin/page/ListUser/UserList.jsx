import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../service/userService';
import ReactPaginate from 'react-paginate';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import LoadingModel from '../../component/Loading/Loading'

const UserList = () => {

    const [listUser, setListUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [indexPage, setIndexPage] = useState(0);
    const pageCount = 1;
    useEffect(() => {
        getUsers(1);
    }, []);

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
        setIndexPage(event.selected);
    };

    const getUsers = async (page) => {
        try {
            let res = await getAllUser(page);

            if (res && res.data && res.data.data) {
                setListUser(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    return (
        <>
            <Container fluid>
                <div style={{ backgroundColor: 'white' }}>
                    <h3>Danh sách khách hàng</h3>
                    {/* <SearchProduct /> */}
                    {/* <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', margin: '20px' }} >
                        <Button as="input" type="button" value="Thêm sản phẩm" onClick={() => setIsShowAddProduct(true)} />
                    </div> */}

                    <Table bordered hover responsive className='mt-5'>
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>STT</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Liên hệ</th>
                                <th>Địa chỉ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser && listUser.length > 0 && (

                                listUser.map((user, index) => (
                                    <tr key={`user-${indexPage * 10 + index}`} >
                                        <td>{indexPage * 10 + index + 1}</td>
                                        <td>{user.lastName + " " + user.firstName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.contact[0].phoneNumber}</td>
                                        <td>{user.contact[0].address}</td>
                                    </tr>
                                ))
                            )
                            }



                        </tbody>

                    </Table>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='justify-content-right'>
                            <ReactPaginate
                                nextLabel=" > "
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel=" < "
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </div>


            </Container>
            {isLoading && (<LoadingModel />)}
        </>
    )
}

export default UserList
