import React from "react"
import { services } from "./data"
export const Services = () => {
  return (
    <>
      <section className='services'>
        <h1 className='Titt' data-aos='fade-right'>
                            Services
                        </h1>
                        <hr className="hrs"></hr>
        <div className='container'>
           
          <div className='content grid3'>
            {services.map((item) => (
              <div className='box' data-aos='flip-left'>
                <i>{item.icon}</i>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}