import React from "react"
import CountUp from "react-countup"
import { project } from "./data"

//yarn or npm add react-countup

export const Counter = () => {
  return (
    <>
      <div className='counter'>
        <h2 className='Titt'>Statistiques</h2>
                          <hr className="hrs"></hr>

        <div className='container grid3 grid4'>
          {project.map((item) => (
            <div className='boxC' data-aos='zoom-in'>
              <i>{item.icon}</i>
              <h1 className='heading'>
                <CountUp enableScrollSpy duration={2} end={item.num} />
              </h1>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}