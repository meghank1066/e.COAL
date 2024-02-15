import styles from './home.module.css'
import { HeaderL } from '../HeaderL/headerL'



function Home() {

    return (
        <section>
            <HeaderL />

            <div className={styles.values}>
                <h1>
                    Our Values
                </h1>
                <div className={styles.valIcon}>
                    <div>
                        <box-icon type='solid' name='heart' size='md'></box-icon>
                        <p>Healthy</p>
                    </div>
                    <div>
                        <box-icon name='dish' type='solid' size='md'></box-icon>
                        <p>Tasty</p>
                    </div>
                    <div>
                        <box-icon name='euro' size='md'></box-icon>
                        <p>Cheap</p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Home