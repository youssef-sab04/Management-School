import { social} from "./data";

const Footer = () => {
  return (
    <>
      <footer className="foot">
        {social.map((item) => (
          <>
            <i data-aos='zoom-in'>{item.icon}</i>
          </>
        ))}
        <p data-aos='zoom-in'>All Right Resceved 2018</p>
      </footer>
    </>
  )
}

export default Footer