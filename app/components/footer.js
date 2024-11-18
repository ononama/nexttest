import Link from 'next/link'

const Footer = () => {
    return (
        <footer>
            <div>
                <Link href="/blog">Blog</Link>
                <Link href="/contact">Contact</Link>
                <p>©{new Date().getFullYear()} ononama</p>
            </div>
        </footer>
    )
}

export default Footer