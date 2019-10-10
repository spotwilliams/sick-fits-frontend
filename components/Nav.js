import Link from 'next/link';

const Nav = () => (
    <nav>
        <ul className="flex">

        </ul>

        <Link href="/items">
            <a>Items</a>
        </Link>
        <Link href="/sell">
            <a>Sell</a>
        </Link>
        <Link href="/signup">
            <a>Signup</a>
        </Link>
        <Link href="/orders">
            <a>Orders</a>
        </Link>
        <Link href="/sme">
            <a>Account</a>
        </Link>
    </nav>
);

export default Nav;