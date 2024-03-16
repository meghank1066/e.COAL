import styles from './footer.module.css'

function Footer() {
    return (
        <>
            <div className={styles.footer}>
                <img src='/img/strwb.png'></img>
                <div>
                    <box-icon name='facebook-circle' type='logo' ></box-icon>
                    <box-icon name='instagram' type='logo' ></box-icon>
                    <box-icon name='pinterest' type='logo' ></box-icon>
                </div>
                <div className={styles.footerpages}><a href="/about-us">About Us</a>
                    <a href="/contact-us">Contact Us</a>
                    <a href="/services">Services</a>
                    <a href="/products">Products</a>
                    <a href="/blog">Blog</a>
                    <a href="/faq">FAQ</a></div>
            </div>
        </>
    )
}

export default Footer