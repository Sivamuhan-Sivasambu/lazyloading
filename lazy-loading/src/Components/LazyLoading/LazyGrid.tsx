import react, { useEffect, useState } from 'react'
import { User } from '../../Models/User';
import './../../App.css'

const LazyGrid = () => {
    const pageSize = 20;
    const [page, setPage] = useState<number>(1);
    const [users, setUsers] = useState<User[]>([]);

    function getMyLazyData<T>(url: string): Promise<T> {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<T>
            })
    }

    useEffect(() => {
        getMyLazyData<User[]>(`https://localhost:7223/Lazydata?pageNumber=${page}&pageSize=${pageSize}`).then(response => {
            setUsers(response);
        });
    }, []);

    const handleScroll = async (e: any) => {
        const target = e.currentTarget;
        const height = target.clientHeight as number;

        // Firefox, Chrome and Edge has a deviation of 1 or 2 when checking scroll position at the bottom
        if (([Math.floor(target.scrollHeight - target.scrollTop), Math.floor(target.scrollHeight - target.scrollTop + 1)]).includes(height)) {
            console.log('We are at the bottom');
            getMyLazyData<User[]>(`https://localhost:7223/Lazydata?pageNumber=${page + 1}&pageSize=${pageSize}`).then(response => {
                setUsers([...users, ...response]);
                setPage(page + 1);
                console.log(users.length)
            });
        }
    };

    return (
        <>
            <div>page Size: {pageSize} - Page No: {page} -  Total Rows in Grid: {users.length}</div>
            <div className="lazy-grid-container" onScroll={handleScroll}>
                <table>
                    {/* TODO: Make header dynamic using keys and make it stick to the top */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Make this as a function
                            users.map((item) => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.lastName}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default LazyGrid;