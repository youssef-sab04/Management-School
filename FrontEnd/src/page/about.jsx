import { about } from "./data";
import Typewriter from "typewriter-effect"

export default function About() {


    return (
        <>
            <section className='hero'>
                {about.map((val, i) => (
                    <div className='heroContent'>
                        <h2 className='TitleAbout' data-aos='fade-right'>
                            {val.title}
                        </h2>
                        <h2>
                            <Typewriter
                                options={{
                                    strings: [`${val.text}`, `${val.name}`, `${val.post}`, `${val.design}`],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h2>
                        <br></br>                        <br></br> <hr></hr>

                        <div data-aos="fade-left">
                            <p>{val.p1}</p>
                            <p>{val.p2}</p>
                            <p>{val.p3}</p>




                        </div>


                    </div>
                ))}
            </section>

        </>
    );
}