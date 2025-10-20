import React from "react"
import Slider from "react-slick"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { functions } from "./data"

export const Functions = () => {
  const settings = {
dots: false,          // Affiche les points de navigation (•••)
  infinite: true,      // Défilement infini (repart au début après la dernière slide)
  speed: 500,         // Durée de l'animation entre slides (en ms)
  slidesToShow: 1,    // Nombre de slides visibles simultanément
  slidesToScroll: 1   // Nombre de slides défilées à chaque interaction
  }
  return (
    <>
      <section className='testimonials '>

        <div className='containerT'>
                  <h2 className='Titt'>Temoignages</h2>
                  <hr></hr>

          <Slider {...settings}>
            {functions.map((val) => (
              <div className='box'>
                <i data-aos='zoom-out-up' className="icn">
                  <FormatQuoteIcon />
                </i>
                <p data-aos='zoom-out-down'>{val.text}</p>
                <div className='img' data-aos='zoom-out-right'>
                  <img src={val.image} alt='' />
                </div>
                <h3 data-aos='zoom-out-left'>{val.name}</h3>
                <label data-aos='zoom-out'>{val.post}</label>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  )
}